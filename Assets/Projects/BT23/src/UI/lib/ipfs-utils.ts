// lib/ipfs-utils.ts
export function normalizeCID(cid: string): string {
  if (!cid) return '';
  
  // Remove ipfs:// prefix if present
  let normalized = cid.replace(/^ipfs:\/\//, '');
  
  // Remove any leading/trailing slashes
  normalized = normalized.replace(/^\/+|\/+$/g, '');
  
  // Extract just the CID part (before any path)
  const cidPart = normalized.split('/')[0];
  
  return cidPart;
}

export function getIPFSGateways(cid: string): string[] {
  const normalizedCID = normalizeCID(cid);
  
  return [
    `https://${normalizedCID}.ipfs.cf-ipfs.com/`,
    `https://${normalizedCID}.ipfs.w3s.link/`,
    `https://${normalizedCID}.ipfs.nftstorage.link/`,
    `https://ipfs.io/ipfs/${normalizedCID}`,
    `https://gateway.pinata.cloud/ipfs/${normalizedCID}`,
    `https://dweb.link/ipfs/${normalizedCID}`,
  ];
}