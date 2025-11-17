// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DocSys {

    address public owner;
    uint256 public docCount;

    enum Role { None, Verifier, Contributor }
    
    mapping(address => Role) public userRoles;

    mapping(address => uint256) public contributionPoints;

    uint256 public constant NEW_DOC_POINTS = 10;
    uint256 public constant UPDATE_DOC_POINTS = 5;

    struct DocVersion {
        string ipfsHash;
        uint256 timestamp;
        address user;
        string prevVersionHash;
    }

    mapping(uint256 => DocVersion[]) public documentHistory;

    modifier onlyOwner() {
        require(msg.sender == owner, "DocSort: Caller is not the owner");
        _;
    }

    modifier onlyContributor() {
        require(userRoles[msg.sender] == Role.Contributor, "DocSort: Caller must be a Contributor");
        _;
    }

    constructor() {
        owner = msg.sender;
        userRoles[msg.sender] = Role.Contributor;
    }

    function grantContributorRole(address _user) public onlyOwner {
        require(_user != address(0), "DocSort: Invalid address");
        userRoles[_user] = Role.Contributor;
    }

    function grantVerifierRole(address _user) public onlyOwner {
        require(_user != address(0), "DocSort: Invalid address");
        if (userRoles[_user] == Role.None) {
            userRoles[_user] = Role.Verifier;
        }
    }

    function revokeRole(address _user) public onlyOwner {
        require(_user != address(0), "DocSort: Invalid address");
        if (userRoles[_user] != Role.None) {
            userRoles[_user] = Role.None;
        }
    }

    function addDocument(string memory _ipfsHash) public onlyContributor {
        docCount++;
        uint256 newDocId = docCount;

        DocVersion memory newVersion = DocVersion({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            user: msg.sender,
            prevVersionHash: ""
        });

        documentHistory[newDocId].push(newVersion);
        
        contributionPoints[msg.sender] += NEW_DOC_POINTS;
    }

    function updateDocument(uint256 _docId, string memory _newIpfsHash) public onlyContributor {
        require(_docId > 0 && _docId <= docCount, "DocSort: Invalid document ID");
        
        DocVersion[] storage history = documentHistory[_docId];
        require(history.length > 0, "DocSort: Document has no versions to update");

        string memory prevHash = history[history.length - 1].ipfsHash;

        DocVersion memory newVersion = DocVersion({
            ipfsHash: _newIpfsHash,
            timestamp: block.timestamp,
            user: msg.sender,
            prevVersionHash: prevHash
        });

        history.push(newVersion);
        
        contributionPoints[msg.sender] += UPDATE_DOC_POINTS;
    }

    function getLatestVersion(uint256 _docId) public view returns (DocVersion memory) {
        DocVersion[] storage history = documentHistory[_docId];
        require(history.length > 0, "DocSort: No versions for this document");
        return history[history.length - 1];
    }

    function getRole(address _user) public view returns (Role) {
        return userRoles[_user];
    }
}
