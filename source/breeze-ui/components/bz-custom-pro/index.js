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
    bgImage: { type: String, value: '' },
    isHome: { type: [Boolean, String], value: false },
    isLeftCustom: { type: [Boolean, String], value: false },
    myBgColor: { type: String, value: '' },
    isLucency: { type: Boolean, value: false },
    isContent: { type: Boolean, value: true },
    noFixed: { type: Boolean, value: false }
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
    BackHome(e) {
      wx.reLaunch({ url: '/pages/index/index' });
      this._emitNavTap(e, 'home');
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
