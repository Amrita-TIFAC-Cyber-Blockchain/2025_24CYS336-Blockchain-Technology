// app/search/page.tsx
'use client'
import { useState, useEffect, useCallback } from 'react';
import { Search, User, ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBlockchain } from '../../hooks/useBlockchain';
import Link from 'next/link';

interface SearchResult {
  address: string;
  username: string;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchUsers, isConnected, connectWallet } = useBlockchain();

  // Get initial query from URL
  const initialQuery = searchParams?.get('q') || '';

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || !isConnected) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    try {
      const searchResults = await searchUsers(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [isConnected, searchUsers]);

  // Initialize with URL query
  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  // Debounce user input
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(searchTerm);
    }, 500); // Increased debounce time

    return () => clearTimeout(timeoutId);
  }, [searchTerm, performSearch]);

  const handleResultClick = (username: string) => {
    router.push(`/search/${username}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Search Users</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Search Input */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={isConnected ? "Search for users..." : "Connect wallet to search"}
                value={searchTerm}
                onChange={handleInputChange}
                disabled={!isConnected}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </form>

          {!isConnected && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm mb-2">
                Connect your wallet to search for users
              </p>
              <button
                onClick={connectWallet}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="space-y-3">
          {hasSearched && !isSearching && results.length === 0 && searchTerm.trim() && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No users found
              </h3>
              <p className="text-gray-500">
                No users match your search for "{searchTerm}"
              </p>
            </div>
          )}

          {!hasSearched && !searchTerm.trim() && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Search for users
              </h3>
              <p className="text-gray-500">
                Enter a username in the search box above to find users
              </p>
            </div>
          )}

          {results.map((result) => (
            <div
              key={result.address}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleResultClick(result.username)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {result.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {result.username}
                  </h3>
                  <p className="text-gray-500 text-sm font-mono">
                    {formatAddress(result.address)}
                  </p>
                </div>
                <div className="text-gray-400">
                  <User size={20} />
                </div>
              </div>
            </div>
          ))}

          {isSearching && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Searching users...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}