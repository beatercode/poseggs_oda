<template>
    <div v-if="notifications.length" class="push">
        <push v-for="notification in notifications" :key="notification.id" :notification="notification" />
    </div>
</template>

<script>
    import Push from "./Push";
    import { mapState } from "vuex";
    export default {
        components: {
            Push,
        },
        computed: {
            ...mapState(["notifications"]),
        },
    };
</script>
