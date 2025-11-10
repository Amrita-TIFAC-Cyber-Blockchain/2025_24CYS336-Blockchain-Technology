// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

interface IDogRegistry {
    function updateAdoptionStatus(string memory _dogId, address _newOwner, bool _status) external;
}

interface IPETToken {
    function mint(address to, uint256 amount) external;
}

interface IAdoptionCertificate {
    function safeMint(address to, string memory tokenUri) external returns (uint256);
}

/**
 * @title AdoptionManager
 * @dev Central contract connecting registry, token, and NFT systems.
 */
contract AdoptionManager {

    struct AdoptionRequest {
        string dogId;
        bytes32 adopterHash;
        address adopterWallet;
        string message;
        bool approved;
        bool processed;
    }

    mapping(string => AdoptionRequest) private requests;
    mapping(string => string[]) private dogRequests;

    address private admin;
    IDogRegistry private dogRegistry;
    IPETToken private petToken;
    IAdoptionCertificate private certificateNFT;

    event RequestCreated(string requestId, string dogId, bytes32 adopterHash);
    event RequestProcessed(string requestId, bool approved, address adopter, uint256 certId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(address _dogRegistry, address _petToken, address _certificateNFT) {
        admin = msg.sender;
        dogRegistry = IDogRegistry(_dogRegistry);
        petToken = IPETToken(_petToken);
        certificateNFT = IAdoptionCertificate(_certificateNFT);
    }

    function createRequest(
        string memory _requestId,
        string memory _dogId,
        bytes32 _adopterHash,
        string memory _message
    ) public {
        require(bytes(requests[_requestId].dogId).length == 0, "Request exists");
        requests[_requestId] = AdoptionRequest({
            dogId: _dogId,
            adopterHash: _adopterHash,
            adopterWallet: address(0),
            message: _message,
            approved: false,
            processed: false
        });
        dogRequests[_dogId].push(_requestId);
        emit RequestCreated(_requestId, _dogId, _adopterHash);
    }

    function processRequest(
        string memory _requestId,
        bool _approve,
        address _adopterWallet,
        string memory _certURI
    ) public onlyAdmin {
        require(bytes(requests[_requestId].dogId).length != 0, "Request not found");
        require(!requests[_requestId].processed, "Already processed");

        requests[_requestId].approved = _approve;
        requests[_requestId].processed = true;

        uint256 certId = 0;
        if (_approve) {
            requests[_requestId].adopterWallet = _adopterWallet;

            // Update registry
            dogRegistry.updateAdoptionStatus(requests[_requestId].dogId, _adopterWallet, true);

            // Mint 1 PET token as reward
            petToken.mint(_adopterWallet, 1);

            // Mint NFT certificate
            certId = certificateNFT.safeMint(_adopterWallet, _certURI);
        }

        emit RequestProcessed(_requestId, _approve, _adopterWallet, certId);
    }

    function viewRequest(string memory _requestId)
        public view
        returns (string memory, bytes32, address, string memory, bool, bool)
    {
        AdoptionRequest memory r = requests[_requestId];
        return (r.dogId, r.adopterHash, r.adopterWallet, r.message, r.approved, r.processed);
    }

    function getRequestsByDog(string memory _dogId) public view returns (string[] memory) {
        return dogRequests[_dogId];
    }

    function getAdmin() public view returns (address) {
        return admin;
    }
}
