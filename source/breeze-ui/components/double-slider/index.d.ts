/**
 * 双滑块/区间选择组件属性
 */
export interface DoubleSliderProps {
  /** 组件宽度，默认 750 */
  width?: number;
  /** 组件高度，默认 100 */
  height?: number;
  /** 滑块大小，默认 50 */
  blockSize?: number;
  /** 进度条高度，默认 10 */
  barHeight?: number;
  /** 背景条颜色，默认 '#e9e9e9' */
  backgroundColor?: string;
  /** 已选颜色，默认 '#1aad19' */
  activeColor?: string;
  /** 最小值，默认 0 */
  min?: number;
  /** 最大值，默认 100 */
  max?: number;
  /** 当前区间 [minValue, maxValue]，默认 [0, 100] */
  values?: [number, number];
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/** 事件 rangechange 的 detail */
export interface DoubleSliderRangeChangeDetail {
  minValue: number;
  maxValue: number;
  fromUser: boolean;
}
