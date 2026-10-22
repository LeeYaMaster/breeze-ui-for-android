/**
 * 按钮组件属性
 */
export interface ButtonProps {
  /** 圆角按钮 */
  round?: boolean;
  /** 小圆角 */
  radius?: boolean;
  /** 图标按钮样式 */
  icon?: boolean;
  /** 小尺寸 */
  sm?: boolean;
  /** 大尺寸 */
  lg?: boolean;
  /** 阴影 */
  shadow?: boolean;
  /** 块级占满一行 */
  block?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 加载中 */
  loading?: boolean;
  /** 线条色，如 'red'、'green' */
  line?: string;
  /** 线条色（复数） */
  lines?: string;
  /** 背景色名，如 'red'、'green' */
  bgColor?: string;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
