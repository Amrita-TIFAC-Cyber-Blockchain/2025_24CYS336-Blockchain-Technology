// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PropertyRegistry {
    struct Property {
        uint256 id;
        address owner;
        string metadataHash; // IPFS hash containing all file references
        uint256 timestamp;
        bool exists;
    }

    // Mappings
    mapping(uint256 => Property) public properties;
    mapping(address => uint256[]) private ownerProperties;
    
    // Events for tracking history
    event PropertyRegistered(
        uint256 indexed id, 
        address indexed owner, 
        string metadataHash,
        uint256 timestamp
    );
    
    event OwnershipTransferred(
        uint256 indexed id, 
        address indexed previousOwner, 
        address indexed newOwner,
        uint256 timestamp
    );

    // Modifiers
    modifier propertyExists(uint256 id) {
        require(properties[id].exists, "Property does not exist");
        _;
    }

    modifier onlyPropertyOwner(uint256 id) {
        require(
            properties[id].owner == msg.sender, 
            "Only property owner can perform this action"
        );
        _;
    }

    /**
     * @dev Register a new property with metadata hash
     * @param id Unique property identifier
     * @param metadataHash IPFS hash containing property documents and metadata
     */
    function registerProperty(uint256 id, string memory metadataHash) public {
        require(!properties[id].exists, "Property ID already registered");
        require(bytes(metadataHash).length > 0, "Metadata hash required");
        require(id > 0, "Invalid property ID");

        properties[id] = Property({
            id: id,
            owner: msg.sender,
            metadataHash: metadataHash,
            timestamp: block.timestamp,
            exists: true
        });

        ownerProperties[msg.sender].push(id);

        emit PropertyRegistered(id, msg.sender, metadataHash, block.timestamp);
    }

    /**
     * @dev Transfer property ownership to a new owner
     * @param id Property ID
     * @param newOwner Address of the new owner
     */
    function transferOwnership(uint256 id, address newOwner) 
        public 
        propertyExists(id) 
        onlyPropertyOwner(id) 
    {
        require(newOwner != address(0), "Invalid new owner address");
        require(newOwner != msg.sender, "Cannot transfer to yourself");

        address previousOwner = properties[id].owner;
        properties[id].owner = newOwner;

        // Add to new owner's properties
        ownerProperties[newOwner].push(id);

        // Note: We don't remove from previous owner's array for gas efficiency
        // Front-end should filter based on current ownership

        emit OwnershipTransferred(id, previousOwner, newOwner, block.timestamp);
    }

    /**
     * @dev Update property metadata (only owner can update)
     * @param id Property ID
     * @param newMetadataHash New IPFS metadata hash
     */
    function updateMetadata(uint256 id, string memory newMetadataHash) 
        public 
        propertyExists(id) 
        onlyPropertyOwner(id) 
    {
        require(bytes(newMetadataHash).length > 0, "Metadata hash required");
        
        properties[id].metadataHash = newMetadataHash;
        
        // Could emit an event here for metadata updates if needed
    }

    /**
     * @dev Get property details
     * @param id Property ID
     * @return Property details (id, owner, metadataHash, timestamp)
     */
    function getProperty(uint256 id) 
        public 
        view 
        propertyExists(id) 
        returns (uint256, address, string memory, uint256) 
    {
        Property memory p = properties[id];
        return (p.id, p.owner, p.metadataHash, p.timestamp);
    }

    /**
     * @dev Get all property IDs owned by an address
     * @param owner Owner address
     * @return Array of property IDs
     */
    function getPropertiesByOwner(address owner) 
        public 
        view 
        returns (uint256[] memory) 
    {
        return ownerProperties[owner];
    }

    /**
     * @dev Check if a property exists
     * @param id Property ID
     * @return Boolean indicating if property exists
     */
    function propertyExistsById(uint256 id) public view returns (bool) {
        return properties[id].exists;
    }

    /**
     * @dev Get property owner
     * @param id Property ID
     * @return Owner address
     */
    function getPropertyOwner(uint256 id) 
        public 
        view 
        propertyExists(id) 
        returns (address) 
    {
        return properties[id].owner;
    }

    /**
     * @dev Verify if an address owns a specific property
     * @param id Property ID
     * @param owner Address to check
     * @return Boolean indicating ownership
     */
    function verifyOwnership(uint256 id, address owner) 
        public 
        view 
        propertyExists(id) 
        returns (bool) 
    {
        return properties[id].owner == owner;
    }
}
