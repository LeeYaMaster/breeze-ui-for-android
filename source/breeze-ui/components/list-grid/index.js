// breeze-ui/components/list-grid/index.js
/**
 * 列表宫格组件
 * @typedef {Object} ListGridProps
 * @property {Array} [data=[]] 数据数组
 * @property {boolean} [gridBorder=false] 是否显示边框
 * @property {number} [gridCol=3] 列数
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    data: {
      type: Array,
      value: []
    },
    gridBorder: {
      type: Boolean,
      value: false
    },
    gridCol: {
      type: Number,
      value: 3
    },
  },

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
