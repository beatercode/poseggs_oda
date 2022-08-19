<template>
    <div id="app">
        <router-view />
        <notification-list />
    </div>
</template>

<script>
import ReferralController from "../src/core/ReferralController";
import NotificationList from "./components/NotificationList.vue";
import Config from "../config.json";
export default {
    mounted() {
        let _this = this;
        ReferralController.setReferrerAddressIfExists(this);
        setTimeout(async function init() {
            try {
                // const res = await fetch(`${Config.BASE_URL}/getSiteStats?chainIds[]=56&chainIds[]=137`);
                // const data = await res.json();
                const data = { 
                    "56": { 
                        "NFT": { 
                            "totalNftsSold": 15, 
                            "totalAmountSoldNft": 1222, 
                            "uniqueUsers": 2 
                            }, 
                        "STAKE": { 
                            "refTotalTurnover": 213 
                            }
                        }, 
                    "97": { 
                        "NFT": { 
                            "totalNftsSold": 15, 
                            "totalAmountSoldNft": 1241122, 
                            "uniqueUsers": 2 
                            }, 
                        "STAKE": { 
                            "refTotalTurnover": 23423
                            }
                        }
                    };

                _this.$store.commit("setSiteData", data);
            } catch (error) {
                setTimeout(init, 300);
            }
        }, 1000);
        window.scrollTo(0, 0);
    },
    components: { NotificationList },
};
</script>
