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
 * 站点模块骨架
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    leftMenu
  }
})
export default class WebsiteLayout extends BaseView {

  /**
   * 左侧菜单数据
   */
  menuItems: Array<any> = [];
  /**
   * 渲染模板
   */
  mounted() {
    /* this.menuItems = [
      {
        iconClass: "glyphicon glyphicon-plus",
        text: "新增站点",
        path: {
          name: "websiteAdd"
        }
      }
    ]; */
  }
}