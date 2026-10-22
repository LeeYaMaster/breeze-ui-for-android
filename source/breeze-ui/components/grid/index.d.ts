/**
 * 宫格组件属性
 */
export interface GridProps {
  /** 列数，如 '3'、'4' */
  col?: string;
  /** 额外类名 */
  extraClass?: string;
  /** 等高（正方形格子） */
  square?: boolean;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
