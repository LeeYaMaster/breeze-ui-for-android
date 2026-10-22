/**
 * 颜色选择器组件属性
 */
export interface ColorPickerProps {
  /** 单位 rpx 与实际像素比，默认 1 */
  rpxRatio?: number;
  /** 颜色数据（hueData、pickerData、barY 等） */
  colorData?: Record<string, any>;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/** 事件 changecolor 的 detail */
export interface ColorPickerChangeDetail {
  colorData: Record<string, any>;
}
