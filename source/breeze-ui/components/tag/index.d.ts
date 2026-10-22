/**
 * 标签组件属性
 */
export interface TagProps {
  /** 圆角 */
  round?: boolean;
  /** 小圆角 */
  radius?: boolean;
  /** 小尺寸 */
  sm?: boolean;
  /** 线条色名 */
  line?: string;
  /** 背景色名 */
  bgColor?: string;
  /** 浅色样式 */
  light?: boolean;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
