import "./index.less";
import {
  Vue,
  BaseView,
  Component
} from "../../BaseView";
import { Container } from "typedi";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import quillEditor from 'vue-quill-editor';
//import VueHtml5Editor from 'vue-html5-editor';
//import VueEditor from 'vue2-editor';
Vue.use(quillEditor);
//Vue.use(VueHtml5Editor);
//Vue.use(VueEditor);

import Dialog from "../../../components/vue-component-dialog/index";
import { MasterModule } from "../../../models/MasterModel";
import { IMasterService } from "../../../interface/IMasterService";

/**
 * 新增母版
 * @class
 * @extends {BaseView}
 */
@Component({
  template: require("./index.html"),
  components: {
    Dialog
  }
})
export default class MasterAdd extends BaseView {

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

  //编辑器可配置项
  option: any = {
    placeholder: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1,minimum-scale=1,user-scalable=no">
      <meta name="description" content="积木世界">
      <meta name="keywords" content="积木世界">
      <title>积木世界-页面搭建</title>
    </head>
    
    <body>
      <div place="first"></div>
      <div place="second"></div>
    </body>
    
    </html>`
  };

  /**
   * 母版信息实体
   */
  masterModel: MasterModule.MasterModel = new MasterModule.MasterModel();

  /**
   * 即时获取富文本输入的内容
   * @param {object} data 文本编辑器的内容
   * @return {void} 无返回值
   */
  changeMasterContent(data): void {
    this.masterModel.content = data.text;
  }

  /**
   * 创建母版
   * @return {void} 无返回值
   */
  async createMasterHandle(): Promise<void> {
    let result: any = await Container.get<IMasterService>("masterService").createMaster(this.masterModel);
    if (result && result.masterId > 0) {
      this.$router.push(`/master`);
    } else {
      //提示信息
      //弹框提示
      this.dialogOpts.visibility = true;
      this.message = result.message;
    }
  }
}