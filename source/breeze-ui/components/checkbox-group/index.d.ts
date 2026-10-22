export interface CheckboxGroupOption {
  label: string;
  value: string;
}

export interface CheckboxGroupProps {
  value?: string[];
  options?: CheckboxGroupOption[];
  hideLabel?: boolean;
  block?: boolean;
  color?: string;
  round?: boolean;
  disabled?: boolean;
  extraClass?: string;
  customClass?: string;
}
