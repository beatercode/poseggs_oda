const stakeAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "stakeIdx",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "boostTokenId",
				"type": "uint256"
			}
		],
		"name": "addBoost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "batchUnstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "batchWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "stakeIdx",
				"type": "uint8"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContractAddress_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "boostNFTContractAddress_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "stakePlan",
				"type": "uint8"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "stakeIdx",
				"type": "uint8"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "boostNFTContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BUSD_TOKEN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "investorAddr_",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "stakeIdx_",
				"type": "uint8"
			}
		],
		"name": "getClaimable",
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "stakeIdx",
				"type": "uint256"
			}
		],
		"name": "getStake",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "stakeTypeIdx",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stakePlan",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "eggPlan",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "eggPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "claimed",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "enum Boosts.BoostType",
						"name": "boostType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "boostTimePercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "boostProfitPercent",
						"type": "uint256"
					}
				],
				"internalType": "struct Boosts.Boost[]",
				"name": "boosts_data",
				"type": "tuple[]"
			},
			{
				"internalType": "uint8",
				"name": "boostsSize",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "lastWithdrawalTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isExpired",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stakeOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "stakeIdx",
				"type": "uint256"
			}
		],
		"name": "getTotalBoostsPercents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "boostTimePercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "boostProfitPercent",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "investorsCount",
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
				"internalType": "address",
				"name": "investorAddr_",
				"type": "address"
			}
		],
		"name": "isInvestor",
		"outputs": [
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
		"inputs": [],
		"name": "nftContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"name": "STAKE_TYPES_DAILY_PERCENTS",
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
		"name": "STAKE_TYPES_TERMS",
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
		"name": "stakes",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "stakeTypeIdx",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stakePlan",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "eggPlan",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "eggPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "claimed",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "boostsSize",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "lastWithdrawalTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isExpired",
				"type": "bool"
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
		"name": "stakeTypes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "dailyPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "term",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports.stakeAbi = stakeAbi;