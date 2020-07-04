import Vue from "vue";
import VueAnalytics from 'vue-analytics'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bootstrap"; // Import js file
import "@/assets/css/style.scss";
// import "@/three/main";

Vue.use(VueAnalytics, {
  id: 'UA-52977512-27'
})

window.axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
