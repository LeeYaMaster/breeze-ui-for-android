/**
 * 复选框组件
 * @typedef {Object} CheckboxProps
 * @property {boolean} [checked=false] 是否选中
 * @property {boolean} [disabled=false] 禁用
 * @property {string} [label=''] 标签
 * @property {boolean} [hideLabel=false] 隐藏标签，配合 bz-form-field 使用
 * @property {string} [color=''] 主题色类名，如 green、blue
 * @property {boolean} [round=false] 圆形
 * @property {string} [extraClass=''] 额外类名
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    checked: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    label: { type: String, value: '' },
    hideLabel: { type: Boolean, value: false },
    color: { type: String, value: '' },
    round: { type: Boolean, value: false },
    extraClass: { type: String, value: '' },
  },
  data: {
    checkboxClass: '',
  },
  observers: {
    'color, round': function () {
      this.updateCheckboxClass();
    },
  },
  lifetimes: {
    attached() {
      this.updateCheckboxClass();
    },
  },
  methods: {
    updateCheckboxClass() {
      const { color, round } = this.data;
      const classes = [];
      if (color) classes.push(color);
      if (round) classes.push('round');
      this.setData({ checkboxClass: classes.join(' ') });
    },

    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    onToggle() {
      if (this.data.disabled) return;
      const value = !this.data.checked;
      this.setData({ checked: value });
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('checkedChange', { value });
    },
  },
});
