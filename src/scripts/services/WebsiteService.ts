import { Service } from "typedi";
import axios from 'axios';
import { IWebsiteService } from "../interface/IWebsiteService";
import { WebsiteModule } from "../models/WebsiteModel";
/**
 * 站点相关操作服务
 * @class
 * @interface IWebsiteService
 */
@Service("websiteService")
export class WebsiteService implements IWebsiteService {

  /**
   * 获取所有的站点列表
   * @return {WebsiteModule.WebsiteList} 返回获取到的站点列表
   */
  getWebSiteList(): Promise<WebsiteModule.WebsiteList> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/websites`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 通过Id获取站点详情
   * @param {number} websiteId 站点Id
   * @return {WebsiteModule.WebsiteModel} 返回获取到的站点详情
   */
  getWebSiteDetailById(websiteId: number): Promise<WebsiteModule.WebsiteModel> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/websites/${websiteId}`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}