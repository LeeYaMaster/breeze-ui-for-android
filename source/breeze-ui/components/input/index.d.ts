/**
 * 输入框组件属性
 */
export interface InputProps {
  /** 当前值 */
  value?: string;
  /** 占位符 */
  placeholder?: string;
  /** 组件 id */
  id?: string;
  /** 标签 */
  label?: string;
  /** 隐藏标签，配合 bz-form-field 使用 */
  hideLabel?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 额外类名 */
  extraClass?: string;
  /** 错误态样式 */
  error?: boolean;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 输入框组件实例方法
 */
export interface InputMethods {
  /** 设置输入值 */
  setInput(e: WechatMiniprogram.CustomEvent): void;
  /** 校验，type 可为 regEmail | regPhone | regIdCard | regChinese | regRequire 或 phone | email 等 */
  check(type: string): boolean | undefined;
}
