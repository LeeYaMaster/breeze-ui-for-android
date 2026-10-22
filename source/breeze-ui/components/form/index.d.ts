/** 表单校验规则 */
export interface FormRule {
  /** 是否必填 */
  required?: boolean;
  /** 规则类型：required | phone | email | idCard | chinese | pattern */
  type?: string;
  /** 自定义正则 */
  pattern?: string | RegExp;
  /** 最小长度 */
  min?: number;
  /** 最大长度 */
  max?: number;
  /** 错误提示 */
  message?: string;
  /** 自定义校验，返回 true 表示通过，返回字符串表示错误信息 */
  validator?: (value: string, rule: FormRule) => boolean | string;
}

/** 表单容器属性 */
export interface FormProps {
  rules?: Record<string, FormRule | FormRule[] | string | string[]>;
  /** 表单数据，配合 model:model 双向绑定 */
  model?: Record<string, string | number | boolean | string[]>;
  validateTrigger?: 'onSubmit' | 'onChange';
  customClass?: string;
}

/** 表单校验结果 */
export interface FormValidateResult {
  valid: boolean;
  errors: Array<{
    valid: boolean;
    name: string;
    message: string;
    value: string | number | boolean;
  }>;
  values: Record<string, string | number | boolean>;
}

/** 表单容器方法 */
export interface FormMethods {
  validate(): Promise<FormValidateResult>;
  validateField(name: string): Promise<FormValidateResult['errors'][0]>;
  getFieldsValue(): Record<string, string | number | boolean>;
  setFieldsValue(values: Record<string, string | number | boolean>): void;
  resetFields(names?: string[]): void;
  submit(): Promise<FormValidateResult>;
  updateModel(name: string, value: string | number | boolean | string[]): void;
}

/** 表单字段属性 */
export interface FormFieldProps {
  name?: string;
  label?: string;
  required?: boolean;
  rules?: FormRule | FormRule[] | string | string[];
  value?: string | number | boolean;
  /** 重置时的默认值 */
  defaultValue?: string | number | boolean;
  /** 标签顶对齐 */
  alignStart?: boolean;
  /** 控件对齐方式 */
  controlAlign?: 'stretch' | 'right';
  extraClass?: string;
  customClass?: string;
}

/** 表单字段方法 */
export interface FormFieldMethods {
  validate(): Promise<FormValidateResult['errors'][0]>;
  setFieldValue(value: string | number | boolean): void;
  resetField(): void;
  getFieldSnapshot(): { name: string; value: string | number | boolean };
}

export type { FormRule as ValidatorRule };
