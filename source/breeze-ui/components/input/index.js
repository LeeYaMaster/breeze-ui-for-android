const { validateField, TYPE_ALIASES } = require('../../utils/validator');

/**
 * 输入框组件
 * @typedef {Object} InputProps
 * @property {boolean} [round=false] 圆角按钮
 * @property {string} [value=''] 当前值
 * @property {string} [placeholder=''] 占位符
 * @property {string} [id=''] 组件 id
 * @property {string} [label=''] 标签
 * @property {boolean} [hideLabel=false] 隐藏标签，配合 bz-form-field 使用
 * @property {boolean} [disabled=false] 禁用
 * @property {string} [extraClass=''] 额外类名
 * @property {boolean} [error=false] 错误态样式
 * @typedef {Object} InputMethods
 * @property {function(WechatMiniprogram.CustomEvent): void} setInput 设置输入值
 * @property {function(string): boolean|undefined} check 校验（type: regEmail|regPhone|regIdCard|regChinese|regRequire 或 phone|email 等）
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: '',
    },
    label: {
      type: String,
      value: '',
    },
    hideLabel: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    extraClass: {
      type: String,
      value: '',
    },
    error: {
      type: Boolean,
      value: false,
    },
  },

  data: {},

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    emitValueChange(value) {
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('valueChange', { value });
    },

    setInput(e) {
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
