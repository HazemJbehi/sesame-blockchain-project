import { useState } from 'react'
import { BrowserProvider, Contract } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI, PINATA_JWT } from './constants'
import './App.css'

function App() {
  const[account, setAccount] = useState(null)
  const [role, setRole] = useState(null)
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("")
  const [documents, setDocuments] = useState([]) // NEW: State to hold documents

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
        const roleNum = Number(userRole) // Fixed bug!
        
        if (roleNum === 0) setRole("Non Registered (No Access)")
        if (roleNum === 1) setRole("User")
        if (roleNum === 2) setRole("Admin")

      } catch (error) {
        console.error("Connection error:", error)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  // 2. Generate Hash for Proof of Integrity
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
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: { Authorization: `Bearer ${PINATA_JWT}` },
        body: formData,
      });
      const ipfsData = await res.json();
      const cid = ipfsData.IpfsHash;

      setStatus(`File on IPFS! Generating Integrity Proof...`)
      const fileHash = await getFileHash(file);

      setStatus("Please confirm the MetaMask transaction...")
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = await contract.uploadDocument(cid, fileHash)
      setStatus("Transaction sent! Waiting for confirmation...")
      await tx.wait() 

      setStatus("Success! Document securely registered on Blockchain.")
      setFile(null)
      fetchMyDocuments() // Refresh the list automatically after upload!

    } catch (error) {
      console.error(error)
      setStatus("Error: " + error.message)
    }
  }

  // 4. NEW: Fetch Documents from Blockchain
  const fetchMyDocuments = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const count = await contract.documentCount()
      let accessibleDocs =[]

      // Loop through all documents to see which ones we have access to
      for (let i = 1; i <= Number(count); i++) {
        try {
          const doc = await contract.getDocument(i)
          accessibleDocs.push({
            id: i,
            cid: doc[0],
            fileHash: doc[1],
            owner: doc[2],
            timestamp: new Date(Number(doc[3]) * 1000).toLocaleString()
          })
        } catch (err) {
          // If contract reverts, it means we don't have access to this ID. Skip it!
        }
      }
      setDocuments(accessibleDocs)
    } catch (error) {
      console.error(error)
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
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={handleUpload} className="upload-btn">Upload & Secure</button>
              <p className="status-text">{status}</p>
            </div>
          )}

          {/* NEW: Document Viewer Section */}
          <div className="card">
            <h3>My Accessible Documents</h3>
            <button onClick={fetchMyDocuments} className="connect-btn" style={{marginBottom: "15px"}}>
              Load Documents
            </button>
            
            {documents.length === 0 ? (
              <p>No documents found or access denied.</p>
            ) : (
              <div className="doc-list">
                {documents.map((doc) => (
                  <div key={doc.id} className="doc-item" style={{border: "1px solid #ccc", padding: "10px", margin: "10px 0"}}>
                    <p><strong>Doc ID:</strong> {doc.id}</p>
                    <p><strong>Date:</strong> {doc.timestamp}</p>
                    <p><strong>Integrity Hash:</strong> {doc.fileHash.substring(0, 16)}...</p>
                    {/* The link to view the file on IPFS! */}
                    <a href={`https://gateway.pinata.cloud/ipfs/${doc.cid}`} target="_blank" rel="noopener noreferrer">
                      <button style={{marginTop: "10px"}}>View Document</button>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App