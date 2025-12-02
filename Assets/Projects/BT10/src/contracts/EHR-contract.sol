// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EHRControlContract {
    // Mapping from patient address to a mapping of doctor address to access status
    mapping(address => mapping(address => bool)) public accessControl;
    
    // Mapping from patient address to a list of their authorized doctors
    mapping(address => address[]) public authorizedDoctors;

    // Mapping for storing metadata URI (e.g., IPFS hash) for each patient's EHR
    mapping(address => string) public ehrMetadata;

    event AccessGranted(address indexed patient, address indexed doctor, string fileAccess);
    event AccessRevoked(address indexed patient, address indexed doctor);
    event EhrMetadataUpdated(address indexed patient, string newMetadataUri);

   
    function grantAccess(address doctor, string memory fileAccess) public {
        require(doctor != address(0), "Invalid doctor address");
        if (!accessControl[msg.sender][doctor]) {
            accessControl[msg.sender][doctor] = true;
            authorizedDoctors[msg.sender].push(doctor);
        }
        emit AccessGranted(msg.sender, doctor, fileAccess);
    }

    function revokeAccess(address doctor) public {
        require(accessControl[msg.sender][doctor], "Doctor does not have access");
        accessControl[msg.sender][doctor] = false;

        // Remove doctor from the authorized list
        address[] storage doctors = authorizedDoctors[msg.sender];
        for (uint i = 0; i < doctors.length; i++) {
            if (doctors[i] == doctor) {
                doctors[i] = doctors[doctors.length - 1];
                doctors.pop();
                break;
            }
        }
        emit AccessRevoked(msg.sender, doctor);
    }

   
    function hasAccess(address patient, address doctor) public view returns (bool) {
        return accessControl[patient][doctor];
    }
    
   
    function setEhrMetadataUri(string memory _metadataUri) public {
        ehrMetadata[msg.sender] = _metadataUri;
        emit EhrMetadataUpdated(msg.sender, _metadataUri);
    }
  
    function getAuthorizedDoctors(address patient) public view returns (address[] memory) {
        return authorizedDoctors[patient];
    }
}
