export interface ThemeMeta {
  id: string;
  name: string;
  color: string;
}

export interface ThemeAPI {
  STORAGE_KEY: string;
  THEMES: ThemeMeta[];
  getThemeId(): string;
  getThemeMeta(id: string): ThemeMeta;
  setTheme(themeClass: string): ThemeMeta;
  syncPage(pageInstance: WechatMiniprogram.Page.TrivialInstance | WechatMiniprogram.Component.TrivialInstance): void;
  applyThemeToPages(themeClass: string): void;
}
