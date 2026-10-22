/**
 * 卡片组件
 * @typedef {Object} CardProps
 * @property {string} [type] 卡片类型
 * @property {boolean} [isCard] 是否为卡片样式
 * @property {Array} [data=[]] 卡片数据数组
 * @property {string} [mode] 模式
 * @property {string} [column] 列配置
 * @property {boolean} [loading=false] 加载中
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    type: String,
    isCard: Boolean,
    data: {
      type: Array,
      value: [],
    },
    mode: String,
    column: String,
    loading: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    _data: [],
  },

  observers: {
    'data, loading'(data, loading) {
      const list = Array.isArray(data) ? data : [];
      const _data = list.map((item) => ({
        ...item,
        loading: !!loading,
      }));
      this.setData({ _data });
    },
  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },
  },
});
