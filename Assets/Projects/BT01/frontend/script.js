

let web3;
let account;
let contract;


const contractAddress = "0x8D3838b5eE34AA59Bd98Df03F07aF2CA8758C064";
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addEvidence",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
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
				"internalType": "address",
				"name": "addedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "EvidenceAdded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "evidenceCount",
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
		"name": "evidences",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "addedBy",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getEvidence",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "addedBy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct EvidenceChain.Evidence",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEvidenceCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Initialize web3 and contract when page loads
window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    // Optional: detect account changes
    window.ethereum.on('accountsChanged', (accs) => {
      account = accs[0];
      console.log('Account changed:', account);
      updateConnectedUI();
    });

    // Optional: detect chain changes
    window.ethereum.on('chainChanged', (chainId) => {
      console.log('Chain changed:', chainId);
      // you may want to reload page: location.reload();
    });

    // create contract instance (will work after user connects)
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log('Contract instance ready:', contractAddress);

    // If you want to auto-connect if already authorized:
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        account = accounts[0];
        updateConnectedUI();
      }
    } catch (err) {
      console.error('Error getting accounts:', err);
    }
  } else {
    console.warn('No Ethereum provider (MetaMask) found.');
  }
});

// Connect wallet (call from button)
async function connectMetaMask() {
  if (!window.ethereum) return alert('Install MetaMask!');
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log('Connected', account);
    updateConnectedUI();
  } catch (err) {
    console.error('User rejected connection or error:', err);
  }
}

function updateConnectedUI() {
  const el = document.getElementById('status');
  if (el) el.innerText = account ? `Connected: ${account}` : 'Not connected';
}

/* -------------------------
   Functions to interact with contract
   ------------------------- */

/* addEvidence(name, desc, ipfsHash) - sends a transaction */
async function addEvidence(name, desc, ipfsHash) {
  if (!account) return alert('Connect MetaMask first');
  try {
    document.getElementById('output').innerText = 'Submitting transaction...';
    const receipt = await contract.methods.addEvidence(name, desc, ipfsHash)
      .send({ from: account });

    console.log('Tx receipt:', receipt);
    document.getElementById('output').innerText =
      `Evidence added. TxHash: ${receipt.transactionHash}`;
  } catch (err) {
    console.error('addEvidence error:', err);
    document.getElementById('output').innerText = 'Transaction failed: ' + (err.message || err);
  }
}

/* getEvidence(id) - read call */
async function getEvidence(id) {
  try {
    const e = await contract.methods.getEvidence(id).call();
    return e; // return struct object to caller
  } catch (err) {
    console.error('getEvidence error:', err);
    throw err;
  }
}

/* Helper for view evidence UI */
async function viewEvidenceAndShow() {
  const id = document.getElementById('evidenceId').value;
  if (!id) return alert('Enter an evidence ID');
  try {
    const e = await getEvidence(id);
    document.getElementById('result').innerHTML = `
      <p><b>ID:</b> ${e.id}</p>
      <p><b>Name:</b> ${e.name}</p>
      <p><b>Description:</b> ${e.description}</p>
      <p><b>IPFS Hash:</b> ${e.ipfsHash}</p>
      <p><b>Added By:</b> ${e.addedBy}</p>
      <p><b>Timestamp:</b> ${new Date(e.timestamp * 1000).toLocaleString()}</p>
    `;
  } catch (err) {
    document.getElementById('result').innerText = 'Error fetching evidence.';
  }
}

// Expose functions globally so HTML can call them
window.connectMetaMask = connectMetaMask;
window.addEvidence = async function () {
  const name = document.getElementById('name').value;
  const desc = document.getElementById('desc').value;
  const ipfs = document.getElementById('ipfs').value;
  if (!name || !desc || !ipfs) return alert('Fill all fields');
  await addEvidence(name, desc, ipfs);
};
window.viewEvidence = viewEvidenceAndShow;
