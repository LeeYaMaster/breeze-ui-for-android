// breeze-ui/components/list-menu/index.js
/**
 * 列表菜单容器组件
 * @typedef {Object} ListMenuProps
 * @property {boolean} [menuBorder=false] 是否显示边框
 * @property {boolean} [menuCard=false] 是否卡片样式
 */
Component({
  options: {
    addGlobalClass: true,
    virtualHost: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    menuBorder: {
      type: Boolean,
      value: false
    },
    menuCard: {
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
