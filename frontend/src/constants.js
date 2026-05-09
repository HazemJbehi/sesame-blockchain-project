export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Replace this fake one with your REAL Pinata JWT that starts with "eyJ..."
export const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzN2NmNzE3Zi05MWZjLTRkNmQtOTVjNi1lNDRkOWJkZDYzMWMiLCJlbWFpbCI6ImhhemVtamJlaGk0MjBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImE5Mzk5Y2QwOTQ0ZTAyN2FmZjU1Iiwic2NvcGVkS2V5U2VjcmV0IjoiNjJjZmQ5NWM5ZjVlYjlkNDA1OGE0Zjg0MWUyOTY3NDMxNDAzYjZlMGU3ZGZjMzU4NjAxZjg5NGRhOTlmZjY3MyIsImV4cCI6MTgwOTE4Njc4MX0.N9B0TGpcLZaqguA5L3yXX7gXT3fbAKEpy0MwriEPc2M"; 

// Notice how there is only ONE set of brackets [ ] now!
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs":[
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "docId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "viewer",
        "type": "address"
      }
    ],
    "name": "AccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":[
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "docId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "viewer",
        "type": "address"
      }
    ],
    "name": "AccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":[
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "docId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "name": "DocumentUploaded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":[
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum DocumentRegistry.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "RoleAssigned",
    "type": "event"
  },
  {
    "inputs":[
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "enum DocumentRegistry.Role",
        "name": "_role",
        "type": "uint8"
      }
    ],
    "name": "assignRole",
    "outputs":[],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":[
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "documentAccess",
    "outputs":[
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
    "inputs":[],
    "name": "documentCount",
    "outputs":[
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
    "inputs":[
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "documents",
    "outputs":[
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fileHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":[
      {
        "internalType": "uint256",
        "name": "_docId",
        "type": "uint256"
      }
    ],
    "name": "getDocument",
    "outputs":[
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
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
    "inputs":[
      {
        "internalType": "uint256",
        "name": "_docId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "grantAccess",
    "outputs":[],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":[
      {
        "internalType": "uint256",
        "name": "_docId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "revokeAccess",
    "outputs":[],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":[
      {
        "internalType": "string",
        "name": "_cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_fileHash",
        "type": "string"
      }
    ],
    "name": "uploadDocument",
    "outputs":[],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":[
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs":[
      {
        "internalType": "enum DocumentRegistry.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];