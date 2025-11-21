// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetNFT is ERC721, Ownable {
    uint256 public nextId;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("RWA Asset", "RWA") Ownable(msg.sender) {}

    function mint(address to, string calldata ipfsCID) external onlyOwner returns (uint256) {
        uint256 id = ++nextId;
        _safeMint(to, id);
        _tokenURIs[id] = ipfsCID;
        return id;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
