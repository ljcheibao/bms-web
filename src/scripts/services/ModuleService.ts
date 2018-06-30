import { Service } from "typedi";
import { BaseService } from "./BaseService";
import { IModuleService } from "../interface/IModuleService";
import { Module } from "../models/ModuleModel";

import axios from 'axios';

/**
 * 模块相关接口
 * @class
 * @extends BaseService
 * @implements IDesignService
 */
@Service("moduleService")
export class ModuleService extends BaseService implements IModuleService {

  /**
   * 获取指定Id的模块版本信息
   * @param {number} moduleId 模块Id
   * @return {Module.ModuleVersionInfo} 返回获取到模块版本信息
   */
  getModuleVersionInfoById(moduleId: number): Promise<Module.ModuleVersionInfo> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/modules/${moduleId}/info`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  /**
   * 获取指定Id，指定版本的模块版本信息
   * @param {number} moduleId 模块Id
   * @param {string} version 模块版本
   * @return {Module.ModuleVersionInfo} 返回获取到模块版本信息
   */
  getModuleVersionInfoByIdAndVersion(moduleId: number, version: string): Promise<Module.ModuleVersionInfo> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/modules/${moduleId}/${version}`,
        method: "Get",
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  /**
   * 获取模块列表信息
   * @param {number} pageIndex 页面索引，即第几页
   * @param {number} pageSize 每页显示多少条数据
   * @return {Module.ModuleListModel} 返回获取到的模块列表信息
   */
  getModuleList(pageIndex: number, pageSize: number): Promise<Module.ModuleListModel> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/modules`,
        method: "Get",
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize
        }
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}