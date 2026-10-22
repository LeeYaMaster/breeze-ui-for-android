import type { BzConfig } from '../../utils/config';

/** bz-config-provider 轻量 ConfigProvider Props */
export interface ConfigProviderProps {
  /** 主题 id，如 theme-blue；空则继承全局 Theme.getThemeId() */
  theme?: string;
  /** 圆角预设 sm|md|lg|xl 或自定义值 */
  radius?: string;
  /** 字号预设 sm|md|lg|xl 或自定义值 */
  textSize?: string;
  /** 未指定 theme 时是否使用 Theme.getThemeId()，默认 true */
  useGlobalTheme?: boolean;
  customClass?: string;
}

export interface ConfigProviderMethods {
  getConfig(): BzConfig;
}

export type { BzConfig };
