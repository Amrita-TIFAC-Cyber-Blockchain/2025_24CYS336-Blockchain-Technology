 import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load ABI from JSON
const __dirname = path.resolve();
const ABI_PATH = path.join(__dirname, "src", "abi", "CredentialNFT.json");
const abi = JSON.parse(fs.readFileSync(ABI_PATH));

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

console.log("Connected to contract at:", process.env.CONTRACT_ADDRESS);

export default contract;