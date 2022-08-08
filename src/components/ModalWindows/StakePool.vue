<template>
    <div class="modal modal-stake">
        <div class="modal-full-close" @click="$emit('close')"></div>
        <div class="modal-wrap">
            <div class="modal-header">
                <div class="card-header">
                    <div class="card-header-icon earn-stake"></div>
                    <div>
                        <div class="h4">{{ translatesGet("STAKE") }}</div>
                        <div class="h5">{{ translatesGet("STAKE_DESCR") }}</div>
                    </div>
                </div>
                <button :disabled="showLoader" @click="$emit('close')" class="modal-btn-close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="modal-section">
                    <div class="h4">{{ translatesGet("YOUR_ST_POOL") }}:</div>
                    <div class="modal-select-pool-wrap">
                        <button v-for="(stPlan, index) of this.conf[this.currentBlockchain].STAKING_PLANS" class="select-pool-block"
                            @click="selectedPool = index" :class="{ active: selectedPool == index }">
                            <div class="title">{{ stPlan.days }} {{ translatesGet("DAYS") }}</div>
                            <div class="value">{{ stPlan.perc }}% {{ translatesGet("PROFIT") }}</div>
                        </button>
                    </div>
                </div>
                <div class="modal-section">
                    <div class="h4">{{ translatesGet("NFT_FOR_ST") }}:</div>
                    <div v-if="nfts && nfts.length > 0">
                        <div class="stake-nft-container">
                            <div v-for="nft of nfts" :key="nft.tokenId" class="stake-nft-card">
                                <div class="card-container-data">
                                    <div class="img-wrap">
                                        <div v-if="showLoader && tokenId === nft.tokenId" class="nft-load">
                                            <div class="nft-load-icon"></div>
                                        </div>
                                        <img :src="getImageLink(nft.plan)" alt="nft-img" class="your-nft-img" />
                                    </div>
                                    <div class="title">{{ translatesGet("EXPECTED_REWARD") }}:</div>
                                    <div class="stake-nft-value">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.6665 6.99967C13.6665 3.31967 10.6798 0.333008 6.99984 0.333008C3.31984 0.333007 0.33317 3.31967 0.33317 6.99967C0.33317 10.6797 3.31984 13.6663 6.99984 13.6663C10.6798 13.6663 13.6665 10.6797 13.6665 6.99967ZM6.49984 9.33301L6.49984 5.87301L5.35317 7.01967C5.15984 7.21301 4.83984 7.21301 4.6465 7.01967C4.5465 6.91967 4.49984 6.79301 4.49984 6.66634C4.49984 6.53967 4.5465 6.41301 4.6465 6.31301L6.6465 4.31301C6.83984 4.11967 7.15984 4.11967 7.35317 4.31301L9.35317 6.31301C9.5465 6.50634 9.5465 6.82634 9.35317 7.01967C9.15984 7.21301 8.83984 7.21301 8.6465 7.01967L7.49984 5.87301L7.49984 9.33301C7.49984 9.60634 7.27317 9.83301 6.99984 9.83301C6.7265 9.83301 6.49984 9.60634 6.49984 9.33301Z"
                                            />
                                        </svg>
                                        <!-- <span>{{ translatesGet("DEPENDS_ON_DAYS") }}</span> -->
                                        <span>{{ getExpectedReward(nft) }}</span>
                                    </div>
                                </div>
                                <div v-if="!canNftStakeThere(nft, selectedPool)" class="card-container-btn">
                                    <button :disabled="true" class="btn btn-stake not-enabled">{{ translatesGet("UNABLE_STAKE_HERE") }}</button>
                                </div>
                                <div v-if="!isApproved() && canNftStakeThere(nft, selectedPool)" @click="approve(nft)" class="card-container-btn">
                                    <button :disabled="showLoader" class="btn btn-stake">{{ translatesGet("APPROVE") }}</button>
                                </div>
                                <div v-if="isApproved() && canNftStakeThere(nft, selectedPool)" @click="stake(nft)" class="card-container-btn">
                                    <button :disabled="showLoader" class="btn btn-stake">{{ translatesGet("STAKE_BTN") }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="stake-nft-container-empty">
                        <div>
                            <div class="empty-icon"></div>
                            <div class="empty-title h4">{{ translatesGet("YOUR_NFTS_0_TITLE") }}</div>
                            <div class="empty-title h7" v-if="!currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97">
                                {{ translatesGet("YOUR_NFTS_0_DESCR") }}
                            </div>
                            <div class="empty-title h7" v-if="currentBlockchain === 137">
                                {{ translatesGet("YOUR_NFTS_0_DESCR_MATIC") }}
                            </div>

                            <router-link :to="{ name: 'BuyNFT' }" class="btn btn-buy-nft">{{ translatesGet("BUY_NFT") }}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import conf from "../../../config.json";
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    export default {
        name: "StakePool",
        props: ["selectedPlan", "isApprovedForAll"],
        data() {
            return {
                lang: new MultiLang(this),
                showLoader: false,
                receiverAddress: "",
                conf: conf,
                showDetails: false,
                selectedPool: +this.selectedPlan - 1,
                approvedNfts: JSON.parse(window.localStorage.getItem("approvedNftsId")) || [],
            };
        },
        methods: {
            isApproved() {
                return this.isApprovedForAll;
            },
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
            canNftStakeThere(nft, selectedPool) {
                let currPlan = nft.plan;
                return currPlan >= selectedPool;
            },
            getImageLink(index) {
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./nft-" + index + ".png");
            },
            getExpectedReward(nft) {
                let price = nft.price == 0 ? 7 : nft.price;
                const totalProfit = parseFloat((price * conf[this.currentBlockchain].STAKING_PLANS[this.selectedPool].perc) / 100).toFixed(2);
                return `${totalProfit} BUSD`;
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
            async approve(nft) {
                try {
                    this.showLoader = true;
                    this.tokenId = nft.tokenId;
                    let res = await this.$root.core.approve("POSDUCK", this.currentAddress);
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
                            message: `Transaction was confirmed! You may now stake your NFT.`,
                        });
                    }
                    this.showLoader = false;
                    this.tokenId = "";
                } catch (error) {
                    console.log(error);
                    this.showLoader = false;

                    this.tokenId = "";
                    this.$root.core.handleError(error);
                    return;
                }
            },
            async stake(nft) {
                try {
                    this.isStaking = true;
                    this.tokenId = nft.tokenId;
                    if (!this.currentAddress || this.currentAddress === "") {
                        this.isStaking = false;
                        this.$emit("changeWalletRequest");
                        return;
                    }
                    this.showLoader = true;
                    
                    //this.selectedPool = this.selectedPool == -1 ? 0 : this.selectedPool;
                    let res = await this.$root.core.stake(nft.tokenId, this.selectedPool);
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
                    await res.wait(10);
                    let previouslyApprovedNfts = JSON.parse(window.localStorage.getItem("approvedNftsId")) || [];
                    previouslyApprovedNfts = previouslyApprovedNfts.filter((el) => Number(el) !== Number(nft.tokenId));
                    this.approvedNfts = previouslyApprovedNfts;
                    window.localStorage.setItem("approvedNftsId", JSON.stringify(previouslyApprovedNfts));
                } catch (error) {
                    this.showLoader = false;
                    this.isStaking = false;
                    this.tokenId = "";
                    this.$root.core.handleError(error);
                    return;
                }
            },
        },

        created() {
            console.log("this.selectedPlan [" + this.selectedPlan + "]")
            if (!this.currentAddress || this.currentAddress === "0x0000000000000000000000000000000000000000") {
                this.$emit("close");
                this.$emit("changeWalletRequest");

                return;
            }
        },

        computed: {
            ...mapState(["userNftsData", "currentBlockchain", "currentAddress", "userStakes", "currency"]),
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
                            message: `You have successfully staked your NFT. Redirecting to the "Staked NFTs" page...`,
                        });
                        setTimeout(() => {
                            this.$router.push({ name: "YourStake" });
                        }, 3000);
                    }
                }
            },
        },
    };
</script>
