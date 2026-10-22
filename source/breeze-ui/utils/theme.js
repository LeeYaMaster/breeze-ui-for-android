/**
 * 全局主题 / 一键换肤
 * 配合 breeze-ui/theme.wxss 与页面根节点 class="theme-wrap {{themeClass}}"
 */

const STORAGE_KEY = 'themeClass';

const THEMES = [
  { id: 'theme-default', name: 'Breeze', color: '#5b6cff' },
  { id: 'theme-blue', name: '海蓝', color: '#0081ff' },
  { id: 'theme-purple', name: '暮紫', color: '#6739b6' },
  { id: 'theme-orange', name: '暖橙', color: '#f37b1d' },
  { id: 'theme-red', name: '绯红', color: '#e54d42' },
  { id: 'theme-cyan', name: '青绿', color: '#1cbbb4' },
];

function getThemeId() {
  try {
    return wx.getStorageSync(STORAGE_KEY) || 'theme-default';
  } catch (e) {
    return 'theme-default';
  }
}

function getThemeMeta(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

function applyThemeToPages(themeClass) {
  const pages = getCurrentPages();
  pages.forEach((page) => {
    if (!page || typeof page.setData !== 'function') return;
    page.setData({ themeClass });
  });
}

function setTheme(themeClass) {
  const meta = getThemeMeta(themeClass);
  const id = meta.id;

  try {
    wx.setStorageSync(STORAGE_KEY, id);
  } catch (e) {
    console.warn('[Breeze UI] 主题写入缓存失败', e);
  }

  const app = getApp();
  if (app && app.globalData) {
    app.globalData.themeClass = id;
  }

  applyThemeToPages(id);
  return meta;
}

function syncPage(pageInstance) {
  if (!pageInstance || typeof pageInstance.setData !== 'function') return;
  pageInstance.setData({ themeClass: getThemeId() });
}

module.exports = {
  STORAGE_KEY,
  THEMES,
  getThemeId,
  getThemeMeta,
  setTheme,
  syncPage,
  applyThemeToPages,
};
