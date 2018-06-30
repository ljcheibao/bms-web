import "./index.less";
import {
  BaseView,
  Component,
  Vue,
  Emit,
  Watch,
  Prop
} from "../../BaseView";

import leftMenu from "../../../components/vue-component-leftMenu/index";
import { eventBus } from "../../../common/eventBus/index";

/**
 * 页面模块骨架
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    leftMenu
  }
})
export default class PageLayout extends BaseView {

  /**
   * 左侧菜单数据
   */
  menuItems: Array<any> = [];
  /**
   * 渲染模板
   */
  mounted() {
    this.menuItems = [
      {
        iconClass: "glyphicon glyphicon-home",
        text: "我的站点",
        path: {
          name: "websiteIndex"
        }
      },
      {
        iconClass: "glyphicon glyphicon-file",
        text: "所有页面",
        path: {
          name: ""
        }
      },
      {
        iconClass: "glyphicon glyphicon-file",
        text: "我创建的页面",
        path: {
          name: ""
        }
      },
      {
        iconClass: "glyphicon glyphicon-heart",
        text: "我收藏的页面",
        path: {
          name: ""
        }
      },
      {
        iconClass: "glyphicon glyphicon-plus",
        text: "新建页面",
        path: {
          name: "pageAdd"
        }
      }
    ];
  }
}