// components/SearchUserClient.tsx
'use client'
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Link as LinkIcon, Users, ArrowLeft } from 'lucide-react';
import PostCard from './PostCard';
import { useBlockchain } from '../../hooks/useBlockchain';
import Link from 'next/link';

interface UserData {
  username: string;
  bio: string;
  registeredAt: number;
  address: string;
}

interface Post {
  text: string;
  image: string;
  timestamp: number;
  likeCount: number;
  userLiked: boolean;
}

interface SearchUserClientProps {
  userData: UserData;
  posts: Post[];
}

export default function SearchUserClient({ userData, posts: initialPosts }: SearchUserClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { account, connectWallet, isConnected, contract } = useBlockchain();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handlePostCreated = async () => {
    setIsRefreshing(true);
    try {
      if (contract && userData.address) {
        const postCount = await contract.getPostCount(userData.address);
        const updatedPosts: Post[] = [];
        
        for (let i = 0; i < postCount; i++) {
          const postData = await contract.getPost(userData.address, i);
          updatedPosts.push({
            text: postData[0],
            image: postData[1],
            timestamp: postData[2].toNumber(),
            likeCount: postData[3].toNumber(),
            userLiked: postData[4]
          });
        }
        
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error refreshing posts:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLikeUpdate = async () => {
    await handlePostCreated();
  };

  const isOwnProfile = isConnected && account?.toLowerCase() === userData.address.toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/search"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">SocialChain</h1>
            </div>
            
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {account?.charAt(2).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 font-medium text-sm">
                  {formatAddress(account)}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {userData.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userData.username || 'Unknown User'}
                </h1>
                <p className="text-gray-600 mb-4 max-w-md leading-relaxed">
                  {userData.bio || "No bio yet."}
                </p>
                
                <div className="flex items-center space-x-6 text-gray-500 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Joined {formatDate(userData.registeredAt)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>{posts.length} posts</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <LinkIcon size={16} />
                    <span className="font-mono">
                      {formatAddress(userData.address)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <Link
                href={`/${userData.username}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                View My Profile
              </Link>
            )}
          </div>
        </div>

        {!isOwnProfile && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Viewing {userData.username}'s Profile
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  You can view and like posts, but only the owner can create new posts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {isRefreshing && (
            <div className="text-center py-4 text-gray-500">
              Refreshing posts...
            </div>
          )}
          
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard 
                key={`${userData.address}-${index}`} 
                post={{
                  ...post,
                  postIndex: index,
                  authorAddress: userData.address
                }}
                authorUsername={userData.username}
                onLikeUpdate={handleLikeUpdate}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Users size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-500">
                {isOwnProfile 
                  ? "This is your profile view. Visit your main profile to create posts!" 
                  : "This user hasn't posted anything yet."}
              </p>
              {isOwnProfile && (
                <Link
                  href={`/${userData.username}`}
                  className="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Go to My Profile
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}