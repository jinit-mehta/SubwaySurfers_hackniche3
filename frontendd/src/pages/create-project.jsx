'use client';
import { useState } from 'react';
// import { ethers } from 'ethers';
import axios from 'axios';
import { Button } from '../components/ui/Button';

// Smart Contract Details (Replace with your deployed contract address)
const contractAddress = "0x249dDB8EF9A706ee8a35Fa0fCbbd2A0f7702Ad5B";

// Embedded ABI (Ensure this matches your deployed contract)
const contractABI = [
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
    console.log("Attempting to connect wallet...");
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      console.error("MetaMask not installed.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      console.log("Wallet connected:", address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  // Upload image to IPFS using Pinata
  const uploadToIPFS = async (file) => {
    console.log("Uploading file to IPFS:", file);
    const data = new FormData();
    data.append("file", file);

    const pinataApiKey = "b55244bc1d05ba588036";  // Replace with your Pinata API Key
    const pinataSecretApiKey = "d58c6419dd8d57b409931903a04d93bebdf7ea094b367acb96bef858e17cec9a"; // Replace with your Pinata Secret Key

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "pinata_api_key": pinataApiKey,
          "pinata_secret_api_key": pinataSecretApiKey
        }
      });
      const imageURI = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log("Image uploaded to IPFS:", imageURI);
      return imageURI;
    } catch (error) {
      console.error("IPFS Upload Error:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started.");

    if (!walletAddress) {
      alert("Please connect your wallet before submitting!");
      console.error("Wallet not connected.");
      return;
    }

    if (!formData.image) {
      alert("Please upload an image!");
      console.error("Image not provided.");
      return;
    }

    setLoading(true);
    console.log("Loading state set to true.");

    try {
      // Upload image to IPFS
      console.log("Starting image upload...");
      const imageURI = await uploadToIPFS(formData.image);
      if (!imageURI) {
        alert("Image upload failed!");
        console.error("Image upload failed.");
        setLoading(false);
        return;
      }

      // Process milestones
      const milestones = formData.milestones.map(m => {
        const deadlineTimestamp = Math.floor(new Date(m.deadline).getTime() / 1000) || 0;
        console.log(`Processing milestone: Title="${m.title}", Deadline=${deadlineTimestamp}`);
        return {
          title: m.title.trim() || "Untitled",
          description: m.description.trim() || "No description",
          deadline: deadlineTimestamp
        };
      });

      // Prepare project data for storage
      const processedFundingGoal = ethers.parseUnits(formData.fundingGoal, "ether");
      const projectData = {
        title: formData.title,
        category: formData.category,
        fundingGoal: processedFundingGoal.toString(),
        duration: parseInt(formData.duration),
        description: formData.description,
        imageURI,
        milestones
      };
      console.log("Project data to be stored:", projectData);

      // Interact with smart contract
      console.log("Preparing to interact with smart contract...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log("Calling createProject on contract with data:", {
        title: projectData.title,
        category: projectData.category,
        fundingGoal: processedFundingGoal.toString(),
        duration: projectData.duration,
        description: projectData.description,
        imageURI: projectData.imageURI,
        milestones: projectData.milestones
      });

      const tx = await contract.createProject(
        projectData.title,
        projectData.category,
        processedFundingGoal,
        projectData.duration,
        projectData.description,
        projectData.imageURI,
        projectData.milestones
      );

      console.log("Transaction sent. Awaiting confirmation...", tx);
      await tx.wait();
      console.log("Transaction confirmed:", tx);
      alert("Campaign added successfully!");

      // Reset form data
      setFormData({
        title: '',
        category: '',
        fundingGoal: '',
        duration: '30',
        description: '',
        image: null,
        milestones: [{ title: '', description: '', deadline: '' }]
      });
      console.log("Form data reset.");
    } catch (error) {
      console.error("Transaction Failed:", error);
      alert("Campaign submission failed!");
    } finally {
      setLoading(false);
      console.log("Loading state set to false.");
    }
  };

  // Add a new milestone field
  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: '', description: '', deadline: '' }]
    });
  };

  // Handle milestone input change
  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index][field] = value;
    setFormData({ ...formData, milestones: newMilestones });
  };

  return (
    <div className="bg-black">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black ">
      <div className="!bg-black rounded-lg shadow-lg p-8 w-full border">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Create Your Campaign</h1>

        {!walletAddress ? (
          <div className="flex justify-center mb-6">
            <Button onClick={connectWallet} variant="outline" size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
              Connect Wallet
            </Button>
          </div>
        ) : (
          <p className="text-green-600 font-medium mb-6 text-center">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1"><h3>Project Title</h3></label>
            <input
              type="text"
              placeholder="Enter your project title"
              className="w-full border border-black rounded-md p-2 bg-black text-white placeholder-white placeholder border-white  focus:border-white"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-black rounded-md p-4 bg-black text-white placeholder-white placeholder border-white  focus:border-white"
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="environment">Environment</option>
              <option value="social">Social Impact</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Funding Goal (ETH)</label>
            <input
              type="number"
              placeholder="Enter your funding goal"
              className="w-full border border-black rounded-md p-2 bg-black text-white placeholder-white placeholder border-white  focus:border-white"
              value={formData.fundingGoal}
              onChange={e => setFormData({ ...formData, fundingGoal: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Project Description</label>
            <textarea
              placeholder="Describe your project"
              className="w-full border border-black rounded-md p-2 bg-black text-white placeholder-white placeholder border-white  focus:border-white"
              rows="4"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Upload Banner Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-black rounded-md p-2 bg-black text-white placeholder-white placeholder border-white  focus:border-white"
              onChange={e => {
                console.log("File selected:", e.target.files[0]);
                setFormData({ ...formData, image: e.target.files[0] });
              }}
            />
          </div>

          {/* Milestones Section */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Milestones</label>
            {formData.milestones.map((milestone, index) => (
              <div key={index} className="space-y-4 mb-4">
                {/* <input
                  type="text"
                  placeholder="Milestone Title"
                  className="w-full border border-black rounded-md p-2 text-black focus:outline-none focus:border-black"
                  value={milestone.title}
                  onChange={e => handleMilestoneChange(index, 'title', e.target.value)}
                />
                <textarea
                  placeholder="Milestone Description"
                  className="w-full border border-black rounded-md p-2 text-black focus:outline-none focus:border-black"
                  value={milestone.description}
                  onChange={e => handleMilestoneChange(index, 'description', e.target.value)}
                /> */}
                <input
                  type="date"
                  className="w-full border border-black rounded-md p-2 bg-black text-white placeholder-white placeholder border-white  focus:border-white"
                  value={milestone.deadline}
                  onChange={e => handleMilestoneChange(index, 'deadline', e.target.value)}
                />
              </div>
            ))}
            {/* <Button type="button" onClick={addMilestone} className="bg-blue-500 text-white hover:bg-blue-600">
              Add Milestone
            </Button> */}
          </div>

          <div className="flex justify-center">
            <Button type="submit" size="lg" className="bg-blue-500 text-white hover:bg-blue-600" disabled={loading}>
              {loading ? "Submitting..." : "Submit Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateProject;