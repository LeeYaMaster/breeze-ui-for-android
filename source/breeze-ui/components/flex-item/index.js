/**
 * Flex 子项组件
 * @typedef {Object} FlexItemProps
 * @property {string} [multiple] 占比等配置
 * @property {string} [extraClass] 额外类名
 */
Component({
  options: {
    addGlobalClass: true,
    virtualHost: true
  },
  externalClasses: ['class', 'custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    multiple: String,
    extraClass: String
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
