<img width="547" height="757" alt="image" src="https://github.com/user-attachments/assets/6e9b2481-b176-4b99-9d5e-12ac915dd942" />


1️) Can a traditional database technology meet your needs?

Answer: No.
A normal database can store the Digital Twin data but it can be changed or deleted by someone with admin access. My project needs the data to be permanent and tamper-proof. A blockchain stores every update as a new transaction and no one can modify it later, so it fits better than a regular database.

2) Does more than one participant need to be able to update the data?

Answer: Yes.
In a Digital Twin system, different users update the data — sensors send live readings, the maintenance team adds service records, and the owner checks the asset’s condition. So there are multiple participants who need to write data to the system, which makes blockchain a good choice.

3) Do you and all those updaters trust one another?

Answer: Not fully.
Each participant belongs to a different organization. For example, the manufacturer, service provider, and asset owner may not completely trust each other’s data. Blockchain builds trust through technology, because every update is verified and recorded transparently, not just based on people trusting each other.

4) Would all the participants trust a third party?

Answer: No.
If a single organization controls the database, others may not trust that the data is 100% fair or unchanged. Blockchain removes this need for a third party by storing everything on a shared distributed ledger, where every participant can verify the updates themselves.

5) Does the data need to be kept private?

Answer: Yes, partly
The detailed Digital Twin data (like 3D models or sensor readings) may be private and should not be visible to everyone. In this system, only the hash of the data and ownership info are stored on blockchain, and the real data stays off-chain in a private storage. This way, both privacy and security are maintained.

6) Do you need to control who can make changes to the blockchain software?

Answer: Yes.
This project uses a permissioned blockchain, so only trusted nodes (like the manufacturer and owner) can validate transactions or modify configurations. The system uses the Proof of Authority (PoA) consensus, which gives control to authorized validators while keeping the network secure and efficient.
