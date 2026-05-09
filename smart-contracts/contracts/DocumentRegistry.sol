// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DocumentRegistry {
    // ==========================================
    // 1. Simplified SSI (Decentralized Identity)
    // ==========================================
    enum Role { None, User, Admin }
    mapping(address => Role) public users;

    // ==========================================
    // 2. Document Structure (Metadata & IPFS)
    // ==========================================
    struct Document {
        uint256 id;
        string cid;         // The IPFS Content Identifier
        string fileHash;    // Proof of Integrity (e.g., SHA-256 hash of the file)
        address owner;      // The uploader's MetaMask address
        uint256 timestamp;
    }

    uint256 public documentCount;
    mapping(uint256 => Document) public documents;
    
    // ==========================================
    // 3. Access Control (Who can view what)
    // ==========================================
    // Maps Document ID -> User Address -> Boolean (True if they have access)
    mapping(uint256 => mapping(address => bool)) public documentAccess;

    // Events for "Historique des accès" (Bonus Requirement)
    event DocumentUploaded(uint256 indexed docId, address indexed owner, string cid);
    event AccessGranted(uint256 indexed docId, address indexed owner, address indexed viewer);
    event AccessRevoked(uint256 indexed docId, address indexed owner, address indexed viewer);
    event RoleAssigned(address indexed user, Role role);

    // The person who deploys the contract becomes the first Admin
    constructor() {
        users[msg.sender] = Role.Admin;
        emit RoleAssigned(msg.sender, Role.Admin);
    }

    // Security modifier to check if someone has a role
    modifier onlyRegistered() {
        require(users[msg.sender] != Role.None, "User has no role / not registered");
        _;
    }

    // ==========================================
    // Functions
    // ==========================================

    // Admin can give roles to other MetaMask addresses
    function assignRole(address _user, Role _role) public {
        require(users[msg.sender] == Role.Admin, "Only Admins can assign roles");
        users[_user] = _role;
        emit RoleAssigned(_user, _role);
    }

    // Upload a document's metadata to the blockchain
    function uploadDocument(string memory _cid, string memory _fileHash) public onlyRegistered {
        documentCount++;
        
        documents[documentCount] = Document({
            id: documentCount,
            cid: _cid,
            fileHash: _fileHash,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        // The owner automatically gets access to their own document
        documentAccess[documentCount][msg.sender] = true;

        emit DocumentUploaded(documentCount, msg.sender, _cid);
    }

    // Grant access to another user
    function grantAccess(uint256 _docId, address _user) public {
        require(documents[_docId].owner == msg.sender, "Only owner can grant access");
        documentAccess[_docId][_user] = true;
        emit AccessGranted(_docId, msg.sender, _user);
    }

    // BONUS: Revocation of access rights
    function revokeAccess(uint256 _docId, address _user) public {
        require(documents[_docId].owner == msg.sender, "Only owner can revoke access");
        documentAccess[_docId][_user] = false;
        emit AccessRevoked(_docId, msg.sender, _user);
    }

    // Retrieve a document (Only if the user has access)
    function getDocument(uint256 _docId) public view returns (string memory, string memory, address, uint256) {
        require(documentAccess[_docId][msg.sender] == true, "Access denied: You do not have permission to view this document");
        
        Document memory doc = documents[_docId];
        return (doc.cid, doc.fileHash, doc.owner, doc.timestamp);
    }
}