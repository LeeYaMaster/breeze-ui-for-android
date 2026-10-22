# Breeze UI

<!-- coverage-badge:start -->
**组件覆盖率** · **60** 组件 · **58** 有演示 · **15** 有 Playground · **4** 模块单测（32 用例）

> 由 `node scripts/gen-coverage-badge.js` 根据 [docs/组件清单.md](docs/组件清单.md) 自动生成 · 更新于 2026-07-06
<!-- coverage-badge:end -->

基于 ColorUI 的**微信小程序原生** UI 组件库。在原有样式体系上做了组件化封装与扩展，覆盖导航布局、表单校验、反馈提示、列表范式、瀑布流、日历、弹幕、全屏点赞、探探滑动、富文本、拖拽/长列表等场景。组件均带 JSDoc 与 `.d.ts`，支持 JS / TS 类型提示。

---

## 文档索引

| 文档 | 说明 |
| --- | --- |
| **[快速开始](docs/快速开始.md)** | 3 步接入已有项目、命令式 API、表单与换肤 |
| **[组件清单](docs/组件清单.md)** | 全部组件 + 演示页路径 + `app.json` 注册示例 |
| **[演示导航](docs/演示导航.md)** | Tab 分类（元素 / 组件 / 页面 / 扩展 / 关于）与维护方式 |
| **[页面状态约定](docs/页面状态约定.md)** | `bz-page` / `bz-state-box` / `bz-list-page` 分工与四态优先级 |
| **[主题色说明](docs/主题色说明.md)** | CSS 变量换肤原理与 `theme-wrap` 用法 |
| **[类型说明](docs/类型说明.md)** | JS / TS 类型提示与 `.d.ts` 引用方式 |
| **[改动学习笔记](docs/learn.md)** | 表单、反馈层、Flex、工程化等设计说明（维护者向） |
| **[更新日志](CHANGELOG.md)** | 版本变更记录 |

---

## 快速接入（3 步）

1. **复制** 本仓库的 **`breeze-ui`** 文件夹到你的小程序根目录（与 `app.js`、`pages` 同级）。
2. **在 `app.wxss` 顶部** 引入样式（详见 [快速开始](docs/快速开始.md)）：
   ```css
   @import "breeze-ui/main.wxss";
   @import "breeze-ui/theme.wxss";
   @import "breeze-ui/icon.wxss";
   @import "breeze-ui/iconfont.wxss";
   @import "breeze-ui/animation.wxss";
   ```
3. **在 `app.json` 的 `usingComponents`** 中按需注册，例如：
   ```json
   "bz-button": "/breeze-ui/components/button/index"
   ```

推荐用 **`bz-page`** 包裹页面以启用 Toast / Modal / ActionSheet 命令式 API；完整注册列表示例见 [组件清单](docs/组件清单.md)。

---

## 运行演示

用 **微信开发者工具** 打开本仓库根目录即可预览：

1. 导入项目 → 选择仓库根目录
2. 底部 Tab：**元素 / 组件 / 页面 / 扩展 / 关于**
3. **关于** Tab 提供演示控制台（主题、TabBar、ConfigProvider 导出）及组件生成器入口

分类规则与新增 demo 维护方式见 [演示导航](docs/演示导航.md)。

---

## 项目结构

本仓库 = **组件库** + **演示工程**：

```
color-ui-component/
├── breeze-ui/              # 组件库（复制到其他项目只需此文件夹）
│   ├── components/         # 小程序组件（约 60 个目录）
│   ├── styles/             # 样式体系（tokens / 工具类 / shared）
│   ├── utils/              # 库内部工具（toast、validator、theme 等）
│   ├── main.wxss           # 样式入口
│   └── README.md           # 库目录说明
├── pages/                  # 演示页面
├── utils/                  # 演示工程工具（demo-catalog、theme-behavior 等）
├── docs/                   # 文档
├── scripts/                # 校验与单测脚本
└── app.js / app.json / app.wxss
```

> 样式 `@import` 使用相对路径；`app.json` 组件注册路径以 `/breeze-ui/components/...` 为准。修改目录后若编译异常，请在微信开发者工具中 **清缓存 → 重新编译**。

---

## 开发维护

| 命令 | 说明 |
| --- | --- |
| `npm run check` | 校验项目结构、组件文件与演示 catalog 路径 |
| `npm test` | 运行 validator 单测 |
| `npm run test:all` | 结构校验 + 全部单测（validator / state-box / skeleton / toast） |
| `npm run coverage:badge` | 从组件清单统计覆盖率并更新 README 徽章 |

仓库已包含 `.workflow/TestPipeline.yml`。在 Gitee 开通 [Gitee Go](https://gitee.com/features/gitee_go) 后，push / PR 到 `master` 或 `main` 会自动跑 `npm run test:all`。

---

## 图片资源

链接: https://pan.baidu.com/s/1M83k42FQq6-W9qr1ehkmUw 提取码: hncy

---

## 项目截图

![输入图片说明](introduce/1.png)
![输入图片说明](introduce/10.png)
![输入图片说明](introduce/4.png)
![输入图片说明](introduce/2.png)
![输入图片说明](introduce/3.png)
![输入图片说明](introduce/5.png)
![输入图片说明](introduce/6.png)
![输入图片说明](introduce/7.png)
![输入图片说明](introduce/8.png)
![输入图片说明](introduce/9.png)
