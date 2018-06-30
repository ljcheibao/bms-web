import { Module } from "../models/ModuleModel";

/**
 * 页面设计相关接口
 * @interface
 */
export interface IModuleService {
  /**
   * 获取模块列表信息
   * @param {number} pageIndex 页面索引，即第几页
   * @param {number} pageSize 每页显示多少条数据
   * @return {Module.ModuleListModel} 返回获取到的模块列表信息
   */
  getModuleList(pageIndex: number, pageSize: number): Promise<Module.ModuleListModel>;

  /**
   * 获取指定Id的模块版本信息
   * @param {number} moduleId 模块Id
   * @return {Module.ModuleVersionInfo} 返回获取到模块版本信息
   */
  getModuleVersionInfoById(moduleId:number):Promise<Module.ModuleVersionInfo>;

  /**
   * 获取指定Id，指定版本的模块版本信息
   * @param {number} moduleId 模块Id
   * @param {string} version 模块版本
   * @return {Module.ModuleVersionInfo} 返回获取到模块版本信息
   */
  getModuleVersionInfoByIdAndVersion(moduleId: number,version:string): Promise<Module.ModuleVersionInfo>;
}
