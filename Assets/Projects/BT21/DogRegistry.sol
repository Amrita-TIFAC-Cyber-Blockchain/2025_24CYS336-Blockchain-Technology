// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title DogRegistry
 * @dev Register and track stray dogs with verifiable and immutable records.
 */
contract DogRegistry {

    struct Dog {
        string dogId;
        string name;
        string breed;
        uint8 age;
        string gender;
        string ipfsHash;
        address currentOwner;
        bool adopted;
    }

    mapping(string => Dog) private dogDetails;
    address private admin;

    event DogRegistered(string dogId, string name, string breed);
    event AdoptionUpdated(string dogId, address newOwner, bool adopted);

    modifier isAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerDog(
        string memory _dogId,
        string memory _name,
        string memory _breed,
        uint8 _age,
        string memory _gender,
        string memory _ipfsHash
    ) public isAdmin {
        require(bytes(dogDetails[_dogId].dogId).length == 0, "Dog already registered");

        dogDetails[_dogId] = Dog({
            dogId: _dogId,
            name: _name,
            breed: _breed,
            age: _age,
            gender: _gender,
            ipfsHash: _ipfsHash,
            currentOwner: admin,
            adopted: false
        });

        emit DogRegistered(_dogId, _name, _breed);
    }

    function viewDog(string memory _dogId) public view returns (
        string memory,
        string memory,
        string memory,
        uint8,
        string memory,
        string memory,
        address,
        bool
    ) {
        Dog memory d = dogDetails[_dogId];
        return (d.dogId, d.name, d.breed, d.age, d.gender, d.ipfsHash, d.currentOwner, d.adopted);
    }

    function updateAdoptionStatus(string memory _dogId, address _newOwner, bool _status) public {
        require(bytes(dogDetails[_dogId].dogId).length != 0, "Dog not found");
        dogDetails[_dogId].adopted = _status;
        dogDetails[_dogId].currentOwner = _newOwner;
        emit AdoptionUpdated(_dogId, _newOwner, _status);
    }

    function getAdmin() public view returns (address) {
        return admin;
    }
}
