<template>
    <main class="main-boosts">
        <lead-modal v-if="showLeadModal" @close="showLeadModal = false" />
        <div class="cab-page-name">
            <div class="h2">{{ translatesGet("INCENTIVE_PROGRAM") }}</div>
        </div>
        <!-- section 1 -->
        <section class="cab-row">
            <div class="cab-row-card section-wrap-blocks">
                <div class="section-block-switcher">
                    <div class="switcher">
                        <button class="btn-switcher" :class="{ active: isLeaderProgram }" @click="(isRefProgram = false), (isLeaderProgram = true)">
                            {{ translatesGet("LEADERSHIP") }}
                        </button>
                        <button class="btn-switcher" :class="{ active: isRefProgram }" @click="(isRefProgram = true), (isLeaderProgram = false)">
                            {{ translatesGet("REFERRAL") }}
                        </button>
                    </div>
                </div>
                <div v-if="currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000'" class="section-block-end">
                    <div class="copy-ref-link-title">{{ translatesGet("COPY_REF_LINK") }}</div>
                    <div class="copy-ref-link">
                        <div class="ref-link">{{ setReferralLink }}</div>
                        <button
                            v-clipboard="setReferralLink"
                            v-clipboard:success="copySuccess"
                            v-clipboard:error="copyFailed"
                            class="btn btn-copy-ref btn-light"
                        >
                            {{ buttonText }}
                        </button>
                    </div>
                    <div v-if="userRefData && userRefData.referrer != '0x0000000000000000000000000000000000000000'" class="wrap-sponsor">
                        <div class="title-sponsor">{{ translatesGet("YOUR_SPONSOR") }}</div>
                        <a :href="`https://bscscan.com/address/${userRefData ? userRefData.referrer : ''}`" target="_blank"
                            ><div class="link-sponsor">{{ addressShort(userRefData ? userRefData.referrer : "", 5, 3) }} <i class="icon-share"></i></div
                        ></a>
                    </div>
                    <button
                        v-clipboard="setReferralLink"
                        v-clipboard:success="copySuccess"
                        v-clipboard:error="copyFailed"
                        class="btn btn-copy-ref btn-copy-ref-mobile btn-light"
                    >
                        {{ buttonText }}
                    </button>
                </div>
            </div>
        </section>
        <!-- section 2 -->
        <section class="cab-row" :class="{ 'row-binance': !currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97, 'row-polygon': currentBlockchain === 137 }">
            <div class="cab-row-card general-info-card general-info-card-program">
                <div class="general-card team">
                    <div class="general-card-col">
                        <span class="card-data-title">{{ translatesGet("STRUCTURE_USERS") }}</span>
                        <span class="h4">{{ userRefData && userRefData.referralsNumber > 0 ? userRefData.referralsNumber : 0 }}</span>
                    </div>
                    <div class="general-card-col"></div>
                </div>
                <div class="general-card percent">
                    <div class="general-card-col">
                        <span class="card-data-title">{{ translatesGet("STRUCTURE_PERCENT") }}</span>
                        <span class="h4"
                            >{{ userRefData && userRefData.refTurnover > 0 ? Number(userRefData.refTurnover).toFixed(2) : "0.00" }} {{ currency }}</span
                        >
                    </div>
                    <div class="general-card-col"></div>
                </div>
                <div class="general-card lvl">
                    <div class="general-card-col">
                        <span class="card-data-title">{{ translatesGet("STRUCTURE_LVL") }}</span>
                        <span class="h4">{{ getRefPercent }} %</span>
                    </div>
                    <div class="general-card-col"></div>
                </div>
                <div class="general-card turnover">
                    <div class="general-card-col">
                        <span class="card-data-title">{{ translatesGet("STRUCTURE_TURNOVER") }}</span>
                        <span class="h4">{{ userRefData && userRefData.bonus > 0 ? Number(userRefData.bonus).toFixed(2) : "0.00" }} {{ currency }}</span>
                    </div>
                    <div class="general-card-col"></div>
                </div>
            </div>
        </section>
        <!-- section 3 -->
        <div class="show-selected-program" v-if="isLeaderProgram == true && isRefProgram == false">
            <section class="cab-row">
                <div class="cab-row-card">
                    <div class="cab-card-wrap stake-card">
                        <div class="card-header">
                            <div class="card-header-icon header-crown"></div>
                            <div>
                                <div class="h4">{{ translatesGet("LEAD_PROG") }}</div>
                                <div class="h5">{{ translatesGet("LEAD_PROG_DESCR") }}</div>
                            </div>
                            <button v-if="userRefData && !userRefData.isLeader" @click="showLeadModal = true" class="btn btn-become btn-light">
                                {{ translatesGet("BECOME_LEAD") }}
                            </button>
                            <button
                                v-else-if="
                                    currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000' && userRefData && userRefData.isLeader
                                "
                                disabled
                                class="btn btn-leader"
                            >
                                {{ translatesGet("YOU_ARE_LEAD") }}
                            </button>
                        </div>
                        <div class="section-row-reward" v-if="currentAddress && currentAddress !== '0x0000000000000000000000000000000000000000'">
                            <div v-if="userLeaderData && userLeaderData.leaderLevel === 0" class="block-reward block-reward-link">
                                <div class="block-reward-header">{{ translatesGet("REWARD_LINK") }}</div>
                                <div class="copy-ref-link-title">{{ translatesGet("COPY_REF_LINK") }}</div>
                                <div class="copy-ref-link">
                                    <div class="ref-link">{{ setReferralLink }}</div>
                                    <button
                                        v-clipboard="setReferralLink"
                                        v-clipboard:success="copySuccess"
                                        v-clipboard:error="copyFailed"
                                        class="btn btn-copy-ref btn-light"
                                    >
                                        {{ buttonText }}
                                    </button>
                                </div>
                            </div>
                            <div v-else-if="userLeaderData && userLeaderData.leaderLevel > 0" class="block-reward">
                                <div class="block-reward-header">
                                    {{ translatesGet("REWARD_AVAILABLE") }}
                                    <button v-if="availableForClaim" @click="claimLeaderBoost()" class="btn btn-light">
                                        {{ translatesGet("GO_TO_CLAIM") }}
                                    </button>
                                </div>
                                <div class="reward-boost-wrap" :class="isClaimed(userLeaderData && userLeaderData.leaderLevel)">
                                    <div class="img-wrap" :class="isClaimed(userLeaderData && userLeaderData.leaderLevel)">
                                        <img :class="getTeamBoostImage" />
                                    </div>
                                    <div class="data-wrap">
                                        <div class="title">
                                            {{ translatesGet("BOOSTER_TEAM") }} LVL
                                            {{ userLeaderData && userLeaderData.leaderLevel ? userLeaderData.leaderLevel : 0 }}
                                        </div>
                                        <div class="card-boost-data">
                                            <div class="boost-data-item boost-data-item-7">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                    />
                                                </svg>
                                                {{ userLeaderData && userLeaderData.leaderProfitPerc ? "+" + userLeaderData.leaderProfitPerc : "0" }}%
                                            </div>
                                            <div class="boost-data-item boost-data-item-7">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                    />
                                                    <path
                                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                    />
                                                </svg>
                                                {{ userLeaderData && userLeaderData.leaderTimePerc > 0 ? "+" + userLeaderData.leaderTimePerc : "0" }}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="userLeaderData && userLeaderData.leaderLevel < 10" class="block-reward">
                                <div class="block-reward-header">{{ translatesGet("REWARD_NEXT") }}</div>
                                <div class="reward-boost-wrap">
                                    <div class="img-wrap" :class="isClaimed(userLeaderData && userLeaderData.leaderLevel + 1)">
                                        <img :class="getNextTeamBoostImage" />
                                    </div>
                                    <div class="data-wrap">
                                        <div class="title">
                                            {{ translatesGet("BOOSTER_TEAM") }}
                                            LVL
                                            {{ userLeaderData && userLeaderData.leaderLevelNext ? userLeaderData.leaderLevelNext : 0 }}
                                        </div>
                                        <div class="card-boost-data">
                                            <div class="boost-data-item boost-data-item-8">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                    />
                                                </svg>
                                                {{
                                                    userLeaderData && userLeaderData.leaderProfitPercNext > 0 ? "+" + userLeaderData.leaderProfitPercNext : "1"
                                                }}%
                                            </div>
                                            <div class="boost-data-item boost-data-item-8">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                    />
                                                    <path
                                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                    />
                                                </svg>
                                                {{ userLeaderData && userLeaderData.leaderTimePercNext > 0 ? "+" + userLeaderData.leaderTimePercNext : "0" }}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-else-if="
                                    currentAddress &&
                                    currentAddress !== '0x0000000000000000000000000000000000000000' &&
                                    userLeaderData &&
                                    userLeaderData.leaderLevel === 10
                                "
                                class="block-reward block-reward-inactive"
                            >
                                <div class="block-reward-header">
                                    {{ translatesGet("REWARD_INACTIVE") }}
                                </div>
                                <div class="h7">
                                    {{ translatesGet("REWARD_INACTIVE_DESCR") }}
                                </div>
                            </div>
                        </div>

                        <div class="section-row-structure">
                            <div class="structure-header">
                                <div class="h4">{{ translatesGet("PROGRESS_LEAD_TITLE") }}</div>
                                <div v-if="userLeaderData && userLeaderData.isDefRef === false" class="h5">{{ translatesGet("PROGRESS_LEAD_DESCRIBE_1") }}</div>
                                <div v-else class="h5">{{ translatesGet("PROGRESS_LEAD_DESCRIBE_2") }}</div>
                            </div>
                            <div class="structure-main-data">
                                <div class="col">
                                    <div class="h7">{{ translatesGet("STRUCTURE_ROW_NAME_3") }}</div>
                                    <div class="value">{{ userLeaderData && userLeaderData.referralsNumber ? userLeaderData.referralsNumber : "0" }}</div>
                                </div>
                                <div class="col">
                                    <div class="h7">{{ translatesGet("TEAM_TURNOVER") }}</div>
                                    <div class="value">
                                        {{ userLeaderData && userLeaderData.refTurnover ? Number(userLeaderData.refTurnover).toFixed(2) : "0.00" }}
                                        {{ currency }}
                                    </div>
                                </div>
                            </div>
                            <div class="structure-table structure-table-lead">
                                <div class="structure-table-col structure-table-col-name">
                                    <div class="structure-row structure-row-text structure-row-text-lvl">
                                        <span>{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span>
                                        <span class="lvl-short">{{ translatesGet("STRUCTURE_ROW_NAME_1_SHORT") }}</span>
                                    </div>
                                    <div class="structure-row structure-row-text">{{ currency }} {{ translatesGet("STRUCTURE_ROW_NAME_2") }}</div>
                                    <div class="structure-row structure-row-text">{{ translatesGet("STRUCTURE_ROW_NAME_3") }}</div>
                                    <div class="structure-row structure-row-progress">{{ translatesGet("STRUCTURE_ROW_NAME_4") }}</div>
                                    <div class="structure-row structure-row-img">{{ translatesGet("STRUCTURE_ROW_NAME_5") }}</div>
                                </div>
                                <div class="structure-table-col structure-table-col-data">
                                    <div class="col-data" :class="getLeadLevelClass(1)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 1
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(1)[0] }}</div>
                                        <div class="structure-row structure-row-text">{{ getStats(1)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(1) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(1) === 'col-data-finished'
                                                                ? '100%'
                                                                : getLeadLevelClass(1) === 'not-begin'
                                                                ? `${widthPercLead}%`
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(1)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(1)">
                                                <img src="@/assets/images/all/boost-1.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-1.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(2)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 2
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(2)[0] }}</div>
                                        <div class="structure-row structure-row-text">{{ getStats(2)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(2) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(2) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(2)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(2)">
                                                <img src="@/assets/images/all/boost-2.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-2.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(3)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 3
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(3)[0] }}</div>
                                        <div class="structure-row structure-row-text">{{ getStats(3)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(3) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(3) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(3)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(3)">
                                                <img src="@/assets/images/all/boost-3.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-3.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(4)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 4
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(4)[0] }}</div>
                                        <div class="structure-row structure-row-text">{{ getStats(4)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(4) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(4) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(4)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(4)">
                                                <img src="@/assets/images/all/boost-4.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-4.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(5)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 5
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(5)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(5)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(5) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(5) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(5)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(5)">
                                                <img src="@/assets/images/all/boost-5.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-5.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(6)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 6
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(6)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(6)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(6) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(6) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(6)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(6)">
                                                <img src="@/assets/images/all/boost-6.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-6.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(7)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 7
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(7)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(7)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(7) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(7) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(7)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(7)">
                                                <img src="@/assets/images/all/boost-7.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-7.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(8)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 8
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(8)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(8)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(8) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(8) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(8)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(8)">
                                                <img src="@/assets/images/all/boost-8.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-8.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(9)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 9
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(9)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(9)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(9) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(9) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(9)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(9)">
                                                <img src="@/assets/images/all/boost-9.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-9.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                    <div class="col-data" :class="getLeadLevelClass(10)">
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 10
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(10)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">{{ getStats(10)[1] }}</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-bar-value"
                                                    :style="{
                                                        '--progressValue':
                                                            getLeadLevelClass(10) === 'col-data-active'
                                                                ? `${widthPercLead}%`
                                                                : getLeadLevelClass(10) === 'col-data-finished'
                                                                ? '100%'
                                                                : '0%',
                                                    }"
                                                ></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                        <div v-if="avalableBoost(10)" class="structure-row structure-row-img">
                                            <div class="structure-img-wrap" :class="isClaimed(10)">
                                                <img src="@/assets/images/all/boost-10.png" alt="" class="" />
                                            </div>
                                        </div>
                                        <div v-else class="structure-row structure-row-img">
                                            <div class="structure-img-wrap"><img src="@/assets/images/all/boost-inactive-10.png" alt="" class="" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="show-selected-program" v-else>
            <section class="cab-row">
                <div class="cab-row-card">
                    <div class="cab-card-wrap stake-card">
                        <div class="card-header">
                            <div class="card-header-icon earn-referral"></div>
                            <div>
                                <div class="h4">{{ translatesGet("REF_PROG") }}</div>
                                <div class="h5">
                                    {{
                                        !currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97
                                            ? translatesGet("REF_PROG_DESCR")
                                            : translatesGet("REF_PROG_DESCR_POLYGON")
                                    }}
                                </div>
                            </div>
                        </div>
                        <div class="section-row-structure">
                            <div class="structure-header">
                                <div class="h4">{{ translatesGet("PROGRESS_REF_TITLE") }}</div>
                                <div class="h5">
                                    {{
                                        !currentBlockchain || currentBlockchain === 56 || currentBlockchain === 97
                                            ? translatesGet("PROGRESS_REF_DESCRIBE_1")
                                            : translatesGet("PROGRESS_REF_DESCRIBE_1_POLYGON")
                                    }}
                                </div>
                            </div>
                            <div class="structure-table structure-table-ref">
                                <div class="structure-table-col structure-table-col-name">
                                    <div class="structure-row structure-row-text structure-row-text-lvl">
                                        <span>{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span>
                                        <span class="lvl-short">{{ translatesGet("STRUCTURE_ROW_NAME_1_SHORT") }}</span>
                                    </div>
                                    <div class="structure-row structure-row-text">{{ currency }} {{ translatesGet("STRUCTURE_ROW_NAME_2") }}</div>
                                    <div class="structure-row structure-row-text">{{ translatesGet("STRUCTURE_ROW_NAME_6") }}</div>
                                    <div class="structure-row structure-row-progress">{{ translatesGet("STRUCTURE_ROW_NAME_4") }}</div>
                                </div>
                                <div class="structure-table-col structure-table-col-data">
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(1)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(1) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(1) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 1
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(1)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">5%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(2)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(2) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(2) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 2
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(2)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">7%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(3)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(3) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(3) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 3
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(3)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">9%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(4)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(4) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(4) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 4
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(4)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">11%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(5)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(5) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(5) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 5
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(5)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">14%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(6)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(6) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(6) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 6
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(6)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">16%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(7)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(7) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(7) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 7
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(7)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">18%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-data"
                                        :class="getRefLevelClass(8)"
                                        :style="{
                                            '--progressValue':
                                                getRefLevelClass(8) === 'col-data-active'
                                                    ? `${widthPercRef}%`
                                                    : getRefLevelClass(8) === 'col-data-finished'
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    >
                                        <div class="structure-row structure-row-text">
                                            <span class="row-lvl">{{ translatesGet("STRUCTURE_ROW_NAME_1") }}</span> 8
                                        </div>
                                        <div class="structure-row structure-row-text">
                                            {{ getStats(8)[0] }}
                                        </div>
                                        <div class="structure-row structure-row-text">20%</div>
                                        <div class="structure-row structure-row-progress">
                                            <div class="progress-bar">
                                                <div class="progress-bar-value"></div>
                                                <div class="progress-bar-container"></div>
                                            </div>
                                        </div>
                                    </div>
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
        name: "Program",
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
            };
        },
        mixins: [copiedMixin],
        methods: {
            getStats(level) {
                if (this.isLeaderProgram && (!this.currentBlockchain || this.currentBlockchain === 56 || this.currentBlockchain === 97)) {
                    const obj = conf[this.currentBlockchain || 56].LEAD_RULES.find((el) => el.level === level);
                    return [obj.turnover, obj.referrals];
                } else if (this.isRefProgram && (!this.currentBlockchain || this.currentBlockchain === 56 || this.currentBlockchain === 97)) {
                    const obj = conf[this.currentBlockchain || 56].REF_RULES.find((el) => el.level === level);
                    return [obj.turnover, obj.referrals];
                } else if (this.isLeaderProgram && (!this.currentBlockchain || this.currentBlockchain === 137)) {
                    const obj = conf[this.currentBlockchain || 56].LEAD_RULES.find((el) => el.level === level);
                    return [obj.turnover, obj.referrals];
                } else if (this.isRefProgram && (!this.currentBlockchain || this.currentBlockchain === 137)) {
                    const obj = conf[this.currentBlockchain || 56].REF_RULES.find((el) => el.level === level);
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
                if (this.userNftsData) {
                    const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex((el) => el.leader_level === level);
                    return index < 0 ? "" : "img-done";
                }
                return "";
            },
            avalableBoost(level) {
                if (this.currentBlockchain && this.userLeaderData) {
                    const claimeBoostIndex = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex((el) => el.leader_level === level);
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
                if (this.userNftsData && this.currentAddress && this.currentBlockchain) {
                    const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex((el) => el.leader_level === level);
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
                if (this.userRefData && this.userLeaderData && this.userNftsData && this.currentAddress && this.currentBlockchain) {
                    if (this.userRefData.isLeader === false && this.userLeaderData.isDefRef === true) {
                        return false;
                    }
                    const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex(
                        (el) => el.leader_level === this.userLeaderData.leaderLevel
                    );

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
            this.lang.init();
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
