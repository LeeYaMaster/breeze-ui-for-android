/**
 * 瀑布流组件属性
 */
export interface WaterfallFlowProps {
  /** 数据数组，每项需含 image 字段，组件会计算 height 并左右分布 */
  data?: Array<{ image: string; [key: string]: any }>;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 瀑布流组件实例方法
 */
export interface WaterfallFlowMethods {
  /** 根据 data 创建瀑布流布局 */
  create(data: any[]): void;
  /** 将数据排序到左右列 */
  sort(data: any[]): void;
}
