/**
 * 管理表格组件（支持删除、更新等操作）
 * @typedef {Object} AdminTableProps
 * @property {Array} [list=[]] 数据列表
 * @property {Array} [header=[]] 表头配置
 * @property {boolean} [del=false] 是否显示删除
 * @property {boolean} [show=false] 是否显示
 * @property {boolean} [update=false] 是否显示更新
 * @property {boolean} [cover=true] 是否遮罩
 * @typedef {Object} AdminTableMethods
 * @property {function(WechatMiniprogram.CustomEvent): void} action 操作时触发，detail: { _id, data, action }
 */
Component({
  options: {
    multipleSlots: true, // 支持多个slot
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    list: {
      type: Array,
      value: []
    },
    header: {
      type: Array,
      value: []
    },
    del: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: false
    },
    update: {
      type: Boolean,
      value: false
    },
    cover: {
      type: Boolean,
      value: true
    }
  },
  lifetimes: {
    attached() {

    },
    detached: function () {

    },
  },

  data: {
    list:[],
    header:[],
  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },
    action(e) {
      this.triggerEvent("action",{_id:e.currentTarget.dataset._id, data:e.currentTarget.dataset.item, action:e.currentTarget.dataset.action})
    this.triggerEvent('tap', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} }, {});
    },
  }
})