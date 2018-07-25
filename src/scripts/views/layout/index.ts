import "./index.less";
import {
  BaseView,
  Component,
  Vue,
  Emit,
  Watch,
  Prop
} from "../BaseView";

import { Container } from "typedi";
import Dialog from "../../components/vue-component-dialog/index";

import { eventBus } from "../../common/eventBus/index";
import { IPublishService } from "../../interface/IPublishService";

import { Utils } from "../../utils/Utils";

/**
 * 系统通用layout
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    Dialog
  }
})
export default class LayOut extends BaseView {

  //站点Id
  websiteId: number = 0;

  /**
   * 页面Id
   */
  pageId: number = 0;

  //弹框控制对象
  options: any = {
    visibility: false,
    button: {
      confirm: {
        text: "确定"
      },
      cancel: {
        text: "取消"
      }
    }
  };

  //弹框信息
  message: string = "";

  //页面发布以后的跳转访问url
  redirectUrl: string = "";

  /**
   * 导航菜单添加的项
   */
  menuItems: any = {
    items: [
      {
        iconClass: "",
        text: "",
        type: "",
        path: {}
      }
    ]
  }

  //头部导航左边的菜单项
  leftNavMenuItems: any = {
    items: [
      {
        text: "",
        type: "",
        path: {}
      }
    ]
  };

  /**
   * 监控路由变化，在系统预览页面，显示【发布】跟【编辑】按钮
   * @param to 要跳转的页面相关信息对象
   * @param from 从哪个页面跳转过来的相关信息对象
   */
  @Watch("$route")
  routeChange(to, from) {
    this.pageId = Number(this.$route.params.pageId);
    if (to.name == "preview") {
      this.$set(this.menuItems, "items", [
        {
          text: "编辑",
          type: "edit",
          path: {
            name: "pageDesign",
            params: {
              pageId: this.pageId
            }
          }
        },
        {
          text: "下载",
          type: "download",
          path: {}
        },
        {
          text: "发布",
          type: "publish",
          path: {}
        }
      ]);
    } else {
      this.$set(this.menuItems, "items", []);
    }

    if (to.name != "websiteIndex") {
      if (!Utils.getCookie("WEBSITEID")) this.$router.push(`/`);
      else Vue.prototype.WEBSITEID = Utils.getCookie("WEBSITEID");
      this.$set(this.leftNavMenuItems, "items", [
        {
          text: "页面管理",
          type: "pageIndex",
          path: {
            name: "pageIndex"
          }
        },
        {
          text: "母版管理",
          type: "masterIndex",
          path: {
            name: "masterIndex"
          }
        }
      ]);
    } else {
      this.$set(this.leftNavMenuItems, "items", []);
    }
  }

  //发布成功以后预览操作
  confirmHandle() {
    window.open(this.redirectUrl);
  }

  /**
   * 发布操作
   * @param {string} type 类型，比如edit，publish
   */
  async handle(type): Promise<any> {
    switch (type) {
      case "publish":
        this.options.visibility = true;
        let result: any = await Container.get<IPublishService>("publishService").publish(this.pageId);
        if (result.pageId > 0) {
          this.message = "页面发布成功，点击【预览】按钮进行预览!";
          this.options.button.confirm.text = "预览";
          this.redirectUrl = result.redirectUrl;
        } else {
          this.message = "页面发布失败!";
        }
        break;
      case "download":
        window.open(`/download/pages/${this.pageId}/html`);
        break;
      default:
        break;
    }
  }

  /**
   * 视图渲染
   */
  mounted() {
    this.pageId = Number(this.$route.params.pageId);
    if (this.$route.name == "preview") {
      this.$set(this.menuItems, "items", [
        {
          text: "编辑",
          path: {
            name: "pageDesign",
            type: "edit",
            params: {
              pageId: this.pageId
            }
          }
        },
        {
          text: "下载",
          type: "download",
          path: {}
        },
        {
          text: "发布",
          type: "publish",
          path: {}
        }
      ]);
    }
    if (this.$route.name != "websiteIndex") {
      if (!Utils.getCookie("WEBSITEID")) this.$router.push(`/`);
      else Vue.prototype.WEBSITEID = Utils.getCookie("WEBSITEID");
      this.$set(this.leftNavMenuItems, "items", [
        {
          text: "页面管理",
          type: "pageIndex",
          path: {
            name: "pageIndex"
          }
        },
        {
          text: "母版管理",
          type: "masterIndex",
          path: {
            name: "masterIndex"
          }
        }
      ]);
    } else {
      this.$set(this.leftNavMenuItems, "items", []);
    }
  }
}