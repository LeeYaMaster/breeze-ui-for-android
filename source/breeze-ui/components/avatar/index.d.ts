/**
 * 头像组件属性
 */
export interface AvatarProps {
  /** 额外类名 */
  extraClass?: string;
  /** 圆形 */
  round?: boolean;
  /** 圆角 */
  radius?: boolean;
  /** 图片地址 */
  src?: string;
  /** 超大尺寸 */
  xl?: boolean;
  /** 大尺寸 */
  lg?: boolean;
  /** 小尺寸 */
  sm?: boolean;
  /** 背景色名 */
  bg?: string;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
