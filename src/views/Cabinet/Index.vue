<template>
    <div class="dashboard-container">
        <header-component @changeWalletRequest="$emit('changeWalletRequest')" :isNewArticle="isNewArticle" @openNews="openNews($event)" :news="newsToShow" />
        <message v-if="selectedArticle" :article="selectedArticle" @close="selectedArticle = null" @openNews="openNews($event)" />
        <router-view @changeWallet="$emit('changeWalletRequest')" />
    </div>
</template>

<script>
    import HeaderComponent from "@/components/HeaderComponent.vue";
    import Message from "@/components/ModalWindows/Message.vue";
    import { mapState } from "vuex";
    import MultiLang from "@/core/multilang";
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    export default {
        name: "Index",
        components: {
            HeaderComponent,
            Message,
        },
        data() {
            return {
                selectedArticle: null,
                isNewArticle: false,
                newsToShow: [],
                lang: new MultiLang(this),
            };
        },
        computed: {
            ...mapState(["currentAddress", "news"]),
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
            openNews(event) {
                window.open(`${event.link}`, "_blank");
                //TODO: OPEN link in new tab
                const savedNews = JSON.parse(window.localStorage.getItem("savedNews"));
                savedNews.forEach((element) => {
                    if (Number(element.id) === Number(event.id)) {
                        element.seen = true;
                        return element;
                    }
                    return element;
                });
                
                window.localStorage.setItem("savedNews", JSON.stringify(savedNews));
                this.newsToShow = savedNews;
                this.selectedArticle = null;
            },
        },
        mounted() {
            let _this = this;
            this.lang.init();

            setTimeout(async function showNews() {
                if (!_this.news.length) {
                    await timer(1000);
                }
                if (_this.currentAddress && _this.currentAddress !== "0x0000000000000000000000000000000000000000") {
                    try {
                        let savedNews = JSON.parse(window.localStorage.getItem("savedNews")) || [];

                        if (!savedNews.length) {
                            window.localStorage.setItem("savedNews", JSON.stringify(_this.news));
                            _this.newsToShow = _this.news;

                            const isImportant = _this.news.find((el) => el.important === "TRUE" && el.seen === false);

                            if (isImportant) {
                                setTimeout(() => {
                                    _this.selectedArticle = isImportant;
                                    _this.isNewArticle = true;

                                    return;
                                }, 9000);
                            }
                            return;
                        } else if (_this.news.length === savedNews.length) {
                            // console.log("_this.news.length === savedNews.length");
                            let updateLS = false;
                            _this.news.forEach((el, index) => {
                                let shouldBeChanged = false;
                                const newsToCheck = savedNews[index];
                                const paramsToCheck = Object.keys(newsToCheck).filter((el) => el !== "seen");

                                for (let key of paramsToCheck) {
                                    if (el[key] !== newsToCheck[key]) {
                                        shouldBeChanged = true;
                                        updateLS = true;
                                    }
                                }
                                if (shouldBeChanged) {
                                    const index = savedNews.findIndex((item) => item.id === el.id);

                                    savedNews[index] = el;
                                }
                            });
                            if (updateLS) {
                                window.localStorage.setItem("savedNews", JSON.stringify(savedNews));
                            }

                            _this.newsToShow = savedNews;
                            const isImportant = savedNews.find((el) => el.important === "TRUE" && el.seen === false);

                            if (isImportant) {
                                setTimeout(() => {
                                    _this.selectedArticle = isImportant;
                                    _this.isNewArticle = true;

                                    return;
                                }, 9000);
                            }
                            return;
                        } else if (_this.news.length > savedNews.length) {
                            // console.log("_this.news.length > savedNews.length");
                            savedNews.push(_this.news[_this.news.length - 1]);
                            window.localStorage.setItem("savedNews", JSON.stringify(savedNews));
                            _this.newsToShow = savedNews;
                            const isImportant = savedNews.find((el) => el.isImportant === "TRUE" && !el.seen);

                            if (isImportant) {
                                setTimeout(() => {
                                    _this.selectedArticle = isImportant;
                                    _this.isNewArticle = true;

                                    return;
                                }, 9000);
                            }
                        } else if (_this.news.length > 0 && _this.news.length < savedNews.length) {
                            // console.log("_this.news.length > 0 && _this.news.length < savedNews.length");
                            const newSavedNews = savedNews.reduce(
                                (acc, cur) => (_this.news.findIndex((el) => Number(el.id) === Number(cur.id)) >= 0 ? [...acc, cur] : [...acc]),
                                []
                            );

                            window.localStorage.setItem("savedNews", JSON.stringify(newSavedNews));
                            _this.newsToShow = newSavedNews;
                            return;
                        } else {
                            // console.log("somethign wrong", _this.news, savedNews);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("here because address did not change");
                }
            }, 1000);
        },
    };
</script>
