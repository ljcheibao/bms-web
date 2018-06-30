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
export default class DialogV1 extends Vue {
  /**
   * 模态弹框显示信息
   */
  @Prop()
  message: string = "";

  @Prop()
  options:any = {
    visibility:true,
    title:"温馨提示"
  };

  @Watch("options",{deep:true})
  watchDialogVisibility(newVal,oldVal) {
    this.options = newVal.title || oldVal.title;
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