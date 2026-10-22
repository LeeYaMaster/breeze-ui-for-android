/**
 * 顶部提示框组件
 * 推荐命令式 API：Toast.top.success() / require('breeze-ui/utils/toast').top
 */
export interface ToastTopProps {
  global?: boolean;
  message?: string;
  time?: number;
  status?: string;
  show?: boolean;
  customClass?: string;
}

export interface ToastTopShowOptions {
  type?: 'success' | 'error' | string;
  status?: 'success' | 'error' | string;
  message?: string;
  time?: number;
}

export interface ToastTopMethods {
  setShow(
    statusOrOptions?: string | ToastTopShowOptions,
    message?: string,
    time?: number
  ): void;
}
