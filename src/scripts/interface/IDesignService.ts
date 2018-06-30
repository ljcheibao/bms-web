import { Module } from "../models/ModuleModel";

/**
 * 页面设计相关接口
 * @interface
 */
export interface IDesignService {

  /**
   * 获取页面上所有的模块
   * @param {number} pageId 页面Id
   * @return {Array<Module.ModuleVersionInfo>} 返回页面上所有的模块的信息
   */
  getDesignPageModulesAction(pageId: number): Promise<Array<Module.ModuleVersionInfo>>

  /**
   * 获取指定Id，version模块渲染后的html字符串
   * @param {number} pageId 页面Id
   * @param {number} moduleId 模块Id
   * @param {string} version 模块版本
   * @return {object} 返回渲染后的html字符串
   */
  renderModuleHtmlGetAction(pageId: number, moduleId: number, version: string): Promise<object>;

  /**
   * 获取指定Id，version模块渲染后的html字符串
   * @param {number} pageId 页面Id
   * @param {number} moduleId 模块Id
   * @param {string} version 模块版本
   * @param {object} data 模块的schema数据
   * @return {object} 返回渲染后的html字符串
   */
  renderModuleHtmlPostAction(pageId: number, moduleId: number, version: string, data: object): Promise<object>;
  /**
   * 保存设计好的指定Id的页面模块信息
   * @param {number} pageId 页面Id
   * @param {Array<Module.PageModuleModel>} pageModuleModels 保存的模块信息
   * @return {any} 保存成功返回true，否则返回false
   */
  saveDesignPageModules(pageId: number, data: Array<Module.PageModuleModel>): Promise<any>;
}
