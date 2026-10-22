/**
 * 空状态组件
 * @typedef {Object} EmptyProps
 * @property {Array} [data] 空状态配置数据（如图片、文案等）
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    data: Array
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
