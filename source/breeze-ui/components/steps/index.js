/**
 * 步骤条组件
 * @typedef {Object} StepsProps
 * @property {string} [textColor] 文字颜色类名
 * @property {Array} [data] 步骤数据数组
 * @property {number} [basics] 当前步骤索引
 * @property {boolean} [arrow] 是否显示箭头
 * @property {boolean} [num] 是否显示数字
 * @property {boolean} [isScroll] 是否横向滚动
 * @property {number} [scroll] 滚动位置
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    textColor: String,
    data: Array,
    basics: Number,
    arrow: Boolean,
    num: Boolean,
    isScroll: Boolean,
    scroll: Number
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
