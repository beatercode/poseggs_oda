<template>
    <div>
        <!-- <timer-modal v-if="showTimer" @close="showTimer = false" /> -->
        <transfer-modal
            v-if="showTransferModal"
            nftType="Boost"
            :nft="selectedNft"
            @close="(showTransferModal = false), (selectedNft = null), (onlyData = false)"
            :onlyData="onlyData"
        />
        <main class="main-boosts">
            <div class="cab-page-name">
                <div class="h2">{{ translatesGet("BOOSTS") }}</div>
            </div>
            <div class="cab-col-wrap">
                <div class="cab-col cab-main-col">
                    <section class="cab-row" id="section-boosts-time">
                        <div class="cab-row-card">
                            <div class="cab-card-wrap boosts-card">
                                <div class="card-header">
                                    <div class="card-header-icon boost-time"></div>
                                    <div>
                                        <div class="h4">{{ translatesGet("BOOSTER_TIME") }}</div>
                                        <div class="h5">{{ translatesGet("BOOSTER_TIME_DESCR") }}</div>
                                    </div>
                                    <a
                                        class="link link-learn-more"
                                        target="_blank"
                                        rel="nofollow"
                                        href="https://posduck.gitbook.io/posduck-dock/boosts#profitability-boost"
                                    >
                                        {{ translatesGet("LEARN_MORE") }}
                                        <i class="i-arrow-right-3"></i>
                                    </a>
                                </div>
                                <div class="boosts-card-content">
                                    <div class="blocks-percent-wrap">
                                        <boost-card
                                            v-for="(plan, index) of getPlans"
                                            :key="('time', plan.id)"
                                            :id="index"
                                            :disableChildLoader="disableChildLoader"
                                            type="time"
                                            :plan="plan"
                                            @changeWalletRequest="$emit('changeWallet')"
                                            @hideUnavailBlock="unavailBlock = false"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="cab-row" id="boostprofit">
                        <div class="cab-row-card">
                            <div class="cab-card-wrap boosts-card">
                                <div class="card-header">
                                    <div class="card-header-icon boost-percent"></div>
                                    <div>
                                        <div class="h4">{{ translatesGet("BOOSTER_PROFIT") }}</div>
                                        <div class="h5">{{ translatesGet("BOOSTER_PROFIT_DESCR") }}</div>
                                    </div>
                                    <a
                                        class="link link-learn-more"
                                        target="_blank"
                                        rel="nofollow"
                                        href="https://posduck.gitbook.io/posduck-dock/boosts#staking-duration-boost"
                                    >
                                        {{ translatesGet("LEARN_MORE") }}<i class="i-arrow-right-3"></i>
                                    </a>
                                </div>
                                <div class="boosts-card-content">
                                    <div class="blocks-percent-wrap">
                                        <boost-card
                                            v-for="(plan, index) of getPlans"
                                            :key="('profit', plan.id)"
                                            :id="index"
                                            type="profit"
                                            :disableChildLoader="disableChildLoader"
                                            :plan="plan"
                                            @changeWalletRequest="$emit('changeWallet')"
                                            @hideUnavailBlock="unavailBlock = false"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="cab-row" id="section-boosts-team">
                        <div class="cab-row-card">
                            <div class="cab-card-wrap boosts-card">
                                <div class="card-header">
                                    <div class="card-header-icon boost-team"></div>
                                    <div>
                                        <div class="h4">{{ translatesGet("BOOSTER_TEAM") }}</div>
                                        <div class="h5">{{ translatesGet("BOOSTER_TEAM_DESCR") }}</div>
                                    </div>
                                    <a
                                        class="link link-learn-more"
                                        target="_blank"
                                        rel="nofollow"
                                        href="https://posduck.gitbook.io/posduck-dock/boosts#team-boost"
                                    >
                                        {{ translatesGet("LEARN_MORE") }}<i class="i-arrow-right-3"></i>
                                    </a>
                                </div>

                                <!-- TODO -->
                                <div class="boosts-card-content">
                                    <div class="blocks-percent-wrap">
                                        <boost-card
                                            :disableChildLoader="disableChildLoader"
                                            type="team"
                                            @changeWalletRequest="$emit('changeWallet')"
                                            @hideUnavailBlock="unavailBlock = false"
                                        />
                                    </div>
                                </div>
                                <div v-if="unavailBlock" class="boosts-card-content boosts-card-content-claim">
                                    <div class="h4">{{ translatesGet("YOU_HAVE_BOOSTS") }}</div>
                                    <div class="boosts-wrap">
                                        <div class="card-additional-information">
                                            <i class="icon-flash-slash"></i>
                                            <p>
                                                {{ translatesGet("BOOSTER_TEAM_UNAVAIL") }}
                                            </p>
                                            <router-link class="btn btn-claim" :to="{ name: 'Program' }">
                                                <span>{{ translatesGet("BOOSTER_TEAM_BTN") }}</span>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                                    <div class="empty-title h7" v-if="!currentBlockchain || currentBlockchain === 56">
                                        {{ translatesGet("YOUR_BOOSTS_0_DESCR_BNB") }}
                                    </div>
                                    <div class="empty-title h7" v-if="currentBlockchain === 137">{{ translatesGet("YOUR_BOOSTS_0_DESCR_MATIC") }}</div>
                                </div>
                                <div v-else class="your-boosts">
                                    <div class="your-boost-item" v-for="nft of nfts" :key="nft.attributes[3].value">
                                        <div class="block-percent-img">
                                            <div
                                                class="your-nft-img"
                                                :class="getClassImg(nft)"
                                                @click="(showTransferModal = true), (onlyData = true), (selectedNft = nft)"
                                            ></div>
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
                                            {{ nft.name.replace("lvl", "LVL") }}
                                            <div v-if="nft.type !== 'TEAM'" class="card-boost-data">
                                                <div class="boost-data-item boost-data-item-main">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                        />
                                                        <path
                                                            d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                        />
                                                    </svg>
                                                    {{ getPercent(nft)[0] }}
                                                </div>
                                            </div>
                                            <div v-else class="card-boost-data">
                                                <div class="boost-data-item boost-data-item-main">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                        />
                                                        <path
                                                            d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                        />
                                                    </svg>
                                                    {{ getPercent(nft)[0] }}
                                                </div>
                                                <div class="boost-data-item boost-data-item-main">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                        ></path>
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
                                                <button @click="(showTransferModal = true), (selectedNft = nft)" class="btn btn-transfer">
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
            </div>
        </main>
    </div>
</template>
<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    import TimerModal from "../../../components/ModalWindows/TimerModal.vue";
    import TransferModal from "../../../components/ModalWindows/TransferModal.vue";
    import BoostCard from "../../../components/BoostCard.vue";
    import conf from "../../../../config.json";
    export default {
        data() {
            return {
                boostList: 0,
                showTransferModal: false,
                selectedNft: null,
                lang: new MultiLang(this),
                onlyData: false,
                showTimer: false,
                disableChildLoader: false,
                unavailBlock: true,
                plans: {
                    56: [
                        {
                            BNB: 0.172,
                            PDT: 2000,
                            BOOST_LEVEL_PERC: 2,
                            id: 1,
                        },
                        { BNB: 0.515, PDT: 6000, BOOST_LEVEL_PERC: 5, id: 2 },
                        { BNB: 1.718, PDT: 20000, BOOST_LEVEL_PERC: 10, id: 3 },
                    ],
                    137: [
                        {
                            MATIC: 72,
                            BOOST_LEVEL_PERC: 2,
                            id: 1,
                        },
                        { MATIC: 0.215, BOOST_LEVEL_PERC: 5, id: 2 },
                        { MATIC: 720, BOOST_LEVEL_PERC: 10, id: 3 },
                    ],
                },
            };
        },
        name: "Boosts",
        components: {
            TimerModal,
            BoostCard,
            TransferModal,
        },
        methods: {
            translatesGet(key) {
                try {
                    const translations = JSON.parse(window.localStorage.getItem("interfaceTranslations"));
                    const res = translations.lang.find((el) => el.hasOwnProperty(`${key}`));
                    return res[key];
                } catch (ex) {
                    console.log(ex);
                    return this.lang.get(key);
                }
            },
            getClassImg(nft) {
                return `img-boost-${nft.attributes[0].value.toLowerCase()}-${nft.level}`;
            },
            openTimerModal(e) {
                console.log(e.target);

                e.preventDefault();
                if (!this.currentAddress || this.currentAddress === "0x0000000000000000000000000000000000000000") {
                    this.$emit("changeWallet");
                    return;
                }

                this.showTimer = true;
            },

            getPercent(nft) {
                if (nft.type === "PROFIT") {
                    return [nft.attributes[2].value];
                } else if (nft.type === "TIME") {
                    return [nft.attributes[1].value];
                } else if (nft.type === "TEAM") {
                    return [nft.attributes[1].value, nft.attributes[2].value];
                }
            },
        },
        computed: {
            ...mapState(["currentAddress", "userNftsData", "currentBlockchain", "userRefData", "userLeaderData"]),
            getPlans() {
                if (this.currentBlockchain) {
                    return this.plans[this.currentBlockchain];
                } else {
                    return this.plans[97];
                }
            },
            nfts() {
                if (
                    this.userNftsData &&
                    this.currentBlockchain &&
                    this.currentAddress &&
                    this.currentAddress !== "0x0000000000000000000000000000000000000000"
                ) {
                    const arr = this.userNftsData[this.currentBlockchain][conf[this.currentBlockchain].BOOST_NFT_CONTRACT] || [];

                    return arr.sort((a, b) => b.id - a.id);
                }
                return null;
            },
        },

        mounted() {
            this.lang.init();
        },
        watch: {
            nfts: function (newVal, oldVal) {
                if (newVal && oldVal && newVal.length !== oldVal.length) {
                    this.showLoader = false;
                    this.disableChildLoader = true;
                    if (newVal.length > oldVal.length) {
                        this.bnbAmount = "";
                        this.$store.commit("clear_notifications", []);
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `You have successfully minted your Boost NFT. Check the "Boosts" section to access it.`,
                        });
                        setTimeout(() => {
                            this.disableChildLoader = false;
                        }, 1000);
                    } else if (this.showTransferModal && newVal.length < oldVal.length) {
                        this.showTransferModal = false;
                        this.selectedNft = null;
                        this.$store.commit("clear_notifications", []);
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `Congrats! You have successfuly send the Boost NFT.`,
                        });
                    }
                }
            },
        },
    };
</script>
