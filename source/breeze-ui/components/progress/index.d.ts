/**
 * 进度条组件属性
 */
export interface ProgressProps {
  /** 额外类名 */
  extraClass?: string;
  /** 背景色名 */
  bg?: string;
  /** 圆角 */
  round?: boolean;
  /** 小圆角 */
  radius?: boolean;
  /** 进度值（如 '30' 表示 30%） */
  value?: string;
  /** 小尺寸 */
  sm?: boolean;
  /** 超小尺寸 */
  xs?: boolean;
  /** 条纹动画 */
  striped?: boolean;
  /** 激活态 */
  active?: boolean;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
