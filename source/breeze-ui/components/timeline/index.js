// breeze-ui/components/timeline/index.js
/**
 * 时间轴组件
 * 无对外 properties，通过 slot 填充节点内容。
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
