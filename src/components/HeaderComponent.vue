<template>
    <header>
        <router-link to="/" class="btn btn-header-back" :class="{ 'hidden-link': showProfile }">
            <div class="icon-wrap">
                <i class="icon-arrow-left"></i>
            </div>
            <span>{{ translatesGet("BACK") }}</span>
        </router-link>
        <div class="header-nav">
            <router-link to="/" class="logo logo-xs"></router-link>

            <div
                v-if="currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000'"
                class="notif-wrap"
                @mouseover="showNotif = true"
                @mouseout="showNotif = false"
                @click="(showMobNotif = !showMobNotif), (showProfile = false)"
                :class="{ 'notif-active': showNotif, 'notif-mob-active': showMobNotif }"
            >
                <button class="btn btn-notif-main" :class="{ 'btn-notif-active': hasNewsToRead }">
                    <i class="icon-notification"></i>
                </button>
                <div class="notifications">
                    <div class="list-notif">
                        <div class="msg" :class="{ 'msg-new': !item.seen }" v-for="item in news" :key="item.id" @click="openNews(item)">
                            <div class="msg-header">
                                <div class="msg-title">{{ shortenText(item.title, 22) }}</div>
                                <div class="msg-date">{{ item.date }}</div>
                            </div>
                            <div class="msg-content" v-html="shortenText(item.desc, 70)"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="getSelectedWallet"
                class="network-wrap"
                @mouseover="showNetwork = true"
                @mouseout="showNetwork = false"
                @click="showMobNetwork = !showMobNetwork"
                :class="{ 'network-active': showNetwork, 'network-mob-active': showMobNetwork }"
            >
                <button class="btn btn-network-main">
                    <div class="btn-network-wrap">
                        <div class="network-title">
                            {{ translatesGet("SWITCH_NET") }}
                        </div>
                        <span>{{ getBlockchainName[0] }}</span>
                    </div>
                    <i class="icon-current-network" :class="getBlockchainName[1]"></i>
                </button>
                <div class="networks">
                    <div class="list-networks">
                        <div @click="changeNetwork('avax')" class="network-item" :class="{ active: getBlockchainName[0] === 'Avalanche Network' }">
                            <i class="icon-network icon-avalanche"></i>
                            <span>Avalanche</span>
                        </div>
                        <div @click="changeNetwork('avaxtest')" class="network-item" :class="{ active: getBlockchainName[0] === 'Avalanche Fuji' }">
                            <i class="icon-network icon-avalanche"></i>
                            <span>Avalanche Fuji</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="balance-wrap"
                v-if="currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000' && supportedChain"
                @mouseover="showBalanceDropDown = true"
                @mouseout="showBalanceDropDown = false"
                :class="{ 'balance-active': showBalanceDropDown, 'balance-mob-active': showMobBalanceDropDown }"
            >
                <button @click="showMobBalanceDropDown = !showMobBalanceDropDown" class="header-balance">
                    <div class="btn-balance-wrap">
                        <div class="balance-title">{{ translatesGet("BALANCE") }}</div>
                        <div :class="{ active: !hideBalance }" class="balance">
                            <div v-if="currentBlockchain && currentBlockchain === 43114 || currentBlockchain === 43113">{{ Number(userERC20Balance).toFixed(2) }} USDC</div>
                            <div>{{ Number(userCoinBalance).toFixed(3) }} {{ currency }}</div>
                        </div>
                        <div :class="{ active: hideBalance }" class="balance">
                            <div v-if="currentBlockchain && currentBlockchain === 43114 || currentBlockchain === 43113">*** USDC</div>
                            <div>*** {{ currency }}</div>
                        </div>
                    </div>
                    <div class="balance-icon icon-wrap" @click="changeButtonVisibility()">
                        <i v-if="!hideBalance" class="icon-eye-slash"></i>
                        <i v-else class="icon-eye"></i>
                    </div>
                </button>
                <div class="drop-down">
                    <div class="list-drop-down">
                        <button @click="addTokenToMetaMask()" class="drop-down-item">
                            <span>{{ translatesGet("BTN_CLAIM_METAMASK") }}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000'">
                <button @click="$emit('changeWalletRequest')" class="btn btn-address">
                    <div class="icon-wrap">
                        <i :class="getSelectedWallet"></i>
                    </div>
                    <span>{{ addressShort }}</span>
                </button>
                <button v-if="!showProfile" @click="(showProfile = true), (showMobNotif = false)" class="btn btn-profile">
                    <span>{{ translatesGet("MY_PROFILE") }}</span>
                </button>
                <button v-else @click="showProfile = false" class="btn-mobile-menu close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div v-else>
                <button @click="$emit('changeWalletRequest')" class="btn btn-connect">
                    {{ translatesGet("CONNECT_WALLET") }}
                </button>
            </div>
        </div>
        <div v-if="showProfile" class="profile-wrap">
            <div class="profile-block">
                <div class="profile-section">
                    <div class="container">
                        <button @click="$emit('changeWalletRequest'), (showProfile = false)" class="btn btn-address mob-btn">
                            <div class="icon-wrap">
                                <i :class="getSelectedWallet"></i>
                            </div>
                            <span>{{ addressShort }}</span>
                        </button>
                    </div>
                </div>
                <div class="profile-section" v-if="currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000' && supportedChain">
                    <div class="container">
                        <div @click="hideBalance = !hideBalance" class="btn-balance-wrap">
                            <div class="balance-title">{{ translatesGet("BALANCE") }}</div>
                            <button :class="{ active: !hideBalance }" class="balance">
                                <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97">{{ Number(userERC20Balance).toFixed(2) }} USDC</div>
                                <div>{{ Number(userCoinBalance).toFixed(3) }} {{ currency }}</div>
                                <div class="balance-icon icon-wrap">
                                    <i class="icon-eye-slash"></i>
                                </div>
                            </button>
                            <button :class="{ active: hideBalance }" class="balance">
                                <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97">*** USDC</div>
                                <div>*** USDC</div>
                                <div class="balance-icon icon-wrap">
                                    <i class="icon-eye"></i>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="profile-section" v-if="currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000' && supportedChain">
                    <div class="container">
                        <button @click="addTokenToMetaMask()" class="btn btn-get-pdt">
                            {{ translatesGet("BTN_CLAIM_METAMASK") }}
                        </button>
                    </div>
                </div>
                <div class="profile-section">
                    <div class="container">
                        <div class="network-title">
                            {{ translatesGet("SWITCH_NET") }}
                        </div>
                        <div class="networks">
                            <div class="list-networks">
                                <div
                                    @click="changeNetwork('avax'), (showProfile = false), (hideBalance = false)"
                                    class="network-item"
                                    :class="{ active: getBlockchainName[0] === 'Avalanche Network' }"
                                >
                                    <i class="icon-network icon-avalanche"></i>
                                    <span>Avalance Network</span>
                                </div>
                                <div
                                    @click="changeNetwork('avaxtest'), (showProfile = false), (hideBalance = false)"
                                    class="network-item"
                                    :class="{ active: getBlockchainName[0] === 'Avalanche Fuji Testnet' }"
                                >
                                    <i class="icon-network icon-avalanche"></i>
                                    <span>Avalance Fuji Testet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile-section profile-disconnect">
                    <div class="container">
                        <button class="btn btn-disconnect mob-btn" @click="disconnect(), (showProfile = false)">
                            <span class="icon-wrap"> <i class="icon icon-logout"></i> </span>
                            <span class="name">{{ translatesGet("DISCONNECT") }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapState } from "vuex";
    import MultiLang from "@/core/multilang";
    import conf from "../../config.json";
    export default {
        props: ["news"],
        data() {
            return {
                hideBalance: false,
                lang: new MultiLang(this),
                showNotif: false,
                showMobNotif: false,
                showNetwork: false,
                showMobNetwork: false,
                showProfile: false,
                showBalanceDropDown: false,
                showMobBalanceDropDown: false,
            };
        },
        mounted() {
            this.lang.init();
            const hideBalance = window.localStorage.getItem("hideBalance");

            if (hideBalance === "true") {
                this.hideBalance = true;
            } else if (hideBalance === "false") {
                this.hideBalance = false;
            }
        },
        computed: {
            ...mapState(["currentAddress", "userCoinBalance", "userERC20Balance", "currentBlockchain", "currency"]),
            
            addressShort() {
                if (this.currentAddress) {
                    return this.currentAddress.slice(0, 5) + "..." + this.currentAddress.slice(this.currentAddress.length - 3, this.currentAddress.length);
                }
            },
            getSelectedWallet() {
                if (this.currentAddress !== "0x0000000000000000000000000000000000000000" && window.localStorage.getItem("selectedWallet") === "metamask") {
                    return "icon-metamask";
                } else if (
                    this.currentAddress !== "0x0000000000000000000000000000000000000000" &&
                    window.localStorage.getItem("selectedWallet") === "walletconnect"
                ) {
                    return "icon-wallet-connect";
                }
            },
            hasNewsToRead() {
                return this.news && this.news.filter((el) => el.seen === false).length > 0 ? true : false;
            },
            supportedChain() {
                const selectedWallet = window.localStorage.getItem("selectedWallet");
                if (selectedWallet === "metamask" && window?.ethereum?.chainId) {
                    return Boolean(conf.SUPPORTED_BLOCKCHAINS.find((el) => el === Number(window?.ethereum?.chainId)));
                } else if (selectedWallet === "walletconnect") {
                    const WC_Obj = JSON.parse(window.localStorage.getItem("walletconnect"));
                    return Boolean(conf.SUPPORTED_BLOCKCHAINS.find((el) => el === Number(WC_Obj?.chainId)));
                }
                return false;
            },
            getBlockchainName() {
                const selectedWallet = window.localStorage.getItem("selectedWallet");
                if (selectedWallet === "metamask" && window?.ethereum?.chainId) {
                    let iconName =
                        Number(window?.ethereum?.chainId) === 56 || Number(window?.ethereum?.chainId) === 97
                            ? "icon-bsc"
                            : Number(window?.ethereum?.chainId) < 5
                            ? "icon-eth"
                            : Number(window?.ethereum?.chainId) === 43114 || Number(window?.ethereum?.chainId) === 43113
                            ? "icon-avalanche"
                            : Number(window?.ethereum?.chainId) === 137 || Number(window?.ethereum?.chainId) === 80001
                            ? "icon-matic"
                            : Number(window?.ethereum?.chainId) === 1666700000 || Number(window?.ethereum?.chainId) === 1666600000
                            ? "icon-harmony"
                            : "";
                    const name =
                        Number(window?.ethereum?.chainId) === 43114 ? "Avalanche Network" : Number(window?.ethereum?.chainId) === 43113 ? "Avalanche Fuji" : "Wrong Network";
                    return [name, iconName];
                } else if (selectedWallet === "walletconnect") {
                    const WC_Obj = JSON.parse(window.localStorage.getItem("walletconnect"));
                    let iconName =
                        Number(WC_Obj?.chainId) === 56 || Number(WC_Obj?.chainId) === 97
                            ? "icon-bsc"
                            : Number(WC_Obj?.chainId) < 5
                            ? "icon-eth"
                            : Number(WC_Obj?.chainId) === 43114 || Number(WC_Obj?.chainId) === 43113
                            ? "icon-avalanche"
                            : Number(WC_Obj?.chainId) === 137 || Number(WC_Obj?.chainId) === 80001
                            ? "icon-matic"
                            : Number(WC_Obj?.chainId) === 1666700000 || Number(WC_Obj?.chainId) === 1666600000
                            ? "icon-harmony"
                            : "";
                    const name = WC_Obj?.chainId === 43114 ? "Avalanche Netowork" : Number(window?.ethereum?.chainId) === 43113 ? "Avalance Fuji Testnet" : "Wrong Network";
                    return [name, iconName];
                }
                return [conf.BLOCKCHAINS[43114], "icon-avalanche"];
            },
        },
        methods: {
            async changeNetwork(symbol) {
                if (symbol === "avax") {
                    if (this.currentBlockchain === 43114) {
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: "Avalanche already selected",
                        });
                        return;
                    } else {
                        await this.$root.core.changeNetwork("avax");
                    }
                } else if (symbol === "avaxtest") {
                    if (this.currentBlockchain === 43113) {
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: "Avalanche Fuji Testnet already selected",
                        });
                        return;
                    } else {
                        await this.$root.core.changeNetwork("avaxtest");
                    }
                }
            },

            async addTokenToMetaMask() {
                const token = {
                    address: conf[this.currentBlockchain].ERC20_CONTRACT,
                    tag: "USDC",
                    decimals: 18,
                    image: "https://assets.coingecko.com/coins/images/9576/small/USDC.png",
                };
                if (window.ethereum && localStorage.getItem("selectedWallet") === "metamask") {
                    try {
                        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
                        await window.ethereum.request({
                            method: "wallet_watchAsset",
                            params: {
                                type: "ERC20",
                                options: {
                                    address: token.address,
                                    symbol: token.tag,
                                    decimals: token.decimals || 18, // The number of decimals in the token
                                    image: `https://assets.coingecko.com/coins/images/9576/small/USDC.png`, // A string url of the token logo
                                },
                            },
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
                    try {
                        await this.$root.core.provider.provider.request({
                            method: "wallet_watchAsset",
                            params: {
                                type: "ERC20",
                                options: {
                                    address: token.address,
                                    symbol: token.tag,
                                    decimals: token.decimals || 18, // The number of decimals in the token
                                    image: `https://assets.coingecko.com/coins/images/9576/small/USDC.png`, // A string url of the token logo
                                },
                            },
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            async disconnect() {
                const selectedWallet = window.localStorage.getItem("selectedWallet");

                if (selectedWallet === "metamask") {
                    localStorage.removeItem("address");
                    localStorage.removeItem("selectedWallet");
                    localStorage.removeItem("hideBalance");
                    location.reload();
                } else if (selectedWallet === "walletconnect") {
                    localStorage.removeItem("hideBalance");
                    await this.$root.core.killSession();
                }
            },

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
            changeButtonVisibility() {
                this.hideBalance = !this.hideBalance;
                window.localStorage.setItem("hideBalance", this.hideBalance);
            },
            openNews(article) {
                this.$emit("openNews", article);
            },
            shortenText(text, symbols) {
                //regex rule to get an object of a anchor in text;
                let res = /<a[^>]*>([^<]+)<\/a>/g.exec(text);

                if (res) {
                    //if there is a <a> tag in text, the res obj will have 0: full <a> html-like line, 1: text inside <a>THIS TEXT</a> tag;
                    let tag = res[0];
                    let linkWord = res[1];
                    //replacing the anchor element with just a text inside andcore tag
                    text = text.replace(tag, linkWord);
                }
                return text.slice(0, symbols) + "...";
            },
        },
    };
</script>
