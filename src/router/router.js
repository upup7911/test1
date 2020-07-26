import Vue from "vue";
import vurrouter from "vue-router";

import Home from "../pages/index/Home";

Vue.use(vurrouter);

// 路由配置
const router = new vurrouter({
  routes: [
    {
      // 首页加载内容
      path: "/",
      name: "Home",
      component: Home
    },
    {
      // 动态
      path: "/Dynamic",
      name: "Dynamic",
      component: () => import('../pages/index/Dynamic')
    },
    {
      // 约会
      path: "/Data",
      name: "Data",
      component: () => import('../pages/index/Data')
    },
    {
      // 啪啪
      path: "/Brian",
      name: "Brian",
      component: () => import('../pages/index/Brian')
    },
  
  ],
});

export default router;
