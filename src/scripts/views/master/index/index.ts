import "./index.less";
import {
  BaseView,
  Component,
  Vue,
  Emit,
  Watch,
  Prop
} from "../../BaseView";
import { MasterModule } from "../../../models/MasterModel";
import { Container } from "typedi";
import { IMasterService } from "../../../interface/IMasterService";
const Utils = require("heibao-utils");

/**
 * 母版管理模块骨架
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html")
})
export default class MasterIndex extends BaseView {

  /**
   * 母版列表信息
   */
  masterListModel: MasterModule.MasterListModel = new MasterModule.MasterListModel();

  /**
   * 渲染母版
   */
  mounted() {
    let _this = this;
    (async function () {
      let result: any = await Container.get<IMasterService>("masterService").getMasterList();
      if (!result.errorCode) {
        _this.masterListModel = <MasterModule.MasterListModel>result;
        for (let item of _this.masterListModel.list) {
          item.createTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.createTime) * 1000));
        }
      }
    })();
  }
}