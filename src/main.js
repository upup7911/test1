import Vue from "vue";
import App from "./App.vue";

// vue-router
import router from "./router/router";

// Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// axios
import axios from "axios";
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false;


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
