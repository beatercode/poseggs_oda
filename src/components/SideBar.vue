<template>
    <div class="sidebar">
        <div class="logo-wrap">
            <router-link to="/" class="logo"></router-link>
        </div>
        <nav>
            <ul class="sidebar-nav">
                <li v-if="airdropData && airdropData.isRegistered">
                    <router-link active-class="active" :to="{ name: 'Airdrop' }">
                        <span class="icon-wrap"> <i class="icon icon-ranking"> </i></span>
                        <span class="link-name">{{ translatesGet("AIRDROP") }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{ name: 'MintNFT' }">
                        <span class="icon-wrap"> <i class="icon icon-monitor"> </i></span>
                        <span class="link-name">{{ "Mint NFT" }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{ name: 'MintLootbox' }">
                        <span class="icon-wrap"> <i class="icon icon-monitor"> </i></span>
                        <span class="link-name">{{ "Mint Lootbox" }}</span>
                        <span class="icon-wrap icon-new"> <i class="icon icon-newtag"> </i></span>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{ name: 'Inventory' }">
                        <span class="icon-wrap"> <i class="icon icon-monitor"> </i></span>
                        <span class="link-name">{{ "Inventory" }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{ name: 'Staking' }">
                        <span class="icon-wrap"> <i class="icon icon-box"> </i></span>
                        <span class="link-name">{{ translatesGet("STAKING") }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{ name: 'YourStake' }">
                        <span class="icon-wrap"> <i class="icon icon-money"> </i></span>
                        <span class="link-name">{{ translatesGet("YOUR_STAKE") }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{ name: 'Boosts' }">
                        <span class="icon-wrap"> <i class="icon icon-share-symbol"> </i></span>
                        <span class="link-name">{{ translatesGet("BOOSTS") }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{ name: 'Program' }">
                        <span class="icon-wrap"> <i class="icon icon-profile-2user"> </i></span>
                        <span class="link-name">{{ translatesGet("INCENTIVE_PROGRAM") }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="sidebar-block">
            <a href="https://eggroi.gitbook.io/eggroi-dock" target="_blank" rel="nofollow">
                <span class="icon-wrap"> <i class="icon icon-book"> </i></span>
                <span class="link-name">{{ translatesGet("GITBOOK") }}</span>
            </a>
            <button class="disconnect" @click="disconnect()">
                <span class="icon-wrap"> <i class="icon icon-logout"></i> </span>
                <span class="name">{{ translatesGet("DISCONNECT") }}</span>
            </button>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    export default {
        data() {
            return { lang: new MultiLang(this) };
        },
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
        mounted() {
            this.lang.init();
        },
    };
</script>
