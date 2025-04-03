import React from 'react';
import { ConnectKitButton } from 'connectkit';

const ConnectWalletBtn = () => {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, address }) => (
                <button
                    onClick={show} // Show the wallet connection modal when clicked
                    className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                    {isConnected ? (
                        <span>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
                    ) : isConnecting ? (
                        <span>Connecting...</span>
                    ) : (
                        <span>Connect Wallet</span>
                    )}
                </button>
            )}
        </ConnectKitButton.Custom>
    );
};

export default ConnectWalletBtn;
