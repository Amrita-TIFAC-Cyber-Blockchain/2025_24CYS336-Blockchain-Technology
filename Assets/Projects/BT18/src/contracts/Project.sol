// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.4.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.4.0/access/Ownable.sol";

/**
 * @title CredentialNFT
 * @dev ERC721-based credential token.
 */
contract CredentialNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    //Events
    event CertificateIssued(
        address indexed institution,
        address indexed student,
        uint256 indexed tokenId,
        string uri
    );

    event CertificateRevoked(
        address indexed revokedBy,
        uint256 indexed tokenId,
        string reason
    );

    //Institution Struct
    struct Institution {
        string instName;
        bool isRegistered;
    }

    //mappings
    mapping(address => Institution) public institutions;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => string) private _certificateDetails;
    mapping(uint256 => address) private _tokenIssuer;

    modifier isInstitution() {
        require(
            institutions[msg.sender].isRegistered,
            "Caller is not a registered institution"
        );
        _;
    }

    constructor() 
        ERC721("AcademicCredential", "CERT")
        Ownable(msg.sender)
    {}

    //admin
    function addInstitution(address inst, string memory name) 
        public 
        onlyOwner 
    {
        require(inst != address(0), "Invalid address");
        require(!institutions[inst].isRegistered, "Already registered");

        institutions[inst] = Institution(name, true);
    }

    function removeInstitution(address inst) 
        public 
        onlyOwner 
    {
        require(institutions[inst].isRegistered, "Not found");
        delete institutions[inst];
    }

    //institution
    function issueCertificate(
        address student,
        string memory uri,
        string memory details
    ) 
        public 
        isInstitution 
        returns (uint256) 
    {
        require(student != address(0), "Invalid student");

        _tokenIdCounter++;
        uint256 newId = _tokenIdCounter;

        _safeMint(student, newId);

        _tokenURIs[newId] = uri;
        _certificateDetails[newId] = details;
        _tokenIssuer[newId] = msg.sender;

        emit CertificateIssued(msg.sender, student, newId, uri);

        return newId;
    }

    function revokeCertificate(uint256 tokenId, string memory reason) public {
        address issuer = _tokenIssuer[tokenId];
        require(issuer != address(0), "Token not found");

        require(
            msg.sender == issuer || msg.sender == owner(),
            "Not authorized"
        );

        _burn(tokenId);

        delete _tokenURIs[tokenId];
        delete _certificateDetails[tokenId];
        delete _tokenIssuer[tokenId];

        emit CertificateRevoked(msg.sender, tokenId, reason);
    }

    //Prevents transfer
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) 
        internal 
        virtual 
        override 
        returns (address) 
    {
        address from = _ownerOf(tokenId);

        // Allow mint (from=0), allow burn (to=0)
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: transfers disabled");
        }

        return super._update(to, tokenId, auth);
    }

    //Metadata
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_ownerOf(tokenId) != address(0), "Invalid token");
        return _tokenURIs[tokenId];
    }

    function getCertificateDetails(uint256 id)
        public
        view
        returns (string memory)
    {
        require(_ownerOf(id) != address(0), "Invalid token");
        return _certificateDetails[id];
    }

    function getTokenIssuer(uint256 id)
        public
        view
        returns (address)
    {
        require(_ownerOf(id) != address(0), "Invalid token");
        return _tokenIssuer[id];
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
