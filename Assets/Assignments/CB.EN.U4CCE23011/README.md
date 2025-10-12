<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - CB.EN.U4CCE23011
![](https://img.shields.io/badge/Name-Duvvuru_Akshaya_Saketh_Reddy-blue) <br/>

| Wallet Address | [0x6189d117c810859cFD24755FC06eBb4bE69Ccce4](https://sepolia.etherscan.io/tx/0x4737aaed5e33e47a9afe9bc5e38f6cb62fe8381256a15ec7518d6a8d22ef7181) | 
|:--------------:|:-----------------------------:|

### Lab 6 - Introduction to RemixIDE and Solidity Programming 

| Smart Contract Address | [0xdd0e292500d36f1fc7194e6a82b6ea19bfd0fe21](https://sepolia.etherscan.io/address/0xdd0e292500d36f1fc7194e6a82b6ea19bfd0fe21) |
|:----------------------:|:-------------------------------------:|
| Store Transation 1      | [0x4737aaed5e33e47a9afe9bc5e38f6cb62fe8381256a15ec7518d6a8d22ef7181](https://sepolia.etherscan.io/tx/0x4234180f86f7ff24701a9187978a8e2f50dcedc614de33efbb567ab9cb025c07)                 |


### Lab 8 - IPFS

IPFS initialisation:
```
PS C:\Users\saket\Apps\kubo> .\ipfs init
generating ED25519 keypair...done
peer identity: 12D3KooWEvWqbiWRh1ZQgPRFoH8Qx94MVUKQMqdrBpeQXjGZ1jiN
initializing IPFS node at C:\Users\saket\.ipfs
Error: ipfs configuration file already exists!
Reinitializing would overwrite your keys
```

Adding a file:
```
PS C:\Users\saket\Apps\kubo> .\ipfs add build-log
added QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m build-log
 1.24 KiB / 1.24 KiB [========================================================================================] 100.00%
```
Opening a file:
```
PS C:\Users\saket\Apps\kubo> .\ipfs cat QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
----------

NOTICE:

You have tried to upgrade to asdf 0.16.0 or newer. Versions 0.16.0 is a
complete rewrite of asdf in Go. This text is being printed by the older
Bash implementation. If you are seeing this you have not migrated to
asdf 0.16.0. Please follow the instructions on the upgrade guide to
migrate to the new version.
(continued)
```

Downloading IPFS object:
```
PS C:\Users\saket\Apps\kubo> .\ipfs get QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
Saving file(s) to QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
 1.24 KiB / 1.24 KiB [=====================================================================================] 100.00% 0s
```

Block distribution of the file:
```
PS C:\Users\saket\Apps\kubo> .\ipfs dag stat QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m

CID                                             Blocks          Size
QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m  1               1281

Summary
Total Size: 1281
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000

```

Block distribution of a bigger file:
```
PS C:\Users\saket\Apps\kubo> .\ipfs add .\ipfs.exe
added Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49 ipfs.exe
 81.31 MiB / 81.31 MiB [======================================================================================] 100.00%
PS C:\Users\saket\Apps\kubo> .\ipfs dag stat Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 109, NumBlocks: 1
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 8471, NumBlocks: 2
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 270629, NumBlocks: 3
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 532787, NumBlocks: 4
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 794945, NumBlocks: 5
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 1057103, NumBlocks: 6
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 1319261, NumBlocks: 7
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 1581419, NumBlocks: 8
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 1843577, NumBlocks: 9
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 2105735, NumBlocks: 10
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 2367893, NumBlocks: 11
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 2630051, NumBlocks: 12
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 2892209, NumBlocks: 13
.
.
.
CID: Qmev3weLFhSxPM2YL1tYjCP33DvoHw55fxRqSNX7AiVA49, Size: 83906337, NumBlocks: 323
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


