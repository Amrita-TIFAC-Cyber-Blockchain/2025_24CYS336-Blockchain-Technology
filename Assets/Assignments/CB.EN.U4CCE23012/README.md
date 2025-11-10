<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - CB.EN.U4CCE23012
![](https://img.shields.io/badge/Name-Eeshwar_E-blue) <br/>

| Wallet Address | [0xEF09Bb98B5B3B3F285eb05356c6938F23f616904](https://sepolia.etherscan.io/address/0xEF09Bb98B5B3B3F285eb05356c6938F23f616904) | 
|:--------------:|:-----------------------------:|

### Lab 6 - Introduction to RemixIDE and Solidity Programming
![](https://img.shields.io/badge/Date-8th_September-blue) <br/>

| Smart Contract Address | [0x74c0345a5dc3f042e0c0bcd90a99e47d40dc1e63](https://sepolia.etherscan.io/address/0x74c0345a5dc3f042e0c0bcd90a99e47d40dc1e63) |
|:----------------------:|:-------------------------------------:|
| Store Transaction 1    | [0xf6221323c5e9f3892f7d0b58eaffeab59654ad8b85e844b488e770e6e4c3d811](https://sepolia.etherscan.io/tx/0xf6221323c5e9f3892f7d0b58eaffeab59654ad8b85e844b488e770e6e4c3d811)  |

### Lab 7 - Exploration of Solidity Programming
![](https://img.shields.io/badge/Date-15th_September-blue) <br/>

| Smart Contract Address | [0x8286735Eb2cbB530484FF4865A1dD458ed43Fbb9](https://sepolia.etherscan.io/address/0x8286735eb2cbb530484ff4865a1dd458ed43fbb9) |
|:----------------------:|:-------------------------------------:|
| Store Transaction 1    | [0x6f1d2f2edb1e83d3e0c57431c7eebac5c392e58d44b2314f7a6d3a357d5f7eb1](https://sepolia.etherscan.io/tx/0x6f1d2f2edb1e83d3e0c57431c7eebac5c392e58d44b2314f7a6d3a357d5f7eb1) |
| Store Transaction 2    | [0xc8c72fa186b95e7e02b3f8ed64e37bc37f306c952a8b38fb8725f55bfb7b6e7c](https://sepolia.etherscan.io/tx/0xc8c72fa186b95e7e02b3f8ed64e37bc37f306c952a8b38fb8725f55bfb7b6e7c) |

### Lab X - IPFS

IPFS Verification:
```
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> .\ipfs.exe --version
ipfs version 0.38.0
```
IPFS Initialisation:
```
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> ipfs init
generating ED25519 keypair...done
peer identity: 12D3KooWP9M2x87eKBKE4umLMx5bycJC6GnEReZyPcWCAchdvzeD
initializing IPFS node at C:\Users\eeshw\.ipfs
```

Adding a File:
```
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> ipfs add .\README.md
added Qmb7R5ab1KJb8tMNte8DSfa11u4QdUDrh9R6jn7M1FvKqP README.md
 563 B / 563 B [==============================================================================================] 100.00%
```
Opening a File:
```
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> ipfs cat Qmb7R5ab1KJb8tMNte8DSfa11u4QdUDrh9R6jn7M1FvKqP
# ipfs command line tool

This is a [command line tool for interacting with Kubo](https://docs.ipfs.tech/install/command-line/),
an [IPFS](https://ipfs.tech) implementation. It contains a full IPFS node.

## Install

To install it, move the binary somewhere in your `$PATH`:
(continued)
```

Downloading IPFS Object:
```
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> ipfs get Qmb7R5ab1KJb8tMNte8DSfa11u4QdUDrh9R6jn7M1FvKqP
Saving file(s) to Qmb7R5ab1KJb8tMNte8DSfa11u4QdUDrh9R6jn7M1FvKqP
 563 B / 563 B [===========================================================================================] 100.00% 0s
```

Block Distribution of the File:
```
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> ipfs dag stat Qmb7R5ab1KJb8tMNte8DSfa11u4QdUDrh9R6jn7M1FvKqP

CID                                             Blocks          Size
Qmb7R5ab1KJb8tMNte8DSfa11u4QdUDrh9R6jn7M1FvKqP  1               574

Summary
Total Size: 574
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```

Block distribution of a Bigger File:
```
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> ipfs add .\ipfs.exe
added Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49 ipfs.exe
 81.31 MiB / 81.31 MiB [======================================================================================] 100.00%
PS C:\Users\eeshw\Apps\kubo_v0.38.0\kubo> ipfs dag stat Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 109, NumBlocks: 1
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 8471, NumBlocks: 2
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 270629, NumBlocks: 3
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 532787, NumBlocks: 4
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 794945, NumBlocks: 5
.
.
.
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 84168495, NumBlocks: 324
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 84430653, NumBlocks: 325
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 84692811, NumBlocks: 326
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 84954969, NumBlocks: 327
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 85217127, NumBlocks: 328

CID                                             Blocks          Size
Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49  329             85276021

Summary
Total Size: 85276021
Unique Blocks: 329
Shared Size: 0
Ratio: 1.000000
```






