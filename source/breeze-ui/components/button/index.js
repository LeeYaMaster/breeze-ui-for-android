/**
 * 按钮组件
 * @typedef {Object} ButtonProps
 * @property {boolean} [round=false] 圆角按钮
 * @property {boolean} [radius=false] 小圆角
 * @property {boolean} [icon=false] 图标按钮样式
 * @property {boolean} [sm=false] 小尺寸
 * @property {boolean} [lg=false] 大尺寸
 * @property {boolean} [shadow=false] 阴影
 * @property {boolean} [block=false] 块级占满一行
 * @property {boolean} [disabled=false] 禁用
 * @property {boolean} [loading=false] 加载中
 * @property {string} [line=''] 线条色，如 'red'、'green'
 * @property {string} [lines=''] 线条色（复数）
 * @property {string} [bgColor=''] 背景色名，如 'red'、'green'
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /** 支持从外部传入类名，用于覆盖样式，如 <bz-button custom-class="my-btn"> */
  externalClasses: ['custom-class'],
  properties: {
    /** 外部传入的类名，与 custom-class 对应，需在 properties 里声明才能收到值 */
    customClass: {
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
    icon: {
      type: Boolean,
      value: false
    },
    sm: {
      type: Boolean,
      value: false
    },
    lg: {
      type: Boolean,
      value: false
    },
    shadow: {
      type: Boolean,
      value: false
    },
    block: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    line: {
      type: String,
      value: ''
    },
    lines: {
      type: String,
      value: ''
    },
    bgColor: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据（当前无内部状态，仅靠 properties 驱动）
   */
  data: {},

  /**
   * 组件的方法列表
   * 点击会由原生 button 冒泡，页面可直接 bindtap；若需在组件内先处理再通知外部，可在此添加 onTap 并 triggerEvent('tap', e)
   */
  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },
  },
})
