import { Service } from 'typedi';
import axios from 'axios';
import { BaseService } from './BaseService';
import { IMasterService } from '../interface/IMasterService';
import { MasterModule } from '../models/MasterModel';

/**
 * 母版管理模块相关功能service
 * @class
 * @extends BaseService
 * @implements IMasterService
 */
@Service("masterService")
export class MasterService extends BaseService implements IMasterService {

  /**
   * 更新母版
   * @param {MasterModule.MasterModel} masterModel 母版信息实体对象
   * @return {object} 返回更新成功的母版Id对象
   * {
   *  "masterId":133
   * }
   */
  updateMaster(masterModel: MasterModule.MasterModel): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/masters/${masterModel.masterId}`,
        method: "Put",
        data: masterModel
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 创建母版
   * @param {MasterModule.MasterModel} masterModel 母版信息实体对象
   * @return {object} 返回创建成功的母版Id对象
   * {
   *  "masterId":133
   * }
   */
  createMaster(masterModel: MasterModule.MasterModel): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/master`,
        method: "Post",
        data: masterModel
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  /**
   * 根据母版Id获取母版信息详情
   * @param {number} masterId 母版Id
   * @return {MasterModule.MasterModel} 返回获取到的母版详情
   */
  getMasterDetailById(masterId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/masters/${masterId}`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  /**
   * 获取母版列表
   * @return {MasterModule.MasterListModel} 返回获取到的母版列表
   */
  getMasterList(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/masters`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}