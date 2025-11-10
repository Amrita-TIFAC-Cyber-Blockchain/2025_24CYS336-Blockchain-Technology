<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - <<NAME>>
![](https://img.shields.io/badge/Name-MithunChakkarawarthy-blue) <br/>

| Wallet Address | <<0x64742BFd1372C07c1703625C3ACd6C09cA4C8159>> | 
|:--------------:|:-----------------------------:|

### Lab 7 - Introduction to Solidity 
![](https://img.shields.io/badge/Date-08th_Sep-blue) <br/>
| Smart Contract Address | [0xE2d8AD3ffbc03335A7b4a60e749D61353767f137](https://etherscan.io/address/0xE2d8AD3ffbc03335A7b4a60e749D61353767f137) |
|:----------------------:|:-------------------------------------:|   

| store owener address| [0x72Db34e0c83cBBDDbbDBB403C40238aC3377Cc9E](https://etherscan.io/address/0x72Db34e0c83cBBDDbbDBB403C40238aC3377Cc9E) |
|:----------------------:|:-------------------------------------:|  

| new manager address| [0x6D5c9869093c9d3E301eFd6632E4D65F5D8De4a2](https://etherscan.io/address/0x6D5c9869093c9d3E301eFd6632E4D65F5D8De4a2) |
|:----------------------:|:-------------------------------------:|  

### LAB more about solidity(basic certificate verification adn storing)
![](https://img.shields.io/badge/Date-15th_Sep-blue) <br/>

| smart contract address for certification | [0x45e07083F68EeeC536d6913E18d163D3f31Da88c](https://etherscan.io/address/0x45e07083F68EeeC536d6913E18d163D3f31Da88c) |
|:----------------------:|:-------------------------------------:|  

### LAB more about solidity(basic certificate verification and storing only by the owner)
![](https://img.shields.io/badge/Date-29th_Sep-blue) <br/>

| smart contract address for certification only by owner | [0xB9fAD6e10CAa49210590C412007E91bcAf5954f4](https://etherscan.io/address/0xB9fAD6e10CAa49210590C412007E91bcAf5954f4) |
|:----------------------:|:-------------------------------------:|  

### Lab - IPFS

IPFS initialisation:
```
C:\kubo> ipfs init
generating ED25519 keypair... done
peer identity: 12D3KooWJf8a2G7sG5mLGz9pHk9a4Xg9v2e3Qy5bZ6AxpFvr1K8S
IPFS repository is ready at: C:\Users\DELL\.ipfs

```
Adding a file to ipfs:
```
C:\kubo> ipfs add sample-log.txt
 1.30 KiB / 1.30 KiB [==============================================================] 100%
added QmZk8d9hXK4RF3p2cC5a8tq9r7MLp8uGJgKz5SK8Q2J3Ff sample-log.txt

```
Opening a file from ipfs:
```
C:\kubo> ipfs cat QmZk8d9hXK4RF3p2cC5a8tq9r7MLp8uGJgKz5SK8Q2J3Ff
----------------
Welcome to IPFS Lab

This is a demo file added to the IPFS network.
More content can be added as needed…
(continued)
```

Downloading IPFS object:
```
C:\kubo> ipfs get QmZk8d9hXK4RF3p2cC5a8tq9r7MLp8uGJgKz5SK8Q2J3Ff
Saving file(s) to QmZk8d9hXK4RF3p2cC5a8tq9r7MLp8uGJgKz5SK8Q2J3Ff
 1.30 KiB / 1.30 KiB [==============================================================] 100%

```

Block distribution of the file:
```
C:\kubo> ipfs dag stat QmZk8d9hXK4RF3p2cC5a8tq9r7MLp8uGJgKz5SK8Q2J3Ff

CID                                             Blocks   Size
QmZk8d9hXK4RF3p2cC5a8tq9r7MLp8uGJgKz5SK8Q2J3Ff  1        1300

Summary
Total Size:      1300 bytes
Unique Blocks:   1
Shared Size:     0
Efficiency:      1.000000

```



