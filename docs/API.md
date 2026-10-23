# Breeze UI For Android — API 文档

基于 `breeze-ui/src/main/java` 当前公开 API 整理。导入路径以 **`com.breeze.ui.components`**、**`com.breeze.ui.theme`**、**`com.breeze.ui.imperative`** 为准。命名对照见 [NAMING.md](../NAMING.md)。

库版本常量：`com.breeze.ui.BreezeUi.VERSION`（当前 **1.3.0**）。移植清单见 [PORTING.md](../PORTING.md)。

---

## 导航与布局

包：`com.breeze.ui.components`（`BzPage.kt`、`BzLayout.kt`）

| API | 用途 | 关键参数 |
| --- | --- | --- |
| **`BzPage`** | 页面根容器；挂载 Toast / Modal / ActionSheet Overlay | `content` |
| **`BzTitleBar`** | 顶栏标题 | `title`, `showBack`, `onBack`, `useGradient`, `actions` |
| **`BzFlex`** | 横向 Flex（`bz-flex`） | `justify`, `align`, `content` |
| **`RowScope.BzFlexItem`** | Flex 子项 | `weight` |
| **`BzGrid`** | 宫格 | `columns`, `items` |
| **`BzCustomNav`** | 自定义导航页（标题栏 + 内容） | `title`, `onBack`, `useGradient`, `content` |
| **`BzCustomNavPro`** | 渐变头 + 主副标题 + 操作区 | `title`, `subtitle`, `onBack`, `actions` |

```kotlin
BzPage {
    BzTitleBar(title = "设置", showBack = true, onBack = { finish() })
    BzFlex(justify = Arrangement.SpaceBetween) {
        BzFlexItem(weight = 1f) { BzTag(text = "标签") }
        BzFlexItem { BzIcon(Icons.Default.Settings) }
    }
}
```

---

## 展示与基础组件

包：`com.breeze.ui.components`（`BzDisplay.kt`、`BzButton.kt`）

| API | 用途 | 关键参数 |
| --- | --- | --- |
| **`BzButton`** | 按钮 | `text`, `loading`, `block`, `round`, `size`, `pulseHint`, `onClick` |
| **`BzButtonSize`** | 尺寸枚举 | `Sm`, `Md`, `Lg` |
| **`BzIcon`** | 图标载体（Material `ImageVector`） | `imageVector`, `tint`, `size` |
| **`BzTag`** | 标签 / 胶囊 | `text`, `colorName`, `light`, `onClick` |
| **`BzCell`** | 列表单元格 | `title`, `subtitle`, `value`, `showArrow`, `leading` |
| **`BzAvatar`** | 圆形头像（文字或占位图标） | `label`, `size`, `showAttentionPulse` |
| **`BzAvatarGroup`** / **`BzAvatarGroupItem`** | 头像叠放 | `overlap`, `index` |
| **`BzProgress`** | 线性 / 圆形进度 | `progress`, `indeterminate`, `circular`, `color` |
| **`BzLoading`** | 加载指示 | `text`, `size` |

确定进度使用 `BreezeMotion.springSmooth()` 补间；`indeterminate = true` 时不读 `progress`；`circular = true` 时渲染 `CircularProgressIndicator`。

```kotlin
BzButton(text = "提交", loading = saving, block = true, pulseHint = true, onClick = onSubmit)
BzProgress(progress = 0.65f)
BzProgress(progress = 0f, indeterminate = true, circular = true)
```

---

## 表单

包：`com.breeze.ui.components`（`BzForm.kt`、`BzFormLayout.kt`）

| API | 用途 | 关键参数 |
| --- | --- | --- |
| **`BzInput`** | 单行输入 | `value`, `onValueChange`, `placeholder` |
| **`BzTextarea`** | 多行输入 | `value`, `minLines` |
| **`BzSwitch`** | 开关 | `checked`, `onCheckedChange` |
| **`BzCheckbox`** | 复选框 | `checked`, `label` |
| **`BzRadioGroup`** | 单选组 | `options: List<BzRadioOption>`, `selected`, `onSelected` |
| **`BzRadioOption`** | 单选项数据 | `value`, `label` |
| **`BzRate`** | 星级评分 | `value`, `count`, `onValueChange` |
| **`BzSlider`** | 滑块 | `value`, `valueRange` |
| **`BzForm`** | 表单白底容器 | `content` |
| **`BzFormField`** | 标签 + 控件行 | `label`, `required`, `errorMessage`, `content` |
| **`BzCheckboxGroup`** | 多选组 | `options`, `checked: Set<String>`, `blockLayout` |
| **`BzCheckboxOption`** | 多选项数据 | `value`, `label` |
| **`BzChoose`** | 胶囊选择（基于 `BzTag`） | `options`, `selected`, `multi` |

```kotlin
var name by remember { mutableStateOf("") }
BzForm {
    BzFormField(label = "姓名", required = true) {
        BzInput(value = name, onValueChange = { name = it }, placeholder = "请输入")
    }
}
```

---

## 反馈与状态

包：`com.breeze.ui.components`（`BzFeedback.kt`、`BzFormLayout.kt`）

| API | 用途 | 关键参数 |
| --- | --- | --- |
| **`BzModal`**（components） | 声明式对话框 | `visible`, `title`, `message`, `onConfirm`, `onDismiss` |
| **`BzSkeleton`** | 骨架条 | `height` |
| **`BzEmpty`** | 空状态 | `title`, `description`, `action` |
| **`BzLoadMore`** | 列表底部加载更多 | `status: BzLoadMoreStatus`, `onRetry` |
| **`BzLoadMoreStatus`** | 加载更多状态 | `Idle`, `Loading`, `NoMore`, `Error` |
| **`BzStateBox`** | 多状态容器 | `state: BzStateBoxView`, `onRetry`, `content` |
| **`BzStateBoxView`** | 状态枚举 | `Content`, `Loading`, `Skeleton`, `Error`, `Empty` |

```kotlin
BzStateBox(state = viewState, onRetry = { reload() }) {
    LazyColumn { /* 列表 */ }
}
```

---

## 列表、卡片与导航控件

包：`com.breeze.ui.components`（`BzList.kt`、`BzListMessage.kt`、`BzScenarios.kt`）

| API | 用途 | 关键参数 |
| --- | --- | --- |
| **`BzCard`** | 卡片 | `title`, `onClick`, `content` |
| **`BzListMenu`** / **`BzListMenuItem`** | 分组菜单列表 | `title`, `icon`, `onClick` |
| **`BzSteps`** | 步骤条 | `steps: List<BzStep>`, `current` |
| **`BzStep`** | 步骤数据 | `title`, `description` |
| **`BzTabs`** | 顶部 Tab + 指示条 | `tabs`, `selectedIndex`, `onSelected` |
| **`BzSegment`** | 分段选择器 | `options`, `selectedIndex` |
| **`BzListMessage`** | 简化聊天气泡列表 | `messages: List<BzChatMessage>` |
| **`BzChatMessage`** | 消息行 | `text`, `isSelf`, `time` |
| **`BzAdminTable`** | 管理表格（封面 + 操作列） | `list`, `header`, `showView/Update/Delete`, `onAction` |
| **`BzAdminTableRow`** / **`BzAdminTableHeader`** | 表数据 | `id`, `name`, `cover`, `time` |
| **`BzAdminTableAction`** | 操作类型 | `Show`, `Update`, `Del` |
| **`BzListGrid`** | 图标宫格入口 | `data`, `gridCol`, `onItemClick` |
| **`BzListGridItem`** | 宫格项 | `name`, `icon`, `badge`, `colorName` |
| **`BzListPage`** | 列表页范式（刷新 + 状态 + 加载更多） | `refreshing`, `loading`, `empty`, `error`, `loadMore`, `content` |
| **`BzListPageLoadMore`** | 页脚加载状态 | `None`, `Loading`, `Over`, `Error`, `Custom` |
| **`resolveBzListPageViewState`** | 解析 `BzStateBoxView`（与小程序优先级对齐） | `loading`, `skeleton`, `error`, `empty` |

```kotlin
BzListPage(
    refreshing = refreshing,
    onRefresh = { refresh() },
    loadMore = BzListPageLoadMore.Loading,
    onLoadMore = { loadNextPage() },
) {
    items.forEach { BzCell(title = it.title, onClick = { }) }
}
```

---

## 扩展组件

包：`com.breeze.ui.components`（`BzExtended.kt`、`BzConfigProvider.kt`）

| API | 用途 | 关键参数 |
| --- | --- | --- |
| **`BzConfigProvider`** | 局部主题 / 圆角 / 字号 | `theme`, `radius`, `fontScale` |
| **`LocalBreezeFontScale`** | 字号缩放 CompositionLocal | — |
| **`BzPullRefresh`** | 下拉刷新（Material3） | `refreshing`, `onRefresh`, `content` |
| **`BzSticky`** | 吸顶条样式（配合 `stickyHeader`） | `content` |
| **`LazyListScope.BzStickyHeader`** | Lazy 列表吸顶占位 item | `key`, `content` |
| **`BzWaterfallFlow`** | 瀑布流 | `columns`, `items: List<BzWaterfallItem>` |
| **`BzWaterfallItem`** | 瀑布流单元 | `id`, `label`, `heightDp`, `color` |
| **`BzCalendar`** | 月历 | `selected: LocalDate`, `onSelect`, `month` |
| **`BzPicker`** | 底部选项列表弹层 | `visible`, `options`, `selectedIndex` |
| **`BzDoubleSlider`** | 区间滑块 | `range`, `onRangeChange`, `valueRange` |
| **`BzColorPicker`** | 预设色 + 选择 | `selected`, `onSelected` |
| **`BzUpload`** | 上传格 UI（无内置选图） | `imageCount`, `maxCount`, `onAddClick` |
| **`BzTimeline`** | 时间轴 | `entries: List<BzTimelineEntry>` |
| **`BzTimelineEntry`** | 时间节点 | `title`, `time`, `content` |
| **`BzTable`** | 轻量表格 | `columns`, `rows: Map` |
| **`BzTableColumn`** | 列定义 | `key`, `title`, `weight` |
| **`BzTooltip`** | 点击显示文字提示 | `text`, `content`（锚点） |

```kotlin
BzPullRefresh(refreshing = isRefreshing, onRefresh = { viewModel.refresh() }) {
    LazyColumn { /* ... */ }
}
```

---

## 互动与场景特效

包：`com.breeze.ui.components`（`BzInteractive.kt`、`BzBessel.kt`、`BzScenarios.kt`）

| API | 用途 | 关键参数 |
| --- | --- | --- |
| **`BzBarrage`** | 弹幕层 | `controller`, `content`（上下 slot） |
| **`BzBarrageController`** | `push` / `create` 弹幕 | `items`（只读观察） |
| **`rememberBzBarrageController`** | 记住控制器并定时清理 | — |
| **`BzBarrageItem`** | 弹幕数据 | `text`, `status`, `gift`, `topPercent`, `durationSec`, `color` |
| **`BzEmoji`** | 表情网格 | `emojiList`, `columns`, `onChooseEmoji` |
| **`BzEmojiItem`** | 表情项（`src` 可承载 URL） | `id`, `emoji`, `src` |
| **`BzBessel`** | `bz-bessel` 底部爱心 + 贝塞尔路径上浮 | `onLikeClick`, `onLikeClickDelay(count)`（**2s** 汇总）, `icon` |
| **`BzFullLike`** | `bz-full-like` 全屏点击区爱心气泡 | `onLikeClick`, `onLikeClickDelay(count)`（**3s** 汇总）, `content` |

**`BzBessel` vs `BzFullLike`**：`BzBessel` 固定高度区域与底部可点爱心，气泡沿小程序 CSS 关键帧水平摆动上浮；`BzFullLike` 铺满父布局，在点击坐标生成气泡，带 120ms 连点节流。直播/短视频底部栏点赞用前者，全屏双击点赞用后者。

```kotlin
val barrage = rememberBzBarrageController()
BzBarrage(controller = barrage) {
    BzButton(text = "发弹幕", onClick = { barrage.push("666") })
}

BzBessel(
    onLikeClick = { /* likeClick */ },
    onLikeClickDelay = { count -> /* 2s 内累计 */ },
)
```

```kotlin
BzFullLike(
    onLikeClick = { },
    onLikeClickDelay = { count -> /* 3s 内累计 */ },
) {
    /* 视频画面等内容 */
}
```

---

## 命令式 Overlay

包：`com.breeze.ui.imperative`（`BzOverlayController.kt`）

须在 **`BzPage`** 子树内调用。

| API | 用途 | 主要方法 |
| --- | --- | --- |
| **`BzToast`** | 居中 Toast | `show`, `success`, `error`, `loading`, `hide` |
| **`BzToastIcon`** | Toast 图标类型 | `None`, `Success`, `Error`, `Loading` |
| **`BzToastTop`** | 顶部提示条 | `show`, `hide` |
| **`BzModal`** | 模态框 | `show(title, message, …)`, `hide` |
| **`BzActionSheet`** | 底部菜单 | `show(title, items)`, `hide` |
| **`BzActionSheetItem`** | 菜单项 | `label`, `destructive`, `onClick` |

```kotlin
BzToast.success("保存成功")
BzModal.show("提示", "确认删除？", onConfirm = { delete() })
```

---

## 主题与动效

包：`com.breeze.ui.theme`

| API | 用途 | 说明 |
| --- | --- | --- |
| **`BreezeTheme`** | 根主题 Composable | `variant`, `radius`, `content` |
| **`BreezeTheme`**（object） | 读取当前主题 | `colors`, `radius` |
| **`BreezeColors`** | 语义色数据类 | `primary`, `secondary`, `light`, `pageBackground`, … |
| **`BreezeThemeVariant`** | 主题变体枚举 | `Default`, `Blue`, `Purple`, …；`gradientBrush`, `fromId` |
| **`BreezeThemeController`** | 全局变体状态 | `currentVariant` |
| **`BreezeRadius`** | 圆角令牌 | `Sm` / `Md` / `Lg` 预设 |
| **`BreezeTokens`** | 静态色板 | `namedColor`, `namedLightColor` |
| **`BreezeMotion`** | 动效时长、缓动与弹簧 | `Duration*`, `Easing*`, `isEnabled()`, `durationMs`, `springPress()`, `springSmooth()`, `springEmphasis()`, `springEmphasisDp()` |
| **`Modifier.bzClickable`** | 品牌 Ripple 点击 | `enabled`, `onClick`, … |

```kotlin
BreezeTheme(variant = BreezeThemeVariant.Purple, radius = BreezeRadius.Lg) {
    val primary = BreezeTheme.colors.primary
    Box(Modifier.bzClickable { }) { /* ... */ }
}
```

---

## 元信息

包：`com.breeze.ui`

| API | 说明 |
| --- | --- |
| **`BreezeUi.LIBRARY_NAME`** | `"Breeze UI For Android"` |
| **`BreezeUi.VERSION`** | 与 Gradle `version` 一致 |

---

## 内部 API（请勿依赖）

以下类型位于 `imperative` 包但标记为 `internal`，或仅供库内使用，**不构成稳定公开 API**：

- `BzOverlayHost`, `BzOverlayState`, `BzOverlayRegistry`
- `BzBarrageController` 构造函数为 `internal`（请用 `rememberBzBarrageController()`）

升级库版本时请优先查阅 [PORTING.md](../PORTING.md) 与本文档变更。
