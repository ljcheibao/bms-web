import { Service } from 'typedi';
import axios from 'axios';
import { BaseService } from './BaseService';
import { IPublishService } from '../interface/IPublishService';

/**
 * 页面发布service
 * @class
 * @extends BaseService
 * @implements IPublishService
 */
@Service('publishService')
export class PublishService extends BaseService implements IPublishService {
  /**
   * 发布指定Id的页面
   * @param {number} pageId 页面Id
   * @return {object} 返回页面发布成功后的页面Id
   */
  publish(pageId: number): Promise<object> {
    return new Promise((resolve, reject) => {
      axios.request({
        url: `/api/publish/pages/${pageId}`,
        method: "Get"
      }).then(function (result) {
        resolve(result.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}