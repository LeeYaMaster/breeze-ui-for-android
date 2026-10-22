/** 加载状态：loading 加载中 / over 没有更多 / erro 失败 */
export type LoadingStatus = 'loading' | 'over' | 'erro' | '';

export interface LoadingProps {
  status?: LoadingStatus;
  /** 仅图标模式 */
  icon?: boolean;
  /** 全屏模态加载 */
  modal?: boolean;
  customClass?: string;
}
