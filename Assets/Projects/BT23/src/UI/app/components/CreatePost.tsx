// components/CreatePost.tsx
'use client'
import { useState, useRef } from 'react';
import { Image, X, Upload } from 'lucide-react';
import { storeFile } from '../../lib/ipfs';
import { useBlockchain } from '../../hooks/useBlockchain';

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPost, isConnected, connectWallet } = useBlockchain();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
      }

      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      await connectWallet();
      return;
    }

    if (!text.trim() && !image) {
      alert('Please enter text or select an image');
      return;
    }

    setIsUploading(true);

    try {
      let imageCid = '';

      // Upload image to IPFS if exists
      if (image) {
        imageCid = await storeFile(image);
        console.log('Image uploaded to IPFS:', imageCid);
      }

      // Create post on blockchain
      await createPost(text.trim(), imageCid);
      
      // Reset form
      setText('');
      removeImage();
      
      // Notify parent component
      onPostCreated();
      
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSubmit}>
        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border-0 resize-none focus:ring-0 text-lg placeholder-gray-500 min-h-[100px] mb-4"
          disabled={isUploading}
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto max-h-80 object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors disabled:opacity-50"
            >
              <Image size={20} />
              <span>Photo</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isUploading || (!text.trim() && !image)}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                <span>Post</span>
              </>
            )}
          </button>
        </div>

        {/* Wallet Connection Notice */}
        {!isConnected && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Connect your wallet to create a post.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}