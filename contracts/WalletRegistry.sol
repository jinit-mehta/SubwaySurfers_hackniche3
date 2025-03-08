// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WalletConnect {
    mapping(address => bool) public connectedWallets;

    event WalletConnected(address indexed user);

    function connectWallet() public {
    if (connectedWallets[msg.sender]) {
        emit WalletConnected(msg.sender);
        return; // Simply emit the event and exit
    }

    connectedWallets[msg.sender] = true;
    emit WalletConnected(msg.sender);
}
    function isWalletConnected(address user) public view returns (bool) {
        return connectedWallets[user];
    }
}