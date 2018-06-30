/**
 * 工具类
 * @class
 */
export class Utils {

  /**
   * 写入cookie
   * @param {string} name cookie的key
   * @param {string} value cookie的值
   */
  static setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    //@ts-ignore
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }

  /**
   * 读取cookie
   * @param {string} name cookie的key
   */
  static getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
}