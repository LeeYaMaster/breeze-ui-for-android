export interface TextareaProps {
  value?: string;
  placeholder?: string;
  label?: string;
  hideLabel?: boolean;
  alignStart?: boolean;
  disabled?: boolean;
  maxlength?: number;
  autoHeight?: boolean;
  extraClass?: string;
  error?: boolean;
  customClass?: string;
}

export interface TextareaMethods {
  check(type: string): boolean | undefined;
}
