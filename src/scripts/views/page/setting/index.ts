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
import { PageModule } from "../../../models/PageModel";
import { IPageService } from "../../../interface/IPageService";
import { MasterModule } from "../../../models/MasterModel";
import { IMasterService } from "../../../interface/IMasterService";
import Dialog from "../../../components/vue-component-dialog/index";


/**
 * 页面设置，包含详情查看、页面修改
 * @class
 * @extends {BaseView}
 */
@Component({
  template: require("./index.html"),
  components: {
    Dialog
  }
})
export default class PageSetting extends BaseView {

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
   * 新增页面需要的实体对象
   */
  pageModel: PageModule.PageModel = new PageModule.PageModel();

  /**
   * 母版列表
   */
  masterListModel: MasterModule.MasterListModel = new MasterModule.MasterListModel();

  /**
   * 获取页面详情
   * @return {void} 无返回值
   */
  mounted(): void {
    let _this = this;
    (async function () {
      _this.pageModel = await Container.get<IPageService>("pageService").getPageDetailById(Number(_this.$route.params.pageId));
      let result: any = await Container.get<IMasterService>("masterService").getMasterList();
      if (!result.errorCode) {
        _this.masterListModel = <MasterModule.MasterListModel>result;
      } else {
        //弹框提示
        _this.dialogOpts.visibility = true;
        _this.message = result.message;
      }
    })();
  }

  /**
   * 修改页面
   * @todo 需要增加校验
   * @return {void} 无返回值
   */
  async updatePageHandle(): Promise<void> {
    this.pageModel.pageId = Number(this.$route.params.pageId);
    let result: any = await Container.get<IPageService>("pageService").updatePageDetail(this.pageModel);
    if (result && result.pageId > 0) {
      this.$router.push("/page");
    } else {
      //弹框提示
      this.dialogOpts.visibility = true;
      this.message = result.message;
    }
  }
}