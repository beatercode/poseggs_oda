<template>
    <main>
        <div class="cab-page-name">
            <div class="h2">{{ translatesGet("YOUR_STAKE") }}</div>
        </div>
        <section class="cab-row">
            <div class="cab-row-card">
                <div class="cab-card-wrap your-stake-card">
                    <div class="card-header">
                        <div class="card-header-icon earn-buy"></div>
                        <div>
                            <div class="h4">{{ translatesGet("STAKING_DASH") }}</div>
                            <div class="h5">{{ translatesGet("STAKING_DASH_DESCR") }}</div>
                        </div>
                    </div>
                    <div class="cab-row" :class="{ 'row-binance': !currentBlockchain || currentBlockchain === 56, 'row-polygon': currentBlockchain === 137 }">
                        <div class="cab-row-card general-info-card">
                            <div class="general-card profit">
                                <div class="general-card-col">
                                    <span class="card-data-title">{{ translatesGet("TOTAL_PROFIT") }}</span>
                                    <span class="h4">{{ getTotalWithdrawn }} {{ currency }}</span>
                                </div>
                                <div class="general-card-col"></div>
                            </div>
                            <div class="general-card claim">
                                <div class="general-card-col">
                                    <span class="card-data-title">{{ translatesGet("AVAILABLE_CLAIM") }}</span>
                                    <span class="h4">{{ getAvaliableForClaim }} {{ currency }}</span>
                                </div>
                                <div v-if="getAvaliableForClaim > 0" class="general-card-col">
                                    <button :disabled="showLoader" @click="batchClaim()" class="btn btn-claim">{{ translatesGet("CLAIM_ALL") }}</button>
                                </div>
                            </div>
                            <div class="general-card reward">
                                <div class="general-card-col">
                                    <span class="card-data-title">{{ translatesGet("EXPECTED_REWARD") }}</span>
                                    <span class="h4">{{ getExpectedReward }} {{ currency }}</span>
                                </div>
                                <div class="general-card-col"></div>
                            </div>
                        </div>
                    </div>

                    <div v-if="showLoader" class="cab-row cab-row-load">
                        <div class="cab-row-card">
                            <div class="nft-load">
                                <div class="nft-load-icon"></div>
                            </div>
                        </div>
                    </div>

                    <div v-if="fullStakeDetails && fullStakeDetails.length > 0" class="general-card-stake">
                        <StakeCard
                            v-for="nft of fullStakeDetails"
                            :nft="nft"
                            :fullStakeDetails="nft"
                            :key="nft.depositIdx"
                            :boostsApplied="nft.boostEvents"
                            :disableChildLoader="disableChildLoader"
                        />
                    </div>
                    <div v-else-if="fullStakeDetails && fullStakeDetails.length === 0 && showLoader === false" class="stake-nft-container-empty">
                        <div>
                            <div class="empty-icon"></div>
                            <div class="empty-title h4">{{ translatesGet("YOUR_STAKE_0_TITLE") }}</div>
                            <div class="empty-title h7">
                                {{ translatesGet("YOUR_STAKE_0_DESCR") }}
                            </div>
                            <router-link :to="{ name: 'Staking' }" class="btn btn-buy-nft">{{ translatesGet("YOUR_STAKE_0_BTN") }}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    import conf from "../../../../config.json";
    import StakeCard from "../../../components/StakeCard.vue";

    export default {
        name: "YourStake",
        compotents: {
            StakeCard,
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
            getImageLink(nftId) {
                return `https://base.posduck.com/api/getImage?id=${nftId}&chainId=${this.currentBlockchain}&nftAddress=${conf[
                    this.currentBlockchain
                ].NFT_CONTRACT.toLowerCase()}`;
            },
            getEarnedReward(stake) {
                let timeIncrease = 0;
                let profitIncrease = 0;
                let dailyPerc = 0;
                let period;
                if (stake.boostEvents && stake.boostEvents.length) {
                    const timeBoost = stake.boostEvents.find((el) => el?.metadata?.type === "TIME");
                    const profitBoost = stake.boostEvents.find((el) => el?.metadata?.type === "PROFIT");
                    const teamBoost = stake.boostEvents.find((el) => el?.metadata?.type === "TEAM");

                    if (timeBoost) {
                        //removing % sign to get digit value

                        timeIncrease = Number(timeBoost.metadata.attributes[1].value.replace("%", ""));
                    }
                    if (profitBoost) {
                        //removing % sign to get digit value

                        profitIncrease = Number(profitBoost.metadata.attributes[2].value.replace("%", ""));
                    }

                    if (teamBoost) {
                        timeIncrease += Number(teamBoost.metadata.attributes[1].value.replace("%", ""));
                        profitIncrease += Number(teamBoost.metadata.attributes[2].value.replace("%", ""));
                    }
                }
                const stakeType = stake.event_data.depositTypeIdx;

                if (timeIncrease > 0) {
                    period = `${
                        conf[this.currentBlockchain].STAKING_PLANS[stakeType].days > 0
                            ? (
                                  Number(conf[this.currentBlockchain].STAKING_PLANS[stakeType].days) +
                                  (conf[this.currentBlockchain].STAKING_PLANS[stakeType].days * Number(timeIncrease)) / 100
                              ).toFixed(2)
                            : "Unlimited"
                    } days`;
                } else {
                    period = `${
                        conf[this.currentBlockchain].STAKING_PLANS[stakeType].days > 0
                            ? conf[this.currentBlockchain].STAKING_PLANS[stakeType].days.toFixed(2)
                            : "Unlimited"
                    } days`;
                }

                if (profitIncrease > 0) {
                    dailyPerc =
                        conf[this.currentBlockchain].STAKING_PLANS[stakeType].profitPerDay +
                        (conf[this.currentBlockchain].STAKING_PLANS[stakeType].profitPerDay * Number(profitIncrease)) / 100;
                } else {
                    dailyPerc = conf[this.currentBlockchain].STAKING_PLANS[stakeType].profitPerDay;
                }

                const { lastWithdrawTimestamp, event_data } = stake;
                const { amount, timestamp } = event_data;
                let end;
                if (stakeType > 0) {
                    end = Math.min(new Date().getTime() / 1000, timestamp + Number(period.replace("days", "")) * 24 * 3600);
                } else {
                    end = Math.floor(new Date().getTime() / 1000);
                }
                let hoursPassedSinceStart;
                if (lastWithdrawTimestamp > 0) {
                    hoursPassedSinceStart = (end - lastWithdrawTimestamp) / 3600;
                } else {
                    hoursPassedSinceStart = (end - timestamp) / 3600;
                }
                const res = (((Number(amount) * dailyPerc) / 24) * hoursPassedSinceStart) / 100;
                return res > 0 ? res.toFixed(4) : 0;
            },
            getStakingPlanData(nft) {
                let timeIncrease, profitIncrease, period, dailyPerc;
                if (nft.boostEvents && nft.boostEvents.length) {
                    const timeBoost = nft.boostEvents.find((el) => el?.metadata?.type === "TIME");
                    const profitBoost = nft.boostEvents.find((el) => el?.metadata?.type === "PROFIT");
                    const teamBoost = nft.boostEvents.find((el) => el?.metadata?.type === "TEAM");

                    if (timeBoost) {
                        //removing % sign to get digit value

                        timeIncrease = Number(timeBoost.metadata.attributes[1].value.replace("%", ""));
                    }
                    if (profitBoost) {
                        //removing % sign to get digit value

                        profitIncrease = Number(profitBoost.metadata.attributes[2].value.replace("%", ""));
                    }

                    if (teamBoost) {
                        timeIncrease += Number(teamBoost.metadata.attributes[1].value.replace("%", ""));
                        profitIncrease += Number(teamBoost.metadata.attributes[2].value.replace("%", ""));
                    }
                }
                const stakeType = nft.event_data.depositTypeIdx;

                if (timeIncrease > 0) {
                    period = `${
                        conf[this.currentBlockchain].STAKING_PLANS[stakeType].days > 0
                            ? Number(conf[this.currentBlockchain].STAKING_PLANS[stakeType].days) +
                              (conf[this.currentBlockchain].STAKING_PLANS[stakeType].days * Number(timeIncrease)) / 100
                            : "Unlimited"
                    } days`;
                } else {
                    period = `${
                        conf[this.currentBlockchain].STAKING_PLANS[stakeType].days > 0
                            ? conf[this.currentBlockchain].STAKING_PLANS[stakeType].days
                            : "Unlimited"
                    } days`;
                }

                if (profitIncrease > 0) {
                    dailyPerc =
                        conf[this.currentBlockchain].STAKING_PLANS[stakeType].profitPerDay +
                        (conf[this.currentBlockchain].STAKING_PLANS[stakeType].profitPerDay * Number(profitIncrease)) / 100;
                } else {
                    dailyPerc = conf[this.currentBlockchain].STAKING_PLANS[stakeType].profitPerDay;
                }

                const totalProfit = (Number(period.replace("days", "")) * dailyPerc).toFixed(2);
                let expectedReward;
                const size = stakeType === 0 ? "XL" : stakeType === 1 ? "S" : stakeType === 2 ? "M" : "L";
                let end;
                if (stakeType > 0) {
                    const start = Math.max(nft.timestamp, nft.lastWithdrawTimestamp);
                    end = nft.timestamp + Number(period.replace("days", "")) * 24 * 3600;

                    expectedReward = (((Number(nft.event_data.amount) * (end - start)) / 3600) * dailyPerc) / 24 / 100;
                } else {
                    //imposible to know as it depends on how  many days user staked
                    expectedReward = "";
                }
                end = new Date(end * 1000);
                return expectedReward > 0 ? Number(expectedReward).toFixed(4) : 0;
                // return expectedReward;
            },

            async batchClaim() {
                try {
                    this.showLoader = true;
                    this.isBatchClaiming = true;
                    const res = await this.$root.core.batchClaim();

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
                    await res.wait(5);
                } catch (error) {
                    console.log(error);
                    this.isBatchClaiming = false;
                    this.showLoader = false;
                    this.$root.core.handleError(error);
                    return;
                }
            },
        },
        data() {
            return {
                lang: new MultiLang(this),
                showMore: false,
                showLoader: false,
                fullStakeDetails: [],
                timeOuts: [],
                isBatchClaiming: false,
                disableChildLoader: false,
            };
        },
        computed: {
            ...mapState(["userStakes", "currentBlockchain", "currentAddress", "currency"]),
            stakedNfts() {
                if (this.userStakes && this.currentBlockchain && this.currentAddress && this.currentAddress !== "0x0000000000000000000000000000000000000000") {
                    const arr = this.userStakes.activeStakes || [];
                    return arr.sort((a, b) => b.timestamp - a.timestamp);
                }
                return null;
            },
            getTotalWithdrawn() {
                let totalWithdraw = 0;
                if (this.fullStakeDetails && this.fullStakeDetails.length) {
                    for (let i = 0; i < this.fullStakeDetails.length; i++) {
                        totalWithdraw = totalWithdraw + (Number(this.fullStakeDetails[i].rewardReceived) || 0);
                    }
                    return totalWithdraw.toFixed(4);
                }
                return "0.00";
            },
            getAvaliableForClaim() {
                let res = 0;

                if (this.fullStakeDetails && this.fullStakeDetails.length) {
                    for (let i = 0; i < this.fullStakeDetails.length; i++) {
                        res += Number(this.getEarnedReward(this.fullStakeDetails[i]));
                    }
                    return res > 0 ? res.toFixed(4) : "0.00";
                }
                return "0.00";
            },
            getExpectedReward() {
                let res = 0;
                if (this.fullStakeDetails && this.fullStakeDetails.length) {
                    for (let i = 0; i < this.fullStakeDetails.length; i++) {
                        res += Number(this.getStakingPlanData(this.fullStakeDetails[i]));
                    }
                    return res > 0 ? res.toFixed(4) : "0.00";
                }
                return "0.00";
            },
        },
        mounted() {
            this.lang.init();
            let _this = this;
            this.showLoader = true;
            let errorCount = 0;
            const timeout = setTimeout(async function fetch() {
                try {
                    if (_this.currentAddress && _this.currentAddress !== "0x0000000000000000000000000000000000000000") {
                        const newData = [];
                        if (!_this.stakedNfts) throw Error();

                        for (let nft of _this.stakedNfts) {
                            for (let i = 0; i < nft.boostEvents.length; i++) {
                                const res = await _this.$root.core.getBoostMetadata(nft.boostEvents[i].event_data.boostTokenId);
                                nft.boostEvents[i]["metadata"] = res;
                            }
                            nft.boostEvents.sort((a, b) => {
                                const aPriority = a.metadata.type === "TIME" ? 3 : a.type === "PROFIT" ? 2 : 1;
                                const bPriority = b.metadata.type === "TIME" ? 3 : b.type === "PROFIT" ? 2 : 1;

                                return bPriority - aPriority;
                            });
                            newData.push(nft);
                        }
                        _this.fullStakeDetails = newData;
                        if (!_this.isBatchClaiming) {
                            _this.showLoader = false;
                        }
                        const timeout = setTimeout(fetch, 5000);
                        _this.timeOuts.push(timeout);
                    } else {
                        if (errorCount > 3) {
                            if (!_this.isBatchClaiming) {
                                _this.showLoader = false;
                            }
                            return;
                        } else {
                            errorCount++;
                            throw Error();
                        }
                    }
                } catch (error) {
                    // console.log(error);
                    for (let timeout of _this.timeOuts) {
                        clearTimeout(timeout);
                    }
                    const timeout = setTimeout(fetch, 200);
                    _this.timeOuts.push(timeout);
                }
            }, 300);
            this.timeOuts.push(timeout);
        },
        beforeDestroy() {
            for (let timeout of this.timeOuts) {
                // console.log(timeout);
                clearTimeout(timeout);
            }
        },
        components: { StakeCard },
        watch: {
            stakedNfts: async function (newVal, oldVal) {
                try {
                    if (this.fullStakeDetails.length && newVal.length !== oldVal.length) {
                        const newData = [];
                        if (!this.stakedNfts || this.stakedNfts.length === 0) throw Error();

                        for (let nft of this.stakedNfts) {
                            for (let i = 0; i < nft.boostEvents.length; i++) {
                                const res = await this.$root.core.getBoostMetadata(nft.boostEvents[i].event_data.boostTokenId);
                                nft.boostEvents[i]["metadata"] = res;
                            }
                            newData.push(nft);
                        }
                        this.fullStakeDetails = newData;
                        if (newVal.length < oldVal.length) {
                            this.$store.commit("push_notification", {
                                type: "success",
                                typeClass: "success",
                                message: `You have successfully unstaked your DuckNFT. The NFT should appear in the "Your NFTs" section of the "Buy NFTs" tab now.`,
                            });
                            this.disableChildLoader = true;
                            setTimeout(() => {
                                this.disableChildLoader = false;
                            }, 2000);
                        }
                        this.showLoader = false;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            getAvaliableForClaim: function (newVal, oldVal) {
                if (Number(newVal) < Number(oldVal) && this.isBatchClaiming) {
                    this.showLoader = false;
                    this.batchClaim = false;
                    this.$store.commit("clear_notifications", []);
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `Congrats! You have successfully claimed your reward.`,
                    });
                }
            },
        },
    };
</script>
