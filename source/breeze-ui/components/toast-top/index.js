/**
 * 顶部提示框组件
 * 推荐使用 breeze-ui/utils/toast 的 Toast.top.success() 等命令式 API。
 * @typedef {Object} ToastTopProps
 * @property {boolean} [global=false] 注册为全局顶部 Toast
 * @property {string} [message] 提示文案（无参 setShow 时使用）
 * @property {number} [time=2000] 显示时长(ms)
 * @property {string} [status] 状态类型
 * @typedef {Object} ToastTopShowOptions
 * @property {string} [type] 状态类型，同 status
 * @property {string} [status] success | error
 * @property {string} [message] 提示文案
 * @property {number} [time=2000] 显示时长(ms)
 * @typedef {Object} ToastTopMethods
 * @property {function((string|ToastTopShowOptions), string=, number=): void} setShow 显示顶部提示
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    global: { type: Boolean, value: false },
    message: String,
    time: {
      type: Number,
      value: 2000,
    },
    status: String,
    show: Boolean,
  },

  data: {
    animation: '',
  },

  lifetimes: {
    attached() {
      this._animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-out',
        delay: 0,
        transformOrigin: '50% 50% 0',
      });
      if (this.properties.global) {
        const { registerGlobalToastTop } = require('../../utils/toast');
        registerGlobalToastTop(this);
      }
    },
    detached() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      if (this.properties.global) {
        const { unregisterGlobalToastTop } = require('../../utils/toast');
        unregisterGlobalToastTop(this);
      }
    },
  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    setShow(statusOrOptions, message, time = 2000) {
      if (this._showing) {
        return;
      }

      let status;
      let msg;
      let duration;

      if (typeof statusOrOptions === 'object' && statusOrOptions !== null) {
        status = statusOrOptions.type || statusOrOptions.status || 'success';
        msg = statusOrOptions.message || '';
        duration = statusOrOptions.time !== undefined ? statusOrOptions.time : 2000;
      } else if (arguments.length >= 2) {
        status = statusOrOptions || 'success';
        msg = message || '';
        duration = time;
      } else {
        status = this.data.status || 'success';
        msg = this.data.message || '';
        duration = this.data.time || 2000;
      }

      this._showing = true;
      this.setData({
        status,
        message: msg,
        time: duration,
      });
      this.startAnimation();

      if (this._timer) {
        clearTimeout(this._timer);
      }

      this._timer = setTimeout(() => {
        this.endAnimation();
        this._showing = false;
        this._timer = null;
        this.triggerEvent('end');
      }, duration);
    },

    startAnimation() {
      this._animation.height('80rpx').step();
      this.setData({
        animation: this._animation.export(),
      });
    },

    endAnimation() {
      this._animation.height('0rpx').step();
      this.setData({
        animation: this._animation.export(),
      });
    },
  },
});
