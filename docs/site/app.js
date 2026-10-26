(function () {
  "use strict";

  var VERSION = "1.3.0";

  var THEMES = {
    default: { primary: "#5b6cff", secondary: "#7c3aed", accent: "#22d3ee", light: "#eef0ff", label: "Breeze（default）" },
    blue: { primary: "#0081ff", secondary: "#1cbbb4", accent: "#1cbbb4", light: "#cce6ff", label: "海蓝 blue" },
    purple: { primary: "#6739b6", secondary: "#9c26b0", accent: "#9000ff", light: "#e1d7f0", label: "暮紫 purple" },
    orange: { primary: "#f37b1d", secondary: "#ed1c24", accent: "#ff9700", light: "#fde6d2", label: "暖橙 orange" },
    red: { primary: "#e54d42", secondary: "#ec008c", accent: "#f43f3b", light: "#fadbd9", label: "绯红 red" },
    cyan: { primary: "#1cbbb4", secondary: "#10b981", accent: "#10b981", light: "#d2f1f0", label: "青绿 cyan" },
  };

  var NAV = [
    { id: "start", title: "开始", items: [{ route: "home", label: "介绍" }, { route: "theme", label: "主题变体" }] },
    {
      id: "general",
      title: "通用",
      items: [{ route: "button", label: "Button 按钮" }],
    },
    {
      id: "layout",
      title: "布局",
      items: [{ route: "title-bar", label: "TitleBar / Page" }],
    },
    {
      id: "display",
      title: "数据展示",
      items: [
        { route: "cell-tag-card", label: "Cell / Tag / Card" },
        { route: "progress", label: "Progress 进度" },
      ],
    },
    {
      id: "nav",
      title: "导航",
      items: [{ route: "tabs-segment", label: "Tabs / Segment" }],
    },
    {
      id: "form",
      title: "表单",
      items: [
        { route: "switch-checkbox", label: "Switch / Checkbox" },
        { route: "input", label: "Input 输入框" },
      ],
    },
    {
      id: "motion",
      title: "动效",
      items: [{ route: "bessel", label: "Bessel / FullLike" }],
    },
  ];

  function apiTable(rows) {
    var html =
      '<div class="api-section"><h2>API</h2><table class="api-table"><thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead><tbody>';
    rows.forEach(function (r) {
      html +=
        "<tr><td><code>" +
        r.name +
        "</code></td><td><code>" +
        r.type +
        "</code></td><td>" +
        (r.default || "—") +
        "</td><td>" +
        r.desc +
        "</td></tr>";
    });
    return html + "</tbody></table></div>";
  }

  function demoBlock(title, desc, innerHtml, compose) {
    return (
      '<section class="demo-block"><h3 class="demo-block__title">' +
      title +
      '</h3><p class="demo-block__desc">' +
      desc +
      '</p><div class="demo-card"><div class="demo-card__preview">' +
      innerHtml +
      '</div><div class="demo-card__caption">对应 Compose：<code>' +
      compose +
      "</code></div></div></section>"
    );
  }

  var PAGES = {
    home: {
      title: "Breeze UI For Android",
      render: function () {
        return (
          '<div class="home-hero"><p class="page-lead" style="margin:0">将微信小程序 <strong>Breeze UI</strong> 移植为 Jetpack Compose 组件库。本站提供可点击的 Web 近似演示与 API 速查；完整说明见 <a href="../API.md">API.md</a>、<a href="../DEVELOPER_GUIDE.md">开发手册</a>。</p></div>' +
          '<p class="global-banner">Web 预览为近似效果，真机与最终视觉以 Jetpack Compose 为准。</p>' +
          '<h2 style="font-size:18px;margin-bottom:12px">组件演示</h2><div class="home-grid">' +
          [
            ["button", "Button 按钮"],
            ["progress", "Progress 进度"],
            ["title-bar", "TitleBar 顶栏"],
            ["cell-tag-card", "Cell / Tag / Card"],
            ["tabs-segment", "Tabs / Segment"],
            ["switch-checkbox", "Switch / Checkbox"],
            ["input", "Input 输入"],
            ["bessel", "点赞动效"],
            ["theme", "主题变体"],
          ]
            .map(function (pair) {
              return (
                '<a class="home-card" href="#/components/' +
                pair[0] +
                '"><strong>' +
                pair[1] +
                "</strong><span>交互演示 + API</span></a>"
              );
            })
            .join("") +
          '</div><p style="margin-top:24px;font-size:13px;color:var(--text-muted)">旧版单页手机预览仍保留：<a href="../preview/index.html">docs/preview/index.html</a></p>'
        );
      },
    },
    theme: {
      title: "主题变体 Theme",
      lead: "通过 BzConfigProvider 或 BreezeTheme 切换主题；对应小程序 theme-wrap.theme-*。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "主题切换",
            "点击色块切换整站品牌色（模拟 BzConfigProvider(theme = …)）。",
            '<div class="theme-swatches" id="themeSwatches"></div><div style="margin-top:16px" class="btn-row"><button type="button" class="bz-btn bz-btn--primary pulse" data-press>主色按钮</button><span class="tag tag--primary">标签</span></div>',
            "BzConfigProvider · BreezeThemeVariant"
          ) +
          apiTable([
            { name: "theme", type: "BreezeThemeVariant?", default: "null", desc: "局部主题变体：Default / Blue / Purple / Orange / Red / Cyan" },
            { name: "radius", type: "BreezeRadius?", default: "null", desc: "局部圆角令牌" },
            { name: "fontScale", type: "Float", default: "当前 Local", desc: "字号缩放（LocalBreezeFontScale）" },
          ])
        );
      },
      init: initThemePage,
    },
    button: {
      title: "Button 按钮",
      lead: "对应小程序 bz-button。按压缩放约 0.92；主 CTA 可开启 pulseHint 呼吸动效。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "类型与尺寸",
            "渐变主按钮、线框次要、幽灵；Sm / Md / Lg。",
            '<div class="btn-row">' +
              '<button type="button" class="bz-btn bz-btn--primary bz-btn--sm" data-press>小</button>' +
              '<button type="button" class="bz-btn bz-btn--primary" data-press>主要</button>' +
              '<button type="button" class="bz-btn bz-btn--primary bz-btn--lg" data-press>大</button>' +
              '<button type="button" class="bz-btn bz-btn--secondary" data-press>次要</button>' +
              '<button type="button" class="bz-btn bz-btn--ghost" data-press>幽灵</button>' +
              "</div>",
            "BzButton"
          ) +
          demoBlock(
            "按压与 pulseHint",
            "pointer 按下缩放；pulseHint 主按钮空闲呼吸。",
            '<div class="btn-row"><button type="button" class="bz-btn bz-btn--primary pulse" data-press>主按钮（pulseHint）</button></div>' +
              '<button type="button" class="bz-btn bz-btn--primary bz-btn--block pulse" data-press>块级 CTA</button>',
            "BzButton(pulseHint = true, block = true)"
          ) +
          demoBlock(
            "加载与禁用",
            "loading 显示指示器；enabled = false 不可点。",
            '<div class="btn-row">' +
              '<button type="button" class="bz-btn bz-btn--primary bz-btn--loading" disabled>加载中</button>' +
              '<button type="button" class="bz-btn bz-btn--primary" disabled>已禁用</button>' +
              '<button type="button" class="bz-btn bz-btn--primary bz-btn--round" data-press>圆角 round</button>' +
              "</div>",
            "BzButton(loading, enabled, round)"
          ) +
          apiTable([
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
      init: bindPressButtons,
    },
    progress: {
      title: "Progress 进度条",
      lead: "确定进度使用 springSmooth 补间；indeterminate 为不确定态；circular 为圆形。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "确定进度",
            "点击按钮增减进度（0~1）。",
            '<div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>' +
              '<div class="btn-row" style="margin-top:10px">' +
              '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm" id="progressSub">-20%</button>' +
              '<button type="button" class="bz-btn bz-btn--secondary bz-btn--sm" id="progressAdd">+20%</button>' +
              '<span id="progressLabel" style="font-size:13px;color:var(--text-muted)">35%</span></div>',
            "BzProgress(progress)"
          ) +
          demoBlock(
            "不确定态",
            "线性 shimmer 与圆形转圈。",
            '<div class="progress-indeterminate"></div>' +
              '<div class="spinner-wrap" style="margin-top:14px"><div class="spinner spinner--lg" aria-hidden="true"></div><span style="font-size:13px;color:var(--text-muted)">indeterminate + circular</span></div>',
            "BzProgress(indeterminate = true) · circular"
          ) +
          apiTable([
            { name: "progress", type: "Float", default: "—", desc: "0f~1f，确定态进度" },
            { name: "indeterminate", type: "Boolean", default: "false", desc: "不确定加载（忽略 progress）" },
            { name: "circular", type: "Boolean", default: "false", desc: "圆形指示器" },
            { name: "color", type: "Color", default: "primary", desc: "进度条颜色" },
          ])
        );
      },
      init: initProgress,
    },
    "title-bar": {
      title: "TitleBar 与页面壳",
      lead: "BzPage 挂载 Overlay；BzTitleBar 为顶栏标题与返回。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "渐变顶栏",
            "useGradient = true 时使用品牌渐变。",
            '<div class="title-bar-demo"><button type="button" class="title-bar-demo__back" aria-label="返回">‹</button><span>设置</span><span class="title-bar-demo__actions">完成</span></div>',
            "BzTitleBar(useGradient = true, showBack, actions)"
          ) +
          demoBlock(
            "页面布局",
            "BzPage + BzTitleBar + 内容区示意。",
            '<div class="page-shell-demo">' +
              '<div class="title-bar-demo"><button type="button" class="title-bar-demo__back">‹</button><span>Breeze UI</span></div>' +
              '<div class="page-shell-demo__body">页面内容区域（列表、表单等）</div></div>',
            "BzPage { BzTitleBar(...) { … } }"
          ) +
          apiTable([
            { name: "title", type: "String", default: "—", desc: "标题文字" },
            { name: "showBack", type: "Boolean", default: "false", desc: "是否显示返回" },
            { name: "onBack", type: "(() -> Unit)?", default: "null", desc: "返回回调" },
            { name: "useGradient", type: "Boolean", default: "false", desc: "渐变背景" },
            { name: "actions", type: "@Composable?", default: "null", desc: "右侧操作区" },
            { name: "content", type: "@Composable", default: "—", desc: "BzPage 子内容" },
          ])
        );
      },
      init: bindPressButtons,
    },
    "cell-tag-card": {
      title: "Cell / Tag / Card",
      lead: "列表单元格、胶囊标签与信息卡片。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "BzCell",
            "点击单元格有反馈。",
            '<div class="cell" data-cell><div><div class="cell-label">账号与安全</div><div class="cell-sub">管理登录方式</div></div><span class="cell-value">›</span></div>' +
              '<div class="cell" data-cell><div class="cell-label">消息通知</div><span class="cell-value">已开启 ›</span></div>',
            "BzCell(title, subtitle, value, showArrow, onClick)"
          ) +
          demoBlock(
            "BzTag",
            "colorName、light 控制配色。",
            '<div class="tags"><span class="tag tag--primary" data-tag>默认 light</span><span class="tag tag--solid" data-tag>主题实心</span><span class="tag tag--outline" data-tag>描边</span></div>',
            "BzTag(text, colorName, light, onClick)"
          ) +
          demoBlock(
            "BzCard",
            "可选 title 与 onClick。",
            '<div class="card" id="demoCard"><h3>本周概览</h3><p>圆角白底卡片，贴近 Breeze 扁平风格。</p></div>',
            "BzCard(title, onClick, content)"
          ) +
          apiTable([
            { name: "title", type: "String", default: "—", desc: "Cell / Card 标题" },
            { name: "subtitle", type: "String?", default: "null", desc: "Cell 副标题" },
            { name: "value", type: "String?", default: "null", desc: "Cell 右侧文案" },
            { name: "showArrow", type: "Boolean", default: "false", desc: "Cell 显示 ›" },
            { name: "colorName", type: "String", default: "\"theme\"", desc: "Tag 颜色名" },
            { name: "light", type: "Boolean", default: "false", desc: "Tag 浅色底" },
          ])
        );
      },
      init: initCellTagCard,
    },
    "tabs-segment": {
      title: "Tabs / Segment",
      lead: "Tabs 底部指示条滑动；Segment 选中块位移动画。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "BzTabs",
            "点击切换 Tab，指示条弹簧位移。",
            '<div class="bz-tabs" id="bzTabs"><div class="bz-tabs__indicator" id="tabsIndicator"></div>' +
              '<button type="button" class="bz-tabs__item active" data-tab="0">首页</button>' +
              '<button type="button" class="bz-tabs__item" data-tab="1">发现</button>' +
              '<button type="button" class="bz-tabs__item" data-tab="2">我的</button></div>' +
              '<p id="tabsPanel" style="margin-top:12px;font-size:13px;color:var(--text-muted)">当前：首页</p>',
            "BzTabs(tabs, selectedIndex, onSelected)"
          ) +
          demoBlock(
            "BzSegment",
            "分段选择器。",
            '<div class="bz-segment" id="bzSegment"><div class="bz-segment__pill" id="segmentPill"></div>' +
              '<button type="button" class="bz-segment__btn active" data-seg="0">日</button>' +
              '<button type="button" class="bz-segment__btn" data-seg="1">周</button>' +
              '<button type="button" class="bz-segment__btn" data-seg="2">月</button></div>',
            "BzSegment(options, selectedIndex, onSelected)"
          ) +
          apiTable([
            { name: "tabs / options", type: "List<String>", default: "—", desc: "标签文案列表" },
            { name: "selectedIndex", type: "Int", default: "—", desc: "当前选中下标" },
            { name: "onSelected", type: "(Int) -> Unit", default: "—", desc: "选中变化回调" },
          ])
        );
      },
      init: initTabsSegment,
    },
    "switch-checkbox": {
      title: "Switch / Checkbox",
      lead: "表单开关与复选框，主题色轨道与勾选动画。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "BzSwitch",
            "点击切换；可禁用。",
            '<div class="form-row"><span>推送通知</span><div class="bz-switch on" id="demoSwitch" role="switch" tabindex="0"><div class="bz-switch__knob"></div></div></div>' +
              '<div class="form-row"><span>只读项</span><div class="bz-switch disabled" role="switch" aria-disabled="true"><div class="bz-switch__knob"></div></div></div>',
            "BzSwitch(checked, onCheckedChange, enabled)"
          ) +
          demoBlock(
            "BzCheckbox",
            "勾选带轻微缩放。",
            '<div class="form-row"><span>同意用户协议</span><div class="bz-checkbox" id="demoCheckbox" role="checkbox" tabindex="0"></div></div>',
            "BzCheckbox(checked, onCheckedChange, label)"
          ) +
          apiTable([
            { name: "checked", type: "Boolean", default: "—", desc: "是否选中" },
            { name: "onCheckedChange", type: "(Boolean) -> Unit", default: "—", desc: "状态变化" },
            { name: "enabled", type: "Boolean", default: "true", desc: "Switch 是否可用" },
            { name: "label", type: "String?", default: "null", desc: "Checkbox 旁文案" },
          ])
        );
      },
      init: initSwitchCheckbox,
    },
    input: {
      title: "Input 输入框",
      lead: "单行输入 BzInput，圆角描边与主题色光标。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "基础输入",
            "受控 value 与 placeholder。",
            '<input class="bz-input" id="demoInput" type="text" placeholder="请输入昵称" autocomplete="off" />' +
              '<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">当前值：<span id="inputMirror">（空）</span></p>' +
              '<input class="bz-input" style="margin-top:10px" type="text" placeholder="禁用态" disabled />',
            "BzInput(value, onValueChange, placeholder, enabled)"
          ) +
          apiTable([
            { name: "value", type: "String", default: "—", desc: "当前文本" },
            { name: "onValueChange", type: "(String) -> Unit", default: "—", desc: "内容变化" },
            { name: "placeholder", type: "String", default: "\"\"", desc: "占位提示" },
            { name: "enabled", type: "Boolean", default: "true", desc: "是否可编辑" },
          ])
        );
      },
      init: initInput,
    },
    bessel: {
      title: "Bessel / FullLike",
      lead: "直播底部点赞 BzBessel（2s 汇总）；全屏双击区 BzFullLike（3s 汇总，120ms 节流）。",
      render: function () {
        return (
          '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>' +
          demoBlock(
            "BzBessel",
            "底部爱心按钮，点击喷射粒子。",
            '<div class="like-area" id="besselArea"><button type="button" class="like-btn" id="besselBtn" aria-label="点赞">♥</button><p style="font-size:12px;color:var(--text-muted);margin-top:8px">汇总计数：<span id="besselCount">0</span></p></div>',
            "BzBessel(onLikeClick, onLikeClickDelay)"
          ) +
          demoBlock(
            "BzFullLike",
            "在区域内任意位置点击生成气泡。",
            '<div class="full-like-zone" id="fullLikeZone">点击此区域任意位置点赞<div id="fullLikeCount" style="position:absolute;bottom:8px;right:10px;font-size:11px">0 次</div></div>',
            "BzFullLike(onLikeClick, onLikeClickDelay, content)"
          ) +
          apiTable([
            { name: "onLikeClick", type: "() -> Unit", default: "{}", desc: "每次有效点击" },
            { name: "onLikeClickDelay", type: "(Int) -> Unit", default: "{}", desc: "Bessel 2s / FullLike 3s 防抖汇总次数" },
            { name: "icon", type: "ImageVector", default: "Favorite", desc: "BzBessel 底部图标" },
            { name: "content", type: "@Composable", default: "{}", desc: "FullLike 下层内容" },
          ])
        );
      },
      init: initBessel,
    },
  };

  var mainEl = document.getElementById("site-main");
  var sidebarEl = document.getElementById("site-sidebar");

  function buildSidebar() {
    var html = "";
    NAV.forEach(function (group) {
      html += '<div class="sidebar-group"><div class="sidebar-group__title">' + group.title + "</div>";
      group.items.forEach(function (item) {
        var href = item.route === "home" ? "#/" : "#/components/" + item.route;
        html += '<a class="sidebar-link" href="' + href + '" data-route="' + item.route + '">' + item.label + "</a>";
      });
      html += "</div>";
    });
    sidebarEl.innerHTML = html;
  }

  function parseRoute() {
    var hash = location.hash || "#/";
    var m = hash.match(/^#\/components\/([a-z0-9-]+)/i);
    if (m) return m[1];
    return "home";
  }

  function render() {
    var route = parseRoute();
    var page = PAGES[route] || PAGES.home;
    document.title = (page.title || "Breeze UI") + " · Breeze UI For Android";

    var body = "";
    if (page.title && route !== "home") {
      body += '<h1 class="page-title">' + page.title + "</h1>";
      if (page.lead) body += '<p class="page-lead">' + page.lead + "</p>";
    }
    body += page.render();

    mainEl.innerHTML = body;

    sidebarEl.querySelectorAll(".sidebar-link").forEach(function (link) {
      var r = link.getAttribute("data-route");
      link.classList.toggle("active", r === route || (route === "home" && r === "home"));
    });

    bindPressButtons();
    if (page.init) page.init();
    if (route === "theme" || document.getElementById("themeSwatches")) initThemePage();
  }

  function applyTheme(key) {
    var t = THEMES[key] || THEMES.default;
    var root = document.documentElement;
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--secondary", t.secondary);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--light", t.light);
    root.style.setProperty(
      "--gradient",
      "linear-gradient(135deg, " + t.primary + " 0%, " + t.secondary + " 55%, " + t.accent + " 100%)"
    );
    try {
      localStorage.setItem("breeze-docs-theme", key);
    } catch (e) {}
    var sel = document.getElementById("themeSelect");
    if (sel) sel.value = key;
    document.querySelectorAll(".theme-swatch").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-theme") === key);
    });
  }

  function initThemeSelect() {
    var sel = document.getElementById("themeSelect");
    if (!sel) return;
    Object.keys(THEMES).forEach(function (key) {
      var opt = document.createElement("option");
      opt.value = key;
      opt.textContent = THEMES[key].label;
      sel.appendChild(opt);
    });
    var saved = "default";
    try {
      saved = localStorage.getItem("breeze-docs-theme") || "default";
    } catch (e) {}
    applyTheme(saved);
    sel.addEventListener("change", function () {
      applyTheme(sel.value);
    });
  }

  function initThemePage() {
    var wrap = document.getElementById("themeSwatches");
    if (!wrap || wrap.dataset.ready) return;
    wrap.dataset.ready = "1";
    Object.keys(THEMES).forEach(function (key) {
      var t = THEMES[key];
      var el = document.createElement("button");
      el.type = "button";
      el.className = "theme-swatch";
      el.setAttribute("data-theme", key);
      el.innerHTML =
        '<div class="theme-swatch__color" style="background:linear-gradient(135deg,' +
        t.primary +
        "," +
        t.secondary +
        ')"></div>' +
        t.label.split("（")[0];
      el.addEventListener("click", function () {
        applyTheme(key);
      });
      wrap.appendChild(el);
    });
    var saved = "default";
    try {
      saved = localStorage.getItem("breeze-docs-theme") || "default";
    } catch (e) {}
    applyTheme(saved);
    bindPressButtons();
  }

  function bindPressButtons() {
    document.querySelectorAll("[data-press]").forEach(function (btn) {
      if (btn.dataset.pressBound) return;
      btn.dataset.pressBound = "1";
      btn.addEventListener("pointerdown", function () {
        if (!btn.disabled) btn.style.transform = "scale(0.92)";
      });
      btn.addEventListener("pointerup", function () {
        btn.style.transform = "";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });
  }

  function initProgress() {
    var progress = 0.35;
    var fill = document.getElementById("progressFill");
    var label = document.getElementById("progressLabel");
    if (!fill) return;
    function sync() {
      fill.style.width = progress * 100 + "%";
      if (label) label.textContent = Math.round(progress * 100) + "%";
    }
    sync();
    var add = document.getElementById("progressAdd");
    var sub = document.getElementById("progressSub");
    if (add)
      add.addEventListener("click", function () {
        progress = Math.min(1, progress + 0.2);
        sync();
      });
    if (sub)
      sub.addEventListener("click", function () {
        progress = Math.max(0, progress - 0.2);
        sync();
      });
    bindPressButtons();
  }

  function initCellTagCard() {
    document.querySelectorAll("[data-cell]").forEach(function (cell) {
      cell.addEventListener("click", function () {
        cell.style.background = "var(--light)";
        setTimeout(function () {
          cell.style.background = "";
        }, 200);
      });
    });
    document.querySelectorAll("[data-tag]").forEach(function (tag) {
      tag.addEventListener("click", function () {
        tag.style.transform = "scale(0.95)";
        setTimeout(function () {
          tag.style.transform = "";
        }, 150);
      });
    });
    var card = document.getElementById("demoCard");
    if (card) {
      card.addEventListener("click", function () {
        card.querySelector("p").textContent = "已点击 — onClick 回调触发";
      });
    }
  }

  function initTabsSegment() {
    var tabs = document.getElementById("bzTabs");
    var indicator = document.getElementById("tabsIndicator");
    var panel = document.getElementById("tabsPanel");
    var labels = ["首页", "发现", "我的"];
    if (tabs && indicator) {
      tabs.querySelectorAll(".bz-tabs__item").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var idx = parseInt(btn.getAttribute("data-tab"), 10);
          tabs.querySelectorAll(".bz-tabs__item").forEach(function (b) {
            b.classList.toggle("active", b === btn);
          });
          indicator.style.transform = "translateX(" + idx * 100 + "%)";
          if (panel) panel.textContent = "当前：" + labels[idx];
        });
      });
    }
    var seg = document.getElementById("bzSegment");
    var pill = document.getElementById("segmentPill");
    if (seg && pill) {
      seg.querySelectorAll(".bz-segment__btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var idx = parseInt(btn.getAttribute("data-seg"), 10);
          seg.querySelectorAll(".bz-segment__btn").forEach(function (b) {
            b.classList.toggle("active", b === btn);
          });
          pill.style.transform = "translateX(" + idx * 100 + "%)";
        });
      });
    }
  }

  function initSwitchCheckbox() {
    var sw = document.getElementById("demoSwitch");
    if (sw) {
      sw.addEventListener("click", function () {
        var on = sw.classList.toggle("on");
        sw.setAttribute("aria-checked", on ? "true" : "false");
      });
    }
    var chk = document.getElementById("demoCheckbox");
    if (chk) {
      chk.addEventListener("click", function () {
        var checked = chk.classList.toggle("checked");
        chk.setAttribute("aria-checked", checked ? "true" : "false");
      });
    }
  }

  function initInput() {
    var input = document.getElementById("demoInput");
    var mirror = document.getElementById("inputMirror");
    if (!input || !mirror) return;
    input.addEventListener("input", function () {
      mirror.textContent = input.value || "（空）";
    });
  }

  function spawnHearts(container, originX, originY, count) {
    var hearts = ["♥", "❤", "💜", "✨"];
    for (var i = 0; i < count; i++) {
      var h = document.createElement("span");
      h.className = "heart-burst";
      h.textContent = hearts[i % hearts.length];
      var angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      var dist = 40 + Math.random() * 50;
      h.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      h.style.setProperty("--dy", Math.sin(angle) * dist - 30 + "px");
      h.style.left = originX + "px";
      h.style.top = originY + "px";
      container.appendChild(h);
      setTimeout(function (el) {
        return function () {
          el.remove();
        };
      }(h), 950);
    }
  }

  function initBessel() {
    var area = document.getElementById("besselArea");
    var btn = document.getElementById("besselBtn");
    var countEl = document.getElementById("besselCount");
    var total = 0;
    var pending = 0;
    var timer = null;
    if (btn && area) {
      btn.addEventListener("click", function () {
        var rect = btn.getBoundingClientRect();
        var parent = area.getBoundingClientRect();
        spawnHearts(area, rect.left - parent.left + rect.width / 2, rect.top - parent.top, 8);
        btn.style.background = "var(--gradient)";
        btn.style.color = "#fff";
        setTimeout(function () {
          btn.style.background = "";
          btn.style.color = "";
        }, 400);
        pending += 1;
        clearTimeout(timer);
        timer = setTimeout(function () {
          total += pending;
          pending = 0;
          if (countEl) countEl.textContent = String(total);
        }, 2000);
      });
    }
    var zone = document.getElementById("fullLikeZone");
    var fullCount = document.getElementById("fullLikeCount");
    var clicks = 0;
    var lastClick = 0;
    if (zone) {
      zone.addEventListener("click", function (e) {
        var now = Date.now();
        if (lastClick && now - lastClick < 120) return;
        lastClick = now;
        var rect = zone.getBoundingClientRect();
        spawnHearts(zone, e.clientX - rect.left, e.clientY - rect.top, 6);
        clicks += 1;
        if (fullCount) fullCount.textContent = clicks + " 次";
      });
    }
  }

  document.getElementById("mobileMenuBtn")?.addEventListener("click", function () {
    sidebarEl.classList.toggle("open");
  });

  buildSidebar();
  initThemeSelect();
  window.addEventListener("hashchange", render);
  render();

  var ver = document.getElementById("headerVersion");
  if (ver) ver.textContent = "v" + VERSION;
})();
