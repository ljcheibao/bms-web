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

/**
 * 模态弹框
 * @class
 * @extends Vue
 */
@Component({
  template: require("./index.html")
})
export default class Dialog extends Vue {
  /**
   * 模态弹框显示信息
   */
  @Prop()
  message: string = "";

  @Prop()
  options: any = {
    visibility: false,
    title: "温馨提示",
    button: {
      confirm: {
        text: "确定"
      },
      cancel: {
        text: "取消"
      }
    }
  };

  @Watch("options", { deep: true })
  watchDialogVisibility(newVal, oldVal) {
    this.options.title = newVal.title || oldVal.title;
    this.options.button.confirm.text = newVal.button.confirm.text || oldVal.button.confirm.text;
    this.options.button.cancel.text = newVal.button.cancel.text || oldVal.button.cancel.text;
  }

  /**
   * 点击确定按钮触发的事件
   */
  @Emit("confirmHandleEvent")
  confirmHandle(): void {
    this.options.visibility = false;
  }

  /**
   * 点击取消按钮触发的事件
   */
  @Emit("closeHandleEvent")
  closeHandle(): void {
    this.options.visibility = false;
  }
}