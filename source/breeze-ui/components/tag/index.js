/**
 * 标签组件
 * @typedef {Object} TagProps
 * @property {boolean} [round=false] 圆角
 * @property {boolean} [radius=false] 小圆角
 * @property {boolean} [sm=false] 小尺寸
 * @property {string} [line=''] 线条色名
 * @property {string} [bgColor=''] 背景色名
 * @property {boolean} [light=false] 浅色样式
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    round: {
      type: Boolean,
      value: false
    },
    radius: {
      type: Boolean,
      value: false
    },
    sm: {
      type: Boolean,
      value: false
    },
    line: {
      type: String,
      value: ''
    },
    bgColor: {
      type: String,
      value: ''
    },
    light: {
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