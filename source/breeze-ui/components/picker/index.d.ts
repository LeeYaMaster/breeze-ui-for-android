/**
 * 选择器组件属性
 */
export interface PickerProps {
  type?: 'normal' | 'multi' | 'time' | 'date' | 'region' | string;
  hideLabel?: boolean;
  placeholder?: string;
  value?: string;
  id?: string;
  label?: string;
  extraClass?: string;
  picker?: string[];
  index?: number | null;
  multiIndex?: number[];
  multiArray?: string[][];
  date?: string;
  time?: string;
  start?: string;
  end?: string;
  customItem?: string[];
  region?: string[];
  customClass?: string;
}

export interface PickerMethods {
  pickerChange(e: WechatMiniprogram.CustomEvent): void;
  multiChange(e: WechatMiniprogram.CustomEvent): void;
  timeChange(e: WechatMiniprogram.CustomEvent): void;
  dateChange(e: WechatMiniprogram.CustomEvent): void;
  regionChange(e: WechatMiniprogram.CustomEvent): void;
}
