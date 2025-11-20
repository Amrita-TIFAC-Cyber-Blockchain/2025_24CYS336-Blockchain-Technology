// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

interface ILeaderboard {
    function update(address user, uint256 newBalance) external;
}

contract PETToken {
    string public name = "PETToken";
    string public symbol = "PET";
    uint8 public decimals = 0;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    address public owner;

    // Optional: address of leaderboard contract to notify on changes
    ILeaderboard public leaderboard;

    // Events useful for off-chain processing and UI
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Mint(address indexed to, uint256 amount);
    event OwnerChanged(address indexed previousOwner, address indexed newOwner);
    event LeaderboardSet(address indexed oldLeaderboard, address indexed newLeaderboard);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Set the leaderboard contract address (only owner)
     */
    function setLeaderboard(address leaderboardAddr) public onlyOwner {
        address old = address(leaderboard);
        leaderboard = ILeaderboard(leaderboardAddr);
        emit LeaderboardSet(old, leaderboardAddr);
    }

    /**
     * @dev Mint new tokens to a specific address (owner only)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Mint(to, amount);
        emit Transfer(address(0), to, amount);

        // notify leaderboard (best-effort; if leaderboard is not set skip)
        if (address(leaderboard) != address(0)) {
            // pass the new balance so leaderboard doesn't need to call token
            leaderboard.update(to, balanceOf[to]);
        }
    }

    /**
     * @dev Transfer tokens between users
     */
    function transfer(address to, uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);

        // update leaderboard for both parties if set
        if (address(leaderboard) != address(0)) {
            leaderboard.update(msg.sender, balanceOf[msg.sender]);
            leaderboard.update(to, balanceOf[to]);
        }
    }

    /**
     * @dev View token balance of an address
     */
    function getBalance(address account) public view returns (uint256) {
        return balanceOf[account];
    }

    /**
     * @dev Allow admin (owner) to change token ownership (used to give AdoptionManager mint rights)
     */
    function setOwner(address newOwner) public onlyOwner {
        address prev = owner;
        owner = newOwner;
        emit OwnerChanged(prev, newOwner);
    }
}
