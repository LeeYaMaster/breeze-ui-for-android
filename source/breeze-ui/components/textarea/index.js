const { validateField, TYPE_ALIASES } = require('../../utils/validator');

/**
 * 多行输入框组件
 * @typedef {Object} TextareaProps
 * @property {string} [value=''] 当前值
 * @property {string} [placeholder=''] 占位符
 * @property {string} [label=''] 标签
 * @property {boolean} [hideLabel=false] 隐藏标签，配合 bz-form-field 使用
 * @property {boolean} [alignStart=false] 标签顶对齐
 * @property {boolean} [disabled=false] 禁用
 * @property {number} [maxlength=-1] 最大长度，-1 不限制
 * @property {boolean} [autoHeight=false] 自动增高
 * @property {string} [extraClass=''] 额外类名
 * @property {boolean} [error=false] 错误态样式
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    value: { type: String, value: '' },
    placeholder: { type: String, value: '' },
    label: { type: String, value: '' },
    hideLabel: { type: Boolean, value: false },
    alignStart: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    maxlength: { type: Number, value: -1 },
    autoHeight: { type: Boolean, value: false },
    extraClass: { type: String, value: '' },
    error: { type: Boolean, value: false },
  },
  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    emitValueChange(value) {
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('valueChange', { value });
    },

    onInput(e) {
      const { value = '' } = e.detail;
      this.setData({ value });
      this.emitValueChange(value);
    },

    check(type) {
      const alias = TYPE_ALIASES[type] || type;
      const result = validateField(this.data.value, [{ type: alias, required: alias === 'required' }]);
      return result.valid;
    },
  },
});
