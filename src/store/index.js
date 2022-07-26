import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";
const SPREDSHEET_ID = "1iiJjsCNCrqq5RRBAURS0rrZxHg6nEFAyDxglbtghSpY";
const API_KEY = "AIzaSyCM4VvxEviBjv-5jLyq8EQEI24Ep2464r0";
import conf from "../../config.json";

Vue.use(Vuex);

function fetchLanguages(data) {
    let headers = data[0];
    let langs = headers.slice(1).map((m) => m.toLowerCase());
    let languages = {};
    for (let lang of langs) {
        languages[lang] = [];
    }
    for (let i = 1; i < data.length; i++) {
        for (let j = 0; j < langs.length; j++) {
            try {
                let trnslts = data[i][j + 1].trim();
                if (trnslts.length) {
                    let obj = {};
                    obj[`${data[i][0]}`] = trnslts;
                    languages[langs[j]].push(obj);
                }
            } catch (ex) {
                //console.log(ex)
            }
        }
    }
    return languages;
}

export default new Vuex.Store({
    state: {
        currentAddress: "0x0000000000000000000000000000000000000000",
        notifications: [],
        currentChain: "",
        selectedWallet: "",
        currentBlockchain: null,
        currency: "",
        totalRegistered: 0,
        isRegistered: null,
        lang: "en",
        userCoinBalance: null,
        userERC20Balance: 0,
        news: [],
        interfaceTranslations: {},
        userReferrer: "",
        siteData: null,
        levelDuringRegistration: 0,
        leaderLevel: 0,
        userNftsData: null,
        userStakes: null,
        fullStakeDetails: null,
        userRefData: null,
        userLeaderData: null,
        preselectedChain: 56,
        airdropData: false,
    },
    mutations: {
        setAirdropData(state, data) {
            state.airdropData = data;
        },
        setPreselectedChain(state, data) {
            state.preselectedChain = data;
        },
        setFullStakeDetails(state, data) {
            state.fullStakeDetails = data;
        },
        setLeaderData(state, data) {
            state.userLeaderData = data;
        },
        setUserRefData(state, data) {
            state.userRefData = data;
        },
        setUserStakes(state, data) {
            state.userStakes = data;
        },
        setUserNftsData(state, data) {
            state.userNftsData = data;
        },
        setLeaderLevel(state, data) {
            state.leaderLevel = data;
        },
        setLevelDuringRegistration(state, data) {
            state.levelDuringRegistration = data;
        },
        setInterfaceTranslations(state, data) {
            state.interfaceTranslations = data;
        },
        setSiteData(state, data) {
            state.siteData = data;
        },
        setUserReferrer(state, data) {
            state.userReferrer = data;
        },
        setNews(state, data) {
            state.news = data;
        },
        setUserCoinBalance(state, data) {
            state.userCoinBalance = data;
        },
        setUserERC20Balance(state, data) {
            state.userERC20Balance = data;
        },
        setCurrentAddress(state, data) {
            state.currentAddress = data;
        },
        setTotalRegistered(state, data) {
            state.totalRegistered = data;
        },
        setIsRegistered(state, data) {
            state.isRegistered = data;
        },
        setCurrentBlockchain(state, data) {
            state.currentBlockchain = data;
            state.currency = conf.NETWORK_PARAMS.find((el) => Number(el.chainId) === data) ?.params ?.nativeCurrency ?.symbol || "-";
        },
        push_notification(state, notification) {
            const isMessageUnique = state.notifications.findIndex((el) => el.message.toLowerCase() === notification.message.toLowerCase());
            if (isMessageUnique < 0) {
                state.notifications.push({
                    ...notification,
                    id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
                });
            }
        },
        clear_notifications(state, data) {
            state.notifications = data;
        },
        remove_notification(state, notificationToRemove) {
            state.notifications = state.notifications.filter((notification) => notification.id != notificationToRemove.id);
        },
        setChainId(state, chainId) {
            state.currentChain = chainId;
        },
        setLanguage(state, lang) {
            state.lang = lang;
        },
    },
    actions: {
        async fetchNews({
            commit
        }, type) {
            try {
                let arrayOfNews = [];
                let response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SPREDSHEET_ID}/values/news/?key=${API_KEY}`);
                for (let news of response.data.values) {
                    const newsObj = {
                        id: news[0],
                        date: news[1],
                        title: news[2],
                        desc: news[3],
                        link: news[4],
                        important: news[5],
                        seen: false,
                    };

                    arrayOfNews.push(newsObj);
                }

                commit("setNews", arrayOfNews);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchLang({
            commit
        }, type) {
            let lang = window.localStorage.getItem("lang") || "en";
            let main = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SPREDSHEET_ID}/values/lang?key=${API_KEY}`);

            if (main && main.status == 200) {
                let web = fetchLanguages(main.data.values);
                commit("setInterfaceTranslations", web);
                if (web && web.hasOwnProperty("en")) {
                    window.localStorage.setItem("interfaceTranslations", JSON.stringify({
                        lang: web[`${lang}`]
                    }));
                }
            }
        },
        updateLanguage({
            commit
        }, lang) {
            commit("setLanguage", lang);
            localStorage.setItem("lang", lang);
            let website = this.state.interfaceTranslations;
            if (website.hasOwnProperty("en")) {
                window.localStorage.removeItem("interfaceTranslations");

                window.localStorage.setItem("interfaceTranslations", JSON.stringify({
                    lang: website[`${lang}`]
                }));
            }
        },
    },
    modules: {},
    getters: {
        getLanguage(state) {
            return state.lang;
        },
        getInterfaceTranslations: (state) => {
            try {
                let lang = state.lang;
                if (!lang) {
                    lang = "en";
                }
                return state.interfaceTranslations[lang];
            } catch (ex) {
                return "";
            }
        },
    },
});