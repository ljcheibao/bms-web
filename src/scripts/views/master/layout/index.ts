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

/**
 * 母版管理模块骨架
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    leftMenu
  }
})
export default class MasterLayout extends BaseView {
  /**
   * 初始化模板管理左侧菜单
   */
  menuItems: Array<any> = [];
  /**
   * 渲染模板
   */
  mounted() {
    this.menuItems = [
      {
        iconClass: "fa-file",
        text: "所有母版",
        path: {
          name: "masterIndex"
        }
      },
      {
        iconClass: "fa-plus",
        text: "新建母版",
        path: {
          name: "masterAdd"
        }
      }
    ]
  }
}