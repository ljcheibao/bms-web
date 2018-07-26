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
import { WebsiteModule } from "../../../models/WebsiteModel";
import { IWebsiteService } from "../../../interface/IWebsiteService";
import { Utils } from "../../../utils/Utils";
import Dialog from "../../../components/vue-component-dialog/index";

/**
 * 新增页面
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    Dialog
  }
})
export default class PageAdd extends BaseView {

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

  websiteId: number = 0;

  websiteModel: WebsiteModule.WebsiteModel = new WebsiteModule.WebsiteModel();

  /**
   * 渲染模板
   * @return {void} 无返回值
   */
  mounted(): void {
    let _this = this;
    //@ts-ignore
    this.websiteId = Number(this.WEBSITEID || Utils.getCookie("WEBSITEID"));
    (async function () {
      let result: any = await Container.get<IMasterService>("masterService").getMasterList();
      if (!result.errorCode) {
        _this.masterListModel = <MasterModule.MasterListModel>result;

        let websiteResult: any = await Container.get<IWebsiteService>("websiteService").getWebSiteDetailById(_this.websiteId);
        if (!websiteResult.errorCode) {
          _this.websiteModel = <WebsiteModule.WebsiteModel>websiteResult;
        } else {
          //弹框提示
          _this.dialogOpts.visibility = true;
          _this.message = result.message;
        }
      }
    })();
  }

  /**
   * 创建页面
   * @return {void} 无返回值
   */
  async createPageHandle(): Promise<void> {

    /**
     * 保存页面数据
     * @todo 需要增加校验
     */
    this.pageModel.websiteId = this.websiteId;
    let result: any = await Container.get<IPageService>("pageService").createPage(this.pageModel);
    if (result && result.pageId > 0) {
      this.$router.push(`/page`);
    } else {
      //提示信息
      //弹框提示
      this.dialogOpts.visibility = true;
      this.message = result.message;
    }
  }
}