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

/**
 * 新增页面
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html")
})
export default class PageAdd extends BaseView {
  /**
   * 新增页面需要的实体对象
   */
  pageModel: PageModule.PageModel = new PageModule.PageModel();

  /**
   * 母版列表
   */
  masterListModel: MasterModule.MasterListModel = new MasterModule.MasterListModel();

  //@ts-ignore
  websiteId: number = 0;

  websiteModel: WebsiteModule.WebsiteModel = new WebsiteModule.WebsiteModel();

  /**
   * 获取数据渲染模板
   */
  mounted() {
    let _this = this;
    //@ts-ignore
    this.websiteId = Number(this.WEBSITEID);
    (async function () {
      let result: any = await Container.get<IMasterService>("masterService").getMasterList();
      if (!result.errorCode) {
        _this.masterListModel = <MasterModule.MasterListModel>result;

        let websiteResult: any = await Container.get<IWebsiteService>("websiteService").getWebSiteDetailById(_this.websiteId);
        if (!websiteResult.errorCode) {
          _this.websiteModel = <WebsiteModule.WebsiteModel>websiteResult;
        }
      }
    })();
  }

  /**
   * 创建页面
   * 
   */
  async createPageHandle() {

    /**
     * 保存页面数据
     * @todo 需要增加校验
     */
    this.pageModel.websiteId = this.websiteId;
    let result: any = await Container.get<IPageService>("pageService").createPage(this.pageModel);
    if (result && result.pageId > 0) {
      this.$router.push(`/page`);
    }
  }
}