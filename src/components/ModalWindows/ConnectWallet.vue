<template>
    <div class="modal" v-show="showWalletOptions">
        <div class="modal-full-close" @click="$emit('close')"></div>
        <div class="modal-wrap">
            <div class="modal-header">
                <div class="modal-name">{{ translatesGet("CONNECT_YOUR_WALLET") }}</div>
                <button @click="$emit('close')" class="modal-btn-close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="modal-content modal-choose-wallet">
                <div class="modal-describe">{{ translatesGet("CHOOSE_OPTION") }}</div>
                <div class="modal-section">
                    <div class="btns-choose-wallet-wrap">
                        <button @click="setupDesiredWallet('metamask'), $emit('setWalletAndAddress')" class="btn btn-choose-wallet">
                            <div class="icon-wrap">
                                <i class="icon-metamask"></i>
                            </div>
                            <span>Metamask</span>
                            <!-- <span>{{ translatesGet("METAMASK") }}</span> -->
                        </button>

                        <button @click="setupDesiredWallet('walletconnect'), $emit('setWalletAndAddress')" class="btn btn-choose-wallet">
                            <div class="icon-wrap">
                                <i class="icon-wallet-connect"></i>
                            </div>
                            <span>WalletConnect</span>
                            <!-- <span>{{ translatesGet("WALLET_CONNECT") }}</span> -->
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    export default {
        props: ["showConnectWallet", "showWalletOptions", "noWallet"],
        data: function () {
            return {
                disableConnectButton: false,
                lang: new MultiLang(this),
            };
        },
        mounted() {
            this.lang.init();
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
            async connectWallet() {
                try {
                    this.disableConnectButton = true;
                    // Will open the MetaMask UI
                    // You should disable this button while the request is pending!
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    this.disableConnectButton = false;
                    this.$emit("close");
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: "Wallet has been connected",
                    });
                } catch (error) {
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "danger",
                        message:
                            error.message && error.message == "Already processing eth_requestAccounts. Please wait."
                                ? "Please proceed to your metamask extention to connect the wallet"
                                : "Something went wrong, please try again",
                    });
                    this.disableConnectButton = false;
                }
            },
            async setupDesiredWallet(walletOption) {
                const previousSelection = window.localStorage.getItem("selectedWallet");
                if (walletOption && previousSelection && walletOption.toLowerCase() === previousSelection.toLowerCase()) {
                    this.$emit("close");
                }
                if (walletOption) {
                    if (walletOption === "metamask" && (this.$device.mobile || this.$device.android || this.$device.ipad)) {
                        if (window && !window.ethereum) {
                            const currentUrl = window.location.href.toString().replace("http://", "").replace("https://", "");
                            window.open("https://metamask.app.link/dapp/" + currentUrl);
                            return;
                        }
                    }
                    if (previousSelection === "walletconnect" && walletOption === "metamask") {
                        window.localStorage.setItem("selectedWallet", walletOption);
                        await this.$root.core.killSession();
                    }
                    window.localStorage.setItem("selectedWallet", walletOption);
                }
            },
            // async changeNetwork(blockchain) {
            //     await this.$root.core.changeNetwork(this, blockchain);
            // },
        },
    };
</script>
