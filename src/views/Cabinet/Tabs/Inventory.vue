<template>
    <main class="main-boosts">
        <transfer-modal
            v-if="showTransferModal"
            @close="(showTransferModal = false), (selectedNft = null), (onlyData = false)"
            :nft="selectedNft"
            :onlyData="onlyData"
            nftType="Posegg"
        />

        <div class="cab-page-name">
            <div class="h2">{{ "Inventory" }}</div>
        </div>
        <div class="cab-col-wrap">
            <div class="cab-col cab-minor-col">
                <section class="cab-row">
                    <div class="cab-row-card">
                        <div class="cab-card-wrap">
                            <div class="h4">{{ translatesGet("YOUR_NFTS") }}</div>

                            <div v-if="nfts && nfts.length" class="your-nfts-card your-nfts" :class="{ 'your-nfts-alone': nfts && nfts.length === 1 }">
                                <li v-for="(nft, index) of nfts" class="li-our-nfts nft-list-buy li-nft-red">
                                    <div class="li-our-nft-wrap">
                                        <img class="card-egg-image" :src="getNftImage(nft.plan)" 
                                            @click="(onlyData = true), (showTransferModal = true), (selectedNft = nft)" />
                                        <div class="li-nft-footer" style="padding: 0px; background: #ffffff00;">
                                            <button :disabled="showLoader" @click="transfer(nft)" class="btn btn-transfer">
                                                {{ translatesGet("BTN_TRANSFER") }}
                                            </button>
                                            <router-link :to="{ name: 'Staking' }" class="btn btn-go-stake">
                                                {{ translatesGet("BTN_GO_STAKE") }}
                                            </router-link>
                                        </div>
                                    </div>
                                </li>
                            </div>

                            <div v-else-if="!nfts || !nfts.length" class="your-nfts-card your-nfts-empty">
                                <div class="empty-icon"></div>
                                <div class="empty-title h4">{{ translatesGet("YOUR_NFTS_0_TITLE") }}</div>
                                <div class="empty-title h7" v-if="!currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97">
                                    {{ translatesGet("YOUR_NFTS_0_DESCR") }}
                                </div>
                                <div class="empty-title h7" v-if="currentBlockchain === 137">
                                    {{ translatesGet("YOUR_NFTS_0_DESCR_MATIC") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>
<script>
    import MultiLang from "@/core/multilang";
    import VueSlider from "vue-slider-component";
    import "vue-slider-component/theme/default.css";
    import TransferModal from "../../../components/ModalWindows/TransferModal.vue";
    import { mapState } from "vuex";
    import conf from "../../../../config.json";

    export default {
        name: "Inventory",

        data() {
            return {
                lang: new MultiLang(this),
                inputActive: false,
                bnbAmount: "",
                prices: [17, 47, 97, 197, 497, 997, 1997, 4997],
                amount1: false,
                amount2: false,
                amount3: false,
                amount4: false,
                showLoader: false,
                percent: 0,
                showInputError: false,
                inputErrorText: "",
                selectedNft: null,
                showTransferModal: false,
                disablePercWatcher: false,
                selectedToken: "",
                onlyData: false,
                options: {
                    dotSize: 14,
                    width: "auto",
                    height: 4,
                    contained: false,
                    direction: "ltr",
                    data: null,
                    dataLabel: "label",
                    dataValue: "value",
                    min: 0,
                    max: 100,
                    interval: 1,
                    disabled: false,
                    clickable: true,
                    duration: 0.5,
                    adsorb: false,
                    lazy: false,
                    tooltip: "active",
                    tooltipPlacement: "top",
                    tooltipFormatter: void 0,
                    useKeyboard: false,
                    keydownHook: null,
                    dragOnClick: false,
                    enableCross: true,
                    fixed: false,
                    minRange: void 0,
                    maxRange: void 0,
                    order: true,
                    marks: false,
                    dotOptions: void 0,
                    dotAttrs: void 0,
                    process: true,
                    dotStyle: void 0,
                    railStyle: void 0,
                    processStyle: void 0,
                    tooltipStyle: void 0,
                    stepStyle: void 0,
                    stepActiveStyle: void 0,
                    labelStyle: void 0,
                    labelActiveStyle: void 0,
                },
            };
        },
        components: {
            VueSlider,
            TransferModal,
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
            focusInputIn() {
                return (this.inputActive = true);
            },
            focusInputOut() {
                return (this.inputActive = false);
            },
            setBnbAmountFixed(amount) {
                this.bnbAmount = parseFloat(Number(this.$root.core.withoutRound(amount, 4)));
            },
            getNftImage(index) {
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./nft-" + index + ".png");
            },
            getImageLinkByPrice(nftPrice) {
                let nftId = nftPrice == 17 ? 1 : nftPrice == 47 ? 2 : nftPrice == 97 ? 3 : nftPrice == 197 ? 4 : nftPrice == 497 ? 5 : nftPrice == 997 ? 6 : nftPrice == 1997 ?  7 : nftPrice == 4997 ? 8 : 9;
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./nft-" + nftId + ".png");
            },
            setBnbAmount(perc) {
                const amount = (this.userERC20Balance * perc) / 100;
                this.bnbAmount = parseFloat(Number(this.$root.core.withoutRound(amount, 4)));
            },
            async BuyNFT() {
                if (!this.currentAddress || this.currentAddress === "0x0000000000000000000000000000000000000000") {
                    this.$emit("changeWallet");
                    return;
                }
                if (!this.bnbAmount) {
                    this.disablePercWatcher = true;
                    this.bnbAmount = this.currentBlockchain && this.currentBlockchain === 97 ? 17 : 0.01;
                }

                if (this.bnbAmount > 99999.9999) {
                    this.$store.commit("push_notification", {
                        type: "error",
                        typeClass: "error",
                        message: `Max purchase amount is 99999.9999`,
                    });
                    this.bnbAmount = Math.min((this.userERC20Balance * 98) / 100, 99999.9999);
                } else if (this.bnbAmount > (this.userERC20Balance * 98) / 100) {
                    this.$store.commit("push_notification", {
                        type: "error",
                        typeClass: "error",
                        message: `The amount you entered exceeds your wallet balance. Please try an amout within your balance.`,
                    });
                    return;
                }

                this.bnbAmount = parseFloat(Number(this.$root.core.withoutRound(this.bnbAmount, 4)));
                try {
                    if (this.bnbAmount < conf[this.currentBlockchain].MIN_NFT_PRICE) {
                        this.$store.commit("push_notification", {
                            type: "error",
                            typeClass: "error",
                            message: `The minimum NFT mint price is ${conf[this.currentBlockchain].MIN_NFT_PRICE} ${this.currency}`,
                        });
                        return;
                    }
                    this.showLoader = true;
                    const refs = await this.$root.core.getReferrers(this.currentAddress);
                    console.log("AM ["+this.bnbAmount.toString()+"] REF ["+refs+"]")
                    const res = await this.$root.core.buyNFT(this.bnbAmount.toString(), refs);

                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Sending your transaction into the blockchain...`,
                    });
                    await res.wait();
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                    });
                    //fbq("track", "Lead");
                    await res.wait(5);
                } catch (error) {
                    this.showLoader = false;
                    this.$root.core.handleError(error);
                    return;
                }
            },
            async transfer(nft) {
                this.selectedNft = nft;
                this.showTransferModal = true;
                return;
            },
        },
        mounted() {
            let _this = this;
            let counter = 0;
            if (Number(_this?.$router?.currentRoute?.params?.chosenPrice) > 0) {
                setTimeout(async function init() {
                    try {
                        if (
                            Number(_this?.$router?.currentRoute?.params?.chosenPrice) > 0 &&
                            _this.currentAddress &&
                            _this.currentAddress !== "0x0000000000000000000000000000000000000000" &&
                            _this.userERC20Balance !== null &&
                            Number(_this.currentBlockchain) === Number(_this?.$router?.currentRoute?.params?.chosenBlockchain)
                        ) {
                            _this.disablePercWatcher = true;
                            _this.bnbAmount = _this?.$router?.currentRoute?.params?.chosenPrice.toString();
                        } else if (
                            _this.currentBlockchain &&
                            Number(_this.currentBlockchain) !== Number(_this?.$router?.currentRoute?.params?.chosenBlockchain)
                        ) {
                            window.localStorage.setItem(
                                "selectedPrice",
                                JSON.stringify({
                                    price: _this?.$router?.currentRoute?.params?.chosenPrice,
                                    chain: _this?.$router?.currentRoute?.params?.chosenBlockchain,
                                })
                            );
                            const symbol = _this.currentBlockchain === 56 || _this.currentBlockchain === 97 ? "bsc" : _this.currentBlockchain === 137 ? "poly" : "";
                            _this.$store.commit("push_notification", {
                                type: "warning",
                                typeClass: "warning",
                                message: `It seems that you preselected ${
                                    Number(_this?.$router?.currentRoute?.params?.chosenBlockchain) === 56
                                        || Number(_this?.$router?.currentRoute?.params?.chosenBlockchain) === 97
                                        ? "BNB Chain"
                                        : Number(_this?.$router?.currentRoute?.params?.chosenBlockchain) === 137
                                        ? "Polygon"
                                        : ""
                                } network. If you want to use it, please accept network change in your wallet. Otherwise you may continue use the website.`,
                            });
                            await _this.$root.core.changeNetwork(symbol);
                        } else if (!window.localStorage.getItem("selectedWallet")) {
                            window.localStorage.setItem(
                                "selectedPrice",
                                JSON.stringify({
                                    price: _this?.$router?.currentRoute?.params?.chosenPrice,
                                    chain: _this?.$router?.currentRoute?.params?.chosenBlockchain,
                                })
                            );
                            return;
                        } else {
                            throw Error("No current blockchain or address");
                        }
                    } catch (error) {
                        console.log(error);
                        if (counter < 7) {
                            counter++;
                            setTimeout(init, 600);
                            return;
                        } else {
                            window.localStorage.setItem(
                                "selectedPrice",
                                JSON.stringify({
                                    price: _this?.$router?.currentRoute?.params?.chosenPrice,
                                    chain: _this?.$router?.currentRoute?.params?.chosenBlockchain,
                                })
                            );
                            return;
                        }
                    }
                }, 300);
            } else if (window.localStorage.getItem("selectedPrice")) {
                const obj = JSON.parse(window.localStorage.getItem("selectedPrice"));
                setTimeout(function init() {
                    try {
                        if (
                            _this.currentAddress &&
                            _this.currentAddress !== "0x0000000000000000000000000000000000000000" &&
                            _this.userERC20Balance !== null &&
                            (Number(_this.currentBlockchain) === Number(obj.chain) 
                            || 
                            Number(_this.currentBlockchain) === 97)
                        ) {
                            _this.disablePercWatcher = true;
                            _this.bnbAmount = obj.price.toString();
                            window.localStorage.removeItem("selectedPrice");
                        } else {
                            throw Error("No current blockchain or address");
                        }
                    } catch (error) {
                        console.log(error);
                        if (counter < 10) {
                            counter++;
                            setTimeout(init, 700);
                            return;
                        }
                    }
                }, 300);
            }

            this.lang.init();
            // setTimeout(async () => {
            //     this.lang.init();
            //     if (this.currentAddress && this.currentBlockchain) {
            //         const res = await this.$root.core.estimateGas("buy", {
            //             ref: await this.$root.core.getReferrers(this.currentAddress),
            //             decimals: 18,
            //             amount: "0.01",
            //         });
            //         this.feeForNftPurchase = (Number(res) * conf[this.currentBlockchain].DEFAULT_GAS_PRICE_GWEI * 10 ** 9) / 10 ** 18;
            //         console.log("fee calculated");
            //     }
            // }, 1200);
        },
        computed: {
            ...mapState(["userCoinBalance", "userERC20Balance", "currentBlockchain", "userNftsData", "currentAddress", "currency"]),
            getImage() {
                if (this.currentBlockchain === 56 || this.currentBlockchain === 97) {
                    const eggNumber =
                        Number(this.bnbAmount) < 0.1
                            ? "56" + "-1"
                            : Number(this.bnbAmount) < 1
                            ? "56" + "-2"
                            : Number(this.bnbAmount) < 2
                            ? "56" + "-3"
                            : Number(this.bnbAmount) < 5
                            ? "56" + "-4"
                            : Number(this.bnbAmount) < 10
                            ? "56" + "-5"
                            : Number(this.bnbAmount) < 50
                            ? "56" + "-6"
                            : Number(this.bnbAmount) < 100
                            ? "56" + "-7"
                            : "56" + "-8";
                    return `${eggNumber}`;
                } else if (this.currentBlockchain === 137) {
                    const eggNumber =
                        Number(this.bnbAmount) < 35
                            ? "137" + "-1"
                            : Number(this.bnbAmount) < 350
                            ? "137" + "-2"
                            : Number(this.bnbAmount) < 700
                            ? "137" + "-3"
                            : Number(this.bnbAmount) < 1700
                            ? "137" + "-4"
                            : Number(this.bnbAmount) < 3500
                            ? "137" + "-5"
                            : Number(this.bnbAmount) < 17000
                            ? "137" + "-6"
                            : Number(this.bnbAmount) < 35000
                            ? "137" + "-7"
                            : "137" + "-8";
                    return `${eggNumber}`;
                } else if (!this.currentBlockchain) {
                    const eggNumber =
                        Number(this.bnbAmount) < 0.1
                            ? "56-1"
                            : Number(this.bnbAmount) < 1
                            ? "56-2"
                            : Number(this.bnbAmount) < 2
                            ? "56-3"
                            : Number(this.bnbAmount) < 5
                            ? "56-4"
                            : Number(this.bnbAmount) < 10
                            ? "56-5"
                            : Number(this.bnbAmount) < 50
                            ? "56-6"
                            : Number(this.bnbAmount) < 100
                            ? "56-7"
                            : "56-8";
                    return `${eggNumber}`;
                }
            },
            nfts() {
                if (
                    this.userNftsData &&
                    this.currentBlockchain &&
                    this.currentAddress &&
                    this.currentAddress !== "0x0000000000000000000000000000000000000000"
                ) {
                    // const arr = this.userNftsData[this.currentBlockchain][conf[this.currentBlockchain].NFT_CONTRACT] || [];
                    // return arr.sort((a, b) => b.id - a.id); 
                    return this.userNftsData;
                }
                return null;
            },
            points() {
                return [
                    {
                        value: 0,
                        step: 1,
                    },
                    {
                        value: 25,
                        step: 1,
                    },
                    {
                        value: 50,
                        step: 1,
                    },
                    {
                        value: 75,
                        step: 1,
                    },
                    {
                        value: 100,
                        step: 1,
                    },
                ];
            },

            marks() {
                return this.points.map((point) => point.value);
            },
        },
        watch: {
            percent: function (newVal, oldVal) {
                this.bnbAmount = parseFloat(newVal.toFixed(4));
            },
            nfts: function (newVal, oldVal) {
                if (newVal && oldVal && newVal.length !== oldVal.length) {
                    this.showLoader = false;
                    if (newVal.length > oldVal.length) {
                        this.$store.commit("clear_notifications", []);
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `Congrats! You have successfully minted your DuckNFT.`,
                        });
                    }
                }
            },

            bnbAmount: function (newVal, oldVal) {
                this.percent = newVal;
                if (newVal.toString().length > 10) {
                    this.bnbAmount = oldVal;
                    setTimeout(() => {
                        this.showInputError = true;
                        this.inputErrorText = "Amount should be less than 10 digits ";
                    }, 50);
                    setTimeout(() => {
                        this.showInputError = false;
                        this.inputErrorText = "";
                    }, 3000);
                }
                if (newVal > 99999.9999) {
                    this.showInputError = true;
                    this.inputErrorText = "Max price cannot be higher than 99999.9999";
                } else if (newVal > 0 && newVal < 0.01) {
                    this.showInputError = true;
                    this.inputErrorText = "Min price should be at least 0.01";
                } else {
                    this.showInputError = false;
                    this.inputErrorText = "";
                }
            },
        },
    };
</script>
