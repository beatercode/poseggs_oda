<template>
    <div class="slider-nft">
        <div class="slider-nft-container">
            <div class="slider-nft-wrap">
                <ul
                    class="ul-our-nfts"
                    :class="{
                        'ul-binance': getPreselectedChain !== 'polygon',
                        'ul-polygon': getPreselectedChain === 'polygon',
                    }"
                >
                    <li @click="redirect(1)" class="li-our-nfts li-nft-red">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">0.01 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">5 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
                            </div>
                        </div>
                    </li>
                    <li @click="redirect(2)" class="li-our-nfts li-nft-blue">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">0.1 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">35 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
                            </div>
                        </div>
                    </li>
                    <li @click="redirect(3)" class="li-our-nfts li-nft-yellow">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">1 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">350 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
                            </div>
                        </div>
                    </li>
                    <li @click="redirect(4)" class="li-our-nfts li-nft-green">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">2 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">700 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul
                    class="ul-our-nfts"
                    :class="{
                        'ul-binance': getPreselectedChain == 'binance',
                        'ul-polygon': getPreselectedChain == 'polygon',
                    }"
                >
                    <li @click="redirect(5)" class="li-our-nfts li-nft-red">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">5 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">1700 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
                            </div>
                        </div>
                    </li>
                    <li @click="redirect(6)" class="li-our-nfts li-nft-blue">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">10 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">3 500 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
                            </div>
                        </div>
                    </li>
                    <li @click="redirect(7)" class="li-our-nfts li-nft-yellow">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">50 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">17 000 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
                            </div>
                        </div>
                    </li>
                    <li @click="redirect(8)" class="li-our-nfts li-nft-green">
                        <div class="li-our-nft-wrap">
                            <div class="li-nft-img"></div>
                            <div class="li-nft-footer">
                                <div>
                                    <span class="li-nft-footer-title">{{ translatesGet("SLIDER_VALUE") }}</span>
                                    <span v-if="getPreselectedChain != 'polygon'" class="li-nft-footer-amount">100 {{ currency }}</span>
                                    <span v-else class="li-nft-footer-amount">35 000 {{ currency }}</span>
                                </div>
                                <div class="icon logo-coin"></div>
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
    export default {
        data() {
            return {
                sliderPage: 0,
                sliderTranslate: 0,
                isDown: false,
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
                        name: "BuyNFT",
                        params: { chosenPrice: price, chosenBlockchain: this.preselectedChain },
                    });
                } else if (this.preselectedChain === 137) {
                    const price = prices[this.preselectedChain][image - 1];
                    this.$router.push({
                        name: "BuyNFT",
                        params: { chosenPrice: price, chosenBlockchain: this.preselectedChain },
                    });
                }
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
                return this.preselectedChain === 56
                    ? (this.currentChain = "binance")
                    : this.preselectedChain === 137
                    ? (this.currentChain = "polygon")
                    : (this.currentChain = "binance");
            },
            currency() {
                return this.preselectedChain && this.preselectedChain === 137 ? "MATIC" : "BNB";
            },
        },
    };
</script>
