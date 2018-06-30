import { MasterModule } from "../models/MasterModel";

/**
 * 母版管理相关service接口
 * @interface
 */
export interface IMasterService {

  /**
   * 创建母版
   * @param {MasterModule.MasterModel} masterModel 母版信息实体对象
   * @return {object} 返回创建成功的母版Id对象
   * {
   *  "masterId":133
   * }
   */
  createMaster(masterModel: MasterModule.MasterModel): Promise<object>;

  /**
   * 根据母版Id获取母版信息详情
   * @param {number} masterId 母版Id
   * @return {MasterModule.MasterModel} 返回获取到的母版详情
   */
  getMasterDetailById(masterId: number): Promise<MasterModule.MasterModel>;

  /**
   * 获取母版列表
   * @return {MasterModule.MasterListModel} 返回获取到的母版列表
   */
  getMasterList(): Promise<MasterModule.MasterListModel>;

  /**
   * 更新母版
   * @param {MasterModule.MasterModel} masterModel 母版信息实体对象
   * @return {object} 返回更新成功的母版Id对象
   * {
   *  "masterId":133
   * }
   */
  updateMaster(masterModel: MasterModule.MasterModel): Promise<any>;
}