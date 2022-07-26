const airdrop = [{
        inputs: [{
                internalType: "address",
                name: "oracle_",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenContractAddress_",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [{
            internalType: "address",
            name: "oracle_",
            type: "address",
        }, ],
        name: "changeOracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address",
            name: "tokenContractAddress_",
            type: "address",
        }, ],
        name: "changeToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address",
            name: "",
            type: "address",
        }, ],
        name: "receivedClaims",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "tokenContractAddress",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address",
            name: "newOwner",
            type: "address",
        }, ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

module.exports.airdrop = airdrop;