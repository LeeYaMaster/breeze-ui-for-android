/**
 * Modal / Dialog 命令式 API
 * 页面需用 <bz-page modal> 或挂载 <bz-modal global /> 或 <bz-modal id="modal" />
 */

const MODAL_SELECTORS = ['#bz-global-modal', '#modal'];

function registerGlobalModal(instance) {
  const app = getApp();
  if (app && app.globalData) {
    app.globalData.__bzModal = instance;
  }
}

function unregisterGlobalModal(instance) {
  const app = getApp();
  if (app && app.globalData && app.globalData.__bzModal === instance) {
    app.globalData.__bzModal = null;
  }
}

function resolveModal() {
  const app = getApp();
  if (app && app.globalData && app.globalData.__bzModal) {
    return app.globalData.__bzModal;
  }

  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  if (!page) return null;

  for (let i = 0; i < MODAL_SELECTORS.length; i++) {
    const instance = page.selectComponent(MODAL_SELECTORS[i]);
    if (instance) return instance;
  }

  return null;
}

function normalizeOptions(options) {
  if (typeof options === 'string') {
    return {
      title: '提示',
      content: options,
      type: 'dialog',
      show: true,
    };
  }

  return {
    type: options.type || 'dialog',
    title: options.title || '',
    content: options.content || '',
    show: options.show !== false,
    confirmText: options.confirmText || '确定',
    cancelText: options.cancelText || '取消',
    showCancel: options.showCancel !== false,
    maskClosable: options.maskClosable !== false,
    extraClass: options.extraClass || '',
    src: options.src || '',
    prompt: options.prompt || '',
    direction: options.direction || '',
  };
}

function show(options) {
  const modal = resolveModal();
  const config = normalizeOptions(options || {});

  if (!modal || typeof modal.showModal !== 'function') {
    console.warn('[Breeze UI] 未找到 bz-modal，请使用 <bz-page modal> 或添加 <bz-modal global />');
    if (config.type === 'dialog' && config.content) {
      return new Promise((resolve, reject) => {
        wx.showModal({
          title: config.title || '提示',
          content: config.content,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
          showCancel: config.showCancel,
          success(res) {
            if (res.confirm) resolve(true);
            else reject(false);
          },
          fail() {
            reject(false);
          },
        });
      });
    }
    return Promise.resolve(false);
  }

  return modal.showModal(config);
}

function hide() {
  const modal = resolveModal();
  if (modal && typeof modal.hideModal === 'function') {
    modal.hideModal();
    return true;
  }
  return false;
}

function confirm(options) {
  const config = normalizeOptions({
    ...options,
    type: 'dialog',
    show: true,
    showCancel: options.showCancel !== false,
  });

  return show(config);
}

function alert(content, title) {
  return confirm({
    title: title || '提示',
    content: typeof content === 'string' ? content : '',
    showCancel: false,
    confirmText: '确定',
  });
}

module.exports = {
  registerGlobalModal,
  unregisterGlobalModal,
  resolveModal,
  show,
  hide,
  confirm,
  alert,
};
