// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DigitalArtNFT is ERC721, Ownable {
    using Strings for uint256;

    // Artist struct - stores creator information
    struct Artist {
        address artistAddress;
        bool isActive;
        string name;
    }

    // Artwork metadata
    struct Art {
        uint256 artistId;
        string title;
        bytes32 artHash;
        uint256 timestamp;
    }

    // Storage mappings
    mapping(uint256 => Artist) private artists;
    mapping(address => uint256) private addressToArtistId;
    mapping(uint256 => Art) private artworks;
    mapping(bytes32 => uint256) private hashToTokenId;
    mapping(uint256 => uint256[]) private artistToTokenIds;

    // Counters
    uint256 private nextArtistId = 1;
    uint256 private nextTokenId = 1;

    // Base URI for token metadata
    string private baseURI;

    // Events
    event ArtistAdded(uint256 indexed artistId, address indexed artistAddress, string name);
    event ArtistRemoved(uint256 indexed artistId, address indexed artistAddress);
    event ArtworkRegistered(uint256 indexed tokenId, uint256 indexed artistId, string title, bytes32 artHash);

    constructor(string memory name, string memory symbol, string memory uri)
        ERC721(name, symbol)
        Ownable(msg.sender)
    {
        baseURI = uri;
    }

    // ========== Admin Functions ==========
    function addArtist(address artistAddress, string memory name) external onlyOwner {
        require(addressToArtistId[artistAddress] == 0, "Artist already exists");
        require(artistAddress != address(0), "Invalid address");
        require(bytes(name).length > 0, "Name cannot be empty");

        artists[nextArtistId] = Artist({
            artistAddress: artistAddress,
            isActive: true,
            name: name
        });

        addressToArtistId[artistAddress] = nextArtistId;
        emit ArtistAdded(nextArtistId, artistAddress, name);
        nextArtistId++;
    }

    function removeArtist(address artistAddress) external onlyOwner {
        uint256 artistId = addressToArtistId[artistAddress];
        require(artistId != 0, "Artist not found");
        require(artists[artistId].isActive, "Artist already inactive");

        artists[artistId].isActive = false;
        emit ArtistRemoved(artistId, artistAddress);
    }

    // ========== Artist Functions ==========
    function registerArtwork(string memory title, bytes32 artHash) external {
        uint256 artistId = addressToArtistId[msg.sender];
        require(artistId != 0, "Not a registered artist");
        require(artists[artistId].isActive, "Artist not active");
        require(hashToTokenId[artHash] == 0, "Artwork already registered");
        require(bytes(title).length > 0, "Title cannot be empty");

        artworks[nextTokenId] = Art({
            artistId: artistId,
            title: title,
            artHash: artHash,
            timestamp: block.timestamp
        });

        hashToTokenId[artHash] = nextTokenId;
        artistToTokenIds[artistId].push(nextTokenId);
        _mint(msg.sender, nextTokenId);

        emit ArtworkRegistered(nextTokenId, artistId, title, artHash);
        nextTokenId++;
    }

    // ========== Core NFT Functions ==========
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    // ========== View Functions ==========
    function getArtworkDetails(uint256 tokenId) external view returns (
        uint256 artistId,
        address artistAddress,
        string memory artistName,
        address owner,
        string memory title,
        bytes32 artHash,
        uint256 timestamp
    ) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");

        Art memory art = artworks[tokenId];
        Artist memory artist = artists[art.artistId];

        return (
            art.artistId,
            artist.artistAddress,
            artist.name,
            ownerOf(tokenId),
            art.title,
            art.artHash,
            art.timestamp
        );
    }

    function getArtworksByArtist(uint256 artistId) external view returns (uint256[] memory) {
        require(artistId != 0 && artistId < nextArtistId, "Invalid artist ID");
        require(artists[artistId].isActive, "Artist not active");
        return artistToTokenIds[artistId];
    }

    function getArtworkByHash(bytes32 artHash) external view returns (
        uint256 tokenId,
        uint256 artistId,
        address artistAddress,
        string memory artistName,
        address owner,
        string memory title,
        uint256 timestamp
    ) {
        tokenId = hashToTokenId[artHash];
        require(tokenId != 0, "Artwork not found");

        Art memory art = artworks[tokenId];
        Artist memory artist = artists[art.artistId];

        return (
            tokenId,
            art.artistId,
            artist.artistAddress,
            artist.name,
            ownerOf(tokenId),
            art.title,
            art.timestamp
        );
    }

    function getTotalArtworks() external view returns (uint256) {
        return nextTokenId - 1;
    }

    function getTotalArtists() external view returns (uint256) {
        return nextArtistId - 1;
    }

    function isArtist(address artistAddress) external view returns (bool) {
        uint256 artistId = addressToArtistId[artistAddress];
        return artistId != 0 && artists[artistId].isActive;
    }

    function getArtistDetails(uint256 artistId) external view returns (
        address artistAddress,
        string memory name,
        bool isActive
    ) {
        require(artistId != 0 && artistId < nextArtistId, "Invalid artist ID");
        Artist memory artist = artists[artistId];
        return (artist.artistAddress, artist.name, artist.isActive);
    }
}