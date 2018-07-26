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
 * 左侧导航菜单
 * @class
 * @extends Vue
 */
@Component({
  template: require("./index.html")
})
export default class LeftMenu extends Vue {
  /**
   * 菜单选项
   */
  @Prop()
  menuItems: Array<any> = [];
  /**
   * 监听menuItems菜单的变更
   * @param newVal 新的值
   * @param oldVal 旧的值
   */
  @Watch("menuItems", { deep: true })
  watchMenuItemsChange(newVal, oldVal) {
    if (newVal && newVal.length > 0) {
      this.menuItems = newVal;
    }
  }
}