// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Evidence Protection System
 * @dev Blockchain-based system for managing and verifying digital evidence.
 */

contract EvidenceChain {
    struct Evidence {
        uint id;
        string name;
        string description;
        string ipfsHash; 
        address addedBy;
        uint timestamp;
    }

    mapping(uint => Evidence) public evidences;
    uint public evidenceCount;

    event EvidenceAdded(uint id, string name, address addedBy, uint timestamp);

    function addEvidence(string memory _name, string memory _desc, string memory _ipfsHash) public {
        evidenceCount++;
        evidences[evidenceCount] = Evidence(evidenceCount, _name, _desc, _ipfsHash, msg.sender, block.timestamp);
        emit EvidenceAdded(evidenceCount, _name, msg.sender, block.timestamp);
    }


    function getEvidence(uint _id) public view returns (Evidence memory) {
        return evidences[_id];
    }

    function getEvidenceCount() public view returns (uint) {
        return evidenceCount;
    }
}