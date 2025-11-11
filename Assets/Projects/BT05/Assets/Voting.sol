// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public owner;
    string[] public candidateNames;
    mapping(string => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;
    bool public votingEnded;

    constructor(uint numCandidates, string[] memory names) {
        require(numCandidates > 0 && numCandidates < 10, "Candidates must be between 1 and 9");
        require(names.length == numCandidates, "Names count must match number of candidates");

        owner = msg.sender;

        for (uint i = 0; i < numCandidates; i++) {
            candidateNames.push(names[i]);
            votesReceived[names[i]] = 0;
        }
    }

    function vote(string memory candidateName) public {
        require(!votingEnded, "Voting has ended");
        require(!hasVoted[msg.sender], "No double voting allowed");  // ✅ Added message
        require(validCandidate(candidateName), "Invalid candidate name");

        votesReceived[candidateName]++;
        hasVoted[msg.sender] = true;
    }

    function validCandidate(string memory name) private view returns (bool) {
        for (uint i = 0; i < candidateNames.length; i++) {
            if (keccak256(bytes(candidateNames[i])) == keccak256(bytes(name))) {
                return true;
            }
        }
        return false;
    }

    function endVoting() public {
        require(msg.sender == owner, "Only the owner can end the election"); // ✅ Added message
        votingEnded = true;
    }

    function getResults() public view returns (string[] memory, uint256[] memory) {
        require(votingEnded, "Voting not ended yet");

        uint256[] memory results = new uint256[](candidateNames.length);
        for (uint i = 0; i < candidateNames.length; i++) {
            results[i] = votesReceived[candidateNames[i]];
        }
        return (candidateNames, results);
    }
}
