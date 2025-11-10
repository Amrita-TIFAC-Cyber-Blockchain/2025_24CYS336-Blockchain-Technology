
# 24CYS336 - Blockchain-Technology 
![](https://img.shields.io/badge/Batch-22UCYS-gold) ![](https://img.shields.io/badge/UG-blue) ![](https://img.shields.io/badge/Subject-Blockchain-blue) <br/>

## BT#10 - "A Blockchain-Guarded AI Diagnosis Platform with Patient-Controlled EHR Access and Gas Price Prediction"

![](https://img.shields.io/badge/Member-Rithiik_S-red)  <br/> 
![](https://img.shields.io/badge/Reviewed-TBD-brown) <br/>

------

### Problem Statement
Despite the advancements in digital healthcare, the current systems have a hard time delivering a safe and patient-centric environment. Patients have little visibility and control over who can access their medical records, and centralized data is vulnerable to unauthorized access. AI models utilized for diagnosis are open to attacks that can affect their accuracy, potentially threatening lives. On top of that, the blockchain-based solutions suffer from high and unstable transaction fees which limits their practical use. Without transparent audit trails or verifiable AI decisions, there is still a major challenge in trust and accountability when it comes to healthcare technology nowadays.


-----
#  Literature Survey — AI and Blockchain for E-Health

##  Overview
This literature survey explores how **Artificial Intelligence (AI)** and **Blockchain** technologies are combined to enhance **security, transparency, and efficiency** in healthcare systems, especially for **Electronic Health Records (EHR)** and **medical decision support**. The goal is to ensure **data integrity**, **privacy**, and **cost-effective** management of sensitive health information.

---

##  Existing Research

Recent research has focused on integrating blockchain with AI to make healthcare systems more secure and intelligent.  
Alabdulatif et al. (2023) proposed a framework that uses blockchain to record AI-generated medical predictions, making them **tamper-proof and auditable**. This ensures that doctors and auditors can verify that no data or AI decision has been altered. Their model also uses **access control mechanisms** through smart contracts to restrict access to EHRs only for authorized users, improving **trust and accountability** in AI-based healthcare systems.

Similarly, Mandarino et al. (2024) developed a **blockchain-based EHR system** that integrates **edge computing** to reduce latency and operational costs. Instead of relying solely on central servers, their design processes data near its source, improving **response time** and lowering transaction costs. Blockchain ensures **data confidentiality and integrity**, while edge computing enables **faster and cost-efficient** medical data handling, making it suitable for large-scale hospital or real-time applications.

Together, these studies demonstrate that combining **AI, blockchain, and edge computing** can deliver a healthcare system that is **secure, fast, auditable, and scalable**, addressing key challenges like data privacy, transparency, and cost.

---

##  Common Design Insights

1. **Data Security through Blockchain**
   - Store patient records off-chain (encrypted) and keep only hashes or summaries on-chain.
   - Use smart contracts for **access control**, ensuring only verified users can view or modify EHR data.

2. **AI for Smarter Decisions**
   - Use AI to assist in medical decision-making, while blockchain maintains the **trust and audit trail** of each AI prediction.

3. **Edge Computing for Performance**
   - Perform computations closer to the data source to reduce delay and server dependency.
   - Combine edge devices with blockchain to balance **speed**, **security**, and **cost**.

4. **Transparency and Auditability**
   - Every medical action or AI decision can be logged as a blockchain transaction, providing **traceability** and **integrity**.

---

##  Comparison

| Feature | Alabdulatif et al. (2023) | Mandarino et al. (2024) |
|----------|---------------------------|---------------------------|
| Main Focus | Safe AI decisions | Fast & low-cost EHR |
| Tech Used | AI + Blockchain | Blockchain + Edge computing |
| Goal | Data integrity & audit | Speed & cost reduction |
| Use Case | Secure medical AI system | Scalable hospital EHR |

---
##  Implications 

 Developing blockchain or AI-based healthcare projects:
- Use **Blockchain** for storing access logs and verification records.  
- Keep **EHR data encrypted off-chain** to maintain privacy.  
- Apply **AI models** for diagnosis or prediction, and use blockchain to ensure **decision transparency**.  
- Integrate **edge or local computation** to improve **speed and efficiency** in your application.  

These approaches not only enhance **security and scalability** but also align your project with **real-world healthcare needs**.

---

---

##  Comparative Summary

| Aspect | Combined Research Focus |
|--------|--------------------------|
| **Goal** | Secure, efficient, and auditable healthcare systems |
| **Key Technologies** | AI, Blockchain, Edge Computing |
| **Main Advantages** | Data integrity, low latency, and reduced cost |
| **Access Control** | Smart contracts with roles and permissions |
| **Use Cases** | EHR management, AI-assisted diagnosis, real-time data sharing |

---

##  Summary
The existing literature shows that merging **AI, Blockchain, and Edge Computing** leads to safer and smarter healthcare ecosystems.  
- **AI** provides accurate and predictive insights.  
- **Blockchain** ensures data trust, transparency, and security.  
- **Edge computing** enables faster, cost-efficient processing.  

Together, they create a strong foundation for developing modern **E-Health systems** that can handle real-time patient data securely and efficiently.

---



-----
### Architectural Diagram
<img width="3006" height="1375" alt="github_blockchain" src="https://github.com/user-attachments/assets/faea006f-8fa3-4354-bcfc-0754f6f1d1bd" />



------

###  Mapping the Project to Relevant Sustainable Development Goals (SDGs)

This project combining **Artificial Intelligence (AI)** and **Blockchain** for secure Electronic Health Records (EHR) and medical decision support — aligns with multiple **United Nations Sustainable Development Goals (SDGs)**. The system promotes transparency, efficiency, and equity in healthcare delivery through technology.

| **SDG No.** | **Goal** | **Project Contribution** |
|--------------|-----------|---------------------------|
| **SDG 3 – Good Health and Well-Being** | Ensure healthy lives and promote well-being for all at all ages. | The project improves healthcare decision-making using AI and ensures **safe, tamper-proof EHR systems**, protecting patient data and improving medical outcomes. |
| **SDG 9 – Industry, Innovation, and Infrastructure** | Build resilient infrastructure, promote sustainable industrialization, and foster innovation. | The integration of **blockchain and edge computing** demonstrates innovative use of technology to create **secure, scalable healthcare systems**. |
| **SDG 10 – Reduced Inequalities** | Reduce inequality within and among countries. | Secure digital health platforms allow **equal access to trusted healthcare data**, especially for patients in rural or underdeveloped regions. |
| **SDG 16 – Peace, Justice, and Strong Institutions** | Promote just, peaceful, and inclusive societies. | Blockchain’s **transparency and immutability** enhance trust in medical systems, supporting ethical data use and responsible health governance. |

---
-----

### References
[1] A. Alabdulatif, M. Al Asqah, T. Moulahi, and S. Zidi, “Leveraging Artificial Intelligence in Blockchain-Based E-Health for Safer Decision Making Framework,” Applied Sciences, vol. 13, no. 2, p. 1035, Jan. 2023. [Online]. Available: https://doi.org/10.3390/app13021035

[2] V. Mandarino, G. Pappalardo, and E. Tramontana, “A Blockchain-Based Electronic Health Record (EHR) System for Edge Computing Enhancing Security and Cost Efficiency,” Computers, vol. 13, no. 6, p. 132, Jun. 2024. [Online]. Available: https://doi.org/10.3390/computers13060132







