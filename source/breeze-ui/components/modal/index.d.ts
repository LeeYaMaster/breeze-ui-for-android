/**
 * 模态框组件属性
 */
export interface ModalProps {
  global?: boolean;
  extraClass?: string;
  title?: string;
  content?: string;
  show?: boolean;
  type?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  maskClosable?: boolean;
  src?: string;
  prompt?: string;
  direction?: string;
  customClass?: string;
}

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
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * 模态框组件实例方法
 */
export interface ModalMethods {
  showModal(options: ModalShowOptions): Promise<boolean>;
  hideModal(e?: WechatMiniprogram.TouchEvent): void;
}
