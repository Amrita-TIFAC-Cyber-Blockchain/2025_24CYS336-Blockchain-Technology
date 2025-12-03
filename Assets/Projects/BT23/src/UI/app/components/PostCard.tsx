// components/PostCard.tsx
'use client'
import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';
import IPFSImage from './IPFSImage';
import { useBlockchain } from '../../hooks/useBlockchain';

interface Post {
  text: string;
  image: string;
  timestamp: number;
  likeCount: number;
  userLiked: boolean;
  postIndex: number;
  authorAddress: string;
}

interface PostCardProps {
  post: Post;
  onLikeUpdate?: () => void;
  authorUsername?: string;
}

export default function PostCard({ post, onLikeUpdate, authorUsername }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.userLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiking, setIsLiking] = useState(false);
  const { contract, account, isConnected } = useBlockchain();

  useEffect(() => {
    setIsLiked(post.userLiked);
    setLikeCount(post.likeCount);
  }, [post.userLiked, post.likeCount]);

  const handleLike = async () => {
    if (!contract || !isConnected || isLiking) return;

    setIsLiking(true);
    try {
      if (isLiked) {
        await contract.unlikePost(post.authorAddress, post.postIndex);
        setLikeCount(prev => prev - 1);
      } else {
        await contract.likePost(post.authorAddress, post.postIndex);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
      
      if (onLikeUpdate) {
        onLikeUpdate();
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const displayName = authorUsername || 'User';
  const displayInitial = authorUsername ? authorUsername.charAt(0).toUpperCase() : 'U';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {displayInitial}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{displayName}</h3>
            <p className="text-gray-500 text-sm">{formatTime(post.timestamp)}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Share size={18} />
        </button>
      </div>

      {/* Post Content */}
      {post.text && (
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {post.text}
          </p>
        </div>
      )}

      {/* Post Image */}
      {post.image && post.image.trim() !== '' && (
        <div className="mb-4">
          <IPFSImage
            cid={post.image}
            alt="Post image"
            className="w-full max-h-96 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Like Count */}
      {likeCount > 0 && (
        <div className="mt-3 text-sm text-gray-500">
          {likeCount} {likeCount === 1 ? 'like' : 'likes'}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            disabled={!isConnected || isLiking}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked 
                ? 'text-red-500' 
                : 'text-gray-400 hover:text-red-500'
            } ${(!isConnected || isLiking) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm">
              {isLiking ? '...' : isLiked ? 'Liked' : 'Like'}
            </span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
            <MessageCircle size={20} />
            <span className="text-sm">Comment</span>
          </button>
        </div>
      </div>

      {/* Connect Wallet Prompt */}
      {!isConnected && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          Connect your wallet to like posts
        </div>
      )}
    </div>
  );
}