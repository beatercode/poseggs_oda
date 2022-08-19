<template>
    <div class="your-stake-col" v-if="fullStakeDetails" :class="{
        burned: getStakingPlanData(fullStakeDetails)[6],
        'burned-claimed':
            getEarnedReward(fullStakeDetails) === 0 &&
            getStakingPlanData(fullStakeDetails)[6],
    }">
        <transfer-modal v-if="showTransferModal"
            @close="(showTransferModal = false), (selectedNft = null), (onlyData = false)" :nft="selectedNft"
            :onlyData="onlyData" :nftType="nftType" />
        <div class="your-stake-row">
            <div class="your-stake-col your-stake-nft">
                <div class="your-stake-nft-wrap">
                    <div v-if="!getStakingPlanData(fullStakeDetails)[6]" class="nft-label">
                        {{ translatesGet("ON_STAKE") }}
                    </div>
                    <div v-if="getStakingPlanData(fullStakeDetails)[6]" class="nft-label">
                        <div class="icon-wrap"><i class="icon-fire"></i></div>
                        {{ translatesGet("BURNED") }}
                    </div>
                    <div class="img-wrap">
                        <div v-if="
                            showLoader && tokenId === fullStakeDetails.tokenId
                        " class="nft-load">
                            <div class="nft-load-icon"></div>
                        </div>
                        <img :src="getImageLink(fullStakeDetails)" class="your-nft-img" alt="main-img" />
                    </div>
                </div>
                <div class="stake-data-header" style="margin-bottom: 20px;">
                    <div class="stake-id">
                        #{{ fullStakeDetails.event_data.depositIdx + 1 }}
                    </div>
                    <div class="stake-boosts">
                        <!--template v-if="fullStakeDetails.boostEvents.length"-->
                        <template>
                            <button :disabled="getStakingPlanData(fullStakeDetails)[6] === true"
                                v-if="!isBoostApplied(2)" class="st-boost" @click="showMore = true">
                                <i class="icon-plus"></i>
                            </button>
                            <button v-if="isBoostApplied(2)" class="st-boost" @click.stop="showMore = showMore" @click="(nftType = AlphaBoost), (showTransferModal = true), (onlyData = true),
                            (selectedNft = fullStakeDetails.boostEvents.find((el) => el.boostType === 1))">
                                <img :src="getImageForBoost(fullStakeDetails, 1)" alt="" class="" />
                            </button>
                            <button :disabled="getStakingPlanData(fullStakeDetails)[6] === true"
                                v-if="!isBoostApplied(1)" class="st-boost" @click="showMore = true">
                                <i class="icon-plus"></i>
                            </button>
                            <button v-if="isBoostApplied(1)" class="st-boost" @click.stop="showMore = showMore" @click="(nftType = AlphaBoost), (showTransferModal = true), (onlyData = true),
                            (selectedNft = fullStakeDetails.boostEvents.find((el) => el.boostType === 0))">
                                <img :src="getImageForBoost(fullStakeDetails, 0)" alt="" class="" />
                            </button>
                            <button :disabled="getStakingPlanData(fullStakeDetails)[6] === true"
                                v-if="!isBoostApplied(3)" class="st-boost" @click="showMore = true">
                                <i class="icon-plus"></i>
                            </button>
                            <button v-if="isBoostApplied(3)" class="st-boost" @click.stop="showMore = showMore" @click="(nftType = AlphaBoost), (showTransferModal = true), (onlyData = true),
                            (selectedNft = fullStakeDetails.boostEvents.find((el) => el.boostType === 2))">
                                <img :src="getImageForBoost(fullStakeDetails, 2)" alt="" class="" />
                            </button>
                        </template>
                    </div>
                </div>
                <div class="container-btns">
                    <button v-if="getStakingPlanData(fullStakeDetails)[6] === false" @click="showMore = !showMore"
                        class="btn" :class="{ 'btn-dark': showMore, 'btn-light': !showMore }">
                        <div class="icon-wrap"><i class="icon-flash-fill"></i></div>
                        <!-- <span>{{ !showMore ? "Boost my NFT" : "Hide" }}</span> -->
                        <span>{{ !showMore ? translatesGet("BOOST_MY_NFT") : translatesGet("HIDE") }}</span>
                    </button>
                </div>
            </div>
            <div class="your-stake-col your-stake-data">
                <!--div class="stake-data-header">
                    <div class="stake-id">
                        #{{ fullStakeDetails.event_data.depositIdx + 1 }}
                    </div>
                    <div class="stake-boosts">
                        <template>
                            <button :disabled="getStakingPlanData(fullStakeDetails)[6] === true"
                                v-if="!isBoostApplied(2)" class="st-boost" @click="showMore = true">
                                <i class="icon-plus"></i>
                            </button>
                            <button v-if="isBoostApplied(2)" class="st-boost" @click.stop="showMore = showMore" @click="(nftType = AlphaBoost), (showTransferModal = true), (onlyData = true),
                            (selectedNft = fullStakeDetails.boostEvents.find((el) => el.boostType === 1))">
                                <img :src="getImageForBoost(fullStakeDetails, 1)" alt="" class="" />
                            </button>
                            <button :disabled="getStakingPlanData(fullStakeDetails)[6] === true"
                                v-if="!isBoostApplied(1)" class="st-boost" @click="showMore = true">
                                <i class="icon-plus"></i>
                            </button>
                            <button v-if="isBoostApplied(1)" class="st-boost" @click.stop="showMore = showMore" @click="(nftType = AlphaBoost), (showTransferModal = true), (onlyData = true),
                            (selectedNft = fullStakeDetails.boostEvents.find((el) => el.boostType === 0))">
                                <img :src="getImageForBoost(fullStakeDetails, 0)" alt="" class="" />
                            </button>
                            <button :disabled="getStakingPlanData(fullStakeDetails)[6] === true"
                                v-if="!isBoostApplied(3)" class="st-boost" @click="showMore = true">
                                <i class="icon-plus"></i>
                            </button>
                            <button v-if="isBoostApplied(3)" class="st-boost" @click.stop="showMore = showMore" @click="(nftType = AlphaBoost), (showTransferModal = true), (onlyData = true),
                            (selectedNft = fullStakeDetails.boostEvents.find((el) => el.boostType === 2))">
                                <img :src="getImageForBoost(fullStakeDetails, 2)" alt="" class="" />
                            </button>
                        </template>
                    </div>
                </div-->
                <div class="stake-pool-info">
                    <div class="container-pool-info">
                        <div class="stake-pool-col stake-pool">
                            <div class="stake-pool-col-name">
                                <div class="icon"></div>
                                <span>{{ translatesGet("STAKING_POOL") }}</span>
                            </div>
                            <div class="stake-pool-col-value">
                                {{ getStakingPlanData(fullStakeDetails)[4] }} {{ translatesGet("POOL") }}
                            </div>
                        </div>
                        <div class="stake-pool-col stake-time">
                            <div class="stake-pool-col-name">
                                <div class="icon"></div>
                                <span>{{ translatesGet("STARTED") }}</span>
                            </div>
                            <div class="stake-pool-col-value">
                                {{
                                        getStakingPlanData(fullStakeDetails)[7].toLocaleDateString(
                                            "en-EN",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                            }
                                        )
                                }}
                            </div>
                        </div>
                        <!--div class="stake-pool-col stake-time" v-if="getStakingPlanData(fullStakeDetails)[4] !== 'XL'"-->
                        <div class="stake-pool-col stake-time">
                            <div class="stake-pool-col-name">
                                <div class="icon"></div>
                                <span>{{ translatesGet("END_ST_POOL") }}</span>
                            </div>
                            <div class="stake-pool-col-value">
                                {{
                                        getStakingPlanData(fullStakeDetails)[5].toLocaleDateString(
                                            "en-EN",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                            }
                                        )
                                }}
                            </div>
                        </div>
                        <div class="stake-pool-col stake-claimed">
                            <div class="stake-pool-col-name">
                                <div class="icon"></div>
                                <span>{{ translatesGet("CLAIMED") }}</span>
                            </div>
                            <div class="stake-pool-col-value">
                                {{ getAlreadyWithdrawnReward(fullStakeDetails) }} {{ "BUSD" /* currency */ }}
                            </div>
                        </div>
                        <div class="stake-pool-col stake-for-claim">
                            <div class="stake-pool-col-name">
                                <div class="icon"></div>
                                <span>{{ translatesGet("AVAILABLE_CLAIM") }}</span>
                            </div>
                            <div class="stake-pool-col-value" style="display: flex; flex-direction: row;">
                                <span v-if="this.claimBonusLevel > 0" style="color: #00EB00; margin-right: 4px;">
                                    {{ getClaimBonusPerc((this.claimBonusLevel - 1)) }}%
                                </span>
                                <span>{{ getEarnedReward(fullStakeDetails) }} {{ "BUSD" }}</span>
                            </div>
                        </div>
                        <div class="stake-pool-col">
                            <div class="container-pool-btn">
                                <button :disabled="showLoader" @click="Claim(nft)" class="btn btn-claim">
                                    {{ translatesGet("CLAIM") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stake-data-header" style="justify-content: space-between; margin-bottom: 20px;">
                    <div class="stake-nft-value-main-stats stake-bonus-claim" style="width: 33%;">
                        <span>{{ getClaimBonusData(1, fullStakeDetails) }}</span>
                        <span>{{ timeToBonusA }}</span>
                    </div>
                    <div class="stake-nft-value-main-stats stake-bonus-claim" style="width: 33%;">
                        <span>{{ getClaimBonusData(2, fullStakeDetails) }}</span>
                        <span>{{ timeToBonusB }}</span>
                    </div>
                    <div class="stake-nft-value-main-stats stake-bonus-claim" style="width: 33%;">
                        <span>{{ getClaimBonusData(3, fullStakeDetails) }}</span>
                        <span>{{ timeToBonusC }}</span>
                    </div>
                </div>
                <div class="stake-info-blocks-wrap">
                    <div class="stake-info-block">
                        <div class="stake-pool-col-name">
                            {{ translatesGet("DAYS_OF_STAKING") }}
                        </div>
                        <div class="stake-pool-col-value">
                            {{ getStakingPlanData(fullStakeDetails)[0] }}
                        </div>
                        <div class="select-boost-item-data-wrap"
                            v-if="showMore && (selectedTimeBoost || selectedTeamBoost)">
                            <div v-if="selectedTimeBoost" class="boost-data-item boost-data-item-main">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z">
                                    </path>
                                    <path
                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z">
                                    </path>
                                </svg>
                                {{ selectedTimeBoost && selectedTimeBoost.boostTimePercent }}
                            </div>
                            <div v-if="selectedTeamBoost" class="boost-data-item boost-data-item-main">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                    <path
                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                </svg>
                                {{ selectedTeamBoost.attributes[1].value }}
                            </div>
                        </div>
                    </div>
                    <div class="stake-info-block">
                        <div class="stake-pool-col-name">
                            {{ translatesGet("REWARD_PERCENT_DAY") }}
                        </div>
                        <div class="stake-pool-col-value">
                            {{ getStakingPlanData(fullStakeDetails)[1] }}%
                        </div>
                        <div class="select-boost-item-data-wrap"
                            v-if="showMore && (selectedProfitBoost || selectedTeamBoost)">
                            <div v-if="selectedProfitBoost" class="boost-data-item boost-data-item-main">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z" />
                                </svg>
                                {{
                                        selectedProfitBoost && selectedProfitBoost.boostProfitPercent
                                }}
                            </div>
                            <div v-if="selectedTeamBoost" class="boost-data-item boost-data-item-main">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                    <path
                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                </svg>
                                {{ selectedTeamBoost && selectedTeamBoost.boostProfitPercent }}
                            </div>
                        </div>
                    </div>
                    <div class="stake-info-block">
                        <div class="stake-pool-col-name">
                            {{ translatesGet("TOTAL_ST_PERCENT") }}
                        </div>
                        <div class="stake-pool-col-value">
                            {{ getStakingPlanData(fullStakeDetails)[2] + "%" }}
                        </div>
                        <div class="select-boost-item-data-wrap" v-if="
                            showMore &&
                            (selectedProfitBoost || selectedTeamBoost || selectedTimeBoost)
                        ">
                            <div class="boost-data-item boost-data-item-up">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.667 6.99967C13.667 3.31967 10.6803 0.333008 7.00033 0.333008C3.32032 0.333007 0.333658 3.31967 0.333658 6.99967C0.333658 10.6797 3.32032 13.6663 7.00032 13.6663C10.6803 13.6663 13.667 10.6797 13.667 6.99967ZM6.50032 9.33301L6.50032 5.87301L5.35366 7.01967C5.16032 7.21301 4.84033 7.21301 4.64699 7.01967C4.54699 6.91967 4.50032 6.79301 4.50032 6.66634C4.50032 6.53967 4.54699 6.41301 4.64699 6.31301L6.64699 4.31301C6.84033 4.11967 7.16032 4.11967 7.35366 4.31301L9.35366 6.31301C9.54699 6.50634 9.54699 6.82634 9.35366 7.01967C9.16032 7.21301 8.84033 7.21301 8.64699 7.01967L7.50032 5.87301L7.50032 9.33301C7.50032 9.60634 7.27366 9.83301 7.00032 9.83301C6.72699 9.83301 6.50032 9.60634 6.50032 9.33301Z"
                                        fill="#77D15C" />
                                </svg>
                                {{ increasedPercent }}%
                            </div>
                        </div>
                    </div>
                    <div class="stake-info-block">
                        <div class="stake-pool-col-name">
                            {{ translatesGet("EXPECTED_REWARD") }}
                        </div>
                        <div class="stake-pool-col-value">
                            {{ getStakingPlanData(fullStakeDetails)[3] + ` ${"BUSD" /* currency */}` }}
                        </div>
                        <div class="select-boost-item-data-wrap" v-if="
                            showMore &&
                            (selectedProfitBoost || selectedTeamBoost || selectedTimeBoost)
                        ">
                            <div class="boost-data-item boost-data-item-up">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.667 6.99967C13.667 3.31967 10.6803 0.333008 7.00033 0.333008C3.32032 0.333007 0.333658 3.31967 0.333658 6.99967C0.333658 10.6797 3.32032 13.6663 7.00032 13.6663C10.6803 13.6663 13.667 10.6797 13.667 6.99967ZM6.50032 9.33301L6.50032 5.87301L5.35366 7.01967C5.16032 7.21301 4.84033 7.21301 4.64699 7.01967C4.54699 6.91967 4.50032 6.79301 4.50032 6.66634C4.50032 6.53967 4.54699 6.41301 4.64699 6.31301L6.64699 4.31301C6.84033 4.11967 7.16032 4.11967 7.35366 4.31301L9.35366 6.31301C9.54699 6.50634 9.54699 6.82634 9.35366 7.01967C9.16032 7.21301 8.84033 7.21301 8.64699 7.01967L7.50032 5.87301L7.50032 9.33301C7.50032 9.60634 7.27366 9.83301 7.00032 9.83301C6.72699 9.83301 6.50032 9.60634 6.50032 9.33301Z"
                                        fill="#77D15C" />
                                </svg>
                                {{ increasedProfit }} {{ "BUSD" /* currency */ }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="your-stake-row your-stake-more" :class="{ active: showMore }">
            <div class="your-stake-boosts">
                <div v-if="isTimeBoostApplied"
                    class="your-stake-boost-wrap wrap-col-boost your-stake-boost-wrap-inactive">
                    <div class="stake-boost-header">
                        <div class="stake-boost-header-icon boost-time"></div>
                        <div class="title">{{ translatesGet("BOOSTER_TIME") }}</div>
                    </div>
                    <div class="stake-boost-describe">
                        {{ translatesGet("BOOSTER_INACTIVE") }}
                    </div>
                </div>
                <template v-else>
                    <div class="your-stake-boost-wrap wrap-col-boost" v-if="!timeBoosts || timeBoosts.length === 0">
                        <div class="stake-boost-header">
                            <div class="stake-boost-header-icon boost-time"></div>
                            <div class="title">{{ translatesGet("BOOSTER_TIME") }}</div>
                            <router-link :to="{ name: 'Boosts' }" class="btn">{{
                                    translatesGet("BUY")
                            }}</router-link>
                        </div>
                        <div class="stake-boost-describe">
                            {{ translatesGet("NO_TIME_BOOST") }}
                        </div>
                    </div>
                    <div class="your-stake-boost-wrap wrap-col-boost" v-else>
                        <div class="select-boost" :class="{ 'select-boost-active': selectList1 }"
                            @mouseover="selectList1 = true" @mouseout="selectList1 = false">
                            <div class="selected" v-if="showMore" :class="{ lowOpacity: selectList1 }">
                                <div class=\>
                                    <div class="select-boost-img">
                                        <img :src="getBoostImg(selectedTimeBoost)" alt="" />
                                    </div>
                                    <div class="select-boost-data">
                                        <div class="select-boost-name">
                                            {{ translatesGet("BOOSTER_TIME") }}
                                        </div>
                                        <div class="select-boost-item-data-wrap">
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                                    <path
                                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                                </svg>
                                                {{ selectedTimeBoost.boostTimePercent }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon-arrow-select">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.9465 5.45312H7.79316H4.05317C3.41317 5.45312 3.09317 6.22646 3.5465 6.67979L6.99983 10.1331C7.55317 10.6865 8.45317 10.6865 9.0065 10.1331L10.3198 8.81979L12.4598 6.67979C12.9065 6.22646 12.5865 5.45312 11.9465 5.45312Z"
                                            fill="white" />
                                    </svg>
                                </div>
                            </div>
                            <ul class="list-select-boost">
                                <li class="select-boost-item" v-for="boost of timeBoosts" :key="boost.tokenId"
                                    @click="selectedTimeBoost = boost">
                                    <div class="select-boost-img">
                                        <img :src="getBoostImg(boost)" alt="" />
                                    </div>
                                    <div class="select-boost-data">
                                        <div class="select-boost-name">
                                            {{ translatesGet("BOOSTER_TIME") }}
                                        </div>
                                        <div class="select-boost-item-data-wrap">
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                                    <path
                                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                                </svg>
                                                {{ boost.boostTimePercent }}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button :disabled="showLoader" class="btn btn-submit-select" @click="activateBoost(1)">
                            {{ translatesGet("ACTIVE") }}
                        </button>
                    </div>
                </template>
                <div v-if="isProfitBoostApplied"
                    class="your-stake-boost-wrap wrap-col-boost your-stake-boost-wrap-inactive">
                    <div class="stake-boost-header">
                        <div class="stake-boost-header-icon boost-percent"></div>
                        <div class="title">{{ translatesGet("BOOSTER_PROFIT") }}</div>
                    </div>
                    <div class="stake-boost-describe">
                        {{ translatesGet("BOOSTER_INACTIVE") }}
                    </div>
                </div>
                <template v-else>
                    <div class="your-stake-boost-wrap wrap-col-boost" v-if="!profitBoosts || profitBoosts.length === 0">
                        <div class="stake-boost-header">
                            <div class="stake-boost-header-icon boost-percent"></div>
                            <div class="title">{{ translatesGet("BOOSTER_PROFIT") }}</div>
                            <router-link :to="{ name: 'Boosts' }" class="btn">{{
                                    translatesGet("BUY")
                            }}</router-link>
                        </div>
                        <div class="stake-boost-describe">
                            {{ translatesGet("NO_PROFIT_BOOST") }}
                        </div>
                    </div>
                    <div class="your-stake-boost-wrap wrap-col-boost" v-else>
                        <div class="select-boost" :class="{ 'select-boost-active': selectList2 }"
                            @mouseover="selectList2 = true" @mouseout="selectList2 = false">
                            <div class="selected" v-if="showMore" :class="{ lowOpacity: selectList2 }">
                                <div class="select-boost-item">
                                    <div class="select-boost-img">
                                        <img :src="getBoostImg(selectedProfitBoost)" alt="" />
                                    </div>
                                    <div class="select-boost-data">
                                        <div class="select-boost-name">
                                            {{ translatesGet("BOOSTER_PROFIT") }}
                                        </div>
                                        <div class="select-boost-item-data-wrap">
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z" />
                                                </svg>
                                                {{ selectedProfitBoost.boostProfitPercent }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon-arrow-select">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.9465 5.45312H7.79316H4.05317C3.41317 5.45312 3.09317 6.22646 3.5465 6.67979L6.99983 10.1331C7.55317 10.6865 8.45317 10.6865 9.0065 10.1331L10.3198 8.81979L12.4598 6.67979C12.9065 6.22646 12.5865 5.45312 11.9465 5.45312Z"
                                            fill="white" />
                                    </svg>
                                </div>
                            </div>
                            <ul class="list-select-boost">
                                <li class="select-boost-item" v-for="boost of profitBoosts" :key="boost.tokenId"
                                    @click="selectedProfitBoost = boost">
                                    <div class="select-boost-img">
                                        <img :src="getBoostImg(boost)" alt="" />
                                    </div>
                                    <div class="select-boost-data">
                                        <div class="select-boost-name">
                                            {{ translatesGet("BOOSTER_PROFIT") }}
                                        </div>
                                        <div class="select-boost-item-data-wrap">
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z" />
                                                </svg>
                                                {{ boost.boostProfitPercent }}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button :disabled="showLoader" class="btn btn-submit-select" @click="activateBoost(0)">
                            {{ translatesGet("ACTIVE") }}
                        </button>
                    </div>
                </template>
                <div v-if="isTeamBoostApplied"
                    class="your-stake-boost-wrap wrap-col-boost your-stake-boost-wrap-inactive">
                    <div class="stake-boost-header">
                        <div class="stake-boost-header-icon boost-team"></div>
                        <div class="title">{{ translatesGet("BOOSTER_TEAM") }}</div>
                    </div>
                    <div class="stake-boost-describe">
                        {{ translatesGet("BOOSTER_INACTIVE") }}
                    </div>
                </div>
                <template v-else>
                    <div class="your-stake-boost-wrap wrap-col-boost" v-if="!teamBoosts || teamBoosts.length === 0">
                        <div class="stake-boost-header">
                            <div class="stake-boost-header-icon boost-team"></div>
                            <div class="title">{{ translatesGet("BOOSTER_TEAM") }}</div>
                            <router-link :to="{ name: 'Program' }" class="btn">{{
                                    translatesGet("LEAD_PROG")
                            }}</router-link>
                        </div>
                        <div class="stake-boost-describe">
                            {{ translatesGet("NO_TEAM_BOOST") }}
                        </div>
                    </div>
                    <div class="your-stake-boost-wrap" v-else>
                        <div class="select-boost" :class="{ 'select-boost-active': selectList3 }"
                            @mouseover="selectList3 = true" @mouseout="selectList3 = false">
                            <div class="selected" v-if="showMore" :class="{ lowOpacity: selectList3 }">
                                <div class="select-boost-item">
                                    <div class="select-boost-img">
                                        <img :src="getBoostImg(selectedTeamBoost)" alt="" />
                                    </div>
                                    <div class="select-boost-data">
                                        <div class="select-boost-name">
                                            {{ translatesGet("BOOSTER_TEAM") }}
                                        </div>
                                        <div class="select-boost-item-data-wrap">
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z" />
                                                </svg>
                                                {{ selectedTeamBoost.boostProfitPercent }}
                                            </div>
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                                    <path
                                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                                </svg>
                                                {{ selectedTeamBoost.boostTimePercent }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon-arrow-select">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.9465 5.45312H7.79316H4.05317C3.41317 5.45312 3.09317 6.22646 3.5465 6.67979L6.99983 10.1331C7.55317 10.6865 8.45317 10.6865 9.0065 10.1331L10.3198 8.81979L12.4598 6.67979C12.9065 6.22646 12.5865 5.45312 11.9465 5.45312Z"
                                            fill="white" />
                                    </svg>
                                </div>
                            </div>
                            <ul class="list-select-boost">
                                <li class="select-boost-item" v-for="boost of teamBoosts" :key="boost.tokenId"
                                    @click="selectedTeamBoost = boost">
                                    <div class="select-boost-img">
                                        <img :src="getBoostImg(boost)" alt="" />
                                    </div>
                                    <div class="select-boost-data">
                                        <div class="select-boost-name">
                                            {{ translatesGet("BOOSTER_TEAM") }}
                                        </div>
                                        <div class="select-boost-item-data-wrap">
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z" />
                                                </svg>
                                                {{ boost.boostTimePercent }}
                                            </div>
                                            <div class="boost-data-item boost-data-item-main">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z" />
                                                    <path
                                                        d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z" />
                                                </svg>
                                                {{ boost.boostProfitPercent }}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button :disabled="showLoader" class="btn btn-submit-select" @click="activateBoost(2)">
                            {{ translatesGet("ACTIVE") }}
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
>
<script>
import MultiLang from "@/core/multilang";
import { mapState } from "vuex";
import TransferModal from "./ModalWindows/TransferModal.vue";
import conf from "../../config.json";
import Web3 from "web3";
export default {
    name: "StakeCard",
    props: ["nft", "fullStakeDetails", "boostsApplied"],
    data() {
        return {
            lang: new MultiLang(this),
            showMore: false,
            showLoader: false,
            selectList1: false,
            selectList2: false,
            selectList3: false,
            selectedNft: null,
            claimBonusLevel: 0,
            timeToBonusA: null,
            timeToBonusB: null,
            timeToBonusC: null,
            claimableAmount: 0,
            showTransferModal: false,
            selectedTimeBoost: null,
            selectedTeamBoost: null,
            selectedProfitBoost: null,
            unstakeAllowed: false,
            increasedPercent: 0,
            increasedProfit: 0,
            tokenId: 0,
            isBoostApplying: false,
        };
    },
    components: {
        TransferModal,
    },
    methods: {
        translatesGet(key) {
            try {
                const translations = JSON.parse(
                    window.localStorage.getItem("interfaceTranslations")
                );
                const res = translations.lang.find((el) => el.hasOwnProperty(`${key}`));
                return res[key];
            } catch (ex) {
                // console.log(ex);
                return this.lang.get(key);
            }
        },
        async activateBoost(type) {
            try {
                const boostToApply =
                    type === 0
                        ? this.selectedProfitBoost
                        : type === 1
                            ? this.selectedTimeBoost
                            : this.selectedTeamBoost;
                let tpyeName = type === 0 ? "profit" : type === 1 ? "time" : "team";

                if (this.boostsApplied.find((el) => el.boostType === type)) {
                    this.$store.commit("push_notification", {
                        type: "error",
                        typeClass: "error",
                        message: `You can apply ${tpyeName} boost only once!`,
                    });
                    return;
                }

                this.showLoader = true;
                this.isBoostApplying = true;
                let res = await this.$root.core.approve("BOOST", this.currentAddress);
                if (res.wait) {
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                    });
                    await res.wait(1);
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `Transaction was confirmed! You may now stake your NFT.`,
                    });
                }

                res = await this.$root.core.addBoost(
                    this.fullStakeDetails.event_data.depositIdx,
                    boostToApply.tokenId
                );
                this.$store.commit("push_notification", {
                    type: "warning",
                    typeClass: "warning",
                    message: `Sending your transaction into the blockchain...`,
                });
                await res.wait(1);
                this.$store.commit("push_notification", {
                    type: "warning",
                    typeClass: "warning",
                    message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                });
                await res.wait(10);
            } catch (error) {
                this.showLoader = false;
                this.isBoostApplying = false;
                console.log(error);
                this.$root.core.handleError(error);
                return;
            }
        },
        getImageLink(nft) {
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            let plan = nft.eggPlan == 9 ? 11 : nft.eggPlan;
            return images("./nft-" + plan + ".png");
        },
        getStakingPlanData(nft) {
            let timeIncrease = 0;
            let profitIncrease = 0;
            let bonusProfitIncrease = 0;
            let period;
            let dailyPerc = 0;

            if (nft.boostEvents && nft.boostEvents.length) {
                for (let i = 0; i < nft.boostEvents.length; i++) {
                    const profitBoost = nft.boostEvents[i].boostType == 0 ? nft.boostEvents[i] : null;
                    const timeBoost = nft.boostEvents[i].boostType == 1 ? nft.boostEvents[i] : null;
                    const teamBoost = nft.boostEvents[i].boostType == 2 ? nft.boostEvents[i] : null;

                    if (timeBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                    }
                    if (profitBoost) {
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                    if (teamBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                }
            }

            let stakePlan = nft.stakePlan;

            if (timeIncrease > 0) {
                period = `${conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days > 0
                    ? (Number(conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days)
                        + Number(timeIncrease) / 100).toFixed(0)
                    : "Unlimited"
                    } DAYS`;
            } else {
                period = `${conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days > 0
                    ? conf[this.currentBlockchain].STAKING_PLANS[stakePlan].days
                    : "Unlimited"
                    } DAYS`;
            }

            if (profitIncrease > 0) {
                dailyPerc =
                    conf[this.currentBlockchain].STAKING_PLANS[stakePlan].profitPerDay +
                    (conf[this.currentBlockchain].STAKING_PLANS[stakePlan].profitPerDay / 100 * (Number(profitIncrease) / 100));
            } else {
                dailyPerc =
                    conf[this.currentBlockchain].STAKING_PLANS[stakePlan].profitPerDay;
            }

            const totalProfit = (parseFloat(period) * dailyPerc).toFixed(2);
            let expectedReward;
            // const size = stakePlan === 0 ? "XXS" : stakePlan === 1 ? "XS" : stakePlan === 2 ? "S" : stakePlan === 3 ? "M" : stakePlan === 4 ? "L" : stakePlan === 5 ? "XL" : stakePlan === 6 ? "XXL" : "XXL";
            let pointer = 7 - stakePlan;
            const size = conf["MISC"]["poolNames"][pointer];
            let end;
            const start = Math.max(nft.timestamp, nft.lastWithdrawTimestamp);
            end = nft.timestamp + Number(period.replace("DAYS", "")) * 24 * 3600;

            expectedReward =
                (
                    (((Number(nft.event_data.amount) * (end - start)) / 3600) *
                        dailyPerc) /
                    24 /
                    100
                ).toFixed(2) > 0
                    ? (
                        (((Number(nft.event_data.amount) * (end - start)) / 3600) *
                            dailyPerc) /
                        24 /
                        100
                    ).toFixed(2)
                    : "0.00";

            const now = Math.floor(new Date().getTime() / 1000);

            const isStakeExpired = Boolean(end < now);

            // this.unstakeAllowed = stakeType === 0 ? true : false;
            this.unstakeAllowed = false;
            end = new Date(end * 1000);

            return [
                period,
                dailyPerc.toFixed(2),
                totalProfit,
                expectedReward,
                size,
                end,
                isStakeExpired,
                new Date(nft.timestamp * 1000),
            ];
        },
        getAlreadyWithdrawnReward(stake) {
            return Number(stake.rewardReceived / 1e18).toFixed(2);
        },
        getClaimBonusPerc(val) {
            return conf["CLAIM_BONUS_DATA"].percent[val];
        },
        getClaimableBonusLevel(stake) {
            const { Difference_In_Days } = this.getTimeSinceLastClaim(stake);
            return Difference_In_Days >= conf["CLAIM_BONUS_DATA"].days[2] 
                ? 3 : Difference_In_Days >= conf["CLAIM_BONUS_DATA"].days[1] 
                ? 2 : Difference_In_Days >= conf["CLAIM_BONUS_DATA"].days[0] 
                ? 1 : 0;
        },
        getTimeSinceLastClaim(stake) {
            let rightNow = Date.now();
            let lastClaim = (new Date(stake.lastWithdrawTimestamp * 1000)).getTime();
            return this.getTimeDifference(rightNow, lastClaim);

        },
        getTimeDifference(a, b) {
            const MIL_DAY = 1000 * 3600 * 24;
            const MIL_HOUR = 1000 * 3600;
            const MIL_MIN = 1000 * 60;
            const MIL_SEC = 1000 * 1;

            let Difference_In_Time = a - b;
            let Difference_In_Days = Math.trunc(Difference_In_Time / MIL_DAY);
            let Difference_In_Hours = Math.trunc(Difference_In_Time / MIL_HOUR) - (24 * Difference_In_Days);
            let Difference_In_Mins = Math.trunc(Difference_In_Time / MIL_MIN) - (60 * (Difference_In_Hours + (24 * Difference_In_Days)));
            let Difference_In_Secs = Math.trunc(Difference_In_Time / MIL_SEC) - (60 * (Difference_In_Mins + 60 * (Difference_In_Hours + (24 * Difference_In_Days))));

            return { Difference_In_Days, Difference_In_Hours, Difference_In_Mins, Difference_In_Secs }
        },
        formatTimeDifference(Difference_In_Days, Difference_In_Hours, Difference_In_Mins, Difference_In_Secs) {
            // return Difference_In_Days + "d " + Difference_In_Hours + "h " + Difference_In_Mins + "m " + Difference_In_Secs + "s";
            return Difference_In_Days + "d " + Difference_In_Hours + "h " + Difference_In_Mins + "m";
        },
        getNextClaimableBonusCD(levelRequired, myBonusLevel, stake) {
            const BONUS_A = 1000 * 60 * 60 * 24 * conf["CLAIM_BONUS_DATA"].days[0];
            const BONUS_B = 1000 * 60 * 60 * 24 * conf["CLAIM_BONUS_DATA"].days[1];
            const BONUS_C = 1000 * 60 * 60 * 24 * conf["CLAIM_BONUS_DATA"].days[2];

            let { Difference_In_Days, Difference_In_Hours, Difference_In_Mins, Difference_In_Secs } = this.getTimeDifference((stake.lastWithdrawTimestamp * 1000 + BONUS_A), Date.now());
            const Difference_In_Days_A = Difference_In_Days;
            const Difference_In_Hours_A = Difference_In_Hours;
            const Difference_In_Mins_A = Difference_In_Mins;
            const Difference_In_Secs_A  = Difference_In_Secs;
            ({ Difference_In_Days, Difference_In_Hours, Difference_In_Mins, Difference_In_Secs } = this.getTimeDifference((stake.lastWithdrawTimestamp * 1000 + BONUS_B), Date.now()));
            const Difference_In_Days_B = Difference_In_Days;
            const Difference_In_Hours_B = Difference_In_Hours;
            const Difference_In_Mins_B = Difference_In_Mins;
            const Difference_In_Secs_B  = Difference_In_Secs;
            ({ Difference_In_Days, Difference_In_Hours, Difference_In_Mins, Difference_In_Secs } = this.getTimeDifference((stake.lastWithdrawTimestamp * 1000 + BONUS_C), Date.now()));
            const Difference_In_Days_C = Difference_In_Days;
            const Difference_In_Hours_C = Difference_In_Hours;
            const Difference_In_Mins_C = Difference_In_Mins;
            const Difference_In_Secs_C  = Difference_In_Secs;

            let countdownUntilNexLevel = myBonusLevel >= levelRequired ? "Obtained" 
                : (
                    levelRequired == 1 ? this.formatTimeDifference(Difference_In_Days_A, Difference_In_Hours_A, Difference_In_Mins_A, Difference_In_Secs_A) :
                    levelRequired == 2 ? this.formatTimeDifference(Difference_In_Days_B, Difference_In_Hours_B, Difference_In_Mins_B, Difference_In_Secs_B) :
                    levelRequired == 3 ? this.formatTimeDifference(Difference_In_Days_C, Difference_In_Hours_C, Difference_In_Mins_C, Difference_In_Secs_C) : "Obtained"
                );
            
            return countdownUntilNexLevel;
        },
        getClaimBonusData(levelRequired, stake) {
            let percent = levelRequired == 1 
                ? `${conf["CLAIM_BONUS_DATA"].percent[0]}%` : levelRequired == 2 
                ? `${conf["CLAIM_BONUS_DATA"].percent[1]}%` : `${conf["CLAIM_BONUS_DATA"].percent[2]}%`;
            this.claimBonusLevel = this.getClaimableBonusLevel(stake);
            let countdownToLevel = this.getNextClaimableBonusCD(levelRequired, this.claimBonusLevel, stake);
            let enabled = this.claimBonusLevel >= levelRequired ? "🟢" : "⚪️";

            switch(levelRequired) {
                case 1: this.timeToBonusA = countdownToLevel; break;
                case 2: this.timeToBonusB = countdownToLevel; break;
                case 3: this.timeToBonusC = countdownToLevel; break;
            }
            return `${enabled} ${percent}`;
        },
        getEarnedReward(stake) {
            let nft = stake;
            let timeIncrease = 0;
            let profitIncrease = 0;
            let claimProfitIncrease = this.claimBonusLevel == 0 ? 0 : conf["CLAIM_BONUS_DATA"].percent[(this.claimBonusLevel - 1)];

            if (nft.boostEvents && nft.boostEvents.length) {
                for (let i = 0; i < nft.boostEvents.length; i++) {
                    const profitBoost = nft.boostEvents[i].boostType == 0 ? nft.boostEvents[i] : null;
                    const timeBoost = nft.boostEvents[i].boostType == 1 ? nft.boostEvents[i] : null;
                    const teamBoost = nft.boostEvents[i].boostType == 2 ? nft.boostEvents[i] : null;

                    if (timeBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                    }
                    if (profitBoost) {
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                    if (teamBoost) {
                        timeIncrease = Number(timeBoost.boostTimePercent);
                        profitIncrease = Number(profitBoost.boostProfitPercent);
                    }
                }
            }

            let stakePlan = stake.stakePlan;

            let stakeType = conf[this.currentBlockchain].STAKING_PLANS[stakePlan];
            let dayInSec = 86400;
            let number1e4 = 10000;

            let profitPerDay = Math.round(stakeType.profitPerDay * 100);
            let termInSeconds = stakeType.days * dayInSec;
            let time = Date.now() / 1000
            let boostTimeSeconds = (timeIncrease / 100) * dayInSec;
            let endTime = stake.timestamp + termInSeconds + boostTimeSeconds;
            endTime = Math.round(time > endTime ? endTime : time);
            let eggPriceInWei = Web3.utils.toWei(String(stake.event_data.amount), 'ether');

            let reward = stake.isExpired ? 0 : eggPriceInWei * profitPerDay
                * (number1e4 + profitIncrease)
                * (endTime - stake.lastWithdrawTimestamp)
                / number1e4
                / number1e4
                / dayInSec;
            reward = reward + ((reward / 100) * claimProfitIncrease);

            reward = Number(Web3.utils.fromWei(Web3.utils.toBN(reward), 'ether')).toFixed(4);
            return reward;
        },
        logClaimableInfo(claimableInfo) {
            console.log("Claimable Info [BCHAIN] --> \neggPrice["
                + String(claimableInfo.eggPrice) + "] \ndailyPercent["
                + Number(claimableInfo.dailyPercent) + "] \nboostTime["
                + claimableInfo.boostTime + "] \nboostProfit["
                + Number(claimableInfo.boostProfit) + "] \nisExpired["
                + claimableInfo.isExpired + "] \nendTimeClaim["
                + Number(claimableInfo.endTimeClaim) + "] \nlastWithdrawalTime["
                + Number(claimableInfo.lastWithdrawalTime) + "]");
        },
        async Claim(nft) {
            try {
                this.tokenId = nft.event_data.tokenId;
                this.showLoader = true;

                let res = await this.$root.core.Claim(nft.event_data.depositIdx);
                this.$store.commit("push_notification", {
                    type: "warning",
                    typeClass: "warning",
                    message: `Sending your transaction into the blockchain...`,
                });
                await res.wait(1);
                this.$store.commit("push_notification", {
                    type: "warning",
                    typeClass: "warning",
                    message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                });
                await res.wait(5);
            } catch (error) {
                console.log(error);
                this.showLoader = false;
                this.tokenId = "";
                this.$root.core.handleError(error);
                return;
            }
        },
        async Unstake(nft) {
            try {
                this.isUnstaking = true;
                this.tokenId = nft.event_data.tokenId;
                this.showLoader = true;

                let res = await this.$root.core.Unstake(nft.event_data.depositIdx);
                this.$store.commit("push_notification", {
                    type: "warning",
                    typeClass: "warning",
                    message: `Sending your transaction into the blockchain...`,
                });
                await res.wait(1);
                this.$store.commit("push_notification", {
                    type: "warning",
                    typeClass: "warning",
                    message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                });
                await res.wait(7);
            } catch (error) {
                this.isUnstaking = false;
                this.showLoader = false;
                this.tokenId = "";
                this.$root.core.handleError(error);
                return;
            }
        },
        isBoostApplied(boost) {
            if (boost === 1) {
                return this.isProfitBoostApplied;
            } else if (boost === 2) {
                return this.isTimeBoostApplied;
            } else {
                return this.isTeamBoostApplied;
            }
        },
        getBoostImg(nft) {
            let nameFix = nft.boostType == 1 ? "time-" : "percent-";
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./boost-" + nameFix + (+nft.boostLevel + 1) + ".png");
        },
        getBoostImgWithLvl(nft, lvl) {
            let nameFix = nft.boostType == 1 ? "time-" : "percent-";
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./boost-" + nameFix + lvl + ".png");
        },
        getImageForBoost(nft, id) {
            let boostEvents = nft.boostEvents;
            for (let i = 0; i < boostEvents.length; i++) {
                if (boostEvents[i].boostType == id) {
                    let avg = id == 0 ? Number(boostEvents[i].boostProfitPercent) / 100
                        : id == 1 ? Number(boostEvents[i].boostTimePercent) / 100
                            : Number(boostEvents[i].boostTeamPercent) / 100;
                    let lvl = avg == 2 ? 1 : avg == 5 ? 2 : 3;
                    return this.getBoostImgWithLvl(boostEvents[i], lvl);
                }
            }
            return null;
        },
    },
    computed: {
        ...mapState([
            "userStakes",
            "currentBlockchain",
            "currentAddress",
            "userNftsData",
            "userNftsBoostsData",
            "currency",
        ]),
        timeBoosts() {
            if (
                this.userNftsBoostsData &&
                this.currentBlockchain &&
                this.currentAddress &&
                this.currentAddress !== "0x0000000000000000000000000000000000000000"
            ) {
                const arr = this.userNftsBoostsData.filter((el) => el.boostType === 1) || [];
                return arr;
            }
            return null;
        },
        teamBoosts() {
            if (
                this.userNftsBoostsData &&
                this.currentBlockchain &&
                this.currentAddress &&
                this.currentAddress !== "0x0000000000000000000000000000000000000000"
            ) {
                const arr = this.userNftsBoostsData.filter((el) => el.boostType === 2) || [];
                return arr;
            }
            return null;
        },
        profitBoosts() {
            if (
                this.userNftsData &&
                this.currentBlockchain &&
                this.currentAddress &&
                this.currentAddress !== "0x0000000000000000000000000000000000000000"
            ) {
                const arr = this.userNftsBoostsData.filter((el) => el.boostType === 0) || [];
                return arr;
            }
            return null;
        },
        isProfitBoostApplied() {
            let applied = false;
            for (let i = 0; i < this.boostsApplied.length; i++) {
                if (this.boostsApplied[i].boostType == 0) {
                    applied = true;
                }
            }
            return applied;
        },
        isTimeBoostApplied() {
            let applied = false;
            for (let i = 0; i < this.boostsApplied.length; i++) {
                if (this.boostsApplied[i].boostType == 1) {
                    applied = true;
                }
            }
            return applied;
        },
        isTeamBoostApplied() {
            let applied = false;
            for (let i = 0; i < this.boostsApplied.length; i++) {
                if (this.boostsApplied[i].boostType == 2) {
                    applied = true;
                }
            }
            return applied;
        },
        getlastWithdrawTimestamp() {
            if (this.fullStakeDetails) {
                return this.fullStakeDetails.lastWithdrawTimestamp;
            } else {
                return null;
            }
        },
        componentTokenId() {
            return this.fullStakeDetails.tokenId;
        },
    },
    mounted() {

        /*
        let _this = this;
        setTimeout(async function fetch() {
            let myBonusLevel = _this.getClaimableBonusLevel(_this.fullStakeDetails);
            let countdownToLevel_1 = _this.getNextClaimableBonusCD(1, myBonusLevel, _this.fullStakeDetails);
            let countdownToLevel_2 = _this.getNextClaimableBonusCD(2, myBonusLevel, _this.fullStakeDetails);
            let countdownToLevel_3 = _this.getNextClaimableBonusCD(3, myBonusLevel, _this.fullStakeDetails);
            _this.timeToBonusA = countdownToLevel_1
            _this.timeToBonusB = countdownToLevel_2
            _this.timeToBonusC = countdownToLevel_3
        }, 300);
        */

        this.lang.init();
    },
    beforeDestroy() {
        this.showLoader = false;
        this.showMore = false;

        this.selectList1 = false;
        this.selectList2 = false;
        this.selectList3 = false;
        this.selectedTimeBoost = null;
        this.selectedTeamBoost = null;
        this.selectedProfitBoost = null;
        this.unstakeAllowed = false;
        this.increasedPercent = 0;
        this.increasedProfit = 0;
    },
    watch: {
        calcCountDownData(levelRequired, stake) {
            let myBonusLevel = this.getClaimableBonusLevel(stake);
            let countdownToLevel = this.getNextClaimableBonusCD(levelRequired, myBonusLevel, stake);

            switch(levelRequired) {
                case 1: this.timeToBonusA = countdownToLevel; break;
                case 2: this.timeToBonusB = countdownToLevel; break;
                case 3: this.timeToBonusC = countdownToLevel; break;
            }
        },
        showMore: function (newVal) {
            if (newVal) {
                const [days, daily] = this.getStakingPlanData(this.fullStakeDetails);
                let increasedDays = Number(days.replace("DAYS", ""));
                let increasedPercent = Number(daily);
                if (!this.isTeamBoostApplied) {
                    this.selectedTeamBoost = this.teamBoosts[0] || null;
                    if (this.selectedTeamBoost) {
                        increasedDays =
                            increasedDays +
                            (increasedDays * Number(this.teamBoosts[0].boostTimePercent));
                        increasedPercent =
                            increasedPercent +
                            (increasedPercent * Number(this.teamBoosts[0].boostProfitPercent));
                    }
                }
                if (!this.isProfitBoostApplied) {
                    this.selectedProfitBoost = this.profitBoosts[0] || null;
                    if (this.selectedProfitBoost) {
                        increasedPercent =
                            increasedPercent +
                            (increasedPercent * Number(this.profitBoosts[0].boostProfitPercent));
                    }
                }
                if (!this.isTimeBoostApplied) {
                    this.selectedTimeBoost = this.timeBoosts[0] || null;
                    if (this.selectedTimeBoost) {
                        increasedDays =
                            increasedDays +
                            (increasedDays * Number(this.timeBoosts[0].boostTimePercent));
                    }
                }
                this.increasedPercent = (increasedPercent * increasedDays).toFixed(2);
                this.increasedProfit = (
                    (Number(this.fullStakeDetails.event_data.amount) *
                        this.increasedPercent) /
                    100
                ).toFixed(2);
            } else {
                this.selectedProfitBoost = null;
                this.selectedTimeBoost = null;
                this.selectedTeamBoost = null;
            }
        },
        boostsApplied: function (newVal, oldVal) {
            if (
                newVal &&
                oldVal &&
                newVal.length !== oldVal.length &&
                this.isBoostApplying &&
                !this.isUnstaking
            ) {
                this.showLoader = false;
                this.showMore = false;
                this.isBoostApplying = false;
                if (newVal.length > oldVal.length) {
                    this.$store.commit("clear_notifications", []);
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `Your Boost has successfully been applied to this NFT staking pool.`,
                    });
                }
            }
        },
        selectedProfitBoost: function (newVal) {
            if (newVal) {
                const [days, daily] = this.getStakingPlanData(this.fullStakeDetails);
                let increasedDays = parseFloat(days);
                let increasedPercent = parseFloat(daily);
                increasedPercent =
                    increasedPercent +
                    (increasedPercent / 100 * parseFloat(newVal.boostProfitPercent));
                increasedDays =
                    increasedDays +
                    increasedDays / 100 * (Number(this.selectedTimeBoost?.boostTimePercent) || 0);
                this.increasedPercent = (increasedPercent * increasedDays).toFixed(2);
                this.increasedProfit = (
                    (Number(this.fullStakeDetails.event_data.amount) *
                        this.increasedPercent) /
                    100
                ).toFixed(2);
            }
        },
        selectedTeamBoost: function (newVal) {
            if (newVal) {
                const [days, daily] = this.getStakingPlanData(this.fullStakeDetails);
                let increasedDays = parseFloat(days);
                let increasedPercent = parseFloat(daily);
                increasedPercent =
                    increasedPercent +
                    (increasedPercent / 100 * Number(newVal.boostProfitPercent));
                increasedDays =
                    increasedDays +
                    (increasedDays / 100 * (parseFloat(newVal.boostTimePercent) || 0));

                this.increasedPercent = (increasedPercent * increasedDays).toFixed(2);
                this.increasedProfit = (
                    (Number(this.fullStakeDetails.event_data.amount) *
                        this.increasedPercent) /
                    100
                ).toFixed(2);
            }
        },
        selectedTimeBoost: function (newVal) {
            if (newVal) {
                const [days, daily] = this.getStakingPlanData(this.fullStakeDetails);
                let increasedDays = parseFloat(days);
                let increasedPercent = parseFloat(daily);
                increasedPercent =
                    increasedPercent +
                    (increasedPercent / 100 * (parseFloat(this.selectedProfitBoost?.boostProfitPercent) || 0));
                increasedDays =
                    increasedDays +
                    (increasedDays / 100 * parseFloat(newVal.boostTimePercent));
                this.increasedPercent = (increasedPercent * increasedDays).toFixed(2);
                this.increasedProfit = (
                    (Number(this.fullStakeDetails.event_data.amount) *
                        this.increasedPercent) /
                    100
                ).toFixed(2);
            }
        },
        getlastWithdrawTimestamp: function (newVal, oldVal) {
            if (
                newVal > oldVal &&
                oldVal !== null &&
                this.showLoader === true &&
                !this.isUnstaking
            ) {
                this.showLoader = false;
                this.tokenId = "";
                this.$store.commit("clear_notifications", []);
                this.$store.commit("push_notification", {
                    type: "success",
                    typeClass: "success",
                    message: `Success! Reward for staking was creadited to your wallet`,
                });
            }
        },
        disableChildLoader: function (newVal) {
            if (newVal === true) {
                this.tokenId = 0;
                this.showLoader = false;
                this.isUnstaking = false;
            }
        },
        componentTokenId: function (newVal, oldVal) {
            if (newVal !== oldVal && this.isUnstaking === true) {
                this.tokenId = 0;
                this.showLoader = false;
                this.isUnstaking = false;
                this.$store.commit("push_notification", {
                    type: "success",
                    typeClass: "success",
                    message: `You have successfully unstaked your DuckNFT. The NFT should appear in the "Your NFTs" section of the "Mint NFTs" tab now.`,
                });
            }
        },
    },
};
</script>
