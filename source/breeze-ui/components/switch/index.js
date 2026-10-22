/**
 * 开关组件
 * @typedef {Object} SwitchProps
 * @property {boolean} [checked=false] 是否选中
 * @property {boolean} [disabled=false] 禁用
 * @property {string} [label=''] 标签
 * @property {boolean} [hideLabel=false] 隐藏标签，配合 bz-form-field 使用
 * @property {string} [color=''] 主题色类名，如 green、red
 * @property {boolean} [sm=false] 小尺寸
 * @property {boolean} [radius=false] 方角
 * @property {boolean} [sex=false] 性别切换样式
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
    sm: { type: Boolean, value: false },
    radius: { type: Boolean, value: false },
    sex: { type: Boolean, value: false },
    extraClass: { type: String, value: '' },
  },
  data: {
    switchClass: '',
  },
  observers: {
    'color, sm, radius, sex': function () {
      this.updateSwitchClass();
    },
  },
  lifetimes: {
    attached() {
      this.updateSwitchClass();
    },
  },
  methods: {
    updateSwitchClass() {
      const { color, sm, radius, sex } = this.data;
      const classes = [];
      if (color) classes.push(color);
      if (sm) classes.push('sm');
      if (radius) classes.push('radius');
      if (sex) classes.push('switch-sex');
      this.setData({ switchClass: classes.join(' ') });
    },

    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    onChange(e) {
      const value = !!e.detail.value;
      this.setData({ checked: value });
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('checkedChange', { value });
    },
  },
});
