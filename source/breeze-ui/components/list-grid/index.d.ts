/**
 * 列表宫格组件属性
 */
export interface ListGridProps {
  /** 数据数组 */
  data?: any[];
  /** 是否显示边框 */
  gridBorder?: boolean;
  /** 列数，默认 3 */
  gridCol?: number;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
