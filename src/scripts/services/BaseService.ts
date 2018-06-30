/**
 * service基类
 * @class
 */
export class BaseService {
  /**
   * 域名
   */
  protected _domain: string;
  /**
   * 代理
   */
  protected _proxy: any;
  /**
   * 构造器
   */
  constructor() {
    this._domain = process.env.NODE_ENV == "dev" ? "http://127.0.0.1:3000" : "";
    if (process.env.NODE_ENV == "dev") {
      this._proxy = {
        host: "127.0.0.1",
        port: 3000
      }
    }
  }
}