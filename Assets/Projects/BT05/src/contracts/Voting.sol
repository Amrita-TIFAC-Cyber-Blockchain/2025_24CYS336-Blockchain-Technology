// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public owner;

    string public electionName;

    uint16 public startYear;
    uint8 public startMonth;
    uint8 public startDay;

    uint16 public endYear;
    uint8 public endMonth;
    uint8 public endDay;

    string[] public candidateNames;
    mapping(string => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;

    bool public votingEnded;

    constructor(
        string memory _electionName,
        uint16 _startYear,
        uint8 _startMonth,
        uint8 _startDay,
        uint16 _endYear,
        uint8 _endMonth,
        uint8 _endDay,
        uint numCandidates,
        string[] memory names
    ) {
        require(numCandidates > 0 && numCandidates <= 10, "Invalid candidates count");

        owner = msg.sender;

        electionName = _electionName;

        startYear = _startYear;
        startMonth = _startMonth;
        startDay = _startDay;

        endYear = _endYear;
        endMonth = _endMonth;
        endDay = _endDay;

        for (uint i = 0; i < numCandidates; i++) {
            candidateNames.push(names[i]);
            votesReceived[names[i]] = 0;
        }
    }

    // -------------------------------------------
    // 1. Convert month number → Month name
    // -------------------------------------------
    function monthName(uint8 month) internal pure returns (string memory) {
        string[12] memory months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        require(month >= 1 && month <= 12, "Invalid month");
        return months[month - 1];
    }

    // -------------------------------------------
    // 2. Return date in DD - Month - YYYY format
    // -------------------------------------------
    function getFormattedStartDate() public view returns (string memory) {
        return string(
            abi.encodePacked(
                uintToString(startDay), " - ",
                monthName(startMonth), " - ",
                uintToString(startYear)
            )
        );
    }

    function getFormattedEndDate() public view returns (string memory) {
        return string(
            abi.encodePacked(
                uintToString(endDay), " - ",
                monthName(endMonth), " - ",
                uintToString(endYear)
            )
        );
    }

    // Utility: convert uint to string
    function uintToString(uint num) internal pure returns (string memory) {
        return string(abi.encodePacked(num));
    }

    // -------------------------------------------
    // Voting functions
    // -------------------------------------------
    function vote(string memory candidateName) public {
        require(!votingEnded, "Voting has ended");
        require(!hasVoted[msg.sender], "You have already voted");
        require(validCandidate(candidateName), "Invalid candidate");

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

    // End election (owner only)
    function endVoting() public {
        require(msg.sender == owner, "Only owner can end");
        votingEnded = true;
    }

    // -------------------------------------------
    // 3. Restrict Results — Only After Election Ends
    // -------------------------------------------
    function getResults() public view returns (string[] memory, uint256[] memory) {
        require(votingEnded, "Results available only after election ends");

        uint256[] memory resultCounts = new uint256[](candidateNames.length);

        for (uint i = 0; i < candidateNames.length; i++) {
            resultCounts[i] = votesReceived[candidateNames[i]];
        }

        return (candidateNames, resultCounts);
    }

    // Helper: For UI to show "Show Results" button conditionally
    function isElectionEnded() public view returns (bool) {
        return votingEnded;
    }
}

