const nftAbi = [{
        inputs: [{
                internalType: "string",
                name: "name_",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol_",
                type: "string",
            },
            {
                internalType: "string",
                name: "uri_",
                type: "string",
            },
            {
                internalType: "address",
                name: "boostNFTContractAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "defaultReferrerAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "feeReceiverAddress",
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
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [],
        name: "BOOST_NFT_CONTRACT_ADDRESS",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "DEFAULT_REFERRER",
        outputs: [{
            internalType: "address payable",
            name: "",
            type: "address",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "FEE_RECEIVER",
        outputs: [{
            internalType: "address payable",
            name: "",
            type: "address",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        name: "LEADER_LEVELS_MILESTONES",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        name: "LEADER_LEVELS_USERS_MILESTONES",
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
        name: "REFERRAL_DEPTH",
        outputs: [{
            internalType: "uint8",
            name: "",
            type: "uint8",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        name: "REFERRAL_LEVELS_MILESTONES",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        name: "REFERRAL_LEVELS_PERCENTS",
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
        name: "REFERRAL_TURNOVER_DEPTH",
        outputs: [{
            internalType: "uint8",
            name: "",
            type: "uint8",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address",
            name: "owner",
            type: "address",
        }, ],
        name: "balanceOf",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address[]",
            name: "referrerAddrs_",
            type: "address[]",
        }, ],
        name: "buy",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },

    {
        inputs: [{
            internalType: "address",
            name: "",
            type: "address",
        }, ],
        name: "buyers",
        outputs: [{
                internalType: "uint256",
                name: "totalSpent",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "referrer",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "bonus",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "refLevel",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "refTurnover",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "leaderLevel",
                type: "uint8",
            },
            {
                internalType: "bool",
                name: "mayBecomeLeader",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "isLeader",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "string",
            name: "newURI",
            type: "string",
        }, ],
        name: "changeBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "claimBoost",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "claimLeadership",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool",
        }, ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address",
            name: "attractedAddr",
            type: "address",
        }, ],
        name: "findLeader",
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
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
        }, ],
        name: "getApproved",
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
            name: "buyerAddr",
            type: "address",
        }, ],
        name: "getBuyerReferralsStats",
        outputs: [{
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256[10]",
                name: "",
                type: "uint256[10]",
            },
            {
                internalType: "uint256[10]",
                name: "",
                type: "uint256[10]",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
        }, ],
        name: "getPrice",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address",
            name: "leaderAddr",
            type: "address",
        }, ],
        name: "getTotalAttractedUsers",
        outputs: [{
            internalType: "uint256",
            name: "usersCount",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "mainContractAddress",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nftOwnersCount",
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
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
        }, ],
        name: "ownerOf",
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
            name: "buyerAddr",
            type: "address",
        }, ],
        name: "referrals",
        outputs: [{
            internalType: "address[]",
            name: "",
            type: "address[]",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
            internalType: "address",
            name: "contractAddress",
            type: "address",
        }, ],
        name: "setMainContractAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
        }, ],
        name: "supportsInterface",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
        }, ],
        name: "tokenURI",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSpent",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },

    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "stakeIdx",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "boostTokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "BoostApplied",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "referrer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "NFTBought",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "enum Boosts.BoostType",
                name: "boostType",
                type: "uint8",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "currency",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timePercent",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "profitPercent",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "NewBoost",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint8",
                name: "leaderLevel",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "NewLeader",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "referrer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "referral",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "level",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "ReferralBonusReceived",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "investor",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint8",
                name: "stakeTypeIdx",
                type: "uint8",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "stakeIdx",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "Staked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "investor",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint8",
                name: "stakeTypeIdx",
                type: "uint8",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "stakeIdx",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "Unstaked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "investor",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint8",
                name: "stakeTypeIdx",
                type: "uint8",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "stakeIdx",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "reward",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "Withdrawn",
        type: "event",
    },
];

module.exports.nftAbi = nftAbi;