/* Breeze docs gallery — register routes & page bodies (loaded before app.js) */
window.registerBreezeGallery = function (registry, ctx) {
  var b = ctx.banner;
  var api = ctx.apiTable;
  var demo = ctx.demoBlock;

  registry.setNav([
    {
      id: "start",
      title: "开始",
      items: [{ route: "home", label: "介绍" }, { route: "theme", label: "主题变体" }],
    },
    {
      id: "general",
      title: "通用",
      items: [{ route: "button", label: "Button 按钮" }],
    },
    {
      id: "layout",
      title: "布局",
      items: [
        { route: "page", label: "BzPage / TitleBar" },
        { route: "flex-grid", label: "Flex / Grid" },
        { route: "custom-nav", label: "CustomNav" },
      ],
    },
    {
      id: "display",
      title: "数据展示",
      items: [
        { route: "cell", label: "Cell 单元格" },
        { route: "tag", label: "Tag 标签" },
        { route: "card", label: "Card 卡片" },
        { route: "avatar", label: "Avatar 头像" },
        { route: "progress", label: "Progress 进度" },
        { route: "loading", label: "Loading 加载" },
        { route: "steps", label: "Steps 步骤条" },
        { route: "timeline", label: "Timeline 时间轴" },
        { route: "empty", label: "Empty 空状态" },
        { route: "table", label: "Table 表格" },
      ],
    },
    {
      id: "nav",
      title: "导航",
      items: [
        { route: "tabs", label: "Tabs 标签页" },
        { route: "segment", label: "Segment 分段" },
        { route: "list-menu", label: "ListMenu 菜单" },
      ],
    },
    {
      id: "form",
      title: "表单",
      items: [
        { route: "form", label: "Form / FormField" },
        { route: "input", label: "Input 输入框" },
        { route: "textarea", label: "Textarea 多行" },
        { route: "radio", label: "RadioGroup 单选" },
        { route: "checkbox", label: "Checkbox 复选" },
        { route: "checkbox-group", label: "CheckboxGroup" },
        { route: "switch", label: "Switch 开关" },
        { route: "rate", label: "Rate 评分" },
        { route: "slider", label: "Slider 滑块" },
        { route: "double-slider", label: "DoubleSlider 区间" },
        { route: "choose", label: "Choose 胶囊选择" },
        { route: "picker", label: "Picker 选择器" },
        { route: "calendar", label: "Calendar 日历" },
        { route: "color-picker", label: "ColorPicker 取色" },
        { route: "upload", label: "Upload 上传格" },
      ],
    },
    {
      id: "feedback",
      title: "反馈",
      items: [
        { route: "modal", label: "Modal 对话框" },
        { route: "skeleton", label: "Skeleton 骨架" },
        { route: "state-box", label: "StateBox 状态盒" },
        { route: "load-more", label: "LoadMore 加载更多" },
      ],
    },
    {
      id: "extended",
      title: "扩展",
      items: [
        { route: "pull-refresh", label: "PullRefresh 下拉刷新" },
        { route: "waterfall", label: "Waterfall 瀑布流" },
        { route: "sticky", label: "Sticky 吸顶" },
        { route: "tooltip", label: "Tooltip 提示" },
      ],
    },
    {
      id: "motion",
      title: "动效",
      items: [
        { route: "bessel", label: "Bessel 底部点赞" },
        { route: "full-like", label: "FullLike 全屏点赞" },
      ],
    },
    {
      id: "scenarios",
      title: "场景",
      items: [
        { route: "barrage", label: "Barrage 弹幕" },
        { route: "emoji", label: "Emoji 表情" },
        { route: "admin-table", label: "AdminTable 管理表" },
        { route: "list-grid", label: "ListGrid 宫格" },
        { route: "list-page", label: "ListPage 列表页" },
        { route: "list-message", label: "ListMessage 聊天气泡" },
      ],
    },
  ]);

  var P = registry.pages;

  P.theme = {
    title: "主题变体 Theme",
    lead: "通过 BzConfigProvider 或 BreezeTheme 切换主题；对应小程序 theme-wrap.theme-*。",
    render: function () {
      return (
        b() +
        demo(
          "主题切换",
          "点击色块切换整站品牌色（模拟 BzConfigProvider(theme = …)）。",
          '<div class="theme-swatches" id="themeSwatches"></div><div style="margin-top:16px" class="btn-row"><button type="button" class="bz-btn bz-btn--primary pulse" data-press>主色按钮</button><span class="tag tag--primary">标签</span></div>',
          "BzConfigProvider · BreezeThemeVariant"
        ) +
        api([
          { name: "theme", type: "BreezeThemeVariant?", default: "null", desc: "局部主题变体：Default / Blue / Purple / Orange / Red / Cyan" },
          { name: "radius", type: "BreezeRadius?", default: "null", desc: "局部圆角令牌" },
          { name: "fontScale", type: "Float", default: "当前 Local", desc: "字号缩放（LocalBreezeFontScale）" },
        ])
      );
    },
    init: ctx.initThemePage,
  };

  P.button = {
    title: "Button 按钮",
    lead: "对应小程序 bz-button。按压缩放约 0.92；主 CTA 可开启 pulseHint 呼吸动效。",
    render: function () {
      return (
        b() +
        demo(
          "类型与尺寸",
          "渐变主按钮、线框次要、幽灵；Sm / Md / Lg。",
          '<div class="btn-row">' +
            '<button type="button" class="bz-btn bz-btn--primary bz-btn--sm" data-press>小</button>' +
            '<button type="button" class="bz-btn bz-btn--primary" data-press>主要</button>' +
            '<button type="button" class="bz-btn bz-btn--primary bz-btn--lg" data-press>大</button>' +
            '<button type="button" class="bz-btn bz-btn--secondary" data-press>次要</button>' +
            '<button type="button" class="bz-btn bz-btn--ghost" data-press>幽灵</button></div>',
          "BzButton"
        ) +
        demo(
          "按压与 pulseHint",
          "pointer 按下缩放；pulseHint 主按钮空闲呼吸。",
          '<div class="btn-row"><button type="button" class="bz-btn bz-btn--primary pulse" data-press>主按钮（pulseHint）</button></div>' +
            '<button type="button" class="bz-btn bz-btn--primary bz-btn--block pulse" data-press>块级 CTA</button>',
          "BzButton(pulseHint = true, block = true)"
        ) +
        demo(
          "加载与禁用",
          "loading 显示指示器；enabled = false 不可点。",
          '<div class="btn-row">' +
            '<button type="button" class="bz-btn bz-btn--primary bz-btn--loading" disabled>加载中</button>' +
            '<button type="button" class="bz-btn bz-btn--primary" disabled>已禁用</button>' +
            '<button type="button" class="bz-btn bz-btn--primary bz-btn--round" data-press>圆角 round</button></div>',
          "BzButton(loading, enabled, round)"
        ) +
        api([
          { name: "text", type: "String?", default: "null", desc: "按钮文案" },
          { name: "onClick", type: "() -> Unit", default: "—", desc: "点击回调" },
          { name: "enabled", type: "Boolean", default: "true", desc: "是否可点击" },
          { name: "loading", type: "Boolean", default: "false", desc: "加载态（显示进度圈）" },
          { name: "block", type: "Boolean", default: "false", desc: "是否撑满宽度" },
          { name: "round", type: "Boolean", default: "false", desc: "胶囊圆角" },
          { name: "size", type: "BzButtonSize", default: "Md", desc: "Sm / Md / Lg" },
          { name: "pulseHint", type: "Boolean", default: "false", desc: "主按钮空闲呼吸动效（CTA）" },
          { name: "useTheme", type: "Boolean", default: "true", desc: "使用主题渐变/主色" },
        ])
      );
    },
    init: ctx.bindPressButtons,
  };

  P.page = {
    title: "BzPage / TitleBar",
    lead: "BzPage 挂载 Toast / Modal / ActionSheet Overlay；BzTitleBar 为顶栏标题与返回。",
    render: function () {
      return (
        b() +
        demo(
          "渐变顶栏",
          "useGradient = true 时使用品牌渐变。",
          '<div class="title-bar-demo"><button type="button" class="title-bar-demo__back" aria-label="返回">‹</button><span>设置</span><span class="title-bar-demo__actions">完成</span></div>',
          "BzTitleBar(useGradient = true, showBack, actions)"
        ) +
        demo(
          "页面布局",
          "BzPage + BzTitleBar + 内容区示意。",
          '<div class="page-shell-demo">' +
            '<div class="title-bar-demo"><button type="button" class="title-bar-demo__back">‹</button><span>Breeze UI</span></div>' +
            '<div class="page-shell-demo__body">页面内容区域（列表、表单等）</div></div>',
          "BzPage { BzTitleBar(...) { … } }"
        ) +
        api([
          { name: "content", type: "@Composable", default: "—", desc: "BzPage 子内容" },
          { name: "title", type: "String", default: "—", desc: "BzTitleBar 标题" },
          { name: "showBack", type: "Boolean", default: "false", desc: "是否显示返回" },
          { name: "onBack", type: "(() -> Unit)?", default: "null", desc: "返回回调" },
          { name: "useGradient", type: "Boolean", default: "false", desc: "渐变背景" },
          { name: "actions", type: "@Composable?", default: "null", desc: "右侧操作区" },
        ])
      );
    },
    init: ctx.bindPressButtons,
  };

  P["title-bar"] = P.page;

  P["flex-grid"] = {
    title: "Flex / Grid 布局",
    lead: "BzFlex 横向 Flex；BzGrid 宫格；对应小程序 bz-flex / bz-grid。",
    render: function () {
      return (
        b() +
        demo(
          "BzFlex",
          "justify / align 控制主轴与交叉轴；子项可用 BzFlexItem(weight)。",
          '<div class="bz-flex-demo"><span class="tag tag--primary">标签 A</span><span class="tag tag--outline">标签 B</span><button type="button" class="bz-btn bz-btn--ghost bz-btn--sm" data-press>操作</button></div>',
          "BzFlex(justify, align) { BzFlexItem(weight) }"
        ) +
        demo(
          "BzGrid",
          "columns 列数宫格。",
          '<div class="bz-grid-demo">' +
            ["首页", "分类", "购物车", "我的"]
              .map(function (t) {
                return '<div class="bz-grid-demo__item"><span class="bz-grid-demo__icon">◆</span>' + t + "</div>";
              })
              .join("") +
            "</div>",
          "BzGrid(columns, items)"
        ) +
        api([
          { name: "justify", type: "Arrangement.Horizontal", default: "Start", desc: "BzFlex 主轴对齐" },
          { name: "align", type: "Alignment.Vertical", default: "CenterVertically", desc: "BzFlex 交叉轴" },
          { name: "weight", type: "Float", default: "—", desc: "BzFlexItem 权重" },
          { name: "columns", type: "Int", default: "—", desc: "BzGrid 列数" },
        ])
      );
    },
    init: ctx.initFlexGrid,
  };

  P["custom-nav"] = {
    title: "CustomNav / CustomNavPro",
    lead: "自定义导航页：BzCustomNav 标题栏 + 内容；BzCustomNavPro 带副标题与操作区。",
    render: function () {
      return (
        b() +
        demo(
          "BzCustomNav",
          "与 TitleBar 类似的页面壳。",
          '<div class="page-shell-demo" style="max-width:380px">' +
            '<div class="title-bar-demo"><button type="button" class="title-bar-demo__back">‹</button><span>个人中心</span></div>' +
            '<div class="page-shell-demo__body">CustomNav 内容 slot</div></div>',
          "BzCustomNav(title, onBack, useGradient, content)"
        ) +
        demo(
          "BzCustomNavPro",
          "渐变头 + 主副标题。",
          '<div class="custom-nav-pro"><div class="custom-nav-pro__head"><button type="button" class="title-bar-demo__back">‹</button>' +
            '<div><strong>数据看板</strong><div class="custom-nav-pro__sub">本周概览</div></div>' +
            '<span class="title-bar-demo__actions">导出</span></div>' +
            '<div class="page-shell-demo__body">Pro 内容区</div></div>',
          "BzCustomNavPro(title, subtitle, onBack, actions)"
        ) +
        api([
          { name: "title", type: "String", default: "—", desc: "主标题" },
          { name: "subtitle", type: "String?", default: "null", desc: "CustomNavPro 副标题" },
          { name: "onBack", type: "(() -> Unit)?", default: "null", desc: "返回" },
          { name: "useGradient", type: "Boolean", default: "false", desc: "渐变头图" },
          { name: "actions", type: "@Composable?", default: "null", desc: "右侧操作" },
        ])
      );
    },
    init: ctx.bindPressButtons,
  };

  P.cell = {
    title: "Cell 列表单元格",
    lead: "BzCell 列表行：标题、副标题、右侧 value 与箭头。",
    render: function () {
      return (
        b() +
        demo(
          "基础用法",
          "点击单元格有反馈。",
          '<div class="cell" data-cell><div><div class="cell-label">账号与安全</div><div class="cell-sub">管理登录方式</div></div><span class="cell-value">›</span></div>' +
            '<div class="cell" data-cell><div class="cell-label">消息通知</div><span class="cell-value">已开启 ›</span></div>',
          "BzCell(title, subtitle, value, showArrow, onClick)"
        ) +
        api([
          { name: "title", type: "String", default: "—", desc: "主标题" },
          { name: "subtitle", type: "String?", default: "null", desc: "副标题" },
          { name: "value", type: "String?", default: "null", desc: "右侧文案" },
          { name: "showArrow", type: "Boolean", default: "false", desc: "显示 ›" },
          { name: "leading", type: "@Composable?", default: "null", desc: "左侧插槽" },
          { name: "onClick", type: "(() -> Unit)?", default: "null", desc: "点击" },
        ])
      );
    },
    init: ctx.initCellTagCard,
  };

  P.tag = {
    title: "Tag 标签",
    lead: "BzTag 胶囊标签，colorName 与 light 控制配色。",
    render: function () {
      return (
        b() +
        demo(
          "样式",
          "可点击 Tag。",
          '<div class="tags"><span class="tag tag--primary" data-tag>默认 light</span><span class="tag tag--solid" data-tag>主题实心</span><span class="tag tag--outline" data-tag>描边</span></div>',
          "BzTag(text, colorName, light, onClick)"
        ) +
        api([
          { name: "text", type: "String", default: "—", desc: "文案" },
          { name: "colorName", type: "String", default: "\"theme\"", desc: "颜色名" },
          { name: "light", type: "Boolean", default: "false", desc: "浅色底" },
          { name: "onClick", type: "(() -> Unit)?", default: "null", desc: "点击" },
        ])
      );
    },
    init: ctx.initCellTagCard,
  };

  P.card = {
    title: "Card 卡片",
    lead: "BzCard 圆角白底信息卡片，可选 title 与 onClick。",
    render: function () {
      return (
        b() +
        demo("信息卡片", "点击卡片触发 onClick。", '<div class="card" id="demoCard"><h3>本周概览</h3><p>圆角白底卡片，贴近 Breeze 扁平风格。</p></div>', "BzCard(title, onClick, content)") +
        api([
          { name: "title", type: "String?", default: "null", desc: "卡片标题" },
          { name: "onClick", type: "(() -> Unit)?", default: "null", desc: "整卡点击" },
          { name: "content", type: "@Composable", default: "—", desc: "卡片内容" },
        ])
      );
    },
    init: ctx.initCellTagCard,
  };

  P["cell-tag-card"] = {
    title: "Cell / Tag / Card（合集）",
    lead: "旧版合集路由，建议使用左侧拆分后的独立页面。",
    render: P.cell.render,
    init: ctx.initCellTagCard,
  };

  P.avatar = {
    title: "Avatar 头像",
    lead: "BzAvatar 圆形头像；BzAvatarGroup 叠放头像组。",
    render: function () {
      return (
        b() +
        demo(
          "尺寸与文字",
          "label 显示首字；showAttentionPulse 呼吸圈。",
          '<div class="avatar-row"><span class="bz-avatar bz-avatar--sm">李</span><span class="bz-avatar">B</span><span class="bz-avatar bz-avatar--lg bz-avatar--pulse">★</span></div>',
          "BzAvatar(label, size, showAttentionPulse)"
        ) +
        demo(
          "AvatarGroup",
          "overlap 叠放。",
          '<div class="avatar-group"><span class="bz-avatar bz-avatar--sm">A</span><span class="bz-avatar bz-avatar--sm">B</span><span class="bz-avatar bz-avatar--sm">C</span></div>',
          "BzAvatarGroup / BzAvatarGroupItem"
        ) +
        api([
          { name: "label", type: "String?", default: "null", desc: "文字头像" },
          { name: "size", type: "Dp", default: "40.dp", desc: "直径" },
          { name: "showAttentionPulse", type: "Boolean", default: "false", desc: "关注脉冲" },
          { name: "overlap", type: "Dp", default: "—", desc: "AvatarGroup 重叠量" },
        ])
      );
    },
    init: ctx.initAvatar,
  };

  P.progress = {
    title: "Progress 进度条",
    lead: "确定进度使用 springSmooth 补间；indeterminate 为不确定态；circular 为圆形。",
    render: function () {
      return (
        b() +
        demo(
          "确定进度",
          "点击按钮增减进度（0~1）。",
          '<div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>' +
            '<div class="btn-row" style="margin-top:10px">' +
            '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm" id="progressSub">-20%</button>' +
            '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm" id="progressAdd">+20%</button>' +
            '<span id="progressLabel" style="font-size:13px;color:var(--text-muted)">35%</span></div>',
          "BzProgress(progress)"
        ) +
        demo(
          "不确定态",
          "线性 shimmer 与圆形转圈。",
          '<div class="progress-indeterminate"></div><div class="spinner-wrap" style="margin-top:14px"><div class="spinner spinner--lg"></div><span style="font-size:13px;color:var(--text-muted)">indeterminate + circular</span></div>',
          "BzProgress(indeterminate = true, circular)"
        ) +
        api([
          { name: "progress", type: "Float", default: "—", desc: "0f~1f" },
          { name: "indeterminate", type: "Boolean", default: "false", desc: "不确定加载" },
          { name: "circular", type: "Boolean", default: "false", desc: "圆形" },
          { name: "color", type: "Color", default: "primary", desc: "颜色" },
        ])
      );
    },
    init: ctx.initProgress,
  };

  P.loading = {
    title: "Loading 加载",
    lead: "BzLoading 加载指示，可带文案。",
    render: function () {
      return (
        b() +
        demo("指示器", "size 控制尺寸。", '<div class="spinner-wrap"><div class="spinner spinner--lg"></div><span>加载中…</span></div>', "BzLoading(text, size)") +
        api([
          { name: "text", type: "String?", default: "null", desc: "说明文案" },
          { name: "size", type: "Dp", default: "—", desc: "指示器尺寸" },
        ])
      );
    },
  };

  P.steps = {
    title: "Steps 步骤条",
    lead: "BzSteps 展示流程进度；BzStep 为步骤数据。",
    render: function () {
      return (
        b() +
        demo(
          "横向步骤",
          "current 为当前步骤下标。",
          '<div class="bz-steps" id="stepsDemo">' +
            '<div class="bz-step done"><span class="bz-step__dot">1</span><span>提交</span></div>' +
            '<div class="bz-step active"><span class="bz-step__dot">2</span><span>审核</span></div>' +
            '<div class="bz-step"><span class="bz-step__dot">3</span><span>完成</span></div></div>' +
            '<div class="btn-row" style="margin-top:12px">' +
            '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm" data-step-go="0" data-press>步骤 1</button>' +
            '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm" data-step-go="1" data-press>步骤 2</button>' +
            '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm" data-step-go="2" data-press>步骤 3</button></div>',
          "BzSteps(steps, current)"
        ) +
        api([
          { name: "steps", type: "List<BzStep>", default: "—", desc: "步骤列表" },
          { name: "current", type: "Int", default: "0", desc: "当前步骤" },
          { name: "title", type: "String", default: "—", desc: "BzStep 标题" },
          { name: "description", type: "String?", default: "null", desc: "BzStep 描述" },
        ])
      );
    },
    init: ctx.initSteps,
  };

  P.timeline = {
    title: "Timeline 时间轴",
    lead: "BzTimeline 按时间展示节点列表。",
    render: function () {
      return (
        b() +
        demo(
          "节点",
          "entries: List<BzTimelineEntry>。",
          '<ul class="bz-timeline"><li><strong>创建订单</strong><span class="bz-timeline__time">10:00</span><p>用户提交</p></li>' +
            '<li><strong>已发货</strong><span class="bz-timeline__time">14:20</span><p>快递揽收</p></li></ul>',
          "BzTimeline(entries)"
        ) +
        api([
          { name: "title", type: "String", default: "—", desc: "节点标题" },
          { name: "time", type: "String", default: "—", desc: "时间文案" },
          { name: "content", type: "String?", default: "null", desc: "补充说明" },
        ])
      );
    },
    init: ctx.initTimeline,
  };

  P.empty = {
    title: "Empty 空状态",
    lead: "BzEmpty 无数据占位，可嵌套 action 按钮。",
    render: function () {
      return (
        b() +
        demo(
          "默认空态",
          "title / description / action。",
          '<div class="bz-empty"><span class="bz-empty__icon">📭</span><p><strong>暂无订单</strong></p><p class="muted">去逛逛精选好物吧</p>' +
            '<button type="button" class="bz-btn bz-btn--primary bz-btn--sm" style="margin-top:12px" data-press>去首页</button></div>',
          "BzEmpty(title, description, action)"
        ) +
        api([
          { name: "title", type: "String", default: "\"暂无数据\"", desc: "主文案" },
          { name: "description", type: "String?", default: "null", desc: "副文案" },
          { name: "action", type: "@Composable?", default: "null", desc: "底部操作" },
        ])
      );
    },
    init: ctx.initEmpty,
  };

  P.table = {
    title: "Table 轻量表格",
    lead: "BzTable + BzTableColumn 简单表格。",
    render: function () {
      return (
        b() +
        demo(
          "数据表",
          "columns 定义列；rows 为 Map 行数据。",
          '<table class="bz-table"><thead><tr><th>姓名</th><th>角色</th><th>状态</th></tr></thead>' +
            '<tbody><tr><td>张三</td><td>管理员</td><td>正常</td></tr><tr><td>李四</td><td>编辑</td><td>停用</td></tr></tbody></table>',
          "BzTable(columns, rows)"
        ) +
        api([
          { name: "key", type: "String", default: "—", desc: "BzTableColumn 字段键" },
          { name: "title", type: "String", default: "—", desc: "列标题" },
          { name: "weight", type: "Float", default: "1f", desc: "列宽权重" },
        ])
      );
    },
  };

  P.tabs = {
    title: "Tabs 标签页",
    lead: "BzTabs 顶部 Tab + 底部指示条弹簧动画。",
    render: function () {
      return (
        b() +
        demo(
          "切换",
          "onSelected(index)。",
          '<div class="bz-tabs" id="bzTabs"><div class="bz-tabs__indicator" id="tabsIndicator"></div>' +
            '<button type="button" class="bz-tabs__item active" data-tab="0">首页</button>' +
            '<button type="button" class="bz-tabs__item" data-tab="1">发现</button>' +
            '<button type="button" class="bz-tabs__item" data-tab="2">我的</button></div>' +
            '<p id="tabsPanel" style="margin-top:12px;font-size:13px;color:var(--text-muted)">当前：首页</p>',
          "BzTabs(tabs, selectedIndex, onSelected)"
        ) +
        api([
          { name: "tabs", type: "List<String>", default: "—", desc: "标签文案" },
          { name: "selectedIndex", type: "Int", default: "—", desc: "当前下标" },
          { name: "onSelected", type: "(Int) -> Unit", default: "—", desc: "选中回调" },
        ])
      );
    },
    init: ctx.initTabsOnly,
  };

  P.segment = {
    title: "Segment 分段选择",
    lead: "BzSegment 胶囊分段，选中块位移动画。",
    render: function () {
      return (
        b() +
        demo(
          "分段",
          "常用于日/周/月切换。",
          '<div class="bz-segment" id="bzSegment"><div class="bz-segment__pill" id="segmentPill"></div>' +
            '<button type="button" class="bz-segment__btn active" data-seg="0">日</button>' +
            '<button type="button" class="bz-segment__btn" data-seg="1">周</button>' +
            '<button type="button" class="bz-segment__btn" data-seg="2">月</button></div>',
          "BzSegment(options, selectedIndex, onSelected)"
        ) +
        api([
          { name: "options", type: "List<String>", default: "—", desc: "分段文案" },
          { name: "selectedIndex", type: "Int", default: "—", desc: "当前下标" },
          { name: "onSelected", type: "(Int) -> Unit", default: "—", desc: "选中回调" },
        ])
      );
    },
    init: ctx.initSegmentOnly,
  };

  P["tabs-segment"] = { title: "Tabs / Segment（合集）", lead: "旧版合集路由。", render: P.tabs.render, init: ctx.initTabsSegment };

  P["list-menu"] = {
    title: "ListMenu 分组菜单",
    lead: "BzListMenu + BzListMenuItem 分组列表入口。",
    render: function () {
      return (
        b() +
        demo(
          "菜单组",
          "每组可有标题。",
          '<div class="list-menu"><div class="list-menu__title">常用</div>' +
            '<div class="cell" data-cell><div class="cell-label">我的收藏</div><span class="cell-value">›</span></div>' +
            '<div class="cell" data-cell><div class="cell-label">浏览记录</div><span class="cell-value">›</span></div></div>',
          "BzListMenu / BzListMenuItem"
        ) +
        api([
          { name: "title", type: "String?", default: "null", desc: "分组标题" },
          { name: "icon", type: "ImageVector?", default: "null", desc: "菜单项图标" },
          { name: "onClick", type: "() -> Unit", default: "—", desc: "点击项" },
        ])
      );
    },
    init: ctx.initCellTagCard,
  };

  P.form = {
    title: "Form / FormField 表单",
    lead: "BzForm 白底容器；BzFormField 标签行 + 必填星号 + errorMessage。",
    render: function () {
      return (
        b() +
        demo(
          "完整表单",
          "校验姓名必填；Switch 与 Input 组合。",
          '<div class="bz-form">' +
            '<div class="bz-form-field"><div class="bz-form-field__label"><span>姓名</span><span class="required">*</span></div>' +
            '<div class="bz-form-field__control"><input class="bz-input" id="formName" type="text" placeholder="请输入姓名" /></div>' +
            '<p class="bz-form-field__error" id="formNameErr" style="display:none">请填写姓名</p></div>' +
            '<div class="bz-form-field"><div class="bz-form-field__label">接收通知</div>' +
            '<div class="bz-form-field__control"><div class="bz-switch on" data-bz-switch role="switch"><div class="bz-switch__knob"></div></div></div></div>' +
            '<div class="bz-form-field"><div class="bz-form-field__label">备注</div>' +
            '<div class="bz-form-field__control"><input class="bz-input" type="text" placeholder="选填" /></div></div>' +
            '<button type="button" class="bz-btn bz-btn--primary bz-btn--block" id="formSubmit" data-press>提交</button></div>',
          "BzForm { BzFormField(label, required, errorMessage) { … } }"
        ) +
        api([
          { name: "content", type: "@Composable", default: "—", desc: "BzForm 子内容" },
          { name: "label", type: "String", default: "—", desc: "BzFormField 标签" },
          { name: "required", type: "Boolean", default: "false", desc: "必填 *" },
          { name: "errorMessage", type: "String?", default: "null", desc: "校验错误文案" },
          { name: "alignStart", type: "Boolean", default: "false", desc: "标签顶对齐" },
          { name: "controlAlignEnd", type: "Boolean", default: "false", desc: "控件右对齐" },
        ])
      );
    },
    init: ctx.initForm,
  };

  P.input = {
    title: "Input 输入框",
    lead: "BzInput 单行输入，圆角描边与主题色光标。",
    render: function () {
      return (
        b() +
        demo(
          "基础输入",
          "受控 value 与 placeholder。",
          '<input class="bz-input" id="demoInput" data-input-mirror="inputMirror" type="text" placeholder="请输入昵称" autocomplete="off" />' +
            '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">当前值：<span id="inputMirror">（空）</span></p>' +
            '<input class="bz-input" style="margin-top:10px" type="text" placeholder="禁用态" disabled />',
          "BzInput(value, onValueChange, placeholder, enabled)"
        ) +
        api([
          { name: "value", type: "String", default: "—", desc: "当前文本" },
          { name: "onValueChange", type: "(String) -> Unit", default: "—", desc: "内容变化" },
          { name: "placeholder", type: "String", default: "\"\"", desc: "占位" },
          { name: "enabled", type: "Boolean", default: "true", desc: "可编辑" },
        ])
      );
    },
    init: ctx.initInput,
  };

  P.textarea = {
    title: "Textarea 多行输入",
    lead: "BzTextarea 多行 BasicTextField，minLines 控制最小行数。",
    render: function () {
      return (
        b() +
        demo(
          "多行",
          "适合留言、描述类字段。",
          '<textarea class="bz-textarea" id="demoTextarea" rows="4" placeholder="请输入详细说明…"></textarea>' +
            '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)"><span id="textareaMirror">（空）</span></p>',
          "BzTextarea(value, onValueChange, placeholder, minLines)"
        ) +
        api([
          { name: "value", type: "String", default: "—", desc: "文本" },
          { name: "onValueChange", type: "(String) -> Unit", default: "—", desc: "变化" },
          { name: "placeholder", type: "String", default: "\"\"", desc: "占位" },
          { name: "minLines", type: "Int", default: "3", desc: "最小行数" },
        ])
      );
    },
    init: ctx.initTextarea,
  };

  P.radio = {
    title: "RadioGroup 单选组",
    lead: "BzRadioGroup + BzRadioOption；selected 为当前 value。",
    render: function () {
      return (
        b() +
        demo(
          "选项",
          "点击行切换选中。",
          '<div class="bz-radio-group">' +
            '<div class="bz-radio-row active" data-radio="daily"><span class="bz-radio-dot"></span>每日</div>' +
            '<div class="bz-radio-row" data-radio="weekly"><span class="bz-radio-dot"></span>每周</div>' +
            '<div class="bz-radio-row" data-radio="monthly"><span class="bz-radio-dot"></span>每月</div></div>' +
            '<p style="margin-top:10px;font-size:12px;color:var(--text-muted)">selected：<span id="radioOut">daily</span></p>',
          "BzRadioGroup(options, selected, onSelected)"
        ) +
        api([
          { name: "options", type: "List<BzRadioOption>", default: "—", desc: "选项列表" },
          { name: "selected", type: "String", default: "—", desc: "当前 value" },
          { name: "onSelected", type: "(String) -> Unit", default: "—", desc: "选中变化" },
          { name: "value / label", type: "String", default: "—", desc: "BzRadioOption 字段" },
        ])
      );
    },
    init: ctx.initRadio,
  };

  P.checkbox = {
    title: "Checkbox 复选框",
    lead: "BzCheckbox 带可选 label；勾选有轻微缩放动效。",
    render: function () {
      return (
        b() +
        demo(
          "单项",
          "onCheckedChange。",
          '<div class="form-row"><span>同意用户协议</span><div class="bz-checkbox" data-bz-checkbox role="checkbox" tabindex="0"></div></div>',
          "BzCheckbox(checked, onCheckedChange, label)"
        ) +
        api([
          { name: "checked", type: "Boolean", default: "—", desc: "是否选中" },
          { name: "onCheckedChange", type: "(Boolean) -> Unit", default: "—", desc: "变化" },
          { name: "label", type: "String?", default: "null", desc: "旁注文案" },
        ])
      );
    },
    init: ctx.initCheckboxOnly,
  };

  P["checkbox-group"] = {
    title: "CheckboxGroup 多选组",
    lead: "BzCheckboxGroup；blockLayout 为表单项式布局。",
    render: function () {
      return (
        b() +
        demo(
          "列表多选",
          "checked: Set&lt;String&gt;。",
          '<div class="checkbox-group">' +
            '<div class="form-row"><span>邮件</span><div class="bz-checkbox checked" data-cb-opt="mail" data-bz-checkbox></div></div>' +
            '<div class="form-row"><span>短信</span><div class="bz-checkbox" data-cb-opt="sms" data-bz-checkbox></div></div>' +
            '<div class="form-row"><span>站内信</span><div class="bz-checkbox" data-cb-opt="inbox" data-bz-checkbox></div></div></div>' +
            '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">已选：<span id="checkboxGroupOut">mail</span></p>',
          "BzCheckboxGroup(options, checked, onCheckedChange, blockLayout)"
        ) +
        api([
          { name: "options", type: "List<BzCheckboxOption>", default: "—", desc: "选项" },
          { name: "checked", type: "Set<String>", default: "—", desc: "已选 value 集" },
          { name: "blockLayout", type: "Boolean", default: "false", desc: "表单项布局" },
        ])
      );
    },
    init: ctx.initCheckboxGroup,
  };

  P.switch = {
    title: "Switch 开关",
    lead: "BzSwitch 主题色轨道与拇指。",
    render: function () {
      return (
        b() +
        demo(
          "开关",
          "enabled 控制禁用。",
          '<div class="form-row"><span>推送通知</span><div class="bz-switch on" data-bz-switch role="switch"><div class="bz-switch__knob"></div></div></div>' +
            '<div class="form-row"><span>只读项</span><div class="bz-switch disabled" role="switch" aria-disabled="true"><div class="bz-switch__knob"></div></div></div>',
          "BzSwitch(checked, onCheckedChange, enabled)"
        ) +
        api([
          { name: "checked", type: "Boolean", default: "—", desc: "开/关" },
          { name: "onCheckedChange", type: "(Boolean) -> Unit", default: "—", desc: "变化" },
          { name: "enabled", type: "Boolean", default: "true", desc: "是否可用" },
        ])
      );
    },
    init: ctx.initSwitchOnly,
  };

  P["switch-checkbox"] = { title: "Switch / Checkbox（合集）", lead: "旧版合集。", render: P.switch.render, init: ctx.initSwitchCheckbox };

  P.rate = {
    title: "Rate 评分",
    lead: "BzRate 星级评分，count 默认 5。",
    render: function () {
      return (
        b() +
        demo(
          "点击设分",
          "value 为当前星数。",
          '<div class="bz-rate">' +
            [1, 2, 3, 4, 5]
              .map(function (i) {
                return '<button type="button" class="bz-rate-star' + (i <= 3 ? " filled" : "") + '" data-rate-star="' + i + '">★</button>';
              })
              .join("") +
            '</div><p style="margin-top:8px;font-size:12px;color:var(--text-muted)">value：<span id="rateOut">3</span></p>',
          "BzRate(value, onValueChange, count)"
        ) +
        api([
          { name: "value", type: "Int", default: "—", desc: "当前分值" },
          { name: "onValueChange", type: "(Int) -> Unit", default: "—", desc: "变化" },
          { name: "count", type: "Int", default: "5", desc: "星星总数" },
        ])
      );
    },
    init: ctx.initRate,
  };

  P.slider = {
    title: "Slider 滑块",
    lead: "BzSlider 单值滑块，valueRange 默认 0f..100f。",
    render: function () {
      return (
        b() +
        demo(
          "拖动",
          "onValueChange 实时回调。",
          '<input type="range" class="bz-slider" id="demoSlider" min="0" max="100" value="42" />' +
            '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">value：<span id="sliderOut">42</span></p>',
          "BzSlider(value, onValueChange, valueRange)"
        ) +
        api([
          { name: "value", type: "Float", default: "—", desc: "当前值" },
          { name: "onValueChange", type: "(Float) -> Unit", default: "—", desc: "变化" },
          { name: "valueRange", type: "ClosedFloatingPointRange<Float>", default: "0f..100f", desc: "范围" },
        ])
      );
    },
    init: ctx.initSlider,
  };

  P["double-slider"] = {
    title: "DoubleSlider 区间滑块",
    lead: "BzDoubleSlider 双拇指 RangeSlider。",
    render: function () {
      return (
        b() +
        demo(
          "区间",
          "Web 用双 range 近似 range 选择。",
          '<div class="double-slider"><label>最小 <input type="range" id="rangeMin" min="0" max="100" value="20" class="bz-slider" /></label>' +
            '<label>最大 <input type="range" id="rangeMax" min="0" max="100" value="80" class="bz-slider" /></label></div>' +
            '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">range：<span id="doubleSliderOut">20 ~ 80</span></p>',
          "BzDoubleSlider(range, onRangeChange, valueRange)"
        ) +
        api([
          { name: "range", type: "ClosedFloatingPointRange<Float>", default: "—", desc: "当前区间" },
          { name: "onRangeChange", type: "(ClosedFloatingPointRange<Float>) -> Unit", default: "—", desc: "变化" },
          { name: "valueRange", type: "ClosedFloatingPointRange<Float>", default: "0f..100f", desc: "边界" },
        ])
      );
    },
    init: ctx.initDoubleSlider,
  };

  P.choose = {
    title: "Choose 胶囊选择",
    lead: "BzChoose 基于 BzTag 的多选/单选胶囊组。",
    render: function () {
      return (
        b() +
        demo(
          "多选 / 单选",
          "multi 控制模式。",
          '<button type="button" class="bz-btn bz-btn--ghost bz-btn--sm" id="chooseSingleToggle" data-press>当前：多选</button>' +
            '<div class="bz-choose" id="chooseMulti" style="margin-top:10px">' +
            ['<span class="bz-choose-tag active" data-val="设计">设计</span>', '<span class="bz-choose-tag" data-val="开发">开发</span>', '<span class="bz-choose-tag" data-val="测试">测试</span>'].join(
              ""
            ) +
            '</div><p style="margin-top:8px;font-size:12px;color:var(--text-muted)">selected：<span id="chooseOut">设计</span></p>',
          "BzChoose(options, selected, onSelected, multi)"
        ) +
        api([
          { name: "options", type: "List<String>", default: "—", desc: "选项文案" },
          { name: "selected", type: "Set<String>", default: "—", desc: "已选集合" },
          { name: "multi", type: "Boolean", default: "true", desc: "是否多选" },
          { name: "onSelected", type: "(Set<String>) -> Unit", default: "—", desc: "变化" },
        ])
      );
    },
    init: ctx.initChoose,
  };

  P.picker = {
    title: "Picker 底部选择器",
    lead: "BzPicker 底部列表弹层，选中后 onSelect(index) 并 onDismiss。",
    render: function () {
      return (
        b() +
        demo(
          "城市",
          "点击打开底部 sheet。",
          '<button type="button" class="bz-btn bz-btn--secondary" id="pickerOpen" data-press>当前：<span id="pickerValue">北京</span></button>' +
            '<div class="sheet-mask" id="pickerMask"></div>' +
            '<div class="sheet-panel" id="pickerSheet"><div class="sheet-panel__title">选择城市</div>' +
            '<button type="button" class="sheet-panel__opt selected" data-picker-opt>北京</button>' +
            '<button type="button" class="sheet-panel__opt" data-picker-opt>上海</button>' +
            '<button type="button" class="sheet-panel__opt" data-picker-opt>广州</button>' +
            '<button type="button" class="sheet-panel__opt" data-picker-opt>深圳</button></div>',
          "BzPicker(visible, title, options, selectedIndex, onSelect, onDismiss)"
        ) +
        api([
          { name: "visible", type: "Boolean", default: "—", desc: "是否显示" },
          { name: "title", type: "String", default: "—", desc: "标题" },
          { name: "options", type: "List<String>", default: "—", desc: "选项" },
          { name: "selectedIndex", type: "Int", default: "—", desc: "高亮项" },
          { name: "onSelect", type: "(Int) -> Unit", default: "—", desc: "选中" },
          { name: "onDismiss", type: "() -> Unit", default: "—", desc: "关闭" },
        ])
      );
    },
    init: ctx.initPicker,
  };

  P.calendar = {
    title: "Calendar 月历",
    lead: "BzCalendar 月视图，selected: LocalDate，可切换 month。",
    render: function () {
      return (
        b() +
        demo(
          "选择日期",
          "点击日期 onSelect。",
          '<div class="bz-calendar"><div class="bz-calendar__head">' +
            '<button type="button" class="bz-btn bz-btn--ghost bz-btn--sm" id="calPrev" data-press>‹</button>' +
            '<span id="calTitle">2026年1月</span>' +
            '<button type="button" class="bz-btn bz-btn--ghost bz-btn--sm" id="calNext" data-press>›</button></div>' +
            '<div class="cal-weekdays"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>' +
            '<div class="cal-grid" id="calGrid"></div></div>' +
            '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">selected：<span id="calOut">（未选）</span></p>',
          "BzCalendar(selected, onSelect, month)"
        ) +
        api([
          { name: "selected", type: "LocalDate", default: "—", desc: "选中日期" },
          { name: "onSelect", type: "(LocalDate) -> Unit", default: "—", desc: "选择回调" },
          { name: "month", type: "YearMonth", default: "from(selected)", desc: "显示月份" },
        ])
      );
    },
    init: ctx.initCalendar,
  };

  P["color-picker"] = {
    title: "ColorPicker 取色",
    lead: "BzColorPicker 预设色盘点击选择。",
    render: function () {
      return (
        b() +
        demo(
          "预设色",
          "selected 高亮描边。",
          '<div class="color-swatches">' +
            [
              "linear-gradient(135deg,#5b6cff,#7c3aed)",
              "#e54d42",
              "#f37b1d",
              "#10b981",
              "#1cbbb4",
              "#6739b6",
            ]
              .map(function (bg, i) {
                return (
                  '<button type="button" class="color-swatch' +
                  (i === 0 ? " selected" : "") +
                  '" data-color-swatch style="background:' +
                  bg +
                  '"></button>'
                );
              })
              .join("") +
            '</div><div class="color-preview" id="colorPreview" style="background:linear-gradient(135deg,#5b6cff,#7c3aed)"></div>',
          "BzColorPicker(selected, onSelected)"
        ) +
        api([
          { name: "selected", type: "Color", default: "—", desc: "当前色" },
          { name: "onSelected", type: "(Color) -> Unit", default: "—", desc: "选择回调" },
        ])
      );
    },
    init: ctx.initColorPicker,
  };

  P.upload = {
    title: "Upload 上传格",
    lead: "BzUpload 图片格 UI；onAddClick 由宿主处理选图（库内无内置选图）。",
    render: function () {
      return (
        b() +
        demo(
          "槽位",
          "imageCount / maxCount。",
          '<div class="upload-grid" id="uploadGrid">' +
            '<button type="button" class="upload-slot upload-slot--add" id="uploadAdd" aria-label="添加">+</button></div>' +
            '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">已上传：<span id="uploadCount">0 / 3</span></p>',
          "BzUpload(imageCount, maxCount, onAddClick)"
        ) +
        api([
          { name: "imageCount", type: "Int", default: "—", desc: "已有图数量" },
          { name: "maxCount", type: "Int", default: "—", desc: "上限" },
          { name: "onAddClick", type: "() -> Unit", default: "—", desc: "点击加号" },
        ])
      );
    },
    init: ctx.initUpload,
  };

  P.modal = {
    title: "Modal 对话框",
    lead: "声明式 BzModal（components）；命令式见 imperative.BzModal。",
    render: function () {
      return (
        b() +
        demo(
          "确认框",
          "visible 控制显示；showCancel 可隐藏取消。",
          '<button type="button" class="bz-btn bz-btn--primary" id="modalOpen" data-press>打开对话框</button>' +
            '<div class="sheet-mask" id="demoModalMask"></div>' +
            '<div class="bz-modal" id="demoModal"><h4>提示</h4><p>确定要删除这条记录吗？</p>' +
            '<div class="bz-modal__actions"><button type="button" class="bz-modal__btn" data-modal-close>取消</button>' +
            '<button type="button" class="bz-modal__btn bz-modal__btn--primary" data-modal-close>确定</button></div></div>',
          "BzModal(visible, title, message, onConfirm, onDismiss)"
        ) +
        api([
          { name: "visible", type: "Boolean", default: "—", desc: "是否显示" },
          { name: "title", type: "String", default: "—", desc: "标题" },
          { name: "message", type: "String", default: "—", desc: "正文" },
          { name: "onConfirm", type: "() -> Unit", default: "—", desc: "确定" },
          { name: "onDismiss", type: "() -> Unit", default: "—", desc: "关闭/取消" },
          { name: "showCancel", type: "Boolean", default: "true", desc: "显示取消按钮" },
        ])
      );
    },
    init: ctx.initModal,
  };

  P.skeleton = {
    title: "Skeleton 骨架屏",
    lead: "BzSkeleton 闪烁占位条，height 可调。",
    render: function () {
      return (
        b() +
        demo("列表骨架", "用于首屏加载占位。", '<div class="skeleton-stack"><div class="bz-skeleton"></div><div class="bz-skeleton"></div><div class="bz-skeleton bz-skeleton--short"></div></div>', "BzSkeleton(height)") +
        api([{ name: "height", type: "Dp", default: "16.dp", desc: "条高度" }])
      );
    },
  };

  P["state-box"] = {
    title: "StateBox 状态盒",
    lead: "BzStateBox 在 Loading / Skeleton / Error / Empty / Content 间切换。",
    render: function () {
      return (
        b() +
        demo(
          "切换状态",
          "onRetry 在 Error 态可用。",
          '<label style="font-size:13px">state <select id="stateBoxSelect">' +
            '<option>Content</option><option>Loading</option><option>Skeleton</option><option>Error</option><option>Empty</option></select></label>' +
            '<div class="state-box-panel" id="stateBoxPanel" style="margin-top:12px"><div class="state-box-content">内容区：列表或表单</div></div>',
          "BzStateBox(state, onRetry, content)"
        ) +
        api([
          { name: "state", type: "BzStateBoxView", default: "—", desc: "Content / Loading / Skeleton / Error / Empty" },
          { name: "onRetry", type: "(() -> Unit)?", default: "null", desc: "错误重试" },
          { name: "loadingText", type: "String?", default: "null", desc: "加载文案" },
          { name: "errorMessage", type: "String", default: "\"加载失败\"", desc: "错误标题" },
          { name: "emptyText", type: "String", default: "\"暂无数据\"", desc: "空态标题" },
        ])
      );
    },
    init: ctx.initStateBox,
  };

  P["load-more"] = {
    title: "LoadMore 加载更多",
    lead: "BzLoadMore 列表底部状态：Idle / Loading / NoMore / Error。",
    render: function () {
      return (
        b() +
        demo(
          "页脚",
          "Error 可 onRetry。",
          '<label style="font-size:13px">status <select id="loadMoreStatus"><option>Idle</option><option>Loading</option><option>NoMore</option><option>Error</option></select></label>' +
            '<div id="loadMorePanel" style="margin-top:12px"></div>',
          "BzLoadMore(status, onRetry)"
        ) +
        api([
          { name: "status", type: "BzLoadMoreStatus", default: "—", desc: "Idle / Loading / NoMore / Error" },
          { name: "onRetry", type: "(() -> Unit)?", default: "null", desc: "失败重试" },
        ])
      );
    },
    init: ctx.initLoadMore,
  };

  P["pull-refresh"] = {
    title: "PullRefresh 下拉刷新",
    lead: "BzPullRefresh 包裹可滚动内容，refreshing + onRefresh。",
    render: function () {
      return (
        b() +
        demo(
          "下拉",
          "在区域内按下并向下拖动超过阈值后松开。",
          '<div class="pull-zone" id="pullZone"><p id="pullHint">下拉刷新（松开模拟 onRefresh）</p><div class="cell" data-cell><div class="cell-label">列表项 1</div></div><div class="cell" data-cell><div class="cell-label">列表项 2</div></div></div>',
          "BzPullRefresh(refreshing, onRefresh, content)"
        ) +
        api([
          { name: "refreshing", type: "Boolean", default: "—", desc: "是否刷新中" },
          { name: "onRefresh", type: "() -> Unit", default: "—", desc: "触发刷新" },
        ])
      );
    },
    init: ctx.initPullRefresh,
  };

  P.waterfall = {
    title: "WaterfallFlow 瀑布流",
    lead: "BzWaterfallFlow columns + BzWaterfallItem 高度错落。",
    render: function () {
      return (
        b() +
        demo(
          "两列",
          "静态 Web 近似布局。",
          '<div class="waterfall"><div class="waterfall__col"><div class="waterfall__item" style="height:72px">A</div><div class="waterfall__item" style="height:110px">B</div></div>' +
            '<div class="waterfall__col"><div class="waterfall__item" style="height:96px">C</div><div class="waterfall__item" style="height:64px">D</div></div></div>',
          "BzWaterfallFlow(columns, items)"
        ) +
        api([
          { name: "columns", type: "Int", default: "—", desc: "列数" },
          { name: "id / label", type: "String", default: "—", desc: "BzWaterfallItem" },
          { name: "heightDp", type: "Int", default: "—", desc: "单元高度" },
        ])
      );
    },
    init: ctx.initWaterfall,
  };

  P.sticky = {
    title: "Sticky 吸顶",
    lead: "BzSticky 吸顶条样式；LazyList 配合 BzStickyHeader。",
    render: function () {
      return (
        b() +
        demo(
          "吸顶标题",
          "滚动列表时标题固定（示意）。",
          '<div class="sticky-demo"><div class="bz-sticky-bar">分类 A</div><div class="sticky-demo__item">条目 1</div><div class="sticky-demo__item">条目 2</div><div class="bz-sticky-bar">分类 B</div><div class="sticky-demo__item">条目 3</div></div>',
          "BzSticky · LazyListScope.BzStickyHeader"
        ) +
        api([
          { name: "content", type: "@Composable", default: "—", desc: "BzSticky 内容" },
          { name: "key", type: "Any?", default: "null", desc: "BzStickyHeader 键" },
        ])
      );
    },
  };

  P.tooltip = {
    title: "Tooltip 文字提示",
    lead: "BzTooltip 点击锚点显示 text 提示。",
    render: function () {
      return (
        b() +
        demo(
          "点击显示",
          "content 为锚点组件。",
          '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm bz-tooltip-anchor" data-press>悬停/点击查看说明<span class="bz-tooltip">这是 BzTooltip 文案</span></button>',
          "BzTooltip(text, content)"
        ) +
        api([
          { name: "text", type: "String", default: "—", desc: "提示内容" },
          { name: "content", type: "@Composable", default: "—", desc: "锚点" },
        ])
      );
    },
    init: ctx.bindPressButtons,
  };

  P.bessel = {
    title: "Bessel 底部点赞",
    lead: "BzBessel 固定高度区域与底部爱心；onLikeClickDelay **2s** 汇总次数。",
    render: function () {
      return (
        b() +
        demo(
          "底部爱心",
          "点击喷射粒子。",
          '<div class="like-area" id="besselArea"><button type="button" class="like-btn" id="besselBtn" aria-label="点赞">♥</button>' +
            '<p style="font-size:12px;color:var(--text-muted);margin-top:8px">汇总计数（2s）：<span id="besselCount">0</span></p></div>',
          "BzBessel(onLikeClick, onLikeClickDelay, icon)"
        ) +
        api([
          { name: "onLikeClick", type: "() -> Unit", default: "{}", desc: "每次有效点击" },
          { name: "onLikeClickDelay", type: "(Int) -> Unit", default: "{}", desc: "2s 防抖汇总次数" },
          { name: "icon", type: "ImageVector", default: "Favorite", desc: "底部图标" },
        ])
      );
    },
    init: ctx.initBessel,
  };

  P["full-like"] = {
    title: "FullLike 全屏点赞",
    lead: "BzFullLike 铺满父布局；点击坐标生成气泡；**3s** 汇总；120ms 连点节流。",
    render: function () {
      return (
        b() +
        demo(
          "全屏区域",
          "在区域内任意位置点击。",
          '<div class="full-like-zone" id="fullLikeZone">点击此区域任意位置点赞<div id="fullLikeCount" style="position:absolute;bottom:8px;right:10px;font-size:11px">0 次</div></div>',
          "BzFullLike(onLikeClick, onLikeClickDelay, content)"
        ) +
        api([
          { name: "onLikeClick", type: "() -> Unit", default: "{}", desc: "每次有效点击" },
          { name: "onLikeClickDelay", type: "(Int) -> Unit", default: "{}", desc: "3s 汇总" },
          { name: "content", type: "@Composable", default: "{}", desc: "下层内容" },
        ])
      );
    },
    init: ctx.initFullLike,
  };

  P.barrage = {
    title: "Barrage 弹幕",
    lead: "BzBarrage + BzBarrageController push 弹幕。",
    render: function () {
      return (
        b() +
        demo(
          "推送",
          "模拟 controller.push。",
          '<div class="barrage-stage"><div class="barrage-lane" id="barrageLane"></div><button type="button" class="bz-btn bz-btn--primary bz-btn--sm" id="barragePush" data-press>发送弹幕</button></div>',
          "BzBarrage(controller, content)"
        ) +
        api([
          { name: "text", type: "String", default: "—", desc: "BzBarrageItem 文案" },
          { name: "controller", type: "BzBarrageController", default: "—", desc: "push / create" },
          { name: "rememberBzBarrageController", type: "—", default: "—", desc: "记住并定时清理" },
        ])
      );
    },
    init: ctx.initBarrage,
  };

  P.emoji = {
    title: "Emoji 表情面板",
    lead: "BzEmoji 表情网格 onChooseEmoji。",
    render: function () {
      return (
        b() +
        demo(
          "选择",
          "columns 列数。",
          '<div class="emoji-grid">' +
            ["😀", "😂", "🥰", "😎", "👍", "🎉", "❤️", "🔥"]
              .map(function (e) {
                return '<button type="button" class="emoji-btn" data-emoji="' + e + '">' + e + "</button>";
              })
              .join("") +
            '</div><p style="margin-top:8px;font-size:12px;color:var(--text-muted)">已选：<span id="emojiOut">（无）</span></p>',
          "BzEmoji(emojiList, columns, onChooseEmoji)"
        ) +
        api([
          { name: "emojiList", type: "List<BzEmojiItem>", default: "—", desc: "表情数据" },
          { name: "columns", type: "Int", default: "—", desc: "列数" },
          { name: "onChooseEmoji", type: "(BzEmojiItem) -> Unit", default: "—", desc: "选中" },
        ])
      );
    },
    init: ctx.initEmoji,
  };

  P["admin-table"] = {
    title: "AdminTable 管理表格",
    lead: "BzAdminTable 封面 + 操作列 Show / Update / Del。",
    render: function () {
      return (
        b() +
        demo(
          "行操作",
          "onAction(BzAdminTableAction, row)。",
          '<div class="admin-table" data-admin-row="1"><div class="admin-table__cover"></div><div><strong>春季上新</strong><div class="muted">2026-03-01</div></div>' +
            '<div class="admin-table__actions"><button type="button" data-admin-action="Show">查看</button><button type="button" data-admin-action="Update">编辑</button><button type="button" data-admin-action="Del">删除</button></div></div>',
          "BzAdminTable(list, header, onAction)"
        ) +
        api([
          { name: "list", type: "List<BzAdminTableRow>", default: "—", desc: "数据行" },
          { name: "showView/Update/Delete", type: "Boolean", default: "—", desc: "显示操作按钮" },
          { name: "onAction", type: "(BzAdminTableAction, BzAdminTableRow) -> Unit", default: "—", desc: "操作回调" },
        ])
      );
    },
    init: ctx.initAdminTable,
  };

  P["list-grid"] = {
    title: "ListGrid 宫格入口",
    lead: "BzListGrid 图标宫格，gridCol 列数。",
    render: function () {
      return (
        b() +
        demo(
          "入口",
          "badge / colorName 装饰。",
          '<div class="bz-grid-demo">' +
            [
              { n: "订单", b: "2" },
              { n: "优惠券", b: "" },
              { n: "地址", b: "" },
              { n: "客服", b: "" },
            ]
              .map(function (it) {
                return (
                  '<div class="bz-grid-demo__item"><span class="bz-grid-demo__icon">◆</span>' +
                  it.n +
                  (it.b ? '<span class="grid-badge">' + it.b + "</span>" : "") +
                  "</div>"
                );
              })
              .join("") +
            "</div>",
          "BzListGrid(data, gridCol, onItemClick)"
        ) +
        api([
          { name: "name", type: "String", default: "—", desc: "BzListGridItem 名称" },
          { name: "icon", type: "ImageVector", default: "—", desc: "图标" },
          { name: "badge", type: "String?", default: "null", desc: "角标" },
          { name: "gridCol", type: "Int", default: "—", desc: "列数" },
        ])
      );
    },
  };

  P["list-page"] = {
    title: "ListPage 列表页范式",
    lead: "BzListPage 整合刷新、状态盒与加载更多页脚。",
    render: function () {
      return (
        b() +
        demo(
          "结构",
          "refreshing / loadMore / empty / error。",
          '<div class="page-shell-demo" style="max-width:400px">' +
            '<div class="title-bar-demo title-bar-demo--plain"><span>列表示例</span></div>' +
            '<div class="page-shell-demo__body"><div class="cell" data-cell><div class="cell-label">条目 A</div></div>' +
            '<div class="loadmore-row muted">加载更多…</div></div></div>',
          "BzListPage(refreshing, onRefresh, loadMore, onLoadMore, content)"
        ) +
        api([
          { name: "refreshing", type: "Boolean", default: "—", desc: "下拉刷新中" },
          { name: "onRefresh", type: "() -> Unit", default: "—", desc: "刷新" },
          { name: "loadMore", type: "BzListPageLoadMore", default: "—", desc: "页脚状态" },
          { name: "resolveBzListPageViewState", type: "—", default: "—", desc: "解析 BzStateBoxView" },
        ])
      );
    },
    init: ctx.initCellTagCard,
  };

  P["list-message"] = {
    title: "ListMessage 聊天气泡",
    lead: "BzListMessage + BzChatMessage 简化 IM 列表。",
    render: function () {
      return (
        b() +
        demo(
          "左右气泡",
          "isSelf 区分己方/对方。",
          '<div class="chat-list"><div class="chat-bubble chat-bubble--other"><span class="chat-time">10:01</span>你好，在吗？</div>' +
            '<div class="chat-bubble chat-bubble--self"><span class="chat-time">10:02</span>在的，请说。</div></div>',
          "BzListMessage(messages)"
        ) +
        api([
          { name: "text", type: "String", default: "—", desc: "BzChatMessage 正文" },
          { name: "isSelf", type: "Boolean", default: "—", desc: "是否己方" },
          { name: "time", type: "String?", default: "null", desc: "时间" },
        ])
      );
    },
    init: ctx.initListMessage,
  };
};
