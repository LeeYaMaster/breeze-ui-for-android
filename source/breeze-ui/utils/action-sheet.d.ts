/** ActionSheet 命令式 API */
export interface ActionSheetShowOptions {
  title?: string;
  actions: Array<{
    name: string;
    text?: string;
    color?: string;
    subname?: string;
  }>;
  cancelText?: string;
}

export interface ActionSheetAPI {
  show(options: ActionSheetShowOptions): Promise<ActionSheetShowOptions['actions'][number]>;
  hide(): boolean;
}
