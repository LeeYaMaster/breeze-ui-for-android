/**
 * 单滑块（封装原生 slider）
 * @property {string} [label] 左侧标题
 * @property {number} [min=0]
 * @property {number} [max=100]
 * @property {number} [step=1]
 * @property {number} [value=0]
 * @property {boolean} [disabled=false]
 * @property {boolean} [showValue=false]
 * @property {string} [activeColor=#39b54a]
 * @property {string} [backgroundColor=#e9e9e9]
 * @property {number} [blockSize=28]
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    label: { type: String, value: '' },
    min: { type: Number, value: 0 },
    max: { type: Number, value: 100 },
    step: { type: Number, value: 1 },
    value: { type: Number, value: 0 },
    disabled: { type: Boolean, value: false },
    showValue: { type: Boolean, value: false },
    activeColor: { type: String, value: '#5b6cff' },
    backgroundColor: { type: String, value: '#e9e9e9' },
    blockSize: { type: Number, value: 28 },
    customClass: { type: String, value: '' },
  },
  methods: {
    onChange(e) {
      const value = e.detail.value;
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('input', { value });
    },
    onChanging(e) {
      this.triggerEvent('changing', { value: e.detail.value });
    },
    onTap(e) {
      this.triggerEvent('tap', { ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} });
    },
  },
});
