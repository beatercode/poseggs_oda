<template>
    <div
        class="push-block"
        :class="{
            warning: notification.type === 'warning',
            success: notification.type === 'success',
            error: notification.type === 'error',
        }"
    >
        <div class="push-icon"></div>
        <div class="push-descr">{{ notification.message }}</div>
    </div>
</template>

<script>
    import { mapMutations } from "vuex";
    import MultiLang from "@/core/multilang";

    export default {
        data() {
            return {
                timeout: null,
                pushError: false,
                lang: new MultiLang(this),
            };
        },
        props: ["notification"],
        computed: {
            typeClass() {
                return `block ${this.notification.typeClass} flexInlineBetween`;
            },
        },

        created() {
            const time = this.notification.message.length > 40 ? 7500 : 5000;
            this.timeout = setTimeout(() => {
                this.remove_notification(this.notification);
            }, time);
        },
        methods: {
            ...mapMutations(["remove_notification"]),
            closeNotif() {
                this.remove_notification(this.notification);
            },
        },

        beforeDestroy() {
            clearTimeout(this.timeout);
        },
    };
</script>
