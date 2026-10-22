/**
 * 标题栏组件属性
 */
export interface TitleBarProps {
  /** 额外类名 */
  extraClass?: string;
  /** 标题文字 */
  title?: string;
  /** 主题色名，默认 'blue' */
  color?: string;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 标题栏组件实例方法
 */
export interface TitleBarMethods {
  /** 点击时触发 */
  click(e: WechatMiniprogram.CustomEvent): void;
}
