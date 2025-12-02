// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DeFiForFarmsSimple {
    address public admin;
    constructor() { admin = msg.sender; }

    // ------------------ Roles ------------------
    mapping(address => bool) public isLender;
    mapping(address => bool) public isInsurer;

    modifier onlyAdmin() { require(msg.sender == admin, "admin only"); _; }
    modifier onlyLender() { require(isLender[msg.sender], "lender only"); _; }
    modifier onlyInsurer() { require(isInsurer[msg.sender], "insurer only"); _; }

    // ------------------ Reentrancy Guard ------------------
    bool private locked;
    modifier nonReentrant() {
        require(!locked, "reentrant");
        locked = true;
        _;
        locked = false;
    }

    // ------------------ Farmer ------------------
    struct Farmer {
        string name;
        string location;
        bool exists;
    }
    mapping(address => Farmer) public farmers;

    function registerFarmer(string calldata n, string calldata loc) external {
        require(!farmers[msg.sender].exists, "already farmer");
        farmers[msg.sender] = Farmer(n, loc, true);
    }

    // ------------------ Batch ------------------
    struct Batch {
        uint id;
        address farmer;
        string product;
        uint qty;
        int profitOrLoss;
        string[] traceHistory;
        bool exists;
    }

    uint public nextBatch;
    mapping(uint => Batch) public batches;

    function createBatch(string calldata prod, uint qty) external returns(uint) {
        require(farmers[msg.sender].exists, "not farmer");
        nextBatch++;
        batches[nextBatch] = Batch(
            nextBatch,
            msg.sender,
            prod,
            qty,
            0,                  // Initialize profitOrLoss
            new string[](0),    // Initialize empty traceHistory
            true
        );
        batches[nextBatch].traceHistory.push("Batch Created");
        return nextBatch;
    }

    function updateProfitOrLoss(uint batchId, int amount) external {
        require(batches[batchId].exists, "batch missing");
        require(batches[batchId].farmer == msg.sender, "not batch owner");
        batches[batchId].profitOrLoss = amount;
    }

    function addTrace(uint id, string calldata note) external {
        require(batches[id].exists, "batch missing");
        batches[id].traceHistory.push(note);
    }

    // ------------------ Loan ------------------
    struct Loan {
        uint id;
        address farmer;
        address lender;
        uint requestedAmount;
        uint approvedAmount;
        uint repaid;
        bool active;
    }

    uint public nextLoan;
    mapping(uint => Loan) public loans;

    function applyLoan(uint amt) external {
        require(farmers[msg.sender].exists, "not farmer");
        nextLoan++;
        loans[nextLoan] = Loan(
            nextLoan,
            msg.sender,
            address(0),
            amt,       // requested
            0,         // approved (admin will set)
            0,
            false
        );
    }

    function adminApproveLoan(uint loanId, uint amount) external onlyAdmin {
        require(loans[loanId].requestedAmount > 0, "loan missing");
        require(amount <= loans[loanId].requestedAmount, "cannot exceed request");
        loans[loanId].approvedAmount = amount;
    }

    function approveLoan(uint id) external onlyLender {
        require(loans[id].lender == address(0), "already approved");
        loans[id].lender = msg.sender;
        loans[id].active = true;
    }

    function disburseLoan(uint id) external payable onlyLender nonReentrant {
        Loan storage L = loans[id];
        require(L.lender == msg.sender, "not lender");
        require(L.approvedAmount > 0, "not approved by admin");
        require(msg.value == L.approvedAmount, "send approved amount only");
        payable(L.farmer).transfer(msg.value);
    }

    function repayLoan(uint id) external payable nonReentrant {
        Loan storage L = loans[id];
        require(msg.sender == L.farmer, "not borrower");
        require(L.active, "inactive loan");
        L.repaid += msg.value;
    }

    // ------------------ Insurance ------------------
    struct Policy {
        uint id;
        address farmer;
        address insurer;
        uint premium;
        uint coverage;
        bool claimed;
    }

    uint public nextPolicy;
    mapping(uint => Policy) public policies;

    function buyInsurance(address ins, uint cover) external payable {
        require(farmers[msg.sender].exists, "not farmer");
        require(isInsurer[ins], "not insurer");
        nextPolicy++;
        policies[nextPolicy] = Policy(nextPolicy, msg.sender, ins, msg.value, cover, false);
    }

    function fileClaim(uint id) external {
        require(policies[id].farmer == msg.sender, "not owner");
        policies[id].claimed = true;
    }

    function payClaim(uint id) external payable onlyInsurer {
        Policy storage P = policies[id];
        require(P.insurer == msg.sender, "not insurer");
        require(P.claimed, "not claimed");
        require(msg.value == P.coverage, "incorrect payout");
        payable(P.farmer).transfer(msg.value);
    }

    // ------------------ Direct Payment ------------------
    function payFarmer(address payable farmer) external payable {
        require(farmers[farmer].exists, "not farmer");
        farmer.transfer(msg.value);
    }

    // ------------------ Admin Controls ------------------
    function setLender(address x, bool ok) external onlyAdmin { isLender[x] = ok; }
    function setInsurer(address x, bool ok) external onlyAdmin { isInsurer[x] = ok; }
    function changeAdmin(address x) external onlyAdmin { admin = x; }

    receive() external payable {}
}