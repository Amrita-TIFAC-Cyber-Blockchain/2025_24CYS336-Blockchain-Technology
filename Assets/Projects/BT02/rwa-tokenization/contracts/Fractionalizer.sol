// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./FractionalToken.sol"; // Import the new FractionalToken

contract Fractionalizer is Ownable {
    IERC721 public assetNFT;
    mapping(uint256 => address) public fractionalToken; // tokenId => ERC20 address
    mapping(uint256 => uint256) public fractionalSupply; // tokenId => total supply of fractional tokens

    event NFTFractionalized(uint256 indexed tokenId, address indexed fractionalTokenAddress, uint256 supply);
    event NFTReconstituted(uint256 indexed tokenId);

    constructor(address _assetNFTAddress) Ownable(msg.sender) {
        assetNFT = IERC721(_assetNFTAddress);
    }

    function fractionalizeNFT(uint256 _tokenId, string memory _name, string memory _symbol, uint256 _supply)
        external onlyOwner
    {
        require(fractionalToken[_tokenId] == address(0), "NFT already fractionalized");
        require(_supply > 0, "Supply must be greater than 0");

        // Transfer NFT to this contract
        assetNFT.transferFrom(msg.sender, address(this), _tokenId);

        // Create new FractionalToken for fractions, with this contract as minter
        FractionalToken newFractionalToken = new FractionalToken(_name, _symbol, address(this));
        fractionalToken[_tokenId] = address(newFractionalToken);
        fractionalSupply[_tokenId] = _supply;

        // Mint initial supply to the owner of the NFT
        newFractionalToken.mint(msg.sender, _supply);

        emit NFTFractionalized(_tokenId, address(newFractionalToken), _supply);
    }

    function reconstituteNFT(uint256 _tokenId) external onlyOwner {
        require(fractionalToken[_tokenId] != address(0), "NFT not fractionalized");

        // Burn all fractional tokens (simplified: assumes owner holds all or can force burn)
        // In a real scenario, this would involve a buyout mechanism or requiring all tokens to be sent here.
        FractionalToken token = FractionalToken(fractionalToken[_tokenId]);
        token.burn(msg.sender, fractionalSupply[_tokenId]);

        // Transfer NFT back to the owner
        assetNFT.transferFrom(address(this), msg.sender, _tokenId);

        delete fractionalToken[_tokenId];
        delete fractionalSupply[_tokenId];

        emit NFTReconstituted(_tokenId);
    }
}
