/**
 * 吸顶组件
 * @typedef {Object} StickyProps
 * @property {string} [top] 吸顶时距离顶部的距离（如 '88rpx'）
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    top: String
  },

  data: {

  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },

  }
})
