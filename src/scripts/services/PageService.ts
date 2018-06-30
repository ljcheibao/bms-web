import { Service } from 'typedi';
import axios from 'axios';
import { IPageService } from '../interface/IPageService';
import { BaseService } from './BaseService';
import { PageModule } from '../models/PageModel';

/**
 * 页面模块相关功能service
 * @class
 * @extends BaseService
 * @implements IPageService
 */
@Service('pageService')
export class PageService extends BaseService implements IPageService {

  /**
   * 修改页面详情
   * @param {PageModule.PageModel} pageModel 页面信息实体
   * @return {object} 返回更新成功的页面Id对象
   * {
   *  "pageId":133
   * }
   */
  updatePageDetail(pageModel: PageModule.PageModel): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/pages/${pageModel.pageId}`,
        method: "Put",
        data: pageModel
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  /**
   * 删除指定Id的页面
   * @param {number} pageId 页面Id
   */
  delPageById(pageId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/pages/${pageId}`,
        method: "Delete"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 获取指定Id的页面详情
   * @param {number} pageId 页面Id
   * @return {PageModule.PageModel} 返回获取到的页面实体对象
   */
  getPageDetailById(pageId: number): Promise<PageModule.PageModel> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/pages/${pageId}`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 新建页面
   * @param {PageModule.PageModel} pageModel 页面信息实体
   * @return {object} 返回创建成功的页面Id对象
   * {
   *  "pageId":133
   * }
   */
  createPage(pageModel: PageModule.PageModel): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/page`,
        method: "Post",
        data: pageModel
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 获取页面列表
   * @param {number} pageIndex 页面索引，即第几页
   * @param {number} pageSize 每页显示多少条数据
   * @param {string} keyword 查询关键字
   * @param {number} userId 用户id，预留参数，默认为0
   * @return {PageModule.PageListModel} 返回获取到的页面列表
   */
  getPageList(pageIndex: number, pageSize: number, keyword?: string, userId?: number): Promise<PageModule.PageListModel> {
    let _this = this;
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/pages`,
        method: "Get",
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize,
          keyword: keyword,
          userId: userId
        }
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

}