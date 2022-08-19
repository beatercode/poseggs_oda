<template>
    <main>
        <div class="cab-page-name">
            <div class="h2">{{ translatesGet("AIRDROP") }}</div>
        </div>

        <!-- <section v-if="airdropData && airdropData.isRegistered && !airdropData.isClaimed" class="cab-row">
            <div class="cab-row-card card-timer">
                <div class="cab-card-wrap cab-card-airdrop">
                    <div class="block-airdrop">
                        <div class="airdrop-title">
                            {{ translatesGet("CLAIM_TITLE_1") }}
                        </div>
                        <div class="claim-value">{{ airdropData.amount }} PDT</div>
                        <div class="h8">
                            {{ translatesGet("CLAIM_DESCR") }}
                        </div>
                        <button @click="claimTokens" :disabled="showLoader" class="btn btn-airdrop btn-dark">
                            {{ translatesGet("BTN_CLAIM") }}
                        </button>
                        <button @click="addTokenToMetaMask()" class="btn btn-airdrop btn-airdrop-metamask">
                            <span>{{ translatesGet("BTN_CLAIM_METAMASK") }}</span>
                            <div class="icon-wrap"><i class="icon-metamask"></i></div>
                        </button>
                    </div>
                </div>
            </div>
        </section> -->
        <section v-if="airdropData && airdropData.isRegistered && !airdropData.isClaimed" class="cab-row">
            <div class="cab-row-card card-timer">
                <div class="cab-card-wrap cab-card-airdrop">
                    <div class="block-airdrop">
                        <div class="airdrop-title">{{ translatesGet("CLAIM_TITLE_4") }}</div>
                        <div class="h8">
                            {{ translatesGet("CLAIM_DESCR_4") }}
                        </div>
                        <!-- You didn't participate in airdrop program, so you have nothing to claim -->
                        <a href="https://t.me/HueyALPHAEGG" target="_blank" rel="nofollow" class="btn btn-airdrop btn-dark">{{ translatesGet("BTN_WRITE") }}</a>
                    </div>
                </div>
            </div>
        </section>
        <section v-else-if="airdropData && airdropData.isRegistered && airdropData.isClaimed" class="cab-row">
            <div class="cab-row-card card-timer">
                <div class="cab-card-wrap cab-card-airdrop">
                    <div class="block-airdrop">
                        <div class="airdrop-title">{{ translatesGet("CLAIM_TITLE_2") }}</div>
                        <!-- Congrats! You have successfully claimed your airdrop reward. -->
                        <div class="h8">
                            {{ translatesGet("CLAIM_DESCR_2") }}
                        </div>
                        <div class="claim-value">{{ airdropData.amount }} PDT</div>
                        <router-link :to="{ name: 'Boosts' }" class="btn btn-airdrop btn-dark">{{ translatesGet("BUY_BOOST_AIRDROP") }}</router-link>
                    </div>
                </div>
            </div>
        </section>
        <section v-else class="cab-row">
            <div class="cab-row-card card-timer">
                <div class="cab-card-wrap cab-card-airdrop">
                    <div class="block-airdrop">
                        <div class="airdrop-title">{{ translatesGet("CLAIM_TITLE_3") }}</div>
                        <div class="h8">
                            {{ translatesGet("CLAIM_DESCR_3") }}
                        </div>
                        <!-- You didn't participate in airdrop program, so you have nothing to claim -->
                        <router-link :to="{ name: 'Boosts' }" class="btn btn-airdrop btn-dark">{{ translatesGet("BUY_BOOST_AIRDROP") }}</router-link>
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
    export default {
        name: "Airdrop",
        data() {
            return {
                lang: new MultiLang(this),
                showLoader: false,
            };
        },
        computed: {
            ...mapState(["currentBlockchain", "currentAddress", "news", "userReferrer", "leaderLevel", "airdropData"]),
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
            async addTokenToMetaMask() {
                const token = {
                    address: conf[this.currentBlockchain].ERC20_CONTRACT,
                    tag: "BUSD",
                    decimals: 18,
                    image: "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
                };
                if (window.ethereum && localStorage.getItem("selectedWallet") === "metamask") {
                    try {
                        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
                        await window.ethereum.request({
                            method: "wallet_watchAsset",
                            params: {
                                type: "ERC20",
                                options: {
                                    address: token.address,
                                    symbol: token.tag,
                                    decimals: token.decimals || 18, // The number of decimals in the token
                                    image: `https://assets.coingecko.com/coins/images/9576/small/BUSD.png`, // A string url of the token logo
                                },
                            },
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
                    try {
                        await this.$root.core.provider.provider.request({
                            method: "wallet_watchAsset",
                            params: {
                                type: "ERC20",
                                options: {
                                    address: token.address,
                                    symbol: token.tag,
                                    decimals: token.decimals || 18, // The number of decimals in the token
                                    image: `https://assets.coingecko.com/coins/images/9576/small/BUSD.png`, // A string url of the token logo
                                },
                            },
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            async claimTokens() {
                try {
                    if (this.currentAddress) {
                        this.showLoader = true;
                        const claimObject = await this.$root.core.signAmount(this.currentAddress);
                        const res = await this.$root.core.claimTokens(claimObject.signature, claimObject.amountToClaim);
                        this.$store.commit("push_notification", {
                            type: "warning",
                            typeClass: "warning",
                            message: `Placing transaction to blockchain`,
                        });
                        await res.wait(1);
                        await this.$root.core.updateAirdropStatus(this.currentAddress);
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `You have sussessfully claimed your Airdrop PDT tokens. The tokens should now appear in your crypto wallet.`,
                        });
                        this.showLoader = false;
                    }
                } catch (error) {
                    this.showLoader = false;
                    console.log(error);
                    if (error?.response?.data?.toString()?.toLowerCase() === "claim already received") {
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `You have already received a claim`,
                        });
                    }
                    if (error.toString().includes('execution reverted: Claim is already received"')) {
                        await this.$root.core.updateAirdropStatus(this.currentAddress);
                        this.$store.commit("push_notification", {
                            type: "success",
                            typeClass: "success",
                            message: `You have already received a claim`,
                        });
                        return;
                    }
                    this.$root.core.handleError(error);
                    return;
                }
            },
        },
    };
</script>
