/**
 * 页面相关实体信息
 */
export module PageModule {

  /**
   * 页面列表信息实体
   * @class
   */
  export class PageListModel {
    /**
     * 页面总记录数
     */
    total: number;
    /**
     * 页面列表信息
     */
    list: Array<PageModel> = new Array<PageModel>();
  }

  /**
   * 页面基础实体
   * @class
   */
  export class PageModel {

    /**
     * 页面Id
     */
    pageId: number;
    
    /**
     * 关联的母版页Id
     */
    masterId: number = -1;
    /**
     * 关联的用户Id
     */
    userId: number;
    /**
     * 页面的名称
     */
    pageName: string;
    /**
     * 页面访问的url
     */
    url: string;
    /**
     * 页面类型，1、频道，2、区块
     */
    type: number;
    /**
     * 终端类型，1、pc，2:移动
     */
    device: number;
    /**
     * 页面的title，存放于html头部的title标签
     */
    title: string;
    /**
     * 页面关键字，存放于html头部的meta标签
     */
    keyword: string;
    /**
     * 页面的描述，存放于html头部的meta标签
     */
    description: string;
    /**
     * 页面创建者
     */
    createAuthor: string;
    /**
     * 页面创建时间，格式为:yyyy-MM-dd HH:mm:ss
     */
    createTime: string;
    /**
     * 页面发布者
     */
    publisher: string;
    /**
     * 页面发布时间，格式为:yyyy-MM-dd HH:mm:ss
     */
    publishTime: string;
    /**
     * 页面是否已经搭建过，默认为0，没有搭建设计过
     */
    isDesign:number = 0;

    /**
     * 所属站点Id
     */
    websiteId:number = 0;
  }
}