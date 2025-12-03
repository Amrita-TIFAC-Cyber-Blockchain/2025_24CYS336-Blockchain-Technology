// lib/ipfs.ts
import { uploadToPinata, getPinataURL } from './ipfs-pinata';

export async function storeFile(file: File): Promise<string> {
  // Validate file
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image size should be less than 10MB');
  }

  try {
    const cid = await uploadToPinata(file);
    console.log('File uploaded to IPFS:', cid);
    return cid;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
}

export function getIPFSGatewayURL(ipfsPath: string): string {
  return getPinataURL(ipfsPath);
}