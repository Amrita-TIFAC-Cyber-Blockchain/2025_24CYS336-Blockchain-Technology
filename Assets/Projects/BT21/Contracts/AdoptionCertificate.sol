// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title AdoptionCertificate
 * @dev ERC-721 NFT for proof of adoption.
 */
contract AdoptionCertificate is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address private authorizedMinter;
    event CertificateMinted(address adopter, uint256 tokenId, string uri);

    constructor(address initialOwner)
        ERC721("Adoption Certificate", "A-NFT")
        Ownable(initialOwner)
    {}

    function setAuthorizedMinter(address _minterAddress) public onlyOwner {
        authorizedMinter = _minterAddress;
    }

    modifier onlyMinter() {
        require(msg.sender == authorizedMinter, "Only AdoptionManager can mint");
        _;
    }

    function safeMint(address to, string memory tokenUri) public onlyMinter returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
        emit CertificateMinted(to, tokenId, tokenUri);
        return tokenId;
    }
}
