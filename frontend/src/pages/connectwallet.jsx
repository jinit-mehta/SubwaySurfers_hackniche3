import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { connectWallet, getGreeting, setGreeting } from '../utils/contract'; // Adjust the import path as needed

const ConnectWallet = () => {
  const [connecting, setConnecting] = useState(false);
  const [greeting, setGreetingMessage] = useState('');
  const [contract, setContract] = useState(null);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to connect your wallet.');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }

      const { contract } = await connectWallet();
      setContract(contract);
      const currentGreeting = await getGreeting(contract);
      setGreetingMessage(currentGreeting);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  const handleSetGreeting = async () => {
    if (contract) {
      try {
        await setGreeting(contract, 'Hello, World!');
        const updatedGreeting = await getGreeting(contract);
        setGreetingMessage(updatedGreeting);
      } catch (error) {
        console.error('Error setting greeting:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connect your wallet
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose your preferred wallet to connect to the platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <Button
              variant="primary"
              size="sm"
              disabled={connecting}
              onClick={handleConnect}
            >
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>

            {greeting && (
              <div className="mt-4">
                <p className="text-lg font-medium text-gray-900">Current Greeting:</p>
                <p className="text-sm text-gray-500">{greeting}</p>
              </div>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={handleSetGreeting}
              disabled={!contract}
            >
              Set Greeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;