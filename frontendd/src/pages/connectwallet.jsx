import { useState } from 'react';
import { Button } from '../components/ui/Button';

const ConnectWallet = () => {
  const [connecting, setConnecting] = useState(false);

  const walletProviders = [
    {
      name: "NEAR Wallet",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "Connect using NEAR Wallet",
      recommended: true
    },
    {
      name: "MyNearWallet",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      description: "Connect using MyNearWallet"
    },
    {
      name: "Sender Wallet",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "Connect using Sender"
    }
  ];

  const handleConnect = (providerName) => {
    setConnecting(true);
    // Wallet connection logic would go here
    setTimeout(() => {
      setConnecting(false);
    }, 2000);
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
            {walletProviders.map((provider, index) => (
              <div
                key={index}
                className="relative border rounded-lg p-4 hover:border-blue-500 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-gray-700">
                      {provider.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {provider.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={connecting}
                    onClick={() => handleConnect(provider.name)}
                  >
                    {connecting ? 'Connecting...' : 'Connect'}
                  </Button>
                </div>
                {provider.recommended && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Security Notice */}
          <div className="mt-8 border-t pt-6">
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-blue-800">
                    Security Notice
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      By connecting your wallet, you agree to our Terms of Service and Privacy Policy. 
                      Never share your private keys or seed phrases with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Link */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Need help connecting your wallet?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;