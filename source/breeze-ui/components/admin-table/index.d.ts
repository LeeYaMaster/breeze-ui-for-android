/**
 * 管理表格组件属性
 */
export interface AdminTableProps {
  /** 数据列表 */
  list?: any[];
  /** 表头配置 */
  header?: any[];
  /** 是否显示删除 */
  del?: boolean;
  /** 是否显示 */
  show?: boolean;
  /** 是否显示更新 */
  update?: boolean;
  /** 是否遮罩，默认 true */
  cover?: boolean;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 管理表格组件实例方法
 */
export interface AdminTableMethods {
  /** 操作时触发 */
  action(e: WechatMiniprogram.CustomEvent): void;
}
