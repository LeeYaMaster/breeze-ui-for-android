/**
 * ActionSheet 命令式 API
 * 页面需用 <bz-page actionSheet> 或 <bz-action-sheet global />
 */

const SHEET_SELECTORS = ['#bz-global-action-sheet', '#action-sheet'];

function registerGlobalActionSheet(instance) {
  const app = getApp();
  if (app && app.globalData) {
    app.globalData.__bzActionSheet = instance;
  }
}

function unregisterGlobalActionSheet(instance) {
  const app = getApp();
  if (app && app.globalData && app.globalData.__bzActionSheet === instance) {
    app.globalData.__bzActionSheet = null;
  }
}

function resolveActionSheet() {
  const app = getApp();
  if (app && app.globalData && app.globalData.__bzActionSheet) {
    return app.globalData.__bzActionSheet;
  }

  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  if (!page) return null;

  for (let i = 0; i < SHEET_SELECTORS.length; i++) {
    const instance = page.selectComponent(SHEET_SELECTORS[i]);
    if (instance) return instance;
  }

  return null;
}

function show(options) {
  const sheet = resolveActionSheet();
  const config = options || {};

  if (!sheet || typeof sheet.open !== 'function') {
    console.warn('[Breeze UI] 未找到 bz-action-sheet，请使用 <bz-page actionSheet> 或添加 <bz-action-sheet global />');
    if (config.actions && config.actions.length) {
      return new Promise((resolve, reject) => {
        wx.showActionSheet({
          itemList: config.actions.map((item) => item.text || item.name),
          success(res) {
            resolve(config.actions[res.tapIndex]);
          },
          fail() {
            reject(null);
          },
        });
      });
    }
    return Promise.reject(null);
  }

  return sheet.open(config);
}

function hide() {
  const sheet = resolveActionSheet();
  if (sheet && typeof sheet.close === 'function') {
    sheet.close();
    return true;
  }
  return false;
}

module.exports = {
  registerGlobalActionSheet,
  unregisterGlobalActionSheet,
  resolveActionSheet,
  show,
  hide,
};
