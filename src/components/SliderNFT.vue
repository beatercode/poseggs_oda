<template>
    <div class="slider-nft">
        <div class="slider-nft-container">
            <div class="slider-nft-wrap">
                <ul class="ul-our-nfts" :class="'ul-binance'">
                    <li v-for="(price, index) of prices" @click="redirect(8)"
                        class="li-our-nfts nft-list-buy li-nft-red" style="margin: 4px; !important">
                        <div class="li-our-nft-wrap" @click="showStats = showStats">
                            <img class="card-egg-image" :src="getNftImage(index)" />
                            <div class="li-nft-footer">
                                <div style="width: 100%">
                                    <span class="li-nft-footer-title">{{
                                            "Stats"
                                    }}</span>
                                    <!--div class="icon logo-coin icon-card"></div-->
                                    <div>
                                        <div class="stake-nft-value-main-stats">
                                            <span>Daily</span> <span>{{ profits[index] }}%</span>
                                        </div>
                                        <div class="stake-nft-value-main-stats">
                                            <span>Days</span> <span>{{ periods[index] }}</span>
                                        </div>
                                        <div class="stake-nft-value-main-stats">
                                            <span>Total</span> <span>{{ parseFloat(profits[index] *
                                                    periods[index]).toFixed(1)
                                            }}%</span>
                                        </div>
                                        <div class="cab-row cab-row-stats">
                                            <span class="li-nft-footer-amount card-footer-stats">Strength</span>
                                            <span class="li-nft-footer-amount-2 card-footer-stats">{{
                                                    stats[index]
                                            }}</span>
                                        </div>
                                        <div class="cab-row cab-row-stats">
                                            <span class="li-nft-footer-amount card-footer-stats">Healt</span>
                                            <span class="li-nft-footer-amount-2 card-footer-stats">{{
                                                    stats[index]
                                            }}</span>
                                        </div>
                                        <div class="cab-row cab-row-stats">
                                            <span class="li-nft-footer-amount card-footer-stats">Agility</span>
                                            <span class="li-nft-footer-amount-2 card-footer-stats">{{
                                                    stats[index]
                                            }}</span>
                                        </div>
                                        <div class="cab-row cab-row-stats">
                                            <span class="li-nft-footer-amount card-footer-stats">Magic</span>
                                            <span class="li-nft-footer-amount-2 card-footer-stats">{{
                                                    stats[index]
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mint-nft-block"
                                    style="width: 100% !important; display: flex; flex-direction: row;">
                                    <div class="input-title"
                                        style="width: 50%; line-height: unset; margin-top: 10px; font-size: 16px;">{{
                                                "Value"
                                        }}</div>
                                    <div class="price-card-wrap" style="width: 50%; text-align: right; white-space: nowrap;">
                                        <span type="number" @input="disablePercWatcher = true"> {{ price }} </span>
                                        <span class="coin">BUSD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="slider-row">
            <div class="slider-nav">
                <button @click="prevPage()" class="slider-page" :class="{ active: sliderTranslate === 0 }"></button>
                <button @click="nextPage()" class="slider-page" :class="{ active: sliderTranslate < 0 }"></button>
            </div>
        </div>
    </div>
</template>

<script>
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
import MultiLang from "@/core/multilang";
import { mapState } from "vuex";
import conf from "../../config.json";

export default {
    data() {
        return {
            sliderPage: 0,
            sliderTranslate: 0,
            isDown: false,
            prices: conf.EGG_DATA.prices,
            stats: conf.EGG_DATA.stats,
            profits: conf.EGG_DATA.profits,
            periods: conf.EGG_DATA.periods,
            startX: 0,
            scrollLeft: -50,
            lang: new MultiLang(this),
            xDown: null,
            yDown: null,
            currentChain: "",
        };
    },
    mounted() {
        this.lang.init();
        const _this = this;
    },
    methods: {
        redirect(image) {
            const prices = {
                56: [0.01, 0.1, 1, 2, 5, 10, 50, 100],
                137: [5, 35, 350, 700, 1700, 3500, 17000, 35000],
            };
            if (this.preselectedChain === 56) {
                const price = prices[this.preselectedChain][image - 1];
                this.$router.push({
                    name: "MintNFT",
                    params: { chosenPrice: price, chosenBlockchain: this.preselectedChain },
                });
            } else if (this.preselectedChain === 137) {
                const price = prices[this.preselectedChain][image - 1];
                this.$router.push({
                    name: "MintNFT",
                    params: { chosenPrice: price, chosenBlockchain: this.preselectedChain },
                });
            }
        },
        getNftImage(index) {
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./nft-" + (index + 1) + ".png");
        },
        translatesGet(key) {
            try {
                const translations = JSON.parse(window.localStorage.getItem("interfaceTranslations"));
                const res = translations.lang.find((el) => el.hasOwnProperty(`${key}`));
                return res[key];
            } catch (ex) {
                return this.lang.get(key);
            }
        },
    },
    computed: {
        ...mapState(["preselectedChain"]),
        getPreselectedChain() {
            // return this.preselectedChain === 56 ? "ul-binance" : this.preselectedChain === 137 ? "ul-polygon" : "ul-binance";
            return this.preselectedChain === 56 || this.preselectedChain === 97
                ? "ul-binance"
                : "ul-polygon";
        },
        currency() {
            return this.preselectedChain && this.preselectedChain === 137 ? "MATIC" : "BNB";
        },
    },
};
</script>
