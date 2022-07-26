<template>
    <div class="main-home" :class="{ 'home-binance': getPreselectedChain == 'binance', 'home-polygon': getPreselectedChain == 'polygon' }">
        <header :class="{ 'header-fixed': fixedHeader, 'header-hidden': hiddenHeader, 'header-menu': showMenu == true }">
            <div class="container">
                <div class="header-wrapper">
                    <button class="logo" @click="toTop(), (showMenu = false)"></button>

                    <nav class="header-nav">
                        <ul>
                            <li>
                                <a href="#section-our-nft">{{ translatesGet("OUR_NFT") }}</a>
                            </li>
                            <li>
                                <a href="#section-staking">{{ translatesGet("STAKING") }}</a>
                            </li>
                            <li>
                                <a href="#section-earn">{{ translatesGet("HOW_TO_EARN") }}</a>
                            </li>
                            <li>
                                <a href="#section-bounty-program">{{ translatesGet("INCENTIVE_PROGRAM") }}</a>
                            </li>
                        </ul>
                        <div
                            class="network-wrap"
                            @mouseover="showNetwork = true"
                            @mouseout="showNetwork = false"
                            @click="showMobNetwork = !showMobNetwork"
                            :class="{ 'network-active': showNetwork, 'network-mob-active': showMobNetwork }"
                        >
                            <button class="btn btn-network-main">
                                <div class="btn-network-wrap">
                                    <div class="network-title">
                                        {{ translatesGet("SWITCH_NET") }}
                                    </div>
                                    <span v-if="getPreselectedChain === 'binance'">BNB Chain</span>
                                    <span v-else>Polygon</span>
                                </div>
                                <i
                                    class="icon-current-network"
                                    :class="{ 'icon-bsc': getPreselectedChain == 'binance', 'icon-matic': getPreselectedChain == 'polygon' }"
                                ></i>
                            </button>
                            <div class="networks">
                                <div class="list-networks">
                                    <div @click="setPreselectedChain(56)" class="network-item" :class="{ active: getPreselectedChain == 'binance' }">
                                        <i class="icon-network icon-bsc"></i>
                                        <span>BNB Chain</span>
                                    </div>
                                    <div @click="setPreselectedChain(137)" class="network-item" :class="{ active: getPreselectedChain == 'polygon' }">
                                        <i class="icon-network icon-matic"></i>
                                        <span>Polygon</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="switcher-network-wrap" :class="{ active1: getPreselectedChain == 'binance', active2: getPreselectedChain == 'polygon' }">
                            <button @click="setPreselectedChain(56)" class="btn-switch-network">
                                <div class="icon-wrap">
                                    <i class="icon-bsc"></i>
                                </div>
                            </button>
                            <button @click="setPreselectedChain(137)" class="btn-switch-network">
                                <div class="icon-wrap">
                                    <i class="icon-matic"></i>
                                </div>
                            </button>
                        </div>
                        <div>
                            <button class="btn btn-connect" @click="$router.push('/dashboard/buynft')">{{ translatesGet("LAUNCH_APP") }}</button>
                        </div>
                    </nav>
                    <button v-if="showMenu == false" @click="showMenu = true" class="btn-mobile-menu show"></button>
                    <button v-else @click="showMenu = false" class="btn-mobile-menu close"><i class="icon-close"></i></button>
                </div>
            </div>
        </header>
        <div v-if="showMenu == true" class="mobile-menu">
            <div class="container">
                <div class="mobile-section">
                    <ul class="mobile-menu-list">
                        <li>
                            <a @click="showMenu = false" href="#section-our-nft">{{ translatesGet("OUR_NFT") }}</a>
                        </li>
                        <li>
                            <a @click="showMenu = false" href="#section-staking">{{ translatesGet("STAKING") }}</a>
                        </li>
                        <li>
                            <a @click="showMenu = false" href="#section-earn">{{ translatesGet("HOW_TO_EARN") }}</a>
                        </li>
                        <li>
                            <a @click="showMenu = false" href="#section-bounty-program">{{ translatesGet("INCENTIVE_PROGRAM") }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="mobile-section mobile-section-btn">
                    <button class="btn btn-connect" @click="$router.push('/dashboard/buynft')">{{ translatesGet("LAUNCH_APP") }}</button>
                </div>
            </div>
        </div>
        <main :class="{ 'opened-mobile': showMenu == true }">
            <section class="section-main">
                <div class="container">
                    <div class="section-wrap">
                        <div class="section-half half-content">
                            <div class="h2 h1">
                                <span>{{ translatesGet("EARN") }}</span>
                                <span class="emphasize">{{ translatesGet("UP_TO_PERC") }}</span>
                                <span>{{ translatesGet("ON_NFT_STAKING") }}</span>
                            </div>
                            <div class="h5">
                                {{ translatesGet("TITLE_DESC") }}
                            </div>
                            <div class="btn-wrap">
                                <!-- <router-link class="btn btn-buy-nft" to="/dashboard/buynft">{{ translatesGet("BUY_NFT") }} </router-link> -->
                                <a href="#section-our-nft" class="btn btn-buy-nft">{{ translatesGet("BUY_NFT") }} </a>
                            </div>
                            <div class="half-img section-mobile">
                                <div class="img-wrap">
                                    <img src="@/assets/images/all/main-img.webp" alt="main-img" />
                                    <div class="img-comment comment">{{ translatesGet("QUACK_1") }}</div>
                                </div>
                            </div>
                            <div class="audited" v-if="getPreselectedChain != 'polygon'">
                                <div class="title-upper">{{ translatesGet("AUDITED_BY") }}</div>
                                <ul class="audited-logos">
                                    <a href="https://posduck.gitbook.io/posduck-dock/audited" target="_blank">
                                        <li>
                                            <span class="haze-crypto"></span>
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </div>

                        <div class="section-half half-img section-desctop">
                            <div class="img-wrap">
                                <img src="@/assets/images/all/main-img.webp" alt="main-img" />
                                <div class="img-comment comment">{{ translatesGet("QUACK_1") }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="main-wrapp-content">
                <section class="section-main-statistics">
                    <div class="container">
                        <ul class="main-statistics">
                            <li>
                                <span class="title-upper">{{ translatesGet("NFT_SOLD") }}</span>
                                <span class="h3">{{ siteData && siteData[preselectedChain].NFT.totalNftsSold }}</span>
                            </li>
                            <li>
                                <span class="title-upper">{{ translatesGet("NFT_VOLUME") }}</span>
                                <span class="h3"
                                    >{{
                                        preselectedChain === 56
                                            ? siteData && siteData[preselectedChain].NFT.totalAmountSoldNft > 0
                                                ? siteData[preselectedChain].NFT.totalAmountSoldNft.toFixed(2)
                                                : "0.00"
                                            : siteData && siteData[preselectedChain].NFT.totalAmountSoldNft > 0
                                            ? siteData[preselectedChain].NFT.totalAmountSoldNft.toFixed(0)
                                            : "0"
                                    }}
                                    {{ currency }}</span
                                >
                            </li>
                            <li>
                                <span class="title-upper">{{ translatesGet("TOTAL_PARTICIPANTS") }}</span>
                                <span class="h3">{{ siteData && siteData[preselectedChain].NFT.uniqueUsers }}</span>
                            </li>
                            <li>
                                <span class="title-upper">{{ translatesGet("INCOME_FROM_REF") }}</span>
                                <span class="h3"
                                    >{{
                                        preselectedChain === 56
                                            ? siteData && siteData[preselectedChain].STAKE.refTotalTurnover > 0
                                                ? siteData[preselectedChain].STAKE.refTotalTurnover.toFixed(2)
                                                : "0.00"
                                            : siteData && siteData[preselectedChain].STAKE.refTotalTurnover > 0
                                            ? siteData[preselectedChain].STAKE.refTotalTurnover.toFixed(0)
                                            : "0"
                                    }}
                                    {{ currency }}</span
                                >
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="section-our-nft" id="section-our-nft">
                    <div class="container">
                        <div class="section-wrap">
                            <div class="section-half">
                                <div class="h2">{{ translatesGet("OUR_NFT") }}</div>
                                <div v-if="getPreselectedChain != 'polygon'" class="h5">
                                    {{ translatesGet("OUR_NFT_DESC") }}
                                </div>
                                <div v-if="getPreselectedChain == 'polygon'" class="h5">
                                    {{ translatesGet("OUR_NFT_DESC_MATIC") }}
                                </div>
                            </div>
                            <div class="section-half">
                                <div class="">
                                    <div class="chat-row chat-right">
                                        <div class="comment">
                                            <span>{{ translatesGet("QUACK_2") }}</span>
                                        </div>
                                        <div class="chat-avatar she">
                                            <div class="avatar-img"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SliderNFT />
                    </div>
                </section>
                <section class="section-staking" id="section-staking">
                    <div class="container">
                        <div class="section-wrap">
                            <div class="section-half section-half-content">
                                <div class="title-row">
                                    <div class="h2">{{ translatesGet("LIMITED_STAKING") }}</div>
                                    <a
                                        class="link link-learn-more"
                                        target="_blank"
                                        rel="nofollow"
                                        href="https://posduck.gitbook.io/posduck-dock/staking-pool-types"
                                        >{{ translatesGet("LEARN_MORE") }}<i class="i-arrow-right-3"></i
                                    ></a>
                                </div>
                                <div class="h5">
                                    {{ translatesGet("LIMITED_STAKING_DESC") }}
                                </div>
                                <ul class="home-list">
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("LIMITED_STAKING_DESC_1") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("LIMITED_STAKING_DESC_2") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span v-if="getPreselectedChain != 'polygon'"> {{ translatesGet("LIMITED_STAKING_DESC_3") }}</span>
                                        <span v-else> {{ translatesGet("LIMITED_STAKING_DESC_3_MATIC") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("LIMITED_STAKING_DESC_4") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("LIMITED_STAKING_DESC_5") }}</span>
                                    </li>
                                </ul>
                                <router-link class="btn btn-go-staking" to="/dashboard/staking">{{ translatesGet("STAKE_NOW") }}</router-link>
                            </div>
                            <div class="section-half section-half-programs">
                                <ul class="programs-wrap">
                                    <li class="program-item light-blue">
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("POOL") }}-S</span>
                                            <span class="program-col-value">17 {{ translatesGet("DAYS") }}</span>
                                        </div>
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("PROFIT_PER_PERIOD") }}</span>
                                            <span class="program-col-value">120%</span>
                                        </div>
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("PROFIT_PER_DAY") }}</span>
                                            <span class="program-col-value">7.06%</span>
                                        </div>
                                    </li>
                                    <li class="program-item dark-blue">
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("POOL") }}-M</span>
                                            <span class="program-col-value">27 {{ translatesGet("DAYS") }}</span>
                                        </div>
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("PROFIT_PER_PERIOD") }}</span>
                                            <span class="program-col-value">140%</span>
                                        </div>
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("PROFIT_PER_DAY") }}</span>
                                            <span class="program-col-value">5.19%</span>
                                        </div>
                                    </li>
                                    <li class="program-item light-green">
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("POOL") }}-L</span>
                                            <span class="program-col-value">47 {{ translatesGet("DAYS") }}</span>
                                        </div>
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("PROFIT_PER_PERIOD") }}</span>
                                            <span class="program-col-value">220%</span>
                                        </div>
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("PROFIT_PER_DAY") }}</span>
                                            <span class="program-col-value">4.68%</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-unlimited-staking" id="section-un-staking">
                    <div class="container">
                        <div class="section-wrap">
                            <div class="section-half section-half-content">
                                <div class="title-row">
                                    <div class="h2">{{ translatesGet("UNLIMITED_STAKING") }}</div>
                                    <a class="link link-learn-more" href=""></a>
                                </div>
                                <div class="h5">{{ translatesGet("UNLIMITED_STAKING_DESC") }}</div>
                                <ul class="home-list">
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span v-if="getPreselectedChain != 'polygon'"> {{ translatesGet("UNLIMITED_STAKING_DESC_1") }}</span>
                                        <span v-else> {{ translatesGet("UNLIMITED_STAKING_DESC_1_MATIC") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("UNLIMITED_STAKING_DESC_2") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("UNLIMITED_STAKING_DESC_3") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("UNLIMITED_STAKING_DESC_4") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("UNLIMITED_STAKING_DESC_5") }}</span>
                                    </li>
                                </ul>
                                <router-link class="btn btn-go-staking" to="/dashboard/staking">{{ translatesGet("GO_TO_STAKE") }}</router-link>
                            </div>
                            <div class="section-half section-half-programs">
                                <ul class="programs-wrap">
                                    <li class="program-item light-orange">
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("POOL") }}-XL</span>
                                            <span class="program-col-value unlim-desctop">{{ translatesGet("UNLIM_DAYS") }}</span>
                                            <span class="program-col-value unlim-mobile">{{ translatesGet("UNLIM_DAYS_MOBILE") }}</span>
                                        </div>
                                        <div class="program-col">
                                            <span class="program-col-title">{{ translatesGet("PROFIT_PER_DAY") }}</span>
                                            <span class="program-col-value">3.33%</span>
                                        </div>
                                    </li>
                                </ul>
                                <div class="chat-container">
                                    <div class="chat-row chat-left">
                                        <div class="chat-avatar she">
                                            <div class="avatar-img"></div>
                                        </div>
                                        <div class="comment">{{ translatesGet("WHY_UNLIM_POOL") }}</div>
                                    </div>
                                    <div class="chat-row chat-right">
                                        <div class="comment">{{ translatesGet("ANSWER_WHY") }}</div>
                                        <div class="chat-avatar he">
                                            <div class="avatar-img"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-boosts" id="section-boosts">
                    <div class="container">
                        <div class="section-wrap">
                            <div class="section-half half-img">
                                <img v-if="getPreselectedChain == 'binance'" src="@/assets/images/all/boosts-img-binance.png" alt="main-img" />
                                <img v-else src="@/assets/images/all/boosts-img-polygon.png" alt="main-img" />
                            </div>
                            <div class="section-half section-half-content">
                                <div class="title-row">
                                    <div class="h2">{{ translatesGet("BOOSTS") }}</div>
                                    <a target="_blank" rel="nofollow" class="link link-learn-more" href="https://posduck.gitbook.io/posduck-dock/boosts"
                                        >{{ translatesGet("LEARN_MORE") }}<i class="i-arrow-right-3"></i
                                    ></a>
                                </div>
                                <div v-if="getPreselectedChain == 'binance'" class="h5">
                                    {{ translatesGet("BOOSTS_DESC_BNB") }}
                                </div>
                                <div v-else class="h5">
                                    {{ translatesGet("BOOSTS_DESC_MATIC") }}
                                </div>
                                <div class="types-boosts">
                                    <div class="h6">{{ translatesGet("BOOSTS_TYPES") }}</div>
                                    <ul class="boosts-list">
                                        <li>
                                            <span class="boost-icon boost-time"></span>
                                            <span class="h4">{{ translatesGet("BOOSTS_TYPES_TITLE_1") }}</span>
                                            <span class="h7">{{ translatesGet("BOOSTS_TYPES_DESC_1") }}</span>
                                        </li>
                                        <li>
                                            <span class="boost-icon boost-percent"></span>
                                            <span class="h4">{{ translatesGet("BOOSTS_TYPES_TITLE_2") }}</span>
                                            <span class="h7">{{ translatesGet("BOOSTS_TYPES_DESC_2") }}</span>
                                        </li>
                                        <li>
                                            <span class="boost-icon boost-team"></span>
                                            <span class="h4">{{ translatesGet("BOOSTS_TYPES_TITLE_3") }}</span>
                                            <span class="h7">{{ translatesGet("BOOSTS_TYPES_DESC_3") }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <router-link class="btn btn-get-started" to="/dashboard/boosts">{{ translatesGet("BUY_BOOSTS") }}</router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section class="section-earn" id="section-earn">
                <div class="container">
                    <div class="h2">{{ translatesGet("HOW_TO_EARN_TITLE") }}</div>
                    <div class="h5">{{ translatesGet("HOW_TO_EARN_SUBTITLE") }}</div>
                    <div class="section-wrap">
                        <div class="section-half half-content">
                            <ul class="earn-list" v-if="getPreselectedChain != 'polygon'">
                                <li>
                                    <span class="earn-icon earn-buy"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_1") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_1") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-stake"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_2") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_2") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-boost"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_3") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_3") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-token"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_4") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_4") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-referral"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_5") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_5") }}</span>
                                </li>
                            </ul>
                            <ul class="earn-list" v-if="getPreselectedChain == 'polygon'">
                                <li>
                                    <span class="earn-icon earn-buy"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_1_MATIC") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_1_MATIC") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-stake"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_2_MATIC") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_2_MATIC") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-boost"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_3_MATIC") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_3_MATIC") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-token"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_4_MATIC") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_4_MATIC") }}</span>
                                </li>
                                <li>
                                    <span class="earn-icon earn-referral"></span>
                                    <span class="h4">{{ translatesGet("HOW_TO_EARN_LIST_TITLE_5_MATIC") }}</span>
                                    <span class="h7">{{ translatesGet("HOW_TO_EARN_LIST_DESC_5_MATIC") }}</span>
                                </li>
                            </ul>
                            <router-link class="btn btn-start-earn" to="/dashboard/buynft">{{ translatesGet("START_EARN") }}</router-link>
                        </div>
                        <div class="section-half half-img">
                            <img v-if="getPreselectedChain == 'binance'" src="@/assets/images/all/earn-img-binance.png" alt="main-img" />
                            <img v-else src="@/assets/images/all/earn-img-polygon.png" alt="main-img" />
                        </div>
                    </div>
                </div>
            </section>
            <section class="section-bounty-program" id="section-bounty-program">
                <div class="container">
                    <div class="block-center">
                        <div class="h2">{{ translatesGet("INCENTIVE_PROGRAM") }}</div>
                        <div class="h5">{{ translatesGet("INCENTIVE_PROGRAM_DESC") }}</div>
                        <div class="switcher">
                            <button class="btn-switcher" :class="{ active: switcher1 }" @click="(switcher2 = false), (switcher1 = true)">
                                {{ translatesGet("REFERRAL") }}
                            </button>
                            <button class="btn-switcher" :class="{ active: switcher2 }" @click="(switcher2 = true), (switcher1 = false)">
                                {{ translatesGet("LEADERSHIP") }}
                            </button>
                        </div>
                    </div>
                    <div v-if="switcher2 == true && switcher1 == false" class="section-wrap">
                        <div class="section-half section-half-table">
                            <div class="title-row">
                                <div class="h2">{{ translatesGet("LEADERSHIP_PROGRAMM") }}</div>
                                <a target="_blank" rel="nofollow" class="link link-learn-more" href="https://posduck.gitbook.io/posduck-dock/leadership-program"
                                    >{{ translatesGet("LEARN_MORE") }} <i class="i-arrow-right-3"></i
                                ></a>
                            </div>
                            <div class="section-container">
                                <div class="h5">{{ translatesGet("LEADERSHIP_PROGRAMM_DESC") }}</div>
                            </div>

                            <div class="custom-table custom-table-lead">
                                <div class="table-head">
                                    <div class="table-half">
                                        <div class="title-upper">{{ translatesGet("TABLE_HEAD_1") }}</div>
                                    </div>
                                    <div class="table-half">
                                        <div class="title-upper">{{ translatesGet("TABLE_HEAD_2") }}</div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">1</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">10</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "0.01" : "5" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 1</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-1">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +1%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">2</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">15</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "30" : "10 500" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 2</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-2">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +1.5%
                                                    </div>
                                                    <div class="boost-data-item boost-data-item-2">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                            />
                                                            <path
                                                                d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                            />
                                                        </svg>
                                                        +1%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">3</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">25</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "100" : "35 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 3</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-3">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +2%
                                                    </div>
                                                    <div class="boost-data-item boost-data-item-3">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                            />
                                                            <path
                                                                d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                            />
                                                        </svg>
                                                        +1.5%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">4</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">50</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "300" : "105 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 4</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-4">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +2.5%
                                                    </div>
                                                    <div class="boost-data-item boost-data-item-4">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                            />
                                                            <path
                                                                d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                            />
                                                        </svg>
                                                        +2%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">5</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">100</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "500" : "175 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 5</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-5">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +3%
                                                    </div>
                                                    <div class="boost-data-item boost-data-item-5">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                            />
                                                            <path
                                                                d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                            />
                                                        </svg>
                                                        +2.5%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">6</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">150</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "1 000" : "350 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 6</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-6">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +3.5%
                                                    </div>
                                                    <div class="boost-data-item boost-data-item-6">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                            />
                                                            <path
                                                                d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                            />
                                                        </svg>
                                                        +3%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">7</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">300</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "3 000" : "1 050 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 7</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-7">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +4%
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
                                                        +3.5%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">8</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">500</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "10 000" : "3 500 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 8</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-8">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +4.5%
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
                                                        +4%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">9</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">1 000</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "20 000" : "7 000 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 9</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-9">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +5%
                                                    </div>
                                                    <div class="boost-data-item boost-data-item-9">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                            />
                                                            <path
                                                                d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                            />
                                                        </svg>
                                                        +4.5%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">10</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("MEMBER") }}</div>
                                                <div class="table-value">2 500</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "50 000" : "17 000 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-boost">{{ translatesGet("BOOSTER_TEAM") }} 10</div>
                                                <div class="card-boost-data">
                                                    <div class="boost-data-item boost-data-item-10">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                                                            />
                                                        </svg>
                                                        +5.5%
                                                    </div>
                                                    <div class="boost-data-item boost-data-item-10">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                                                            />
                                                            <path
                                                                d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                                                            />
                                                        </svg>
                                                        +5%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-half section-half">
                            <div class="section-container">
                                <div class="chat-container">
                                    <div class="chat-row chat-left">
                                        <div class="chat-avatar she">
                                            <div class="avatar-img"></div>
                                        </div>
                                        <div class="comment">{{ translatesGet("QUACK_3") }}</div>
                                    </div>
                                    <div class="chat-row chat-right">
                                        <div class="comment">{{ translatesGet("QUACK_4") }}</div>
                                        <div class="chat-avatar he">
                                            <div class="avatar-img"></div>
                                        </div>
                                    </div>
                                </div>
                                <ul class="home-list">
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("LEADERSHIP_PROGRAMM_ITEM_1") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("LEADERSHIP_PROGRAMM_ITEM_2") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span>{{ translatesGet("LEADERSHIP_PROGRAMM_ITEM_3") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("LEADERSHIP_PROGRAMM_ITEM_4") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span>{{ translatesGet("LEADERSHIP_PROGRAMM_ITEM_5") }}</span>
                                    </li>
                                </ul>
                                <router-link class="btn btn-go-staking" to="/dashboard/program">{{ translatesGet("BECOME_A_LEADER") }}</router-link>

                                <div class="table-img-wrap">
                                    <img src="@/assets/images/all/img-table.png" alt="main-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="section-wrap">
                        <div class="section-half section-half-table">
                            <div class="title-row">
                                <div class="h2">{{ translatesGet("REFERRAL_PROGRAM") }}</div>
                                <a target="_blank" rel="nofollow" class="link link-learn-more" href="https://posduck.gitbook.io/posduck-dock/referral-program"
                                    >{{ translatesGet("LEARN_MORE") }} <i class="i-arrow-right-3"></i
                                ></a>
                            </div>
                            <div class="section-container">
                                <div class="h5" v-if="getPreselectedChain != 'polygon'">{{ translatesGet("REFERRAL_PROGRAM_DESC") }}</div>
                                <div class="h5" v-if="getPreselectedChain == 'polygon'">{{ translatesGet("REFERRAL_PROGRAM_DESC_MATIC") }}</div>
                            </div>
                            <div class="custom-table">
                                <div class="table-head">
                                    <div class="table-half">
                                        <div class="title-upper">{{ translatesGet("TABLE_HEAD_1") }}</div>
                                    </div>
                                    <div class="table-half">
                                        <div class="title-upper">{{ translatesGet("TABLE_HEAD_2") }}</div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">1</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "0.01" : "5" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">5%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">2</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "30" : "10 500" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">7%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">3</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "100" : "35 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">9%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">4</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "300" : "105 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">11%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">5</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "500" : "175 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">14%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">6</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "1 000" : "350 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">16%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">7</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "3 000" : "1 050 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">18%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- table-row -->
                                    <div class="table-row">
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("LEVEL") }}</div>
                                                <div class="table-value">8</div>
                                            </div>
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("STRUCT_TURNOVER") }}, {{ currency }}</div>
                                                <div class="table-value">{{ getPreselectedChain != "polygon" ? "10 000" : "3 500 000" }}</div>
                                            </div>
                                        </div>
                                        <div class="table-half">
                                            <div class="table-col">
                                                <div class="table-title">{{ translatesGet("REF_REWARD") }}</div>
                                                <div class="table-value">20%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-half section-half">
                            <div class="section-container">
                                <div class="chat-container">
                                    <div class="chat-row chat-left">
                                        <div class="chat-avatar she">
                                            <div class="avatar-img"></div>
                                        </div>
                                        <div class="comment">{{ translatesGet("QUACK_5") }}</div>
                                    </div>
                                    <div class="chat-row chat-right">
                                        <div class="comment">{{ translatesGet("QUACK_6") }}</div>
                                        <div class="chat-avatar he">
                                            <div class="avatar-img"></div>
                                        </div>
                                    </div>
                                </div>
                                <ul class="home-list">
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("REFERRAL_PROGRAM_ITEM_1") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span> {{ translatesGet("REFERRAL_PROGRAM_ITEM_2") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span>{{ translatesGet("REFERRAL_PROGRAM_ITEM_3") }}</span>
                                    </li>
                                    <li class="home-list-item">
                                        <div class="list-item-icon icon-wrap"><i class="icon-check"></i></div>
                                        <span v-if="getPreselectedChain != 'polygon'">{{ translatesGet("REFERRAL_PROGRAM_ITEM_4") }}</span>
                                        <span v-if="getPreselectedChain == 'polygon'">{{ translatesGet("REFERRAL_PROGRAM_ITEM_4_MATIC") }}</span>
                                    </li>
                                </ul>

                                <div class="table-img-wrap">
                                    <img src="@/assets/images/all/img-table.png" alt="main-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer :class="{ 'opened-mobile': showMenu == true }" class="footer-home">
            <div class="container">
                <div class="footer-row footer-nav">
                    <nav class="footer-block">
                        <div class="footer-list-title">{{ translatesGet("ABOUT") }}</div>
                        <ul class="footer-list">
                            <li>
                                <a target="_blank" rel="nofollow" href="https://posduck.gitbook.io/posduck-dock/terms-of-service">{{
                                    translatesGet("TERMS_SERVICE")
                                }}</a>
                            </li>
                            <li>
                                <a target="_blank" rel="nofollow" href="https://posduck.gitbook.io/posduck-dock/privacy-policy">{{
                                    translatesGet("PRIVACY_POLICY")
                                }}</a>
                            </li>
                            <li>
                                <a target="_blank" rel="nofollow" href="https://posduck.gitbook.io/posduck-dock">{{ translatesGet("GITBOOK") }}</a>
                            </li>
                        </ul>
                    </nav>
                    <nav class="footer-block">
                        <div class="footer-list-title">{{ translatesGet("OUR_NFTS") }}</div>
                        <ul class="footer-list">
                            <li>
                                <a href="#section-our-nft">{{ translatesGet("COLLECTION") }}</a>
                            </li>
                            <li>
                                <router-link to="/dashboard/buynft">{{ translatesGet("BUY_NFT") }}</router-link>
                            </li>
                        </ul>
                    </nav>
                    <nav class="footer-block">
                        <div class="footer-list-title">
                            {{ translatesGet("STAKING") }}
                        </div>
                        <ul class="footer-list">
                            <li>
                                <a href="#section-staking">
                                    {{ translatesGet("LIMITED_STAKING") }}
                                </a>
                            </li>
                            <li>
                                <a href="#section-un-staking">
                                    {{ translatesGet("UNLIMITED_STAKING") }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav class="footer-block">
                        <div class="footer-list-title">{{ translatesGet("BOOSTS") }}</div>
                        <ul class="footer-list">
                            <li>
                                <router-link to="/dashboard/boosts">{{ translatesGet("BOOSTER_TIME") }}</router-link>
                            </li>
                            <li>
                                <router-link to="/dashboard/boosts">{{ translatesGet("BOOSTER_PROFIT") }}</router-link>
                            </li>
                            <li>
                                <router-link to="/dashboard/boosts">{{ translatesGet("BOOSTER_TEAM") }}</router-link>
                            </li>
                        </ul>
                    </nav>
                    <nav class="footer-block">
                        <div class="footer-list-title">{{ translatesGet("INCENTIVE_PROGRAM") }}</div>
                        <ul class="footer-list">
                            <li @click="(switcher2 = false), (switcher1 = true)">
                                <a href="#section-bounty-program">
                                    {{ translatesGet("REFERRAL_PROGRAM") }}
                                </a>
                            </li>
                            <li @click="(switcher2 = true), (switcher1 = false)">
                                <a href="#section-bounty-program">
                                    {{ translatesGet("LEADERSHIP_PROGRAMM") }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="footer-row">
                    <div class="footer-block footer-block-copyright">
                        <button class="logo" @click="toTop()"></button>
                        {{ translatesGet("COPYRIGHT") }}
                    </div>
                    <div class="footer-block footer-block-socials social-links">
                        <a href="https://twitter.com/POSDuck_NFT" rel="nofollow" target="_blank">
                            <span class="icon icon-twitter"></span>
                        </a>
                        <a href="https://medium.com/@posduck" rel="nofollow" target="_blank">
                            <span class="icon icon-medium"></span>
                        </a>
                        <a href="https://t.me/posduck_channel" rel="nofollow" target="_blank">
                            <span class="icon icon-telegram-speaker"></span>
                        </a>
                        <a href="https://t.me/posduck_group" rel="nofollow" target="_blank">
                            <span class="icon icon-telegram"></span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import SliderNFT from "@/components/SliderNFT.vue";
    import MultiLang from "@/core/multilang";
    export default {
        name: "Home",
        data() {
            return {
                lang: new MultiLang(this),

                fixedHeader: false,
                hiddenHeader: false,
                disableConnectButton: false,
                switcher1: true,
                switcher2: false,
                showMenu: false,
                // widthTable: 0,
                lastScroll: 0,
                scrollLeft: 0,
                arraySections: "",
                activeScreen: "",
                currentChain: "binance",
                showNetwork: false,
                showMobNetwork: false,
            };
        },
        components: {
            SliderNFT,
        },
        computed: {
            ...mapState(["currentAddress", "selectedWallet", "siteData", "preselectedChain"]),
            addressShort() {
                if (this.currentAddress) {
                    return this.currentAddress.slice(0, 3) + "..." + this.currentAddress.slice(this.currentAddress.length - 3, this.currentAddress.length);
                }
            },
            currency() {
                return this.preselectedChain && this.preselectedChain === 137 ? "MATIC" : "BNB";
            },
            getPreselectedChain() {
                return this.preselectedChain === 56
                    ? (this.currentChain = "binance")
                    : this.preselectedChain === 137
                    ? (this.currentChain = "polygon")
                    : (this.currentChain = "binance");
            },
        },
        mounted() {
            this.lang.init();
            this.handleScroll;
            window.addEventListener("scroll", this.handleScroll);
            this.arraySections = document.querySelectorAll("section");
            this.arraySections[0].classList.add("section-active");
            window.addEventListener("scroll", () => {
                setTimeout(() => {
                    this.checkScreen();
                }, 300);
            });
            // this.widthTable = document.querySelector(".container-table").getBoundingClientRect().width;
            // window.addEventListener("resize", () => {
            //     setTimeout(() => {
            //         this.widthTable = document.querySelector(".container-table").getBoundingClientRect().width;
            //         return this.widthTable;
            //     }, 300);
            // });
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
            setPreselectedChain(chain) {
                window.localStorage.setItem("preselectedChain", chain);
                this.$store.commit("setPreselectedChain", chain);
                if (chain === 56) {
                    this.selectedChain = "binance";
                }
                if (chain === 137) {
                    this.selectedChain = "polygon";
                }
            },
            handleScroll() {
                const header = document.querySelector("header");
                // if (window.pageYOffset > header.getBoundingClientRect().height) {
                if (this.lastScroll > window.pageYOffset && window.pageYOffset > header.getBoundingClientRect().height) {
                    this.fixedHeader = true;
                    this.hiddenHeader = false;
                }
                // if (window.pageYOffset <= header.getBoundingClientRect().height) {
                if (this.lastScroll < window.pageYOffset || window.pageYOffset < header.getBoundingClientRect().height) {
                    if (window.pageYOffset > this.lastScroll && window.pageYOffset > header.getBoundingClientRect().height) {
                        // if (window.pageYOffset > header.getBoundingClientRect().height) {
                        this.hiddenHeader = true;
                    } else {
                        this.hiddenHeader = false;
                    }
                    this.fixedHeader = false;
                }
                this.lastScroll = window.pageYOffset;
            },
            checkScreen() {
                this.arraySections.forEach((screen) => {
                    if (
                        (screen.getBoundingClientRect().top >= 0 && screen.getBoundingClientRect().top < screen.getBoundingClientRect().height) ||
                        (screen.getBoundingClientRect().bottom >= 0 && screen.getBoundingClientRect().bottom < screen.getBoundingClientRect().height)
                    ) {
                        screen.classList.add("section-active");
                    }
                    // else screen.classList.remove("section-active");
                });
            },
            toTop() {
                window.scrollTo(0, 0);
            },
            async onConnect() {
                const selectedWallet = window.localStorage.getItem("selectedWallet");
                if (selectedWallet) {
                    if (selectedWallet === "metamask") {
                        await this.connectWallet();
                    } else if (selectedWallet === "walletconnect") {
                    }
                } else {
                    this.$emit("changeWalletRequest");
                }
            },
            async connectWallet() {
                try {
                    this.disableConnectButton = true;
                    // Will open the MetaMask UI
                    // You should disable this button while the request is pending!
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    this.disableConnectButton = false;
                    this.$emit("close");
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: "Wallet has been connected",
                    });
                } catch (error) {
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "danger",
                        message:
                            error.message && error.message == "Already processing eth_requestAccounts. Please wait."
                                ? "Please proceed to your metamask extention to connect the wallet"
                                : "Something went wrong, please try again",
                    });
                    this.disableConnectButton = false;
                }
            },
        },
    };
</script>
