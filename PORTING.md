# 移植状态 — Breeze UI For Android

Maven：**`com.breeze.ui:breeze-ui:1.3.0`**。JitPack：**`com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:1.3.0`**。产品名：**Breeze UI For Android**。

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

### v1.3 列表场景、互动特效与动效强化

`BzAdminTable`、`BzListGrid`、`BzListPage`（含 `resolveBzListPageViewState`）、`BzBarrage` / `BzBarrageController`、`BzEmoji`、`BzFullLike`

`BreezeMotion.springPress` / `springSmooth` / `springEmphasis`（弹簧按压、进度、Tabs/Segment）

按钮按压回弹、进度条弹簧补间、`BzProgress` 支持 `indeterminate` / `circular`

`BzBessel`（`bz-bessel` 爱心上浮路径动画；事件 `onLikeClick` / `onLikeClickDelay`）

## 未移植 / 阻塞

| 组件 | 说明 |
| ---- | ---- |
| 其余业务插件 | 见 `source/docs/组件清单.md`（如独立聊天页插件等），非通用 UI 原子组件 |

## 说明

- 动效：`BreezeMotion.isEnabled()` 可降级。
- 命令式 Toast / Modal / ActionSheet / ToastTop 需在 `BzPage` 内。
- `BzStickyHeader` 当前为列表 item 样式占位；真吸顶依赖 Compose `stickyHeader` API。
- `BzEmoji` 默认使用 Unicode 表情网格；小程序 TIM CDN 图片 URL 可通过自定义 `emojiList` 传入 `src` 字段供业务自行加载（库内不捆绑 Coil/WebView）。
