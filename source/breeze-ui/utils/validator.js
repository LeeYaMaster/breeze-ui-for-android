/**
 * 表单校验工具
 * 供 bz-form / bz-form-field / bz-input 共用
 */

const PATTERNS = {
  phone: /^1[3-9]\d{9}$/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  chinese: /[\u4E00-\u9FA5]/,
};

/** 兼容 bz-input.check('regPhone') 等旧写法 */
const TYPE_ALIASES = {
  regPhone: 'phone',
  regEmail: 'email',
  regIdCard: 'idCard',
  regChinese: 'chinese',
  regRequire: 'required',
  require: 'required',
};

const DEFAULT_MESSAGES = {
  required: '此项不能为空',
  checked: '请勾选',
  phone: '请输入正确的手机号',
  email: '请输入正确的邮箱',
  idCard: '请输入正确的身份证号',
  chinese: '请输入中文',
  pattern: '格式不正确',
};

function toStringValue(value) {
  if (value === undefined || value === null) return '';
  return String(value);
}

function resolveType(type) {
  if (!type) return '';
  return TYPE_ALIASES[type] || type;
}

function normalizeRule(rule) {
  if (typeof rule === 'string') {
    const type = resolveType(rule);
    return {
      type,
      required: type === 'required',
      message: DEFAULT_MESSAGES[type] || DEFAULT_MESSAGES.pattern,
    };
  }
  if (rule && typeof rule === 'object') {
    return {
      ...rule,
      type: resolveType(rule.type),
    };
  }
  return rule;
}

function normalizeRules(rules) {
  if (!rules) return [];
  const list = Array.isArray(rules) ? rules : [rules];
  return list.map(normalizeRule).filter(Boolean);
}

function isEmptyValue(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === 'boolean') return value === false;
  if (Array.isArray(value)) return value.length === 0;
  return !/\S/.test(toStringValue(value));
}

function validateRule(value, rule) {
  const val = toStringValue(value);
  const normalized = normalizeRule(rule);
  const type = normalized.type;

  if (normalized.required || type === 'required') {
    if (isEmptyValue(value)) {
      return normalized.message || DEFAULT_MESSAGES.required;
    }
  }

  if (type === 'checked' && value !== true) {
    return normalized.message || DEFAULT_MESSAGES.checked;
  }

  if (Array.isArray(value)) {
    if (normalized.min !== undefined && value.length < normalized.min) {
      return normalized.message || `至少选择 ${normalized.min} 项`;
    }
    if (normalized.max !== undefined && value.length > normalized.max) {
      return normalized.message || `最多选择 ${normalized.max} 项`;
    }
    if (typeof normalized.validator === 'function') {
      const result = normalized.validator(value, normalized);
      if (result === true || result === undefined || result === '') return '';
      if (typeof result === 'string') return result;
      return normalized.message || DEFAULT_MESSAGES.pattern;
    }
    return '';
  }

  if (typeof value === 'boolean') {
    if (typeof normalized.validator === 'function') {
      const result = normalized.validator(value, normalized);
      if (result === true || result === undefined || result === '') return '';
      if (typeof result === 'string') return result;
      return normalized.message || DEFAULT_MESSAGES.pattern;
    }
    return '';
  }

  if (!val && !normalized.required && type !== 'required') {
    return '';
  }

  if (type && PATTERNS[type]) {
    if (!PATTERNS[type].test(val)) {
      return normalized.message || DEFAULT_MESSAGES[type] || DEFAULT_MESSAGES.pattern;
    }
  }

  if (normalized.pattern) {
    const pattern =
      normalized.pattern instanceof RegExp
        ? normalized.pattern
        : new RegExp(normalized.pattern);
    if (!pattern.test(val)) {
      return normalized.message || DEFAULT_MESSAGES.pattern;
    }
  }

  if (normalized.min !== undefined && val.length < normalized.min) {
    return normalized.message || `至少 ${normalized.min} 个字符`;
  }

  if (normalized.max !== undefined && val.length > normalized.max) {
    return normalized.message || `最多 ${normalized.max} 个字符`;
  }

  if (typeof normalized.validator === 'function') {
    const result = normalized.validator(val, normalized);
    if (result === true || result === undefined || result === '') return '';
    if (typeof result === 'string') return result;
    return normalized.message || DEFAULT_MESSAGES.pattern;
  }

  return '';
}

function validateField(value, rules) {
  const normalizedRules = normalizeRules(rules);
  if (!normalizedRules.length) {
    return { valid: true, message: '' };
  }

  for (let i = 0; i < normalizedRules.length; i++) {
    const message = validateRule(value, normalizedRules[i]);
    if (message) {
      return { valid: false, message };
    }
  }

  return { valid: true, message: '' };
}

module.exports = {
  PATTERNS,
  TYPE_ALIASES,
  DEFAULT_MESSAGES,
  normalizeRule,
  normalizeRules,
  validateRule,
  validateField,
};
