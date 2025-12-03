"use client"

import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../components/abi/UserRegistry.json";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    try {
      if (!window.ethereum) {
        setError("MetaMask is required!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        "0x40e0b31400c0c6b9099e16f052524a802af10180",
        contractABI,
        signer
      );

      const [success, userAddr] = await contract.loginWithUsername(
        username,
        password
      );

      if (!success) {
        setError("Invalid username or password");
        return;
      }

      // Redirect to /username
      router.push(`/${username}`);

    } catch (err: any) {
      console.error(err);
      setError("Login failed. Check console.");
    }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl shadow-blue-500/10 p-8 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-lg">
          Sign in to your decentralized account
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Username
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              className="w-full rounded-xl border-2 border-gray-200 p-4 pl-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full rounded-xl border-2 border-gray-200 p-4 pl-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
          </div>
        )}

       

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
          disabled={!username || !password}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Sign In to Your Account</span>
          </div>
        </button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Alternative Options */}
      <div className="space-y-4">
        <button
          onClick={() => window.location.href = '/auth/register'}
          className="w-full rounded-xl border-2 border-blue-500 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Create New Account
        </button>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  </div>
);
}
