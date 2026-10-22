// breeze-ui/components/choose/index.js
/**
 * 选择器容器组件（如单选、多选组）
 * 无对外 properties，主要作为容器使用。
 */
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' }
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
