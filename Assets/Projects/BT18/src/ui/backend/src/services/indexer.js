import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import Certificate from '../models/Certificate.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const abiPath = path.join(__dirname, '..', 'abi', 'CredentialNFT.json');

export async function startIndexer() {
  if (!fs.existsSync(abiPath)) {
    console.warn('⚠️ ABI not found at', abiPath);
    return;
  }

  const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contract = new ethers.Contract(contractAddress, abi, provider);

  contract.on('CertificateIssued', async (institution, student, tokenId, uri) => {
    try {
      const id = Number(tokenId.toString());
      console.log('CertificateIssued:', id);
      await Certificate.findOneAndUpdate(
        { tokenId: id },
        {
          tokenId: id,
          contractAddress,
          issuerAddress: institution,
          studentAddress: student,
          tokenURI: uri,
          issuedAt: new Date()
        },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error('Indexer error (issue):', err.message);
    }
  });

  contract.on('CertificateRevoked', async (revokedBy, tokenId, reason) => {
    try {
      const id = Number(tokenId.toString());
      console.log('CertificateRevoked:', id);
      await Certificate.findOneAndUpdate({ tokenId: id }, { revoked: true });
    } catch (err) {
      console.error('Indexer error (revoke):', err.message);
    }
  });

  console.log(`Indexer listening to contract ${contractAddress}`);
}