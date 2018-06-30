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
import { WebsiteModule } from "../../../models/WebsiteModel";
import { IWebsiteService } from "../../../interface/IWebsiteService";
import { Utils } from "../../../utils/Utils";

const heibaoUtils = require("heibao-utils");

/**
 * 站点首页，展示列表
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html")
})
export default class WebsiteIndex extends BaseView {
  /**
   * 站点列表数据
   */
  websiteListData: WebsiteModule.WebsiteList = new WebsiteModule.WebsiteList();

  /**
   * mounted中获取后端数据
   */
  mounted(): void {
    let _this = this;
    (async function () {
      let result: any = await Container.get<IWebsiteService>("websiteService").getWebSiteList();
      if (!result.errorCode) {
        _this.websiteListData = <WebsiteModule.WebsiteList>result;
        for (let item of _this.websiteListData.list) {
          item.createTime = heibaoUtils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.createTime) * 1000));
          item.updateTime = heibaoUtils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.updateTime) * 1000));
        }
      }
    })();
  }

  //进入站点
  enterWebsite(websiteId) {
    Vue.prototype.WEBSITEID = websiteId;
    Utils.setCookie("WEBSITEID", websiteId);
    this.$router.push(`/page`);
  }
}