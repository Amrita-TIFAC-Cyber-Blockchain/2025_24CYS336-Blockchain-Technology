# 24CYS336 - Blockchain-Technology 

## Lab 1: Wallet Creation

### Objective
- To understand Cryptowallets and its type
- To install Bitcoin Client and understand the Bitcoin Client
- To install Metamask Wallet
    - To Enable Testnet
    - To Receive Testnet Faucet Currency
    - To do Transactions
 
### Tools
- **Wallets**
    - [Metamask](https://metamask.io/)
    - [Bitcoin Core](https://bitcoin.org/en/download)
- **Faucets**
    - [Sepolia Ethereum - Google Cloud App](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
    - [Sepolia Ethereum - Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)

------ 
## Background 
### Cryptowallet
**Crypto Wallet** is a _device, physical medium, program or servic_e which stores the public and/or private keys that can be used to track ownership & transactions, receive \& send cryptocurrencies within a distributed network like Blockchain. Cryptowallets can be classified based on connectivity to internet, functionality and storage types.

#### Connectivity

##### Hot wallet
Wallets that are connected to Internet are referred as Hot Wallet. It is not a recommended practice to keep the cryptocurrency or the associated private keys in hot wallet as the hidden vulnerabilities could be exploited by hackers to steal the cryptocurrency or private keys. 

##### Cold wallet
Wallets that are not connected to Internet are called Cold Wallet. It is one of the secure means to store the private keys. Cold Wallet are connected to the system only when performing any transaction. 

#### Functionality

##### Full Node
A Full Node is a network node part of the decentralized network that maintains the distributed ledger like Blockchain. The full node is referred to as mining node as they validate transactions & blocks and relaying them to other nodes in the blockchain network. Running a full node requires certain hardware, storage and connectivity requirements. For Example, running a Full node of Bitcoin Blockchain requires storage space around 681.2 GB (at the time of writing). 

##### Simple Node
A Simple Node is a wallet only client which allows any node to participate in the transaction. These nodes does not involve in any mining activities nor does it store any data from the blockchain. 

#### Storage

##### Desktop
A Desktop wallet is the mostly commonly used cryptowallets. A Desktop wallet could either be a full node client or simple node client.  

##### Web 
Web wallet is browser based simple node wallet that run either from a remote URL or as a browser extension. 

##### Mobile 
Mobile Wallet is simple node wallet capable of running in mobile devices. Most of the Mobile Wallets are additionally supported by either Desktop or Web Wallets. 

##### Hardware
A Hardware wallet is a Cold Wallet which is not connected to the internet. The hardware stores the private key in secured manner like that of a protected microcontroller. This is considered to be the safest methods for storing and securing the private key required for transacting the cryptocurrencies. 

<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/10elqpi.jpg/500px-10elqpi.jpg" alt="hardware wallet" width=400 /> 
</p>


##### Paper
A paper wallet is the offline method (cold wallet) for storing the cryptocurrencies or the private key of the crypto wallet. Paper wallets were mainly used during the initial days of cryptocurrecies mainly for bitcoin. But as the awareness on the cryptocurrencies and the wallets has improved over the years, paper wallets are not preferred any more. Additionally, paper wallets are unsafe. 

<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Bitcoin_paper_wallet_generated_at_bitaddress.jpg" alt="paper wallet" width=600 /> 
</p>
