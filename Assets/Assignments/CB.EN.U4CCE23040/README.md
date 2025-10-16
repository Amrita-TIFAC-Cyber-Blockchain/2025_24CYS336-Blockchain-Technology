<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - <<NAME>>
![](https://img.shields.io/badge/Name-Rithiik_s-blue) <br/>

| Wallet Address |[0x149Ee3612E9386EC587E964a34B67aafFdaAf708](https://sepolia.etherscan.io/address/0x149Ee3612E9386EC587E964a34B67aafFdaAf708)| 
|:--------------:|:-----------------------------:|

### Lab X - Introduction to Solidity 
![](https://img.shields.io/badge/Date-08th_sept-purple) 

| Smart Contract Address | [0x567e612f928b05417db03106cd0bb5861098978e](https://sepolia.etherscan.io/address/0x567e612f928b05417db03106cd0bb5861098978e) |
|:----------------------:|:-------------------------------------:|
| Store Value     |[0xe35b21fc09f3d01fba2624a55db252a4ab5540d0115dec05ff002c35594367b3](https://sepolia.etherscan.io/tx/0xe35b21fc09f3d01fba2624a55db252a4ab5540d0115dec05ff002c35594367b3)|         

### Lab X - More to Solidity 
![](https://img.shields.io/badge/Date-15th_sept-purple) 

| Smart Contract Address | [0xE4Fdf1DF4521981aBE388E9Dc58e6B57726298BE](https://sepolia.etherscan.io/address/0xe4fdf1df4521981abe388e9dc58e6b57726298be)|
|:----------------------:|:-------------------------------------:|
| Store value      |[0xcc0f5be930dd4664e62455a59fcffca68719645b1d7edce363b36f34ae6e4c0a](https://sepolia.etherscan.io/tx/0xcc0f5be930dd4664e62455a59fcffca68719645b1d7edce363b36f34ae6e4c0a)|
| Add Institution     |[0x2656e310799d715a182d983aee616687b35f27de1c870c5251f69260c9f5c349](https://sepolia.etherscan.io/tx/0x2656e310799d715a182d983aee616687b35f27de1c870c5251f69260c9f5c349)|
| Transaction Action    |[0x68bc6c0b82183239098bafaa2f8978ff0ee3bdb3bed98d8403b663ccbf77f4b0](https://sepolia.etherscan.io/tx/0x68bc6c0b82183239098bafaa2f8978ff0ee3bdb3bed98d8403b663ccbf77f4b0)|


### Lab X - IPFS
![](https://img.shields.io/badge/Date-13th_oct-purple) 


IPFS initialisation:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs init
generating ED25519 keypair...done
peer identity: 12D3KooWPc7LCv1JGLNqgcYSB96yPfPzFMESD9tqze4KsP5xH87A
initializing IPFS node at C:\Users\srith\.ipfs

```
Adding a file to ipfs:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs add LE2.txt
added Qmf4vTRaA854LqJa6Udw1Yzfcg7UEKNxTtxgUhdbe93Gvn LE2.txt
 25 B / 25 B [================================================================================================] 100.00%
```
Opening a file:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs cat  Qmf4vTRaA854LqJa6Udw1Yzfcg7UEKNxTtxgUhdbe93Gvn
"Hello, Blockchain Class"
```
Downloading IPFS object:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs get Qmf4vTRaA854LqJa6Udw1Yzfcg7UEKNxTtxgUhdbe93Gvn
Saving file(s) to Qmf4vTRaA854LqJa6Udw1Yzfcg7UEKNxTtxgUhdbe93Gvn
 25 B / 25 B [=============================================================================================] 100.00% 0s
```

Block distribution of the file:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs dag stat Qmf4vTRaA854LqJa6Udw1Yzfcg7UEKNxTtxgUhdbe93Gvn

CID                                             Blocks          Size
Qmf4vTRaA854LqJa6Udw1Yzfcg7UEKNxTtxgUhdbe93Gvn  1               33

Summary
Total Size: 33
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```

Block distribution of a file size larger:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs add install.sh
added QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH install.sh
 948 B / 948 B [==============================================================================================] 100.00%
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs get QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH
Saving file(s) to QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH
 948 B / 948 B [===========================================================================================] 100.00% 0s

C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs dag stat QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH

CID                                             Blocks          Size
QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH  1               959

Summary
Total Size: 959
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```
ipfs id:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs id
{
        "ID": "12D3KooWSPG1JkVzW7JtWwrXRhhiFBT89JhViLPRWGrurd2ciRUn",
        "PublicKey": "CAESIPYoMHbq/hbbvd1Fb6YR/NwYOJPrpdW2ZMegVevYZOZj",
        "Addresses": null,
        "AgentVersion": "kubo/0.38.0/",
        "Protocols": null
}
```
Pin objects to local storage:
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs pin add QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH
pinned QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH recursively
```
Remove object from pin-list (from local storage):
```
C:\blockchain\kubo_v0.38.0_windows-amd64\kubo>ipfs pin rm QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH
unpinned QmTNpZqmtr3t7AfNZuhAZWgXCfYhzWMSX1WCWRfypef5sH
```



