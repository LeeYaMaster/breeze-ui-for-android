# Breeze UI For Android — 开发手册

面向 **应用开发者**（JitPack / Maven Local 接入）与 **库贡献者**（扩展组件、对齐小程序移植）。组件命名见 [NAMING.md](../NAMING.md)，移植进度见 [PORTING.md](../PORTING.md)；公开 API 索引见 [API.md](./API.md)。

**浏览器效果预览**（无需 Gradle / 模拟器）：推荐 [组件文档站](https://leeyamaster.github.io/breeze-ui-for-android/site/)（GitHub Pages 从仓库 **`/docs`** 发布，入口 `docs/index.html` 会跳转到 `docs/site/`）；本地见 [docs/site/index.html](./site/index.html)。旧版单页预览：[docs/preview/index.html](./preview/index.html) — 说明见 [preview/README.md](./preview/README.md)。

---

## 1. 产品定位

**Breeze UI For Android** 将微信小程序 **Breeze UI** 移植为 **Jetpack Compose** 组件库，视觉遵循 Breeze 品牌色（非 Material 默认紫色），Material3 主要用于排版与无障碍 plumbing。

| 项 | 值 |
| --- | --- |
| 产品名 | Breeze UI For Android |
| Maven `groupId` | `com.breeze.ui` |
| Maven `artifactId` | `breeze-ui` |
| 当前库版本 | **1.3.0**（`breeze-ui/build.gradle.kts` 与 `BreezeUi.VERSION`） |
| 最低 SDK | 24 |
| 编译 SDK | 35 |
| Kotlin / JVM | 2.0.21 / 17 |

公开仓库：

- GitHub：https://github.com/LeeYaMaster/breeze-ui-for-android  
- Gitee：https://gitee.com/leeyamaster/breeze-ui-for-android  

> **请勿随意修改** `groupId` / `artifactId`：JitPack 坐标、文档与下游依赖均依赖 `com.breeze.ui:breeze-ui`。

---

## 2. 模块结构

| Gradle 模块 | 路径 | 职责 |
| --- | --- | --- |
| `:breeze-ui` | `breeze-ui/` | 可发布 AAR；公开 API 在 `com.breeze.ui.*` |
| `:app` | `app/` | 演示应用，覆盖各组件与场景页 |

源码包划分：

| 包 | 内容 |
| --- | --- |
| `com.breeze.ui.components` | 声明式 `Bz*` 组件 |
| `com.breeze.ui.theme` | `BreezeTheme`、`BreezeMotion`、`Modifier.bzClickable` 等 |
| `com.breeze.ui.imperative` | `BzToast`、`BzModal`、`BzActionSheet`、`BzToastTop` |
| `com.breeze.ui` | `BreezeUi` 元信息 |

小程序参考实现位于仓库 `source/breeze-ui/`（只读对照，不参与 Android 构建）。

---

## 3. 接入依赖

### 3.1 JitPack（推荐第三方项目）

1. 在 **settings** 增加 JitPack 仓库（多模块工程，模块名为 `breeze-ui`）。

**Kotlin DSL — `settings.gradle.kts`：**

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}
```

**Groovy — `settings.gradle`：**

```gradle
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

2. 在 **app 模块** 添加依赖（`tag` 与库版本一致，例如 `1.3.0`）：

```kotlin
dependencies {
    implementation("com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:1.3.0")
}
```

```gradle
dependencies {
    implementation 'com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:1.3.0'
}
```

JitPack 使用根目录 [`jitpack.yml`](../jitpack.yml)，构建任务为 `:breeze-ui:publishReleasePublicationToMavenLocal`。

### 3.2 Maven Local（本机调试）

```bash
./gradlew :breeze-ui:publishReleasePublicationToMavenLocal
```

在消费方 `settings.gradle.kts` 的 `repositories` 中加入 `mavenLocal()`，然后：

```kotlin
implementation("com.breeze.ui:breeze-ui:1.3.0")
```

### 3.3 与 Compose BOM

库内部使用 Compose BOM（见 `gradle/libs.versions.toml`）。应用侧建议同样通过 BOM 对齐 `androidx.compose` 版本，避免传递依赖冲突。

---

## 4. 快速开始

在 `Activity` / `Fragment` 的 `setContent` 中包裹主题与页面容器：

```kotlin
import com.breeze.ui.components.*
import com.breeze.ui.imperative.BzToast
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeThemeVariant

setContent {
    BreezeTheme(variant = BreezeThemeVariant.Default) {
        BzPage {
            BzTitleBar(title = "首页", useGradient = true)
            BzButton(
                text = "确定",
                pulseHint = true,
                onClick = { BzToast.show("你好") },
            )
            BzCell(
                title = "设置",
                subtitle = "账号与安全",
                showArrow = true,
                onClick = { /* ... */ },
            )
        }
    }
}
```

要点：

- 根布局使用 **`BreezeTheme`**，页面内容放在 **`BzPage`** 内（见下文命令式 API）。
- 组件从 `com.breeze.ui.components` 导入；主题从 `com.breeze.ui.theme` 导入。

更完整的 API 列表见 [API.md](./API.md)。

---

## 5. 主题与设计令牌

### 5.1 `BreezeTheme` 与变体

`BreezeTheme(variant, radius, content)` 注入语义色与圆角。读取当前值：

```kotlin
BreezeTheme.colors.primary
BreezeTheme.colors.variant.gradientBrush
BreezeTheme.radius.md
```

`BreezeThemeVariant` 对应小程序 `theme-wrap.theme-*`：

| 枚举 | 说明 |
| --- | --- |
| `Default` | 品牌默认 `#5b6cff` / `#7c3aed` |
| `Blue` / `Purple` / `Orange` / `Red` / `Cyan` | 预设主题 |

运行时切换（全局状态）可使用 `BreezeThemeController.currentVariant`。

### 5.2 `BreezeTokens`

静态色板与 `namedColor` / `namedLightColor`，对齐小程序 `tokens.wxss`。`BzTag`、`BzButton` 的 `colorName` 等参数会解析这些名称。

### 5.3 局部覆盖 — `BzConfigProvider`

对应 `bz-config-provider`，可局部覆盖 `theme`、`radius`、`fontScale`（`LocalBreezeFontScale`）。

---

## 6. 动效（Motion）

### 6.1 `BreezeMotion`

统一时长与缓动令牌：

| 常量 | 典型用途 |
| --- | --- |
| `DurationFast` (150ms) | 按压、分段器文字色 |
| `DurationNormal` (250ms) | Tab 指示条、进度条、Overlay |
| `DurationSlow` (400ms) | 骨架、点赞气泡 |
| `DurationEmphasis` (500ms) | 主按钮 CTA 呼吸 |
| `EasingStandard` / `EasingEmphasized` 等 | 与 Material 运动习惯对齐的缓动 |

v1.3 弹簧规格（`isEnabled()` 为 false 时使用 `snap()`）：

| 方法 | 典型用途 |
| --- | --- |
| `springPress()` | 按钮、`BzBessel` 爱心按压回弹 |
| `springSmooth()` | `BzProgress` 确定进度靠拢 |
| `springEmphasis()` / `springEmphasisDp()` | `BzTabs`、`BzSegment` 指示条位移 |

辅助方法：`tweenFast()`、`durationMs(base)` 等。

### 6.2 无障碍与「减少动画」

`BreezeMotion.isEnabled()` 读取系统 **Animator 时长缩放**；为 0 时库内动效降级为瞬时（时长 0）。组件内应通过 `durationMs()` 而非硬编码时长。

### 6.3 `Modifier.bzClickable`

品牌色 Ripple 点击反馈（`com.breeze.ui.theme.bzClickable`），替代默认紫色 `clickable`。列表、标签、表单选项等交互优先使用此扩展。

### 6.4 组件动效约定（摘要）

| 区域 | 行为 |
| --- | --- |
| `BzButton` | `springPress` 按压回弹；`pulseHint` 主 CTA 呼吸 |
| `BzTabs` / `BzSegment` | `springEmphasisDp` 指示条 / 滑块位移 |
| `BzProgress` | 弹簧补间；支持 `indeterminate` / `circular` |
| `BzSkeleton` | Shimmer |
| `BzLoading` | 指示器缩放脉动 |
| Overlay（Toast / Modal / ActionSheet） | 淡入淡出 + 位移/缩放 |
| `BzBarrage` | 横向飘字弹幕 |
| `BzBessel` | 底部爱心按钮 + 贝塞尔路径上浮（点击汇总 2s） |
| `BzFullLike` | 全屏任意位置点击出爱心气泡（汇总 3s） |

---

## 7. 命令式 API（必须在 `BzPage` 内）

`BzPage` 通过内部 `BzOverlayHost` 注册 `BzOverlayRegistry`。以下 **单例** 仅在有活跃 `BzPage` 时生效：

| API | 包 | 说明 |
| --- | --- | --- |
| `BzToast` | `imperative` | 居中 Toast：`show` / `success` / `error` / `loading` / `hide` |
| `BzToastTop` | `imperative` | 顶部条 Toast |
| `BzModal` | `imperative` | 模态确认框 |
| `BzActionSheet` | `imperative` | 底部操作表 |

```kotlin
BzPage {
    BzButton(text = "菜单", onClick = {
        BzActionSheet.show(
            title = "操作",
            items = listOf(
                BzActionSheetItem("分享", onClick = { }),
                BzActionSheetItem("删除", destructive = true, onClick = { }),
            ),
        )
    })
}
```

声明式模态请用 `com.breeze.ui.components.BzModal(visible = ...)`（不依赖 Overlay 注册表）。

**反模式**：在 `BzPage` 外调用 `BzToast.show` — 不会显示任何 UI。

---

## 8. 本地运行 Demo

### 8.1 安装到设备 / 模拟器

```bash
./gradlew :app:installDebug
```

或仅编译：

```bash
./gradlew :breeze-ui:assembleRelease :app:assembleDebug
```

### 8.2 Android SDK 路径

在项目根目录创建 `local.properties`（不提交 Git）：

```properties
sdk.dir=/path/to/Android/Sdk
```

Android Studio 会自动生成该文件。CI / 命令行需保证 `ANDROID_HOME` 或 `sdk.dir` 可用。

---

## 9. 发布与版本

### 9.1 版本号来源

- Gradle：`breeze-ui/build.gradle.kts` → `version = "x.y.z"`
- 运行时：`BreezeUi.VERSION`（应与 Gradle 一致）

文档-only 变更 **不必** 升库版本；对外发布新 API 或修复时再 bump。

### 9.2 JitPack 发布流程（维护者）

1. 确保 `main` 上 `version` 与待发 tag 一致。  
2. 在 GitHub 创建 **Git tag**（如 `1.3.0`），触发 JitPack 构建。  
3. 验证：https://jitpack.io/#LeeYaMaster/breeze-ui-for-android  
4. 下游依赖：`com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:<tag>`

**不要** 在未发 tag 时对外承诺固定 JitPack 版本；合并前可用 commit hash 试构建。

### 9.3 Maven 坐标（本地 / 私服）

```
com.breeze.ui:breeze-ui:<version>
```

---

## 10. 贡献指南

### 10.1 命名与对照

新增组件前查阅 [NAMING.md](../NAMING.md)，保持 `Bz` + PascalCase 与小程序 `bz-*` 一致。命令式工具对齐 `source/breeze-ui/utils/*.js`。

### 10.2 移植范围

[PORTING.md](../PORTING.md) 记录已移植 / 未移植清单。v1.3 含列表场景（`BzAdminTable`、`BzListGrid`、`BzListPage`）、互动（`BzBarrage`、`BzEmoji`）、点赞特效 **`BzBessel`**（`bz-bessel`）与 **`BzFullLike`**（`bz-full-like`）：前者为固定底部爱心 + 路径动画，后者为全屏点击区域 + 点击处气泡，汇总防抖分别为 **2s** / **3s**。

### 10.3 如何添加组件

1. 在 `breeze-ui/src/main/java/com/breeze/ui/components/` 新建或扩展 `.kt` 文件（按领域分组：`BzForm.kt`、`BzExtended.kt` 等）。  
2. 使用 `BreezeTheme.colors` / `BreezeTokens` / `bzClickable` / `BreezeMotion`，避免硬编码品牌色。  
3. 若需命令式入口，在 `imperative/` 扩展并确保仅通过 `BzPage` 的 Overlay 挂载。  
4. 在 `:app` 增加演示页，更新 [PORTING.md](../PORTING.md) 与 [API.md](./API.md)。  
5. 运行 `./gradlew :breeze-ui:assembleRelease :app:assembleDebug` 确保通过。

### 10.4 同步公开仓库

```bash
./scripts/push-to-github.sh main   # 需 gh / GITHUB_TOKEN
./scripts/push-to-gitee.sh main    # 需 GITEE_TOKEN
```

---

## 11. 相关文档

| 文档 | 说明 |
| --- | --- |
| [API.md](./API.md) | 公开 Compose API 分类索引 |
| [NAMING.md](../NAMING.md) | 小程序 ↔ Android 命名表 |
| [PORTING.md](../PORTING.md) | 移植进度与限制 |
| [README.md](../README.md) | 仓库概览与快速链接 |
