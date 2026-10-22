/**
 * 下拉刷新容器（scroll-view refresher）
 * @property {boolean} [refreshing=false] 刷新中
 * @property {boolean} [enabled=true] 是否开启
 * @property {string} [height=100vh] 容器高度
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    refreshing: { type: Boolean, value: false },
    enabled: { type: Boolean, value: true },
    height: { type: String, value: '100vh' },
    customClass: { type: String, value: '' },
  },
  methods: {
    onRefresh() {
      this.triggerEvent('refresh', {});
    },
    onTap(e) {
      this.triggerEvent('tap', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} });
    },
  },
});
