/**
 * 分段器/选项卡组件
 * @typedef {Object} SegmentProps
 * @property {Array} [tabNav] 选项卡数据数组
 * @property {number} [TabCur] 当前选中的索引
 * @typedef {Object} SegmentMethods
 * @property {function(WechatMiniprogram.CustomEvent): void} tabSelect 切换选项卡时触发
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    customClass: { type: String, value: "" },
    tabNav: Array,
    TabCur: Number,
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
    },
  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },
    tabSelect(e) {
      console.log(e);
      this.setData({
        scrollLeft: (e.currentTarget.dataset.index - 1) * 60,
      });
      this.triggerEvent(
        "tabSelect",
        {
          index: e.currentTarget.dataset.index,
        },
        {},
      );
      this.triggerEvent('tap', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} }, {});
    },
  },
});
