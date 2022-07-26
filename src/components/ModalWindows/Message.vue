<template>
    <div class="modal">
        <div class="modal-full-close" @click="$emit('close')"></div>
        <div class="modal-wrap modal-msg">
            <div class="modal-header">
                <div class="modal-name">{{ article.title }}</div>
                <button @click="$emit('close')" class="modal-btn-close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="modal-section">
                    <div class="modal-msg-text" v-html="article.desc"></div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-modal-msg" @click="$emit('openNews', article)">{{ translatesGet("READ_ARTICLE") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";

    export default {
        props: ["article"],
        data() {
            return {
                lang: new MultiLang(this),
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
        },
    };
</script>
