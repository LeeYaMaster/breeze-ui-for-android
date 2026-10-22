/**
 * 自定义导航栏组件属性
 */
export interface BzCustomProps {
  /** 背景色 */
  bgColor?: string;
  /** 是否自定义导航 */
  isCustom?: boolean | string;
  /** 是否显示返回 */
  isBack?: boolean | string;
  /** 背景图 */
  bgImage?: string;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 自定义导航栏组件实例方法
 */
export interface BzCustomMethods {
  /** 返回上一页 */
  BackPage(e?: WechatMiniprogram.TouchEvent): void;
  /** 回到首页 */
  toHome(e?: WechatMiniprogram.TouchEvent): void;
}
