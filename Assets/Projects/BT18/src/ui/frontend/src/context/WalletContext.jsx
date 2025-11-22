import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [currentWallet, setCurrentWallet] = useState(null);
  const [walletMismatch, setWalletMismatch] = useState(false);

  // 🔹 The wallet expected for the logged-in user
  const expectedWallet =
    localStorage.getItem("wallet")?.toLowerCase() || null;

  // 🔹 Try switching MetaMask account
  const requestAccountSwitch = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      return accounts[0]?.toLowerCase();
    } catch (e) {
      console.error("MetaMask account switch error:", e);
      return null;
    }
  };

  // 🔹 Verify wallet on load & on MetaMask change
  const verifyWallet = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const connected = accounts[0]?.toLowerCase();

    setCurrentWallet(connected);

    if (expectedWallet && connected !== expectedWallet) {
      // auto-switch attempt
      const switched = await requestAccountSwitch();

      if (switched && switched === expectedWallet) {
        setCurrentWallet(switched);
        setWalletMismatch(false);
      } else {
        setWalletMismatch(true);
      }
    } else {
      setWalletMismatch(false);
    }
  };

  useEffect(() => {
    verifyWallet();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", verifyWallet);
    }

    return () => {
      window.ethereum?.removeListener("accountsChanged", verifyWallet);
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{ currentWallet, expectedWallet, walletMismatch, verifyWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
