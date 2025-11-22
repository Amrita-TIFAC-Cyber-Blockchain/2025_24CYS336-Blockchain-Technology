// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/*
 * EwasteMini: simplest version
 * - Roles with GA
 * - Core flow only
 * - Rewards (points) to ALL actors on recycle
 * - Penalties = just a counter/points set by GA (no ETH, no stake)
 */

contract EwasteMini {
    // ----- Roles -----
    address public GA;
    mapping(address => bool) public isProducer;
    mapping(address => bool) public isRetailer;
    mapping(address => bool) public isConsumer;
    mapping(address => bool) public isCollectionCentre;
    mapping(address => bool) public isRecycler;

    modifier onlyGA()        { require(msg.sender == GA, "Only GA"); _; }
    modifier onlyProducer()  { require(isProducer[msg.sender], "Only Producer"); _; }
    modifier onlyRetailer()  { require(isRetailer[msg.sender], "Only Retailer"); _; }
    modifier onlyConsumer()  { require(isConsumer[msg.sender], "Only Consumer"); _; }
    modifier onlyCC()        { require(isCollectionCentre[msg.sender], "Only CC"); _; }
    modifier onlyRecycler()  { require(isRecycler[msg.sender], "Only Recycler"); _; }

    // ----- Rewards (points) -----
    uint256 public rewardPerRecycle;                 // points per participant
    mapping(address => uint256) public rewards;      // points per address

    function setRewardPerRecycle(uint256 points) external onlyGA {
        rewardPerRecycle = points;
    }
    function myRewardBalance() external view returns (uint256) {
        return rewards[msg.sender];
    }

    // ----- Penalties (simple counters / points; no ETH) -----
    uint256 public penaltyPointsPerMiss;             // how many points to add per violation
    mapping(address => uint256) public penalties;    // accumulated penalty points per address
    event PenaltyMarked(uint256 eeeId, address indexed who, uint256 addedPoints, string reason);

    function setPenaltyPointsPerMiss(uint256 pts) external onlyGA {
        penaltyPointsPerMiss = pts;
    }
    function markNonCompliant(uint256 eeeId, address participant, string calldata reason) external onlyGA {
        uint256 pts = penaltyPointsPerMiss;
        if (pts > 0) {
            penalties[participant] += pts;
            emit PenaltyMarked(eeeId, participant, pts, reason);
        }
    }

    // ----- Product -----
    enum Status {
        NONE,
        MANUFACTURED,
        SOLD_TO_RETAILER,
        SOLD_TO_CONSUMER,
        RETURN_REQUESTED,
        RETURNED_TO_PRODUCER,
        AT_COLLECTION_CENTRE,
        AT_RECYCLER,
        RECYCLED
    }

    struct EEE {
        uint256 id;
        address producer;
        address retailer;
        address consumer;
        address cc;
        address recycler;
        Status status;
    }

    mapping(uint256 => EEE) public eees;
    mapping(uint256 => bool) public exists;

    // ----- GA & roles -----
    function registerGA() external {
        require(GA == address(0), "GA already set");
        GA = msg.sender;
    }
    function addProducer(address a)         external onlyGA { isProducer[a] = true; }
    function addRetailer(address a)         external onlyGA { isRetailer[a] = true; }
    function addConsumer(address a)         external onlyGA { isConsumer[a] = true; }
    function addCollectionCentre(address a) external onlyGA { isCollectionCentre[a] = true; }
    function addRecycler(address a)         external onlyGA { isRecycler[a] = true; }

    // ----- Lifecycle (core flow) -----
    // PR: create
    function registerEEE(uint256 eeeId) external onlyProducer {
        require(!exists[eeeId], "EEE exists");
        exists[eeeId] = true;
        eees[eeeId] = EEE({
            id: eeeId,
            producer: msg.sender,
            retailer: address(0),
            consumer: address(0),
            cc: address(0),
            recycler: address(0),
            status: Status.MANUFACTURED
        });
    }
    // PR -> RT
    function producerToRetailer(uint256 eeeId, address retailerAddr) external onlyProducer {
        EEE storage e = eees[eeeId];
        require(exists[eeeId], "EEE missing");
        require(e.producer == msg.sender, "Not producer");
        require(isRetailer[retailerAddr], "Invalid retailer");
        e.retailer = retailerAddr;
        e.status = Status.SOLD_TO_RETAILER;
    }
    // RT -> CS
    function retailerToConsumer(uint256 eeeId, address consumerAddr) external onlyRetailer {
        EEE storage e = eees[eeeId];
        require(exists[eeeId], "EEE missing");
        require(e.retailer == msg.sender, "Not this retailer");
        require(isConsumer[consumerAddr], "Invalid consumer");
        e.consumer = consumerAddr;
        e.status = Status.SOLD_TO_CONSUMER;
    }
    // CS requests return
    function consumerReturn(uint256 eeeId) external onlyConsumer {
        EEE storage e = eees[eeeId];
        require(exists[eeeId], "EEE missing");
        require(e.consumer == msg.sender, "Not your product");
        e.status = Status.RETURN_REQUESTED;
    }
    // RT -> PR
    function retailerReturnToProducer(uint256 eeeId) external onlyRetailer {
        EEE storage e = eees[eeeId];
        require(exists[eeeId], "EEE missing");
        require(e.retailer == msg.sender, "Not this retailer");
        e.status = Status.RETURNED_TO_PRODUCER;
    }
    // PR -> CC
    function producerToCC(uint256 eeeId, address ccAddr) external onlyProducer {
        EEE storage e = eees[eeeId];
        require(exists[eeeId], "EEE missing");
        require(e.producer == msg.sender, "Not producer");
        require(isCollectionCentre[ccAddr], "Invalid CC");
        e.cc = ccAddr;
        e.status = Status.AT_COLLECTION_CENTRE;
    }
    // CC -> RU
    function ccToRecycler(uint256 eeeId, address recyclerAddr) external onlyCC {
        EEE storage e = eees[eeeId];
        require(exists[eeeId], "EEE missing");
        require(e.cc == msg.sender, "Not this CC");
        require(isRecycler[recyclerAddr], "Invalid recycler");
        e.recycler = recyclerAddr;
        e.status = Status.AT_RECYCLER;
    }
    // RU: recycle + reward ALL (including GA)
    function recyclerMarkRecycled(uint256 eeeId) external onlyRecycler {
        EEE storage e = eees[eeeId];
        require(exists[eeeId], "EEE missing");
        require(e.recycler == msg.sender, "Not this recycler");
        e.status = Status.RECYCLED;

        uint256 r = rewardPerRecycle;
        if (r > 0) {
            if (GA != address(0))         rewards[GA]        += r;
            if (e.producer != address(0)) rewards[e.producer] += r;
            if (e.retailer != address(0)) rewards[e.retailer] += r;
            if (e.consumer != address(0)) rewards[e.consumer] += r;
            if (e.cc != address(0))       rewards[e.cc]       += r;
            if (e.recycler != address(0)) rewards[e.recycler] += r;
        }
    }

    // ----- Views -----
    function getEEE(uint256 eeeId) external view returns (EEE memory) {
        require(exists[eeeId], "EEE not found");
        return eees[eeeId];
    }
}
