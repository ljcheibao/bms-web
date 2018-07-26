import Vue from "vue";
import VueRouter from "vue-router";
import LayOut from "../views/layout/index";
import PageLayout from "../views/page/layout/index";
import PageIndex from "../views/page/index/index";
import PageSetting from "../views/page/setting/index";
import PageAdd from "../views/page/add/index";

import MasterLayout from "../views/master/layout/index";
import MasterIndex from "../views/master/index/index";
import MasterSetting from "../views/master/setting/index";
import MasterAdd from "../views/master/add/index";

import DesignPage from "../views/design/index";
import Preview from "../views/preview/index";

import WebsiteLayout from "../views/website/layout/index";
import WebsiteIndex from "../views/website/index/index";
import WebsiteAdd from "../views/website/add/index";

import PagePublishRecordIndex from "../views/publishRecord/index/index";

Vue.use(VueRouter);
/**
 * 积木系统前端路由配置
 */
const router = new VueRouter({
  mode: "hash",
  base: __dirname,
  routes: [
    {
      path: "/",
      component: WebsiteLayout,
      children: [
        { path: "", name: "websiteIndex", component: WebsiteIndex },
        { path: "add", name: "websiteAdd", component: WebsiteAdd }
      ]
    },
    {
      path: "/page",
      component: PageLayout,
      children: [
        { path: "", name: "pageIndex", component: PageIndex },
        { path: "add", name: "pageAdd", component: PageAdd },
        { path: ":pageId", name: "pageSetting", component: PageSetting }
      ]
    },
    {
      path: "/master",
      component: MasterLayout,
      children: [
        { path: "", name: "masterIndex", component: MasterIndex },
        { path: "add", name: "masterAdd", component: MasterAdd },
        { path: ":masterId", name: "masterSetting", component: MasterSetting }
      ]
    },
    {
      path: "/design/pages/:pageId",
      name: "pageDesign",
      component: DesignPage
    },
    {
      path: "/preview/pages/:pageId",
      name: "preview",
      component: Preview
    }
    ,
    {
      path: "/publish/pages/:pageId/record",
      name: "publishRecord",
      component: PagePublishRecordIndex
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(LayOut)
})