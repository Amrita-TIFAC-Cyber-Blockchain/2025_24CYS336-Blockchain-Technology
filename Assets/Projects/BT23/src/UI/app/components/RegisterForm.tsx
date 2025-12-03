'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import contractABI from "./abi/UserRegistry.json"
import { useRouter } from "next/navigation";
const CONTRACT_ADDRESS = '0x40e0b31400c0c6b9099e16f052524a802af10180'

type RegistrationStep = 'connect' | 'password' | 'profile' | 'complete'

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<RegistrationStep>('connect')
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    username: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState<string | null>(null)

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // ✅ connect to wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!')
      return
    }

    try {
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(address)

      // ✅ check if on Sepolia testnet
      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const network = await provider.getNetwork()

      if (network.chainId !== 11155111n) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          })
        } catch (err: any) {
          alert('Please manually switch your MetaMask network to Sepolia.')
          console.error('Switch error:', err)
          return
        }
      }

      // Check if user is already registered
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider)
      const isUserRegistered = await contract.isRegistered(address)
      
      if (isUserRegistered) {
        alert('This wallet is already registered!')
        const [userName, userBio, userRegisteredAt] = await contract.getUser(address);
   
        router.push("/" +userName)
        return
      }

      setStep('password')
    } catch (err) {
      console.error(err)
      alert('Wallet connection failed.')
    }
  }

  // ✅ Validate password step and move to profile
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setStep('profile')
  }

  // ✅ Complete registration - store all data at once
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.username.length < 3) {
      alert('Username must be at least 3 characters long')
      return
    }

    try {
      setLoading(true)

      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer)

      // Check username availability
      const isAvailable = await contract.isUsernameAvailable(formData.username)
      if (!isAvailable) {
        alert('Username is already taken. Please choose another one.')
        return
      }

      // Single transaction to store all data
      const tx = await contract.register(
        formData.username, 
        formData.bio, 
        formData.password
      )
      await tx.wait()

      setStep('complete')
      setTimeout(() => {
      router.push("/"+formData.username); // 👈 change this to your target route
    }, 2000);
      // Reset form
      setFormData({
        password: '',
        confirmPassword: '',
        username: '',
        bio: ''
      })
    } catch (error: any) {
      console.error(error)
      if (error.reason?.includes('Username already taken')) {
        alert('Username is already taken. Please choose another one.')
      } else if (error.reason?.includes('Password must be at least')) {
        alert('Password must be at least 8 characters long.')
      } else {
        alert('Error during registration: ' + (error.reason || error.message))
      }
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'connect':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Connect your MetaMask wallet to start your journey in decentralized social media
            </p>
            <button
              onClick={connectWallet}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
                </svg>
                <span>Connect MetaMask</span>
              </div>
            </button>
            <p className="text-sm text-gray-500 pt-4">
              New to crypto? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Learn about wallets</a>
            </p>
          </div>
        )

      case 'password':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Secure Your Account
              </h2>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                Step 1 of 2
              </span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Create a strong password to protect your decentralized identity
            </p>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter password (minimum 8 characters)"
                />
                <p className="text-xs text-gray-500 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <span>Use a strong, unique password with mixed characters</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 placeholder-gray-400"
                  placeholder="Re-enter your password"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('connect')}
                  className="flex-1 rounded-xl border-2 border-gray-300 py-4 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Your Profile
              </h2>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                Step 2 of 2
              </span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Create your unique identity in the decentralized social network
            </p>
            
            <form onSubmit={handleCompleteRegistration} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  value={formData.username}
                  onChange={(e) => updateFormData('username', e.target.value)}
                  required
                  minLength={3}
                  className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 placeholder-gray-400"
                  placeholder="Choose your unique username"
                />
                <p className="text-xs text-gray-500 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <span>This will be your unique identity on the blockchain</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                  required
                  maxLength={200}
                  className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 placeholder-gray-400 resize-none"
                  placeholder="Tell the community about yourself... (max 200 characters)"
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    <span>This will be stored permanently on the blockchain</span>
                  </p>
                  <span className={`text-sm font-medium ${
                    formData.bio.length > 180 ? 'text-red-500' : 
                    formData.bio.length > 150 ? 'text-yellow-500' : 'text-gray-500'
                  }`}>
                    {formData.bio.length}/200
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('password')}
                  className="flex-1 rounded-xl border-2 border-gray-300 py-4 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 py-4 text-white font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Registering...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Complete Registration</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        )

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Welcome to the Network!
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Your decentralized identity has been successfully created on the blockchain
            </p>
            
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 text-left space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0112 0c0 .-.1.389-.024.765A5.986 5.986 0 0013 11z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Username</p>
                  <p className="text-lg font-semibold text-gray-700">@{formData.username}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Wallet Address</p>
                  <p className="text-sm font-mono text-gray-600">
                    {account?.slice(0, 8)}...{account?.slice(-6)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => window.location.href = '/feed'}
                className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 py-4 text-white font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Explore Feed
              </button>
              <button
                onClick={() => window.location.href = '/profile'}
                className="flex-1 rounded-xl border-2 border-gray-300 py-4 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                View Profile
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-gray-100">
        {/* Progress Indicator */}
        {step !== 'connect' && step !== 'complete' && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {['connect', 'password', 'profile'].map((s, index) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === s ? 'bg-blue-600 text-white' :
                    ['password', 'profile'].includes(step) && index < ['connect', 'password', 'profile'].indexOf(step) ? 
                    'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 2 && (
                    <div className={`w-12 h-1 mx-2 ${
                      ['password', 'profile'].includes(step) && index < ['connect', 'password', 'profile'].indexOf(step) ? 
                      'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Wallet Info */}
        {account && step !== 'complete' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-blue-700">
                Connected: <span className="font-mono">{account.slice(0, 8)}...{account.slice(-6)}</span>
              </p>
            </div>
          </div>
        )}

        {renderStep()}
      </div>
    </div>
  )
}