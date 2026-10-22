/**
 * 宫格组件
 * @typedef {Object} GridProps
 * @property {string} [col] 列数，如 '3'、'4'
 * @property {string} [extraClass] 额外类名
 * @property {boolean} [square=false] 等高（正方形格子）
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    col: String,
    extraClass: String,
    square: {//等高
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
