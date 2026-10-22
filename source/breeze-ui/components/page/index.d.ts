/** bz-page 页面布局容器 Props */
export interface PageProps {
  /** 是否挂载全局 Toast，默认 true */
  toast?: boolean;
  /** 是否挂载全局 Modal（供 Modal.confirm 等） */
  modal?: boolean;
  /** 是否挂载全局顶部 Toast */
  toastTop?: boolean;
  /** 是否挂载全局 ActionSheet */
  actionSheet?: boolean;
  customClass?: string;
}
