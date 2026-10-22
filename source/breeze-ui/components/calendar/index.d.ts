/**
 * 日历组件，内部维护 year、month、today、space 等。
 */
export interface CalendarProps {
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 日历组件实例方法
 */
export interface CalendarMethods {
  /** 下月 */
  next(): void;
  /** 上月 */
  last(): void;
  /** 点击日期，触发 click 事件 */
  click(e: WechatMiniprogram.CustomEvent): void;
}
