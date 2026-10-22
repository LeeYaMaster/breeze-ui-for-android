/**
 * 底部操作菜单
 * @property {boolean} [show=false]
 * @property {boolean} [global=false] 注册为全局实例，供 ActionSheet.show() 调用
 * @property {string} [title] 顶部说明
 * @property {Array} [actions] [{ name, text, color, subname }]
 * @property {string} [cancelText=取消]
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    show: { type: Boolean, value: false },
    global: { type: Boolean, value: false },
    title: { type: String, value: '' },
    actions: { type: Array, value: [] },
    cancelText: { type: String, value: '取消' },
    customClass: { type: String, value: '' },
  },

  lifetimes: {
    attached() {
      if (this.properties.global) {
        const { registerGlobalActionSheet } = require('../../utils/action-sheet');
        registerGlobalActionSheet(this);
      }
    },
    detached() {
      if (this.properties.global) {
        const { unregisterGlobalActionSheet } = require('../../utils/action-sheet');
        unregisterGlobalActionSheet(this);
      }
    },
  },

  methods: {
    open(options = {}) {
      return new Promise((resolve, reject) => {
        this._sheetHandlers = { resolve, reject };
        this.setData({
          show: true,
          title: options.title || '',
          actions: options.actions || [],
          cancelText: options.cancelText || '取消',
        });
      });
    },

    close() {
      this.setData({ show: false });
      this._sheetHandlers = null;
    },

    onMaskTap() {
      this._finish(null);
    },

    onCancel() {
      this._finish(null);
    },

    onSelect(e) {
      const index = Number(e.currentTarget.dataset.index);
      const action = (this.data.actions || [])[index];
      this._finish(action || { index });
    },

    _finish(result) {
      const handlers = this._sheetHandlers;
      this.close();
      if (!handlers) return;
      if (result) handlers.resolve(result);
      else handlers.reject(null);
    },

    onTap(e) {
      this.triggerEvent('tap', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} });
    },
  },
});
