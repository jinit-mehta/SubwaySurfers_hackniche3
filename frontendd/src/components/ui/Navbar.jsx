'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { ethers } from "ethers";
import { Button } from '../ui/Button';

const contractAddress = "0x903300D8f217dF174bEBffc72928910c76D56209"; // Replace with your actual contract address
const contractABI = [
  {
    "inputs": [],
    "name": "connectWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "WalletConnected",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "isWalletConnected",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log("Connected Wallet:", address);
        setWalletAddress(address);

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const connected = await contract.isWalletConnected(address);
        setIsConnected(connected);
        console.log("Is Wallet Connected in Contract:", connected);
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("Requesting wallet connection...");
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log("Wallet Connected:", address);
        setWalletAddress(address);

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contract.connectWallet();
        console.log("Transaction Sent:", tx.hash);
        await tx.wait(); // Wait for confirmation
        console.log("Wallet successfully registered in contract!");

        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask.");
    }
  };

  return (
    <nav className="bg-black border border-blue-600  shadow-lg  px-6 py-2 w-full overflow-hidden sticky top-0 z-50">      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">TrustChain</span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/projects" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Campaign
              </Link>
              <Link href="/create-project" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Start a Campaign
              </Link>
              <Link href="/dashboard/investor" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {walletAddress ? (
              <span className="text-green-600 font-medium text-sm">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            ) : (
              <Button onClick={connectWallet} variant="outline" size="sm" className="mr-3">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




