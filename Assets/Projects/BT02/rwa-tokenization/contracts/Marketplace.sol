// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Marketplace is Ownable {
    IERC721 public assetNFT;

    struct Listing {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings; // tokenId => Listing
    uint256 public listingCount;

    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTBought(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    event NFTUnlisted(uint256 indexed tokenId);

    constructor(address _assetNFTAddress) Ownable(msg.sender) {
        assetNFT = IERC721(_assetNFTAddress);
    }

    function listItem(uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than 0");
        require(assetNFT.ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
        require(listings[_tokenId].active == false, "NFT is already listed");

        // Transfer NFT to the marketplace contract
        assetNFT.transferFrom(msg.sender, address(this), _tokenId);

        listingCount++;
        listings[_tokenId] = Listing(_tokenId, payable(msg.sender), _price, true);

        emit NFTListed(_tokenId, msg.sender, _price);
    }

    function buyItem(uint256 _tokenId) external payable {
        Listing storage listing = listings[_tokenId];
        require(listing.active == true, "NFT is not listed or already sold");
        require(msg.value == listing.price, "Incorrect price provided");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");

        // Transfer NFT to the buyer
        assetNFT.transferFrom(address(this), msg.sender, _tokenId);

        // Pay the seller
        listing.seller.transfer(msg.value);

        listing.active = false; // Mark as sold

        emit NFTBought(_tokenId, msg.sender, listing.seller, listing.price);
    }

    function unlistItem(uint256 _tokenId) external {
        Listing storage listing = listings[_tokenId];
        require(listing.active == true, "NFT is not listed");
        require(listing.seller == msg.sender, "You are not the seller of this NFT");

        // Transfer NFT back to the seller
        assetNFT.transferFrom(address(this), msg.sender, _tokenId);

        listing.active = false; // Mark as unlisted

        emit NFTUnlisted(_tokenId);
    }
}
