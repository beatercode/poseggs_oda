import Vue from 'vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/main.css";
import "./assets/styles/app.css";
import "./assets/styles/chuck.css";
import Clipboard from "v-clipboard";
import device from "vue-device-detector";

Vue.config.productionTip = false;

Vue.use(device);

Vue.use(Clipboard);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");