/**
 * 步骤条组件属性
 */
export interface StepsProps {
  /** 文字颜色类名 */
  textColor?: string;
  /** 步骤数据数组 */
  data?: any[];
  /** 当前步骤索引 */
  basics?: number;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 是否显示数字 */
  num?: boolean;
  /** 是否横向滚动 */
  isScroll?: boolean;
  /** 滚动位置 */
  scroll?: number;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
