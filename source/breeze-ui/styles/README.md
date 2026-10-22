# 样式目录说明

`main.wxss` 已拆分为分层结构，便于后续重构时替换设计令牌、按需引入样式。

## 目录结构

```
breeze-ui/styles/
├── index.wxss           # 全量入口
├── tokens.wxss
├── base.wxss
├── shared/              # 多组件 / 页面共用样式源文件
│   ├── form-group.wxss
│   ├── list-base.wxss
│   ├── native-controls.wxss   # switch / checkbox / radio 原生控件
│   ├── bar.wxss               # .bz-bar 操作条
│   ├── nav.wxss               # 横向 Tab 导航 .nav .bz-item
│   └── swiper.wxss            # 轮播辅助类
├── utilities/           # 工具类
└── components/
    └── index.wxss       # 全局组件样式入口（直接 @import 源文件）

breeze-ui/components/<名>/index.wxss   # 已内聚组件的样式源文件
```

## 引入方式

### 全量（与原来一致）

```css
@import "breeze-ui/main.wxss";
/* 或 */
@import "breeze-ui/styles/index.wxss";
```

### 按需引入

仅需布局与颜色工具类：

```css
@import "breeze-ui/styles/tokens.wxss";
@import "breeze-ui/styles/base.wxss";
@import "breeze-ui/styles/utilities/index.wxss";
```

仅需按钮（直接引源文件）：

```css
@import "breeze-ui/styles/tokens.wxss";
@import "breeze-ui/components/button/index.wxss";
```

## 全局加载链路

页面里直接写 `class="bz-btn"` 时，样式通过以下链路全局加载：

```
app.wxss → main.wxss → styles/components/index.wxss → components/button/index.wxss
```

`styles/components/index.wxss` 直接引用各源文件，无中间转发层。

## 样式内聚

| 类型       | 源文件位置                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| 单组件     | `components/button/`、`loading/`、`list-message/`、`switch/` 等            |
| 多组件共享 | `styles/shared/form-group.wxss`、`native-controls.wxss`、`bar.wxss` 等     |
| 无独立组件 | `bar.wxss`、`nav.wxss`、`swiper.wxss` 作为页面级工具类保留在 `shared/`     |

改样式请编辑对应源文件；全局入口 `styles/components/index.wxss` 仅在新增/移除组件时需同步维护 import 列表。

## 重构建议

| 阶段            | 操作                                               |
| --------------- | -------------------------------------------------- |
| 换肤            | 只改 `tokens.wxss`                                 |
| 去 ColorUI 命名 | 在 `components/` 内逐步将 `bz-*` 改为自有前缀      |
| 按需加载        | 业务页只 `@import` 所需 shared + 组件 wxss         |
