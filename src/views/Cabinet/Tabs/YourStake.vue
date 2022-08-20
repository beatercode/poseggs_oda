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
                            <div class="h4" style="margin-top: 10px">{{ translatesGet("CLAIM_HOLD_BONUS") }}</div>
                            <div class="h5">{{ translatesGet("CLAIM_HOLD_BONUS_DESCR") }}</div>
                        </div>
                    </div>
                    <div class="cab-row"
                        :class="{ 'row-binance': !currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97, 'row-polygon': currentBlockchain === 137 }">
                        <div class="cab-row-card general-info-card">
                            <div class="general-card profit">
                                <div class="general-card-col">
                                    <span class="card-data-title">{{ translatesGet("TOTAL_PROFIT") }}</span>
                                    <span class="h4" style="white-space: nowrap;">{{ getTotalWithdrawn }} {{ "BUSD" /*
                                    currency */ }}</span>
                                </div>
                            </div>
                            <div class="general-card reward">
                                <div class="general-card-col">
                                    <span class="card-data-title">{{ translatesGet("EXPECTED_REWARD") }}</span>
                                    <span class="h4" style="white-space: nowrap;">{{ getExpectedReward }} {{ "BUSD" /*
                                    currency */ }}</span>
                                </div>
                            </div>
                            <div class="general-card claim">
                                <div class="general-card-col">
                                    <span class="card-data-title">{{ translatesGet("AVAILABLE_CLAIM") }}</span>
                                    <span class="h4" style="white-space: nowrap;">{{ getAvaliableForClaim }} {{ "BUSD"
                                        /* currency */
                                    }}</span>
                                </div>
                                <!--div v-if="getAvaliableForClaim > 0" class="general-card-col" style="padding-right: 0px !important;">
                                    <button :disabled="showLoader" @click="batchClaim()" class="btn btn-claim">{{
                                            translatesGet("CLAIM_ALL")
                                    }}</button>
                                </div-->
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
                        <StakeCard v-for="nft of fullStakeDetails" :nft="nft" :fullStakeDetails="nft"
                            :key="nft.depositIdx" :boostsApplied="nft.boostEvents"
                            :disableChildLoader="disableChildLoader" />
                    </div>
                    <div v-else-if="fullStakeDetails && fullStakeDetails.length === 0 && showLoader === false"
                        class="stake-nft-container-empty">
                        <div>
                            <div class="empty-icon"></div>
                            <div class="empty-title h4">{{ translatesGet("YOUR_STAKE_0_TITLE") }}</div>
                            <div class="empty-title h7">
                                {{ translatesGet("YOUR_STAKE_0_DESCR") }}
                            </div>
                            <router-link :to="{ name: 'Staking' }" class="btn btn-buy-nft">{{
                                    translatesGet("YOUR_STAKE_0_BTN")
                            }}</router-link>
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
import Web3 from "web3";
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
        getNftImage(index) {
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./nft-" + index + ".png");
        },
        getClaimableBonusLevel(stake) {
            const { Difference_In_Days } = this.getTimeSinceLastClaim(stake);
            return Difference_In_Days >= conf["CLAIM_BONUS_DATA"].days[2] 
                ? 3 : Difference_In_Days >= conf["CLAIM_BONUS_DATA"].days[1] 
                ? 2 : Difference_In_Days >= conf["CLAIM_BONUS_DATA"].days[0] 
                ? 1 : 0;
        },
        getTimeSinceLastClaim(stake) {
            let rightNow = Date.now();
            let lastClaim = (new Date(stake.lastWithdrawTimestamp * 1000)).getTime();
            return this.getTimeDifference(rightNow, lastClaim);

        },
        getTimeDifference(a, b) {
            const MIL_DAY = 1000 * 3600 * 24;
            const MIL_HOUR = 1000 * 3600;
            const MIL_MIN = 1000 * 60;
            const MIL_SEC = 1000 * 1;

            let Difference_In_Time = a - b;
            let Difference_In_Days = Math.trunc(Difference_In_Time / MIL_DAY);
            let Difference_In_Hours = Math.trunc(Difference_In_Time / MIL_HOUR) - (24 * Difference_In_Days);
            let Difference_In_Mins = Math.trunc(Difference_In_Time / MIL_MIN) - (60 * (Difference_In_Hours + (24 * Difference_In_Days)));
            let Difference_In_Secs = Math.trunc(Difference_In_Time / MIL_SEC) - (60 * (Difference_In_Mins + 60 * (Difference_In_Hours + (24 * Difference_In_Days))));

            return { Difference_In_Days, Difference_In_Hours, Difference_In_Mins, Difference_In_Secs }
        },
        getEarnedReward(stake) {

            let nft = stake;
            let timeIncrease = 0;
            let profitIncrease = 0;
            let claimBonusLevel = this.getClaimableBonusLevel(stake);
            let claimProfitIncrease = claimBonusLevel == 0 ? 0 : conf["CLAIM_BONUS_DATA"].percent[(claimBonusLevel - 1)];

            if (nft.boostEvents && nft.boostEvents.length) {
                for (let i = 0; i < nft.boostEvents.length; i++) {
                    const profitBoost = nft.boostEvents[i].boostType == 0 ? nft.boostEvents[i] : null;
                    const timeBoost = nft.boostEvents[i].boostType == 1 ? nft.boostEvents[i] : null;
                    const teamBoost = nft.boostEvents[i].boostType == 2 ? nft.boostEvents[i] : null;

                    if (timeBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                    }
                    if (profitBoost) {
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                    if (teamBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                }
            }

            let stakePlan = stake.stakePlan;

            let stakeType = conf[this.currentBlockchain].STAKING_PLANS[stakePlan];
            let dayInSec = 86400;
            let number1e4 = 10000;

            let profitPerDay = Math.round(stakeType.profitPerDay * 100);
            let termInSeconds = stakeType.days * dayInSec;
            let time = Date.now() / 1000
            let boostTimeSeconds = (timeIncrease / 100) * dayInSec;
            let endTime = stake.timestamp + termInSeconds + boostTimeSeconds;
            endTime = Math.round(time > endTime ? endTime : time);
            let eggPriceInWei = Web3.utils.toWei(String(stake.event_data.amount), 'ether');

            let reward = stake.isExpired ? 0 : eggPriceInWei * profitPerDay
                * (number1e4 + profitIncrease)
                * (endTime - stake.lastWithdrawTimestamp)
                / number1e4
                / number1e4
                / dayInSec;
            reward = reward + ((reward / 100) * claimProfitIncrease);
            reward = Number(reward / 1e18).toFixed(2);
            return reward;
        },
        logClaimableInfo(claimableInfo) {
            console.log("Claimable Info [BCHAIN] --> \neggPrice["
                + String(claimableInfo.eggPrice) + "] \ndailyPercent["
                + Number(claimableInfo.dailyPercent) + "] \nboostTime["
                + claimableInfo.boostTime + "] \nboostProfit["
                + Number(claimableInfo.boostProfit) + "] \nisExpired["
                + claimableInfo.isExpired + "] \nendTimeClaim["
                + Number(claimableInfo.endTimeClaim) + "] \nlastWithdrawalTime["
                + Number(claimableInfo.lastWithdrawalTime) + "]");
        },
        getStakingPlanData(nft) {

            let timeIncrease, profitIncrease, period, dailyPerc;
            if (nft.boostEvents && nft.boostEvents.length) {
                for (let i = 0; i < nft.boostEvents.length; i++) {
                    const profitBoost = nft.boostEvents[i].boostType == 0 ? nft.boostEvents[i] : null;
                    const timeBoost = nft.boostEvents[i].boostType == 1 ? nft.boostEvents[i] : null;
                    const teamBoost = nft.boostEvents[i].boostType == 2 ? nft.boostEvents[i] : null;

                    if (timeBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                    }
                    if (profitBoost) {
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                    if (teamBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                }
            }

            let stakePlan = nft.stakePlan;

            if (timeIncrease > 0) {
                period = `${conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days > 0
                    ? (Number(conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days) + (Number(timeIncrease) / 100))
                    : "Unlimited"
                    } DAYS`;
            } else {
                period = `${conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days > 0
                    ? conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days.toFixed(2)
                    : "Unlimited"
                    } DAYS`;
            }

            if (profitIncrease > 0) {
                dailyPerc =
                    conf[this.currentBlockchain].STAKING_PLANS[stakePlan].profitPerDay +
                    (conf[this.currentBlockchain].STAKING_PLANS[stakePlan].profitPerDay / 100 * (Number(profitIncrease) / 100));
            } else {
                dailyPerc =
                    conf[this.currentBlockchain].STAKING_PLANS[stakePlan].profitPerDay;
            }

            const totalProfit = (parseFloat(period) * dailyPerc).toFixed(2);
            let expectedReward;
            // const size = stakePlan === 0 ? "XXS" : stakePlan === 1 ? "XS" : stakePlan === 2 ? "S" : stakePlan === 3 ? "M" : stakePlan === 4 ? "L" : stakePlan === 5 ? "XL" : stakePlan === 6 ? "XXL" : "XXL";
            let pointer = 7 - stakePlan;
            const size = conf["MISC"]["poolNames"][pointer];
            let end;
            const start = Math.max(nft.timestamp, nft.lastWithdrawTimestamp);
            end = nft.timestamp + Number(period.replace("DAYS", "")) * 24 * 3600;

            expectedReward =
                (
                    (((Number(nft.event_data.amount) * (end - start)) / 3600) *
                        dailyPerc) /
                    24 /
                    100
                ).toFixed(2) > 0
                    ? (
                        (((Number(nft.event_data.amount) * (end - start)) / 3600) *
                            dailyPerc) /
                        24 /
                        100
                    ).toFixed(2)
                    : "0.0000";
            end = new Date(end * 1000);
            return expectedReward > 0 ? Number(expectedReward).toFixed(2) : 0;

            return totalProfit;
        },
        async batchClaim() {
            try {
                this.showLoader = true;
                this.isBatchClaiming = true;
                const res = await this.$root.core.batchClaim(this.fullStakeDetails.length);

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
        getStakePlaceHolderById(index) {
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./iphone13_" + (index) + ".png");
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
                // return arr.sort((a, b) => b.startTime - a.startTime);
                return arr;
            }
            return null;
        },
        getTotalWithdrawn() {
            let totalWithdraw = 0;
            if (this.fullStakeDetails && this.fullStakeDetails.length) {
                for (let i = 0; i < this.fullStakeDetails.length; i++) {
                    totalWithdraw = totalWithdraw + (Number(this.fullStakeDetails[i].rewardReceived / 1e18) || 0);
                }
                return totalWithdraw.toFixed(2);
            }
            return "0.00";
        },
        getAvaliableForClaim() {
            let res = 0;

            if (this.fullStakeDetails && this.fullStakeDetails.length) {
                for (let i = 0; i < this.fullStakeDetails.length; i++) {
                    res += Number(this.getEarnedReward(this.fullStakeDetails[i]));
                }
                return res > 0 ? res.toFixed(2) : "0.00";
            }
            return "0.00";
        },
        getExpectedReward() {
            let res = 0;
            if (this.fullStakeDetails && this.fullStakeDetails.length) {
                for (let i = 0; i < this.fullStakeDetails.length; i++) {
                    res += Number(this.getStakingPlanData(this.fullStakeDetails[i]));
                }
                return res > 0 ? res.toFixed(2) : "0.00";
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
                            message: `You have successfully unstaked your DuckNFT. The NFT should appear in the "Your NFTs" section of the "Mint NFTs" tab now.`,
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
        /*
        getAvaliableForClaim: function (newVal, oldVal) {
            try {
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
            } catch (err) {
                return;
            }
        },
        */
    },
};
</script>
