// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract FoodSafetyTraceability {

    address public admin;        // Food Safety Dept (deployer)
    address public manufacturer; 
    address public distributor;  
    address public wholesaler;   
    address public retailer;   
    address public customer;     // view-only

    
    struct Company {
        string name;          // company name
        string fssai;         // FSSAI license
        string location;      // address/location text
        string gstin;         // GSTIN
        address wallet;       
        bool exists;
    }

    Company public manufacturerCompany;
    Company public distributorCompany;
    Company public wholesalerCompany;
    Company public retailerCompany;
    Company public customerCompany;


    struct Product {
        string epc;          // product/batch EPC
        string name;         // product name
        string batch;        // batch
        address createdBy;   // manufacturer address
        uint256 createdOn;   
        bool exists;
    }

    mapping(string => Product) public productInfo; // epc => Product

   

   
    struct ManufacturerEvent {
        address addedBy;           // manufacturer
        string epc;
        string productName;
        string batch;
        string toCompanyName;      // receiver name
        string toCompanyGSTIN;     // receiver GST
        string storageType;        // Cold/Frozen/Ambient
        int256 temperatureC;       // temperature
        uint256 timestamp;
    }
    mapping(string => ManufacturerEvent[]) private manufacturerEvents; //  events

    struct DistributorEvent {
        address addedBy;             //  distributor
        string epc;
        string productName;
        string fromCompanyName;
        string fromCompanyGSTIN;
        string transportAgencyName;  // transporter name
        string transportAgencyGSTIN; // transporter GST
        string toCompanyName;
        string toCompanyGSTIN;
        uint256 timestamp;
    }
    mapping(string => DistributorEvent[]) private distributorEvents; //  events

    
    struct WholesalerEvent {
        address addedBy;            // wholesaler
        string epc;
        string productName;
        string fromCompanyName;
        string fromCompanyGSTIN;
        string toCompanyName;
        string toCompanyGSTIN;
        string meansOfTransport;    // own/agency
        string transportAgencyName; // if agency
        string transportAgencyGSTIN;// if agency
        uint256 timestamp;
    }
    mapping(string => WholesalerEvent[]) private wholesalerEvents; //  events

    
    struct RetailerEvent {
        address addedBy;           // retailer
        string epc;
        string productName;
        string fromCompanyName;
        string fromCompanyGSTIN;
        uint256 timestamp;
    }
    mapping(string => RetailerEvent[]) private retailerEvents; // events

   
    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }
    modifier onlyManufacturer() {
        require(msg.sender == manufacturer, "Only manufacturer");
        _;
    }
    modifier onlyDistributor() {
        require(msg.sender == distributor, "Only distributor");
        _;
    }
    modifier onlyWholesaler() {
        require(msg.sender == wholesaler, "Only wholesaler");
        _;
    }
    modifier onlyRetailer() {
        require(msg.sender == retailer, "Only retailer");
        _;
    }

    
    function adminRegisterManufacturerCompany(
        string memory name_,
        string memory fssai_,
        string memory location_,
        string memory gstin_,
        address wallet_
    ) public onlyAdmin {
        require(wallet_ != address(0), "Invalid wallet");
        manufacturerCompany = Company({
            name: name_,
            fssai: fssai_,
            location: location_,
            gstin: gstin_,
            wallet: wallet_,
            exists: true
        });
        manufacturer = wallet_;
    }

    function adminRegisterDistributorCompany(
        string memory name_,
        string memory fssai_,
        string memory location_,
        string memory gstin_,
        address wallet_
    ) public onlyAdmin {
        require(wallet_ != address(0), "Invalid wallet");
        distributorCompany = Company({
            name: name_,
            fssai: fssai_,
            location: location_,
            gstin: gstin_,
            wallet: wallet_,
            exists: true
        });
        distributor = wallet_;
    }

    function adminRegisterWholesalerCompany(
        string memory name_,
        string memory fssai_,
        string memory location_,
        string memory gstin_,
        address wallet_
    ) public onlyAdmin {
        require(wallet_ != address(0), "Invalid wallet");
        wholesalerCompany = Company({
            name: name_,
            fssai: fssai_,
            location: location_,
            gstin: gstin_,
            wallet: wallet_,
            exists: true
        });
        wholesaler = wallet_;
    }

    function adminRegisterRetailerCompany(
        string memory name_,
        string memory fssai_,
        string memory location_,
        string memory gstin_,
        address wallet_
    ) public onlyAdmin {
        require(wallet_ != address(0), "Invalid wallet");
        retailerCompany = Company({
            name: name_,
            fssai: fssai_,
            location: location_,
            gstin: gstin_,
            wallet: wallet_,
            exists: true
        });
        retailer = wallet_;
    }

    function adminRegisterCustomer(
        string memory name_,
        string memory fssai_,   // optional/empty
        string memory location_,
        string memory gstin_,
        address wallet_
    ) public onlyAdmin {
        require(wallet_ != address(0), "Invalid wallet");
        customerCompany = Company({
            name: name_,
            fssai: fssai_,
            location: location_,
            gstin: gstin_,
            wallet: wallet_,
            exists: true
        });
        customer = wallet_;
    }


    function manufacturerAddProductAndEvent(
        string memory epc,
        string memory productName,
        string memory batch,
        string memory toCompanyName,
        string memory toCompanyGSTIN,
        string memory storageType,
        int256 temperatureC

    ) public onlyManufacturer {
        require(manufacturerCompany.exists, "Manufacturer not registered");
        require(bytes(epc).length > 0, "EPC required");

        
        if (!productInfo[epc].exists) {
            productInfo[epc] = Product({
                epc: epc,
                name: productName,
                batch: batch,
                createdBy: msg.sender,
                createdOn: block.timestamp,
                exists: true
            });
        }
        
        manufacturerEvents[epc].push(ManufacturerEvent({
            addedBy: msg.sender,
            epc: epc,
            productName: productName,
            batch: batch,
            toCompanyName: toCompanyName,
            toCompanyGSTIN: toCompanyGSTIN,
            storageType: storageType,
            temperatureC: temperatureC,
            timestamp: block.timestamp
        }));
    }

   
    function distributorAddEvent(
        string memory epc,
        string memory productName,
        string memory fromCompanyName,
        string memory fromCompanyGSTIN,
        string memory transportAgencyName,
        string memory transportAgencyGSTIN,
        string memory toCompanyName,
        string memory toCompanyGSTIN
    ) public onlyDistributor {
        require(distributorCompany.exists, "Distributor not registered");
        require(productInfo[epc].exists, "Unknown EPC");
        distributorEvents[epc].push(DistributorEvent({
            addedBy: msg.sender,
            epc: epc,
            productName: productName,
            fromCompanyName: fromCompanyName,
            fromCompanyGSTIN: fromCompanyGSTIN,
            transportAgencyName: transportAgencyName,
            transportAgencyGSTIN: transportAgencyGSTIN,
            toCompanyName: toCompanyName,
            toCompanyGSTIN: toCompanyGSTIN,
            timestamp: block.timestamp
        }));
    }

   
    function wholesalerAddEvent(
        string memory epc,
        string memory productName,
        string memory fromCompanyName,
        string memory fromCompanyGSTIN,
        string memory toCompanyName,
        string memory toCompanyGSTIN,
        string memory meansOfTransport,     // "own" or "agency"
        string memory transportAgencyName,  // if agency
        string memory transportAgencyGSTIN  // if agency
    ) public onlyWholesaler {
        require(wholesalerCompany.exists, "Wholesaler not registered");
        require(productInfo[epc].exists, "Unknown EPC");
        wholesalerEvents[epc].push(WholesalerEvent({
            addedBy: msg.sender,
            epc: epc,
            productName: productName,
            fromCompanyName: fromCompanyName,
            fromCompanyGSTIN: fromCompanyGSTIN,
            toCompanyName: toCompanyName,
            toCompanyGSTIN: toCompanyGSTIN,
            meansOfTransport: meansOfTransport,
            transportAgencyName: transportAgencyName,
            transportAgencyGSTIN: transportAgencyGSTIN,
            timestamp: block.timestamp
        }));
    }

    
    function retailerAddEvent(
        string memory epc,
        string memory productName,
        string memory fromCompanyName,
        string memory fromCompanyGSTIN
    ) public onlyRetailer {
        require(retailerCompany.exists, "Retailer not registered");
        require(productInfo[epc].exists, "Unknown EPC");
        retailerEvents[epc].push(RetailerEvent({
            addedBy: msg.sender,
            epc: epc,
            productName: productName,
            fromCompanyName: fromCompanyName,
            fromCompanyGSTIN: fromCompanyGSTIN,
            timestamp: block.timestamp
        }));
    }

    function getProduct(string memory epc) public view returns (Product memory) {
        return productInfo[epc];
    }

    function getManufacturerEvents(string memory epc) public view returns (ManufacturerEvent[] memory) {
        return manufacturerEvents[epc];
    }

    function getDistributorEvents(string memory epc) public view returns (DistributorEvent[] memory) {
        return distributorEvents[epc];
    }

    function getWholesalerEvents(string memory epc) public view returns (WholesalerEvent[] memory) {
        return wholesalerEvents[epc];
    }

    function getRetailerEvents(string memory epc) public view returns (RetailerEvent[] memory) {
        return retailerEvents[epc];
    }

    // EPC exists
    function productExists(string memory epc) public view returns (bool) {
        return productInfo[epc].exists;
    }
}
