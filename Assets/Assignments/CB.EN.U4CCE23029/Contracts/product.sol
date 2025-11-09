// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Owner {

    address private owner;
    address private storeowner;
    address private storemanager;

    mapping (uint32 => prod) proddetails;

    struct prod {
        string prodname;
        string price;
        uint16 stock;
    }

    prod p;


    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier isStoreOwner() {
        require(msg.sender == storeowner,"ONLY Store Owner can access");
        _;
    }

    modifier isStoreManager(){
        require(msg.sender == storemanager, "ONLY Store Manager can access");
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        storeowner = 0xCd5c864D56e2F9b4212094c3170Dcd6D8907EDc6;
        storemanager = 0x63056E3DCcB4d15a246FF3f387cc342e29fa3176;
    }

    function changeStoreManager(address _newmanager) public isStoreOwner {
        storemanager = _newmanager;
    }

    function addproduct(uint32 _prodid, string memory _prodname, string memory _price, uint16 _stock) public isStoreManager {
        p.prodname = _prodname;
        p.price = _price;
        p.stock = _stock;
        proddetails[_prodid] = p;
    }

   }