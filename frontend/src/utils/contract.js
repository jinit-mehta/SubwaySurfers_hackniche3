import { ethers } from "ethers";

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "contributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ContributionReceived",
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
				"internalType": "string[]",
				"name": "_milestoneTitles",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_milestoneDescriptions",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_milestoneDeadlines",
				"type": "uint256[]"
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
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_milestoneIndex",
				"type": "uint256"
			}
		],
		"name": "markMilestoneCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "milestoneIndex",
				"type": "uint256"
			}
		],
		"name": "MilestoneCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
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
				"internalType": "uint256",
				"name": "goal",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "ProjectCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "getMilestones",
		"outputs": [
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
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					}
				],
				"internalType": "struct Crowdfunding.Milestone[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "getProject",
		"outputs": [
			{
				"internalType": "address",
				"name": "creator",
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
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amountRaised",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
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
				"name": "creator",
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
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amountRaised",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x604d431705c0b52990CdbE807700a01b960554d0"; // Replace with your actual contract address

let provider;
let signer;
let contract;

export const connectWallet  = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
        try {
            console.log("Connecting to blockchain...");
            provider = new ethers.BrowserProvider(window.ethereum); // ✅ Fix for ethers v6
            await window.ethereum.request({ method: "eth_requestAccounts" });
            
            signer = await provider.getSigner(); // ✅ Must use await in ethers v6
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            console.log("Blockchain connected:", contract);
            return { contract, signer }; // ✅ Return both contract & signer
        } catch (error) {
            console.error("Error connecting to blockchain:", error);
            return null;
        }
    } else {
        console.error("MetaMask is not installed or `window.ethereum` is not available.");
        alert("Please install MetaMask to use this application.");
        return null;
    }
};
export const getGreeting = async (contract) => {
    try {
        const greeting = await contract.getGreeting();
        return greeting;
    } catch (error) {
        console.error("Error fetching greeting:", error);
        return "Error fetching greeting.";
    }
};

export const setGreeting = async (contract, newGreeting) => {
    try {
        const tx = await contract.setGreeting(newGreeting);
        await tx.wait(); // Wait for the transaction to be mined
        return true;
    } catch (error) {
        console.error("Error setting greeting:", error);
        return false;
    }
};

