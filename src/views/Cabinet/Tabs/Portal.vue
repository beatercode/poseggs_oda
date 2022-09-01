<template>
    <main class="main-boosts">
        <lead-modal v-if="showLeadModal" @close="showLeadModal = false" />
        <div class="cab-page-name">
            <div class="h2">{{ "Portal Beta" }}</div>
        </div>
        <!-- section 1 -->
        <div class="show-selected-program">
            <section class="cab-row">
                <div class="cab-row-card">
                    <div class="cab-card-wrap stake-card">
                        <div class="card-header">
                            <div style="filter: hue-rotate(316deg) invert(1);" class="card-header-icon header-game">
                            </div>
                            <div>
                                <div class="h4">{{ translatesGet("PARTNER_PROG_COMING_SOON_TITLE") }}</div>
                                <div class="h5">
                                    {{ translatesGet("PARTNER_PROG_COMING_SOON") }}
                                </div>
                            </div>
                        </div>
                        <div class="blocks-percent-wrap" style="justify-content: space-between;">
                            <img src="../../../assets/images/all/qmark.png" class="li-our-nfts nft-list-buy" style="border-radius: 8px;" />
                            <img src="../../../assets/images/all/qmark.png" class="li-our-nfts nft-list-buy" style="border-radius: 8px;" />
                            <img src="../../../assets/images/all/qmark.png" class="li-our-nfts nft-list-buy" style="border-radius: 8px;" />
                            <img src="../../../assets/images/all/qmark.png" class="li-our-nfts nft-list-buy" style="border-radius: 8px;" />
                        </div>
                    </div>
                </div>
            </section>
            <section class="cab-row">
                <div class="cab-row-card">
                    <div class="cab-card-wrap stake-card">
                        <div class="card-header" style="border-bottom: 10px;">
                            <div style="filter: hue-rotate(316deg) invert(1); border: .5px solid #515151; border-radius: 8px;" class="card-header-icon header-egg-icon">
                            </div>
                            <div>
                                <div class="h4">{{ translatesGet("REVEAL_COMING_SOON_TITLE") }}</div>
                                <div class="h5">
                                    {{ translatesGet("REVEAL_COMING_SOON") }}
                                </div>
                                <div class="h5" style="font-weight: 600; margin-top: 20px;">
                                    {{ betaReveal_Time }}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <section class="cab-row">
                <div class="cab-row-card">
                    <div class="cab-card-wrap stake-card">
                        <div class="card-header" style="border-bottom: 10px;">
                            <div style="filter: hue-rotate(316deg) invert(1);" class="card-header-icon header-beta">
                            </div>
                            <div>
                                <div class="h4">{{ translatesGet("LAUNCHER_PROG_COMING_SOON_TITLE") }}</div>
                                <div class="h5">
                                    {{ translatesGet("LAUNCHER_PROG_COMING_SOON") }}
                                </div>
                                <div class="h5" style="font-weight: 600; margin-top: 20px;">
                                    {{ betaLauncher_Time }}
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
import copiedMixin from "../../../core/mixin";
import LeadModal from "@/components/ModalWindows/LeadModal.vue";
export default {
    name: "Portal",
    components: {
        LeadModal,
    },
    data() {
        return {
            value: `${conf.REF_BASE}?ref=`,
            lang: new MultiLang(this),
            isLeaderProgram: true,
            isRefProgram: false,
            widthPercRef: 0,
            widthPercLead: 0,
            showLeadModal: false,
            showLoader: false,
            betaLauncher_Time: "",
            betaReveal_Time: "",
        };
    },
    mixins: [copiedMixin],
    methods: {
        getStats(level) {
            if (this.isLeaderProgram && (!this.currentBlockchain || this.currentBlockchain === 43114 || this.currentBlockchain === 43113)) {
                const obj = conf[this.currentBlockchain || 43114].LEAD_RULES.find((el) => el.level === level);
                return [obj.turnover, obj.referrals];
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
        addressShort(addr, upToBegin, upToLast) {
            return addr.slice(0, upToBegin) + "..." + addr.slice(addr.length - upToLast, addr.length);
        },
        short(addr) {
            return addr.slice(0, 3) + "..." + addr.slice(addr.length - 3, addr.length);
        },
        getRefLevelClass(level) {
            if (this.userRefData) {
                if (Number(this.userRefData.refLevel) > level) {
                    return "col-data-finished";
                } else if (Number(this.userRefData.refLevel) === level) {
                    return "col-data-active";
                } else {
                    return "";
                }
            }
            return "";
        },
        isClaimed(level) {
            if (this.userNftsData && this.userNftsData.length > 0) {
                // const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex((el) => el.leader_level === level);
                const index = 0;
                return index < 0 ? "" : "img-done";
            }
            return "";
        },
        avalableBoost(level) {
            if (this.currentBlockchain && this.userLeaderData && this.userNftsData && this.userNftsData.length > 0) {
                // const claimeBoostIndex = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex((el) => el.leader_level === level);
                const claimeBoostIndex = 1;
                if (level > this.userLeaderData.leaderLevel) {
                    return false;
                } else if (level <= this.userLeaderData.leaderLevel && claimeBoostIndex >= 0) {
                    return true;
                } else if (level === this.userLeaderData.leaderLevel) {
                    return true;
                }
            }
            return false;
        },
        getLeadLevelClass(level) {
            if (this.userLeaderData) {
                if (Number(this.userLeaderData.leaderLevel) > level) {
                    return "col-data-finished";
                } else if (Number(this.userLeaderData.leaderLevel) === level) {
                    return "col-data-active";
                } else if (Number(this.userLeaderData.leaderLevel === 0)) {
                    return "not-begin";
                } else {
                    return "";
                }
            }
            return "";
        },
        hasReceivedBoost(level) {
            if (this.userNftsData && this.currentAddress && this.currentBlockchain && this.userNftsData.length > 0
                && this.userNftsData[this.currentBlockchain] /* && this.userNftsData[this.currentBlockchain].claimedBoosts */) {
                // const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex((el) => el.leader_level === level);
                const index = 0;
                return index >= 0 ? "finished" : "";
            }
            return "";
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

    mounted() {
        this.lang.init();
    },
    computed: {
        ...mapState([
            "currentBlockchain",
            "currentAddress",
            "totalRegistered",
            "isRegistered",
            "userRefData",
            "userLeaderData",
            "userNftsData",
            "currency",
        ]),
        availableForClaim() {
            if (this.userRefData && this.userLeaderData && this.userNftsData && this.currentAddress && this.currentBlockchain && this.userNftsData.length > 0) {
                if (this.userRefData.isLeader === false && this.userLeaderData.isDefRef === true) {
                    return false;
                }
                let index = 0;
                if (this.userNftsData /* [this.currentBlockchain] && this.userNftsData[this.currentBlockchain].claimedBoosts */) {
                    // const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex((el) => el.leader_level === this.userLeaderData.leaderLevel);
                    index = 0;
                }

                return index < 0 ? true : false;
            }
            return false;
        },

        leaderValue() {
            if (this.userLeaderData) {
                return [this.userLeaderData.refTurnover, this.userLeaderData.referralsNumber];
            }
            return [0, 0];
        },
        teamBoosts() {
            if (
                this.userNftsData &&
                this.currentBlockchain &&
                this.currentAddress &&
                this.currentAddress !== "0x0000000000000000000000000000000000000000"
            ) {
                // const arr = this.userNftsData[this.currentBlockchain][conf[this.currentBlockchain].BOOST_NFT_CONTRACT] || [];
                // return arr.sort((a, b) => b.id - a.id);
                return this.userNftsData;
            }
            return null;
        },

        getTeamBoostImage() {
            if (this.userLeaderData && this.userLeaderData.leaderLevel) {
                return `img-boost-team-${this.userLeaderData.leaderLevel}`;
            }
            return "";
        },
        getNextTeamBoostImage() {
            if (this.userLeaderData && this.userLeaderData.leaderLevelNext) {
                return `img-boost-team-${this.userLeaderData.leaderLevelNext}`;
            }
            return "";
        },

        getRefPercent() {
            if (this.currentBlockchain && this.userRefData) {
                return conf[this.currentBlockchain].REF_RULES.find((el) => el.level === Number(this.userRefData.refLevel))?.perc;
            }
            return 0;
        },
        getUserRefTurnover() {
            if (this.userRefData && this.userRefData.refTurnover) {
                return this.userRefData.refTurnover;
            }
            return 0;
        },
        getSelectedWallet() {
            if (this.currentAddress !== "0x0000000000000000000000000000000000000000" && window.localStorage.getItem("selectedWallet") === "metamask") {
                return "icon-metamask";
            } else if (
                this.currentAddress !== "0x0000000000000000000000000000000000000000" &&
                window.localStorage.getItem("selectedWallet") === "walletconnect"
            ) {
                return "icon-wallet-connect";
            }
        },
        setReferralLink() {
            if (localStorage.getItem("address")) {
                this.value += localStorage.getItem("address");
                return this.value;
            } else {
                return "Referral link cannot be accessed. Please login to your wallet.";
            }
        },
        getSponsorFull() {
            const ref = window.localStorage.getItem("ref");
            if (!ref) return conf.DEFAULT_REFERRER;
            return ref;
        },

        getSponsor() {
            const ref = window.localStorage.getItem("ref");
            if (!ref) return this.addressShort(conf.DEFAULT_REFERRER, 5, 3);
            return this.addressShort(ref, 5, 3);
        },
        refData() {
            if (
                this.currentBlockchain &&
                this.currentAddress &&
                this.currentAddress !== "0x0000000000000000000000000000000000000000" &&
                this.userRefData &&
                this.isRegistered
            ) {
                let refObj = conf[this.currentBlockchain].REF_RULES.filter((el) => Number(el.turnover) <= Number(this.userRefData.refTurnover)).sort(
                    (a, b) => b.level - a.level
                )[0];

                if (!refObj) refObj = conf[this.currentBlockchain].REF_RULES[conf[this.currentBlockchain].REF_RULES.length - 1];

                return [refObj.level, refObj.perc, refObj.toolTip];
            }
            return [0, 0, "Open the referral program by joining the team."];
        },
    },
    async mounted() {
        let _this = this;

        let timerFn = setInterval(function () {
            let now = new Date().getTime();
            let countDownDate = Date.parse('30 Sep 2022 00:00:00 GMT');
            let timeleft = countDownDate - now;

            let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

            _this.betaLauncher_Time = days + "d " + hours + "h " + minutes + "m " + seconds + "s"

            let countDownDate_2 = Date.parse('26 Sep 2022 00:00:00 GMT');
            let timeleft_2 = countDownDate_2 - now;

            let days_2 = Math.floor(timeleft_2 / (1000 * 60 * 60 * 24));
            let hours_2 = Math.floor((timeleft_2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes_2 = Math.floor((timeleft_2 % (1000 * 60 * 60)) / (1000 * 60));
            let seconds_2 = Math.floor((timeleft_2 % (1000 * 60)) / 1000);

            _this.betaReveal_Time = days_2 + "d " + hours_2 + "h " + minutes_2 + "m " + seconds_2 + "s"
        }, 1000)

        _this.lang.init();
    },

    watch: {
        getUserRefTurnover: function (newVal, oldVal) {
            const currentLevelTurnover = conf[this.currentBlockchain].REF_RULES.find((el) => el.level === Number(this.userRefData.refLevel))?.turnover;
            const nextLevelTurnover = conf[this.currentBlockchain].REF_RULES.find((el) => el.level === Number(this.userRefData.refLevel) + 1)?.turnover;

            const perc = ((Number(newVal) * 100) / Number(nextLevelTurnover)).toFixed(2);
            this.widthPercRef = 50 + Number(perc);
        },

        leaderValue: function (newVal, oldVal) {
            if (this.currentBlockchain && this.userLeaderData) {
                const newNumberRefs = Number(newVal[1]);
                const newTurnover = Number(newVal[0]);

                const curLevelTurnover = conf[this.currentBlockchain].LEAD_RULES.find(
                    (el) => el.level === Number(this.userLeaderData.leaderLevel)
                )?.turnover;
                const nextLevelTurnover = conf[this.currentBlockchain].LEAD_RULES.find(
                    (el) => el.level === Number(this.userLeaderData.leaderLevel + 1)
                )?.turnover;

                const turnoverInSection = nextLevelTurnover - curLevelTurnover > 0 ? nextLevelTurnover - curLevelTurnover : 0;
                const myTurnoverInSection = newTurnover - curLevelTurnover > 0 ? newTurnover - curLevelTurnover : 0;

                const curLevelRefs = conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === Number(this.userLeaderData.leaderLevel))?.referrals;
                const nextLevelRefs = conf[this.currentBlockchain].LEAD_RULES.find(
                    (el) => el.level === Number(this.userLeaderData.leaderLevel + 1)
                )?.referrals;

                const refsInSection = nextLevelRefs - curLevelRefs > 0 ? nextLevelRefs - curLevelRefs : 0;
                const myRefsInSection = newNumberRefs - curLevelRefs > 0 ? newNumberRefs - curLevelRefs : 0;

                const turnoverPerc = (myTurnoverInSection / turnoverInSection) * 100;
                const referralsPerc = (myRefsInSection / refsInSection) * 100;
                const basePerc = Number(this.userLeaderData.leaderLevel) === 10 || Number(this.userLeaderData.leaderLevel) === 0 ? 0 : 50;
                const baseDivider = Number(this.userLeaderData.leaderLevel) === 0 ? 2 : 1;

                this.widthPercLead = basePerc + Math.min(turnoverPerc, referralsPerc) / baseDivider;
            }
        },
        teamBoosts: function (newVal, oldVal) {
            if (newVal && oldVal && newVal.length !== oldVal.length) {
                this.showLoader = false;
                if (newVal.length > oldVal.length) {
                    this.$store.commit("clear_notifications", []);
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `You have successfully claimed a Team Boost NFT of the available LVL. The NFT should appear in the "Your Boosts" section of the "Boosts" tab now.`,
                    });
                }
            }
        },
    },
};
</script>
