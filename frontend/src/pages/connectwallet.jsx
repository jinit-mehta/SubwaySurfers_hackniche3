// import { useState } from 'react';
// import { Button } from '../components/ui/Button';
// import { connectWallet, getGreeting, setGreeting } from '../utils/contract'; // Adjust the import path as needed

// const ConnectWallet = () => {
//   const [connecting, setConnecting] = useState(false);
//   const [greeting, setGreetingMessage] = useState('');
//   const [contract, setContract] = useState(null);

//   // const handleConnect = async () => {
//   //   setConnecting(true);
//   //   try {
//   //     if (typeof window.ethereum === 'undefined') {
//   //       alert('Please install MetaMask to connect your wallet.');
//   //       window.open('https://metamask.io/download/', '_blank');
//   //       return;
//   //     }

//   //     const { contract } = await connectWallet();
//   //     setContract(contract);
//   //     const currentGreeting = await getGreeting(contract);
//   //     setGreetingMessage(currentGreeting);
//   //   } catch (error) {
//   //     console.error('Error connecting wallet:', error);
//   //     alert('Failed to connect wallet. Please try again.');
//   //   } finally {
//   //     setConnecting(false);
//   //   }
//   // };



//   const handleConnect = async () => {
//     setConnecting(true);
//     try {
//         console.log("Connecting to wallet...");
//         const blockchainData = await connectWallet();
//         console.log("Blockchain Data:", blockchainData);

//         if (!blockchainData || !blockchainData.contract) {
//             throw new Error("Failed to retrieve contract.");
//         }

//         setContract(blockchainData.contract);
//         const currentGreeting = await getGreeting(blockchainData.contract);
//         setGreetingMessage(currentGreeting);
//     } catch (error) {
//         console.error("Error connecting wallet:", error);
//         alert('Failed to connect wallet. Please try again.');
//     } finally {
//         setConnecting(false);
//     }
// };

//   const handleSetGreeting = async () => {
//     if (contract) {
//       try {
//         await setGreeting(contract, 'Hello, World!');
//         const updatedGreeting = await getGreeting(contract);
//         setGreetingMessage(updatedGreeting);
//       } catch (error) {
//         console.error('Error setting greeting:', error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Connect your wallet
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Choose your preferred wallet to connect to the platform
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <div className="space-y-4">
//             <Button
//               variant="primary"
//               size="sm"
//               disabled={connecting}
//               onClick={handleConnect}
//             >
//               {connecting ? 'Connecting...' : 'Connect Wallet'}
//             </Button>

//             {greeting && (
//               <div className="mt-4">
//                 <p className="text-lg font-medium text-gray-900">Current Greeting:</p>
//                 <p className="text-sm text-gray-500">{greeting}</p>
//               </div>
//             )}

//             <Button
//               variant="secondary"
//               size="sm"
//               onClick={handleSetGreeting}
//               disabled={!contract}
//             >
//               Set Greeting
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConnectWallet;





import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = 0x8e960522FD200A98fe3f969A6BB52D3aA4990108;
const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsImageHash",
				"type": "string"
			}
		],
		"name": "addWalletProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_providerId",
				"type": "uint256"
			}
		],
		"name": "connectWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "providerName",
				"type": "string"
			}
		],
		"name": "WalletConnected",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "providerId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsImageHash",
				"type": "string"
			}
		],
		"name": "WalletProviderAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_providerId",
				"type": "uint256"
			}
		],
		"name": "getWalletProvider",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isConnected",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "providerCount",
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
		"name": "walletProviders",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsImageHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletProviders, setWalletProviders] = useState([]);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    fetchWalletProviders();
  }, []);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed!");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("MetaMask Connection Error:", error);
    }
  };

  const fetchWalletProviders = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    
    const count = await contract.providerCount();
    let providersList = [];

    for (let i = 0; i < count; i++) {
      const [name, ipfsHash] = await contract.getWalletProvider(i);
      providersList.push({ name, imageUrl: `https://ipfs.io/ipfs/${ipfsHash}` });
    }

    setWalletProviders(providersList);
  };

  const handleConnect = async (providerIndex) => {
    if (!walletAddress) {
      await connectMetaMask();
    }
    setConnecting(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
      const tx = await contract.connectWallet(providerIndex);
      await tx.wait();
      alert("Wallet connected successfully!");
    } catch (error) {
      console.error("Connection failed", error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div>
      <h2>Connect your wallet</h2>
      {walletProviders.map((provider, index) => (
        <div key={index}>
          <img src={provider.imageUrl} alt={provider.name} width="50" />
          <button onClick={() => handleConnect(index)}>
            {connecting ? "Connecting..." : `Connect with ${provider.name}`}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConnectWallet;
