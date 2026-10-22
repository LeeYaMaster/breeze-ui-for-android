export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  disabled?: boolean;
  showValue?: boolean;
  activeColor?: string;
  backgroundColor?: string;
  blockSize?: number;
  customClass?: string;
}

export interface SliderChangeDetail {
  value: number;
}
