// components/SearchUsers.tsx
'use client'
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBlockchain } from '../../hooks/useBlockchain';

export default function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { isConnected } = useBlockchain();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to search page with query parameter
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-text"
          />
        </div>
      </form>
    </div>
  );
}