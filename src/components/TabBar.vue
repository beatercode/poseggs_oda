<template>
    <div class="tabbar">
        <nav>
            <ul class="tabbar-nav">
                <li v-if="airdropData && airdropData.isRegistered" class="tab-item" @click="showMore = false">
                    <router-link active-class="active" :to="{ name: 'Airdrop' }">
                        <span class="icon-wrap"> <i class="icon icon-ranking"> </i></span>
                        <span class="link-name">{{ translatesGet("AIRDROP") }}</span>
                    </router-link>
                </li>
                <li class="tab-item" @click="showMoreShop = !showMoreShop, showMore = false">
                    <button class="tab-more">
                        <span class="icon-wrap"> <i class="icon icon-more"> </i></span>
                        <span class="link-name">{{ "Mint" }}</span>
                    </button>
                </li>
                <li class="tab-item" @click="showMore = false, showMoreShop = false">
                    <router-link active-class="active" :to="{ name: 'Inventory' }">
                        <span class="icon-wrap"> <i class="icon icon-monitor"> </i></span>
                        <span class="link-name">{{ "Inventory" }}</span>
                    </router-link>
                </li>
                <li class="tab-item" @click="showMore = false, showMoreShop = false">
                    <router-link active-class="active" :to="{ name: 'Staking' }">
                        <span class="icon-wrap"> <i class="icon icon-box"> </i></span>
                        <span class="link-name">{{ translatesGet("STAKING") }}</span>
                    </router-link>
                </li>
                <li class="tab-item" @click="showMore = false, showMoreShop = false">
                    <router-link active-class="active" :to="{ name: 'YourStake' }">
                        <span class="icon-wrap"> <i class="icon icon-money"> </i></span>
                        <span class="link-name">{{ translatesGet("YOUR_STAKE") }}</span>
                    </router-link>
                </li>
                <li class="tab-item" @click="showMore = !showMore, showMoreShop = false">
                    <button class="tab-more">
                        <span class="icon-wrap"> <i class="icon icon-more"> </i></span>
                        <span class="link-name">{{ translatesGet("MORE") }}</span>
                    </button>
                </li>
            </ul>
        </nav>
        <div class="close-tabbar-more" v-if="showMoreShop" @click="showMoreShop = false"></div>
        <nav class="tabbar-more tabbar-more-shop" v-if="showMoreShop">
            <li class="tab-item" @click="showMoreShop = !showMoreShop">
                <router-link active-class="active" :to="{ name: 'MintNFT' }">
                    <span class="icon-wrap"> <i class="icon icon-monitor"> </i></span>
                    <span class="link-name">{{ "NFT" }}</span>
                </router-link>
            </li>
            <li class="tab-item" @click="showMoreShop = !showMoreShop">
                <router-link active-class="active" :to="{ name: 'MintLootbox' }">
                    <span class="icon-wrap"> <i class="icon icon-monitor"> </i></span>
                    <span class="link-name">{{ "Lootbox" }}</span>
                    <span class="icon-wrap icon-new"> <i class="icon icon-newtag"> </i></span>
                </router-link>
            </li>
        </nav>
        <div class="close-tabbar-more" v-if="showMore" @click="showMore = false"></div>
        <nav class="tabbar-more" v-if="showMore">
            <ul>
                <li class="tab-item" @click="showMore = !showMore">
                    <router-link active-class="active" :to="{ name: 'Boosts' }">
                        <span class="icon-wrap"> <i class="icon icon-share-symbol"> </i></span>
                        <span class="link-name">{{ translatesGet("BOOSTS") }}</span>
                    </router-link>
                </li>
                <li class="tab-item" @click="showMore = !showMore">
                    <router-link active-class="active" :to="{ name: 'Program' }">
                        <span class="icon-wrap"> <i class="icon icon-profile-2user"> </i></span>
                        <span class="link-name">{{ translatesGet("INCENTIVE_PROGRAM") }}</span>
                    </router-link>
                </li>
                <li class="tab-item" @click="showMore = !showMore">
                    <a href="https://posduck.gitbook.io/posduck-dock" target="_blank" rel="nofollow">
                        <span class="icon-wrap"> <i class="icon icon-book"> </i></span>
                        <span class="link-name">{{ translatesGet("GITBOOK") }}</span>
                    </a>
                </li>
                <!-- <li class="tab-item tab-disconnect  " @click="showMore = !showMore">
                    <button class="disconnect" @click="disconnect()">
                        <span class="icon-wrap"> <i class="icon icon-logout"></i> </span>
                        <span class="link-name">{{ translatesGet("DISCONNECT") }}</span>
                    </button>
                </li> -->
            </ul>
        </nav>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    export default {
        computed: {
            ...mapState(["airdropData"]),
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
            async disconnect() {
                const selectedWallet = window.localStorage.getItem("selectedWallet");

                if (selectedWallet === "metamask") {
                    localStorage.removeItem("address");
                    localStorage.removeItem("selectedWallet");
                    localStorage.removeItem("hideBalance");
                    location.reload();
                } else if (selectedWallet === "walletconnect") {
                    localStorage.removeItem("hideBalance");
                    await this.$root.core.killSession();
                }
            },
        },
        data() {
            return {
                lang: new MultiLang(this),
                showMoreShop: false,
                showMore: false,
            };
        },
        mounted() {
            this.lang.init();
        },
    };
</script>
