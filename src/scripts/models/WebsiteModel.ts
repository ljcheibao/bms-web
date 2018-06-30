/**
 * 站点相关模块信息描述
 */
export module WebsiteModule {

  /**
   * 页面列表实体描述
   * @class
   */
  export class WebsiteList {
    /**
     * 站点总共有多少条记录
     */
    total: number = 0;
    /**
     * 站点列表数组
     */
    list: Array<WebsiteModel>;
  }


  /**
   * WebsiteModel实体描述
   * @class
   */
  export class WebsiteModel {
    /**
     * 站点Id
     */
    webSiteId: number = 0;
    /**
     * 用户Id
     */
    userId: number = 0;
    /**
     * 站点名称
     */
    websiteName: string;
    /**
     * 站点描述
     */
    description: string;
    /**
     * 站点访问域名
     */
    domain: string;
    /**
     * 静态资源访问域名
     */
    cdnDomain:string;
    /**
     * 站点所属bu
     */
    bu: string;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 创建者
     */
    createAuthor:string;
    /**
     * 更新者
     */
    updateAuthor: string;
    /**
     * 更新时间
     */
    updateTime: number;
  }
}