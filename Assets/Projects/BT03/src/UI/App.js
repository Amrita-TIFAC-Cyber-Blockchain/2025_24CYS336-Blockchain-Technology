// client/src/App.js (Corrected for Ethers.js)

import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AdminView from './components/AdminView';
import UserView from './components/UserView';
// MODIFIED IMPORT: Removed getWeb3Instance
import { connectWallet, fetchAllCertificates, getAdminAddress, getCurrentAccount } from './utils/web3Service';

function App() {
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch and update the certificate list
    const loadCertificates = useCallback(async () => {
        if (isConnected) {
            setLoading(true);
            try {
                const data = await fetchAllCertificates();
                setCertificates(data);
            } catch (error) {
                console.error("Failed to fetch certificates:", error);
            }
            setLoading(false);
        }
    }, [isConnected]);

    // Handle initial wallet connection and subsequent account/network changes
    const handleConnect = async () => {
        try {
            const { account: connectedAccount, chainId: networkChainId } = await connectWallet();
            
            setAccount(connectedAccount);
            setChainId(networkChainId);
            setIsConnected(true);

            // Role Detection: Check if the connected account is the Admin
            const adminAddress = getAdminAddress();
            setIsAdmin(connectedAccount.toLowerCase() === adminAddress.toLowerCase());
            
        } catch (error) {
            alert(`Connection Error: ${error.message}`);
            setIsConnected(false);
        }
    };
    
    // Initial load and Subscription to wallet changes
    useEffect(() => {
        if (window.ethereum) {
             handleConnect();

            // Setup listeners for account and chain changes using window.ethereum directly
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    handleConnect(); // Re-run connection logic for new account
                } else {
                    // Disconnected
                    setIsConnected(false);
                    setAccount(null);
                    setChainId(null);
                    setIsAdmin(false);
                    setCertificates([]);
                }
            };
            const handleChainChanged = () => {
                // Ethers.js recommends reloading the page on network change
                window.location.reload(); 
            };

            // ADDED LISTENERS: Using the standard Ethereum provider events
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                // CLEANUP: Remove listeners upon component unmount
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);

    // Load certificates whenever connection state changes
    useEffect(() => {
        loadCertificates();
    }, [loadCertificates]);

    return (
        <>
            <Header 
                isConnected={isConnected} 
                account={account || '0x...'} 
                isAdmin={isAdmin}
                connect={handleConnect}
            />
            
            <div className="container">
                <h1 className="text-center mb-4">Digital Credential Verification System</h1>
                <hr />

                {!isConnected ? (
                    <div className="alert alert-warning text-center">
                        Please connect your MetaMask wallet to begin.
                        <br />
                        Ensure you are on the **Ganache Localhost 8545** network (Chain ID: 31337).
                    </div>
                ) : (
                    <>
                        {loading ? (
                            <div className="text-center text-info">Loading certificates...</div>
                        ) : (
                            <>
                                {isAdmin && (
                                    <AdminView 
                                        account={account} 
                                        refreshData={loadCertificates}
                                    />
                                )}
                                
                                <UserView certificates={certificates} />
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default App;
