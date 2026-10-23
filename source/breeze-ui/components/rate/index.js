/**
 * 评分组件
 * @typedef {Object} RateProps
 * @property {number} [count=5] 星星总数
 * @property {number} [score=100] 满分，用于 click 事件 result 计算
 * @property {number} [value=0] 当前选中星数
 * @typedef {Object} RateMethods
 * 点击星星时触发 click 事件，detail: { result } 为 score/count*选中索引
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    count: {
      type: Number,
      value: 5,
    },
    score: {
      type: Number,
      value: 100,
    },
    value: {
      type: Number,
      value: 0,
    },
  },

  data: {
    active: 0,
  },

  observers: {
    'value, count': function (value, count) {
      const max = Number(count) || 5;
      const active = Math.min(Math.max(0, Number(value) || 0), max);
      this.setData({ active });
    },
  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },
    click(e) {
      const { score, count } = this.data;
      const active = e.currentTarget.dataset.index + 1;
      this.setData({ active });
      this.triggerEvent('change', { value: active });
      this.triggerEvent('click', { result: score / count * active, value: active }, {});
      this.triggerEvent('tap', { result: score / count * active, value: active, dataset: e.currentTarget?.dataset || {} }, {});
    },
  }
})