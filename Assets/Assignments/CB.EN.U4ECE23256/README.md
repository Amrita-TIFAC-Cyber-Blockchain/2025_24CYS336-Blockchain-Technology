<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - <<indtro>>
![](https://img.shields.io/badge/Name-yuvanesh-red) <br/>

| Wallet Address | [0x80D8e3a93fc807A9E8a20d8ba7981109C6066ee3](https://sepolia.etherscan.io/address/0x80d8e3a93fc807a9e8a20d8ba7981109c6066ee3) | 
|:--------------:|:-----------------------------:|

### Lab 7 - Introduction to Solidity 
![](https://img.shields.io/badge/Date-08th_Sep-blue) <br/>
| Smart Contract Address | [0x7bCA5c59C937d3E90911Cb4C781bA11d01B2DA6a](https://sepolia.etherscan.io/address/0x7bCA5c59C937d3E90911Cb4C781bA11d01B2DA6a) |
|:----------------------:|:-------------------------------------:|   

| store owener address| [0x70E5e4D1d8B197604a4943c8809CBAB83374320f](https://sepolia.etherscan.io/address/0x70E5e4D1d8B197604a4943c8809CBAB83374320f) |
|:----------------------:|:-------------------------------------:|  

| new manager address| [0x25408f077d209B906ceE0c3D3eC1B789014f4BB4](https://sepolia.etherscan.io/address/0x25408f077d209B906ceE0c3D3eC1B789014f4BB4) |
|:----------------------:|:-------------------------------------:|  

### LAB more about solidity(basic certificate verification adn storing)
![](https://img.shields.io/badge/Date-15th_Sep-blue) <br/>

| Wallet Address | [0x80D8e3a93fc807A9E8a20d8ba7981109C6066ee3](https://sepolia.etherscan.io/address/0x80d8e3a93fc807a9e8a20d8ba7981109c6066ee3) | 
|:--------------:|:-----------------------------:|

| smart contract address for certification | [0x3c584292fbBF78D03a836C7239e9054570Bc96d2](https://sepolia.etherscan.io/address/0x3c584292fbBF78D03a836C7239e9054570Bc96d2) |
|:----------------------:|:-------------------------------------:|  



### LAB more about solidity(basic certificate verification and storing only by the owner(MAPPING))
![](https://img.shields.io/badge/Date-29th_Sep-blue) <br/>

| Wallet Address | [0x80D8e3a93fc807A9E8a20d8ba7981109C6066ee3](https://sepolia.etherscan.io/address/0x80d8e3a93fc807a9e8a20d8ba7981109c6066ee3) | 
|:--------------:|:-----------------------------:|

| smart contract address for certification only by owner | [0xaF7db52d84621BD4aD8713f43f67365611d390F6](https://sepolia.etherscan.io/address/0xaF7db52d84621BD4aD8713f43f67365611d390F6) |
|:----------------------:|:-------------------------------------:|  


### LAB (practice lab--Academic registeration )
![](https://img.shields.io/badge/_Sep-blue) <br/>

| Wallet Address | [0x80D8e3a93fc807A9E8a20d8ba7981109C6066ee3](https://sepolia.etherscan.io/address/0x80d8e3a93fc807a9e8a20d8ba7981109c6066ee3) | 
|:--------------:|:-----------------------------:|

| smart contract address for certification only by owner | [0xaF7db52d84621BD4aD8713f43f67365611d390F6](https://sepolia.etherscan.io/address/0xaF7db52d84621BD4aD8713f43f67365611d390F6) |
|:----------------------:|:-------------------------------------:|  

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
QmTuw8SvMbMnReQGWQiAcodEyqDndEikvwpVwsPAQJi7Hq  1               1250

Summary
Total Size: 1250
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```









