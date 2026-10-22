/**
 * 加载状态展示，样式基于全局 .bz-load（见 index.wxss）
 * @property {string} [status=loading] loading | over | erro
 * @property {boolean} [icon=false] 仅图标、无文案
 * @property {boolean} [modal=false] 全屏模态加载
 * @property {string} [customClass] 根节点额外 class（如 bg-blue）
 */
Component({
  externalClasses: ['custom-class'],
  properties: {
    status: { type: String, value: 'loading' },
    icon: { type: Boolean, value: false },
    modal: { type: Boolean, value: false },
    customClass: { type: String, value: '' },
  },
  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },
  },
});
