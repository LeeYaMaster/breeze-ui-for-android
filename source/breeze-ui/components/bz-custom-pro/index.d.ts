/**
 * 自定义导航栏组件（增强版）属性
 */
export interface BzCustomProProps {
  /** 背景色 */
  bgColor?: string;
  /** 是否自定义导航 */
  isCustom?: boolean | string;
  /** 是否显示返回 */
  isBack?: boolean | string;
  /** 背景图 */
  bgImage?: string;
  /** 是否显示首页 */
  isHome?: boolean | string;
  /** 左侧是否自定义 */
  isLeftCustom?: boolean | string;
  /** 自定义背景色 */
  myBgColor?: string;
  /** 是否透明 */
  isLucency?: boolean;
  /** 是否显示内容区 */
  isContent?: boolean;
  /** 是否不固定 */
  noFixed?: boolean;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 自定义导航栏组件（增强版）实例方法
 */
export interface BzCustomProMethods {
  /** 返回上一页 */
  BackPage(e?: WechatMiniprogram.TouchEvent): void;
  /** 回到引导首页 */
  BackHome(e?: WechatMiniprogram.TouchEvent): void;
  /** 回到首页 */
  toHome(e?: WechatMiniprogram.TouchEvent): void;
}
