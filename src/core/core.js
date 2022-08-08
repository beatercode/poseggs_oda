import { ethers, utils, BigNumber } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from "axios";
import conf from "../../config.json";
import {
    nftAbi
} from "../assets/abi/nftAbi";
import {
    boostAbi
} from "../assets/abi/boostAbi";
import {
    stakeAbi
} from "../assets/abi/stakeAbi";
import {
    erc20
} from "../assets/abi/erc20.js";
import {
    airdrop
} from "../assets/abi/airdropAbi.js";
import {
    keccak256
} from "@ethersproject/keccak256";
import {
    toUtf8Bytes
} from "@ethersproject/strings";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Core {
    constructor(vueContext) {
        this.context = vueContext;
        this.baseURL = conf.BASE_URL;
        this.init();
    }
    async checkAccount(accountType) {
        if (window.ethereum && accountType === "metamask") {
            const connected = window.ethereum
                .request({
                    method: "eth_requestAccounts"
                })
                .then(handleAccountsChanged)
                .then((res) => res)
                .catch((err) => {
                    console.error(err);
                });

            // Note that this event is emitted on page load.
            // If the array of accounts is non-empty, you're already
            // connected.
            window.ethereum.on("accountsChanged", handleAccountsChanged);

            // For now, 'eth_accounts' will continue to always return an array
            function handleAccountsChanged(accounts) {
                if (accounts.length === 0) {
                    return false;
                    // MetaMask is locked or the user has not connected any accounts
                    // alert('Please connect to MetaMask.');
                } else if (accounts.length > 0) {
                    return true;
                }
            }
            return connected;
        }
    }

    async init() {
        if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
            const rpc = {
                // 1: "https://ethnode.cloud/",
            };
            for (let chainId of conf.SUPPORTED_BLOCKCHAINS) {
                const url = conf.NETWORK_PARAMS.find((el) => Number(el.chainId) === Number(chainId))?.params.rpcUrls[0];
                rpc[chainId] = url;
            }

            this.providerInstance = new WalletConnectProvider({
                rpc: rpc,
            });

            if (!this.providerInstance.connected) {
                try {
                    // Create a dialogue
                    await this.providerInstance.enable();
                } catch (error) {
                    if (error.message === "User closed modal") {
                        window.localStorage.removeItem("address");
                        window.localStorage.removeItem("walletconnect");
                        window.localStorage.removeItem("selectedNetwork");
                        window.localStorage.removeItem("selectedWallet");
                    }
                }
            }
            await this.subscribeToEvents();
            const WC_Obj = JSON.parse(window.localStorage.getItem("walletconnect"));
            const blockchain = Number(WC_Obj?.chainId);
            this.primaryPovider = new ethers.providers.Web3Provider(this.providerInstance, "any");

            for (let chainId of conf.SUPPORTED_BLOCKCHAINS) {
                this[`provider_${chainId}`] = new ethers.providers.JsonRpcProvider(`${conf[chainId].NODE}`);
                //TODO initialize ERC20? contract
                this[`poseggNft_${chainId}`] = new ethers.Contract(conf[chainId].NFT_CONTRACT, nftAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`boostNft_${chainId}`] = new ethers.Contract(conf[chainId].BOOST_NFT_CONTRACT, boostAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`stake_${chainId}`] = new ethers.Contract(conf[chainId].STAKE_CONTRACT, stakeAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`BUSD_${chainId}`] = new ethers.Contract(conf[chainId].ERC20_CONTRACT, erc20, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`airdrop_${chainId}`] = new ethers.Contract(conf[chainId].AIRDROP_CONTRACT, airdrop, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );

                if (blockchain === Number(chainId)) {
                    this.provider = this.primaryPovider;
                    this.signer = this.provider.getSigner();
                    this.context.$store.commit("setChainId", chainId);
                    this.currentBlockchain = Number(blockchain);
                    //TODO initialize ERC20?contract
                    this[`poseggNft_${chainId}`] = new ethers.Contract(conf[chainId].NFT_CONTRACT, nftAbi, this.provider).connect(this.signer);
                    this[`boostNft_${chainId}`] = new ethers.Contract(conf[chainId].BOOST_NFT_CONTRACT, boostAbi, this.provider).connect(this.signer);
                    this[`stake_${chainId}`] = new ethers.Contract(conf[chainId].STAKE_CONTRACT, stakeAbi, this.provider).connect(this.signer);
                    this[`BUSD_${chainId}`] = new ethers.Contract(conf[chainId].ERC20_CONTRACT, erc20, this.provider).connect(this.signer);
                    this[`airdrop_${chainId}`] = new ethers.Contract(conf[chainId].AIRDROP_CONTRACT, airdrop, this.provider).connect(this.signer);
                } else {
                    //TODO initialize ERC20? contract
                    this[`poseggNft_${chainId}`].connect(this[`provider_${chainId}`]);
                    this[`boostNft_${chainId}`].connect(this[`provider_${chainId}`]);
                    this[`stake_${chainId}`].connect(this[`provider_${chainId}`]);
                    this[`BUSD_${chainId}`].connect(this[`provider_${chainId}`]);
                    this[`airdrop_${chainId}`].connect(this[`provider_${chainId}`]);
                }
            }

            return true;
        } else if (window.localStorage.getItem("selectedWallet") === "metamask") {
            let blockchain = Number(window.ethereum.chainId);

            this.primaryPovider = new ethers.providers.Web3Provider(window.ethereum, "any");

            for (let chainId of conf.SUPPORTED_BLOCKCHAINS) {
                /*
                this[`provider_${chainId}`] = new ethers.providers.JsonRpcProvider(`${conf[chainId].NODE}`);
                // TODO  Create ERC20? contract instance
                this[`poseggNft_${chainId}`] = new ethers.Contract(conf[chainId].NFT_CONTRACT, nftAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`boostNft_${chainId}`] = new ethers.Contract(conf[chainId].BOOST_NFT_CONTRACT, boostAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`stake_${chainId}`] = new ethers.Contract(conf[chainId].STAKE_CONTRACT, stakeAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`BUSD_${chainId}`] = new ethers.Contract(conf[chainId].ERC20_CONTRACT, erc20, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`airdrop_${chainId}`] = new ethers.Contract(conf[chainId].AIRDROP_CONTRACT, airdrop, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                */
                this[`provider_${chainId}`] = new ethers.providers.JsonRpcProvider(`${conf[chainId].NODE}`);
                // TODO  Create ERC20? contract instance
                this[`poseggNft_${chainId}`] = new ethers.Contract(conf[chainId].NFT_CONTRACT, nftAbi, this[`provider_${chainId}`]).connect(this[`provider_${chainId}`])
                this[`boostNft_${chainId}`] = null//new ethers.Contract(conf[chainId].BOOST_NFT_CONTRACT, boostAbi, this[`provider_${chainId}`]);
                this[`stake_${chainId}`] = null//new ethers.Contract(conf[chainId].STAKE_CONTRACT, stakeAbi, this[`provider_${chainId}`]);
                this[`BUSD_${chainId}`] = new ethers.Contract(conf[chainId].ERC20_CONTRACT, erc20, this[`provider_${chainId}`]);
                this[`airdrop_${chainId}`] = null//new ethers.Contract(conf[chainId].AIRDROP_CONTRACT, airdrop, this[`provider_${chainId}`]);

                if (blockchain === Number(chainId)) {
                    this.provider = this.primaryPovider;
                    this.signer = this.provider.getSigner();
                    this.context.$store.commit("setCurrentBlockchain", Number(chainId));
                    this.currentBlockchain = Number(blockchain);
                    // TODO  Create ERC20? contract instance
                    this[`poseggNft_${chainId}`] = new ethers.Contract(conf[chainId].NFT_CONTRACT, nftAbi, this.provider).connect(this.signer);
                    this[`boostNft_${chainId}`] = new ethers.Contract(conf[chainId].BOOST_NFT_CONTRACT, boostAbi, this.provider).connect(this.signer);
                    this[`stake_${chainId}`] = new ethers.Contract(conf[chainId].STAKE_CONTRACT, stakeAbi, this.provider).connect(this.signer);
                    this[`BUSD_${chainId}`] = new ethers.Contract(conf[chainId].ERC20_CONTRACT, erc20, this.provider).connect(this.signer);
                    this[`airdrop_${chainId}`] = new ethers.Contract(conf[chainId].AIRDROP_CONTRACT, airdrop, this.provider).connect(this.signer);
                } else {
                    // TODO  Create ERC20? contract instance
                    if (this[`poseggNft_${chainId}`]) this[`poseggNft_${chainId}`].connect(this[`provider_${chainId}`]);
                    if (this[`boostNft_${chainId}`]) this[`boostNft_${chainId}`].connect(this[`provider_${chainId}`]);
                    if (this[`stake_${chainId}`]) this[`stake_${chainId}`].connect(this[`provider_${chainId}`]);
                    if (this[`BUSD_${chainId}`]) this[`BUSD_${chainId}`].connect(this[`provider_${chainId}`]);
                    if (this[`airdrop_${chainId}`]) this[`airdrop_${chainId}`].connect(this[`provider_${chainId}`]);
                }
            }

            return true;
        } else if (!window.localStorage.getItem("selectedWallet")) {
            for (let chainId of conf.SUPPORTED_BLOCKCHAINS) {
                this[`provider_${chainId}`] = new ethers.providers.JsonRpcProvider(`${conf[chainId].NODE}`);
                //TODO initialize ERC20? contract
                this[`poseggNft_${chainId}`] = new ethers.Contract(conf[chainId].NFT_CONTRACT, nftAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`boostNft_${chainId}`] = new ethers.Contract(conf[chainId].BOOST_NFT_CONTRACT, boostAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`stake_${chainId}`] = new ethers.Contract(conf[chainId].STAKE_CONTRACT, stakeAbi, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`BUSD_${chainId}`] = new ethers.Contract(conf[chainId].ERC20_CONTRACT, erc20, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
                this[`airdrop_${chainId}`] = new ethers.Contract(conf[chainId].AIRDROP_CONTRACT, airdrop, this[`provider_${chainId}`]).connect(
                    this[`provider_${chainId}`]
                );
            }
            return true;
        }
    }

    async subscribeToEvents() {
        try {
            if (!this.providerInstance) {
                return;
            }

            this.providerInstance.on("accountsChanged", async (accounts) => {
                let currentAccount = window.localStorage.getItem("address");
                // console.log(`connector.on("accountsChanged")`);

                const address = accounts[0];

                if (!currentAccount || address.toLowerCase() !== currentAccount.toLowerCase()) {
                    currentAccount = address;
                    localStorage.setItem("address", currentAccount);

                    // _this.$root.core.setLangForAddress(localStorage.getItem("lang"), localStorage.getItem('address'));
                    location.reload();
                } else if (address.toLowerCase() === currentAccount.toLowerCase()) {
                    this.context.$store.commit("setCurrentAddress", address);
                }
            });
            this.providerInstance.on("chainChanged", async (_chainId) => {
                const currentNetwork = window.localStorage.getItem("selectedNetwork");
                // console.log(`connector.on("accountsChanged")`);

                const network = Number(_chainId);
                window.localStorage.setItem("selectedNetwork", network);
                window.localStorage.removeItem(`${network}_stakeInfoTime`);
                // window.localStorage.removeItem(`${network}_stakesAddr:${_this.currentUserAddress}`);

                window.location.reload();
            });

            this.providerInstance.on("connect", (error, payload) => {
                // console.log(`connector.on("connect")`);

                if (error) {
                    throw error;
                }

                this.onConnect(payload);
            });

            this.providerInstance.on("disconnect", (code, reason) => {
                // console.log(`connector.on("disconnect")`, code, reason);

                this.onDisconnect();
            });

            if (this.providerInstance.connected) {
                const {
                    chainId,
                    accounts
                } = this.providerInstance;

                this.onSessionUpdate(accounts, chainId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    getUserStatsLoop(userAddress, period = 10000) {
        let _this = this;

        let errorCounter = 0;
        setTimeout(async function tick() {
            try {
                const {
                    userCoinBalance,
                    userERC20Balance
                } = await _this.getUserBalance(userAddress);

                // TODO
                const totalRegisterd = ""; // await _this.getTotalRegistered(userAddress);
                // TODO
                const res = { "isUnique": true, "referrer": "" }; // await _this.isRegistered(userAddress);
                // TODO
                const levelDuringRegistration = ""; // await _this.getLevelDuringRegistration(userAddress);
                const userNfts = await _this.getUserNftsInChain(userAddress, _this.currentBlockchain, [
                    conf[_this.currentBlockchain].NFT_CONTRACT,
                    conf[_this.currentBlockchain].BOOST_NFT_CONTRACT,
                ]);
                const userNftsBoosts = await _this.getUserNftsBoostsInChain(userAddress, _this.currentBlockchain, [
                    conf[_this.currentBlockchain].NFT_CONTRACT,
                    conf[_this.currentBlockchain].BOOST_NFT_CONTRACT,
                ]);
                const userStakes = await _this.getUserStakes(userAddress, _this.currentBlockchain);
                const userRefData = await _this.getUserRefStats(userAddress);
                const leaderData = await _this.getLeaderStats(userAddress);

                const isRegistered = !res.isUnique;
                _this.context.$store.commit("setIsRegistered", isRegistered);

                if (isRegistered) {
                    const {
                        leaderLevel
                    } = await _this.getLeaderLevel(userAddress);
                    _this.context.$store.commit("setLeaderLevel", leaderLevel);
                } else {
                    _this.context.$store.commit("setLeaderLevel", 0);
                }
                const referrer = res.referrer;

                if (_this.currentBlockchain === 56 || _this.currentBlockchain === 97) {
                    // TODO
                    const airdropData = "";//await _this.isAmongRegistered(userAddress);
                    _this.context.$store.commit("setAirdropData", airdropData);
                }
                _this.context.$store.commit("setTotalRegistered", totalRegisterd);
                _this.context.$store.commit("setUserReferrer", referrer);
                _this.context.$store.commit("setLevelDuringRegistration", levelDuringRegistration);

                _this.context.$store.commit("setUserCoinBalance", userCoinBalance);
                _this.context.$store.commit("setUserERC20Balance", userERC20Balance);
                let A = userNfts;
                let B = _this.context.$store.getters.getUserNftsData;
                let areDiff = false;
                if (A && B && A.length == B.length) {
                    for (let i = 0; i < A.length && !areDiff; i++) {
                        if (A[i].tokenId != B[i].tokenId) areDiff = true;
                    }
                } else {
                    areDiff = true;
                }
                if (areDiff) _this.context.$store.commit("setUserNftsData", userNfts);
                A = userNftsBoosts;
                B = _this.context.$store.getters.getUserNftsBoostsData;
                areDiff = false;
                if (A && B && A.length == B.length) {
                    for (let i = 0; i < A.length && !areDiff; i++) {
                        if (A[i].tokenId != B[i].tokenId) areDiff = true;
                    }
                } else {
                    areDiff = true;
                }
                if (areDiff) _this.context.$store.commit("setUserNftsBoostsData", userNftsBoosts);

                _this.context.$store.commit("setUserStakes", userStakes);
                _this.context.$store.commit("setUserRefData", userRefData);
                _this.context.$store.commit("setLeaderData", leaderData);

                setTimeout(tick, period);
            } catch (error) {
                console.log(error);
                setTimeout(tick, 300);
                errorCounter = errorCounter + 1;
                if (errorCounter > 3) {
                    setTimeout(tick, 30000);
                }
            }
        }, 300);
    }
    getSiteData(period = 100000) {
        // let _this = this;
        // setTimeout(async function tick() {
        //     try {
        //         _this.context.$store.dispatch("fetchNews");
        //         _this.context.$store.dispatch("fetchLang");
        //         setTimeout(tick, period);
        //     } catch (error) {
        //         console.log(error);
        //         setTimeout(tick, 300);
        //     }
        // }, 300);
    }
    getSiteTexts() {
        let _this = this;

        setTimeout(async function tick() {
            try {
                _this.context.$store.dispatch("fetchNews");
                _this.context.$store.dispatch("fetchLang");
            } catch (error) {
                console.log(error);
                setTimeout(tick, 300);
            }
        }, 300);
    }
    async killSession() {
        await this.providerInstance.disconnect();
    }

    async onDisconnect() {
        window.localStorage.removeItem("address");
        window.localStorage.removeItem("selectedNetwork");
        window.localStorage.removeItem("walletconnect");
        window.location.reload();
    }

    async onSessionUpdate(accounts, chainId) {
        let currentAccount = localStorage.getItem("address");
        const address = accounts[0];
        if (!currentAccount || address.toLowerCase() !== currentAccount.toLowerCase()) {
            currentAccount = address;
            localStorage.setItem("address", currentAccount);
            window.localStorage.setItem("selectedNetwork", Number(chainId));

            // _this.$root.core.setLangForAddress(localStorage.getItem("lang"), localStorage.getItem('address'));
            location.reload();
        } else if (address.toLowerCase() === currentAccount.toLowerCase()) {
            this.currentBlockchain = Number(chainId);
            this.context.$store.commit("setCurrentBlockchain", this.currentBlockchain);
            this.context.$store.commit("setCurrentAddress", address);
        }
    }

    async changeNetwork(blockchain) {
        const selectedWallet = window.localStorage.getItem("selectedWallet");

        const networkObject = conf.NETWORK_PARAMS.find((el) => el.symbol === blockchain);

        const params = [{
            chainId: networkObject.params.chainId,
            chainName: networkObject.params.chainName,
            nativeCurrency: networkObject.params.nativeCurrency,
            rpcUrls: networkObject.params.rpcUrls,
            blockExplorerUrls: networkObject.params.blockExplorerUrls,
        },];
        const switchParams = [{
            chainId: networkObject.params.chainId
        }];

        if (selectedWallet && selectedWallet === "metamask") {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: switchParams,
                    });

                    // const highestId = window.setTimeout(() => {
                    //     for (let i = highestId; i >= 0; i--) {
                    //         // console.log(i);
                    //         window.clearInterval(i);
                    //     }
                    // }, 0);
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902 || switchError?.code?.toString() === "-32603") {
                        try {
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: params,
                            });

                            // const highestId = window.setTimeout(() => {
                            //     for (let i = highestId; i >= 0; i--) {
                            //         // console.log(i);
                            //         window.clearInterval(i);
                            //     }
                            // }, 0);
                        } catch (addError) {
                            console.log(addError);
                        }
                    }

                    // handle other "switch" errors
                }
            } else {
                alert("Please install metamask wallet extension");
            }
        } else if (selectedWallet && selectedWallet === "walletconnect") {
            if (!this.provider) {
                await timer(500);
            }
            try {
                await this.provider.provider.request({
                    method: "wallet_switchEthereumChain",
                    params: switchParams,
                });

                // const highestId = window.setTimeout(() => {
                //     for (let i = highestId; i >= 0; i--) {
                //         // console.log(i);
                //         window.clearInterval(i);
                //     }
                // }, 0);
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902 || switchError?.code?.toString() === "-32603" || switchError.toString().includes("Unrecognized chain")) {
                    try {
                        await this.provider.provider.request({
                            method: "wallet_addEthereumChain",
                            params: params,
                        });

                        // const highestId = window.setTimeout(() => {
                        //     for (let i = highestId; i >= 0; i--) {
                        //         // console.log(i);
                        //         window.clearInterval(i);
                        // }
                        // }, 0);
                    } catch (addError) {
                        console.log(addError);
                    }
                }
                console.log(switchError);

                // handle other "switch" errors
            }
        }
    }

    async signMessage(message) {
        const address = await this.signer.getAddress();
        let signature;
        if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
            signature = await this.provider.send("personal_sign", [ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message)), address.toLowerCase()]);
            return signature;
        } else {
            signature = await this.signer.signMessage(message);

            return signature;
        }
    }

    async getReferrers(userFrom) {
        if (this.currentBlockchain === 97) return ["0x0000000000000000000000000000000000000000"];
        try {
            const res = await this[`poseggNft_${this.currentBlockchain}`].getBuyerReferralsStats(userFrom);

            this.hasDeposit = Number(res[5].toString()) > 0 ? true : false;

            if (this.hasDeposit) {
                return ["0x0000000000000000000000000000000000000000"];
            } else {
                let levelToAddressObj = {};
                if (this.currentBlockchain === 56) {
                    /*
                    const res = await axios.get(`${conf.BASE_URL}/getStructureFor10Levels`, {
                        params: {
                            userFrom: userFrom.toLowerCase(),
                        },
                    });
                    levelToAddressObj = res.data;
                    */
                    levelToAddressObj = {};
                }

                let resultArray = [];
                for (let [level, address] of Object.entries(levelToAddressObj)) {
                    let indexInResultArray = Number(level.toString().replace("-", "") - 1);
                    let addressInResultArray = address;
                    if (addressInResultArray.toLowerCase() === conf.DEFAULT_REFERRER.toLowerCase()) {
                        break;
                    }
                    resultArray[indexInResultArray] = addressInResultArray;
                }
                if (resultArray.length) {
                    return resultArray;
                } else if (window.localStorage.getItem("ref")) {
                    return [window.localStorage.getItem("ref")];
                } else {
                    return ["0x0000000000000000000000000000000000000000"];
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async buyNFT(refs, indexPlan) {
        console.log("REF [" + refs + "] PLAN [" + indexPlan + "]")
        const res = await this[`poseggNft_${this.currentBlockchain}`].mintNft(refs, indexPlan);
        return res;
    }

    async buyLOOTBOX(refs, indexPlan) {
        const res = await this[`poseggNft_${this.currentBlockchain}`].mintLootbox(refs, indexPlan, {
            gasLimit: 400000
        });
        return res;
    }

    async buyBoost(type, level) {
        const res = await this[`boostNft_${this.currentBlockchain}`].buyBoost(type, level);
        return res;
    }

    async addBoost(depositIdx, boostTokenId) {
        const res = await this[`stake_${this.currentBlockchain}`].addBoost(depositIdx, boostTokenId);
        return res;
    }
    // async approvePDT(amount, decimals) {
    //     amount = ethers.utils.parseUnits(`${amount}`, decimals);

    //     const rawTransaction = await this[`BUSD_${this.currentBlockchain}`].approve(this[`boostNft_${this.currentBlockchain}`].address, amount);
    //     return rawTransaction;
    // }

    async claimLeadership() {
        const res = await this[`poseggNft_${this.currentBlockchain}`].claimLeadership();
        return res;
    }

    async claimLeaderBoost() {
        return await this[`poseggNft_${this.currentBlockchain}`].claimBoost();
    }
    async verifySignature(message, signature, address) {
        const signingAddress = ethers.utils.verifyMessage(message, signature);
        return signingAddress.toLowerCase() === address.toLowerCase();
    }

    async transferNft(type, from, id, recipient) {
        if (type === "boost") {
            const res = await this[`boostNft_${this.currentBlockchain}`].transferFrom(from, recipient, id);
            return res;
        } else if (type === "egg") {
            const res = await this[`poseggNft_${this.currentBlockchain}`].transferFrom(from, recipient, id);
            return res;
        }
    }

    async saveToDB(address, message, signature, referrer) {
        try {
            /*
            const res = await axios.post(`${conf.BASE_URL}/register`, {
                sig: signature,
                address: address,
                message: message,
                referrer: referrer,
            });
            */
        } catch (error) {
            console.log(error);
        }
    }

    async isAmongRegistered(address) {
        try {
            try {
                /*
                const res = await axios.get(`${conf.BASE_URL}/isAmongRegistered`, {
                    params: {
                        user: address.toLowerCase(),
                    },
                });
                */
                res.data = false;
                return res.data === false ?
                    {
                        isRegistered: false,
                        amount: 0,
                        isClaimed: false
                    } :
                    {
                        amount: res.data.amount,
                        isRegistered: true,
                        isClaimed: Boolean(res.data.received)
                    };
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateAirdropStatus(userAddress) {
        /*
        const res = await axios.post(`${conf.BASE_URL}/updateAirdropStatus`, {
            address: userAddress,
            //amount: amount,
        });
        return res.data;
        */
        return {};
    }
    async signAmount(userAddress) {
        /*
        const res = await axios.post(`${conf.BASE_URL}/signAmount`, {
            address: userAddress,
            //amount: amount,
        });
        return res.data;
        */
        return {};
    }

    async claimTokens(sig, amount) {
        amount = ethers.utils.parseUnits(amount.toString());
        return await this[`airdrop_${this.currentBlockchain}`].claim(amount, sig);
    }

    async isRegistered(address) {
        try {
            /*
            const res = await axios.get(`${conf.BASE_URL}/checkUser`, {
                params: {
                    user: address.toLowerCase(),
                },
            });
            return res.data;
            */
            return {};
        } catch (error) {
            console.log(error);
        }
    }
    async getLastClaimedLevelByLeader(address) {
        try {
            /*
            const res = await axios.get(`${conf.BASE_URL}/getLeaderLastAcceptedLevel`, {
                params: {
                    leader: address.toLowerCase(),
                    chainId: this.currentBlockchain,
                },
            });
            */
            return 0;
            return res.data.latest_level || 0;
        } catch (error) {
            //console.log(error);
        }
    }

    async getUserNftsInChain(address, chainId) {
        if (chainId != 56 && chainId != 137 && chainId != 97) return;
        const nftContract = this[`poseggNft_${this.currentBlockchain}`];
        let buyersNftIds = [];
        try {
            try {
                buyersNftIds = await nftContract.tokensOfOwner(address);
            } catch (err) { }
        } catch (err) { }
        const buyersNftInfo = [];
        for (let ni of buyersNftIds) {
            let eggPlan = await nftContract.MINTED_EGGS(ni.toNumber());
            let eggPlanId = eggPlan.toNumber();
            let eggInfo = await nftContract.EGGS(eggPlan);
            eggInfo = await this.arrayOfBNtoNumber(eggInfo);
            eggInfo.plan = eggPlan.toNumber();
            eggInfo.name = eggInfo.plan == 0 ? conf.FREE_EGG_DATA.name : conf.EGG_DATA.name[eggPlanId - 1];
            eggInfo.tokenId = ni.toNumber();
            eggInfo.collection = "POSEggs-NFT";
            eggInfo.description = "";
            buyersNftInfo.push(eggInfo);
        }
        return buyersNftInfo;
    }

    async getUserNftsBoostsInChain(address, chainId) {
        if (chainId != 56 && chainId != 137 && chainId != 97) return;
        const nftContract = this[`boostNft_${this.currentBlockchain}`];
        let buyersNftIds = [];
        try {
            try {
                buyersNftIds = await nftContract.tokensOfOwner(address);
            } catch (err) { }
        } catch (err) { }
        const buyersNftInfo = [];
        for (let ni of buyersNftIds) {
            let boostNft = await nftContract.boosts(ni.toNumber());
            let atmMul = boostNft.boostType == 1 ? Number(boostNft.boostTimePercent) : Number(boostNft.boostProfitPercent);
            let boostFinal = {};
            boostFinal.boostType = Number(boostNft.boostType);
            boostFinal.tokenId = Number(ni);
            boostFinal.boostProfitPercent = Number(boostNft.boostProfitPercent) / 100;
            boostFinal.boostTimePercent = Number(boostNft.boostTimePercent) / 100;
            boostFinal.boostLevel = atmMul == 200 ? 0 : atmMul == 500 ? 1 : 2;
            boostFinal.name = "Boost LVL " + (+boostFinal.boostLevel + 1);
            boostFinal.collection = "POSEggs-BOOST";
            boostFinal.description = "";

            /*
            let eggPlanId = eggPlan.toNumber();
            let eggInfo = await nftContract.EGGS(eggPlan);
            eggInfo = await this.arrayOfBNtoNumber(eggInfo);
            eggInfo.name = conf.EGG_DATA.name[eggPlanId - 1];
            eggInfo.plan = eggPlan.toNumber();
            eggInfo.tokenId = ni.toNumber();
            eggInfo.collection = "POSEggs-NFT";
            eggInfo.description = "";
            */
            buyersNftInfo.push(boostFinal);
        }
        return buyersNftInfo;
    }

    async arrayOfBNtoNumber(array) {
        let temp = {};
        temp.price = parseFloat(utils.formatEther(array["price"]));
        temp.base_strength = Number(array["base_strength"]);
        temp.base_healt = Number((array["base_healt"]));
        temp.base_speed = Number((array["base_speed"]));
        temp.base_magic = Number((array["base_magic"]));
        return temp;
    }

    async tokenIdToPlan(id) {
        const nftContract = this[`poseggNft_${this.currentBlockchain}`];
        const buyersNftIds = await nftContract.MINTED_EGGS(id);
        return buyersNftIds.toNumber();
    }

    async stakeRefactorAndAddInfo(address, stake, idx) {
        let temp = {};

        try {
            temp.id = (+1000 + idx);
            temp.user = address;
            temp.event_name = "Staked";
            temp.tokenId = stake["tokenId"].toNumber();

            temp.event_data = {};
            temp.event_data.tokenId = stake["tokenId"].toNumber();
            let eggPlan = await this.tokenIdToPlan(temp.event_data.tokenId);
            temp.event_data.amount = conf["EGG_DATA"].prices[(eggPlan - 1)];
            temp.event_data.investor = address;
            temp.event_data.eventName = "Staked";
            temp.event_data.timestamp = stake["startTime"].toNumber();
            temp.event_data.depositIdx = idx;
            temp.event_data.depositTypeIdx = stake["stakeTypeIdx"];
            temp.event_data.transaction_id = "";

            temp.eggPlan = eggPlan;
            temp.timestamp = stake["startTime"].toNumber();

            temp.boostEvents = [];
            for (let s of stake.boosts_data) {
                if (Number(s.boostProfitPercent) > 0 || Number(s.boostTimePercent) > 0) {
                    temp.boostEvents.push(s);
                }
            }

            temp.boostsSize = stake["boostsSize"];
            temp.isExpired = stake["isExpired"];

            temp.rewardReceived = stake["claimed"];
            temp.lastWithdrawTimestamp = stake["lastWithdrawalTime"].toNumber();
        } catch (err) {
            console.log(err)
        }

        return temp;
    }

    async getBoostMetadata(tokenId) {
        const res = await axios.get(`/getBoostMetadata`, {
            baseURL: conf.BASE_URL,
            params: {
                id: tokenId,
                chainId: this.currentBlockchain,
                nftAddress: conf[this.currentBlockchain].BOOST_NFT_CONTRACT,
            },
        });

        return res.data;
    }
    async checkReferrer(address) {
        try {
            /*
            const res = await axios.get(`${conf.BASE_URL}/checkReferrer`, {
                params: {
                    referrer: address.toLowerCase(),
                },
            });
            return res.data;
            */
           return {};
        } catch (error) {
            console.log(error);
        }
    }
    async getTotalRegistered(address) {
        try {
            /*
            const res = await axios.get(`${conf.BASE_URL}/getTotalRegistered`, {
                params: {
                    referrer: address.toLowerCase(),
                },
            });
            return res.data.referrals_num || 0;
            */ 
            return 0;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserStakes(address, chainId) {
        if (chainId != 56 && chainId != 97 && chainId != 137) return;
        const nftContract = this[`stake_${this.currentBlockchain}`];
        let activeStakes = [];
        let inactiveStakes = [];

        let thersOthersStake = true;
        for (let i = 0; thersOthersStake; i++) {
            try {
                // let tempUserStake = await nftContract.stakes(address, i);
                let tempUserStake = await nftContract.getStake(address, i);
                if (tempUserStake != null) {
                    let userStake = await this.stakeRefactorAndAddInfo(address, tempUserStake, i);
                    activeStakes.push(userStake);
                } else thersOthersStake = false;
            } catch (err) {
                thersOthersStake = false
            }
        }

        return { "activeStakes": activeStakes, "inactiveStakes": inactiveStakes };
    }

    async getUserRefStats(address) {
        if (this.currentBlockchain === 97) return;
        try {
            const res = await this[`poseggNft_${this.currentBlockchain}`].getBuyerReferralsStats(address);
            const buyers = await this[`poseggNft_${this.currentBlockchain}`].buyers(address);
            let referralsNumber = 0;
            for (let i = 0; i < 5; i++) {
                referralsNumber += Number(res[3][i].toString());
            }

            return {
                referrer: res[0],
                bonus: ethers.utils.formatEther(res[1]._hex),
                refs: res[2],
                refsNumber: res[3],
                refLevel: Number(res[4].toString()) + (ethers.utils.formatEther(res[5]._hex) > 0 ? 1 : 0),
                refTurnover: ethers.utils.formatEther(res[5]._hex),
                referralsNumber,
                mayBecomeLeader: buyers[6],
                isLeader: buyers[7],
                totalSpent: ethers.utils.formatEther(buyers[0]._hex),
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getLeaderStats(address) {
        if (this.currentBlockchain === 56) return;
        try {
            const leader = await this[`poseggNft_${this.currentBlockchain}`].findLeader(address);
            if (leader.toLowerCase() === conf[this.currentBlockchain].DEFAULT_REFERRER.toLowerCase()) {
                const res = await this[`poseggNft_${this.currentBlockchain}`].getBuyerReferralsStats(address);
                const latest_level = (await this.getLastClaimedLevelByLeader(address)) || 0;
                let referralsNumber = 0;
                for (let i = 0; i < 5; i++) {
                    referralsNumber += Number(res[3][i].toString());
                }
                const turnover = ethers.utils.formatEther(res[5]._hex);
                let leaderObject;
                let leaderObjectNext;

                for (let i = conf[this.currentBlockchain].LEAD_RULES.length - 1; i > 0; i--) {
                    if (
                        Number(turnover) >= conf[this.currentBlockchain].LEAD_RULES[i].turnover &&
                        referralsNumber >= conf[this.currentBlockchain].LEAD_RULES[i].referrals
                    ) {
                        leaderObject = conf[this.currentBlockchain].LEAD_RULES[i];
                        leaderObjectNext = conf[this.currentBlockchain].LEAD_RULES[i + 1] ?
                            conf[this.currentBlockchain].LEAD_RULES[i + 1] :
                            conf[this.currentBlockchain].LEAD_RULES[i];
                        break;
                    }
                }
                return {
                    isDefRef: true,
                    bonus: ethers.utils.formatEther(res[1]._hex),
                    refs: res[2],
                    refsNumber: res[3],
                    refTurnover: turnover,
                    referralsNumber,
                    leaderLevel: leaderObject?.level || 0,
                    latestBoostAvailable: latest_level,
                    leaderLevelNext: leaderObjectNext?.level ||
                        conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === Number(leaderObject?.level || 0) + 1)?.level,
                    leaderProfitPercNext: leaderObjectNext?.profitPerc ||
                        conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === Number(leaderObject?.level || 0) + 1)?.profitPerc,
                    leaderProfitPerc: leaderObject?.profitPerc || 0,
                    leaderTimePercNext: leaderObjectNext?.timePerc ||
                        conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === Number(leaderObject?.level || 0) + 1)?.timePerc,
                    leaderTimePerc: leaderObject?.timePerc || 0,
                };
            } else if (leader === "0x0000000000000000000000000000000000000000") {
                const latest_level = 0;
                let referralsNumber = 0;

                const turnover = 0;
                let leaderObject;
                let leaderObjectNext;
                return {
                    isDefRef: false,
                    bonus: "0.0",
                    refs: [],
                    refsNumber: 0,
                    refTurnover: turnover,
                    referralsNumber,
                    leaderLevel: 0,
                    latestBoostAvailable: latest_level,
                    leaderLevelNext: leaderObjectNext?.level ||
                        conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === Number(leaderObject?.level || 0) + 1)?.level,
                    leaderProfitPercNext: leaderObjectNext?.profitPerc || 0,
                    leaderProfitPerc: leaderObject?.profitPerc ||
                        conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === Number(leaderObject?.level || 0) + 1)?.profitPerc,
                    leaderTimePercNext: leaderObjectNext?.timePerc || 0,
                    leaderTimePerc: leaderObject?.timePerc ||
                        conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === Number(leaderObject?.level || 0) + 1)?.timePerc,
                };
            } else {
                const res = await this[`poseggNft_${this.currentBlockchain}`].getBuyerReferralsStats(leader);
                const latest_level = (await this.getLastClaimedLevelByLeader(address)) || 0;
                let referralsNumber = 0;
                for (let i = 0; i < 5; i++) {
                    referralsNumber += Number(res[3][i].toString());
                }
                const turnover = ethers.utils.formatEther(res[5]._hex);
                let leaderObject;
                let leaderObjectNext;

                for (let i = conf[this.currentBlockchain].LEAD_RULES.length - 1; i > 0; i--) {
                    if (
                        Number(turnover) >= conf[this.currentBlockchain].LEAD_RULES[i].turnover &&
                        referralsNumber >= conf[this.currentBlockchain].LEAD_RULES[i].referrals
                    ) {
                        leaderObject = conf[this.currentBlockchain].LEAD_RULES[i];
                        leaderObjectNext = conf[this.currentBlockchain].LEAD_RULES[i + 1] ?
                            conf[this.currentBlockchain].LEAD_RULES[i + 1] :
                            conf[this.currentBlockchain].LEAD_RULES[i];
                        break;
                    }
                }
                return {
                    isDefRef: false,
                    bonus: ethers.utils.formatEther(res[1]._hex),
                    refs: res[2],
                    refsNumber: res[3],
                    refTurnover: turnover,
                    referralsNumber,
                    leaderLevel: leaderObject?.level || 0,
                    latestBoostAvailable: latest_level,
                    leaderLevelNext: leaderObjectNext?.level || 0,
                    leaderProfitPercNext: leaderObjectNext?.profitPerc || 0,
                    leaderProfitPerc: leaderObject?.profitPerc || 0,
                    leaderTimePercNext: leaderObjectNext?.timePerc || 0,
                    leaderTimePerc: leaderObject?.timePerc || 0,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getLevelDuringRegistration(address) {
        try {
            /*
            const res = await axios.get(`${conf.BASE_URL}/getLevelDuringRegistration`, {
                params: {
                    user: address.toLowerCase(),
                },
            });
            return res.data.start_level;
            */
            return 0;
        } catch (error) {
            console.log(error);
        }
    }
    async getLeaderLevel(address) {
        try {
            if (Number(this.currentBlockchain) === 56 || Number(this.currentBlockchain) === 97) {
                /*
                const res = await axios.get(`${conf.BASE_URL}/getLeader`, {
                    params: {
                        userFrom: address.toLowerCase(),
                    },
                });
                const resObj = res.data;
                */
                const resObj = {};
                if (Object.keys(resObj).length === 0) {
                    return {
                        address: "0x0000000000000000000000000000000000000000",
                        leaderLevel: 0,
                    };
                }
                let maxValue;
                for (let [_, value] of Object.entries(resObj)) {
                    maxValue = Object.entries(value).sort((x, y) => y[1] - x[1])[0];
                }
                return {
                    address: maxValue[0] || "0x0000000000000000000000000000000000000000",
                    leaderLevel: maxValue[1] || 0,
                };
            } else {
                return {
                    address: "0x0000000000000000000000000000000000000000",
                    leaderLevel: 0,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                address: "0x0000000000000000000000000000000000000000",
                leaderLevel: 0,
            };
        }
    }

    async getUserBalance(address) {
        try {
            const coinBalance = await this.provider.getBalance(address);
            let tokenBalance;
            if (this.currentBlockchain === 56 || this.currentBlockchain === 97) {
                tokenBalance = await this[`BUSD_${this.currentBlockchain}`].balanceOf(address);
                return {
                    userCoinBalance: ethers.utils.formatEther(coinBalance),
                    userERC20Balance: ethers.utils.formatEther(tokenBalance),
                };
            } else {
                return {
                    userCoinBalance: ethers.utils.formatEther(coinBalance),
                    userERC20Balance: "0",
                };
            }
        } catch (error) {
            console.log(error);
        }
    }
    /****************** UPDATE DATA LOOPS ************************/

    /****************** WRITE METHODS ************************/
    async isApprovedForAll(userAddress, type) {
        if (type === "POSDUCK") {
            return await this[`poseggNft_${this.currentBlockchain}`].isApprovedForAll(userAddress, this[`stake_${this.currentBlockchain}`].address);
        } else if (type === "BOOST") {
            return await this[`boostNft_${this.currentBlockchain}`].isApprovedForAll(userAddress, this[`stake_${this.currentBlockchain}`].address);
        }
    }
    async approve(nftToken, userAddress) {
        if (nftToken === "POSDUCK") {
            //sending approve each time approve function is called
            let res = await this.isApprovedForAll(userAddress, nftToken);
            // await this[`poseggNft_${this.currentBlockchain}`].getApproved(id);
            // console.log(res);
            if (!res) {
                res = await this[`poseggNft_${this.currentBlockchain}`].setApprovalForAll(this[`stake_${this.currentBlockchain}`].address, "true");

                return res;
            } else {
                return res;
            }
        } else if (nftToken === "BOOST") {
            let res = await this.isApprovedForAll(userAddress, nftToken);

            if (!res) {
                res = await this[`boostNft_${this.currentBlockchain}`].setApprovalForAll(this[`stake_${this.currentBlockchain}`].address, "true");
                return res;
            } else {
                return res;
            }
        }
    }
    async stake(id, selectedPlan) {
        const res = await this[`stake_${this.currentBlockchain}`].stake(id, selectedPlan);
        return res;
    }
    async Unstake(depositId) {
        const res = await this[`stake_${this.currentBlockchain}`].unstake(depositId);
        return res;
    }
    async Claim(depositId) {
        const res = await this[`stake_${this.currentBlockchain}`].claim(depositId, {
            gasLimit: 6000000
        });
        return res;
    }
    async batchClaim() {
        return await this[`stake_${this.currentBlockchain}`].batchWithdraw({
            gasLimit: 6000000
        });
    }

    /****************** CONTRACT READ METHODS ************************/

    withoutRound(number, roundTo = 2) {
        if (roundTo === 2) {
            if (number.toString().indexOf(".") !== -1) {
                const splittedNumber = number.toString().split(".");
                splittedNumber[1] += "00";
                number = splittedNumber.join(".");

                return number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            } else {
                number = number.toString() + ".00";
                return number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            }
        } else if (roundTo === 4) {
            if (number.toString().indexOf(".") !== -1) {
                const splittedNumber = number.toString().split(".");
                splittedNumber[1] += "00";
                number = splittedNumber.join(".");

                return number.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
            } else {
                number = number.toString() + ".00";
                return number.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
            }
        }
    }
    handleError(error) {
        console.log(error);
        if (error.toString().includes('reason="execution reverted:')) {
            const errorStringStartIndex = error.toString().indexOf('reason="execution reverted:');
            const errorString = error.toString().substr(errorStringStartIndex, 32);
            const errorCode = errorString.substr(errorString.length - 4, 2);
            if (Number(errorCode) !== NaN) {
                this.context.$store.commit("push_notification", {
                    type: "error",
                    typeClass: "error",
                    message: `${conf.ERROR_CODES[errorCode]}`,
                });
                return;
            }
        } else if (error.toString().includes("cannot estimate gas;")) {
            this.context.$store.commit("push_notification", {
                type: "error",
                typeClass: "error",
                message: `Ope, an error occured. Try reloading the page. Please contact the PoSDuck Customer Support if the error persists.`,
            });
            return;
        } else {
            this.context.$store.commit("push_notification", {
                type: "error",
                typeClass: "error",
                message: `${error.data ? (error.data.message ? error.data.message : error.message) : error.message ? error.message : error.error}`,
            });
            return;
        }
    }

    async estimateGas(method, params) {
        if (method === "buy") {
            if (!params.ref || !params.ref.length) {
                params.ref = [conf.DEFAULT_REFERRER];
            }

            let amount = ethers.utils.parseUnits(`${params.amount}`, params.decimals);
            return await this[`poseggNft_${this.currentBlockchain}`].estimateGas[method](params.ref, {
                value: amount._hex
            });
        } else if (method === "claimReward") {
            return await this[`${contractId}`].estimateGas[method](params.stakeId);
        } else if (method === "unstake") {
            return await this[`${contractId}`].estimateGas[method](params.stakeId);
        }
    }
}