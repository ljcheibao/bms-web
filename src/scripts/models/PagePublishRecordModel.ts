/**
 * 页面发布记录模块
 * @class
 */
export module PagePublishRecordModule {

  /**
   * 页面发布记录列表
   */
  export class PagePublishRecordListModel {
    /**
     * 页面发布列表的记录数总条数
     */
    total: number = 0;
    /**
     * 页面发布信息列表
     */
    list: Array<PagePublishRecordModel> = new Array<PagePublishRecordModel>();
  }

  /**
   * 页面发布记录实体信息
   */
  export class PagePublishRecordModel {
    /**
     * 页面发布Id
     */
    publishId: number = 0;
    /**
     * 页面Id
     */
    pageId: number = 0;
    /**
     * 页面名称
     */
    pageName: string;
    /**
     * 发布的环境
     */
    env: number = 0;
    /**
     * 页面发布者
     */
    publisher: string;
    /**
     * 页面发布时间
     */
    publishTime: string;
  }
}