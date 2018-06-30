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

/**
 * 新增页面
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html")
})
export default class WebsiteAdd extends BaseView {
  /**
   * 新增页面需要的实体对象
   */
  pageModel: PageModule.PageModel = new PageModule.PageModel();

  /**
   * 母版列表
   */
  masterListModel: MasterModule.MasterListModel = new MasterModule.MasterListModel();

  /**
   * 获取数据渲染模板
   */
  mounted() {
    let _this = this;
    (async function () {
      let result: any = await Container.get<IMasterService>("masterService").getMasterList();
      if (!result.errorCode) {
        _this.masterListModel = <MasterModule.MasterListModel>result;
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
    let result: any = await Container.get<IPageService>("pageService").createPage(this.pageModel);
    if (result && result.pageId > 0) {
      this.$router.push("/");
    }
  }
}