<template>
    <div class="main-dashboard">
        <connect-wallet
            :showWalletOptions="showWalletOptions"
            @close="(showWalletOptions = false), (noWallet = false), (showProceedToMetamaskModal = false)"
            @setWalletAndAddress="setWalletOption(getWalletOption())"
            :showProceedToMetamaskModal="showProceedToMetamaskModal"
            :noWallet="noWallet"
        />
        <TabBar />
        <SideBar />
        <router-view @changeWalletRequest="setWalletOption(getWalletOption()), (showWalletOptions = true)" />
    </div>
</template>
<script>
    import MultiLang from "@/core/multilang";
    import ConnectWallet from "@/components/ModalWindows/ConnectWallet.vue";
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    import Core from "../../src/core/core.js";

    import config from "../../config.json";
    import TabBar from "@/components/TabBar.vue";
    import SideBar from "@/components/SideBar.vue";
    export default {
        name: "Dashboard",
        components: {
            TabBar,
            SideBar,
            ConnectWallet,
        },
        data() {
            return {
                showWalletOptions: false,
                noWallet: false,
                showProceedToMetamaskModal: false,
                currentAccount: "0x0000000000000000000000000000000000000000",
                showNews: false,
                lang: new MultiLang(this),
            };
        },
        methods: {
            translatesGet(key) {
                try {
                    const translations = JSON.parse(window.localStorage.getItem("interfaceTranslations"));
                    const res = translations.lang.find((el) => el.hasOwnProperty(`${key}`));
                    return res[key];
                } catch (ex) {
                    // console.log(ex);
                    return this.lang.get(key);
                }
            },
            checkWalletOption(wallet) {
                let _this = this;
                if (wallet === "metamask") {
                    window.ethereum
                        .request({ method: "eth_accounts" })
                        .then(handleAccountsChanged)
                        .catch((err) => {
                            localStorage.removeItem("address");
                        });
                    window.ethereum.on("accountsChanged", handleAccountsChanged);
                    function handleAccountsChanged(accounts) {
                        if (accounts.length > 0) {
                            _this.walletUnlocked = true;
                        }
                    }
                }
            },
            setWalletOption(wallet) {
                let _this = this;
                this.selectedWallet = wallet;
                if (wallet) {
                    localStorage.setItem("selectedWallet", wallet);
                }
                if (window.ethereum && this.selectedWallet === "metamask") {
                    window.ethereum
                        .request({ method: "eth_requestAccounts" })
                        .then(handleAccountsChanged)
                        .catch((err) => {
                            console.log(err);
                            localStorage.removeItem("address");
                        });
                    // Note that this event is emitted on page load.
                    // If the array of accounts is non-empty, you're already
                    // connected.
                    window.ethereum.on("accountsChanged", handleAccountsChanged);
                    // For now, 'eth_accounts' will continue to always return an array
                    function handleAccountsChanged(accounts) {
                        let currentAccount = localStorage.getItem("address");
                        if (accounts.length === 0) {
                            _this.walletUnlocked = false;
                            localStorage.removeItem("address");
                            _this.$store.commit("setCurrentAddress", "");
                            // MetaMask is locked or the user has not connected any accounts
                            // alert('Please connect to MetaMask.');
                        } else if (accounts[0] !== currentAccount) {
                            currentAccount = accounts[0];
                            localStorage.setItem("address", currentAccount);
                            // _this.$root.core.setLangForAddress(localStorage.getItem("lang"), localStorage.getItem('address'));
                            location.reload();
                        } else if (accounts.length > 0) {
                            _this.walletUnlocked = true;
                        }
                    }
                } else if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
                    if (!this.$root.core) {
                    } else {
                        this.$root.core.init();
                    }
                } else {
                    _this.noWallet = true;
                }
            },
            getWalletOption() {
                const selWallet = localStorage.getItem("selectedWallet");
                if (!selWallet) {
                    this.showWalletOptions = true;
                    return null;
                } else {
                    return selWallet;
                }
            },
            async changeNetwork(blockchain) {
                const selectedWallet = window.localStorage.getItem("selectedWallet");
                const networkObject = config.NETWORK_PARAMS.find((el) => el.symbol === blockchain);
                const params = [
                    {
                        chainId: networkObject.params.chainId,
                        chainName: networkObject.params.chainName,
                        nativeCurrency: networkObject.params.nativeCurrency,
                        rpcUrls: networkObject.params.rpcUrls,
                        blockExplorerUrls: networkObject.params.blockExplorerUrls,
                    },
                ];
                const switchParams = [{ chainId: networkObject.params.chainId }];
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
                            console.log("chain changed");
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
            },
        },
        computed: {},
        mounted() {
            this.lang.init();

            let connectAttemptsCounter = 0;
            let _this = this;
            const walletOpiton = _this.getWalletOption();
            setTimeout(async function initContract() {
                try {
                    // _this.$root.core = new Core(_this, )
                    if (walletOpiton) {
                        if (walletOpiton === "metamask" && !window.ethereum) {
                            throw Error("No Metamask extension found");
                        }
                        if (window.localStorage.getItem("selectedWallet") === "metamask") {
                            //won't commit address without these checks
                            if (window.ethereum) {
                                window.ethereum.on("chainChanged", async (_chainId) => {
                                    _chainId = Number(_chainId);
                                    if (config.SUPPORTED_BLOCKCHAINS.indexOf(_chainId) < 0) {
                                        alert(
                                            `${
                                                config.BLOCKCHAINS[_chainId] ? config.BLOCKCHAINS[_chainId] : "Current chain"
                                            }  is not suppoted. Please accept switching to ${config.PRIMARY_BLOCKCHAIN.name}`
                                        );
                                        await _this.$root.core.changeNetwork(config.PRIMARY_BLOCKCHAIN.symbol);
                                        window.localStorage.reload();
                                        return;
                                    }
                                    console.log("heared that chain changed");
                                    await timer(1000);
                                    window.location.reload();
                                    //TODO: START LOOP
                                });
                                window.ethereum.on("isConnected", () => window.location.reload());
                            }
                            if (!window.ethereum.chainId) {
                                throw new Error("no chainId");
                            }
                            if (config.SUPPORTED_BLOCKCHAINS.indexOf(Number(window.ethereum.chainId)) < 0) {
                                alert(`Change your wallet extension to ${config.PRIMARY_BLOCKCHAIN.name}`);
                                await _this.changeNetwork(config.PRIMARY_BLOCKCHAIN.symbol);
                            }
                            let currentAccount = localStorage.getItem("address");
                            _this.currentAccount = currentAccount;
                            _this.$store.commit("setCurrentAddress", currentAccount);
                            _this.setWalletOption(_this.getWalletOption());
                            _this.$root.core = new Core(_this);

                            if (_this.$root.core === undefined) {
                                throw Error();
                            }
                            if (currentAccount) {
                                _this.$root.core.getUserStatsLoop(currentAccount);
                                _this.$root.core.getSiteTexts();
                                //TODO: START LOOP
                            } else {
                                _this.$root.core.getSiteTexts();
                                //TODO: START LOOP
                            }
                        } else if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
                            const WC_Obj = JSON.parse(window.localStorage.getItem("walletconnect"));
                            let currentAccount = localStorage.getItem("address");
                            _this.currentAccount = currentAccount;
                            _this.$store.commit("setCurrentAddress", currentAccount);
                            _this.setWalletOption(_this.getWalletOption());
                            _this.$root.core = new Core(_this);
                            console.log("core init");
                            if (_this.$root.core === undefined) {
                                throw Error();
                            } else {
                                _this.$root.core.providerInstance.on("chainChanged", async (_chainId) => {
                                    _chainId = Number(_chainId);
                                    if (config.SUPPORTED_BLOCKCHAINS.indexOf(_chainId) < 0) {
                                        alert(
                                            `${
                                                config.BLOCKCHAINS[_chainId] ? config.BLOCKCHAINS[_chainId] : "Current chain"
                                            }  is not suppoted. Please accept switching to ${config.PRIMARY_BLOCKCHAIN.name}`
                                        );
                                        await _this.$root.core.changeNetwork(config.PRIMARY_BLOCKCHAIN.symbol);
                                        return;
                                    }
                                    window.location.reload();
                                    //TODO: START LOOP
                                });
                                _this.$root.core.providerInstance.on("disconnect", (code, reason) => {
                                    console.log(`connector.on("disconnect")`, code, reason);
                                    _this.$root.core.onDisconnect();
                                });
                            }
                            console.log("SECOND");
                            console.log(config.SUPPORTED_BLOCKCHAINS.indexOf(Number(WC_Obj.chainId)));
                            console.log(Number(WC_Obj.chainId));
                            if (config.SUPPORTED_BLOCKCHAINS.indexOf(Number(WC_Obj.chainId)) < 0) {
                                alert("Change your wallet extension to Binance Smart Chain network");
                                await _this.$root.core.changeNetwork(config.PRIMARY_BLOCKCHAIN.symbol);
                            }
                            if (currentAccount) {
                                //TODO: START LOOP
                                _this.$root.core.getUserStatsLoop(_this.currentAccount);
                                _this.$root.core.getSiteTexts();
                            } else {
                                //TODO: START LOOP
                                _this.$root.core.getSiteTexts();
                            }
                            // _this.showWalletOptions = true;
                        } else {
                            _this.noWallet = true;
                            _this.$root.core = new Core(_this);
                            _this.$root.core.getSiteTexts();
                            //TODO: START LOOP
                        }
                    } else {
                        _this.$root.core = new Core(_this);
                        _this.$root.core.getSiteTexts();
                        //TODO: START LOOP
                    }
                } catch (ex) {
                    console.log(ex);
                    if (ex.message === "no chainId") {
                        setTimeout(initContract, 300);
                        return;
                    }
                    connectAttemptsCounter++;
                    if (connectAttemptsCounter > 5 && ex.message == "No Metamask extension found") {
                        _this.noWallet = true;
                        _this.$root.core = new Core(_this);
                        _this.$root.core.getSiteTexts();
                        return;
                    }
                }
            }, 400);
            window.scrollTo(0, 0);
        },
        watch: {
            walletUnlocked: function () {
                let _this = this;
                setTimeout(function check() {
                    if (_this.walletUnlocked === false) {
                        _this.checkWalletOption(_this.selectedWallet);
                        setTimeout(check, 1000);
                        return;
                    } else if (_this.walletUnlocked === true) {
                    }
                }, 0);
            },
        },
    };
</script>
