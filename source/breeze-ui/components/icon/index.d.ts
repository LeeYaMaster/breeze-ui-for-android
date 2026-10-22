/**
 * 图标组件属性
 */
export interface IconProps {
  /** 图标名（bzIcon- 前缀的类名，如 'newsfill'） */
  name?: string;
  /** 额外类名 */
  extraClass?: string;
  /** 文字/图标颜色类名 */
  textColor?: string;
  /** 尺寸类名 */
  size?: string;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
