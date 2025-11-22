// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModelAudit {
    struct Update {
        address user;
        string userDataHash;
        string modelHash;
        uint256 timestamp;
    }

    address public owner;
    uint256 public updateCount;
    mapping(uint256 => Update) public updates;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function submitUserData(string memory _userDataHash) public {
        updates[updateCount] = Update(msg.sender, _userDataHash, "", block.timestamp);
        updateCount++;
    }

    function attachModelHash(uint256 index, string memory _modelHash) public onlyOwner {
        require(bytes(updates[index].userDataHash).length != 0, "Invalid index");
        require(bytes(updates[index].modelHash).length == 0, "Already updated");
        updates[index].modelHash = _modelHash;
    }

    function getUpdate(uint256 index) public view returns (
        address, string memory, string memory, uint256
    ) {
        Update storage u = updates[index];
        return (u.user, u.userDataHash, u.modelHash, u.timestamp);
    }
}
