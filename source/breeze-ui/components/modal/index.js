/**
 * 模态框组件
 * 推荐使用 breeze-ui/utils/modal 命令式 API。
 * @typedef {Object} ModalProps
 * @property {boolean} [global=false] 注册为全局 Modal
 * @property {string} [title] 标题
 * @property {string} [content=''] 文本内容（type=dialog 时使用）
 * @property {boolean} [show=false] 是否显示
 * @property {string} [type=''] 类型：dialog | bottom | image | pithy | drawer
 * @property {string} [confirmText='确定'] 确认按钮文案
 * @property {string} [cancelText='取消'] 取消按钮文案
 * @property {boolean} [showCancel=true] 是否显示取消按钮
 * @property {boolean} [maskClosable=true] 点击遮罩是否关闭
 * @typedef {Object} ModalMethods
 * @property {function(Object): Promise<boolean>} showModal 命令式打开
 * @property {function(): void} hideModal 关闭模态框
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    global: { type: Boolean, value: false },
    extraClass: String,
    title: String,
    content: { type: String, value: '' },
    show: {
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: '',
    },
    confirmText: { type: String, value: '确定' },
    cancelText: { type: String, value: '取消' },
    showCancel: { type: Boolean, value: true },
    maskClosable: { type: Boolean, value: true },
    src: String,
    prompt: String,
    direction: String,
  },

  data: {
    CustomBar: 0,
  },

  lifetimes: {
    attached() {
      const app = getApp();
      if (app && app.globalData) {
        this.setData({ CustomBar: app.globalData.CustomBar });
      }
      if (this.properties.global) {
        const { registerGlobalModal } = require('../../utils/modal');
        registerGlobalModal(this);
      }
    },
    detached() {
      if (this.properties.global) {
        const { unregisterGlobalModal } = require('../../utils/modal');
        unregisterGlobalModal(this);
      }
    },
  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    showModal(options = {}) {
      return new Promise((resolve, reject) => {
        this._dialogHandlers = {
          resolve,
          reject,
          onConfirm: options.onConfirm,
          onCancel: options.onCancel,
        };
        this.setData({
          type: options.type || 'dialog',
          title: options.title || '',
          content: options.content || '',
          confirmText: options.confirmText || '确定',
          cancelText: options.cancelText || '取消',
          showCancel: options.showCancel !== false,
          maskClosable: options.maskClosable !== false,
          extraClass: options.extraClass || '',
          src: options.src || '',
          prompt: options.prompt || '',
          direction: options.direction || '',
          show: true,
        });
      });
    },

    hideModal(e) {
      this._finish(false);
      if (e) {
        const { dataset = {} } = e.currentTarget || {};
        this.triggerEvent('tap', { ...(e.detail || {}), dataset }, {});
      }
      this.triggerEvent('close');
    },

    onConfirm() {
      const handlers = this._dialogHandlers || {};
      if (handlers.onConfirm) handlers.onConfirm();
      this._finish(true);
      this.triggerEvent('confirm');
    },

    onCancel() {
      const handlers = this._dialogHandlers || {};
      if (handlers.onCancel) handlers.onCancel();
      this._finish(false);
      this.triggerEvent('cancel');
    },

    onMaskTap() {
      if (!this.data.maskClosable) return;
      this.onCancel();
    },

    _finish(confirmed) {
      const handlers = this._dialogHandlers;
      this.setData({ show: false });
      this._dialogHandlers = null;
      if (!handlers) return;
      if (confirmed && handlers.resolve) {
        handlers.resolve(true);
      } else if (!confirmed && handlers.reject) {
        handlers.reject(false);
      }
    },
  },
});
