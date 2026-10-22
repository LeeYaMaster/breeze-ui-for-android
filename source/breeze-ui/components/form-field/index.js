const { normalizeRules, validateField } = require('../../utils/validator');

/**
 * 表单字段组件
 * @typedef {Object} FormFieldProps
 * @property {string} name 字段名，用于表单收集与 rules 匹配
 * @property {string} [label=''] 标签
 * @property {boolean} [required=false] 是否必填
 * @property {Array|string|Object} [rules=[]] 字段级规则，可覆盖 form.rules
 * @property {string|number|boolean} [value=''] 当前值
 * @property {string} [extraClass=''] 额外类名
 * @property {boolean} [alignStart=false] 标签顶对齐，适合 textarea
 * @property {string} [controlAlign='stretch'] 控件对齐：stretch | right
 * @property {null} [defaultValue] 重置时的默认值，布尔字段可设为 false
 * @typedef {Object} FormFieldMethods
 * @property {function(): Promise<Object>} validate 校验当前字段
 * @property {function(string|number|boolean): void} setFieldValue 设置字段值
 * @property {function(): void} resetField 重置字段
 * @property {function(): Object} getFieldSnapshot 获取 name / value 快照
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  relations: {
    '../form/index': {
      type: 'ancestor',
      linked(target) {
        this.form = target;
      },
      unlinked() {
        this.form = null;
      },
    },
  },
  properties: {
    customClass: { type: String, value: '' },
    name: { type: String, value: '' },
    label: { type: String, value: '' },
    required: { type: Boolean, value: false },
    rules: {
      type: null,
      value: [],
    },
    value: {
      type: null,
      value: '',
    },
    extraClass: { type: String, value: '' },
    alignStart: { type: Boolean, value: false },
    controlAlign: { type: String, value: 'stretch' },
    defaultValue: {
      type: null,
      value: undefined,
    },
  },
  data: {
    errorMessage: '',
  },
  methods: {
    getFieldSnapshot() {
      return {
        name: this.data.name,
        value: this.data.value,
      };
    },

    getEffectiveRules() {
      const fieldRules = normalizeRules(this.data.rules);
      if (fieldRules.length) {
        return fieldRules;
      }
      if (this.form && this.data.name) {
        return this.form.getFieldRules(this.data.name);
      }
      if (this.data.required) {
        return [{ required: true, message: '此项不能为空' }];
      }
      return [];
    },

    setFieldValue(value) {
      this.setData({
        value,
        errorMessage: '',
      });
    },

    resetField() {
      let resetValue;
      if (this.properties.defaultValue !== undefined) {
        resetValue = this.properties.defaultValue;
      } else if (Array.isArray(this.data.value)) {
        resetValue = [];
      } else if (typeof this.data.value === 'boolean') {
        resetValue = false;
      } else {
        resetValue = '';
      }
      this.setData({
        value: resetValue,
        errorMessage: '',
      });
    },

    validate() {
      const rules = this.getEffectiveRules();
      const result = validateField(this.data.value, rules);
      this.setData({
        errorMessage: result.valid ? '' : result.message,
      });
      return Promise.resolve({
        valid: result.valid,
        name: this.data.name,
        message: result.message,
        value: this.data.value,
      });
    },

    onValueChange(e) {
      const detail = e.detail || {};
      const value = detail.value !== undefined ? detail.value : detail;
      this.setData({
        value,
        errorMessage: '',
      });
      if (this.form && typeof this.form.updateModel === 'function') {
        this.form.updateModel(this.data.name, value);
      }
      this.triggerEvent('change', {
        name: this.data.name,
        value,
      });
      if (this.form && this.form.data.validateTrigger === 'onChange') {
        this.validate();
      }
    },
  },
});
