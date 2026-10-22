/**
 * 图标组件
 * @typedef {Object} IconProps
 * @property {string} [name] 图标名（bzIcon- 前缀的类名，如 'newsfill'）
 * @property {string} [extraClass] 额外类名
 * @property {string} [textColor] 文字/图标颜色类名
 * @property {string} [size] 尺寸类名
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    name : String,
    extraClass: String,
    textColor: String,
    size: String,
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
