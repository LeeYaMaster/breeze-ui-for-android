const Skeleton = require('../../utils/skeleton');

/**
 * 骨架屏组件
 * @typedef {Object} SkeletonProps
 * @property {boolean} [loading=true] 是否显示骨架
 * @property {boolean} [active=true] 是否开启动画
 * @property {string} [template=''] 模版名 case|article|paragraph|list|menu
 * @property {number} [column=0] 骨架列数，0 时沿用 template
 * @property {Array} [columnWidth=[]] 列宽配置，空数组时沿用 template
 * @property {string} [endHeight=''] 底部高度，空时沿用 template
 * @property {boolean|null} [avatar] 头像占位，未传时沿用 template
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    loading: {
      type: Boolean,
      value: true,
    },
    active: {
      type: Boolean,
      value: true,
    },
    template: {
      type: String,
      value: '',
    },
    column: {
      type: Number,
      value: 0,
    },
    columnWidth: {
      type: Array,
      value: [],
    },
    endHeight: {
      type: String,
      value: '',
    },
    avatar: {
      type: null,
      optionalTypes: [Boolean],
      value: null,
    },
  },
  data: {
    skeletonRows: [],
    resolvedAvatar: false,
    resolvedColumnWidth: [],
    resolvedEndHeight: '',
  },
  lifetimes: {
    attached() {
      this.applyConfig();
    },
  },
  observers: {
    'template, column, columnWidth, endHeight, avatar': function () {
      this.applyConfig();
    },
  },
  methods: {
    applyConfig() {
      const resolved = Skeleton.resolveConfig({
        template: this.data.template,
        column: this.data.column,
        columnWidth: this.data.columnWidth,
        endHeight: this.data.endHeight,
        avatar: this.data.avatar,
      });

      const skeletonRows = [];
      for (let i = 0; i < resolved.column; i += 1) {
        skeletonRows.push(i);
      }

      this.setData({
        skeletonRows,
        resolvedAvatar: resolved.avatar,
        resolvedColumnWidth: resolved.columnWidth,
        resolvedEndHeight: resolved.endHeight,
      });
    },
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },
  },
});
