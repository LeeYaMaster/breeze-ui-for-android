/**
 * 骨架屏组件属性
 */
export interface SkeletonProps {
  /** 是否显示骨架，默认 true */
  loading?: boolean;
  /** 是否开启动画，默认 true */
  active?: boolean;
  /** 模版名：case | article | paragraph | list | menu */
  template?: string;
  /** 骨架列数，默认 0（有 template 时用模版值） */
  column?: number;
  /** 列宽配置 */
  columnWidth?: string[];
  /** 底部高度 */
  endHeight?: string;
  /** 是否显示头像占位，未传时沿用 template */
  avatar?: boolean | null;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
