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
import { eventBus } from "../../common/eventBus/index";

import DialogV1 from "../../components/vue-component-dialogV1/index";

/**
 * 页面设计
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    DialogV1
  }
})
export default class Preview extends BaseView {

  options: any = {
    visibility: true,
    title:""
  };

  message: string = "";

  /**
   * iframe中嵌套的Vue实例对象
   */
  previewFrameVm: any;

  /**
   * 页面Id
   */
  pageId: number = 0;

  url: string = "";

  /**
   * 渲染模板
   */
  mounted() {
    this.pageId = Number(this.$route.params.pageId);
    this.url = `/preview/pages/${this.pageId}`;
  }
}