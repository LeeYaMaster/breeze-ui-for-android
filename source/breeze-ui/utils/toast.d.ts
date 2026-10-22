export interface ToastShowOptions {
  type?: 'success' | 'error' | string;
  status?: 'success' | 'error' | string;
  message?: string;
  time?: number;
}

export interface ToastErrorItem {
  valid?: boolean;
  message?: string;
  name?: string;
}

export interface ToastTopAPI {
  show(options: ToastShowOptions | string, message?: string, time?: number): boolean;
  success(message: string, time?: number): boolean;
  error(message: string, time?: number): boolean;
}

export interface ToastAPI {
  show(options: ToastShowOptions | string, message?: string, time?: number): boolean;
  success(message: string, time?: number): boolean;
  error(message: string, time?: number): boolean;
  showErrors(errors: ToastErrorItem[], fallbackMessage?: string): boolean;
  showTop(options: ToastShowOptions | string, message?: string, time?: number): boolean;
  top: ToastTopAPI;
  resolveToast(): WechatMiniprogram.Component.TrivialInstance | null;
  resolveToastTop(): WechatMiniprogram.Component.TrivialInstance | null;
}

declare const Toast: ToastAPI;
export default Toast;
