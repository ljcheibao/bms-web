import "./index.less";
import Vue from "vue";
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from 'vue-property-decorator';
import "../../../../node_modules/prismjs/themes/prism.css";
import "../../../../node_modules/prismjs/prism";
import VueMarkdown from "vue-markdown";

/**
 * 模块弹窗
 * @class
 * @extends Vue
 */
@Component({
  template: require("./index.html"),
  components: {
    VueMarkdown
  }
})
export default class MarkdownDialog extends Vue {
  /**
   * markdown文本对象
   */
  @Model()
  markdownText: string;

  /**
   * 关闭模块列表弹框
   */
  @Emit("closeMarkdownDialogEvent")
  closeHandle(): void {
    this.markdownText = "";
  }
}