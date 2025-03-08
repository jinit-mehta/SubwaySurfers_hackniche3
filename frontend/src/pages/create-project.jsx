'use client';
import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { Button } from '../components/ui/Button';

// Smart Contract Details (Replace with your deployed contract address)
const contractAddress = "0x5EDAfB9595cd63E132CE7eCF568EAef7b27406D4"; 

// Embedded ABI (Ensure this matches your deployed contract)
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_fundingGoal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageIPFS",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					}
				],
				"internalType": "struct Crowdfunding.Milestone[]",
				"name": "_milestones",
				"type": "tuple[]"
			}
		],
		"name": "createProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fundingGoal",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "imageIPFS",
				"type": "string"
			}
		],
		"name": "ProjectCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "projectCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "fundingGoal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageIPFS",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const CreateProject = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        fundingGoal: '',
        duration: '30',
        description: '',
        image: null,
        milestones: [{ title: '', description: '', deadline: '' }]
    });

    // Connect MetaMask Wallet
    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask!');
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    // Upload image to IPFS using Pinata
    const uploadToIPFS = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const pinataApiKey = "b55244bc1d05ba588036";  // 🔹 Replace with your Pinata API Key
        const pinataSecretApiKey = "d58c6419dd8d57b409931903a04d93bebdf7ea094b367acb96bef858e17cec9a"; // 🔹 Replace with your Pinata Secret Key

        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "pinata_api_key": pinataApiKey,
                    "pinata_secret_api_key": pinataSecretApiKey
                }
            });
            return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        } catch (error) {
            console.error("IPFS Upload Error:", error);
            return null;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
        alert("Please connect your wallet before submitting!");
        return;
    }

    if (!formData.image) {
        alert("Please upload an image!");
        return;
    }

    setLoading(true);

    try {
        // Upload image to IPFS
        const imageURI = await uploadToIPFS(formData.image);
        if (!imageURI) {
            alert("Image upload failed!");
            setLoading(false);
            return;
        }

        const milestones = formData.milestones.map(m => ({
          title: m.title.trim() || "Untitled",
          description: m.description.trim() || "No description",
          deadline: Math.floor(new Date(m.deadline).getTime() / 1000) || 0
      }));      

        // Interact with smart contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.createProject(
          formData.title,
          formData.category,
          ethers.parseUnits(formData.fundingGoal, "ether"),
          parseInt(formData.duration),
          formData.description,
          imageURI,
          milestones // ✅ Now passing an array of structs
      );      

        await tx.wait();
        alert("Campaign added successfully!");

        setFormData({
            title: '',
            category: '',
            fundingGoal: '',
            duration: '30',
            description: '',
            image: null,
            milestones: [{ title: '', description: '', deadline: '' }]
        });
    } catch (error) {
        console.error("Transaction Failed:", error);
        alert("Campaign submission failed!");
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Campaign</h1>
                
                {!walletAddress ? (
                    <Button onClick={connectWallet} variant="outline" size="lg" className="mb-4">
                        Connect Wallet
                    </Button>
                ) : (
                    <p className="text-green-600 font-medium mb-4">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <input type="text" placeholder="Project Title" className="input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="input">
                        <option value="">Select Category</option>
                        <option value="technology">Technology</option>
                        <option value="environment">Environment</option>
                        <option value="social">Social Impact</option>
                        <option value="creative">Creative</option>
                    </select>
                    <input type="number" placeholder="Funding Goal (ETH)" className="input" value={formData.fundingGoal} onChange={e => setFormData({ ...formData, fundingGoal: e.target.value })} />
                    <textarea placeholder="Project Description" className="input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    <input type="file" accept="image/*" className="input" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
                    <Button type="submit" size="lg" disabled={loading}>{loading ? "Submitting..." : "Submit Project"}</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
