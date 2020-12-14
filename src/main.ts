import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueTimers from "vue-plugin-timers";

Vue.config.productionTip = false;
Vue.use(VueTimers);

new Vue({
  vuetify,
  render: h => h(App),
}).$mount("#app");
