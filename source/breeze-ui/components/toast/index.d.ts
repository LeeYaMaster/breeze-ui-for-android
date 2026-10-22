/**
 * 消息弹出框（Toast）组件
 * 推荐命令式 API：require('breeze-ui/utils/toast')
 */
export interface ToastProps {
  /** 注册为全局 Toast，供 Toast.success() 调用 */
  global?: boolean;
  customClass?: string;
}

export interface ToastShowOptions {
  type?: 'success' | 'error' | string;
  status?: 'success' | 'error' | string;
  message?: string;
  time?: number;
}

export interface ToastMethods {
  /** 显示 toast，支持 setShow('success', 'msg', 1500) 或 setShow({ status, message, time }) */
  setShow(
    statusOrOptions: string | ToastShowOptions,
    message?: string,
    time?: number
  ): void;
}

export type { ToastShowOptions as ToastOptions };
