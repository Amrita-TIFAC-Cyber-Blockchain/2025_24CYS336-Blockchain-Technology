// components/IPFSTest.tsx
'use client'
import { useState } from 'react';

export default function IPFSTest() {
  const [testCID, setTestCID] = useState('QmZ9tQD3omapPFccctMLnVoxurubxgwC7vjMARXS6yPfAs');
  
  const gateways = [
    `https://${testCID}.ipfs.cf-ipfs.com/`,
    `https://${testCID}.ipfs.w3s.link/`,
    `https://${testCID}.ipfs.nftstorage.link/`,
    `https://ipfs.io/ipfs/${testCID}`,
    `https://gateway.pinata.cloud/ipfs/${testCID}`,
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-4">IPFS Gateway Test</h3>
      <input 
        value={testCID}
        onChange={(e) => setTestCID(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter CID to test"
      />
      <div className="space-y-2">
        {gateways.map((url, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-sm w-4">{index + 1}.</span>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              {url}
            </a>
            <img 
              src={url} 
              alt={`Gateway ${index + 1}`}
              className="w-8 h-8 object-cover border rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}