/**
 * 进度条组件
 * @typedef {Object} ProgressProps
 * @property {string} [extraClass] 额外类名
 * @property {string} [bg=''] 背景色名
 * @property {boolean} [round=false] 圆角
 * @property {boolean} [radius=false] 小圆角
 * @property {string} [value=''] 进度值（如 '30' 表示 30%）
 * @property {boolean} [sm=false] 小尺寸
 * @property {boolean} [xs=false] 超小尺寸
 * @property {boolean} [striped=false] 条纹动画
 * @property {boolean} [active=false] 激活态
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    extraClass: String,
    bg: {
      type: String,
      value: ''
    },
    round: {
      type: Boolean,
      value: false
    },
    radius: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ''
    },
    sm: {
      type: Boolean,
      value: false
    },
    xs: {
      type: Boolean,
      value: false
    },
    striped: {
      type: Boolean,
      value: false
    },
    active: {
      type: Boolean,
      value: false
    },
  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },

  }
})