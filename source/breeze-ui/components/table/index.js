/**
 * 表格组件
 * @typedef {Object} TableProps
 * @property {Array} [data=[]] 表格数据行
 * @property {Array} [header=[]] 表头配置
 * @property {number} [grid=1] 栅格/列数
 * @typedef {Object} TableMethods
 * @property {function(WechatMiniprogram.CustomEvent): void} onRowClick 行点击（可配合 triggerEvent）
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true, // 支持多个slot
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    data: {
      type: Array,
      value: []
    },
    header: {
      type: Array,
      value: []
    },
    grid: {
      type: Number,
      value: 1
    }
  },
  lifetimes: {
    attached() {

    },
    detached: function () {

    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    data:[],
    header:[],
    grid: 1
  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },
    onRowClick(e) {
      // this.triggerEvent('rowClick', e, e.currentTarget.dataset.it)
    },
  }
})
