import { PagePublishRecordModule } from "../models/PagePublishRecordModel";

/**
 * 页面发布历史相关接口
 * @interface
 */
export interface IPagePublishRecordService {

  /**
   * 分页获取页面发布记录列表
   * @param {number} pageId 页面Id
   * @param {number} pageIndex 第几页
   * @param {number} pageSize 每页显示多少条记录
   * @return {PagePublishRecordModule.PagePublishRecordListModel} 返回页面发布记录列表信息
   */
  getPagePublishHistoryRecord(pageId: number, pageIndex: number, pageSize: number): Promise<PagePublishRecordModule.PagePublishRecordListModel>;

  /**
   * 回滚已经发布的页面
   * @param {number} publishId 页面发布Id
   * @return {boolean}  回滚成功返回true，回滚失败返回false
   */
  rollbackPageById(publishId: number): Promise<boolean>;
}