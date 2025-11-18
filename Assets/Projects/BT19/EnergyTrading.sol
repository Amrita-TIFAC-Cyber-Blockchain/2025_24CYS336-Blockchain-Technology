// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract MultiEnergyBlocks {

    //Block 1: Producer Information
    struct ProducerBlock {
        address producer;
        string sourceType;
        uint capacity;
        uint availableEnergy;
    }

    //Block 2: Consumer Information
    struct ConsumerBlock {
        address consumer;
        string location;
        uint demand;
    }

    //Block 3: Energy Data Block
    struct EnergyBlock {
        uint blockID;
        address producer;
        address consumer;
        uint energyTransferred;
        uint timestamp;
    }

    //Block 4: System Info Block
    struct SystemBlock {
        uint totalProducers;
        uint totalConsumers;
        uint totalEnergy;
    }

    mapping(address => ProducerBlock) public producers;
    mapping(address => ConsumerBlock) public consumers;
    mapping(uint => EnergyBlock) public energyBlocks;

    SystemBlock public systemStats;
    uint public nextBlockID;

    //Add Producer
    function addProducer(address _p, string memory _type, uint _capacity) external {
        producers[_p] = ProducerBlock(_p, _type, _capacity, _capacity);

        systemStats.totalProducers++;
        systemStats.totalEnergy += _capacity;
    }

    //Add Consumer
    function addConsumer(address _c, string memory _loc, uint _demand) external {
        consumers[_c] = ConsumerBlock(_c, _loc, _demand);
        systemStats.totalConsumers++;
    }

    //Energy Block
    function addEnergyBlock(address _p, address _c, uint _amount) external {

        //Check producer existence
        require(producers[_p].capacity > 0, "Producer not registered");

        //Check energy availability
        require(producers[_p].availableEnergy >= _amount, "Not enough energy");

        
        producers[_p].availableEnergy -= _amount;
        systemStats.totalEnergy -= _amount;
        energyBlocks[nextBlockID] = EnergyBlock(
            nextBlockID,
            _p,
            _c,
            _amount,
            block.timestamp
        );

        nextBlockID++;
    }
}
