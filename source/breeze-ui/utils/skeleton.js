/**
 * 骨架屏模版预设
 * @typedef {Object} SkeletonTemplate
 * @property {number} [column] 骨架条数
 * @property {string[]} [columnWidth] 各条宽度
 * @property {string} [endHeight] 最后一条高度
 * @property {boolean} [avatar] 是否显示头像占位
 */

/** @type {Record<string, SkeletonTemplate>} */
const SKELETON_TEMPLATES = {
  /** 案例类卡片：大图 + 底部信息 */
  case: {
    column: 4,
    columnWidth: ['100%', '100%', '80%', '60%'],
    endHeight: '160rpx',
  },
  /** 文章类卡片：头像 + 标题 + 摘要 + 缩略图 */
  article: {
    avatar: true,
    column: 4,
    columnWidth: ['60%', '90%', '70%', '70%'],
    endHeight: '120rpx',
  },
  /** 段落文本 */
  paragraph: {
    column: 3,
    columnWidth: ['100%', '92%', '68%'],
  },
  /** 列表行：头像 + 两行 */
  list: {
    avatar: true,
    column: 2,
    columnWidth: ['50%', '75%'],
  },
  /** 菜单 Cell */
  menu: {
    column: 1,
    columnWidth: ['70%'],
  },
};

function getTemplate(name) {
  if (!name) return null;
  const key = String(name).trim();
  return SKELETON_TEMPLATES[key] || null;
}

/**
 * 合并 template 预设与显式 props，显式值优先
 * @param {Object} options
 * @param {string} [options.template]
 * @param {number} [options.column]
 * @param {string[]} [options.columnWidth]
 * @param {string} [options.endHeight]
 * @param {boolean|null} [options.avatar]
 */
function resolveConfig(options) {
  const input = options || {};
  const preset = getTemplate(input.template) || {};

  const column = input.column > 0 ? input.column : (preset.column || 0);
  const columnWidth = input.columnWidth && input.columnWidth.length
    ? input.columnWidth
    : (preset.columnWidth || []);
  const endHeight = input.endHeight || preset.endHeight || '';

  let avatar = false;
  if (input.avatar === true) {
    avatar = true;
  } else if (input.avatar === false) {
    avatar = false;
  } else {
    avatar = !!preset.avatar;
  }

  return {
    template: input.template || '',
    column,
    columnWidth,
    endHeight,
    avatar,
  };
}

function listTemplates() {
  return Object.keys(SKELETON_TEMPLATES);
}

module.exports = {
  SKELETON_TEMPLATES,
  getTemplate,
  resolveConfig,
  listTemplates,
};
