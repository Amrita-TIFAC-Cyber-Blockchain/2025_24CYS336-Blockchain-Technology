# 24CYS336 - Blockchain-Technology

![Batch-22UCYS](https://img.shields.io/badge/Batch-22UCYS-gold) ![UG](https://img.shields.io/badge/UG-blue) ![Subject-Blockchain](https://img.shields.io/badge/Subject-Blockchain-blue)

<br/>

## BT#24

![Member-Mukesh Singh](https://img.shields.io/badge/Member-Mukesh%20Singh-gold)
![Member-Deepana S](https://img.shields.io/badge/Member-Deepana%20S-gold)
![Member-Harsahn S](https://img.shields.io/badge/Member-Harsahn%20S-gold)


![](https://img.shields.io/badge/Reviewed-TBD-brown)

---

### Project Title

**Decentralized Smart Grid Load-Flow Management using Blockchain**

---

### Topic

This project addresses the problem statement: **In smart grid decentralisation using Blockchain** — specifically focusing on combining blockchain technology with load-flow analysis to enable secure, auditable, and incentive-compatible local energy markets and decentralized control for distribution networks.

---

### Problem Statement (Blockchain + Load Flow Focus)

Traditional power distribution systems rely on centralized control and single-point data authorities for load monitoring, demand response, and settlement. As distributed energy resources (DERs) such as rooftop solar, batteries, and electric vehicles proliferate, the grid needs decentralized mechanisms for secure data sharing, automated settlements, resilient control, and local optimization of power flows.

This project will design and prototype a blockchain-enabled framework that:

* Collects validated measurements (voltage, current, power injections) from distributed nodes.
* Performs secure transactions that represent energy trades, demand response bids, or flexibility offers.
* Integrates with a load-flow calculation module to evaluate network constraints in near-real time.
* Uses blockchain as the tamper-evident ledger for settlements, distributed agreements, and provenance of measurement data.

Goals:

1. Design a hybrid architecture where time-sensitive load-flow computations run off-chain (for speed) while critical events, settlements, and proofs are anchored on-chain.
2. Demonstrate peer-to-peer energy trading with constraint-aware matching (respecting line limits and nodal voltages using load-flow checks).
3. Provide auditability, accountability, and economic incentives for participants.
4. Evaluate benefits in terms of reliability, transparency, and resilience compared to a baseline centralized approach.

---

### Literature Survey (short & focused)

1. **Blockchain for Energy Trading** — surveys show blockchain can enable peer-to-peer (P2P) energy marketplaces by decentralizing trust and enabling programmable payments (smart contracts). Strengths: settlement automation, tamper-proof record. Weaknesses: latency, on-chain costs, and privacy concerns.

2. **Load Flow in Distribution Systems** — power-flow (load-flow) analysis (e.g., Newton–Raphson, Gauss–Seidel, and fast decoupled methods) is required to assess voltage profiles and thermal limits. Distribution systems often require unbalanced and radial-aware algorithms.

3. **Hybrid Architectures** — research suggests combining off-chain compute (for heavy/real-time analytics such as load-flow) with on-chain settlement to balance performance and security. Off-chain oracles and Merkle proofs can be used to bridge results to the ledger.

4. **Privacy & Incentivization** — differential privacy, zero-knowledge proofs, and aggregation techniques are explored to protect user data while enabling verifiable outcomes. Tokenization and micro-payments are used to reward flexibility providers.

(References and specific papers will be collected and added to the References section during development.)

---

### Proposed Architecture

**Overview:**

* **Edge layer (Distributed Nodes):** Smart meters/DER controllers measure local states (voltage, current, power injections) and produce signed telemetry. They also post energy offers/bids.

* **Local Aggregators / Oracles:** Aggregate measurements, run fast load-flow checks (radial/unbalanced solver), validate feasibility of proposed trades against network constraints, and produce a compact cryptographic commitment (e.g., Merkle root) or zero-knowledge proof of feasibility.

* **Permissioned Blockchain Layer:** Stores trades, settlement records, validated commitments, and access control policies. Smart contracts execute matching rules, escrow payments, and dispute resolution.

* **Market & Optimization Layer (Off-chain):** Runs matching algorithms, price discovery, and more detailed power-flow simulations for planning and near-real-time decisions.

* **User Interface / Dashboard:** Web/mobile app for participants to view offers, accept trades, and review settlement history.

**Data flow:**

1. Node posts an energy offer (signed) to a local aggregator.
2. Aggregator runs a fast load-flow to check feasibility (voltage limits, line currents). If feasible, it posts an on-chain transaction referencing the offer and a compact proof/commitment.
3. Smart contract matches offers and locks tokens in escrow.
4. After delivery window, meters provide signed measurements; aggregator reconciles delivered energy and triggers on-chain settlement.

**Security & Privacy Measures:**

* Digital signatures for device identity.
* Aggregation & anonymization to reduce privacy exposure.
* Optionally, use zero-knowledge proofs to prove feasibility without revealing raw measurements.

**High-level ASCII Architectural Diagram**

```
[DER / Smart Meter] --- signed telemetry ---> [Local Aggregator / Oracle] --- commits proof ---> [Permissioned Blockchain / Smart Contracts]
      |                                                 ^                                   |
      |-- control signals / price updates <--------------|                                   |
                                                                                          [Dashboard]
```

(We recommend adding a formal diagram (PNG/SVG) in `/docs/architecture.png` — the repository should include the visual created from a drawing tool.)

---

### Methodology & Implementation Plan

**Tech Stack (suggested):**

* Blockchain platform: Hyperledger Fabric or Ethereum (permissioned layer with private transactions).
* Smart contracts: Solidity (Ethereum) or Chaincode (Go/Node for Fabric).
* Off-chain compute: Python (NumPy/Pandapower/PYPOWER) or MATLAB for load flow.
* Messaging / IoT: MQTT or HTTPS REST (TLS) for telemetry.
* Database / Indexing: PostgreSQL or a time-series DB for measurements.
* Frontend: React.js for dashboards.

**Phases:**

1. **Requirements & Design (2-3 weeks):** Define use-cases, constraints, and data formats.
2. **Prototype data model & smart contracts (3-4 weeks):** Implement contracts for offers, escrow, settlement, dispute.
3. **Load-flow module & oracle integration (3-4 weeks):** Build off-chain load-flow solver and aggregator interface.
4. **End-to-end demo (2-3 weeks):** Simulate several nodes, run matching and complete settlement.
5. **Testing & Evaluation (2-3 weeks):** Functional tests, stress tests, and comparison against centralized baseline.

**Deliverables:**

* Working prototype (smart contract + off-chain load-flow + simulator).
* README and code documentation.
* Evaluation report (metrics: latency, settlement accuracy, violation rate, privacy leakage analysis).

---

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

This project contributes to multiple SDGs:

* **SDG 7 – Affordable and Clean Energy:** By enabling peer-to-peer energy trading and better integration of distributed renewable resources, the project supports cleaner and more efficient local energy use.

* **SDG 9 – Industry, Innovation and Infrastructure:** Demonstrates innovation in energy infrastructure with decentralized, resilient control.

* **SDG 11 – Sustainable Cities and Communities:** Local markets and distributed control improve urban energy resilience and reduce reliance on centralized infrastructure.

* **SDG 13 – Climate Action:** Better integration of renewables and demand-side flexibility reduces emissions associated with fossil-fuel peaker plants.

---

### Expected Outcomes & Success Criteria

* A prototype demonstrating secure P2P offers and settlements with on-chain records and off-chain load-flow checks.
* Quantifiable improvement in settlement transparency and tamper-evidence compared to a control system.
* Demonstration that constrained matching prevents voltage or line violations in simulated scenarios.
* Documentation and code usable as a starting point for further research or pilot deployment.

---

### Risks & Mitigations

* **Scalability / Latency:** Mitigation — keep heavy compute off-chain, store only commitments on-chain; use permissioned chains optimized for throughput.
* **Privacy leakage:** Mitigation — aggregate measurements, use zero-knowledge techniques or differential privacy.
* **Regulatory & Interoperability:** Mitigation — design the system to be modular and comply with local grid codes where possible.

---

### References (initial — expand during development)

1. Survey articles on blockchain for energy trading (peer-reviewed journals and conference proceedings).
2. Standard texts on load-flow analysis (e.g., power system analysis textbooks) and distribution network algorithms.
3. Documentation for the chosen blockchain stack (Hyperledger Fabric, Ethereum).
4. Technical articles on oracle design and on-chain/off-chain hybrid architectures.

(The project README will include a properly formatted references list with DOIs/URLs as the literature review is finalized.)

---

