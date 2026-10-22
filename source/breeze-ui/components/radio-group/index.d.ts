export interface RadioGroupOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  value?: string;
  options?: RadioGroupOption[];
  hideLabel?: boolean;
  block?: boolean;
  inline?: boolean;
  color?: string;
  round?: boolean;
  disabled?: boolean;
  extraClass?: string;
  customClass?: string;
}
