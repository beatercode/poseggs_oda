<template>
    <div id="app">
        <router-view />
        <notification-list />
    </div>
</template>

<script>
import ReferralController from "../src/core/ReferralController";
import NotificationList from "./components/NotificationList.vue";
import conf from "../config.json";
import { ethers } from "ethers";
import { nftAbi } from "./assets/abi/nftAbi";
export default {
    mounted() {
        let _this = this;
        let mainChainId = 97;
        let mainnetNode = conf[mainChainId]["NODE"];
        let primaryPovider = new ethers.providers.JsonRpcProvider(mainnetNode);
        let mainContract = new ethers.Contract(conf[mainChainId].NFT_CONTRACT, nftAbi, primaryPovider).connect(primaryPovider);
        ReferralController.setReferrerAddressIfExists(this);
        setTimeout(async function init() {
            try {
                let siteInfo = await mainContract.getProjectInfo();

                const data = {
                    "97": {
                        "NFT": {
                            "totalNftsSold": Number(siteInfo.nftsSold),
                            "totalAmountSoldNft": Number(siteInfo.nftsSalesVolume) / 1e18,
                            "uniqueUsers": Number(siteInfo.uniqueUsers)
                        },
                        "STAKE": {
                            "refTotalTurnover": Number(siteInfo.mintedLoot)
                        }
                    }
                };

                _this.$store.commit("setSiteData", data);
            } catch (error) {
                setTimeout(init, 300);
            }
        }, 3000);
        window.scrollTo(0, 0);
    },
    components: { NotificationList },
};
</script>
