/**
 * 文字提示/气泡组件属性
 */
export interface TooltipProps {
  /** 是否显示 */
  show?: boolean;
  /** 提示文字 */
  text?: string;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
