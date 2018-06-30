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

import module from "../../components/vue-component-module/index";

import { IDesignService } from "../../interface/IDesignService";
import { Module } from "../../models/ModuleModel";
import { MasterModule } from "../../models/MasterModel";
import { IMasterService } from "../../interface/IMasterService";
import { IModuleService } from "../../interface/IModuleService";
import { PageModule } from "../../models/PageModel";
import { IPageService } from "../../interface/IPageService";

const Utils = require("heibao-utils");

/**
 * 页面设计
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    module
  }
})
export default class PageDesignIframe extends BaseView {

  pageServiceInstance: IPageService = Container.get<IPageService>("pageService");

  masterServiceInstance: IMasterService = Container.get<IMasterService>("masterService");

  designServiceInstance: IDesignService = Container.get<IDesignService>("designService");

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

  /**
   * 母版信息
   */
  masterModel: MasterModule.MasterModel = new MasterModule.MasterModel();

  /**
   * 母版卡槽，用于页面设计的时候页面显示使用
   */
  masterPlaceMap: any = {
    "noMaster": {
      "0placeholder": []
    },
    "haveMaster": {

    }
  };

  /**
   * 父页面的vue实例
   */
  parentVm: any;

  /**
   * 搭建的页面的pageId
   */
  pageId: number = 0;

  /**
   * 母版Id
   */
  masterId: number = 0;

  /**
   * 获取数据，渲染模板
   */
  mounted() {
    //@ts-ignore
    window.designFrameVM = this;
  }

  /**
   * 保存设计好的页面
   */
  async savePageModuleRelation(): Promise<boolean> {
    let pageModuleObject = null;
    if (this.masterId > 0) {
      pageModuleObject = this.masterPlaceMap["haveMaster"];
    } else {
      pageModuleObject = this.masterPlaceMap["noMaster"];
    }
    let pageModules: Array<Module.PageModuleModel> = new Array<Module.PageModuleModel>();
    for (let key in pageModuleObject) {
      for (let i = 0; i < pageModuleObject[key].length; i++) {
        let item = pageModuleObject[key][i];
        let pageModuleModel: Module.PageModuleModel = new Module.PageModuleModel();
        pageModuleModel.masterId = this.masterId;
        pageModuleModel.data = item.data;
        pageModuleModel.placeholder = key;
        pageModuleModel.sort = i + 1;
        pageModuleModel.versionInfoId = item.versionInfoId;

        pageModules.push(pageModuleModel);
      }
    }
    let reuslt: any = await Container.get<IDesignService>("designService").saveDesignPageModules(this.pageId, pageModules);
    if (!reuslt) return true;
    return false;
  }

  /**
   * 发布页面
   */
  publishPage(): void {

  }

  /**
   * 读取设计的页面母版，初始化设计页面的卡槽
   * @param {number} pageId 页面Id
   * @param {any} parentVm 父页面的vue实例
   */
  async designPageModuleInit(pageId, parentVm): Promise<void> {
    this.parentVm = parentVm;
    this.pageId = pageId;
    let _this = this;
    let pageResult: any = await this.pageServiceInstance.getPageDetailById(pageId);
    if (!pageResult || pageResult.errorCode) throw Error("design page happen error!");
    let pageModel: PageModule.PageModel = <PageModule.PageModel>pageResult;
    if (pageModel.masterId > 0) {
      this.masterId = pageModel.masterId;
      //获取用户母版
      let masterResult: any = await this.masterServiceInstance.getMasterDetailById(pageModel.masterId);
      this.masterModel = <MasterModule.MasterModel>masterResult;
      let masterPlace = this.masterModel.content;
      let regExp = /<\s*body[^>]*\s*>([\s\S]*)<\s*\/body\s*>/gm;
      if (regExp.test(masterPlace)) {
        masterPlace = RegExp.$1;
        masterPlace = masterPlace.replace(/[\r\n]/gm, "");
        masterPlace = masterPlace.trim();
        let masterPlaceRegExp = /(<\s*div[^>]*\s*place\s*=\s*"\s*([^""]+)\s*"\s*>)+/gi;
        let match = masterPlace.match(masterPlaceRegExp);
        for (let i = 0; i < match.length; i++) {
          let placeRegExp = /<\s*div[^>]*\s*place\s*=\s*"\s*([^""]+)\s*"\s*>/gi;
          placeRegExp.test(match[i]);
          this.$set(_this.masterPlaceMap["haveMaster"], `${RegExp.$1}`, []);
          masterPlace = masterPlace.replace(`${match[i]}`, `${match[i]}
              <span id="haveMaster-${RegExp.$1}-plus" class="icon-module-add" @click="addModuleHandle('haveMaster','${RegExp.$1}')">
                <i class="glyphicon glyphicon-plus"></i>
              </span>
              <div class="module-design-wrapper" 
                v-for="item in masterPlaceMap['haveMaster']['${RegExp.$1}']">
                <div class="module-arrow-wrapper">
                  <span class="icon-module-edit" @click="editModuleHandle('haveMaster','${RegExp.$1}',item.moduleId,item.sort)">
                    <i class="glyphicon glyphicon-edit"></i>
                  </span>
                  <span class="icon-module-sort-up" @click="sortModuleHandle('haveMaster','${RegExp.$1}',item.moduleId,item.sort,'up')">
                    <i class="glyphicon glyphicon-arrow-up"></i>
                  </span>
                  <span class="icon-module-sort-down" @click="sortModuleHandle('haveMaster','${RegExp.$1}',item.moduleId,item.sort,'down')">
                    <i class="glyphicon glyphicon-arrow-down"></i>
                  </span>
                  <span class="icon-module-sort-remove" @click="removeModuleHandle('haveMaster','${RegExp.$1}',item.moduleId,item.sort)">
                    <i class="glyphicon glyphicon glyphicon-remove"></i>
                  </span>
                </div>
                <div class="module-content" v-html="item.content"></div>
              </div>`);
        }
        new Vue({
          template: `<div class="design-have-master-container">${masterPlace}</div>`,
          data() {
            return {
              masterPlaceMap: _this.masterPlaceMap
            }
          },
          parent: _this,
          methods: {
            addModuleHandle: function (masterKey: string, placeholder: string) {
              _this.addModuleHandle(masterKey, placeholder);
            },
            editModuleHandle: function (masterKey: string, placeholder: string, moduleId: number, sort: number) {
              _this.editModuleHandle(masterKey, placeholder, moduleId, sort);
            },
            removeModuleHandle(masterKey: string, placeholder: string, moduleId: number, sort: number) {
              _this.removeModuleHandle(masterKey, placeholder, moduleId, sort);
            },
            sortModuleHandle(masterKey: string, placeholder: string, moduleId: number, sort: number, direction: string) {
              _this.sortModuleHandle(masterKey, placeholder, moduleId, sort, direction);
            }
          }
        }).$mount(document.getElementById('placeRef'));
      }
      //获取页面上所有的模块
      let pageModules: Array<Module.ModuleVersionInfo> = await Container.get<IDesignService>("designService").getDesignPageModulesAction(this.pageId);
      if (pageModules && pageModules.length > 0) {
        if (this.masterId > 0) {//存在母版
          for (let item of pageModules) {
            if (this.masterPlaceMap["haveMaster"].hasOwnProperty(item.placeholder)) {
              this.masterPlaceMap["haveMaster"][item.placeholder].push(item);
            }
            //@ts-ignore
            $(`#haveMaster-${item.placeholder}-plus`).closest("div").append(`<script src="${item.script}"></script>`);
          }
        } else {
          this.masterPlaceMap["noMaster"]["0placeholder"] = pageModules;
          for (let item of pageModules) {
            //@ts-ignore
            $(`#noMaster-${item.placeholder}-plus`).closest("div").append(`<script src="${item.script}"></script>`);
          }
        }
      }
      this.parentVm.initPageModulesInfo(this.masterPlaceMap, this.masterId > 0 ? "haveMaster" : "noMaster");
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

  /**
   * 删除指定模块
   * @param {string} masterKey 母版标识
   * @param {string} placeholder 卡槽的位置
   * @param {number} moduleId 模块的Id
   * @param {number} sort 模块的序号
   */
  removeModuleHandle(masterKey: string, placeholder: string, moduleId: number, sort: number): void {
    let moduleHtmlArray: any = this.masterPlaceMap[masterKey][placeholder];
    for (let i = 0; i < moduleHtmlArray.length; i++) {
      let item = moduleHtmlArray[i];
      if (item.moduleId == moduleId && item.sort == sort) {
        moduleHtmlArray.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < moduleHtmlArray.length; i++) {
      moduleHtmlArray[i].sort = i + 1;
    }
  }

  /**
   * 模块排序
   * @param {string} masterKey 母版标识
   * @param {string} placeholder 卡槽的位置
   * @param {number} moduleId 模块的Id
   * @param {number} sort 模块的序号
   * @param {stirng} direction 移动方向，up表示向上移动模块，down表示向下移动模块
   */
  sortModuleHandle(masterKey: string, placeholder: string, moduleId: number, sort: number, direction: string): void {
    let moduleHtmlArray: any = this.masterPlaceMap[masterKey][placeholder];
    for (let i = 0; i < moduleHtmlArray.length; i++) {
      let item = moduleHtmlArray[i];
      if (item.moduleId == moduleId && item.sort == sort) {
        switch (direction) {
          case "up":
            if (item.sort == 1) break;
            let prevItem = moduleHtmlArray[i - 1];
            prevItem.sort = prevItem.sort + 1;
            item.sort = item.sort - 1;
            this.$set(moduleHtmlArray, i - 1, item);
            this.$set(moduleHtmlArray, i, prevItem);
            break;
          case "down":
            if (item.sort == moduleHtmlArray.length + 1) break;
            let nextItem = moduleHtmlArray[i + 1];
            nextItem.sort = nextItem.sort - 1;
            item.sort = item.sort + 1;

            this.$set(moduleHtmlArray, i + 1, item);
            this.$set(moduleHtmlArray, i, nextItem);
            break;
          default:
            break;
        }
        break;
      }
    }
  }

  /**
   * 添加模块
   * @param {string} masterKey 母版标识
   * @param {string} placeholder 卡槽的位置
   */
  async addModuleHandle(masterKey: string, placeholder: string): Promise<any> {
    this.placeholder = placeholder;
    this.masterKey = masterKey;
    this.parentVm.addModuleHandle(masterKey, placeholder);
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

  placeholderModuleSort: number = 0;

  /**
   * 编辑具体的某个模块
   * @param {string} placeholder 模块在卡槽的位置
   * @param {number} moduleId 模块Id
   * @param {number} sort 模块在母版卡槽的顺序
   */
  async editModuleHandle(masterKey: string, placeholder: string, moduleId: number, sort: number): Promise<void> {
    this.placeholderModuleSort = sort;
    this.placeholder = placeholder;
    this.masterKey = masterKey;
    this.parentVm.editModuleHandle(masterKey, placeholder, moduleId, sort, this.masterPlaceMap);
  }

  /**
   * 保存模块数据
   * @param {object} formData 模块的schema对应的数据
   * @param {Module.chooseModule} chooseModule 选中的模块
   */
  async saveSchemaForm(formData, chooseModule) {
    //渲染页面
    let result: any = await Container.get<IDesignService>("designService").renderModuleHtmlPostAction(this.pageId, chooseModule.moduleId, chooseModule.version, formData.formData);
    if (!result.errorCode) {
      for (let item of this.masterPlaceMap[this.masterKey][this.placeholder]) {
        if (item.moduleId == chooseModule.moduleId && item.sort == this.placeholderModuleSort) {
          item.content = result.content;
          item.data = JSON.stringify(formData.formData);
          break;
        }
      }
    }
  }

  /**
   * 选择模块后的操作(新增模块的操作)
   * @param {any} data 
   */
  async chooseModuleHandle(data: any): Promise<void> {
    //渲染页面
    let result: any = await Container.get<IDesignService>("designService").renderModuleHtmlGetAction(this.pageId, data.moduleId, data.version);
    if (!result.errorCode) {
      //获取模块的版本信息
      let moduleVersionResult: any = await Container.get<IModuleService>("moduleService").getModuleVersionInfoById(data.moduleId);
      if (!moduleVersionResult.errorCode) {
        let moduleVersion: Module.ModuleVersionInfo = <Module.ModuleVersionInfo>moduleVersionResult;
        let moduleHtmlArray: any = this.masterPlaceMap[this.masterKey][this.placeholder];
        if (moduleHtmlArray.length == 0) {
          moduleHtmlArray.push({
            placeholder: this.placeholder,
            sort: 1,
            moduleName: moduleVersion.moduleName,
            content: result.content,
            moduleId: data.moduleId,
            version: data.version,
            schemaDesc: moduleVersion.schemaDesc,
            data: moduleVersion.data,
            versionInfoId: moduleVersion.versionInfoId
          });
        } else {
          moduleHtmlArray.push({
            placeholder: this.placeholder,
            sort: moduleHtmlArray.length + 1,
            moduleName: moduleVersion.moduleName,
            content: result.content,
            moduleId: data.moduleId,
            version: data.version,
            schemaDesc: moduleVersion.schemaDesc,
            data: moduleVersion.data,
            versionInfoId: moduleVersion.versionInfoId
          });
        }
        this.masterPlaceMap[this.masterKey][this.placeholder] = moduleHtmlArray;
        this.parentVm.initPageModulesInfo(this.masterPlaceMap, this.masterKey);
      }

      //@ts-ignore
      $(`#${this.masterKey}-${this.placeholder}-plus`).closest("div").append(`<script src="${result.script}"></script>`);
    }
  }
}
