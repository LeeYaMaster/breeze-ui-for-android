export interface BzConfig {
  theme?: string;
  radius?: string;
  /** 内部字段，与 textSize 对应 */
  fontSize?: string;
  /** 与组件属性 textSize 一致 */
  textSize?: string;
}

export interface ConfigAPI {
  RADIUS_PRESETS: Record<string, string>;
  FONT_SIZE_PRESETS: Record<string, string>;
  DEFAULT_CONFIG: BzConfig;
  normalizeSize(value: string, presets: Record<string, string>, fallback?: string): string;
  pickDefined(source: Partial<BzConfig> & { textSize?: string } | null | undefined): Partial<BzConfig>;
  mergeConfig(base?: Partial<BzConfig> | null, override?: Partial<BzConfig> | null): BzConfig;
  buildConfigClass(config?: Partial<BzConfig> | null): string;
  buildConfigStyle(config?: Partial<BzConfig> | null): string;
}

declare const Config: ConfigAPI;
export default Config;
