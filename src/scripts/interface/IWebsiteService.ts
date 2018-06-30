import { WebsiteModule } from "../models/WebsiteModel";

/**
 * 站点相关服务接口
 * @interface
 */
export interface IWebsiteService {
  /**
   * 获取所有的站点列表
   * @return {WebsiteModule.WebsiteList} 返回获取到的站点列表
   */
  getWebSiteList(): Promise<WebsiteModule.WebsiteList>;
  /**
   * 通过Id获取站点详情
   * @param {number} websiteId 站点Id
   * @return {WebsiteModule.WebsiteModel} 返回获取到的站点详情
   */
  getWebSiteDetailById(websiteId: number): Promise<WebsiteModule.WebsiteModel>;
}