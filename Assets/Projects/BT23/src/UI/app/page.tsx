import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">ChainSocial</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/auth/login"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/register"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Decentralized Social Media
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Powered by Blockchain
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Take back control of your data. Connect, share, and earn in a truly decentralized social network 
              where you own your content and identity.
            </p>

            {/* Key Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Data Ownership</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Censorship Resistant</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Content Monetization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Transparent Algorithms</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/auth/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Create Account
              </Link>
              <Link 
                href="/auth/login"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg font-semibold rounded-xl hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200 text-center"
              >
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex space-x-8">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1M+</div>
                <div className="text-gray-600 dark:text-gray-400">Posts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-gray-600 dark:text-gray-400">Decentralized</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Blockchain Network Visualization */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                
                {/* Satellite Nodes */}
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(120px) rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
                
                {/* Connecting Lines */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                    <line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + 30 * Math.cos((angle * Math.PI) / 180)}%`}
                      y2={`${50 + 30 * Math.sin((angle * Math.PI) / 180)}%`}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-300 dark:text-gray-600"
                    />
                  ))}
                </svg>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl transform rotate-12 opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-400 rounded-3xl transform -rotate-12 opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 text-center border-t border-gray-200 dark:border-gray-800 mt-20">
        <p className="text-gray-600 dark:text-gray-400">
          Built on blockchain technology • Your data, your rules • Join the decentralized revolution
        </p>
      </footer>
    </div>
  );
}