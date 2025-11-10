<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - CB.EN.U4CCE23058
![](https://img.shields.io/badge/Name-Tarun_Sri_Vathsan_K-blue) <br/>

| Wallet Address | [0x0Ed24BB50b2201565Aa5E5D2180E9A9AE2d43971](https://sepolia.etherscan.io/address/0x0Ed24BB50b2201565Aa5E5D2180E9A9AE2d43971) | 
|:--------------:|:-----------------------------:|

### Lab 6 - INTRODUCTION TO SOLIDITY 

| Smart Contract Address | [0x9ccd4138d71efa324f7fa676bd63c29ff863e2de](https://sepolia.etherscan.io/address/0x9ccd4138d71efa324f7fa676bd63c29ff863e2de) |
|:----------------------:|:-------------------------------------:|
| STORE TRANSACTION      | [0xcbcdd63cbedaff2a3e91d2e98725939e59720466705d7f9abb61b86991a609ce](https://sepolia.etherscan.io/tx/0xcbcdd63cbedaff2a3e91d2e98725939e59720466705d7f9abb61b86991a609ce)     

### Lab 7 - SOLIDITY LAB 2 

| Smart Contract Address | [0x346DD90f7744701EbC2666Ebb73190b60becf25c](https://sepolia.etherscan.io/address/0x346dd90f7744701ebc2666ebb73190b60becf25c) |
|:----------------------:|:-------------------------------------:|
| STORE PRODUCT DATA      | [0x61e22e5e7de49c19e44540c502116e50fd3b9af40091605c85fd84c7e856b17e](https://sepolia.etherscan.io/tx/0x61e22e5e7de49c19e44540c502116e50fd3b9af40091605c85fd84c7e856b17e)

| Smart Contract Address | [0x1e3C68c46Dfd676F7460730976D0dce63188Ad36](https://sepolia.etherscan.io/address/0x1e3c68c46dfd676f7460730976d0dce63188ad36) |
|:----------------------:|:-------------------------------------:|
| STORE PRODUCT DATA      | [0x1d9baabfe20522608c8a6fab7d41b98fe9fa43bcbf9272080c0114acd7fcfa50](https://sepolia.etherscan.io/tx/0x1d9baabfe20522608c8a6fab7d41b98fe9fa43bcbf9272080c0114acd7fcfa50)

### Lab X - IPFS

IPFS initialisation:
```
PS C:\Users\Tarun> ipfs init
generating ED25519 keypair...done
peer identity: 12D3KooWCJhfLgMLUykgjB8n45L14RoqxRgCQNU9hdm5ge58N9cB
initializing IPFS node at C:\Users\Tarun\.ipfs
```

Adding a file:
```
PS C:\Users\Tarun\Apps\kubo_v0.38.0\kubo> ipfs add build-log
added QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m build-log
 1.24 KiB / 1.24 KiB [========================================================================================] 100.00%
```
Opening a file:
```
PS C:\Users\Tarun\Apps\kubo_v0.38.0\kubo> ipfs cat QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
----------

NOTICE:

You have tried to upgrade to asdf 0.16.0 or newer. Versions 0.16.0 is a
complete rewrite of asdf in Go. This text is being printed by the older
Bash implementation. If you are seeing this you have not migrated to
asdf 0.16.0. Please follow the instructions on the upgrade guide to
migrate to the new version......
```

Downloading IPFS object:
```
PS C:\Users\Tarun\Apps\kubo_v0.38.0\kubo> ipfs get QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
Saving file(s) to QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m
 1.24 KiB / 1.24 KiB [=====================================================================================] 100.00% 0s
```

Block distribution of the file:
```
PS C:\Users\Tarun\Apps\kubo_v0.38.0\kubo> ipfs dag stat QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m

CID                                             Blocks          Size
QmUD8UUmyc17f1ud7fSrg8raPaKbNBbf5dbNjNLxXdgy7m  1               1281

Summary
Total Size: 1281
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```

Block distribution of a bigger file(Failed):
```
PS C:\Users\Tarun\Apps\kubo_v0.38.0\kubo> ipfs add "D:\Kali Linux.vdi"
 7.32 GiB / 17.43 GiB [=================================>----------------------------------------------]  42.02% 03m04sError: committing batch to datastore at /blocks: rename C:\Users\Tarun\.ipfs\blocks\.temp\temp-997130360 C:\Users\Tarun\.ipfs\blocks\GL\CIQEN7ZAMXHWLAMRCCJHHQOKQDLMQETY4LRA5YUC7BGSWRK3SCV7GLY.data: Operation did not complete successfully because the file contains a virus or potentially unwanted software.
```
Block distribution of a bigger file:
```
PS C:\Users\Tarun\Apps\kubo_v0.38.0\kubo> ipfs add "D:\royal-enfield-hunter-350-technical-specifications.pdf"
added QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt royal-enfield-hunter-350-technical-specifications.pdf
 11.90 MiB / 11.90 MiB [======================================================================================] 100.00%
PS C:\Users\Tarun\Apps\kubo_v0.38.0\kubo> ipfs dag stat QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2314, NumBlocks: 1
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 264472, NumBlocks: 2
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 526630, NumBlocks: 3
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 788788, NumBlocks: 4
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1050946, NumBlocks: 5
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1313104, NumBlocks: 6
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1575262, NumBlocks: 7
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 1837420, NumBlocks: 8
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2099578, NumBlocks: 9
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2361736, NumBlocks: 10
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2623894, NumBlocks: 11
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 2886052, NumBlocks: 12
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3148210, NumBlocks: 13
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3410368, NumBlocks: 14
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3672526, NumBlocks: 15
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 3934684, NumBlocks: 16
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4196842, NumBlocks: 17
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4459000, NumBlocks: 18
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4721158, NumBlocks: 19
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 4983316, NumBlocks: 20
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 5245474, NumBlocks: 21
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 5507632, NumBlocks: 22
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 5769790, NumBlocks: 23
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6031948, NumBlocks: 24
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6294106, NumBlocks: 25
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6556264, NumBlocks: 26
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 6818422, NumBlocks: 27
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7080580, NumBlocks: 28
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7342738, NumBlocks: 29
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7604896, NumBlocks: 30
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 7867054, NumBlocks: 31
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8129212, NumBlocks: 32
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8391370, NumBlocks: 33
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8653528, NumBlocks: 34
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 8915686, NumBlocks: 35
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 9177844, NumBlocks: 36
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 9440002, NumBlocks: 37
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 9702160, NumBlocks: 38
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10226476, NumBlocks: 40
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10226476, NumBlocks: 40
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10488634, NumBlocks: 41
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 10750792, NumBlocks: 42
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11012950, NumBlocks: 43
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11275108, NumBlocks: 44
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11537266, NumBlocks: 45
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 11799424, NumBlocks: 46
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 12061582, NumBlocks: 47
CID: QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt, Size: 12323740, NumBlocks: 48

CID                                             Blocks          Size
QmS2Xq8rG9u7hKmfDnGmzi34HnWDe6AZ8qNRfLRgcW2fNt  49              12478798

Summary
Total Size: 12478798
Unique Blocks: 49
Shared Size: 0
Ratio: 1.000000

```

### Endsem Practice


| **Smart Contract Address** | [0x0d07531990c0dadeca64014ef5581421ebf5e169](https://sepolia.etherscan.io/address/0x0d07531990c0dadeca64014ef5581421ebf5e169) |
|:----------------------:|:-------------------------------------:|
| **Add Institution 1** | [0xbf598649cac7fb9c9c10f5f36ee5845047227b32e00f3bb9528a7a9e63c3e995](https://sepolia.etherscan.io/tx/0xbf598649cac7fb9c9c10f5f36ee5845047227b32e00f3bb9528a7a9e63c3e995) |
| **Issue Certificate** | [0x8587361b63071f6eb58b0a270dc82b44ef4fef533aaa1c867313159a49c01426](https://sepolia.etherscan.io/tx/0x8587361b63071f6eb58b0a270dc82b44ef4fef533aaa1c867313159a49c01426) |










