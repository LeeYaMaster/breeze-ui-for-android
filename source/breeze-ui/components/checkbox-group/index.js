/**
 * 复选框组组件
 * @typedef {Object} CheckboxGroupProps
 * @property {Array} [value=[]] 当前选中值数组
 * @property {Array} [options=[]] 选项 { label, value }
 * @property {boolean} [hideLabel=false] 配合 bz-form-field
 * @property {boolean} [block=false] 非 hideLabel 时用 form-group 纵向列表
 * @property {string} [color=''] 主题色 class
 * @property {boolean} [round=false] 圆形 class round
 * @property {boolean} [disabled=false] 禁用
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    value: { type: Array, value: [] },
    options: { type: Array, value: [] },
    hideLabel: { type: Boolean, value: false },
    block: { type: Boolean, value: false },
    color: { type: String, value: '' },
    round: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    extraClass: { type: String, value: '' },
  },
  data: {
    checkboxClass: '',
    checkedMap: {},
  },
  observers: {
    'color, round': function () {
      this.updateCheckboxClass();
    },
    value: function (value) {
      this.syncCheckedMap(value);
    },
  },
  lifetimes: {
    attached() {
      this.updateCheckboxClass();
      this.syncCheckedMap(this.data.value);
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

    syncCheckedMap(value) {
      const list = Array.isArray(value) ? value : [];
      const checkedMap = {};
      list.forEach((item) => {
        checkedMap[item] = true;
      });
      this.setData({ checkedMap });
    },

    onChange(e) {
      const value = e.detail.value || [];
      this.setData({ value });
      this.syncCheckedMap(value);
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('valueChange', { value });
    },
  },
});
