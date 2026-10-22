/**
 * Toast 命令式 API（居中 + 顶部）
 * 居中：页面用 <bz-page> 或挂载 <bz-toast global /> 或 <bz-toast id="toast" />
 * 顶部：页面挂载 <bz-toast-top global /> 或 <bz-toast-top id="toast-top" />
 */

const TOAST_SELECTORS = ['#bz-global-toast', '#toast'];
const TOAST_TOP_SELECTORS = ['#bz-global-toast-top', '#toast-top'];
const DEFAULT_TIME = {
  center: 1500,
  top: 2000,
};

function registerGlobalToast(instance) {
  const app = getApp();
  if (app && app.globalData) {
    app.globalData.__bzToast = instance;
  }
}

function unregisterGlobalToast(instance) {
  const app = getApp();
  if (app && app.globalData && app.globalData.__bzToast === instance) {
    app.globalData.__bzToast = null;
  }
}

function registerGlobalToastTop(instance) {
  const app = getApp();
  if (app && app.globalData) {
    app.globalData.__bzToastTop = instance;
  }
}

function unregisterGlobalToastTop(instance) {
  const app = getApp();
  if (app && app.globalData && app.globalData.__bzToastTop === instance) {
    app.globalData.__bzToastTop = null;
  }
}

function resolveFromSelectors(globalKey, selectors) {
  const app = getApp();
  if (app && app.globalData && app.globalData[globalKey]) {
    return app.globalData[globalKey];
  }

  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  if (!page) return null;

  for (let i = 0; i < selectors.length; i++) {
    const instance = page.selectComponent(selectors[i]);
    if (instance) return instance;
  }

  return null;
}

function resolveToast() {
  return resolveFromSelectors('__bzToast', TOAST_SELECTORS);
}

function resolveToastTop() {
  return resolveFromSelectors('__bzToastTop', TOAST_TOP_SELECTORS);
}

function normalizeOptions(typeOrOptions, message, time, defaultTime) {
  if (typeof typeOrOptions === 'object' && typeOrOptions !== null) {
    return {
      status: typeOrOptions.type || typeOrOptions.status || 'success',
      message: typeOrOptions.message || '',
      time: typeOrOptions.time !== undefined ? typeOrOptions.time : defaultTime,
    };
  }

  return {
    status: typeOrOptions || 'success',
    message: message || '',
    time: time !== undefined ? time : defaultTime,
  };
}

function invokeToast(instance, options, warnMessage) {
  if (!instance || typeof instance.setShow !== 'function') {
    console.warn(warnMessage);
    if (options.message) {
      wx.showToast({
        title: options.message,
        icon: 'none',
        duration: Math.min(options.time, 10000),
      });
    }
    return false;
  }

  instance.setShow(options);
  return true;
}

function show(typeOrOptions, message, time) {
  const options = normalizeOptions(typeOrOptions, message, time, DEFAULT_TIME.center);
  return invokeToast(
    resolveToast(),
    options,
    '[Breeze UI] 未找到 bz-toast，请使用 <bz-page> 或添加 <bz-toast global />'
  );
}

function showTop(typeOrOptions, message, time) {
  const options = normalizeOptions(typeOrOptions, message, time, DEFAULT_TIME.top);
  return invokeToast(
    resolveToastTop(),
    options,
    '[Breeze UI] 未找到 bz-toast-top，请在页面添加 <bz-toast-top global />'
  );
}

function success(message, time) {
  return show({ status: 'success', message, time });
}

function error(message, time) {
  return show({ status: 'error', message, time });
}

function topSuccess(message, time) {
  return showTop({ status: 'success', message, time });
}

function topError(message, time) {
  return showTop({ status: 'error', message, time });
}

function showErrors(errors, fallbackMessage) {
  const list = Array.isArray(errors) ? errors : [];
  const first = list.find((item) => item && !item.valid) || list[0];
  const message = (first && first.message) || fallbackMessage || '校验未通过';
  return error(message);
}

const top = {
  show: showTop,
  success: topSuccess,
  error: topError,
};

module.exports = {
  registerGlobalToast,
  unregisterGlobalToast,
  registerGlobalToastTop,
  unregisterGlobalToastTop,
  resolveToast,
  resolveToastTop,
  normalizeOptions,
  show,
  success,
  error,
  showErrors,
  showTop,
  top,
};
