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
import pagination from "../../../components/vue-component-pagination/index";
import { PagePublishRecordModule } from "../../../models/PagePublishRecordModel";
import { IPagePublishRecordService } from "../../../interface/IPagePublishRecordService";
import Dialog from "../../../components/vue-component-dialog/index";

const Utils = require("heibao-utils");

/**
 * 页面发布记录首页
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    pagination,
    Dialog
  }
})
export default class PagePublishRecordIndex extends BaseView {

  /**
   * 页面发布记录列表数据
   */
  pagePublishRecordListData: PagePublishRecordModule.PagePublishRecordListModel = new PagePublishRecordModule.PagePublishRecordListModel();

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
    (async function () {
      let result: any = await Container.get<IPagePublishRecordService>("pagePublishRecordService").getPagePublishHistoryRecord(Number(_this.$route.params.pageId), 1, _this.pagination.pageSize);
      if (!result.errorCode) {
        _this.pagePublishRecordListData = <PagePublishRecordModule.PagePublishRecordListModel>result;
        for (let item of _this.pagePublishRecordListData.list) {
          item.publishTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.publishTime) * 1000));
        }
        _this.pagination.totalRecord = _this.pagePublishRecordListData.total;
      }
    })();
  }

  /**
   * 模态弹框的信息
   */
  message: string = "";

  //弹框控制对象
  options: any = {
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

  publishId: number = 0;

  handleType: string = "exchange";

  /**
   * 模态弹框的确定按钮
   */
  async confirmHandle() {
    if (this.handleType == "exchange") {
      let isTrue: boolean = await Container.get<IPagePublishRecordService>("pagePublishRecordService").rollbackPageById(this.publishId);
      if (isTrue) {
        this.message = "切换指定版本的页面成功，可点击【预览】按钮进行查看!";
        this.options.button.confirm.text = "预览";
        this.handleType = "preview";
        this.options.visibility = true;
      } else {
        this.message = "切换指定版本的页面失败!";
      }
    } else {
      this.$router.push(`/preview/pages/${this.$route.params.pageId}`);
    }
  }

  /**
   * 模态弹框取消按钮
   */
  closeHandle() {
    window.location.reload();
  }

  /**
   * 点击第几页触发的函数
   * @param pageIndex 第几页
   */
  async choosePaginationHandle(pageIndex: number): Promise<any> {
    let result: any = await Container.get<IPagePublishRecordService>("pagePublishRecordService").getPagePublishHistoryRecord(Number(this.$route.params.pageId), pageIndex, this.pagination.pageSize);
    if (!result.errorCode) {
      this.pagePublishRecordListData = <PagePublishRecordModule.PagePublishRecordListModel>result;
      for (let item of this.pagePublishRecordListData.list) {
        item.publishTime = Utils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date(Number(item.publishTime) * 1000))
      }
    }
  }

  /**
   * 回滚已经发布的页面
   * @param {number} publishId 页面发布Id
   */
  rollbackPage(publishId: number): void {
    this.publishId = publishId;
    this.options.visibility = true;
    this.message = "点击【确定】按钮页面会切换到指定版本，确定需要切换吗?";
  }
}