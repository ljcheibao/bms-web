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
import { Module } from "../../models/ModuleModel";
import pagination from "../vue-component-pagination/index";
import markdown from "../vue-component-markdown/index";

/**
 * 模块弹窗
 * @class
 * @extends Vue
 */
@Component({
  template: require("./index.html"),
  components: {
    pagination,
    markdown
  }
})
export default class ModuleDialog extends Vue {
  /**
   * 模块列表
   */
  @Prop()
  moduleList: Module.ModuleListModel = new Module.ModuleListModel();

  /**
   * 模块的markdown描述文本
   */
  markdownText: string = "";

  /**
   * 分页conf
   */
  @Prop()
  paginationConf: any = {
    totalRecord: 0,
    pageSize: 10
  }

  /**
   * 弹框显示的表示
   */
  isShow: boolean = false;



  /**
   * 监听moduleListModel的变更
   * @param newVal 新的值
   * @param oldVal 旧的值
   */
  @Watch("moduleList", { deep: true })
  watchMenuItemsChange(newVal, oldVal) {
    if (newVal && newVal.list.length > 0) {
      this.isShow = true;
    }
  }

  /**
   * 点击第几页触发的函数
   * @param pageIndex 第几页
   */
  choosePaginationHandle(pageIndex: number): void {
    this.$emit("choosePaginationEvent", pageIndex);
  }

  /**
   * 关闭模块列表弹框
   */
  closeHandle(): void {
    this.moduleList.list.length = 0;
    this.isShow = false;
  }

  /**
   * 显示模块的markdown介绍
   * @param {string} markdownText 模块的markdown描述文本
   */
  showMarkdownIntroduction(markdownText: string): void {
    this.markdownText = markdownText;
  }

  /**
   * 关闭模块的markdown描述弹框
   */
  closeMarkdownDialogHandle() {
    this.markdownText = "";
  }

  /**
   * 用于选中模块的时候修改class，高亮显示
   */
  moduleId: number = 0;

  /**
   * 选中了某个模块的时候，记录的模块信息
   */
  chooseModuelModel: Module.ModuleModel = new Module.ModuleModel();

  /**
   * 模块选择的click单击事件
   * @param {number} moduleId 模块的Id
   */
  chooseHandle(moduleId: number): void {
    this.moduleId = moduleId;
    for (let item of this.moduleList.list) {
      if (item.moduleId == moduleId) {
        this.chooseModuelModel = item;
      }
    }
  }

  /**
   * 选择模块之后发布的事件(确定按钮)
   */
  chooseModuleHandle(): void {
    this.isShow = false;
    this.$emit("chooseModuleEvent", this.chooseModuelModel);
  }
}