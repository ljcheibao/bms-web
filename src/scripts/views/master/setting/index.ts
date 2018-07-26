import "./index.less";
import {
  BaseView,
  Component,
  Vue,
  Emit,
  Watch,
  Prop
} from "../../BaseView";
import { Container } from "typedi";
import { MasterModule } from "../../../models/MasterModel";
import { IMasterService } from "../../../interface/IMasterService";
import Dialog from "../../../components/vue-component-dialog/index";

/**
 * 母版管理模块骨架
 * @class
 * @extends {BaseView}
 */
@Component({
  template: require("./index.html"),
  components: {
    Dialog
  }
})
export default class MasterSetting extends BaseView {

  /**
   * 模态弹框的信息
   */
  message: string = "";

  //弹框控制对象
  dialogOpts: any = {
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
   * 母版详情信息实体对象
   */
  masterModel: MasterModule.MasterModel = new MasterModule.MasterModel();

  /**
   * 渲染模板
   * @return {void} 无返回值
   */
  mounted(): void {
    let _this = this;
    (async function () {
      _this.masterModel = await Container.get<IMasterService>("masterService").getMasterDetailById(Number(_this.$route.params.masterId));
    })();
  }

  /**
   * 更新母版
   * @return {void} 无返回值
   */
  async updateMasterHandle(): Promise<void> {
    this.masterModel.masterId = Number(this.$route.params.masterId);
    let result: any = await Container.get<IMasterService>("masterService").updateMaster(this.masterModel);
    if (result && result.masterId > 0) {
      this.$router.push("/master");
    } else {
      //弹框提示
      this.dialogOpts.visibility = true;
      this.message = result.message;
    }
  }
}