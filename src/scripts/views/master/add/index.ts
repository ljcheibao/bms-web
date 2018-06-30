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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import quillEditor from 'vue-quill-editor';
//@ts-ignore
Vue.use(quillEditor);

import VueHtml5Editor from 'vue-html5-editor';
import { MasterModule } from "../../../models/MasterModel";
import { IMasterService } from "../../../interface/IMasterService";
//@ts-ignore
Vue.use(VueHtml5Editor);
/**
 * 新增母版
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
})
export default class MasterAdd extends BaseView {

  /**
   * 编辑器的配置项
   */
  editOpts = {

  };

  /**
   * 母版信息实体
   */
  masterModel: MasterModule.MasterModel = new MasterModule.MasterModel();

  /**
   * 
   * @param {string} data 文本编辑器的内容
   */
  changeMasterContent(data) {
    this.masterModel.content = data.text;
  }

  /**
   * 创建母版
   */
  async createMasterHandle() {
    let result: any = await Container.get<IMasterService>("masterService").createMaster(this.masterModel);
    if (result && result.masterId > 0) {
      this.$router.push(`/master`);
    }
  }
}