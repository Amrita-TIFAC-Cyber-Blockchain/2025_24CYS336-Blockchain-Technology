// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EnergyMarket is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    struct Transaction {
        address sender;
        address receiver;
        uint256 amountInKwh;
        uint256 timestamp;
    }

    mapping(address => bool) public isProsumer;
    mapping(address => uint256) public prosumerEnergyBalance;
    Transaction[] public transactionHistory;

    event ProsumerRegistered(address indexed prosumer);
    event EnergyReported(address indexed prosumer, uint256 newBalance);
    event TradeCompleted(
        address indexed seller,
        address indexed buyer,
        uint256 amountInKwh,
        uint256 timestamp
    );

    modifier onlyProsumer() {
        require(isProsumer[msg.sender], "Only registered prosumers can perform this action.");
        _;
    }

    function registerProsumer(address _prosumer) public onlyOwner {
        require(!isProsumer[_prosumer], "Prosumer is already registered.");
        isProsumer[_prosumer] = true;
        prosumerEnergyBalance[_prosumer] = 0;
        emit ProsumerRegistered(_prosumer);
    }

    function reportEnergySurplus(uint256 _surplusInKwh) public onlyProsumer {
        prosumerEnergyBalance[msg.sender] += _surplusInKwh;
        emit EnergyReported(msg.sender, prosumerEnergyBalance[msg.sender]);
    }

    function executeP2PTrade(address _buyer, uint256 _amountInKwh) public onlyProsumer {
        require(prosumerEnergyBalance[msg.sender] >= _amountInKwh, "Insufficient energy balance.");
        require(isProsumer[_buyer], "Invalid buyer address");

        prosumerEnergyBalance[msg.sender] -= _amountInKwh;
        prosumerEnergyBalance[_buyer] += _amountInKwh;

        transactionHistory.push(Transaction(msg.sender, _buyer, _amountInKKwh, block.timestamp));

        emit TradeCompleted(msg.sender, _buyer, _amountInKwh, block.timestamp);
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactionHistory;
    }
}