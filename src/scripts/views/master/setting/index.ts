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

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import quillEditor from 'vue-quill-editor';
//@ts-ignore
Vue.use(quillEditor);

/**
 * 母版管理模块骨架
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html")
})
export default class MasterSetting extends BaseView {

  /**
   * 母版详情信息实体对象
   */
  masterModel: MasterModule.MasterModel = new MasterModule.MasterModel();

  /**
   * 渲染模板
   */
  mounted() {
    let _this = this;
    (async function () {
      _this.masterModel = await Container.get<IMasterService>("masterService").getMasterDetailById(Number(_this.$route.params.masterId));
    })();
  }

  /**
   * 
   * @param {string} data 文本编辑器的内容
   */
  changeMasterContent(data) {
    this.masterModel.content = data.text;
  }

  /**
   * 更新母版
   */
  async updateMasterHandle(): Promise<void> {
    this.masterModel.masterId = Number(this.$route.params.masterId);
    let result: any = await Container.get<IMasterService>("masterService").updateMaster(this.masterModel);
    if (result && result.masterId > 0) {
      this.$router.push("/master");
    }
  }
}