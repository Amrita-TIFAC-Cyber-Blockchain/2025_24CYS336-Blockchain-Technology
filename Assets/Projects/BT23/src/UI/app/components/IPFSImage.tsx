'use client'
import { useState, useEffect } from "react";

interface Props {
  cid: string;
  alt?: string;
  className?: string;
}

export default function IPFSImage({ cid, alt = "", className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Clean and normalize the CID
  const cleanCID = (input: string): string => {
    if (!input) return '';
    
    // Remove ipfs:// prefix if present
    let cleaned = input.replace(/^ipfs:\/\//, '');
    
    // Remove any leading/trailing slashes
    cleaned = cleaned.replace(/^\/+|\/+$/g, '');
    
    // Extract just the CID part (before any path)
    const cidPart = cleaned.split('/')[0];
    
    return cidPart;
  };

  const normalizedCID = cleanCID(cid);

  const gateways = [
    `https://${normalizedCID}.ipfs.cf-ipfs.com/`,
    `https://${normalizedCID}.ipfs.w3s.link/`,
    `https://${normalizedCID}.ipfs.nftstorage.link/`,
    `https://ipfs.io/ipfs/${normalizedCID}`,
    `https://gateway.pinata.cloud/ipfs/${normalizedCID}`,
    `https://dweb.link/ipfs/${normalizedCID}`,
    `https://cloudflare-ipfs.com/ipfs/${normalizedCID}`,
  ];

  const url = gateways[index];

  const handleError = () => {
    console.log(`Gateway ${index + 1} failed: ${url}`);
    
    if (index < gateways.length - 1) {
      setIndex((prev) => prev + 1);
      setIsLoading(true);
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    console.log(`Image loaded successfully from gateway ${index + 1}`);
    setIsLoading(false);
  };

  useEffect(() => {
    // Reset when CID changes
    setIndex(0);
    setError(false);
    setIsLoading(true);
  }, [cid]);

  if (error) {
    return (
      <div className={`bg-gray-100 text-gray-500 p-4 text-center rounded-lg ${className}`}>
        <div className="flex flex-col items-center justify-center">
          <span>Failed to load image</span>
          <span className="text-xs mt-2">CID: {normalizedCID}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      <img
        src={url}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        crossOrigin="anonymous"
      />
    </div>
  );
}