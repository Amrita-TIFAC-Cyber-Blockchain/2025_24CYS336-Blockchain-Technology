// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract GasPricePredictionContract {
    address public oracle;
    uint256 public lastUpdateTime;

    struct GasPrices {
        uint256 safe;
        uint256 standard;
        uint256 fast;
    }

    GasPrices public currentGasPrices;

    event GasPricesUpdated(
        uint256 safe,
        uint256 standard,
        uint256 fast,
        uint256 timestamp
    );
    
    event OracleUpdated(address indexed newOracle);

    constructor() {
        oracle = msg.sender;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only the oracle can call this function");
        _;
    }

   
    function updateGasPrices(uint256 _safe, uint256 _standard, uint256 _fast) public onlyOracle {
        currentGasPrices = GasPrices({
            safe: _safe,
            standard: _standard,
            fast: _fast
        });
        lastUpdateTime = block.timestamp;
        emit GasPricesUpdated(_safe, _standard, _fast, block.timestamp);
    }
    
  
    function getGasPrices() public view returns (GasPrices memory) {
        return currentGasPrices;
    }

   
    function setOracle(address _newOracle) public {
        require(msg.sender == oracle, "Only the current oracle can change the oracle address");
        require(_newOracle != address(0), "New oracle address cannot be zero");
        oracle = _newOracle;
        emit OracleUpdated(_newOracle);
    }
}
