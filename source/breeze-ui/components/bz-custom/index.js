/**
 * 自定义导航栏组件
 * @typedef {Object} BzCustomProps
 * @property {string} [bgColor=''] 背景色
 * @property {boolean|string} [isCustom=false] 是否自定义导航
 * @property {boolean|string} [isBack=false] 是否显示返回
 * @property {string} [bgImage=''] 背景图
 * @typedef {Object} BzCustomMethods
 * @property {function(): void} BackPage 返回上一页
 * @property {function(): void} toHome 回到首页
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    bgColor: { type: String, value: '' },
    isCustom: { type: [Boolean, String], value: false },
    isBack: { type: [Boolean, String], value: false },
    bgImage: { type: String, value: '' }
  },
  data: {
    StatusBar: 0,
    CustomBar: 0,
    Custom: null
  },
  lifetimes: {
    attached() {
      const app = getApp();
      if (!app || !app.globalData) return;
      this.setData({
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom
      });
    }
  },
  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },
    BackPage(e) {
      wx.navigateBack({ delta: 1 });
      this._emitNavTap(e, 'back');
    },
    toHome(e) {
      wx.reLaunch({ url: '/pages/index/index' });
      this._emitNavTap(e, 'home');
    },
    _emitNavTap(e, action) {
      const event = e || {};
      const { dataset = {} } = event.currentTarget || {};
      this.triggerEvent('tap', { ...(event.detail || {}), dataset, action }, {});
      this.triggerEvent(action, { dataset });
    },
  }
});
