/**
 * 文字提示/气泡组件
 * @typedef {Object} TooltipProps
 * @property {boolean} [show] 是否显示
 * @property {string} [text] 提示文字
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    show: Boolean,
    text: String
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
