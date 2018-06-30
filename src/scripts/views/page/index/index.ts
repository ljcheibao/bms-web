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
import { IPageService } from "../../../interface/IPageService";

import pagination from "../../../components/vue-component-pagination/index";
import { PageModule } from "../../../models/PageModel";

const Utils = require("heibao-utils");

/**
 * 页面首页，展示列表页面列表
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    pagination
  }
})
export default class PageIndex extends BaseView {
  /**
   * 页面列表数据
   */
  pageListData: PageModule.PageListModel = new PageModule.PageListModel();

  /**
   * 分组组件需要传递的数据对象
   */
  pagination: any = {
    totalRecord: 0,
    pageSize: 5
  }

  
  /**
   * mounted中获取后端数据
   */
  mounted(): void {
    let _this = this;
    //@ts-ignore
    (async function () {
      let result: any = await Container.get<IPageService>("pageService").getPageList(1, _this.pagination.pageSize);
      if (!result.errorCode) {
        _this.pageListData = <PageModule.PageListModel>result;
        for (let item of _this.pageListData.list) {
          item.createTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.createTime) * 1000));
          if (item.publishTime) {
            item.publishTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.publishTime) * 1000));
          }
        }
        _this.pagination.totalRecord = _this.pageListData.total;
      }
    })();
  }

  /**
   * 点击第几页触发的函数
   * @param pageIndex 第几页
   */
  async choosePaginationHandle(pageIndex: number): Promise<any> {
    let result: any = await Container.get<IPageService>("pageService").getPageList(pageIndex, this.pagination.pageSize);
    if (!result.errorCode) {
      this.pageListData = <PageModule.PageListModel>result;
      for (let item of this.pageListData.list) {
        item.createTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.createTime) * 1000))
        if (item.publishTime) {
          item.publishTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.publishTime) * 1000));
        }
      }
    }
  }
}