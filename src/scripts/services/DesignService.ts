import { Service } from "typedi";
import { BaseService } from "./BaseService";
import { IDesignService } from "../interface/IDesignService";
import { Module } from "../models/ModuleModel";

import axios from 'axios';

/**
 * 页面设计相关接口
 * @class
 * @extends BaseService
 * @implements IDesignService
 */
@Service("designService")
export class DesignService extends BaseService implements IDesignService {

  /**
   * 获取页面上所有的模块
   * @param {number} pageId 页面Id
   * @return {Array<Module.ModuleVersionInfo>} 返回页面上所有的模块的信息
   */
  getDesignPageModulesAction(pageId: number): Promise<Module.ModuleVersionInfo[]> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/design/pages/${pageId}/modules`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 保存设计好的指定Id的页面模块信息
   * @param {number} pageId 页面Id
   * @param {Array<Module.PageModuleModel>} pageModuleModels 保存的模块信息
   * @return {any} 保存成功返回true，否则返回false
   */
  saveDesignPageModules(pageId: number, data: Module.PageModuleModel[]): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/design/pages/${pageId}/modules`,
        method: "Post",
        data: data
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 获取指定Id，version模块渲染后的html字符串
   * @param {number} pageId 页面Id
   * @param {number} moduleId 模块Id
   * @param {string} version 模块版本
   * @return {object} 返回渲染后的html字符串
   */
  renderModuleHtmlGetAction(pageId: number, moduleId: number, version: string): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/design/pages/${pageId}/modules/${moduleId}/${version}/html`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  /**
   * 获取指定Id，version模块渲染后的html字符串
   * @param {number} pageId 页面Id
   * @param {number} moduleId 模块Id
   * @param {string} version 模块版本
   * @param {object} data 模块的schema数据
   * @return {object} 返回渲染后的html字符串
   */
  renderModuleHtmlPostAction(pageId: number, moduleId: number, version: string, data: object): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/design/pages/${pageId}/modules/${moduleId}/${version}/html`,
        method: "Post",
        data: {
          data: JSON.stringify(data)
        }
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}