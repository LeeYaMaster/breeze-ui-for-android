const { resolveViewState } = require('../../utils/state-box');

/**
 * 内容区状态容器：loading / skeleton / error / empty / 默认 slot 互斥展示
 * @property {boolean} [loading=false] 加载中
 * @property {boolean} [skeleton=false] 骨架屏（首屏）
 * @property {boolean} [empty=false] 空状态
 * @property {string|boolean} [error=''] 错误信息，传 true 时使用 errorText
 * @property {string} [emptyText='暂无数据'] 空状态文案
 * @property {string} [errorText='加载失败，请稍后重试'] error 为 true 时的默认文案
 * @property {string} [loadingText=''] 加载区附加文案
 * @property {string} [skeletonTemplate='list'] 骨架模版
 * @property {number} [skeletonRows=3] 骨架行数
 * @property {boolean} [retry=true] 错误态是否显示重试按钮
 * @property {string} [minHeight='360rpx'] 状态面板最小高度
 * @property {string} [customClass] 根节点 class
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    loading: { type: Boolean, value: false },
    skeleton: { type: Boolean, value: false },
    empty: { type: Boolean, value: false },
    error: {
      type: null,
      optionalTypes: [String, Boolean],
      value: '',
    },
    emptyText: { type: String, value: '暂无数据' },
    errorText: { type: String, value: '加载失败，请稍后重试' },
    loadingText: { type: String, value: '' },
    skeletonTemplate: { type: String, value: 'list' },
    skeletonRows: { type: Number, value: 3 },
    retry: { type: Boolean, value: true },
    minHeight: { type: String, value: '360rpx' },
  },

  data: {
    viewState: 'content',
    errorMessage: '',
    skeletonItems: [],
  },

  observers: {
    'loading, skeleton, error, empty, errorText': function () {
      this.updateViewState();
    },
    skeletonRows(rows) {
      const count = Math.max(1, rows || 1);
      const skeletonItems = [];
      for (let i = 0; i < count; i += 1) {
        skeletonItems.push(i);
      }
      this.setData({ skeletonItems });
    },
  },

  lifetimes: {
    attached() {
      const count = Math.max(1, this.data.skeletonRows || 1);
      const skeletonItems = [];
      for (let i = 0; i < count; i += 1) {
        skeletonItems.push(i);
      }
      this.setData({ skeletonItems });
      this.updateViewState();
    },
  },

  methods: {
    updateViewState() {
      const { viewState, errorMessage } = resolveViewState({
        loading: this.properties.loading,
        skeleton: this.properties.skeleton,
        error: this.properties.error,
        empty: this.properties.empty,
        errorText: this.properties.errorText,
      });
      this.setData({ viewState, errorMessage });
    },

    onRetry() {
      this.triggerEvent('retry', {}, {});
    },
  },
});
