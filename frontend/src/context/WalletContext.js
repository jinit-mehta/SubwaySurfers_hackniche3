'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Create Context
const WalletContext = createContext();

// Wallet Provider Component
export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);

    // Check if wallet is already connected
    useEffect(() => {
        const checkWallet = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const address = await signer.getAddress();
                    setWalletAddress(address);
                } catch (error) {
                    console.error("Wallet not connected:", error);
                }
            }
        };
        checkWallet();
    }, []);

    return (
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </WalletContext.Provider>
    );
};

// Hook to use WalletContext
export const useWallet = () => useContext(WalletContext);
