/**
 * 分段器/选项卡组件属性
 */
export interface SegmentProps {
  /** 选项卡数据数组 */
  tabNav?: any[];
  /** 当前选中的索引 */
  TabCur?: number;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 分段器组件实例方法
 */
export interface SegmentMethods {
  /** 切换选项卡 */
  tabSelect(e: WechatMiniprogram.CustomEvent): void;
}
