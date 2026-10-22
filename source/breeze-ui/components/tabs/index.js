/**
 * 标签页组件（基于 .nav .bz-item 样式）
 * @property {Array<{title:string,name?:string}>} tabs 标签项
 * @property {number} [current=0] 当前索引
 * @property {boolean} [scroll=true] 横向滚动
 * @property {boolean} [centered=false] 居中
 * @property {boolean} [equal=false] 等分宽度
 * @property {string} [navClass=bg-white] 导航条背景 class
 * @property {string} [activeClass=text-green] 选中项文字 class
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    tabs: { type: Array, value: [] },
    current: { type: Number, value: 0 },
    scroll: { type: Boolean, value: true },
    centered: { type: Boolean, value: false },
    equal: { type: Boolean, value: false },
    navClass: { type: String, value: 'bg-white' },
    activeClass: { type: String, value: 'text-green' },
    customClass: { type: String, value: '' },
  },

  data: {
    scrollLeft: 0,
  },

  observers: {
    'current, tabs': function (current) {
      if (this.properties.scroll && !this.properties.equal) {
        this.setData({ scrollLeft: Math.max(0, (current - 1) * 60) });
      }
    },
  },

  methods: {
    onTabTap(e) {
      const index = Number(e.currentTarget.dataset.index);
      const item = this.properties.tabs[index] || {};
      if (index === this.properties.current) return;
      this.triggerEvent('change', {
        index,
        name: item.name || String(index),
        title: item.title || '',
      });
      this.triggerEvent('tap', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} });
    },
  },
});
