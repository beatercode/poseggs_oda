<template>
    <main class="main-boosts">
        <transfer-modal v-if="showTransferModal"
            @close="(showTransferModal = false), (selectedNft = null), (onlyData = false)" :nft="selectedNft"
            :onlyData="onlyData" :nftType="nftType" />

        <div class="cab-page-name">
            <div class="h2">{{ "Inventory" }}</div>
        </div>
        <div class="cab-col-wrap">
            <div class="cab-col cab-minor-col">
                <section class="cab-row">
                    <div class="cab-row-card">
                        <div class="cab-card-wrap">
                            <div class="h4">{{ translatesGet("YOUR_NFTS") }}</div>

                            <div v-if="nfts && nfts.length" class="your-nfts-card your-nfts"
                                :class="{ 'your-nfts-alone': nfts && nfts.length === 1 }">
                                <li v-for="(nft, index) of nfts" class="li-our-nfts nft-list-buy li-nft-red">
                                    <div class="li-our-nft-wrap">
                                        <img class="card-egg-image" :src="getNftImage(nft.plan)"
                                            @click="(nftType = 'Posegg'), (onlyData = true), (showTransferModal = true), (selectedNft = nft)" />
                                        <div class="li-nft-footer" style="padding: 0px; background: #ffffff00;">
                                            <button :disabled="showLoader" @click="transfer(nft)"
                                                class="btn btn-transfer">
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
                                <div class="empty-title h7"
                                    v-if="!currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97">
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
        <div class="cab-col cab-minor-col">
            <section class="cab-row">
                <div class="cab-row-card">
                    <div class="cab-card-wrap your-boosts-card">
                        <div class="h4">{{ translatesGet("YOUR_BOOSTS") }}</div>
                        <!-- TODO:  v-if=boostList<=0 -->
                        <div v-if="!nfts || !nfts.length" class="your-boosts your-boosts-empty">
                            <div class="empty-icon"></div>
                            <div class="empty-title h4">{{ translatesGet("YOUR_BOOSTS_0_TITLE") }}</div>
                            <div class="empty-title h7"
                                v-if="!currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97">
                                {{ translatesGet("YOUR_BOOSTS_0_DESCR_BNB") }}
                            </div>
                            <div class="empty-title h7" v-if="currentBlockchain === 137">{{
                                    translatesGet("YOUR_BOOSTS_0_DESCR_MATIC")
                            }}</div>
                        </div>
                        <div v-else class="your-boosts">
                            <div class="your-boost-item" v-for="nft of nftBoost">
                                <div class="block-percent-img">
                                    <div class="your-nft-img" @click="(nftType = 'Boost'), (showTransferModal = true), (onlyData = true), (selectedNft = nft)">
                                        <img :src="getBoostImg(nft)" />
                                    </div>
                                </div>
                                <div class="block-percent-value">
                                    <!-- <span>{{
                                                translatesGet(
                                                    `${
                                                        nft.attributes[0].value === "TIME"
                                                            ? "BOOSTER_TIME"
                                                            : nft.attributes[0].value === "PROFIT"
                                                            ? "BOOSTER_PROFIT"
                                                            : "BOOSTER_TEAM"
                                                    }`
                                                ) 
                                            }}</span> -->
                                    {{ nft.name }}
                                    <div v-if="nft.boostType !== 2" class="card-boost-data">
                                        <div class="boost-data-item boost-data-item-main" :class="getSvgProfitClass(nft.boostType)">
                                            <svg v-if="nft.boostType === 1" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                                <path
                                                    d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                            </svg>
                                            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z">
                                                </path>    
                                            </svg>
                                            
                                            {{ "+" + getPercent(nft)[0] + (nft.boostType === 0 ? "%" : " days") }}
                                        </div>
                                    </div>
                                    <div v-else class="card-boost-data">
                                        <div class="boost-data-item boost-data-item-main">
                                            
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                                <path
                                                    d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                            </svg>
                                            {{ getPercent(nft)[0] }}
                                        </div>
                                        <div class="boost-data-item boost-data-item-main">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z">
                                                </path>
                                            </svg>
                                            {{ getPercent(nft)[1] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="block-percent-content">
                                    <div class="btns-container">
                                        <button @click="$router.push({ name: 'YourStake' })" class="btn btn-use">
                                            {{ translatesGet("BTN_USE") }}
                                        </button>
                                        <button @click="(nftType = 'Posegg'), (showTransferModal = true), (selectedNft = nft)"
                                            class="btn btn-transfer">
                                            {{ translatesGet("BTN_TRANSFER") }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
            nftType: "Posegg",
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
        getPercent(nft) {
            if (nft.boostType === 0) {
                return [nft.boostProfitPercent];
            } else if (nft.boostType === 1) {
                return [nft.boostTimePercent];
            } else if (nft.boostType === 2) {
                return [boostProfitPercent, boostTimePercent];
            }
        },
        getBoostImg(nft) {
            let nameFix = nft.boostType == 1 ? "time-" : "percent-";
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./boost-" + nameFix + (+nft.boostLevel + 1) + ".png");
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
            let nftId = nftPrice == 17 ? 1 : nftPrice == 47 ? 2 : nftPrice == 97 ? 3 : nftPrice == 197 ? 4 : nftPrice == 497 ? 5 : nftPrice == 997 ? 6 : nftPrice == 1997 ? 7 : nftPrice == 4997 ? 8 : 9;
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
                console.log("AM [" + this.bnbAmount.toString() + "] REF [" + refs + "]")
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
        getSvgProfitClass(type) {
            if (type == 1) {
                return "timeSvg"
            } else {
                return "profitSvg"
            }
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
                            message: `It seems that you preselected ${Number(_this?.$router?.currentRoute?.params?.chosenBlockchain) === 56
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
        ...mapState(["userCoinBalance", "userERC20Balance", "currentBlockchain", "userNftsData", "userNftsBoostsData", "currentAddress", "currency"]),
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
        nftBoost() {
            if (
                this.userNftsBoostsData &&
                this.currentBlockchain &&
                this.currentAddress &&
                this.currentAddress !== "0x0000000000000000000000000000000000000000"
            ) {
                return this.userNftsBoostsData;
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
