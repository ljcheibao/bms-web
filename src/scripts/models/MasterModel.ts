/**
 * 母版管理相关实体模块
 * @module
 */
export module MasterModule {

  /**
   * 母版列表信息实体
   */
  export class MasterListModel {
    /**
     * 母版列表总记录数
     */
    total: number = 0;
    /**
     * 母版信息列表
     */
    list: Array<MasterModel> = new Array<MasterModel>();
  }

  /**
   * 母版信息实体
   */
  export class MasterModel {
    /**
     * 母版Id
     */
    masterId: number = 0;

    /**
     * 关联的用户Id
     */
    userId: number = 0;

    /**
     * 母版名称
     */
    masterName: string;

    /**
     * 母版html内容字符串
     */
    content: string;

    /**
     * 母版描述
     */
    description: string;

    /**
     * 母版创建者
     */
    createAuthor: string;
    /**
     * 母版创建时间,格式:yyyy-MM-dd HH:mm:sss
     */
    createTime: string;
    /**
     * 母版的修改者
     */
    updateAuthor: string;
    /**
     * 母版修改时间,格式:yyyy-MM-dd HH:mm:sss
     */
    updateTime: string;
  }
}