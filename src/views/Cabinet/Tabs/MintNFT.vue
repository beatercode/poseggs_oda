<template>
    <main class="main-boosts">
        <transfer-modal v-if="showTransferModal" @close="
            (showTransferModal = false), (selectedNft = null), (onlyData = false)
        " :nft="selectedNft" :onlyData="onlyData" nftType="AlphaEgg" />

        <div class="cab-page-name">
            <div class="h2">{{ "Mint NFT" }}</div>
        </div>
        <div class="cab-col-wrap">
            <div class="cab-col cab-main-col">
                <section class="cab-row">
                    <div class="cab-row-card">
                        <div class="cab-card-wrap buy-nft-card">
                            <div class="cab-row">
                                <div class="cab-row-card">
                                    <div class="card-header card-header-desctop">
                                        <div class="card-header-icon earn-buy"></div>
                                        <div>
                                            <div class="h4">{{ translatesGet("MINT_NFT") }}</div>
                                            <div class="h5">
                                                {{ translatesGet("YOUR_NFTS_DESCR") }}
                                            </div>
                                        </div>
                                        <a class="link link-learn-more" target="_blank" rel="nofollow"
                                            href="https://eggroi.gitbook.io/eggroi/nft-purchase-on-the-eggroi-platform">
                                            {{ translatesGet("LEARN_MORE") }}
                                            <i class="i-arrow-right-3"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="cab-row">
                                <div class="card-header card-header-nft-image-buy card-header-desctop">
                                    <div class="slider-nft-wrap">
                                        <ul class="ul-our-nfts" :class="'ul-binance'">
                                            <li v-for="(price, index) of prices" @click="setSelectedEgg(price, index)"
                                                :style="[index == selectedIndex ? { 'opacity': '1' } : { 'opacity': '1' }]"
                                                class="li-our-nfts nft-list-buy nft-list-buy-page li-nft-red">
                                                <div class="li-our-nft-wrap" @click="showStats = showStats">
                                                    <div class="card-egg-image">
                                                        <img class="card-egg-image-img" :src="getNftImage(index)" />
                                                    </div>
                                                    <div class="li-nft-footer">
                                                        <div style="width: 100%">
                                                            <div class="stake-nft-value-tier">
                                                                <span class="li-nft-footer-title"
                                                                    :class="getClassOnTier(+index + 1)">{{ "TIER " +
                                                                            (index + 1)
                                                                    }}</span>
                                                                <span class="li-nft-footer-title">{{ getTierName(index)
                                                                }}</span>
                                                            </div>
                                                            <div v-if="showStats">
                                                                <div class="box-main-stats">
                                                                    <span style="font-weight: 700;">Total</span>
                                                                    <span style="font-weight: 700;">{{
                                                                            parseFloat(profits[index] *
                                                                                periods[index]).toFixed(1)
                                                                    }}%</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Strength</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Health</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Agility</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                                <div class="cab-row cab-row-stats">
                                                                    <span
                                                                        class="li-nft-footer-amount card-footer-stats">Magic</span>
                                                                    <span
                                                                        class="li-nft-footer-amount-2 card-footer-stats">{{
                                                                                stats[index]
                                                                        }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mint-nft-block" style="width: 100% !important; display: flex; flex-direction: row; margin-top: 3px;
                                                            padding-left: 4px; padding-right: 4px; font-size: 12px;">
                                                            <div class="input-title"
                                                                style="width: auto; line-height: unset; margin-top: 10px;">
                                                                {{ "Value" }}</div>
                                                            <div class="price-card-wrap"
                                                                style="width: 100%; text-align: right; position: relative; right: 0;">
                                                                <span type="number" @input="disablePercWatcher = true">
                                                                    {{ price }}
                                                                </span>
                                                                <span class="coin">USDC</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mint-nft-block" style="margin-top: 0px;">
                                                        <button v-if="isApproved(index)" :disabled="showLoader"
                                                            @click="MintNFT(index)" class="btn btn-mint">
                                                            {{ translatesGet("MINT") }}
                                                        </button>
                                                        <button v-if="!isApproved(index)" :disabled="showLoader"
                                                            @click="approve(index)" class="btn btn-mint">
                                                            {{ translatesGet("APPROVE") }}
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="cab-row">
                                <div class="cab-row-card mint-nft-img">
                                    <div class="card-header card-header-mobile">
                                        <div class="card-header-icon earn-buy"></div>
                                        <div>
                                            <div class="h4">{{ translatesGet("MINT_NFT") }}</div>
                                            <div class="h5">
                                                {{ translatesGet("YOUR_NFTS_DESCR") }}
                                            </div>
                                        </div>
                                        <a class="link link-learn-more" target="_blank" rel="nofollow"
                                            href="https://eggroi.gitbook.io/eggroi/nft-purchase-on-the-eggroi-platform">
                                            {{ translatesGet("LEARN_MORE") }}
                                            <i class="i-arrow-right-3"></i>
                                        </a>
                                    </div>

                                    <div class="card-header card-header-nft-image-buy card-header-mobile">
                                        <div class="slider-nft-wrap">
                                            <ul class="ul-our-nfts" :class="'ul-binance'">
                                                <li v-for="(price, index) of prices"
                                                    @click="setSelectedEgg(price, index)"
                                                    :style="[index == selectedIndex ? { 'opacity': '1' } : { 'opacity': '1' }]"
                                                    class="li-our-nfts nft-list-buy nft-list-buy-page li-nft-red">
                                                    <div class="li-our-nft-wrap" @click="showStats = showStats">
                                                        <div class="card-egg-image">
                                                            <img class="card-egg-image-img" :src="getNftImage(index)" />
                                                        </div>
                                                        <div class="li-nft-footer">
                                                            <div style="width: 100%">
                                                                <span class="li-nft-footer-title">{{
                                                                        "Stats"
                                                                }}</span>
                                                                <div class="stake-nft-value-tier">
                                                                    <span class="li-nft-footer-title"
                                                                        :class="getClassOnTier(+index + 1)">{{ "TIER " +
                                                                                (index + 1)
                                                                        }}</span>
                                                                    <span class="li-nft-footer-title">{{
                                                                            getTierName(index)
                                                                    }}</span>
                                                                </div>
                                                                <div v-if="showStats">
                                                                    <div class="box-main-stats">
                                                                        <span style="font-weight: 700;">Total</span>
                                                                        <span style="font-weight: 700;">{{
                                                                                parseFloat(profits[index] *
                                                                                    periods[index]).toFixed(1)
                                                                        }}%</span>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Strength</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[0]
                                                                            }}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Health</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[1]
                                                                            }}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Agility</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[2]
                                                                            }}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Magic</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{
                                                                                    index != selectedIndex ? stats[index] :
                                                                                        slectedStats[3]
                                                                            }}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="mint-nft-block"
                                                                style="width: 100% !important; display: flex; flex-direction: row; margin-top: 3px;
                                                                padding-left: 4px; padding-right: 4px; font-size: 12px;">
                                                                <div class="input-title"
                                                                    style="width: auto; line-height: unset; margin-top: 10px;">
                                                                    {{ "Value" }}</div>
                                                                <div class="price-card-wrap"
                                                                    style="width: 100%; text-align: right; position: relative; right: 0;">
                                                                    <span type="number"
                                                                        @input="disablePercWatcher = true"> {{ price }}
                                                                    </span>
                                                                    <span class="coin">USDC</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mint-nft-block" style="margin-top: 0px;">
                                                            <button v-if="isApproved(index)" :disabled="showLoader"
                                                                @click="MintNFT(index)" class="btn btn-mint">
                                                                {{ translatesGet("MINT") }}
                                                            </button>
                                                            <button v-if="!isApproved(index)" :disabled="showLoader"
                                                                @click="approve(index)" class="btn btn-mint">
                                                                {{ translatesGet("APPROVE") }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="cab-row" style="margin-top: 20px;">
                                <div class="cab-row-card">
                                    <div class="card-header">
                                        <div class="card-header-icon earn-buy"></div>
                                        <div>
                                            <div class="h4">{{ translatesGet("MINT_FREE_NFT") }}</div>
                                            <div class="h5">
                                                {{ translatesGet("FREE_EGG_BUY_DESCR") }}
                                            </div>
                                        </div>
                                        <a class="link link-learn-more" target="_blank" rel="nofollow"
                                            href="https://eggroi.gitbook.io/eggroi/nft-purchase-on-the-eggroi-platform">
                                            {{ translatesGet("LEARN_MORE") }}
                                            <i class="i-arrow-right-3"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="cab-row">
                                <div class="cab-row-card mint-nft-img">
                                    <div class="card-header card-header-nft-image-buy">
                                        <div class="slider-nft-wrap">
                                            <ul class="ul-our-nfts" :class="'ul-binance'"
                                                style="flex-direction: row; justify-content: flex-start !important; flex-flow: inherit;">
                                                <li @click="setSelectedEgg(freeEggData.price, 8)"
                                                    :style="[8 == selectedIndex ? { 'opacity': '1' } : { 'opacity': '1' }]"
                                                    class="li-our-nfts nft-list-buy nft-list-buy-page li-nft-red li-bonus-nft-mint">
                                                    <div class="li-our-nft-wrap" @click="showStats = showStats">
                                                        <div class="card-egg-image">
                                                            <img class="card-egg-image-img" :src="getNftImage(-1)" />
                                                        </div>
                                                        <div class="li-nft-footer">
                                                            <div style="width: 100%">
                                                                <div class="stake-nft-value-tier">
                                                                    <span class="li-nft-footer-title"
                                                                        :class="getClassOnTier(0)">{{ "TIER 0" }}</span>
                                                                    <span class="li-nft-footer-title">{{ "FREE EGG"
                                                                    }}</span>
                                                                </div>
                                                                <!--div class="icon logo-coin icon-card"></div-->
                                                                <div v-if="showStats">
                                                                    <div class="box-main-stats">
                                                                        <span style="font-weight: 700;">Total</span>
                                                                        <span style="font-weight: 700;">{{
                                                                                parseFloat(freeEggData.profit *
                                                                                    freeEggData.period).toFixed(1)
                                                                        }}%</span>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Strength</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{ freeEggData.stats }}</span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Health</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{ freeEggData.stats }}</span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Agility</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{ freeEggData.stats }}</span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Magic</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <!--div class="plus-minus-mint-button">-</div-->
                                                                            <span>{{ freeEggData.stats }}</span>
                                                                            <!--div class="plus-minus-mint-button">+</div-->
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mint-nft-block" style="margin-top: 0px;">
                                                            <button v-if="freeEggSypply > 0" :disabled="showLoader"
                                                                @click="MintNFT(-1)" class="btn btn-mint">
                                                                {{ translatesGet("CLAIM") }}
                                                            </button>
                                                            <button v-if="freeEggSypply == 0" :disabled="showLoader"
                                                                disabled="true" class="btn btn-mint not-enabled">
                                                                {{ translatesGet("OUT_OF_STOCK") }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li @click="setSelectedEgg(bonusEggData.price, 8)"
                                                    :style="[8 == selectedIndex ? { 'opacity': '1' } : { 'opacity': '1' }]"
                                                    class="li-our-nfts nft-list-buy nft-list-buy-page li-nft-red li-bonus-nft-mint">
                                                    <div class="li-our-nft-wrap" @click="showStats = showStats">
                                                        <div class="card-egg-image"
                                                            style="overflow: hidden; width: fit-content; height: fit-content; border-radius: 8px;">
                                                            <img class="card-egg-image-img" :src="getNftImage(10)"
                                                                style="" />
                                                        </div>
                                                        <div class="li-nft-footer">
                                                            <div style="width: 100%">
                                                                <div class="stake-nft-value-tier">
                                                                    <span class="li-nft-footer-title"
                                                                        :class="getClassOnTier(10)">{{ "TIER 9"
                                                                        }}</span>
                                                                    <span class="li-nft-footer-title">{{ "BONUS EGG"
                                                                    }}</span>
                                                                </div>
                                                                <div v-if="showStats">
                                                                    <div class="box-main-stats">
                                                                        <span style="font-weight: 700;">Total</span>
                                                                        <span style="font-weight: 700;">{{
                                                                                parseFloat(bonusEggData.profit *
                                                                                    bonusEggData.period).toFixed(1)
                                                                        }}%</span>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Strength</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ bonusEggData.stats }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Health</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ bonusEggData.stats }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Agility</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ bonusEggData.stats }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Magic</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ bonusEggData.stats }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mint-nft-block" style="margin-top: 0px;">
                                                            <button :disabled="showLoader"
                                                                @click="$router.push('/dashboard/mintlootbox')"
                                                                class="btn btn-mint btn-redirect">
                                                                {{ translatesGet("ONLY_FROM_LOOTBOX") + "&nbsp;" }} <i
                                                                    class="i-arrow-right-3"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li @click="setSelectedEgg(bonusEggData.price, 8)"
                                                    :style="[8 == selectedIndex ? { 'opacity': '1' } : { 'opacity': '1' }]"
                                                    class="li-our-nfts nft-list-buy nft-list-buy-page li-nft-red li-bonus-nft-mint">
                                                    <div class="li-our-nft-wrap" @click="showStats = showStats">
                                                        <div class="card-egg-image"
                                                            style="overflow: hidden; width: fit-content; height: fit-content; border-radius: 8px;">
                                                            <img class="card-egg-image-img-no-hop"
                                                                :src="getNftImage(9)" />
                                                        </div>
                                                        <div class="li-nft-footer">
                                                            <div style="width: 100%">
                                                                <div class="stake-nft-value-tier">
                                                                    <span class="li-nft-footer-title"
                                                                        :class="getClassOnTier(11)">{{ "TIER X"
                                                                        }}</span>
                                                                    <span class="li-nft-footer-title">{{ "COMING SOON"
                                                                    }}</span>
                                                                </div>
                                                                <div v-if="showStats">
                                                                    <div class="box-main-stats">
                                                                        <span style="font-weight: 700;">Total</span>
                                                                        <span style="font-weight: 700;">{{ "-"
                                                                        }}%</span>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Strength</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ "-" }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Health</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ "-" }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Agility</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ "-" }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="cab-row cab-row-stats">
                                                                        <span
                                                                            class="li-nft-footer-amount card-footer-stats">Magic</span>
                                                                        <div class="li-nft-footer-amount-2 card-footer-stats"
                                                                            style="text-align: left !important; display: flex; flex-direction: row; justify-content: flex-end;">
                                                                            <span>{{ "-" }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mint-nft-block" style="margin-top: 0px;">
                                                            <button :disabled="showLoader" disabled="true"
                                                                class="btn btn-mint not-enabled">
                                                                {{ translatesGet("COMING_SOON") }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
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
</template>
<script>
import MultiLang from "@/core/multilang";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import TransferModal from "../../../components/ModalWindows/TransferModal.vue";
import { mapState } from "vuex";
import conf from "../../../../config.json";
import { ethers } from "ethers";

export default {
    name: "MintNFT",

    data() {
        return {
            lang: new MultiLang(this),
            inputActive: false,
            usdcAmount: "",
            showStats: true,
            prices: conf.EGG_DATA.prices,
            stats: conf.EGG_DATA.stats,
            profits: conf.EGG_DATA.profits,
            periods: conf.EGG_DATA.periods,
            freeEggData: conf.FREE_EGG_DATA,
            bonusEggData: conf.BONUS_EGG_DATA,
            amount1: false,
            amount2: false,
            amount3: false,
            amount4: false,
            freeEggSypply: 0,
            usdcApprovedAmount: 0,
            showLoader: false,
            showInputError: false,
            inputErrorText: "",
            selectedIndex: 7,
            slectedStats: [79, 79, 79, 79],
            selectedNft: null,
            showTransferModal: false,
            disablePercWatcher: false,
            selectedToken: "",
            onlyData: false,
            options: {
                dotSize: 14,
                width: "auto",
                height: 4,
                contained: false,
                direction: "ltr",
                data: null,
                dataLabel: "label",
                dataValue: "value",
                min: 0,
                max: 100,
                interval: 1,
                disabled: false,
                clickable: true,
                duration: 0.5,
                adsorb: false,
                lazy: false,
                tooltip: "active",
                tooltipPlacement: "top",
                tooltipFormatter: void 0,
                useKeyboard: false,
                keydownHook: null,
                dragOnClick: false,
                enableCross: true,
                fixed: false,
                minRange: void 0,
                maxRange: void 0,
                order: true,
                marks: false,
                dotOptions: void 0,
                dotAttrs: void 0,
                process: true,
                dotStyle: void 0,
                railStyle: void 0,
                processStyle: void 0,
                tooltipStyle: void 0,
                stepStyle: void 0,
                stepActiveStyle: void 0,
                labelStyle: void 0,
                labelActiveStyle: void 0,
            },
        };
    },
    components: {
        VueSlider,
        TransferModal,
    },

    methods: {
        async checkFreeEggSupply() {
            try {
                let nftContract = this.$root.core[`alphaTribeNft_${this.currentBlockchain}`];
                let res = await nftContract.freeEggSupply();
                this.freeEggSypply = Number(res);
            } catch (err) {
                // err
            }

        },
        async checkUsdcAllowance() {
            let nftContract_Address = this.$root.core[`alphaTribeNft_${this.currentBlockchain}`].address;
            let usdcContract = this.$root.core[`USDC_${this.currentBlockchain}`]
            let res = await usdcContract.allowance(this.currentAddress, nftContract_Address);
            this.usdcApprovedAmount = Number(res);
        },
        isApproved(nft) {
            let needed = conf["EGG_DATA"]["prices"][(nft)];
            return this.usdcApprovedAmount >= needed * 1e18;
        },
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
        focusInputIn() {
            return (this.inputActive = true);
        },
        focusInputOut() {
            return (this.inputActive = false);
        },
        decrementStats(i) {
            this.slectedStats[i] = this.slectedStats[i] - 1;
            console.log(this.slectedStats[i]);
        },
        getNftImage(index) {
            var images = require.context("/src/assets/images/all/", false, /\.png$/);
            return images("./nft-" + (index + 1) + ".png");
        },
        getClassOnTier(tier) {
            return "label-tier-" + tier;
        },
        getTierName(tier) {
            return String(conf["EGG_DATA"].name[tier]).toUpperCase();
        },
        getNameFromIndex(index) {
            return index == 3 ? "Legendary" : index == 2 ? "Epic" : index == 1 ? "Rare" : "Common";
        },
        getRarityClassNameByIndex(index) {
            return index == 3
                ? "rarity-label-title-legendary" : index == 2
                    ? "rarity-label-title-epic" : index == 1
                        ? "rarity-label-title-rare" : "rarity-label-title-common";
        },
        setSelectedEgg(amount, _selectedIndex) {
            if (this.selectedIndex == _selectedIndex) return;
            this.selectedIndex = _selectedIndex;
            this.slectedStats = [this.stats[_selectedIndex], this.stats[_selectedIndex], this.stats[_selectedIndex], this.stats[_selectedIndex]]
            this.usdcAmount = parseFloat(
                Number(this.$root.core.withoutRound(amount, 4))
            );
        },
        setusdcAmount(perc) {
            const amount = (this.userERC20Balance * perc) / 100;
            this.usdcAmount = parseFloat(
                Number(this.$root.core.withoutRound(amount, 4))
            );
        },
        async approve(nft) {
            try {
                this.showLoader = true;
                let stakeContract_Address = this.$root.core[`alphaTribeNft_${this.currentBlockchain}`].address;
                let toApprove = BigInt((conf["EGG_DATA"]["prices"][(nft)]) * 1e21 * 1e21);
                let usdcContract = this.$root.core[`USDC_${this.currentBlockchain}`]
                let res = await usdcContract.approve(stakeContract_Address, toApprove);
                if (res.wait) {
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                    });
                    this.checkUsdcAllowance();
                    await res.wait();
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `Transaction was confirmed! You may now stake your NFT.`,
                    });
                }
                res = await this.MintNFT(nft);
                this.showLoader = false;
            } catch (error) {
                console.log(error);
                this.showLoader = false;
                this.$root.core.handleError(error);
                return;
            }
        },
        async MintNFT(index) {
            if (
                !this.currentAddress ||
                this.currentAddress === "0x0000000000000000000000000000000000000000"
            ) {
                this.$emit("changeWallet");
                return;
            }
            if (!this.usdcAmount) {
                this.disablePercWatcher = true;
                this.usdcAmount = 17;
            }

            if (this.usdcAmount > 99999.9999) {
                this.$store.commit("push_notification", {
                    type: "error",
                    typeClass: "error",
                    message: `Max purchase amount is 99999.9999`,
                });
                this.usdcAmount = Math.min(
                    (this.userERC20Balance * 98) / 100,
                    99999.9999
                );
            } else if (this.usdcAmount > (this.userERC20Balance * 98) / 100) {
                this.$store.commit("push_notification", {
                    type: "error",
                    typeClass: "error",
                    message: `The amount you entered exceeds your wallet balance. Please try an amout within your balance.`,
                });
                return;
            }

            this.usdcAmount = parseFloat(
                Number(this.$root.core.withoutRound(this.usdcAmount, 4))
            );
            try {
                if (this.usdcAmount < conf[this.currentBlockchain].MIN_NFT_PRICE) {
                    this.$store.commit("push_notification", {
                        type: "error",
                        typeClass: "error",
                        message: `The minimum NFT mint price is ${conf[this.currentBlockchain].MIN_NFT_PRICE
                            } ${this.currency}`,
                    });
                    return;
                }
                this.showLoader = true;
                const refs = await this.$root.core.getReferrers(this.currentAddress);
                const res = await this.$root.core.buyNFT(this.currentAddress, refs, (index + 1));

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
                //fbq("track", "Lead");
                await res.wait(5);
            } catch (error) {
                this.showLoader = false;
                this.$root.core.handleError(error);
                return;
            }
        },
        // async addNftToWallet(nft) {
        //     if (window.ethereum && localStorage.getItem("selectedWallet") === "metamask") {
        //         try {
        //             // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        //             await window.ethereum.request({
        //                 method: "wallet_watchAsset",
        //                 params: {
        //                     type: "ERC721",
        //                     options: {
        //                         address: conf[this.currentBlockchain].NFT_CONTRACT,
        //                         symbol: "PSDC",
        //                         id: nft.id,
        //                         decimals: 0, // The number of decimals in the token
        //                     },
        //                 },
        //             });
        //         } catch (error) {
        //             alert(error.message);
        //         }
        //     } else if (window.localStorage.getItem("selectedWallet") === "walletconnect") {
        //         try {
        //             await this.$root.core.provider.provider.request({
        //                 method: "wallet_watchAsset",
        //                 params: {
        //                     type: "ERC20",
        //                     options: {
        //                         address: token.address,
        //                         symbol: token.tag,
        //                         decimals: token.decimals || 18, // The number of decimals in the token
        //                         image: `${conf.REF_BASE}tokens/${token.tag.toLowerCase()}.png`, // A string url of the token logo
        //                     },
        //                 },
        //             });
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // },
        async transfer(nft) {
            this.selectedNft = nft;
            this.showTransferModal = true;
            return;
        },
    },
    mounted() {
        let _this = this;
        let counter = 0;

        let refreshRate = 100;
        var i = setInterval(function () {
            if (_this.currentBlockchain) {
                try {
                    _this.checkUsdcAllowance();
                    _this.checkFreeEggSupply();
                } catch (err) { }
                refreshRate = 10000;
            }
        }, refreshRate);

        if (Number(_this?.$router?.currentRoute?.params?.chosenPrice) > 0) {
            setTimeout(async function init() {
                try {
                    if (
                        Number(_this?.$router?.currentRoute?.params?.chosenPrice) > 0 &&
                        _this.currentAddress &&
                        _this.currentAddress !==
                        "0x0000000000000000000000000000000000000000" &&
                        _this.userERC20Balance !== null &&
                        Number(_this.currentBlockchain) ===
                        Number(_this?.$router?.currentRoute?.params?.chosenBlockchain)
                    ) {
                        _this.disablePercWatcher = true;
                        _this.usdcAmount =
                            _this?.$router?.currentRoute?.params?.chosenPrice.toString();
                    } else if (
                        _this.currentBlockchain &&
                        Number(_this.currentBlockchain) !==
                        Number(_this?.$router?.currentRoute?.params?.chosenBlockchain)
                    ) {
                        window.localStorage.setItem(
                            "selectedPrice",
                            JSON.stringify({
                                price: _this?.$router?.currentRoute?.params?.chosenPrice,
                                chain: _this?.$router?.currentRoute?.params?.chosenBlockchain,
                            })
                        );
                        const symbol =
                            _this.currentBlockchain === 43114 ? "avax" : _this.currentBlockchain === 43113 ? "avaxtest" : "";
                        _this.$store.commit("push_notification", {
                            type: "warning",
                            typeClass: "warning",
                            message: `It seems that you preselected ${Number(
                                _this?.$router?.currentRoute?.params?.chosenBlockchain) === 43114
                                || Number(_this?.$router?.currentRoute?.params?.chosenBlockchain) === 43113
                                ? "Avalanche"
                                : ""
                                } network. If you want to use it, please accept network change in your wallet. Otherwise you may continue use the website.`,
                        });
                        await _this.$root.core.changeNetwork(symbol);
                    } else if (!window.localStorage.getItem("selectedWallet")) {
                        window.localStorage.setItem(
                            "selectedPrice",
                            JSON.stringify({
                                price: _this?.$router?.currentRoute?.params?.chosenPrice,
                                chain: _this?.$router?.currentRoute?.params?.chosenBlockchain,
                            })
                        );
                        return;
                    } else {
                        throw Error("No current blockchain or address");
                    }
                } catch (error) {
                    console.log(error);
                    if (counter < 7) {
                        counter++;
                        setTimeout(init, 600);
                        return;
                    } else {
                        window.localStorage.setItem(
                            "selectedPrice",
                            JSON.stringify({
                                price: _this?.$router?.currentRoute?.params?.chosenPrice,
                                chain: _this?.$router?.currentRoute?.params?.chosenBlockchain,
                            })
                        );
                        return;
                    }
                }
            }, 300);
        } else if (window.localStorage.getItem("selectedPrice")) {
            const obj = JSON.parse(window.localStorage.getItem("selectedPrice"));
            setTimeout(function init() {
                try {
                    if (
                        _this.currentAddress &&
                        _this.currentAddress !==
                        "0x0000000000000000000000000000000000000000" &&
                        _this.userERC20Balance !== null &&
                        (Number(_this.currentBlockchain) === Number(obj.chain))
                    ) {
                        _this.disablePercWatcher = true;
                        _this.usdcAmount = obj.price.toString();
                        window.localStorage.removeItem("selectedPrice");
                    } else {
                        throw Error("No current blockchain or address");
                    }
                } catch (error) {
                    console.log(error);
                    if (counter < 10) {
                        counter++;
                        setTimeout(init, 700);
                        return;
                    }
                }
            }, 300);
        }

        this.lang.init();
        // setTimeout(async () => {
        //     this.lang.init();
        //     if (this.currentAddress && this.currentBlockchain) {
        //         const res = await this.$root.core.estimateGas("buy", {
        //             ref: await this.$root.core.getReferrers(this.currentAddress),
        //             decimals: 18,
        //             amount: "0.01",
        //         });
        //         this.feeForNftPurchase = (Number(res) * conf[this.currentBlockchain].DEFAULT_GAS_PRICE_GWEI * 10 ** 9) / 10 ** 18;
        //         console.log("fee calculated");
        //     }
        // }, 1200);
    },
    computed: {
        ...mapState([
            "userCoinBalance",
            "userERC20Balance",
            "currentBlockchain",
            "userNftsData",
            "currentAddress",
            "currency",
        ]),
        getImage() {
            if (this.currentBlockchain === 43114 || this.currentBlockchain === 43113) {
                const eggNumber =
                    Number(this.usdcAmount) < 0.1
                        ? "56" + "-1"
                        : Number(this.usdcAmount) < 1
                            ? "56" + "-2"
                            : Number(this.usdcAmount) < 2
                                ? "56" + "-3"
                                : Number(this.usdcAmount) < 5
                                    ? "56" + "-4"
                                    : Number(this.usdcAmount) < 10
                                        ? "56" + "-5"
                                        : Number(this.usdcAmount) < 50
                                            ? "56" + "-6"
                                            : Number(this.usdcAmount) < 100
                                                ? "56" + "-7"
                                                : "56" + "-8";
                return `${eggNumber}`;
            } else if (this.currentBlockchain === 137) {
                const eggNumber =
                    Number(this.usdcAmount) < 35
                        ? "137" + "-1"
                        : Number(this.usdcAmount) < 350
                            ? "137" + "-2"
                            : Number(this.usdcAmount) < 700
                                ? "137" + "-3"
                                : Number(this.usdcAmount) < 1700
                                    ? "137" + "-4"
                                    : Number(this.usdcAmount) < 3500
                                        ? "137" + "-5"
                                        : Number(this.usdcAmount) < 17000
                                            ? "137" + "-6"
                                            : Number(this.usdcAmount) < 35000
                                                ? "137" + "-7"
                                                : "137" + "-8";
                return `${eggNumber}`;
            } else if (!this.currentBlockchain) {
                const eggNumber =
                    Number(this.usdcAmount) < 0.1
                        ? "56-1"
                        : Number(this.usdcAmount) < 1
                            ? "56-2"
                            : Number(this.usdcAmount) < 2
                                ? "56-3"
                                : Number(this.usdcAmount) < 5
                                    ? "56-4"
                                    : Number(this.usdcAmount) < 10
                                        ? "56-5"
                                        : Number(this.usdcAmount) < 50
                                            ? "56-6"
                                            : Number(this.usdcAmount) < 100
                                                ? "56-7"
                                                : "56-8";
                return `${eggNumber}`;
            }
        },
        nfts() {
            if (
                this.userNftsData &&
                this.currentBlockchain &&
                this.currentAddress &&
                this.currentAddress !== "0x0000000000000000000000000000000000000000"
            ) {
                // const arr = this.userNftsData[this.currentBlockchain][conf[this.currentBlockchain].NFT_CONTRACT] || [];
                // return arr.sort((a, b) => b.id - a.id);
                return this.userNftsData;
            }
            return null;
        },
        points() {
            return [
                {
                    value: 0,
                    step: 1,
                },
                {
                    value: 25,
                    step: 1,
                },
                {
                    value: 50,
                    step: 1,
                },
                {
                    value: 75,
                    step: 1,
                },
                {
                    value: 100,
                    step: 1,
                },
            ];
        },
        marks() {
            return this.points.map((point) => point.value);
        },
    },
    watch: {
        nfts: function (newVal, oldVal) {
            if (newVal && oldVal && newVal.length !== oldVal.length) {
                this.showLoader = false;
                if (newVal.length > oldVal.length) {
                    this.$store.commit("clear_notifications", []);
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `Congrats! You have successfully minted your AlphaTribe NFT.`,
                    });
                }
            }
        },

        usdcAmount: function (newVal, oldVal) {
            if (newVal.toString().length > 10) {
                this.usdcAmount = oldVal;
                setTimeout(() => {
                    this.showInputError = true;
                    this.inputErrorText = "Amount should be less than 10 digits ";
                }, 50);
                setTimeout(() => {
                    this.showInputError = false;
                    this.inputErrorText = "";
                }, 3000);
            }
            if (newVal > 99999.9999) {
                this.showInputError = true;
                this.inputErrorText = "Max price cannot be higher than 99999.9999";
            } else if (newVal > 0 && newVal < 0.01) {
                this.showInputError = true;
                this.inputErrorText = "Min price should be at least 0.01";
            } else {
                this.showInputError = false;
                this.inputErrorText = "";
            }
        },
    },
};
</script>
