/**
 * 头像组件
 * @typedef {Object} AvatarProps
 * @property {string} [extraClass] 额外类名
 * @property {boolean} [round=false] 圆形
 * @property {boolean} [radius=false] 圆角
 * @property {string} [src=''] 图片地址
 * @property {boolean} [xl=false] 超大尺寸
 * @property {boolean} [lg=false] 大尺寸
 * @property {boolean} [sm=false] 小尺寸
 * @property {string} [bg=''] 背景色名
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    extraClass: String,
    round: {
      type: Boolean,
      value: false
    },
    radius: {
      type: Boolean,
      value: false
    },
    src: {
      type: String,
      value: ''
    },
    xl: {
      type: Boolean,
      value: false
    },
    lg: {
      type: Boolean,
      value: false
    },
    sm: {
      type: Boolean,
      value: false
    },
    bg: {
      type: String,
      value: ''
    },
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
