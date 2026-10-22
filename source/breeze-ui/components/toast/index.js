/**
 * 消息弹出框（Toast）组件
 * 推荐使用 breeze-ui/utils/toast 命令式 API，仍兼容 setShow。
 * @typedef {Object} ToastProps
 * @property {boolean} [global=false] 注册为全局 Toast，供 Toast.success() 等调用
 * @typedef {Object} ToastShowOptions
 * @property {string} [type] 状态类型，同 status
 * @property {string} [status] success | error
 * @property {string} [message] 提示文案
 * @property {number} [time=1500] 显示时长(ms)
 * @typedef {Object} ToastMethods
 * @property {function((string|ToastShowOptions), string=, number=): void} setShow 显示 toast
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    global: { type: Boolean, value: false },
  },

  data: {
    show: false,
    status: '',
    message: '',
    time: 0,
  },

  lifetimes: {
    attached() {
      if (this.properties.global) {
        const { registerGlobalToast } = require('../../utils/toast');
        registerGlobalToast(this);
      }
    },
    detached() {
      if (this.properties.global) {
        const { unregisterGlobalToast } = require('../../utils/toast');
        unregisterGlobalToast(this);
      }
    },
  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    setShow(statusOrOptions, message, time = 1500) {
      if (this._showing) {
        return;
      }

      let status;
      let msg;
      let duration;

      if (typeof statusOrOptions === 'object' && statusOrOptions !== null) {
        status = statusOrOptions.type || statusOrOptions.status || 'success';
        msg = statusOrOptions.message || '';
        duration = statusOrOptions.time !== undefined ? statusOrOptions.time : 1500;
      } else {
        status = statusOrOptions;
        msg = message || '';
        duration = time;
      }

      this._showing = true;
      try {
        this.setData({
          status,
          message: msg,
          time: duration,
          show: true,
        });
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._timer = setTimeout(() => {
          this.setData({ show: false });
          this._showing = false;
          this._timer = null;
          this.triggerEvent('end');
        }, duration);
      } catch (err) {
        this._showing = false;
      }
    },
  },
});
