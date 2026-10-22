export interface ModalShowOptions {
  type?: string;
  title?: string;
  content?: string;
  show?: boolean;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  maskClosable?: boolean;
  extraClass?: string;
  src?: string;
  prompt?: string;
  direction?: string;
}

export interface ModalAPI {
  show(options: ModalShowOptions | string): Promise<boolean | false>;
  hide(): boolean;
  confirm(options: ModalShowOptions | string): Promise<boolean | false>;
  alert(content: string, title?: string): Promise<boolean | false>;
  resolveModal(): WechatMiniprogram.Component.TrivialInstance | null;
}

declare const Modal: ModalAPI;
export default Modal;
