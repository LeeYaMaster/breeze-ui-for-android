export interface ActionSheetItem {
  name: string;
  text?: string;
  color?: string;
  subname?: string;
}

export interface ActionSheetProps {
  show?: boolean;
  global?: boolean;
  title?: string;
  actions?: ActionSheetItem[];
  cancelText?: string;
  customClass?: string;
}

export interface ActionSheetShowOptions {
  title?: string;
  actions: ActionSheetItem[];
  cancelText?: string;
}

export interface ActionSheetMethods {
  open(options?: ActionSheetShowOptions): Promise<ActionSheetItem>;
  close(): void;
}
