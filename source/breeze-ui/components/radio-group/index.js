/**
 * 单选组组件
 * @typedef {Object} RadioGroupProps
 * @property {string} [value=''] 当前选中值
 * @property {Array} [options=[]] 选项 { label, value }
 * @property {boolean} [hideLabel=false] 配合 bz-form-field
 * @property {boolean} [block=false] 非 hideLabel 时用 form-group 纵向列表
 * @property {boolean} [inline=true] hideLabel 时横向排列
 * @property {string} [color=''] 主题色 class
 * @property {boolean} [round=false] 圆形样式 class radio
 * @property {boolean} [disabled=false] 禁用
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    value: { type: String, value: '' },
    options: { type: Array, value: [] },
    hideLabel: { type: Boolean, value: false },
    block: { type: Boolean, value: false },
    inline: { type: Boolean, value: true },
    color: { type: String, value: '' },
    round: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    extraClass: { type: String, value: '' },
  },
  data: {
    radioClass: '',
  },
  observers: {
    'color, round': function () {
      this.updateRadioClass();
    },
  },
  lifetimes: {
    attached() {
      this.updateRadioClass();
    },
  },
  methods: {
    updateRadioClass() {
      const { color, round } = this.data;
      const classes = [];
      if (color) classes.push(color);
      if (round) classes.push('radio');
      this.setData({ radioClass: classes.join(' ') });
    },

    onChange(e) {
      const value = e.detail.value;
      this.setData({ value });
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('valueChange', { value });
    },
  },
});
