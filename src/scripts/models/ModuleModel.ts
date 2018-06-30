
/**
 * 模块相关实体对象
 * @namespace
 */
export namespace Module {

  /**
   * 模块列表信息
   * @class
   */
  export class ModuleListModel {

    /**
     * 模块总记录数
     */
    total: number = 0;
    /**
     * 模块列表对象
     */
    list: Array<ModuleModel> = new Array<ModuleModel>();
  }

  /**
   * 模块基本信息
   */
  export class ModuleBaseModel {
    /**
     * 模块版本信息Id
     */
    versionInfoId: number = 0;
    /**
     * 模块Id
     */
    moduleId: number = 0;
    /**
     * 模块名称
     */
    moduleName: string;
    /**
     * 模块版本
     */
    version: string;
    /**
     * 模块的schema描述
     */
    schemaDesc: string;
    /**
     * 模块的schema数据
     */
    data: string;
    /**
     * 模块类型
     */
    moduleType: string;
  }

  /**
   * 模块信息实体
   * @class
   */
  export class ModuleModel extends ModuleBaseModel {

    /**
     * 扩展类名
     */
    extendClass: string = "";
    /**
     * 模块简单描述
     */
    description: string;
    /**
     * 模块缩略图
     */
    thumb: string;
    /**
     * 模块的readme描述(具体介绍，比如模块功能、使用场景等)
     */
    readme: string;
    /**
     * 模块存放在gitlab上项目仓库的Id
     */
    projectId: number = 0;
    /**
     * 模块的创建者
     */
    createAuthor: string;
    /**
     * 模块的更新者
     */
    updateAuthor: string;
    /**
     * 模块的更新时间
     */
    updateTime: number = 0;
  }

  /**
   * 模块版本记录的信息
   * @class
   */
  export class ModuleVersionInfo extends ModuleBaseModel {
    /**
     * 模块的地址
     */
    moduleAddress: string;
    /**
     * 模块排序
     */
    sort: number = 0;
    /**
     * 模块在母版哪个卡槽上
     */
    placeholder: string;

    /**
    * 模块渲染后的html
    */
    content: string;
    /**
     * 模块依赖的script
     */
    script: string;
  }

  /**
   * 页面模块信息
   */
  export class PageModuleModel extends ModuleBaseModel {
    /**
     * 页面与模块版本信息关联的主键Id
     */
    pageModuleInfoId: number = 0;
    /**
     * 页面Id
     */
    pageId: number = 0;
    /**
     * 母版Id
     */
    masterId: number = 0;
    /**
     * 模块排序
     */
    sort: number = 0;
    /**
     * 模块在母版哪个卡槽上
     */
    placeholder: string;
  }
}