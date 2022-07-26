<template>
    <div class="modal modal-leader">
        <div class="modal-full-close" @click="$emit('close')"></div>
        <div class="modal-wrap">
            <div class="modal-header">
                <div class="card-header">
                    <div class="card-header-icon header-crown"></div>
                    <div>
                        <div class="h4">{{ translatesGet("MODAL_LEAD_TITLE") }}</div>
                        <div v-if="!userLeaderData.isDefRef" class="h5">
                            {{ translatesGet("MODAL_LEAD_DESC_1") }}
                        </div>
                        <div v-else class="h5">{{ translatesGet("MODAL_LEAD_DESC_2") }}</div>
                    </div>
                </div>
                <button @click="$emit('close')" class="modal-btn-close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="modal-content modal-content-leader">
                <div v-if="userLeaderData.isDefRef" class="modal-section">
                    <div class="h4">{{ translatesGet("MODAL_LEAD_SECTION_TITLE_1_2") }}</div>
                    <div
                        v-if="userLeaderData && !userLeaderData.isDefRef && userRefData.referrer !== '0x0000000000000000000000000000000000000000'"
                        class="wrap-sponsor"
                    >
                        <div class="title-sponsor">
                            {{ translatesGet("MODAL_LEAD_LINK_1") }}
                        </div>
                        <a :href="`https://bscscan.com/address/${userRefData ? userRefData.referrer : ''}`" target="_blank"
                            ><div class="link-sponsor">{{ addressShort(userRefData ? userRefData.referrer : "", 5, 3) }} <i class="icon-share"></i></div
                        ></a>
                    </div>
                    <div class="modal-lead-wrap">
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_1_1") }}</div>
                                <div class="value">{{ userLeaderData && userLeaderData.leaderLevel + 1 }}</div>
                            </div>
                        </div>
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_1_2") }}</div>
                                <div class="value">{{ getLeadDataForNextLevel[0] }}</div>
                            </div>
                        </div>
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_1_3") }}</div>
                                <div class="value">{{ getLeadDataForNextLevel[1] }} {{ currency }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="modal-section">
                    <div class="h4">{{ translatesGet("MODAL_LEAD_SECTION_TITLE_1_1") }}</div>
                    <div
                        v-if="userLeaderData && !userLeaderData.isDefRef && userRefData.referrer !== '0x0000000000000000000000000000000000000000'"
                        class="wrap-sponsor"
                    >
                        <div class="title-sponsor">
                            {{ translatesGet("MODAL_LEAD_LINK_1") }}
                        </div>
                        <a :href="`https://bscscan.com/address/${userRefData ? userRefData.referrer : ''}`" target="_blank"
                            ><div class="link-sponsor">{{ addressShort(userRefData ? userRefData.referrer : "", 5, 3) }} <i class="icon-share"></i></div
                        ></a>
                    </div>
                    <div class="modal-lead-wrap">
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_1_1") }}</div>
                                <div class="value">{{ userLeaderData && userLeaderData.leaderLevel }}</div>
                            </div>
                        </div>
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_1_2") }}</div>
                                <div class="value">{{ userLeaderData && userLeaderData.referralsNumber }}</div>
                            </div>
                        </div>
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_1_3") }}</div>
                                <div class="value">{{ userLeaderData && userLeaderData.refTurnover }} {{ currency }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-section">
                    <div v-if="userLeaderData && userLeaderData.isDefRef" class="h4">{{ translatesGet("MODAL_LEAD_SECTION_TITLE_2_2") }}</div>
                    <div v-else class="h4">{{ translatesGet("MODAL_LEAD_SECTION_TITLE_2_1") }}</div>
                    <div v-if="userLeaderData && !userLeaderData.isDefRef" class="wrap-sponsor">
                        <div class="title-sponsor">{{ translatesGet("MODAL_LEAD_LINK_2") }}</div>
                        <a :href="`https://bscscan.com/address/${currentAddress}`" target="_blank"
                            ><div class="link-sponsor">{{ addressShort(currentAddress, 5, 3) }} <i class="icon-share"></i></div
                        ></a>
                    </div>
                    <div class="modal-lead-wrap">
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_2_1") }}</div>
                                <div class="value">{{ userLeaderData && userLeaderData.leaderLevel }}</div>
                            </div>
                        </div>
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_2_2") }}</div>
                                <div class="value">{{ userRefData && userRefData.referralsNumber }}</div>
                            </div>
                        </div>
                        <div class="modal-lead-block">
                            <div class="col">
                                <div class="card-data-title">{{ translatesGet("MODAL_LEAD_BLOCK_2_3") }}</div>
                                <div class="value">{{ userRefData && userRefData.refTurnover }} {{ currency }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="userRefData && !userRefData.mayBecomeLeader && !userLeaderData.isDefRef" class="modal-section">
                    {{ translatesGet("MODAL_LEAD_WARN_1") }}
                </div>
                <div v-else-if="userRefData && userRefData.mayBecomeLeader && !userLeaderData.isDefRef" class="modal-section">
                    {{ translatesGet("MODAL_LEAD_WARN_2") }}
                </div>
                <div v-if="userLeaderData && userLeaderData.isDefRef" class="modal-section">{{ translatesGet("MODAL_LEAD_WARN_3") }}</div>

                <div class="modal-footer">
                    <button :disabled="userRefData && !userRefData.mayBecomeLeader" class="btn btn-become-lead" @click="claimLeadership()">
                        {{ translatesGet("MODAL_LEAD_MAIN_BTN") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    import conf from "../../../config.json";
    export default {
        data() {
            return {
                lang: new MultiLang(this),
                showLoader: false,
            };
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

            async claimLeadership() {
                try {
                    this.showLoader = true;
                    const res = await this.$root.core.claimLeadership();

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
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `Congrats, you have successfuly become your team's leader! 🎉 Way to go!`,
                    });
                } catch (error) {
                    this.$root.core.handleError(error);
                    this.showLoader = false;
                }
            },

            addressShort(addr, upToBegin, upToLast) {
                return addr.slice(0, upToBegin) + "..." + addr.slice(addr.length - upToLast, addr.length);
            },
        },
        created() {},
        computed: {
            ...mapState(["userRefData", "userLeaderData", "currentAddress", "currentBlockchain", "currency"]),
            getLeadDataForNextLevel() {
                if (this.currentBlockchain && this.userLeaderData) {
                    const nextLevelObj = conf[this.currentBlockchain].LEAD_RULES.find((el) => el.level === this.userLeaderData.leaderLevel + 1);
                    return [nextLevelObj.referrals, nextLevelObj.turnover];
                }
                return [0, 0];
            },
        },
        watch: {},
    };
</script>
