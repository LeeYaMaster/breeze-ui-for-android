/**
 * 列表单元格
 * @property {string} [title] 标题
 * @property {string} [label] 描述
 * @property {string} [value] 右侧文案
 * @property {string} [icon] 左侧图标 class，如 bzIcon-formfill text-green
 * @property {boolean} [isLink=false] 是否显示箭头
 * @property {boolean} [required=false] 必填标记
 * @property {boolean} [border=true] 底部分割线（menu 列表内默认有）
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    title: { type: String, value: '' },
    label: { type: String, value: '' },
    value: { type: String, value: '' },
    icon: { type: String, value: '' },
    isLink: { type: Boolean, value: false },
    required: { type: Boolean, value: false },
    border: { type: Boolean, value: true },
    customClass: { type: String, value: '' },
  },
  methods: {
    onTap(e) {
      this.triggerEvent('tap', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} });
      this.triggerEvent('click', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} });
    },
  },
});
