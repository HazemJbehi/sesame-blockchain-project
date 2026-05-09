# 🔐 Plateforme Sécurisée de Partage de Documents (Web3, IPFS & SSI)

## 📖 Project Overview
This project is a Decentralized Application (DApp) developed for the **Blockchain Mini-Project (Cloud & Cybersecurity)**. 
It provides a highly secure, tamper-proof environment for sharing sensitive documents using Ethereum Smart Contracts, InterPlanetary File System (IPFS), and Decentralized Identity (SSI).

### 🎯 Key Features Implemented:
- **Simplified SSI & Authentication:** Passwordless login using MetaMask. Users are assigned on-chain roles (Admin, User) tied directly to their wallet addresses.
- **Decentralized Storage:** Documents are uploaded to **IPFS** via Pinata to ensure high availability and zero centralized server reliance.
- **Proof of Integrity:** The frontend generates a `SHA-256` cryptographic hash of the document *before* upload. This hash, along with the IPFS CID, is anchored on the Ethereum blockchain.
- **Access Control:** Smart contract logic ensures only authorized wallet addresses can view or fetch specific documents.

---

## 🛠 Tech Stack
* **Blockchain:** Ethereum (Local Hardhat Node), Solidity, Ethers.js
* **Frontend:** React.js, Vite
* **Decentralized Storage:** IPFS (Pinata API)
* **Wallet / Identity:** MetaMask

---

## 🚀 Installation & Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (Version 20+ LTS).
2. Install the [MetaMask extension](https://metamask.io/) in your browser.

### Step 1: Clone the Repository
```bash
git clone https://github.com/HazemJbehi/sesame-blockchain-project
cd sesame-blockchain-project
````

### Step 2: Start the Local Blockchain
Open a terminal and start the Hardhat local node:
```bash
cd smart-contracts
npm install
npx hardhat node
```
(⚠️ Leave this terminal running in the background!)

### Step 3: Deploy the Smart Contract
Open a second terminal, and deploy the Solidity contract to your local blockchain:
```bash
cd smart-contracts
npx hardhat ignition deploy ./ignition/modules/DocumentRegistry.ts --network localhost
```
Note: The account that deploys the contract (Account #0) automatically receives the Admin role.

### Step 4: Start the React Frontend
Open a third terminal, install the web dependencies, and start the UI:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at: http://localhost:5173

*** 🦊 MetaMask Configuration (Crucial for Testing) ***

To interact with the local blockchain, you must configure MetaMask:
1. Add the Local Network:
  Go to MetaMask Settings > Networks > Add a network manually.
  Network Name: Localhost 8545
  New RPC URL: http://127.0.0.1:8545
  Chain ID: 31337
  Currency Symbol: ETH
2. Import the Admin Account:
  Go to the terminal where npx hardhat node is running.
  Scroll to the top and copy the Private Key for Account #0.
  In MetaMask, click on your accounts dropdown > Import account.
  Paste the private key. You should now have an account with 10,000 fake ETH and the Admin role!

*** 💻 Usage Guide ***
Connect your imported MetaMask wallet to the web application.
Verify that your SSI Role is displayed as Admin.
Select a document (PDF, Image, etc.) and click Upload & Secure.
Approve the transaction in MetaMask to pay the local gas fee.
Click Load Documents to view your accessible files directly from IPFS!
