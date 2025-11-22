// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {
    struct Voter {
        string name;
        address vaddress;
        bool hasVoted;
        bool exists;
    }
    
    struct Candidate {
        string name;
        address caddress;
        int16 voteCount;
        bool exists;
    }
    
    struct Winner {
        string name;
        int16 voteCount;
    }

    address private electionCommission;
    mapping(address => Voter) private voters;
    mapping(address => Candidate) private candidates;
    address[] private candidateList;
    Winner private winner;

    modifier isVoter() {
        require(voters[msg.sender].exists, "You are not a registered voter");
        _;
    }

    modifier isCandidate() {
        require(candidates[msg.sender].exists, "You are not a registered candidate");
        _;
    }

    modifier isEC() {
        require(msg.sender == electionCommission, "Only Election Commission can access");
        _;
    }

    constructor() {
        electionCommission = msg.sender;
    }

    function addVoter(
        string memory vname,
        address voteraddress
    ) public isEC {
        require(!voters[voteraddress].exists, "Voter already registered");
        voters[voteraddress] = Voter({
            name: vname,
            vaddress: voteraddress,
            hasVoted: false,
            exists: true
        });
    }

    function addCandidate(
        string memory cname,
        address candidateaddress
    ) public isEC {
        require(!candidates[candidateaddress].exists, "Candidate already registered");
        candidates[candidateaddress] = Candidate({
            name: cname,
            caddress: candidateaddress,
            voteCount: 0,
            exists: true
        });
        candidateList.push(candidateaddress);
    }

    function vote(address candidateaddress) public isVoter {
        require(candidates[candidateaddress].exists, "Candidate does not exist");
        require(!voters[msg.sender].hasVoted, "You have already voted");
        candidates[candidateaddress].voteCount += 1;
        voters[msg.sender].hasVoted = true;
    }

    function viewVoter(
        address voteraddress
    ) public view returns(string memory VoterName, address Voteraddress, bool HasVoted) {
        require(
            msg.sender == electionCommission || msg.sender == voteraddress,
            "Access denied"
        );
        require(voters[voteraddress].exists, "Voter does not exist");
        Voter memory vo = voters[voteraddress];
        return (vo.name, vo.vaddress, vo.hasVoted);
    }

    function viewCandidate(
        address candidateaddress
    ) public isCandidate view returns(string memory CandidateName, address Candidateaddress, int16 VoteCount) {
        require(
            msg.sender == electionCommission || msg.sender == candidateaddress,
            "Access denied"
        );
        require(candidates[candidateaddress].exists, "Candidate does not exist");
        Candidate memory ca = candidates[candidateaddress];
        return (ca.name, ca.caddress, ca.voteCount);
    }

    function countVotes() public isEC {
        require(candidateList.length > 0, "No candidates registered");
        int16 maxVote = candidates[candidateList[0]].voteCount;
        uint winnerIndex = 0;
        for(uint i = 1; i < candidateList.length; i++) {
            int16 currentVotes = candidates[candidateList[i]].voteCount;
            if(currentVotes > maxVote) {
                maxVote = currentVotes;
                winnerIndex = i;
            }
        }
        Candidate memory winningCandidate = candidates[candidateList[winnerIndex]];
        winner = Winner({
            name: winningCandidate.name,
            voteCount: maxVote
        });
    }

    function viewResult() public view returns(string memory WinnerName, int16 VoteCount) {
        return (winner.name, winner.voteCount);
    }
    
    function getCandidateCount() public view returns(uint) {
        return candidateList.length;
    }

    function getCandidateList() public view returns (address[] memory) {
        return candidateList;
    }

}
