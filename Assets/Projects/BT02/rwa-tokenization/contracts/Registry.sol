// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Registry is AccessControl {
    bytes32 public constant KYC_VERIFIED_ROLE = keccak256("KYC_VERIFIED_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Deployer is the default admin
    }

    function grantKycVerifiedRole(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(KYC_VERIFIED_ROLE, _account);
    }

    function revokeKycVerifiedRole(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(KYC_VERIFIED_ROLE, _account);
    }

    function isKycVerified(address _account) public view returns (bool) {
        return hasRole(KYC_VERIFIED_ROLE, _account);
    }
}
