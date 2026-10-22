/**
 * ConfigProvider 配置合并与 CSS 变量构建
 */

const RADIUS_PRESETS = {
  sm: '4rpx',
  md: '6rpx',
  lg: '12rpx',
  xl: '24rpx',
};

const FONT_SIZE_PRESETS = {
  sm: '24rpx',
  md: '28rpx',
  lg: '32rpx',
  xl: '36rpx',
};

const DEFAULT_CONFIG = {
  theme: '',
  radius: '',
  fontSize: '',
};

const STORAGE_DEMO_KEY = 'demoConfigProvider';

const DEFAULT_DEMO_CONFIG = {
  radius: 'md',
  textSize: 'md',
};

const DEMO_SIZE_KEYS = ['sm', 'md', 'lg', 'xl'];

function normalizeDemoSize(value, fallback) {
  const key = String(value || '').trim();
  return DEMO_SIZE_KEYS.includes(key) ? key : fallback;
}

function getDemoConfig() {
  try {
    const raw = wx.getStorageSync(STORAGE_DEMO_KEY);
    if (raw && typeof raw === 'object') {
      return {
        radius: normalizeDemoSize(raw.radius, DEFAULT_DEMO_CONFIG.radius),
        textSize: normalizeDemoSize(raw.textSize, DEFAULT_DEMO_CONFIG.textSize),
      };
    }
  } catch (e) {
    /* ignore */
  }
  return { ...DEFAULT_DEMO_CONFIG };
}

function setDemoConfig(partial) {
  const next = {
    ...getDemoConfig(),
    ...(partial || {}),
  };
  next.radius = normalizeDemoSize(next.radius, DEFAULT_DEMO_CONFIG.radius);
  next.textSize = normalizeDemoSize(next.textSize, DEFAULT_DEMO_CONFIG.textSize);

  try {
    wx.setStorageSync(STORAGE_DEMO_KEY, next);
  } catch (e) {
    console.warn('[Breeze UI] ConfigProvider 演示配置写入失败', e);
  }

  const app = getApp();
  if (app && app.globalData) {
    app.globalData.demoConfigProvider = next;
  }

  return next;
}

function resetDemoConfig() {
  try {
    wx.removeStorageSync(STORAGE_DEMO_KEY);
  } catch (e) {
    /* ignore */
  }

  const next = { ...DEFAULT_DEMO_CONFIG };
  const app = getApp();
  if (app && app.globalData) {
    app.globalData.demoConfigProvider = next;
  }

  return next;
}

function normalizeSize(value, presets, fallback) {
  if (!value) return fallback || '';
  const key = String(value).trim();
  return presets[key] || key;
}

function pickDefined(source) {
  if (!source || typeof source !== 'object') return {};
  const picked = {};
  if (source.theme) picked.theme = source.theme;
  if (source.radius) picked.radius = source.radius;
  if (source.textSize) picked.fontSize = source.textSize;
  return picked;
}

function mergeConfig(base, override) {
  const merged = { ...DEFAULT_CONFIG, ...(base || {}) };
  const next = override || {};

  if (next.theme) merged.theme = next.theme;
  if (next.radius) merged.radius = next.radius;
  if (next.fontSize) merged.fontSize = next.fontSize;

  return merged;
}

function buildConfigClass(config) {
  if (!config || !config.theme) return '';
  return config.theme;
}

function buildConfigStyle(config) {
  if (!config) return '';

  const radius = config.radius
    ? normalizeSize(String(config.radius).trim(), RADIUS_PRESETS, '')
    : '';
  const fontSize = normalizeSize(config.fontSize, FONT_SIZE_PRESETS, '');
  const parts = [];

  if (radius) {
    parts.push(`--bz-radius:${radius}`);
    parts.push(`--bz-radius-sm:${radius}`);
    parts.push(`--bz-radius-md:${radius}`);
    parts.push(`--bz-radius-lg:${radius}`);
    parts.push(`--bz-radius-xl:${radius}`);
  }
  if (fontSize) {
    parts.push(`--bz-font-size:${fontSize}`);
    parts.push(`--bz-font-size-sm:${fontSize}`);
    parts.push(`--bz-font-size-md:${fontSize}`);
    parts.push(`--bz-font-size-lg:${fontSize}`);
    parts.push(`font-size:${fontSize}`);
  }

  return parts.join(';');
}

module.exports = {
  RADIUS_PRESETS,
  FONT_SIZE_PRESETS,
  DEFAULT_CONFIG,
  STORAGE_DEMO_KEY,
  DEFAULT_DEMO_CONFIG,
  DEMO_SIZE_KEYS,
  normalizeSize,
  pickDefined,
  mergeConfig,
  buildConfigClass,
  buildConfigStyle,
  getDemoConfig,
  setDemoConfig,
  resetDemoConfig,
};
