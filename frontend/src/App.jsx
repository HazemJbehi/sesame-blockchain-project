import { useState } from 'react'
import { BrowserProvider, Contract } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI, PINATA_JWT } from './constants'
import './App.css'

function App() {
  const [account, setAccount] = useState(null)
  const[role, setRole] = useState(null)
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("")

  // 1. Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)

        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
        const userRole = await contract.users(address) 
        
        if (userRole === 0n) setRole("Non Registered (No Access)")
        if (userRole === 1n) setRole("User")
        if (userRole === 2n) setRole("Admin")

      } catch (error) {
        console.error("Connection error:", error)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  // 2. Generate a Cryptographic Hash for "Proof of Integrity"
  const getFileHash = async (fileToHash) => {
    const arrayBuffer = await fileToHash.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // 3. Upload to IPFS & Blockchain
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!")
    setStatus("Uploading to IPFS... Please wait.")

    try {
      // A. Upload file to Pinata (IPFS)
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        body: formData,
      });
      const ipfsData = await res.json();
      const cid = ipfsData.IpfsHash;

      setStatus(`File on IPFS! CID: ${cid}. Generating Integrity Proof...`)

      // B. Generate Proof of Integrity (Hash)
      const fileHash = await getFileHash(file);

      // C. Save to Blockchain
      setStatus("Please confirm the MetaMask transaction...")
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // Call our Smart Contract function!
      const tx = await contract.uploadDocument(cid, fileHash)
      setStatus("Transaction sent! Waiting for confirmation...")
      await tx.wait() // Wait for block to be mined

      setStatus("Success! Document securely registered on Blockchain.")
      setFile(null)

    } catch (error) {
      console.error(error)
      setStatus("Error: " + error.message)
    }
  }

  return (
    <div className="App">
      <h1>Decentralized Document Sharing</h1>
      <p>Powered by Ethereum & IPFS</p>

      {!account ? (
        <button onClick={connectWallet} className="connect-btn">Connect MetaMask</button>
      ) : (
        <div className="dashboard">
          <div className="card">
            <h3>Identity (SSI)</h3>
            <p><strong>Wallet:</strong> {account}</p>
            <p><strong>Role:</strong> {role}</p>
          </div>
          
          {role !== "Non Registered (No Access)" && (
            <div className="card">
              <h3>Upload a Document</h3>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} 
              />
              <button onClick={handleUpload} className="upload-btn">
                Upload & Secure
              </button>
              <p className="status-text">{status}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App