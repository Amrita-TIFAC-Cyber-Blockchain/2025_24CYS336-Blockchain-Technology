<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - CB.EN.U4CCE23029
![](https://img.shields.io/badge/Name-Namrata_B_G-blue) <br/>

| Wallet Address | [0xCd5c864D56e2F9b4212094c3170Dcd6D8907EDc6](https://sepolia.etherscan.io/address/0xCd5c864D56e2F9b4212094c3170Dcd6D8907EDc6) | 
|:--------------:|:-----------------------------:|

### Lab - Introduction to Solidity 
![](https://img.shields.io/badge/Date-08th_Sep-blue) <br/>
| Smart Contract Address | [0x34643a3efdc5101685eab409f8c998a98bef7239](https://sepolia.etherscan.io/address/0x34643a3efdc5101685eab409f8c998a98bef7239) |
|:----------------------:|:-------------------------------------:|
| Store Value 57         | [0xa828dbb267ab80b43b7e0f3732bc1451fc01d1882e02e0138c33cee473d38415](https://sepolia.etherscan.io/tx/0xa828dbb267ab80b43b7e0f3732bc1451fc01d1882e02e0138c33cee473d38415) |
| Store Value 89         | [0xdc07141d3325dc86ccb731c5a8121cb8d94ddaf604bea52474c5d0c0cd004b83](https://sepolia.etherscan.io/tx/0xdc07141d3325dc86ccb731c5a8121cb8d94ddaf604bea52474c5d0c0cd004b83) |
| Store Value 29         | [0x195ca49437c1bebda20d6d72634a6e3bdff4bba86f03dac4669da63680012dd6](https://sepolia.etherscan.io/tx/0x195ca49437c1bebda20d6d72634a6e3bdff4bba86f03dac4669da63680012dd6) |

### Lab - More about Solidity 
![](https://img.shields.io/badge/Date-15th_Sep-blue) <br/>
| Smart Contract Address | [0x40311fb85b982dbcd2d3ba99984c942538ea45b2](https://sepolia.etherscan.io/tx/0x1dc44d60389423baf3e2aee5ac82252e2bc1841c8ed6171225df06a117fd32ea) |
|:----------------------:|:-------------------------------------:|
| Voter 001         | [0x38fadb8e3d140ab4ed995a6b7b0130379aa54ca5145865548214619c2d27384b](https://sepolia.etherscan.io/tx/0x38fadb8e3d140ab4ed995a6b7b0130379aa54ca5145865548214619c2d27384b) |
| Voter 613         | [0x2915daf0f552ebab5979ef2b9526551ea1612d724f6e5ac1a802903a2a69f507](https://sepolia.etherscan.io/tx/0x2915daf0f552ebab5979ef2b9526551ea1612d724f6e5ac1a802903a2a69f507) |
| Voter 524         | [0x55de648b8d5af19462fb651a31261a3104234df551e984981868f55742924f40](https://sepolia.etherscan.io/tx/0x55de648b8d5af19462fb651a31261a3104234df551e984981868f55742924f40) |

### Lab - Mapping and Modifier 
| Smart Contract Address | [0x3c7efeb3772b319975c639a789b34c8ee4006491](https://sepolia.etherscan.io/address/0x3c7efeb3772b319975c639a789b34c8ee4006491) |
|:----------------------:|:-------------------------------------:|
| Store Owner | [0xcd5c864d56e2f9b4212094c3170dcd6d8907edc6](https://sepolia.etherscan.io/address/0xcd5c864d56e2f9b4212094c3170dcd6d8907edc6) |
| Store Manager | [0x63056e3dccb4d15a246ff3f387cc342e29fa3176](https://sepolia.etherscan.io/address/0x63056e3dccb4d15a246ff3f387cc342e29fa3176) |
| Add Product 1 (By Store Manager)       | [0x1de39af827f1ea34ebd6737b71620e6615f5ded84d1eff00acab04c1c040ab8d](https://sepolia.etherscan.io/tx/0x1de39af827f1ea34ebd6737b71620e6615f5ded84d1eff00acab04c1c040ab8d) |
| Add Product 2 (By Store Manager)       | [0x5ce1c68e01665bdbdadee6cc56786a4351998de670ba825a7d9d6640ee4a37f8](https://sepolia.etherscan.io/tx/0x5ce1c68e01665bdbdadee6cc56786a4351998de670ba825a7d9d6640ee4a37f8) |
| Change Store Manager (By Store Owner)       | [0x60140890e6370daa4614b2054bcdc8faa3e541738725c7f54cff7128de9d8f5a](https://sepolia.etherscan.io/tx/0x60140890e6370daa4614b2054bcdc8faa3e541738725c7f54cff7128de9d8f5a) |

### Lab - IPFS

IPFS initialisation:
```
C:\kubo>ipfs init
generating ED25519 keypair...done
peer identity: 12D3KooWF7Kr73TvqPT5me5f1wQqHRcc5en8A9dy4HibmvJAxtS7
initializing IPFS node at C:\Users\DELL\.ipfs
```

Adding a file:
```
C:\kubo>ipfs add build-log
 1.25 KiB / 1.25 KiB [========================================================================================] 100.00%←added QmTuw8SvMbMnReQGWQiAcodEyqDndEikvwpVwsPAQJi7Hq build-log
 1.25 KiB / 1.25 KiB [========================================================================================] 100.00%
```
Opening a file:
```
C:\kubo>ipfs cat QmTuw8SvMbMnReQGWQiAcodEyqDndEikvwpVwsPAQJi7Hq
←[1;31m----------
Hello there
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
C:\kubo>ipfs get QmTuw8SvMbMnReQGWQiAcodEyqDndEikvwpVwsPAQJi7Hq
Saving file(s) to QmTuw8SvMbMnReQGWQiAcodEyqDndEikvwpVwsPAQJi7Hq
 1.25 KiB / 1.25 KiB [=====================================================================================] 100.00% 0s
```

Block distribution of the file:
```
C:\kubo>ipfs dag stat QmTuw8SvMbMnReQGWQiAcodEyqDndEikvwpVwsPAQJi7Hq

CID                                             Blocks          Size
QmTuw8SvMbMnReQGWQiAcodEyqDndEikvwpVwsPAQJi7Hq  1               1292

Summary
Total Size: 1292
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```

Block distribution of a bigger file:
```
C:\kubo>ipfs add "E:\3rd sem\Digital Communication\9492_[John_G._Proakis,_Masoud_Salehi]_Fundamentals_of_C(b-ok.org).pdf"
 14.21 MiB / 14.21 MiB [======================================================================================] 100.00%←added QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3 9492_[John_G._Proakis,_Masoud_Salehi]_Fundamentals_of_C(b-ok.org).pdf
 14.21 MiB / 14.21 MiB [======================================================================================] 100.00%
C:\kubo>ipfs dag stat
ipfs: Reading from /dev/stdin; send Ctrl-z to stop.
^ZError: argument "root" is required

C:\kubo>ipfs dag stat QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3
CID: QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3, Size: 264904, NumBlocks: 2
CID: QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3, Size: 264904, NumBlocks: 2
CID: QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3, Size: 527062, NumBlocks: 3
CID: QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3, Size: 789220, NumBlocks: 4
.
.
.
CID: QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3, Size: 14683594, NumBlocks: 57
CID: QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3, Size: 14899142, NumBlocks: 58

CID                                             Blocks          Size
QmbYtCKjb4Y3RCyEyFXa7U5mFoK2rqtmMNjqgZ1tib9yh3  58              14899142

Summary
Total Size: 14899142
Unique Blocks: 58
Shared Size: 0
Ratio: 1.000000
```

### Lab - Endsem Practice
| Smart Contract Address | [0x6a34a67d9ff45b83cd86ddc1d7fb520a1533444e](https://sepolia.etherscan.io/address/0x6a34a67d9ff45b83cd86ddc1d7fb520a1533444e) |
|:----------------------:|:-------------------------------------:|
| Admin | [0xcd5c864d56e2f9b4212094c3170dcd6d8907edc6](https://sepolia.etherscan.io/address/0xcd5c864d56e2f9b4212094c3170dcd6d8907edc6) |
| Institution | [0x63056e3dccb4d15a246ff3f387cc342e29fa3176](https://sepolia.etherscan.io/address/0x63056e3dccb4d15a246ff3f387cc342e29fa3176) |
| Issue Certificate (By Institution)       | [0x7537c99bf8bb36c3ec8cba400a2485cac3fd1162f8ee950ae06bb6db1c0d79bb](https://sepolia.etherscan.io/tx/0x7537c99bf8bb36c3ec8cba400a2485cac3fd1162f8ee950ae06bb6db1c0d79bb) |
| Get Certificate       | [View Image](https://github.com/Amrita-TIFAC-Cyber-Blockchain/2025_24CYS336-Blockchain-Technology/blob/main/Assets/Assignments/CB.EN.U4CCE23029/Images/Screenshot%202025-11-10%20123815.png) |
| Add Institution (By Admin)       | [0x788a8400e1d8251c8ec1eb5cc74283c8df1e7010e737304dcead19504896bec0](https://sepolia.etherscan.io/tx/0x788a8400e1d8251c8ec1eb5cc74283c8df1e7010e737304dcead19504896bec0) |











