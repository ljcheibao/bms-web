/**
 * 日历组件相关的数据模块
 */
export module CalenderModule {
  
  /**
   * 日历组件选择后的日期
   */
  export class CalenderChoosed {

    /**
     * 组件的起始日期
     */
    beginDate: string;
    /**
     * 组件的结束日期
     */
    endDate: string;
    /**
     * 选择的当前日期，比如：2017-10-12
     */
    currentDate: string;
    /**
     * 每天的日期，比如：1号，2号
     */
    day: number;
    /**
     * 每天的状态类型
     */
    dayType: string;
  }

  /**
   * 每周的日历列表
   */
  export class MonthCalender {
    /**
     * 每月的日历数据列表
     */
    WeekDayList: Array<WeekDayList> = new Array<WeekDayList>();
  }

  /**
   * 每天日期列表
   */
  export class WeekDayList {
    /**
     * 月份
     */
    currentMonth: string;
    /**
     * 每一天的日历数据列表
     */
    dayList: Array<DayModel> = new Array<DayModel>();
  }

  /**
   * 日历可选项配置实体
   */
  export class CalenderOptions {
    /**
     * 日历标题
     */
    title: string;
    /**
     * 日历开始时间
     */
    beginDate: Date = new Date();
    /**
     * 日历结束时间
     */
    endDate: Date = new Date();
    /**
     * 当前默认显示的日期
     */
    currentDate: Date = new Date();
    /**
     * 判断日历是否需要经过获取数据渲染，默认为false
     */
    isAjax: boolean = false;
    /**
     * 日历初始化数据
     */
    initDay: any = {}
  }

  /**
   * 天 数据实体
   */
  export class DayModel {
    /**
     * 当前日期
     */
    currentDay: string;
    /**
     * 每天日期，比如：1,2,3
     */
    day: number;
    /**
     * 每天的描述，默认跟_day相同
     */
    dayDesc: string;
    /**
     * 记录原始描述，用于重置状态
     */
    oriDayDesc: string;
    /**
     * 默认每天的背景颜色
     */
    bgColor: string = "#fff";
    /**
     * 记录原始背景色，用于重置状态
     */
    oriBgColor: string = "#fff";
    /**
     * 默认每天的字体颜色
     */
    fontColor: string = "#b8b8b8";
    /**
     * 记录原始字体颜色，用于重置状态
     */
    oriFontColor: string = "#b8b8b8";
    /**
     * 状态，默认为0，如果为1，则表示当天已经触发点击
     */
    status: number = 0;
    /**
     * 记录原始状态，用于重置状态使用
     */
    oriStatus: number = 0;
    /**
     * 默认css样式
     */
    dayClass: string = "day";
    /**
     * 默认css样式
     */
    oriDayClass: string = "day";
  }
}