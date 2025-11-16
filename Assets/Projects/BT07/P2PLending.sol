// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
  P2P Lender - simple peer-to-peer lending contract
  - Borrowers create loan requests (amount, interest in bps, term in seconds)
  - Multiple lenders can fund the same loan (partial funding allowed)
  - When fully funded, borrower withdraws funds
  - Borrower repays (principal + interest). Repayment distributed proportionally to lenders
  - Lenders withdraw their proceeds
*/

contract P2PLender {
    address public admin;
    uint256 public nextLoanId = 1;

    struct Loan {
        uint256 id;
        address borrower;
        uint256 amount;           // principal requested (wei)
        uint256 fundedAmount;     // how much has been funded so far (wei)
        uint256 interestBps;      // interest in basis points (1% = 100 bps)
        uint256 termEnds;         // timestamp when loan term ends (unix)
        bool funded;              // true when fully funded
        bool withdrawn;           // borrower has withdrawn funds
        bool repaid;              // true when fully repaid
    }

    // Track lenders' contributions and withdrawable balances
    // contributions[loanId][lender] = amount contributed (wei)
    mapping(uint256 => mapping(address => uint256)) public contributions;
    // lendersList[loanId] = array of lender addresses
    mapping(uint256 => address[]) public lendersList;
    // proceeds[loanId][lender] = amount lender can withdraw after repayment
    mapping(uint256 => mapping(address => uint256)) public proceeds;

    mapping(uint256 => Loan) public loans;

    // Events
    event LoanRequested(uint256 indexed loanId, address indexed borrower, uint256 amount, uint256 interestBps, uint256 termEnds);
    event LoanFunded(uint256 indexed loanId, address indexed lender, uint256 amount);
    event LoanFullyFunded(uint256 indexed loanId);
    event BorrowerWithdrawn(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint256 totalPaid);
    event LenderWithdrawn(uint256 indexed loanId, address indexed lender, uint256 amount);
    event LoanCancelled(uint256 indexed loanId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier onlyBorrower(uint256 _loanId) {
        require(loans[_loanId].borrower == msg.sender, "only borrower");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /// Create a loan request
    /// @param _amount principal requested in wei
    /// @param _interestBps interest in basis points (100 bps = 1%)
    /// @param _termSeconds loan term length in seconds (e.g., 30 days = 30*24*3600)
    function requestLoan(uint256 _amount, uint256 _interestBps, uint256 _termSeconds) external {
        require(_amount > 0, "amount > 0");
        require(_termSeconds > 0, "term > 0");

        uint256 loanId = nextLoanId++;
        Loan storage L = loans[loanId];
        L.id = loanId;
        L.borrower = msg.sender;
        L.amount = _amount;
        L.fundedAmount = 0;
        L.interestBps = _interestBps;
        L.termEnds = block.timestamp + _termSeconds;
        L.funded = false;
        L.withdrawn = false;
        L.repaid = false;

        emit LoanRequested(loanId, msg.sender, _amount, _interestBps, L.termEnds);
    }

    /// Lender funds a loan (partial funding allowed)
    /// Send ETH equal to the contribution.
    function fundLoan(uint256 _loanId) external payable {
    Loan storage L = loans[_loanId];
    require(L.id != 0, "loan not exist");
    require(!L.funded, "already funded");
    require(msg.value > 0, "send > 0");

    // 🔥 Hybrid Rule: Borrower CANNOT fund own loan
    require(msg.sender != L.borrower, "Borrower cannot fund their own loan");

    uint256 remaining = L.amount - L.fundedAmount;
    require(remaining > 0, "no remaining");

    uint256 contribution = msg.value;

    if (contribution >= remaining) {
        contribution = remaining;
        uint256 refund = msg.value - contribution;
        if (refund > 0) {
            (bool ok,) = msg.sender.call{value: refund}("");
            require(ok, "refund failed");
        }
    }

    if (contributions[_loanId][msg.sender] == 0) {
        lendersList[_loanId].push(msg.sender);
    }

    contributions[_loanId][msg.sender] += contribution;
    L.fundedAmount += contribution;

    emit LoanFunded(_loanId, msg.sender, contribution);

    if (L.fundedAmount >= L.amount) {
        L.funded = true;
        emit LoanFullyFunded(_loanId);
    }
}


    /// Borrower withdraws funds after the loan is fully funded
    function withdrawLoanFunds(uint256 _loanId) external onlyBorrower(_loanId) {
        Loan storage L = loans[_loanId];
        require(L.id != 0, "loan not exist");
        require(L.funded, "not fully funded");
        require(!L.withdrawn, "already withdrawn");
        require(L.fundedAmount >= L.amount, "insufficient funded");

        L.withdrawn = true;

        // Transfer the principal to borrower
        (bool ok,) = L.borrower.call{value: L.amount}("");
        require(ok, "transfer failed");

        emit BorrowerWithdrawn(_loanId, L.borrower, L.amount);
    }

    /// Borrower repays loan principal + interest (simple interest)
    /// total due = principal + (principal * interestBps / 10000)
    function repayLoan(uint256 _loanId) external payable onlyBorrower(_loanId) {
        Loan storage L = loans[_loanId];
        require(L.id != 0, "loan not exist");
        require(L.withdrawn, "funds not withdrawn yet");
        require(!L.repaid, "already repaid");
        require(msg.value > 0, "send repayment");

        uint256 interest = (L.amount * L.interestBps) / 10000;
        uint256 totalDue = L.amount + interest;
        require(msg.value >= totalDue, "insufficient repayment");

        // Distribute repayment proportionally to lenders by their contributed share
        address[] storage lenders = lendersList[_loanId];
        for (uint i = 0; i < lenders.length; i++) {
            address lender = lenders[i];
            uint256 contributed = contributions[_loanId][lender];
            if (contributed == 0) continue;
            // lender's share of principal and interest, proportional to their contribution
            // share = msg.value * contributed / L.amount
            uint256 share = (msg.value * contributed) / L.amount;
            proceeds[_loanId][lender] += share;
        }

        L.repaid = true;

        // If borrower sent more than totalDue, refund excess
        if (msg.value > totalDue) {
            uint256 refundBorrower = msg.value - totalDue;
            (bool okRefund,) = L.borrower.call{value: refundBorrower}("");
            require(okRefund, "refund borrower failed");
        }

        emit LoanRepaid(_loanId, msg.sender, msg.value);
    }

    /// Lender withdraws their proceeds for a loan
    function withdrawLenderProceeds(uint256 _loanId) external {
        uint256 amt = proceeds[_loanId][msg.sender];
        require(amt > 0, "no proceeds");
        proceeds[_loanId][msg.sender] = 0;

        (bool ok,) = msg.sender.call{value: amt}("");
        require(ok, "withdraw failed");

        emit LenderWithdrawn(_loanId, msg.sender, amt);
    }

    /// Borrower can cancel request if not funded at all (or partially funded but not desired)
    /// Refunds contributors proportionally if any (simple immediate refund)
    function cancelLoan(uint256 _loanId) external onlyBorrower(_loanId) {
        Loan storage L = loans[_loanId];
        require(L.id != 0, "loan not exist");
        require(!L.withdrawn, "already withdrawn");
        require(!L.repaid, "already repaid");

        // Refund all contributors
        address[] storage lenders = lendersList[_loanId];
        for (uint i = 0; i < lenders.length; i++) {
            address lender = lenders[i];
            uint256 contributed = contributions[_loanId][lender];
            if (contributed == 0) continue;
            contributions[_loanId][lender] = 0;
            (bool ok,) = lender.call{value: contributed}("");
            require(ok, "refund contributor failed");
        }

        // clear lenders list (optional cleanup)
        delete lendersList[_loanId];
        L.amount = 0;
        L.fundedAmount = 0;
        L.funded = false;
        L.withdrawn = false;
        L.repaid = false;

        emit LoanCancelled(_loanId);
    }

    /// Helper: get lenders for a loan
    function getLenders(uint256 _loanId) external view returns (address[] memory) {
        return lendersList[_loanId];
    }

    /// Helper: get contribution of a lender for a loan
    function getContribution(uint256 _loanId, address _lender) external view returns (uint256) {
        return contributions[_loanId][_lender];
    }

    /// Admin can recover mistaken ETH sent to contract (emergency) - optional
    function adminRecover(uint256 _amount) external onlyAdmin {
        require(_amount <= address(this).balance, "not enough balance");
        (bool ok,) = admin.call{value: _amount}("");
        require(ok, "admin recover failed");
    }

    // Fallback to accept ETH (shouldn't be used except for direct sends)
    receive() external payable {}
}
