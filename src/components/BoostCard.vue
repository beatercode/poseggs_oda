<template>
    <div v-if="type === 'profit'" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img :src="getBoostImageProfit" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_PROFIT") }} {{ plan.BOOST_LEVEL_PERC }} %</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                        />
                    </svg>
                    +{{ plan.BOOST_LEVEL_PERC + (type === 'profit' ? "%" : " days") }}
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <div class="mint-nft-block"
                style="width: 100% !important; display: flex; flex-direction: row; margin-top: 3px;">
                <div class="radio-btns-wrap">
                    <div class="input-title"
                        style="width: auto; line-height: unset; margin-top: 10px; font-size: 16px;">
                        {{ "Price" }}</div>
                    <div class="price-card-wrap"
                        style="width: 100%; text-align: right; position: relative; right: 0;">
                        <span type="number"
                            @input="disablePercWatcher = true"> {{ plan.BUSD }}
                        </span>
                        <span class="coin">BUSD</span>
                    </div>
                </div>
            </div>
            <button v-if="isApproved" class="btn btn-radio-submit" type="submit" @click.prevent="buyBoost()">{{ translatesGet("BUY") }}</button>
            <button v-if="!isApproved" class="btn btn-radio-submit" type="submit" @click.prevent="approve()">{{ translatesGet("APPROVE") }}</button>
        </div>
    </div>
    <div v-else-if="type === 'time'" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img :src="getBoostImageTime" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_TIME") }} {{ plan.BOOST_LEVEL_PERC }} days</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                        />
                        <path
                            d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                        />
                    </svg>
                    +{{ plan.BOOST_LEVEL_PERC }} days
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <div class="mint-nft-block"
                style="width: 100% !important; display: flex; flex-direction: row; margin-top: 3px;">
                <div class="radio-btns-wrap">
                    <div class="input-title"
                        style="width: auto; line-height: unset; margin-top: 10px; font-size: 16px;">
                        {{ "Price" }}</div>
                    <div class="price-card-wrap"
                        style="width: 100%; text-align: right; position: relative; right: 0;">
                        <span type="number"
                            @input="disablePercWatcher = true"> {{ plan.BUSD }}
                        </span>
                        <span class="coin">BUSD</span>
                    </div>
                </div>
            </div>
            <button v-if="isApproved" class="btn btn-radio-submit" type="submit" @click.prevent="buyBoost()">{{ translatesGet("BUY") }}</button>
            <button v-if="!isApproved" class="btn btn-radio-submit" type="submit" @click.prevent="approve()">{{ translatesGet("APPROVE") }}</button>
        </div>
    </div>
    <div v-else-if="type === 'team' && !isClaimed" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img :class="getTeamBoostImage" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span> {{ translatesGet("BOOSTER_TEAM") }} LVL {{ userLeaderData.leaderLevel }}</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                        />
                    </svg>
                    {{ getTeamBoostPercent[1] }}%
                </div>
                <div class="boost-data-item boost-data-item-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                        />
                        <path
                            d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                        />
                    </svg>
                    {{ getTeamBoostPercent[0] }}%
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <form class="form-radio">
                <br />
                <button class="btn btn-radio-submit" type="submit" @click.prevent="claimLeaderBoost()">
                    {{ translatesGet("CLAIM") }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    export default {
        name: "BoostCard",
        data() {
            return {
                lang: new MultiLang(this),
                selectedCurrency: "BNB",
                isApproved: false,
                showLoader: false,
            };
        },
        props: ["id", "type", "plan", "disableChildLoader"],
        methods: {
            checkApproved() {
                if (this.plan) {
                    let needed = this.plan["BUSD"];
                    return this.busdApprovedAmount >= needed * 1e18;
                }
            },
            async checkBusdAllowance() {
                let nftContract_Address = this.$root.core[`boostNft_${this.currentBlockchain}`].address;
                let busdContract = this.$root.core[`BUSD_${this.currentBlockchain}`]
                let res = await busdContract.allowance(this.currentAddress, nftContract_Address);
                this.busdApprovedAmount = Number(res);
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
            changeCurrency(event) {
                console.log(event.target);
            },
            async approve() {
                try {
                    this.showLoader = true;
                    let stakeContract_Address = this.$root.core[`boostNft_${this.currentBlockchain}`].address;
                    let toApprove = BigInt(this.plan["BUSD"] * 1e18);
                    let busdContract = this.$root.core[`BUSD_${this.currentBlockchain}`]
                    let res = await busdContract.approve(stakeContract_Address, toApprove);
                    if (res.wait) {
                        this.$store.commit("push_notification", {
                            type: "warning",
                            typeClass: "warning",
                            message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                        });
                        this.checkBusdAllowance();
                        await res.wait();
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `Transaction was confirmed! You may now stake your NFT.`,
                        });
                    }
                    this.showLoader = false;
                } catch (error) {
                    console.log(error);
                    this.showLoader = false;
                    this.$root.core.handleError(error);
                    return;
                }
            },
            async buyBoost() {
                try {
                    if (!this.currentAddress || this.currentAddress === "0x0000000000000000000000000000000000000000") {
                        this.$emit("changeWalletRequest");
                        return;
                    }
                    if (Number(this.userERC20Balance) < this.plan["BUSD"]) {
                        this.$store.commit("push_notification", {
                            type: "error",
                            typeClass: "error",
                            message: `Ope, you have insufficient funds. Top up your balance and try again.`,
                        });
                        return;
                    }
                    if (this.type === "profit") {
                        const type = 0;
                        this.showLoader = true;
                        const res = await this.$root.core.buyBoost(type, this.id);
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
                    } else if (this.type === "time") {
                        const type = 1;
                        this.showLoader = true;
                        const res = await this.$root.core.buyBoost(type, this.id);
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
                    }
                } catch (error) {
                    console.log(error);
                    this.showLoader = false;
                }
            },
            async claimLeaderBoost() {
                try {
                    this.showLoader = true;
                    const res = await this.$root.core.claimLeaderBoost();

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
                    this.showLoader = false;
                    this.$root.core.handleError(error);
                    return;
                }
            },
        },
        computed: {
            ...mapState([
                "currentBlockchain",
                "userCoinBalance",
                "userERC20Balance",
                "currentAddress",
                "userLeaderData",
                "userNftsData",
                "currency",
                "userRefData",
            ]),
            getBoostImageProfit() {
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./boost-percent-" + (+this.id + 1) + ".png");
            },
            getBoostImageTime() {
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./boost-time-" + (+this.id + 1) + ".png");
            },
            isClaimed() {
                if (
                    this.userRefData &&
                    this.userLeaderData &&
                    this.userNftsData &&
                    this.currentAddress &&
                    this.currentBlockchain &&
                    this.userLeaderData.leaderLevel
                ) {
                    if (this.userRefData.isLeader === false && this.userLeaderData.isDefRef === true) {
                        return true;
                    }
                    const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex(
                        (el) => el.leader_level === this.userLeaderData.leaderLevel
                    );
                    if (index < 0) {
                        this.$emit("hideUnavailBlock");
                        return false;
                    } else {
                        return true;
                    }
                }
                return true;
            },
            availableForClaim() {
                if (this.userRefData && this.userLeaderData && this.userNftsData && this.currentAddress && this.currentBlockchain) {
                    if (this.userRefData.isLeader === false && this.userLeaderData.isDefRef === true) {
                        return false;
                    }
                    const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex(
                        (el) => el.leader_level === this.userLeaderData.leaderLevel
                    );

                    if (index < 0) {
                        this.$emit("hideUnavailBlock");
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            },
            getTeamBoostImage() {
                if (this.userLeaderData && this.userLeaderData.leaderLevel) {
                    return `img-boost-team-${this.userLeaderData.leaderLevel}`;
                }
                return "";
            },
            getTeamBoostPercent() {
                if (this.userLeaderData) {
                    return [this.userLeaderData.leaderTimePerc, this.userLeaderData.leaderProfitPerc];
                }
                return [0, 0];
            },
        },
        mounted() {
            let _this = this;
            
            let i2cd = 200;
            let i2 = setInterval(function() {
                if (_this.currentBlockchain) {
                    _this.isApproved = _this.checkApproved();
                    i2cd = 10000;
                }
            }, i2cd);

            let i = setInterval(function() {
                if (_this.currentBlockchain) {
                    clearInterval(i);
                    _this.checkBusdAllowance()
                }
            }, 1000);

            this.lang.init();
            setTimeout(() => {
                if (this.currency) {
                    this.selectedCurrency = this.currency;
                }
            }, 500);
        },
        watch: {
            disableChildLoader: function (newVal) {
                if (newVal) {
                    this.showLoader = false;
                }
            },
            currentBlockchain: function (newVal, oldVal) {
                if (newVal === 56) {
                    this.selectedCurrency = "BNB";
                } else if (newVal === 137) {
                    this.selectedCurrency = "MATIC";
                }
            },
        },
    };
</script>
