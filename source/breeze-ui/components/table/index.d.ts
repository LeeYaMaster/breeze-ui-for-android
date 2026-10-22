/**
 * 表格组件属性
 */
export interface TableProps {
  /** 表格数据行 */
  data?: any[];
  /** 表头配置 */
  header?: any[];
  /** 栅格/列数，默认 1 */
  grid?: number;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 表格组件实例方法
 */
export interface TableMethods {
  /** 行点击 */
  onRowClick(e: WechatMiniprogram.CustomEvent): void;
}
