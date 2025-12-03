// lib/ipfs-pinata.ts
import axios from 'axios';

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const PINATA_GATEWAY = 'https://gateway.pinata.cloud';

export async function uploadToPinata(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          'Content-Type': 'multipart/form-data',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const cid = response.data.IpfsHash;
    return cid; // only CID, do not include filename
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
}

export function getPinataURL(ipfsPath: string) {
  if (!ipfsPath) return '';
  if (ipfsPath.startsWith('http')) return ipfsPath;
  
  // Extract CID from path like "Qm.../filename.jpg"
  const cid = ipfsPath.split('/')[0];
  return `https://gateway.pinata.cloud/ipfs/${ipfsPath}`;
}