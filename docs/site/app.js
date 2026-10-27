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

  var NAV = [];
  var PAGES = {};

  var registry = {
    setNav: function (n) {
      NAV = n;
    },
    pages: PAGES,
  };

  function banner() {
    return '<p class="global-banner">Web 预览为近似效果，真机以 Jetpack Compose 为准。</p>';
  }

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

  function homeCardsHtml() {
    var pairs = [];
    NAV.forEach(function (group) {
      group.items.forEach(function (item) {
        if (item.route !== "home") pairs.push([item.route, item.label]);
      });
    });
    return pairs
      .map(function (pair) {
        return (
          '<a class="home-card" href="#/components/' +
          pair[0] +
          '"><strong>' +
          pair[1] +
          "</strong><span>交互演示 + API</span></a>"
        );
      })
      .join("");
  }

  PAGES.home = {
    title: "Breeze UI For Android",
    render: function () {
      return (
        '<div class="home-hero"><p class="page-lead" style="margin:0">将微信小程序 <strong>Breeze UI</strong> 移植为 Jetpack Compose 组件库。本站提供可点击的 Web 近似演示与 API 速查；完整说明见 <a href="../API.md">API.md</a>、<a href="../DEVELOPER_GUIDE.md">开发手册</a>。</p></div>' +
        banner() +
        '<h2 style="font-size:18px;margin-bottom:12px">组件演示（' +
        (NAV.reduce(function (n, g) {
          return n + g.items.filter(function (i) {
            return i.route !== "home";
          }).length;
        }, 0) || "—") +
        ' 个路由）</h2><div class="home-grid">' +
        homeCardsHtml() +
        '</div><p style="margin-top:24px;font-size:13px;color:var(--text-muted)">旧版单页手机预览仍保留：<a href="../preview/index.html">docs/preview/index.html</a></p>'
      );
    },
  };

  var siteCtx = {
    VERSION: VERSION,
    banner: banner,
    apiTable: apiTable,
    demoBlock: demoBlock,
    bindPressButtons: bindPressButtons,
    spawnHearts: spawnHearts,
    initThemePage: initThemePage,
    initProgress: initProgress,
    initCellTagCard: initCellTagCard,
    initTabsSegment: initTabsSegment,
    initSwitchCheckbox: initSwitchCheckbox,
    initInput: initInput,
    initBessel: initBessel,
    initForm: initForm,
    initTextarea: initTextarea,
    initRadio: initRadio,
    initRate: initRate,
    initSlider: initSlider,
    initDoubleSlider: initDoubleSlider,
    initChoose: initChoose,
    initPicker: initPicker,
    initCalendar: initCalendar,
    initColorPicker: initColorPicker,
    initUpload: initUpload,
    initModal: initModal,
    initStateBox: initStateBox,
    initFlexGrid: initFlexGrid,
    initAvatar: initAvatar,
    initSteps: initSteps,
    initTimeline: initTimeline,
    initEmpty: initEmpty,
    initLoadMore: initLoadMore,
    initBarrage: initBarrage,
    initEmoji: initEmoji,
    initAdminTable: initAdminTable,
    initListMessage: initListMessage,
    initWaterfall: initWaterfall,
    initPullRefresh: initPullRefresh,
    initCheckboxGroup: initCheckboxGroup,
    initSwitchOnly: initSwitchOnly,
    initCheckboxOnly: initCheckboxOnly,
    initTabsOnly: initTabsOnly,
    initSegmentOnly: initSegmentOnly,
    initFullLike: initFullLike,
    initNavTransition: initNavTransition,
  };

  if (typeof window.registerBreezeGallery === "function") {
    window.registerBreezeGallery(registry, siteCtx);
  }

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

  function prefersReducedMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function spawnRipple(el, clientX, clientY) {
    if (prefersReducedMotion() || el.disabled) return;
    var rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var x = clientX - rect.left;
    var y = clientY - rect.top;
    var radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );
    var size = radius * 2;
    var ripple = document.createElement("span");
    ripple.className = "bz-ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x - size / 2 + "px";
    ripple.style.top = y - size / 2 + "px";
    el.appendChild(ripple);
    ripple.addEventListener("animationend", function () {
      ripple.remove();
    });
  }

  function bindPressButtons() {
    document.querySelectorAll("[data-press]").forEach(function (btn) {
      if (btn.dataset.pressBound) return;
      btn.dataset.pressBound = "1";
      btn.addEventListener("pointerdown", function (e) {
        if (btn.disabled) return;
        if (typeof e.button === "number" && e.button !== 0) return;
        spawnRipple(btn, e.clientX, e.clientY);
        btn.style.transform = "scale(0.92)";
      });
      btn.addEventListener("click", function (e) {
        if (btn.disabled || e.detail !== 0) return;
        var rect = btn.getBoundingClientRect();
        spawnRipple(btn, rect.left + rect.width / 2, rect.top + rect.height / 2);
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
        var p = card.querySelector("p");
        if (p) p.textContent = "已点击 — onClick 回调触发";
      });
    }
  }

  function initTabsSegment() {
    initTabsOnly();
    initSegmentOnly();
  }

  function initTabsOnly() {
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
  }

  function initSegmentOnly() {
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
    initSwitchOnly();
    initCheckboxOnly();
  }

  function initSwitchOnly() {
    document.querySelectorAll("[data-bz-switch]").forEach(function (sw) {
      if (sw.dataset.bound) return;
      sw.dataset.bound = "1";
      sw.addEventListener("click", function () {
        if (sw.classList.contains("disabled")) return;
        var on = sw.classList.toggle("on");
        sw.setAttribute("aria-checked", on ? "true" : "false");
      });
    });
  }

  function initCheckboxOnly() {
    document.querySelectorAll("[data-bz-checkbox]").forEach(function (chk) {
      if (chk.dataset.bound) return;
      chk.dataset.bound = "1";
      chk.addEventListener("click", function () {
        var checked = chk.classList.toggle("checked");
        chk.setAttribute("aria-checked", checked ? "true" : "false");
      });
    });
  }

  function initCheckboxGroup() {
    var out = document.getElementById("checkboxGroupOut");
    function sync() {
      if (!out) return;
      var vals = [];
      document.querySelectorAll("[data-cb-opt]").forEach(function (el) {
        if (el.classList.contains("checked")) vals.push(el.getAttribute("data-cb-opt"));
      });
      out.textContent = vals.length ? vals.join("、") : "（未选）";
    }
    document.querySelectorAll("[data-cb-opt]").forEach(function (chk) {
      if (chk.dataset.cbBound) return;
      chk.dataset.cbBound = "1";
      chk.addEventListener("click", function () {
        chk.classList.toggle("checked");
        sync();
      });
    });
    sync();
  }

  function initInput() {
    document.querySelectorAll("[data-input-mirror]").forEach(function (input) {
      var mirrorId = input.getAttribute("data-input-mirror");
      var mirror = document.getElementById(mirrorId);
      if (!mirror) return;
      input.addEventListener("input", function () {
        mirror.textContent = input.value || "（空）";
      });
    });
  }

  function initForm() {
    initInput();
    initSwitchOnly();
    var submit = document.getElementById("formSubmit");
    var err = document.getElementById("formNameErr");
    var nameInput = document.getElementById("formName");
    if (submit && nameInput) {
      submit.addEventListener("click", function () {
        var ok = nameInput.value.trim().length > 0;
        if (err) err.style.display = ok ? "none" : "block";
        if (ok) alert("校验通过 — 模拟 onSubmit");
      });
    }
  }

  function initTextarea() {
    var ta = document.getElementById("demoTextarea");
    var mirror = document.getElementById("textareaMirror");
    if (ta && mirror) {
      ta.addEventListener("input", function () {
        mirror.textContent = ta.value.length ? ta.value.length + " 字" : "（空）";
      });
    }
  }

  function initRadio() {
    var out = document.getElementById("radioOut");
    document.querySelectorAll("[data-radio]").forEach(function (row) {
      row.addEventListener("click", function () {
        var val = row.getAttribute("data-radio");
        document.querySelectorAll("[data-radio]").forEach(function (r) {
          r.classList.toggle("active", r === row);
        });
        if (out) out.textContent = val;
      });
    });
  }

  function initRate() {
    var stars = document.querySelectorAll("[data-rate-star]");
    var out = document.getElementById("rateOut");
    stars.forEach(function (star) {
      star.addEventListener("click", function () {
        var v = parseInt(star.getAttribute("data-rate-star"), 10);
        stars.forEach(function (s, i) {
          s.classList.toggle("filled", i < v);
        });
        if (out) out.textContent = String(v);
      });
    });
  }

  function initSlider() {
    var slider = document.getElementById("demoSlider");
    var label = document.getElementById("sliderOut");
    if (!slider) return;
    function sync() {
      if (label) label.textContent = slider.value;
    }
    slider.addEventListener("input", sync);
    sync();
  }

  function initDoubleSlider() {
    var min = document.getElementById("rangeMin");
    var max = document.getElementById("rangeMax");
    var out = document.getElementById("doubleSliderOut");
    if (!min || !max) return;
    function sync() {
      var a = Math.min(parseFloat(min.value), parseFloat(max.value));
      var b = Math.max(parseFloat(min.value), parseFloat(max.value));
      if (out) out.textContent = a + " ~ " + b;
    }
    min.addEventListener("input", sync);
    max.addEventListener("input", sync);
    sync();
  }

  function initChoose() {
    var multi = document.getElementById("chooseMulti");
    var out = document.getElementById("chooseOut");
    if (!multi) return;
    var multiMode = true;
    var single = document.getElementById("chooseSingleToggle");
    if (single) {
      single.addEventListener("click", function () {
        multiMode = !multiMode;
        single.textContent = multiMode ? "当前：多选" : "当前：单选";
        multi.querySelectorAll(".bz-choose-tag").forEach(function (t) {
          t.classList.remove("active");
        });
        if (out) out.textContent = "（未选）";
      });
    }
    multi.querySelectorAll(".bz-choose-tag").forEach(function (tag) {
      tag.addEventListener("click", function () {
        var val = tag.getAttribute("data-val");
        if (multiMode) {
          tag.classList.toggle("active");
        } else {
          multi.querySelectorAll(".bz-choose-tag").forEach(function (t) {
            t.classList.toggle("active", t === tag);
          });
        }
        var selected = [];
        multi.querySelectorAll(".bz-choose-tag.active").forEach(function (t) {
          selected.push(t.getAttribute("data-val"));
        });
        if (out) out.textContent = selected.length ? selected.join("、") : "（未选）";
      });
    });
  }

  function initPicker() {
    var open = document.getElementById("pickerOpen");
    var sheet = document.getElementById("pickerSheet");
    var mask = document.getElementById("pickerMask");
    var label = document.getElementById("pickerValue");
    var options = ["北京", "上海", "广州", "深圳"];
    if (!open || !sheet) return;
    function close() {
      sheet.classList.remove("open");
      if (mask) mask.classList.remove("open");
    }
    open.addEventListener("click", function () {
      sheet.classList.add("open");
      if (mask) mask.classList.add("open");
    });
    if (mask) mask.addEventListener("click", close);
    sheet.querySelectorAll("[data-picker-opt]").forEach(function (row, idx) {
      row.addEventListener("click", function () {
        sheet.querySelectorAll("[data-picker-opt]").forEach(function (r) {
          r.classList.toggle("selected", r === row);
        });
        if (label) label.textContent = options[idx];
        close();
      });
    });
  }

  function initCalendar() {
    var grid = document.getElementById("calGrid");
    var title = document.getElementById("calTitle");
    var out = document.getElementById("calOut");
    if (!grid || !title) return;
    var view = new Date();
    view.setDate(1);
    function renderCal() {
      var y = view.getFullYear();
      var m = view.getMonth();
      title.textContent = y + "年" + (m + 1) + "月";
      var first = new Date(y, m, 1);
      var offset = first.getDay();
      var days = new Date(y, m + 1, 0).getDate();
      var html = "";
      for (var i = 0; i < offset; i++) html += '<span class="cal-cell cal-cell--empty"></span>';
      for (var d = 1; d <= days; d++) {
        html += '<button type="button" class="cal-cell" data-day="' + d + '">' + d + "</button>";
      }
      grid.innerHTML = html;
      grid.querySelectorAll(".cal-cell[data-day]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var day = btn.getAttribute("data-day");
          grid.querySelectorAll(".cal-cell").forEach(function (c) {
            c.classList.remove("selected");
          });
          btn.classList.add("selected");
          if (out) out.textContent = y + "-" + String(m + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
        });
      });
    }
    var prev = document.getElementById("calPrev");
    var next = document.getElementById("calNext");
    if (prev)
      prev.addEventListener("click", function () {
        view.setMonth(view.getMonth() - 1);
        renderCal();
      });
    if (next)
      next.addEventListener("click", function () {
        view.setMonth(view.getMonth() + 1);
        renderCal();
      });
    renderCal();
  }

  function initColorPicker() {
    document.querySelectorAll("[data-color-swatch]").forEach(function (sw) {
      sw.addEventListener("click", function () {
        document.querySelectorAll("[data-color-swatch]").forEach(function (s) {
          s.classList.toggle("selected", s === sw);
        });
        var preview = document.getElementById("colorPreview");
        if (preview) preview.style.background = sw.style.background;
      });
    });
  }

  function initUpload() {
    var add = document.getElementById("uploadAdd");
    var grid = document.getElementById("uploadGrid");
    var countEl = document.getElementById("uploadCount");
    if (!add || !grid) return;
    var count = 0;
    var max = 3;
    add.addEventListener("click", function () {
      if (count >= max) return;
      count += 1;
      var slot = document.createElement("div");
      slot.className = "upload-slot upload-slot--filled";
      slot.textContent = "图" + count;
      grid.insertBefore(slot, add);
      if (countEl) countEl.textContent = count + " / " + max;
      if (count >= max) add.style.display = "none";
    });
  }

  function initModal() {
    var open = document.getElementById("modalOpen");
    var dlg = document.getElementById("demoModal");
    var mask = document.getElementById("demoModalMask");
    function close() {
      if (dlg) dlg.classList.remove("open");
      if (mask) mask.classList.remove("open");
    }
    if (open && dlg) {
      open.addEventListener("click", function () {
        dlg.classList.add("open");
        if (mask) mask.classList.add("open");
      });
    }
    document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", close);
    });
    if (mask) mask.addEventListener("click", close);
  }

  function initStateBox() {
    var sel = document.getElementById("stateBoxSelect");
    var panel = document.getElementById("stateBoxPanel");
    if (!sel || !panel) return;
    var map = {
      Content: '<div class="state-box-content">内容区：列表或表单</div>',
      Loading: '<div class="spinner-wrap"><div class="spinner"></div><span>加载中…</span></div>',
      Skeleton:
        '<div class="skeleton-stack"><div class="bz-skeleton"></div><div class="bz-skeleton"></div><div class="bz-skeleton bz-skeleton--short"></div></div>',
      Error: '<div class="bz-empty"><span class="bz-empty__icon">📭</span><p>加载失败</p><button type="button" class="bz-btn bz-btn--primary bz-btn--sm" data-press>重试</button></div>',
      Empty: '<div class="bz-empty"><span class="bz-empty__icon">📭</span><p>暂无数据</p></div>',
    };
    sel.addEventListener("change", function () {
      panel.innerHTML = map[sel.value] || map.Content;
      bindPressButtons();
    });
  }

  function initFlexGrid() {
    bindPressButtons();
  }

  function initAvatar() {
    bindPressButtons();
  }

  function initSteps() {
    var wrap = document.getElementById("stepsDemo");
    if (!wrap) return;
    var current = 1;
    wrap.querySelectorAll("[data-step-go]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        current = parseInt(btn.getAttribute("data-step-go"), 10);
        wrap.querySelectorAll(".bz-step").forEach(function (step, i) {
          step.classList.toggle("done", i < current);
          step.classList.toggle("active", i === current);
        });
      });
    });
  }

  function initTimeline() {
    bindPressButtons();
  }

  function initEmpty() {
    bindPressButtons();
  }

  function initLoadMore() {
    var sel = document.getElementById("loadMoreStatus");
    var panel = document.getElementById("loadMorePanel");
    if (!sel || !panel) return;
    function render() {
      var s = sel.value;
      if (s === "Loading") panel.innerHTML = '<div class="loadmore-row"><div class="spinner spinner--sm"></div>加载中…</div>';
      else if (s === "NoMore") panel.innerHTML = '<div class="loadmore-row muted">没有更多了</div>';
      else if (s === "Error")
        panel.innerHTML =
          '<div class="loadmore-row"><span>加载失败</span><button type="button" class="bz-btn bz-btn--ghost bz-btn--sm" id="loadMoreRetry" data-press>重试</button></div>';
      else panel.innerHTML = '<div class="loadmore-row muted">上拉加载更多</div>';
      bindPressButtons();
      var retry = document.getElementById("loadMoreRetry");
      if (retry)
        retry.addEventListener("click", function () {
          sel.value = "Loading";
          render();
        });
    }
    sel.addEventListener("change", render);
    render();
  }

  function initBarrage() {
    var lane = document.getElementById("barrageLane");
    var push = document.getElementById("barragePush");
    if (!lane || !push) return;
    var texts = ["欢迎来到直播间", "666", "主播加油", "🎁 礼物+1"];
    push.addEventListener("click", function () {
      var item = document.createElement("span");
      item.className = "barrage-item";
      item.textContent = texts[Math.floor(Math.random() * texts.length)];
      item.style.top = 10 + Math.random() * 60 + "%";
      item.style.animationDuration = 4 + Math.random() * 3 + "s";
      lane.appendChild(item);
      setTimeout(function () {
        item.remove();
      }, 8000);
    });
  }

  function initEmoji() {
    document.querySelectorAll("[data-emoji]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var out = document.getElementById("emojiOut");
        if (out) out.textContent = btn.getAttribute("data-emoji");
      });
    });
  }

  function initAdminTable() {
    document.querySelectorAll("[data-admin-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var row = btn.closest("[data-admin-row]");
        var id = row ? row.getAttribute("data-admin-row") : "?";
        alert("操作：" + btn.getAttribute("data-admin-action") + " · id=" + id);
      });
    });
  }

  function initListMessage() {
    bindPressButtons();
  }

  function initWaterfall() {
    bindPressButtons();
  }

  function initPullRefresh() {
    var zone = document.getElementById("pullZone");
    var hint = document.getElementById("pullHint");
    if (!zone) return;
    var startY = 0;
    zone.addEventListener("pointerdown", function (e) {
      startY = e.clientY;
    });
    zone.addEventListener("pointerup", function (e) {
      if (e.clientY - startY > 80 && hint) {
        hint.textContent = "刷新中…";
        setTimeout(function () {
          hint.textContent = "下拉刷新（松开模拟 onRefresh）";
        }, 1200);
      }
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
  }

  function initNavTransition() {
    var root = document.getElementById("navTransitionDemo");
    var viewport = document.getElementById("navTransitionViewport");
    var pageHome = viewport && viewport.querySelector('[data-nav-page="home"]');
    var pageDetail = viewport && viewport.querySelector('[data-nav-page="detail"]');
    var forwardBtn = document.getElementById("navDemoForward");
    var backBtn = document.getElementById("navDemoBack");
    var reduce = document.getElementById("navDemoReduceMotion");
    if (!root || !viewport || !pageHome || !pageDetail) return;

    var depth = 0;
    var busy = false;

    function durationMs() {
      return reduce && reduce.checked ? 0 : 280;
    }

    function applyDuration() {
      viewport.style.setProperty("--nav-dur", durationMs() + "ms");
    }

    function setIdleHome() {
      pageHome.className = "nav-transition-demo__page nav-transition-demo__page--idle-front";
      pageDetail.className = "nav-transition-demo__page nav-transition-demo__page--idle-back";
      depth = 0;
      if (forwardBtn) forwardBtn.disabled = false;
      if (backBtn) backBtn.disabled = true;
    }

    function setIdleDetail() {
      pageHome.className = "nav-transition-demo__page nav-transition-demo__page--idle-back";
      pageDetail.className = "nav-transition-demo__page nav-transition-demo__page--idle-front";
      depth = 1;
      if (forwardBtn) forwardBtn.disabled = true;
      if (backBtn) backBtn.disabled = false;
    }

    function runTransition(forward) {
      if (busy) return;
      if (forward && depth !== 0) return;
      if (!forward && depth !== 1) return;
      applyDuration();
      var ms = durationMs();
      if (ms <= 0) {
        if (forward) setIdleDetail();
        else setIdleHome();
        return;
      }
      busy = true;
      root.classList.add("nav-transition-demo--animating");
      if (forward) {
        pageHome.className = "nav-transition-demo__page nav-transition-demo__page--exit-forward";
        pageDetail.className = "nav-transition-demo__page nav-transition-demo__page--enter-forward";
      } else {
        pageDetail.className = "nav-transition-demo__page nav-transition-demo__page--exit-back";
        pageHome.className = "nav-transition-demo__page nav-transition-demo__page--enter-back";
      }
      window.setTimeout(function () {
        root.classList.remove("nav-transition-demo--animating");
        if (forward) setIdleDetail();
        else setIdleHome();
        busy = false;
      }, ms);
    }

    setIdleHome();
    applyDuration();
    if (reduce) {
      reduce.addEventListener("change", applyDuration);
    }
    if (forwardBtn) {
      forwardBtn.addEventListener("click", function () {
        runTransition(true);
      });
    }
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        runTransition(false);
      });
    }
  }

  function initFullLike() {
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
