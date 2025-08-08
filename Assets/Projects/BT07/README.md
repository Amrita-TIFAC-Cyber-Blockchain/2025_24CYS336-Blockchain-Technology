# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#07 - Non-Custodial Stablecoin-Based Secured P2P Lending Marketplace

![](https://img.shields.io/badge/Member-B_Vijay_Nishanth-gold)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement
Traditional P2P lending platforms often rely on centralized intermediaries to manage custody of borrower collateral and lender funds. This creates single points of failure, custodial risks, and higher operational costs. Additionally, in fiat-based systems, cross-border lending is slow, expensive, and limited by regulatory constraints. Borrowers face difficulties in accessing fair credit without intermediaries, while lenders often lack trust in the platform’s ability to protect their funds.

This project proposes a **non-custodial, blockchain-powered P2P lending marketplace** where lenders provide loans in **stablecoins** (e.g., USDT, USDC, DAI) and borrowers lock supported crypto assets as collateral. The platform uses smart contracts to automate loan terms, enforce collateralization ratios, and ensure secure, trustless settlement — removing the need for centralized custody.

-----

### Literature Survey 
The application of blockchain to P2P lending introduces transparency, programmability, and disintermediation. The following literature review draws from current research and industry examples, focusing on non-custodial stablecoin lending.

#### Existing Solutions
- **Custodial Lending Platforms:** Centralized platforms like BlockFi and Nexo offer crypto-backed loans but hold user funds in custody, creating trust and counterparty risks. Any compromise of the custodian can lead to loss of funds.
  
- **Non-Custodial Lending Protocols:** Protocols like Aave and Compound introduced fully on-chain, smart contract–driven lending markets. While decentralized, they often cater to pooled liquidity markets, which may not allow direct borrower-lender agreements or tailored loan terms.

- **P2P Smart Contract Models:** Projects such as ETHLend (now Aave’s predecessor) attempted direct P2P matching but faced adoption and liquidity fragmentation challenges. Research shows that specialized marketplaces with automated risk enforcement can better address niche borrower-lender needs.

#### Research Gaps
- **Direct, Secured P2P Lending:** Most DeFi lending solutions focus on pooled lending rather than direct matching between a specific borrower and lender with custom terms.
  
- **Stablecoin-Centric Lending:** While collateral may be volatile crypto, the disbursed loan amount in many systems is also volatile. There is a gap in systems designed to always lend in stablecoins to ensure predictable repayment amounts.
  
- **Non-Custodial Collateral Management:** Many platforms require custody of collateral or rely on third-party escrow. A fully non-custodial smart contract architecture with transparent liquidation rules is still underdeveloped in niche P2P contexts.

-----

### Architectural Diagram


------

### Mapping the Project to Relevant Sustainable Development Goals (SDGs)

| SDG | Alignment |
|:---|:----------|
| Goal 8 - Decent Work and Economic Growth | Provides access to borderless credit markets, enabling entrepreneurs and individuals to access funding without intermediaries. |
| Goal 9 - Industry, Innovation and Infrastructure | Leverages blockchain to create a transparent, programmable, and secure financial infrastructure for decentralized credit markets. |
| Goal 10 - Reduced Inequalities | Reduces entry barriers for underserved borrowers globally by enabling direct stablecoin lending without traditional banking systems. |

-----

### References
- Schär, F. (2021). Decentralized finance: On blockchain- and smart contract-based financial markets. *Federal Reserve Bank of St. Louis Review*, 103(2), 153–174.
- Chen, Y., & Bellavitis, C. (2020). Blockchain disruption and decentralized finance: The rise of decentralized business models. *Journal of Business Venturing Insights*, 13, e00151.
- Aave Protocol Documentation. (n.d.). Retrieved from [https://docs.aave.com](https://docs.aave.com)
- Compound Protocol Documentation. (n.d.). Retrieved from [https://compound.finance/docs](https://compound.finance/docs)
