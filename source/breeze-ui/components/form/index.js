const { normalizeRules } = require('../../utils/validator');

/**
 * 表单容器组件
 * @typedef {Object} FormProps
 * @property {Object} [rules={}] 字段级校验规则，key 为 field name
 * @property {Object} [model] 表单数据对象，配合 model:model 双向绑定
 * @property {string} [validateTrigger='onSubmit'] 校验时机：onSubmit | onChange
 * @typedef {Object} FormMethods
 * @property {function(): Promise<Object>} validate 校验全部字段
 * @property {function(string): Promise<Object>} validateField 校验单个字段
 * @property {function(): Object} getFieldsValue 获取全部字段值
 * @property {function(Object): void} setFieldsValue 设置字段值
 * @property {function(Array=): void} resetFields 重置字段值与错误
 * @property {function(): Promise<Object>} submit 校验通过后触发 submit 事件
 * @property {function(string, *): void} updateModel 更新 model 字段
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  relations: {
    '../form-field/index': {
      type: 'child',
      linked(target) {
        this._fields = this._fields || [];
        if (!this._fields.includes(target)) {
          this._fields.push(target);
        }
      },
      unlinked(target) {
        this._fields = (this._fields || []).filter((field) => field !== target);
      },
    },
  },
  properties: {
    customClass: { type: String, value: '' },
    rules: {
      type: Object,
      value: {},
    },
    model: {
      type: Object,
      value: null,
    },
    validateTrigger: {
      type: String,
      value: 'onSubmit',
    },
  },
  data: {},
  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    getFields() {
      return this._fields || [];
    },

    getFieldRules(name) {
      const { rules = {} } = this.data;
      return normalizeRules(rules[name]);
    },

    updateModel(name, value) {
      if (!this.properties.model || !name) return;
      const model = {
        ...this.properties.model,
        [name]: value,
      };
      this.triggerEvent('modelChange', { value: model });
    },

    syncModelFromFields() {
      if (!this.properties.model) return;
      const model = {
        ...this.properties.model,
        ...this.getFieldsValue(),
      };
      this.triggerEvent('modelChange', { value: model });
    },

    getFieldsValue() {
      const values = {};
      this.getFields().forEach((field) => {
        const snapshot = field.getFieldSnapshot();
        if (snapshot.name) {
          values[snapshot.name] = snapshot.value;
        }
      });
      return values;
    },

    setFieldsValue(values = {}) {
      this.getFields().forEach((field) => {
        const snapshot = field.getFieldSnapshot();
        if (snapshot.name && Object.prototype.hasOwnProperty.call(values, snapshot.name)) {
          field.setFieldValue(values[snapshot.name]);
        }
      });
      this.syncModelFromFields();
    },

    resetFields(names) {
      const targetNames = Array.isArray(names) ? names : null;
      this.getFields().forEach((field) => {
        const snapshot = field.getFieldSnapshot();
        if (!targetNames || targetNames.includes(snapshot.name)) {
          field.resetField();
        }
      });
      this.syncModelFromFields();
    },

    validateField(name) {
      const field = this.getFields().find((item) => item.getFieldSnapshot().name === name);
      if (!field) {
        return Promise.resolve({
          valid: true,
          name,
          message: '',
          value: undefined,
        });
      }
      return field.validate();
    },

    validate() {
      const fields = this.getFields();
      return Promise.all(fields.map((field) => field.validate())).then((results) => {
        const errors = results.filter((item) => !item.valid);
        const values = {};
        results.forEach((item) => {
          if (item.name) {
            values[item.name] = item.value;
          }
        });
        return {
          valid: errors.length === 0,
          errors,
          values,
        };
      });
    },

    submit() {
      return this.validate().then((result) => {
        if (!result.valid) {
          this.triggerEvent('failed', result);
          return result;
        }
        this.triggerEvent('submit', { values: result.values });
        return result;
      });
    },
  },
});
