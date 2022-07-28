<template>
    <div v-if="type === 'profit' && id === 0" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img src="@/assets/images/all/boost-percent-1.png" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_PROFIT") }} 2%</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                        />
                    </svg>
                    +2%
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <form class="form-radio">
                <div class="radio-btns-wrap">
                    <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97" class="radio-btn">
                        <input name="form4" checked type="radio" id="form4radioButton1" value="BNB" v-model="selectedCurrency" />
                        <label for="form4radioButton1">0.172 {{ currency }}</label>
                    </div>
                    <div v-if="currentBlockchain && currentBlockchain === 137" class="radio-btn">
                        <!-- <input name="form4" checked type="radio" id="form4radioButton1" value="MATIC" v-model="selectedCurrency" /> -->
                        <label for="form4radioButton1">72 {{ currency }}</label>
                    </div>
                    <div v-if="currentBlockchain && currentBlockchain !== 137" class="radio-btn">
                        <input name="form4" type="radio" id="form4radioButton2" value="BUSD" v-model="selectedCurrency" />
                        <label for="form4radioButton2">15 BUSD</label>
                    </div>
                </div>

                <button class="btn btn-radio-submit" type="submit" @click.prevent="buyBoost()">{{ translatesGet("BUY") }}</button>
            </form>
        </div>
    </div>
    <div v-else-if="type === 'profit' && id === 1" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img src="@/assets/images/all/boost-percent-2.png" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_PROFIT") }} 5%</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                        />
                    </svg>
                    +5%
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <form class="form-radio">
                <div class="radio-btns-wrap">
                    <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97" class="radio-btn">
                        <input name="form5" checked type="radio" id="form5radioButton1" value="BNB" v-model="selectedCurrency" />
                        <label for="form5radioButton1">0.515 {{ currency }}</label>
                    </div>
                    <div v-else-if="currentBlockchain && currentBlockchain === 137" class="radio-btn">
                        <!-- <input name="form5" checked type="radio" id="form5radioButton1" value="MATIC" v-model="selectedCurrency" /> -->
                        <label for="form5radioButton1">215 {{ currency }}</label>
                    </div>
                    <div v-if="currentBlockchain && currentBlockchain !== 137" class="radio-btn">
                        <input name="form5" type="radio" id="form5radioButton2" value="BUSD" v-model="selectedCurrency" />
                        <label for="form5radioButton2">45 BUSD</label>
                    </div>
                </div>

                <button class="btn btn-radio-submit" type="submit" @click.prevent="buyBoost()">{{ translatesGet("BUY") }}</button>
            </form>
        </div>
    </div>
    <div v-else-if="type === 'profit' && id === 2" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img src="@/assets/images/all/boost-percent-3.png" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_PROFIT") }} 10%</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                        />
                    </svg>
                    +10%
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <form class="form-radio">
                <div class="radio-btns-wrap">
                    <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97" class="radio-btn">
                        <input name="form6" checked type="radio" id="form6radioButton1" value="BNB" v-model="selectedCurrency" />
                        <label for="form6radioButton1">1.718 {{ currency }}</label>
                    </div>
                    <div v-else-if="currentBlockchain && currentBlockchain === 137" class="radio-btn">
                        <!-- <input name="form6" checked type="radio" id="form6radioButton1" value="MATIC" v-model="selectedCurrency" /> -->
                        <label for="form6radioButton1">720 {{ currency }}</label>
                    </div>
                    <div v-if="currentBlockchain && currentBlockchain !== 137" class="radio-btn">
                        <input name="form6" type="radio" id="form6radioButton2" value="BUSD" v-model="selectedCurrency" />
                        <label for="form6radioButton2">120 BUSD</label>
                    </div>
                </div>

                <button class="btn btn-radio-submit" type="submit" @click.prevent="buyBoost()">{{ translatesGet("BUY") }}</button>
            </form>
        </div>
    </div>
    <div v-else-if="type === 'time' && id === 0" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img src="@/assets/images/all/boost-time-1.png" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_TIME") }} 2%</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
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
        <div class="block-percent-content">
            <form class="form-radio">
                <div class="radio-btns-wrap">
                    <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97" class="radio-btn">
                        <input name="form1" checked type="radio" id="form1radioButton1" value="BNB" v-model="selectedCurrency" />
                        <label for="form1radioButton1">0.172 {{ currency }}</label>
                    </div>
                    <div v-else-if="currentBlockchain && currentBlockchain === 137" class="radio-btn">
                        <!-- <input name="form1" checked type="radio" id="form1radioButton1" value="MATIC" v-model="selectedCurrency" /> -->
                        <label for="form1radioButton1">72 {{ currency }}</label>
                    </div>
                    <div v-if="currentBlockchain && currentBlockchain !== 137" class="radio-btn">
                        <input name="form1" type="radio" id="form1radioButton2" value="BUSD" v-model="selectedCurrency" />
                        <label for="form1radioButton2">15 BUSD</label>
                    </div>
                </div>

                <button class="btn btn-radio-submit" @click.prevent="buyBoost()">{{ translatesGet("BUY") }}</button>
            </form>
        </div>
    </div>
    <div v-else-if="type === 'time' && id === 1" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img src="@/assets/images/all/boost-time-2.png" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_TIME") }} 5%</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
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
        <div class="block-percent-content">
            <form class="form-radio">
                <div class="radio-btns-wrap">
                    <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97" class="radio-btn">
                        <input name="form2" checked type="radio" id="form2radioButton1" value="BNB" v-model="selectedCurrency" />
                        <label for="form2radioButton1">0.515 {{ currency }}</label>
                    </div>
                    <div v-else-if="currentBlockchain && currentBlockchain === 137" class="radio-btn">
                        <!-- <input name="form2" checked type="radio" id="form2radioButton1" value="MATIC" v-model="selectedCurrency" /> -->
                        <label for="form2radioButton1"> 215 {{ currency }}</label>
                    </div>
                    <div v-if="currentBlockchain && currentBlockchain !== 137" class="radio-btn">
                        <input name="form2" type="radio" id="form2radioButton2" value="BUSD" v-model="selectedCurrency" />
                        <label for="form2radioButton2">45 BUSD</label>
                    </div>
                </div>

                <button class="btn btn-radio-submit" type="submit" @click.prevent="buyBoost()">{{ translatesGet("BUY") }}</button>
            </form>
        </div>
    </div>
    <div v-else-if="type === 'time' && id === 2" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img src="@/assets/images/all/boost-time-3.png" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span>{{ translatesGet("BOOSTER_TIME") }} 10%</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-main">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                        />
                        <path
                            d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                        />
                    </svg>
                    +10%
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <form class="form-radio">
                <div class="radio-btns-wrap">
                    <div v-if="currentBlockchain && currentBlockchain === 56 || currentBlockchain === 97" class="radio-btn">
                        <input name="form3" checked type="radio" id="form3radioButton1" value="BNB" v-model="selectedCurrency" />
                        <label for="form3radioButton1">1.718 {{ currency }}</label>
                    </div>
                    <div v-else-if="currentBlockchain && currentBlockchain === 137" class="radio-btn">
                        <!-- <input name="form3" checked type="radio" id="form3radioButton1" value="MATIC" v-model="selectedCurrency" /> -->
                        <label for="form3radioButton1">720 {{ currency }}</label>
                    </div>
                    <div v-if="currentBlockchain && currentBlockchain !== 137" class="radio-btn">
                        <input name="form3" type="radio" id="form3radioButton2" value="BUSD" v-model="selectedCurrency" />
                        <label for="form3radioButton2">120 BUSD</label>
                    </div>
                </div>

                <button class="btn btn-radio-submit" type="submit" @click.prevent="buyBoost()">
                    {{ translatesGet("BUY") }}
                </button>
            </form>
        </div>
    </div>
    <div v-else-if="type === 'team' && !isClaimed" class="block-percent">
        <div class="block-percent-img">
            <div v-if="showLoader" class="nft-load">
                <div class="nft-load-icon"></div>
            </div>
            <img :class="getTeamBoostImage" alt="" class="" />
        </div>
        <div class="block-percent-value">
            <span> {{ translatesGet("BOOSTER_TEAM") }} LVL {{ userLeaderData.leaderLevel }}</span>
            <div class="card-boost-data">
                <div class="boost-data-item boost-data-item-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00016 1.33325C4.32016 1.33325 1.3335 4.31992 1.3335 7.99992C1.3335 11.6799 4.32016 14.6666 8.00016 14.6666C11.6802 14.6666 14.6668 11.6799 14.6668 7.99992C14.6668 4.31992 11.6802 1.33325 8.00016 1.33325ZM5.82016 5.10659C6.36016 5.10659 6.80683 5.54659 6.80683 6.09325C6.80683 6.63325 6.36683 7.07992 5.82016 7.07992C5.28016 7.07992 4.8335 6.63992 4.8335 6.09325C4.8335 5.54659 5.2735 5.10659 5.82016 5.10659ZM5.90016 10.5333C5.80016 10.6333 5.6735 10.6799 5.54683 10.6799C5.42016 10.6799 5.2935 10.6333 5.1935 10.5333C5.00016 10.3399 5.00016 10.0199 5.1935 9.82659L9.56016 5.45992C9.7535 5.26659 10.0735 5.26659 10.2668 5.45992C10.4602 5.65325 10.4602 5.97325 10.2668 6.16659L5.90016 10.5333ZM10.1802 10.8933C9.64016 10.8933 9.1935 10.4533 9.1935 9.90659C9.1935 9.36659 9.6335 8.91992 10.1802 8.91992C10.7202 8.91992 11.1668 9.35992 11.1668 9.90659C11.1668 10.4533 10.7268 10.8933 10.1802 10.8933Z"
                        />
                    </svg>
                    {{ getTeamBoostPercent[1] }}%
                </div>
                <div class="boost-data-item boost-data-item-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99997 3.10001C4.8133 3.10001 2.21997 5.69334 2.21997 8.88001C2.21997 12.0667 4.8133 14.6667 7.99997 14.6667C11.1866 14.6667 13.78 12.0733 13.78 8.88667C13.78 5.70001 11.1866 3.10001 7.99997 3.10001ZM8.49997 8.66667C8.49997 8.94001 8.2733 9.16667 7.99997 9.16667C7.72664 9.16667 7.49997 8.94001 7.49997 8.66667V5.33334C7.49997 5.06001 7.72664 4.83334 7.99997 4.83334C8.2733 4.83334 8.49997 5.06001 8.49997 5.33334V8.66667Z"
                        />
                        <path
                            d="M9.92666 2.30001H6.07332C5.80666 2.30001 5.59332 2.08668 5.59332 1.82001C5.59332 1.55334 5.80666 1.33334 6.07332 1.33334H9.92666C10.1933 1.33334 10.4067 1.54668 10.4067 1.81334C10.4067 2.08001 10.1933 2.30001 9.92666 2.30001Z"
                        />
                    </svg>
                    {{ getTeamBoostPercent[0] }}%
                </div>
            </div>
        </div>
        <div class="block-percent-content">
            <form class="form-radio">
                <br />
                <button class="btn btn-radio-submit" type="submit" @click.prevent="claimLeaderBoost()">
                    {{ translatesGet("CLAIM") }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    export default {
        name: "BoostCard",
        data() {
            return {
                lang: new MultiLang(this),
                selectedCurrency: "BNB",
                showLoader: false,
            };
        },
        props: ["id", "type", "plan", "disableChildLoader"],
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
            changeCurrency(event) {
                console.log(event.target);
            },
            async buyBoost() {
                try {
                    if (!this.currentAddress || this.currentAddress === "0x0000000000000000000000000000000000000000") {
                        this.$emit("changeWalletRequest");
                        return;
                    }
                    if (this.selectedCurrency === "BNB") {
                        if (this.userCoinBalance < this.plan[this.selectedCurrency]) {
                            this.$store.commit("push_notification", {
                                type: "error",
                                typeClass: "error",
                                message: `Ope, you have insufficient funds. Top up your balance and try again.`,
                            });
                            return;
                        }
                    } else if (this.selectedCurrency === "MATIC") {
                        if (this.userCoinBalance < this.plan[this.selectedCurrency]) {
                            this.$store.commit("push_notification", {
                                type: "error",
                                typeClass: "error",
                                message: `Ope, you have insufficient funds. Top up your balance and try again.`,
                            });
                            return;
                        }
                    } else {
                        if (this.userERC20Balance < this.plan[this.selectedCurrency]) {
                            this.$store.commit("push_notification", {
                                type: "error",
                                typeClass: "error",
                                message: `Ope, you have insufficient funds. Top up your balance and try again.`,
                            });
                            return;
                        }
                    }
                    if (this.type === "profit") {
                        const type = 0;
                        this.showLoader = true;
                        const res = await this.$root.core.buyBoost(this.selectedCurrency, this.plan[this.selectedCurrency], type, this.id);
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
                    } else if (this.type === "time") {
                        const type = 1;
                        this.showLoader = true;
                        const res = await this.$root.core.buyBoost(this.selectedCurrency, this.plan[this.selectedCurrency], type, this.id);
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
                    }
                } catch (error) {
                    console.log(error);
                    this.showLoader = false;
                }
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
        computed: {
            ...mapState([
                "currentBlockchain",
                "userCoinBalance",
                "userERC20Balance",
                "currentAddress",
                "userLeaderData",
                "userNftsData",
                "currency",
                "userRefData",
            ]),
            isClaimed() {
                if (
                    this.userRefData &&
                    this.userLeaderData &&
                    this.userNftsData &&
                    this.currentAddress &&
                    this.currentBlockchain &&
                    this.userLeaderData.leaderLevel
                ) {
                    if (this.userRefData.isLeader === false && this.userLeaderData.isDefRef === true) {
                        return true;
                    }
                    const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex(
                        (el) => el.leader_level === this.userLeaderData.leaderLevel
                    );
                    if (index < 0) {
                        this.$emit("hideUnavailBlock");
                        return false;
                    } else {
                        return true;
                    }
                }
                return true;
            },
            availableForClaim() {
                if (this.userRefData && this.userLeaderData && this.userNftsData && this.currentAddress && this.currentBlockchain) {
                    if (this.userRefData.isLeader === false && this.userLeaderData.isDefRef === true) {
                        return false;
                    }
                    const index = this.userNftsData[this.currentBlockchain].claimedBoosts.findIndex(
                        (el) => el.leader_level === this.userLeaderData.leaderLevel
                    );

                    if (index < 0) {
                        this.$emit("hideUnavailBlock");
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            },
            getTeamBoostImage() {
                if (this.userLeaderData && this.userLeaderData.leaderLevel) {
                    return `img-boost-team-${this.userLeaderData.leaderLevel}`;
                }
                return "";
            },
            getTeamBoostPercent() {
                if (this.userLeaderData) {
                    return [this.userLeaderData.leaderTimePerc, this.userLeaderData.leaderProfitPerc];
                }
                return [0, 0];
            },
        },
        mounted() {
            this.lang.init();
            setTimeout(() => {
                if (this.currency) {
                    this.selectedCurrency = this.currency;
                }
            }, 500);
        },
        watch: {
            disableChildLoader: function (newVal) {
                if (newVal) {
                    this.showLoader = false;
                }
            },
            currentBlockchain: function (newVal, oldVal) {
                console.log(newVal);
                if (newVal === 56) {
                    this.selectedCurrency = "BNB";
                } else if (newVal === 137) {
                    this.selectedCurrency = "MATIC";
                    console.log(this.selectedCurrency);
                }
            },
        },
    };
</script>
