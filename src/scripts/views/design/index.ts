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
import VueDND from 'awe-dnd';
//@ts-ignore
Vue.use(VueDND)

import module from "../../components/vue-component-module/index";

import { IDesignService } from "../../interface/IDesignService";
import { Module } from "../../models/ModuleModel";
import { IMasterService } from "../../interface/IMasterService";
import { IModuleService } from "../../interface/IModuleService";

const Utils = require("heibao-utils");

import JsonForm from "./form";

import Dialog from "../../components/vue-component-dialog/index";
import { IPublishService } from "../../interface/IPublishService";

/**
 * 页面设计
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    module,
    Dialog
  }
})
export default class PageDesign extends BaseView {

  /**
   *分组组件需要传递的数据对象
   */
  paginationConf = {
    totalRecord: 0,
    pageSize: 10
  }

  /**
   * 模块数据
   */
  moduleList: Module.ModuleListModel = new Module.ModuleListModel();

  //操作类型，默认为保存操作
  handleType: string = "save";


  /**
   * 母版卡槽，用于页面设计的时候页面显示使用
   */
  masterPlaceMap: any = {
    "noMaster": {

    },
    "haveMaster": {

    }
  };

  modulesObject = {};

  moduleObjectKey = [];

  initPageModulesInfo(masterPlaceMap, haveMaster) {
    this.masterKey = haveMaster;
    this.masterPlaceMap = masterPlaceMap;
    let moduleHtmlObject: any = {};
    moduleHtmlObject = masterPlaceMap[this.masterKey];

    this.modulesObject = {};
    this.moduleObjectKey = [];

    for (let item in moduleHtmlObject) {
      this.moduleObjectKey.push(item);
      this.modulesObject[item] = moduleHtmlObject[item];
    }
  }


  /**
   * 模态弹框的信息
   */
  message: string = "";

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

  /**
   * 模态弹框的确定按钮
   */
  confirmHandle() {
    if (this.handleType == "save") {
      this.$router.push(`/preview/pages/${this.$route.params.pageId}`);
    } else {
      window.open(this.redirectUrl);
    }
  }

  /**
   * 模态弹框取消按钮
   */
  closeHandle() {
    window.location.reload();
  }

  //页面Id
  pageId: number = 0;

  /**
   * iframe中嵌套的Vue实例对象
   */
  designFrameVm: any;
  /**
   * 当iframe加载完成以后开始关联父页面跟iframe中的vue的关系
   */
  loaded() {
    this.pageId = Number(this.$route.params.pageId);
    //@ts-ignore
    this.designFrameVm = this.$refs.designFrame.contentWindow.designFrameVM;
    this.designFrameVm.designPageModuleInit(this.pageId, this);
  }

  /**
   * 分页组件的页码
   * @param {number} pageIndex 第几页
   */
  async choosePaginationHandle(pageIndex: number): Promise<any> {
    let result: any = await Container.get<IModuleService>("moduleService").getModuleList(pageIndex, this.paginationConf.pageSize);
    if (!result.errorCode) {
      this.moduleList = <Module.ModuleListModel>result;
      for (let item of this.moduleList.list) {
        item.updateTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.updateTime) * 1000));
      }
    }
  }

  /**
   * 母版卡槽的标识位
   */
  placeholder: string = "";

  /**
   * 母版表示字段，haveMaster表示有母版的时候页面设计，noMaster表示没有母版的时候页面设计
   */
  masterKey: string = "";

  //json schema转form表单的弹框显示标识
  isShowSchemaDialog: boolean = false;

  //页面发布以后的跳转访问url
  redirectUrl: string = "";

  /**
   * 保存设计好的页面
   */
  async savePageModuleRelation(): Promise<void> {
    this.handleType = "save";
    let isTrue = await this.designFrameVm.savePageModuleRelation();
    if (isTrue) {
      this.options.visibility = true;
      this.message = "页面信息保存成功，可点击【预览】按钮进行预览!";
      this.options.button.confirm.text = "预览";
    }
  }

  moduleSort() {
    this.moduleSortClass = " open";
  }

  closeModuleSortWindow() {
    this.moduleSortClass = "";
  }

  /**
   * 跳转到发布记录列表
   */
  gotoPublishRecord() {
    this.$router.push(`/publish/pages/${this.$route.params.pageId}/record`);
  }

  /**
   * 发布搭建好的页面
   */
  async publishPage(): Promise<any> {
    this.handleType = "publish";
    let isTrue = await this.designFrameVm.savePageModuleRelation();
    this.options.visibility = true;
    if (isTrue) {
      let result: any = await Container.get<IPublishService>("publishService").publish(this.pageId);
      if (result.pageId > 0) {
        this.message = "页面发布成功，点击【预览】按钮进行预览!";
        this.options.button.confirm.text = "预览";
        this.redirectUrl = result.redirectUrl;
      } else {
        this.message = "页面发布失败!";
      }
    } else {
      this.message = "页面发布失败!";
    }
  }

  /**
   * 预览设计好的页面(先执行数据的保存，然后跳转到预览页面)
   */
  async previewDesignPage(): Promise<void> {
    //form表单提交到preview进行页面预览
    let isTrue = await this.designFrameVm.savePageModuleRelation();
    if (isTrue) {
      this.$router.push(`/preview/pages/${this.$route.params.pageId}`);
    }
  }

  /**
   * 添加模块
   * @param {string} masterKey 母版标识
   * @param {string} placeholder 卡槽的位置
   */
  async addModuleHandle(masterKey: string, placeholder: string): Promise<any> {
    this.schemaDialogClass = "";
    this.placeholder = placeholder;
    this.masterKey = masterKey;
    let result: any = await Container.get<IModuleService>("moduleService").getModuleList(1, this.paginationConf.pageSize);
    if (!result.errorCode) {
      this.moduleList = <Module.ModuleListModel>result;
      for (let item of this.moduleList.list) {
        item.extendClass = "";
        item.updateTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.updateTime) * 1000));
      }
      this.paginationConf.totalRecord = this.moduleList.total;
    }
  }

  /**
   * 关闭schema表单
   */
  closeSchemaDialog() {
    this.schemaDialogClass = "";
    //@ts-ignore
    $(".json-schema-form-container").animate({
      scrollTop: 0
    }, 1000);
  }

  schemaDialogClass: string = "";

  moduleSortClass: string = "";

  /**
   * 编辑具体的某个模块
   * @param {string} placeholder 模块在卡槽的位置
   * @param {number} moduleId 模块Id
   * @param {number} sort 模块在母版卡槽的顺序
   * @param {any} masterPlaceMap 各个模块的数据
   */
  async editModuleHandle(masterKey: string, placeholder: string, moduleId: number, sort: number, masterPlaceMap?: any): Promise<void> {
    this.schemaDialogClass = " open";
    this.placeholder = placeholder;
    this.masterKey = masterKey;
    if (masterPlaceMap) this.masterPlaceMap = masterPlaceMap;
    let moduleHtmlArray: any = this.masterPlaceMap[masterKey][placeholder];
    for (let item of moduleHtmlArray) {
      if (item.moduleId == moduleId && item.sort == sort) {
        this.chooseModule = item;
        let schemaDesc: object = JSON.parse(item.schemaDesc);
        let data: object = JSON.parse(item.data);
        new JsonForm(schemaDesc, data, this.saveSchemaForm);
        break;
      }
    }
  }

  /**
   * 选择的模块
   */
  chooseModule: Module.ModuleModel = new Module.ModuleModel();

  /**
   * 保存模块数据
   * @param {object} formData 模块的schema对应的数据
   */
  async saveSchemaForm(formData) {
    this.designFrameVm.saveSchemaForm(formData, this.chooseModule);
    this.closeSchemaDialog();
  }

  /**
   * 选择模块后的操作
   * @param {any} data 
   */
  async chooseModuleHandle(data: any): Promise<void> {
    this.chooseModule = data;
    this.designFrameVm.chooseModuleHandle(data);
  }
}
