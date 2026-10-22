/**
 * 列表菜单项组件
 * @typedef {Object} ListMenuItemProps
 * @property {boolean} [menuArrow=false] 是否显示右侧箭头
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
    virtualHost: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    menuArrow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },

  }
})
