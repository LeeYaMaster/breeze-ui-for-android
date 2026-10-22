# 移植状态 — Breeze UI For Android

Maven：**`com.breeze.ui:breeze-ui`**。产品名：**Breeze UI For Android**。

## 已移植

### v1.0 基础

导航与布局：`BzPage`、`BzButton`、`BzFlex`、`BzGrid`、`BzCell`、`BzTag`、`BzIcon`、`BzAvatar`、`BzAvatarGroup`、`BzProgress`、`BzLoading`、`BzTitleBar`

表单：`BzInput`、`BzTextarea`、`BzSwitch`、`BzCheckbox`、`BzRadioGroup`、`BzRate`、`BzSlider`

反馈：`BzModal`、`BzActionSheet`、`BzToast`、`BzSkeleton`、`BzEmpty`、`BzLoadMore`

列表与卡片：`BzCard`、`BzListMenu`、`BzSteps`、`BzTabs`、`BzSegment`

主题：`BreezeTheme`、`BreezeThemeVariant`、`BreezeTokens`

### v1.1 动效 + 扩展

`BreezeMotion`、`Modifier.bzClickable`、Overlay/Tabs/Segment/进度/骨架/按钮/加载动效

`BzConfigProvider`、`BzPullRefresh`、`BzSticky`、`BzWaterfallFlow`、`BzCalendar`、`BzPicker`、`BzDoubleSlider`、`BzColorPicker`、`BzUpload`、`BzTimeline`、`BzTable`、`BzTooltip`、`BzCustomNav`、`BzCustomNavPro`

### v1.2 表单与状态

`BzForm`、`BzFormField`、`BzCheckboxGroup`、`BzChoose`、`BzStateBox`、`BzToastTop`、`BzListMessage`（简化聊天行）

## 未移植

| 组件 | 说明 |
| ---- | ---- |
| `bz-admin-table` | 完整管理表（已有轻量 `BzTable`） |
| `bz-list-grid` / `bz-list-page` | 列表场景容器 |
| `bz-emoji` / `bz-barrage` / `bz-full-like` | 互动特效 |
| 其余插件 | 见 `source/docs/组件清单.md` |

## 说明

- 动效：`BreezeMotion.isEnabled()` 可降级。
- 命令式 Toast / Modal / ActionSheet / ToastTop 需在 `BzPage` 内。
- `BzStickyHeader` 当前为列表 item 样式占位；真吸顶依赖 Compose `stickyHeader` API。
