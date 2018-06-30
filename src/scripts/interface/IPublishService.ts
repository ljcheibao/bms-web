
/**
 * 页面发布服务接口
 */
export interface IPublishService {
  /**
   * 发布指定Id的页面
   * @param {number} pageId 页面Id
   * @return {object} 返回页面发布成功后的页面Id
   */
  publish(pageId: number): Promise<object>;
}