/**
 * 标题栏组件
 * @typedef {Object} TitleBarProps
 * @property {string} [extraClass] 额外类名
 * @property {string} [title] 标题文字
 * @property {string} [color='blue'] 主题色名
 * @typedef {Object} TitleBarMethods
 * @property {function(WechatMiniprogram.CustomEvent): void} click 点击时触发，会 triggerEvent('click', e)
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    extraClass: String,
    title: String,
    color: {
      type: String,
      value: 'blue'
    }
  },

  data: {

  },

  methods: {
    onTap(e) {
      this.triggerEvent('click', e, {});
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },
  }
})
