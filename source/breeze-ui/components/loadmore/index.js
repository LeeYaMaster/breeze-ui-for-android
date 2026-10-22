/**
 * 加载更多/页底提示组件
 * @typedef {Object} LoadmoreProps
 * @property {string} [text] 提示文案
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    text: String
  },

  data: {
    loading1: "/color_pro_img/loading/1.gif"
  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },

  }
})
