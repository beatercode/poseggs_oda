<template>
    <main class="main-boosts">
        <transfer-modal v-if="showTransferModal" @close="
            (showTransferModal = false), (selectedNft = null), (onlyData = false)
        " :nft="selectedNft" :onlyData="onlyData" nftType="Posduck" />

        <div class="cab-page-name">
            <div class="h2">{{ "Mint NFT" }}</div>
        </div>
        <div class="cab-col-wrap">
            <div class="cab-col cab-main-col">
                <section class="cab-row">
                    <div class="cab-row-card">
                        <div class="cab-card-wrap buy-nft-card">
                            <div class="cab-row">
                                <div class="cab-row-card">
                                    <div class="card-header card-header-desctop">
                                        <div class="card-header-icon earn-buy"></div>
                                        <div>
                                            <div class="h4">{{ translatesGet("MINT_NFT") }}</div>
                                            <div class="h5">
                                                {{ translatesGet("YOUR_NFTS_DESCR") }}
                                            </div>
                                        </div>
                                        <a class="link link-learn-more" target="_blank" rel="nofollow"
                                            href="https://posduck.gitbook.io/posduck-dock/nft-purchase-on-the-posduck-platform">
                                            {{ translatesGet("LEARN_MORE") }}
                                            <i class="i-arrow-right-3"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="cab-row">
                                <div class="card-header card-header-nft-image-buy card-header-desctop">
                                    <div class="slider-nft-wrap">
                                        <ul class="ul-our-nfts" :class="'ul-binance'">
                                            <li v-for="(price, index) of prices" @click="setSelectedEgg(price, index)"
                                                :style="[index == selectedIndex ? { 'opacity': '1' } : { 'opacity': '0.7' }]"
                                                class="li-our-nfts nft-list-buy nft-list-buy-page li-nft-red">
                                                <div class="li-our-nft-wrap" @click="showStats = showStats">
                                                    <img class="card-egg-image"
                                                        :class="{ hopping: index == selectedIndex }"
                                                        :src="getNftImage(index)" />
                                                    <div class="li-nft-footer">
                                                        <div style="width: 100%">
                                                            <span class="li-nft-footer-title">{{
                                                                    "Stats"
                                                            }}</span>
                                                            <div class="icon logo-coin icon-card"></div>
                                                            <div v-if="showStats">
                                                                <div class="cab-row cab-row-stats stats-superiod">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Daily</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                profits[index]
                                                                        }}%</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats stats-superiod">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Days</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                periods[index]
                                                                        }}</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats stats-superiod">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Total</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                parseFloat(
                                                                                    profits[index] * periods[index]
                                                                                ).toFixed(1)
                                                                        }}%</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Strength</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Healt</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Agility</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Magic</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mint-nft-block"
                                                            style="width: 100% !important; display: flex; flex-direction: row; margin-top: 3px;">
                                                            <div class="input-title"
                                                                style="width: auto; line-height: unset; margin-top: 10px; font-size: 16px;">
                                                                {{ "Price" }}</div>
                                                            <div class="price-card-wrap"
                                                                style="width: 100%; text-align: right; position: relative; right: 0;">
                                                                <span type="number" @input="disablePercWatcher = true">
                                                                    {{ price }}
                                                                </span>
                                                                <span class="coin">BUSD</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mint-nft-block" style="margin-top: 0px;">
                                                        <button :disabled="showLoader" @click="BuyNFT(index)"
                                                            class="btn btn-mint">
                                                            {{ translatesGet("MINT") }}
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="cab-row">
                                <div class="cab-row-card mint-nft-img">
                                    <div class="card-header card-header-mobile">
                                        <div class="card-header-icon earn-buy"></div>
                                        <div>
                                            <div class="h4">{{ translatesGet("MINT_NFT") }}</div>
                                            <div class="h5">
                                                {{ translatesGet("YOUR_NFTS_DESCR") }}
                                            </div>
                                        </div>
                                        <a class="link link-learn-more" target="_blank" rel="nofollow"
                                            href="https://posduck.gitbook.io/posduck-dock/nft-purchase-on-the-posduck-platform">
                                            {{ translatesGet("LEARN_MORE") }}
                                            <i class="i-arrow-right-3"></i>
                                        </a>
                                    </div>

                                    <div class="card-header card-header-nft-image-buy card-header-mobile">
                                        <div class="slider-nft-wrap">
                                            <ul class="ul-our-nfts" :class="'ul-binance'">
                                                <li v-for="(price, index) of prices"
                                                    @click="setSelectedEgg(price, index)"
                                                    :style="[index == selectedIndex ? { 'opacity': '1' } : { 'opacity': '0.7' }]"
                                                    class="li-our-nfts nft-list-buy nft-list-buy-page li-nft-red">
                                                    <div class="li-our-nft-wrap" @click="showStats = showStats">
                                                        <img class="card-egg-image"
                                                            :class="{ hopping: index == selectedIndex }"
                                                            :src="getNftImage(index)" />
                                                        <div class="li-nft-footer">
                                                            <div style="width: 100%">
                                                                <span class="li-nft-footer-title">{{
                                                                        "Stats"
                                                                }}</span>
                                                                <div class="icon logo-coin icon-card"></div>
                                                                <div v-if="showStats">
                                                                    <div class="cab-row cab-row-stats stats-superiod">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Daily</span>
                                                                        <span
                                                                            class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                    profits[index]
                                                                            }}%</span>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats stats-superiod">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Days</span>
                                                                        <span
                                                                            class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                    periods[index]
                                                                            }}</span>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats stats-superiod">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Total</span>
                                                                        <span
                                                                            class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                    parseFloat(
                                                                                        profits[index] * periods[index]
                                                                                    ).toFixed(1)
                                                                            }}%</span>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Strength</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[0]
                                                                            }}
                                                                            </span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Healt</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[1]
                                                                            }}
                                                                            </span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Agility</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[2]
                                                                            }}
                                                                            </span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Magic</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[3]
                                                                            }}
                                                                            </span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="mint-nft-block"
                                                                style="width: 100% !important; display: flex; flex-direction: row; margin-top: 3px;">
                                                                <div class="input-title"
                                                                    style="width: auto; line-height: unset; margin-top: 10px; font-size: 16px;">
                                                                    {{ "Price" }}</div>
                                                                <div class="price-card-wrap"
                                                                    style="width: 100%; text-align: right; position: relative; right: 0;">
                                                                    <span type="number"
                                                                        @input="disablePercWatcher = true"> {{ price }}
                                                                    </span>
                                                                    <span class="coin">BUSD</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mint-nft-block" style="margin-top: 0px;">
                                                            <button :disabled="showLoader" @click="BuyNFT(index)"
                                                                class="btn btn-mint">
                                                                {{ translatesGet("MINT") }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
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
    name: "BuyNFT",

    data() {
        return {
            lang: new MultiLang(this),
            inputActive: false,
            busdAmount: "",
            showStats: true,
            prices: conf.EGG_DATA.prices,
            stats: conf.EGG_DATA.stats,
            profits: conf.EGG_DATA.profits,
            periods: conf.EGG_DATA.periods,
            amount1: false,
            amount2: false,
            amount3: false,
            amount4: false,
            showLoader: false,
            showInputError: false,
            inputErrorText: "",
            selectedIndex: 7,
            slectedStats: [79, 79, 79, 79],
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
                const translations = JSON.parse(
                    window.localStorage.getItem("interfaceTranslations")
                );
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
        decrementStats(i) {
            this.slectedStats[i] = this.slectedStats[i] - 1;
            console.log(this.slectedStats[i]);
        },
        getNftImage(index) {
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./nft-" + (index + 1) + ".png");
        },
        setSelectedEgg(amount, _selectedIndex) {
            if (this.selectedIndex == _selectedIndex) return;
            this.selectedIndex = _selectedIndex;
            this.slectedStats = [this.stats[_selectedIndex], this.stats[_selectedIndex], this.stats[_selectedIndex], this.stats[_selectedIndex]]
            this.busdAmount = parseFloat(
                Number(this.$root.core.withoutRound(amount, 4))
            );
        },
        setbusdAmount(perc) {
            const amount = (this.userERC20Balance * perc) / 100;
            this.busdAmount = parseFloat(
                Number(this.$root.core.withoutRound(amount, 4))
            );
        },
        async BuyNFT(index) {
            if (
                !this.currentAddress ||
                this.currentAddress === "0x0000000000000000000000000000000000000000"
            ) {
                this.$emit("changeWallet");
                return;
            }
            if (!this.busdAmount) {
                this.disablePercWatcher = true;
                this.busdAmount =
                    this.currentBlockchain && this.currentBlockchain === 97 ? 17 : 0.01;
            }

            if (this.busdAmount > 99999.9999) {
                this.$store.commit("push_notification", {
                    type: "error",
                    typeClass: "error",
                    message: `Max purchase amount is 99999.9999`,
                });
                this.busdAmount = Math.min(
                    (this.userERC20Balance * 98) / 100,
                    99999.9999
                );
            } else if (this.busdAmount > (this.userERC20Balance * 98) / 100) {
                this.$store.commit("push_notification", {
                    type: "error",
                    typeClass: "error",
                    message: `The amount you entered exceeds your wallet balance. Please try an amout within your balance.`,
                });
                return;
            }

            this.busdAmount = parseFloat(
                Number(this.$root.core.withoutRound(this.busdAmount, 4))
            );
            try {
                if (this.busdAmount < conf[this.currentBlockchain].MIN_NFT_PRICE) {
                    this.$store.commit("push_notification", {
                        type: "error",
                        typeClass: "error",
                        message: `The minimum NFT mint price is ${conf[this.currentBlockchain].MIN_NFT_PRICE
                            } ${this.currency}`,
                    });
                    return;
                }
                this.showLoader = true;
                const refs = await this.$root.core.getReferrers(this.currentAddress);
                const res = await this.$root.core.buyNFT(refs, (index + 1));

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
        // async addNftToWallet(nft) {
        //     if (window.ethereum && localStorage.getItem("selectedWallet") === "metamask") {
        //         try {
        //             // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        //             await window.ethereum.request({
        //                 method: "wallet_watchAsset",
        //                 params: {
        //                     type: "ERC721",
        //                     options: {
        //                         address: conf[this.currentBlockchain].NFT_CONTRACT,
        //                         symbol: "PSDC",
        //                         id: nft.id,
        //                         decimals: 0, // The number of decimals in the token
        //                     },
        //                 },
        //             });
        //         } catch (error) {
        //             alert(error.message);
        //         }
        //     } else if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
        //         try {
        //             await this.$root.core.provider.provider.request({
        //                 method: "wallet_watchAsset",
        //                 params: {
        //                     type: "ERC20",
        //                     options: {
        //                         address: token.address,
        //                         symbol: token.tag,
        //                         decimals: token.decimals || 18, // The number of decimals in the token
        //                         image: `${conf.REF_BASE}tokens/${token.tag.toLowerCase()}.png`, // A string url of the token logo
        //                     },
        //                 },
        //             });
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // },
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
                        _this.currentAddress !==
                        "0x0000000000000000000000000000000000000000" &&
                        _this.userERC20Balance !== null &&
                        Number(_this.currentBlockchain) ===
                        Number(_this?.$router?.currentRoute?.params?.chosenBlockchain)
                    ) {
                        _this.disablePercWatcher = true;
                        _this.busdAmount =
                            _this?.$router?.currentRoute?.params?.chosenPrice.toString();
                    } else if (
                        _this.currentBlockchain &&
                        Number(_this.currentBlockchain) !==
                        Number(_this?.$router?.currentRoute?.params?.chosenBlockchain)
                    ) {
                        window.localStorage.setItem(
                            "selectedPrice",
                            JSON.stringify({
                                price: _this?.$router?.currentRoute?.params?.chosenPrice,
                                chain: _this?.$router?.currentRoute?.params?.chosenBlockchain,
                            })
                        );
                        const symbol =
                            _this.currentBlockchain === 56 || _this.currentBlockchain === 97
                                ? "bsc"
                                : _this.currentBlockchain === 137
                                    ? "poly"
                                    : "";
                        _this.$store.commit("push_notification", {
                            type: "warning",
                            typeClass: "warning",
                            message: `It seems that you preselected ${Number(
                                _this?.$router?.currentRoute?.params?.chosenBlockchain
                            ) === 56 ||
                                Number(
                                    _this?.$router?.currentRoute?.params?.chosenBlockchain
                                ) === 97
                                ? "BNB Chain"
                                : Number(
                                    _this?.$router?.currentRoute?.params?.chosenBlockchain
                                ) === 137
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
                        _this.currentAddress !==
                        "0x0000000000000000000000000000000000000000" &&
                        _this.userERC20Balance !== null &&
                        (Number(_this.currentBlockchain) === Number(obj.chain) ||
                            Number(_this.currentBlockchain) === 97)
                    ) {
                        _this.disablePercWatcher = true;
                        _this.busdAmount = obj.price.toString();
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
        ...mapState([
            "userCoinBalance",
            "userERC20Balance",
            "currentBlockchain",
            "userNftsData",
            "currentAddress",
            "currency",
        ]),
        getImage() {
            if (this.currentBlockchain === 56 || this.currentBlockchain === 97) {
                const duckNumber =
                    Number(this.busdAmount) < 0.1
                        ? "56" + "-1"
                        : Number(this.busdAmount) < 1
                            ? "56" + "-2"
                            : Number(this.busdAmount) < 2
                                ? "56" + "-3"
                                : Number(this.busdAmount) < 5
                                    ? "56" + "-4"
                                    : Number(this.busdAmount) < 10
                                        ? "56" + "-5"
                                        : Number(this.busdAmount) < 50
                                            ? "56" + "-6"
                                            : Number(this.busdAmount) < 100
                                                ? "56" + "-7"
                                                : "56" + "-8";
                return `${duckNumber}`;
            } else if (this.currentBlockchain === 137) {
                const duckNumber =
                    Number(this.busdAmount) < 35
                        ? "137" + "-1"
                        : Number(this.busdAmount) < 350
                            ? "137" + "-2"
                            : Number(this.busdAmount) < 700
                                ? "137" + "-3"
                                : Number(this.busdAmount) < 1700
                                    ? "137" + "-4"
                                    : Number(this.busdAmount) < 3500
                                        ? "137" + "-5"
                                        : Number(this.busdAmount) < 17000
                                            ? "137" + "-6"
                                            : Number(this.busdAmount) < 35000
                                                ? "137" + "-7"
                                                : "137" + "-8";
                return `${duckNumber}`;
            } else if (!this.currentBlockchain) {
                const duckNumber =
                    Number(this.busdAmount) < 0.1
                        ? "56-1"
                        : Number(this.busdAmount) < 1
                            ? "56-2"
                            : Number(this.busdAmount) < 2
                                ? "56-3"
                                : Number(this.busdAmount) < 5
                                    ? "56-4"
                                    : Number(this.busdAmount) < 10
                                        ? "56-5"
                                        : Number(this.busdAmount) < 50
                                            ? "56-6"
                                            : Number(this.busdAmount) < 100
                                                ? "56-7"
                                                : "56-8";
                return `${duckNumber}`;
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

        busdAmount: function (newVal, oldVal) {
            if (newVal.toString().length > 10) {
                this.busdAmount = oldVal;
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
