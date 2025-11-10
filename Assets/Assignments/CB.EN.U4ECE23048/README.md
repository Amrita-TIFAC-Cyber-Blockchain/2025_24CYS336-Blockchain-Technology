<p align="center">
    <img src="https://github.com/Amrita-TIFAC-Cyber-Blockchain/.github/blob/main/profile/img/AVV_CYS_Logo.png" alt ="Amrita TIFAC" width="700" />
</p>

# 24CYS336 - Blockchain-Technology 

## Assignments - CB.EN.U4ECE23048
![](https://img.shields.io/badge/Name-Shankar_N_K-blue) <br/>

| Wallet Address | [0x75Dd20566F7A622C799D6929CdA1CB4b5E76c1Ea](https://sepolia.etherscan.io/address/0x75dd20566f7a622c799d6929cda1cb4b5e76c1ea)| 
|:--------------:|:-----------------------------:|

### Lab - Introduction to Solidity
![](https://img.shields.io/badge/Date-08th_Sept-purple)

| Smart Contract Address |[0x2FA414917A8d74451cA60Fb1982d48d84fa8974b](https://sepolia.etherscan.io/address/0x2FA414917A8d74451cA60Fb1982d48d84fa8974b )|
|:----------------------:|:-------------------------------------:|
| Store     | [0xc01fd6f9de6cfa55f4c8a3da1d392a8e1e5d63815977b78168941a92ff8a7c0c](https://sepolia.etherscan.io/tx/0xc01fd6f9de6cfa55f4c8a3da1d392a8e1e5d63815977b78168941a92ff8a7c0c)|


### Lab - More about Solidity, customised solidity use case programming
![](https://img.shields.io/badge/Date-15th_Sept-purple)

| Smart Contract Address(product tracker) | [0x284f71422717C716d7ec0D6b3105a71Da13a98E3](https://sepolia.etherscan.io/address/0x284f71422717C716d7ec0D6b3105a71Da13a98E3) |
|:----------------------:|:-------------------------------------|
| product tracker           | [0x4bbe5abc0427c297cbcaf584fabdad8bd5c34f4f9025bf4fc85c65e81f1a3d2e](https://sepolia.etherscan.io/tx/0x4bbe5abc0427c297cbcaf584fabdad8bd5c34f4f9025bf4fc85c65e81f1a3d2e)| 


### Lab - exploring Structs, retaining data
![](https://img.shields.io/badge/Date-29th_Sept-purple)

corresponding code:
```
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

contract pdt_tkr{
    struct Product{
        uint256 pid;
        string pname;
        uint256 pprice;
    }
    mapping(uint256=>Product)private plist;

    function addproduct(uint256 _pid,string memory _pname,uint256 _pprice)
    public{
        plist[_pid] = Product(_pid,_pname,_pprice);
    }

    function seeproduct(uint256 _pid)
    public
    view
    returns(string memory, uint256){
        Product memory p = plist[_pid];
        return(p.pname,p.pprice);
    }
}
```

| Smart Contract Address (updated product tracker) | [0x6A3Ce5Be4244F6EF472a76Ba1984829C4615ac84](https://sepolia.etherscan.io/address/0x6a3ce5be4244f6ef472a76ba1984829c4615ac84) |
|:----------------------:|:-------------------------------------|
| add product(3 same actions can be found under conract address)     | [0xdee09b0c7c5d9af27d8e4528c702348c022f2bab4937628028087b1dea47822e](https://sepolia.etherscan.io/tx/0xdee09b0c7c5d9af27d8e4528c702348c022f2bab4937628028087b1dea47822e)| 


### Lab - managing permissions
![](https://img.shields.io/badge/Date-13th_oct-purple)

corresponding code:
```
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract product_tracker{

    struct Product{
        uint256 prodid;
        string prodname;
        uint256 prodstock;
        uint256 prodprice;
    }

    mapping(uint256 => Product) public products;

    address public owner;
    address public manager;
    address public customer;

    constructor()
    {
        owner = msg.sender;
        manager = 0xE0DffB208b92d744a6FBfFcbE5aA722cF1b91C72;
    }

    modifier onlymanager()
    {
        require(msg.sender == manager,"Manager privilege needed");
        _;
    }

    modifier onlyowner()
    {
        require(msg.sender == owner,"owner privilege needed");
        _;
    }

    function changemanager(address _newmanager) 
    public onlyowner
    {
        manager = _newmanager;
    }

    function addproduct(uint256 _prodid,
                        string memory _prodname,
                        uint256 _prodstock,
                        uint256 _prodprice)
    public 
    onlymanager
    {
        products[_prodid] = Product(_prodid,_prodname,_prodstock,_prodprice);
    }

    function viewproduct(uint256 _prodid) 
    public 
    view 
    returns(string memory, uint256,uint256)
    {
        Product memory p = products[_prodid];
        return (p.prodname,p.prodstock,p.prodprice);
    }
}
```

| Smart Contract Address (updated product tracker) | [0x54985E5408D042406924FDBB18795595E312E23e](https://sepolia.etherscan.io/address/0x54985E5408D042406924FDBB18795595E312E23e) |
|:----------------------:|:-------------------------------------|
| change manager (done by owner)    | [0x5f01633750229b23e7b893d7690c0f6b3d8aa0a7ba0ba89b655b563454fc25db](https://sepolia.etherscan.io/tx/0x5f01633750229b23e7b893d7690c0f6b3d8aa0a7ba0ba89b655b563454fc25db)| 
| add product (done by manager)    | [0xb760684abc93e4a954f226375b0f5f488c345e7740c586a79feca93bb6f8d3a7](https://sepolia.etherscan.io/tx/0xb760684abc93e4a954f226375b0f5f488c345e7740c586a79feca93bb6f8d3a7)| 

### Lab - ipfs
![](https://img.shields.io/badge/Date-13th_oct-purple)

ipfs init (initialization)(as initilzation is already done we get an error that ipfs config already exists)
```
C:\Users\shank\Downloads\kubo_v0.38.0_windows-amd64\kubo>ipfs init
generating ED25519 keypair...done
peer identity: 12D3KooWRWjw95S7VW5BNAdLYBtVPscGGFkVnJUdmUykf2PiYFrp
initializing IPFS node at C:\Users\shank\.ipfs
Error: ipfs configuration file already exists!
Reinitializing would overwrite your keys
```
<img width="833" height="144" alt="image" src="https://github.com/user-attachments/assets/6d0027dd-140e-49dd-9f57-7f0ebeaa3d7c" />


ipfs add (adds a file to file system)
```
C:\Users\shank\Downloads\kubo_v0.38.0_windows-amd64\kubo>ipfs add LE2.txt
added QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2 LE2.txt
 23 B / 23 B [================================================================================================] 100.00%
```
<img width="1453" height="73" alt="image" src="https://github.com/user-attachments/assets/2c3525bb-1472-4e36-a52b-65bed62ec8a5" />


ipfs cat (opening a file)
```
C:\Users\shank\Downloads\kubo_v0.38.0_windows-amd64\kubo>ipfs cat QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2
Hello, Blockchain Class
```
<img width="1423" height="50" alt="image" src="https://github.com/user-attachments/assets/869a3876-f75f-4013-9cce-c21e95ba37e6" />

ipfs get(downloading the file)
```
C:\Users\shank\Downloads\kubo_v0.38.0_windows-amd64\kubo>ipfs get QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2
Saving file(s) to QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2
 23 B / 23 B [=============================================================================================] 100.00% 0s
```
<img width="1451" height="83" alt="image" src="https://github.com/user-attachments/assets/3a0136ae-31d9-4239-a981-63e7a17603db" />

<img width="790" height="75" alt="image" src="https://github.com/user-attachments/assets/908acc1a-44b1-4788-8ca5-37084162cd8f" />

ipfs pin add (pinning a file to avoid grabage collection)
```
C:\Users\shank\Downloads\kubo_v0.38.0_windows-amd64\kubo>ipfs pin add  QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2
pinned QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2 recursively
```
<img width="1429" height="50" alt="image" src="https://github.com/user-attachments/assets/674ab4bb-3165-4ed6-be51-3a63a94aaa98" />

ipfs pin rm (remove the pin on a file)
```
C:\Users\shank\Downloads\kubo_v0.38.0_windows-amd64\kubo>ipfs pin rm  QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2
unpinned QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2
```
<img width="1418" height="61" alt="image" src="https://github.com/user-attachments/assets/0618b15b-b43e-4388-9c78-7e290f7ec840" />

Block distribution of the file:(only present in local device not distributed among network)
```
C:\Users\shank\Downloads\kubo_v0.38.0_windows-amd64\kubo>ipfs dag stat  QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2

CID                                             Blocks          Size
QmRJ1RZh3gNN6KaDneJ6jLkL2BWDW5dE6RdnnBn2kfLYL2  1               31

Summary
Total Size: 31
Unique Blocks: 1
Shared Size: 0
Ratio: 1.000000
```
<img width="1447" height="258" alt="image" src="https://github.com/user-attachments/assets/52c66729-825e-4302-b473-fea17d569965" />

Block distribution of a bigger file:
<img width="1448" height="370" alt="image" src="https://github.com/user-attachments/assets/3068cd68-91f0-44b3-9d63-1ce7f03656f0" />


### endsem practise
[documentation.pdf](https://github.com/user-attachments/files/23448170/documentation.pdf)


| Smart Contract Address (Certificate Registry) | [0xBb4186F7323aBa9df1E20040B5D1fE24C5b44af8](https://sepolia.etherscan.io/address/0xBb4186F7323aBa9df1E20040B5D1fE24C5b44af8) |
|:----------------------:|:-------------------------------------|
| add institution (done by admin)    | [0x86bd5b58626c88bf50b7d1ea32f337f72fc41f9176a62838e317b318d800c4ed](https://sepolia.etherscan.io/tx/0x86bd5b58626c88bf50b7d1ea32f337f72fc41f9176a62838e317b318d800c4ed)| 
| issue certificate (done by institution)    | [0x69270111fa830441477e7286ac52a9a885841412cffc8949fe3c413156b0537c](https://sepolia.etherscan.io/tx/0x69270111fa830441477e7286ac52a9a885841412cffc8949fe3c413156b0537c)| 

code:
```
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract cerficaterepo{
    
    struct Certificate{
        string sname;
        string course;
        string grade;
        string ipfshash;
        string issuedate;
    }

    struct Institution{
        address instaddr;
        string instname;
    }

    mapping(address => Certificate) private studentcertificates;
    mapping(address => Institution) private ilist;

    address private admin;
    address private institution;

    constructor(){
        admin = msg.sender;
    }

    modifier onlyadmin{
        require(msg.sender == admin, "You are not admin");
        _;
    }

    modifier onlyinstitution{
        require(msg.sender == institution, "you are not institution");
        _;
    }

    function addinstitution(address _instaddr, string memory _instname)
    public onlyadmin{
        ilist[_instaddr] = Institution(_instaddr, _instname);
        institution = _instaddr;
    }

    function issuecertificate(address saddr,
                            string memory _sname,
                            string memory _course,
                            string memory _grade,
                            string memory _ipfshash,
                            string memory _issuedate
                            )
    public onlyinstitution{
        studentcertificates[saddr] = Certificate(_sname,_course,_grade,_ipfshash,_issuedate);
    }

    function getcertificate(address saddr) public view returns(string memory,
                                                             string memory,
                                                             string memory,
                                                             string memory,
                                                             string memory)
    {
        Certificate memory c = studentcertificates[saddr];
        return (c.sname,c.course,c.grade,c.ipfshash,c.issuedate);
    }

    function verifycertificate(address saddr, string memory _ipfshash)
    public view returns(string memory)
    {
        Certificate memory c = studentcertificates[saddr];
        //the string comparison was carried out using autocomplete, tried using c.ipfshash == _ipfshash 
        // but that returned error as strings can't be compared that way
        if(keccak256(abi.encodePacked(c.ipfshash)) == keccak256(abi.encodePacked(_ipfshash)))
        {
            return "True";
        }
        else
        {
            return "false";
        }
    }
}
```

