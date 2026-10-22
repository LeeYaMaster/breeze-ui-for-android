const { resolveViewState } = require('../../utils/state-box');

/**
 * 列表页范式：下拉刷新 + 状态容器 + 页底加载
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    height: { type: String, value: 'calc(100vh - 200rpx)' },
    refresherEnabled: { type: Boolean, value: true },
    refreshing: { type: Boolean, value: false },
    lowerThreshold: { type: Number, value: 120 },
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
    showLoadmore: { type: Boolean, value: true },
    loadmoreStatus: { type: String, value: '' },
    loadmoreText: { type: String, value: '' },
  },

  data: {
    viewState: 'content',
  },

  observers: {
    'loading, skeleton, error, empty, errorText': function () {
      this.syncViewState();
    },
  },

  lifetimes: {
    attached() {
      this.syncViewState();
    },
  },

  methods: {
    syncViewState() {
      const { viewState } = resolveViewState({
        loading: this.properties.loading,
        skeleton: this.properties.skeleton,
        error: this.properties.error,
        empty: this.properties.empty,
        errorText: this.properties.errorText,
      });
      this.setData({ viewState });
    },

    onRefresh() {
      this.triggerEvent('refresh', {}, {});
    },

    onLoadMore() {
      if (this.data.viewState !== 'content') return;
      if (this.properties.loadmoreStatus === 'over') return;
      this.triggerEvent('loadmore', {}, {});
    },

    onRetry() {
      this.triggerEvent('retry', {}, {});
    },
  },
});
