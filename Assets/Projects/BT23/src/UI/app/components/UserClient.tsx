// components/UserClient.tsx
'use client'
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Link as LinkIcon, Users } from 'lucide-react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { useBlockchain } from '../../hooks/useBlockchain';
import SearchUsers from './SearchUsers';

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

interface UserClientProps {
  userData: UserData;
  posts: Post[];
}

export default function UserClient({ userData, posts: initialPosts }: UserClientProps) {
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
    // Refresh posts after new post is created
    setIsRefreshing(true);
    try {
      // Refetch posts from blockchain
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
    // Refresh posts when likes are updated
    await handlePostCreated();
  };

  const isOwnProfile = isConnected && account?.toLowerCase() === userData.address.toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">SocialChain</h1>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <SearchUsers />
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
        // In UserClient.tsx, add this section after the profile header:
{isOwnProfile && (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Users className="h-5 w-5 text-green-400" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-green-800">
          Your Profile
        </h3>
        <p className="text-sm text-green-700 mt-1">
          This is your personal profile where you can create posts and manage your content.
        </p>
      </div>
    </div>
  </div>
)}
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
          </div>
        </div>

        {/* Create Post (only for own profile) */}
        {isOwnProfile && (
          <CreatePost onPostCreated={handlePostCreated} />
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
                  ? "Create your first post to get started!" 
                  : "This user hasn't posted anything yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}