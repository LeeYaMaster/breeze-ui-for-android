/**
 * 内容区状态容器属性
 */
export interface StateBoxProps {
  /** 加载中 */
  loading?: boolean;
  /** 骨架屏（首屏） */
  skeleton?: boolean;
  /** 空状态 */
  empty?: boolean;
  /** 错误信息；传 true 时使用 errorText */
  error?: string | boolean;
  /** 空状态文案 */
  emptyText?: string;
  /** error 为 true 时的默认文案 */
  errorText?: string;
  /** 加载区附加文案 */
  loadingText?: string;
  /** 骨架模版名 */
  skeletonTemplate?: string;
  /** 骨架行数 */
  skeletonRows?: number;
  /** 错误态是否显示重试按钮 */
  retry?: boolean;
  /** 非内容态最小高度 */
  minHeight?: string;
  customClass?: string;
}
