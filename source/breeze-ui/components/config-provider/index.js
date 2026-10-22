const Config = require('../../utils/config');
const Theme = require('../../utils/theme');

/**
 * 轻量 ConfigProvider：局部主题 / 圆角 / 字号（CSS 变量作用于 slot 子树）
 * 已接入：button/tag(radius)、form-group(input/textarea/picker)、radio/checkbox-group(字号)、
 * list-menu/cell(字号/圆角)、card(圆角/字号)
 * @typedef {Object} ConfigProviderProps
 * @property {string} [theme=''] 主题 id，空则用 Theme.getThemeId()
 * @property {string} [radius=''] 圆角预设 sm|md|lg|xl 或 rpx
 * @property {string} [textSize=''] 字号预设 sm|md|lg|xl 或 rpx
 * @property {boolean} [useGlobalTheme=true] 未指定 theme 时是否读取 Theme.getThemeId()
 * @property {string} [customClass=''] 根节点额外 class
 * @typedef {Object} ConfigProviderMethods
 * @property {function(): Object} getConfig 获取当前配置
 */
Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    theme: { type: String, value: '' },
    radius: { type: String, value: '' },
    textSize: { type: String, value: '' },
    useGlobalTheme: { type: Boolean, value: true },
  },
  data: {
    configClass: '',
    configStyle: '',
  },
  observers: {
    'theme, radius, textSize, useGlobalTheme': function () {
      this.applyConfig();
    },
  },
  methods: {
    applyConfig() {
      const { theme, radius, textSize, useGlobalTheme } = this.properties;
      const own = Config.pickDefined({ theme, radius, textSize });
      const base = {};

      if (!own.theme && useGlobalTheme) {
        base.theme = Theme.getThemeId();
      }

      const merged = Config.mergeConfig(base, own);
      const configClass = Config.buildConfigClass(merged);
      const configStyle = Config.buildConfigStyle(merged);

      if (
        this._mergedConfig
        && this._mergedConfig.theme === merged.theme
        && this._mergedConfig.radius === merged.radius
        && this._mergedConfig.fontSize === merged.fontSize
        && this.data.configClass === configClass
        && this.data.configStyle === configStyle
      ) {
        return;
      }

      this._mergedConfig = merged;
      this.setData({ configClass, configStyle });
    },

    getConfig() {
      if (!this._mergedConfig) {
        this.applyConfig();
      }
      const { theme, radius, fontSize } = this._mergedConfig || {};
      return {
        theme,
        radius,
        fontSize,
        textSize: fontSize,
      };
    },
  },
});
