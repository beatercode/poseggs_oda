<template>
    <main class="main-boosts">
        <stake-pool
            v-if="selectedItem !== null"
            :selectedPlan="selectedItem"
            @close="selectedItem = null"
            :isApprovedForAll="isApprovedForAll"
            @changeWalletRequest="$emit('changeWallet')"
        />
        <div class="cab-page-name">
            <div class="h2">{{ translatesGet("STAKING") }}</div>
        </div>
        <div class="cab-col-wrap">
            <section class="cab-row">
                <div class="cab-row-card">
                    <div class="cab-card-wrap stake-card">
                        <div class="card-header">
                            <div class="card-header-icon earn-stake"></div>
                            <div>
                                <div class="h4">{{ translatesGet("STAKE") }}</div>
                                <div class="h5">{{ translatesGet("STAKE_DESCR") }}</div>
                            </div>
                            <a class="link link-learn-more" target="_blank" rel="nofollow" href="https://posduck.gitbook.io/posduck-dock/nft-staking">
                                {{ translatesGet("LEARN_MORE") }}
                                <i class="i-arrow-right-3"></i>
                            </a>
                        </div>
                        <div class="select-pool-wrap" v-if="this.conf && this.conf[this.currentBlockchain] && this.conf[this.currentBlockchain].STAKING_PLANS">
                            <div v-for="(stPlan, index) of this.conf[this.currentBlockchain].STAKING_PLANS"
                                class="pool-program program-item" :class="getStakeBgColor(index)" @click="selectedItem = index">
                                <div class="program-conditions">
                                    <div class="program-col">
                                        <span class="program-col-title">{{ translatesGet("POOL") }}-{{ getPoolTag(index) }}</span>
                                        <span class="program-col-value">{{stPlan.days}} {{ translatesGet("DAYS") }}</span>
                                    </div>
                                    <div class="program-col">
                                        <span class="program-col-title">{{ translatesGet("PROFIT_PER_PERIOD") }}</span>
                                        <span class="program-col-value">{{stPlan.perc}}%</span>
                                    </div>
                                    <div class="program-col">
                                        <span class="program-col-title">{{ translatesGet("PROFIT_PER_DAY") }}</span>
                                        <span class="program-col-value">{{stPlan.profitPerDay}}%</span>
                                    </div>
                                </div>
                                <div class="container-btn">
                                    <div v-if="selectedItem !== index" class="btn btn-select">{{ translatesGet("SELECT") }}</div>
                                    <div v-else class="btn btn-select">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.99984 0.666992C4.40817 0.666992 0.666504 4.40866 0.666504 9.00033C0.666504 13.592 4.40817 17.3337 8.99984 17.3337C13.5915 17.3337 17.3332 13.592 17.3332 9.00033C17.3332 4.40866 13.5915 0.666992 8.99984 0.666992ZM12.9832 7.08366L8.25817 11.8087C8.1415 11.9253 7.98317 11.992 7.8165 11.992C7.64984 11.992 7.4915 11.9253 7.37484 11.8087L5.0165 9.45033C4.77484 9.20866 4.77484 8.80866 5.0165 8.56699C5.25817 8.32533 5.65817 8.32533 5.89984 8.56699L7.8165 10.4837L12.0998 6.20033C12.3415 5.95866 12.7415 5.95866 12.9832 6.20033C13.2248 6.44199 13.2248 6.83366 12.9832 7.08366Z"
                                                fill="#508EEF"
                                            />
                                        </svg>
                                        {{ translatesGet("SELECTED") }}
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
    import { mapState } from "vuex";
    import conf from "../../../../config.json";
    import StakePool from "@/components/ModalWindows/StakePool.vue";

    export default {
        components: { StakePool },
        name: "Staking",
        data() {
            return {
                lang: new MultiLang(this),
                selectedItem: null,
                showStakeTab: 1,
                showLoader: false,
                tokenId: "",
                conf: conf,
                isUnstaking: false,
                isStaking: false,
                isApprovedForAll: false,
                timeOuts: [],
            };
        },
        methods: {
            scrollToElement(options) {
                const el = document.querySelector(".wrap-stake-nft");

                if (el) {
                    el.scrollIntoView(options);
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
            getImageLink(index) {
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./nft-" + (index + 1) + ".png");
            },
            getStakeBgColor(index) {
                return "egg-".concat(+index + 1);
            },
            getExpectedReward(purchasePrice) {
                const res = parseFloat(((conf[this.currentBlockchain].STAKING_PLANS[this.selectedItem].perc * purchasePrice) / 100).toFixed(4));

                return res >= 0 ? `${res} BNB` : undefined;
            },
            getPoolTag(index) {
                return index == 0 ? "XXS" : index == 1 ? "XS" : index == 2 ? "S" : index == 3 ? "M" : index == 4 ? "L" : index == 5 ? "XL" : index == 6 ? "XXL" : "XXXL"
            },
            getEarnedReward(stake) {
                const { lastWithdrawTimestamp, event_data } = stake;
                const { amount, depositTypeIdx, timestamp } = event_data;
                let hoursPassedSinceStart;
                if (lastWithdrawTimestamp > 0) {
                    hoursPassedSinceStart = Math.floor((new Date().getTime() / 1000 - lastWithdrawTimestamp) / 3600);
                } else {
                    hoursPassedSinceStart = Math.floor((new Date().getTime() / 1000 - timestamp) / 3600);
                }

                return (
                    (Number(amount) * (conf[this.currentBlockchain].STAKING_PLANS[depositTypeIdx].profitPerDay / 24) * hoursPassedSinceStart) /
                    100
                ).toFixed(6);
            },
            async stake(nft) {
                try {
                    this.isStaking = true;
                    this.tokenId = nft.tokenId;
                    this.showLoader = true;
                    let res = await this.$root.core.approve("POSDUCK", nft.tokenId);
                    if (res.wait) {
                        this.$store.commit("push_notification", {
                            type: "warning",
                            typeClass: "warning",
                            message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                        });
                        await res.wait();
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `Your transaction has been processed! Please approve access to your DuckNFT in the wallet.`,
                        });
                    } else {
                        console.log(res);
                    }

                    res = await this.$root.core.stake(nft.tokenId, this.selectedItem);
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Sending your transaction into the blockchain...`,
                    });
                    await res.wait(1);
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                    });
                    await res.wait(5);
                } catch (error) {
                    console.log(error);
                    this.showLoader = false;
                    this.isStaking = false;
                    this.tokenId = "";
                    this.$root.core.handleError(error);
                    return;
                }
            },
        },

        computed: {
            ...mapState(["userNftsData", "currentBlockchain", "currentAddress", "userStakes"]),

            stakedNfts() {
                if (this.userStakes && this.currentBlockchain && this.currentAddress && this.currentAddress !== "0x0000000000000000000000000000000000000000") {
                    const arr = this.userStakes.activeStakes || [];

                    return arr.sort((a, b) => b.timestamp - a.timestamp);
                }
                return null;
            },
            availableAndStakedNft() {
                return `${this.nfts?.length}|${this.stakedNfts?.length}`;
            },
        },
        mounted() {
            this.lang.init();
            let _this = this;
            this.showLoader = true;
            let errorCount = 0;
            const timeout = setTimeout(async function fetch() {
                try {
                    if (_this.currentAddress && _this.currentBlockchain) {
                        _this.isApprovedForAll = await _this.$root.core.isApprovedForAll(_this.currentAddress, "POSDUCK");
                        const timeout = setTimeout(fetch, 10000);
                        _this.timeOuts.push(timeout);
                    } else {
                        if (errorCount > 3) {
                            return;
                        } else {
                            errorCount++;
                            throw Error();
                        }
                    }
                } catch (error) {
                    for (let timeout of _this.timeOuts) {
                        clearTimeout(timeout);
                    }
                    const timeout = setTimeout(fetch, 200);
                    _this.timeOuts.push(timeout);
                }
            }, 300);
            this.timeOuts.push(timeout);
        },
        watch: {
            nfts: function (newVal, oldVal) {
                if (newVal && oldVal && newVal.length !== oldVal.length && this.isStaking) {
                    this.showLoader = false;
                    if (newVal.length < oldVal.length) {
                        this.$store.commit("clear_notifications", []);
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `Congrats! You have successfully staked your NFT.`,
                        });
                    }
                }
            },
            stakedNfts: function (newVal, oldVal) {
                if (newVal && oldVal && newVal.length !== oldVal.length && this.isUnstaking) {
                    this.showLoader = false;
                    if (newVal.length < oldVal.length) {
                        this.$store.commit("clear_notifications", []);
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `Congrats! You have successfully Unstaked your NFT.`,
                        });
                        this.showStakeTab = 1;
                    }
                }
            },
            selectedItem: function () {
                this.showStakeTab = 1;
                this.scrollToElement({ behavior: "smooth" });
            },
        },
    };
</script>
