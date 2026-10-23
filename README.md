# Breeze UI For Android

将微信小程序 **Breeze UI** 移植为 **Jetpack Compose** Android 组件库，供其他应用通过 Maven / JitPack 依赖。

## 效果预览

无需安装 Android，在浏览器中点击体验按钮、进度条、分段控件与点赞动效等视觉近似演示：

**[打开交互预览 `docs/preview/index.html`](./docs/preview/index.html)** · [预览说明](./docs/preview/README.md)

| 示意 | |
| ---- | ---- |
| ![手机布局示意](./docs/preview/assets/preview-phone.svg) | ![按钮样式示意](./docs/preview/assets/preview-buttons.svg) |

> 此页为 Web 静态预览，真实效果以 Jetpack Compose 库与 `:app` 演示为准。

## 文档

| 文档 | 说明 |
| ---- | ---- |
| [**效果预览（浏览器）**](./docs/preview/index.html) | 无需 Android，交互式查看品牌 UI 与动效近似 |
| [**开发手册**](./docs/DEVELOPER_GUIDE.md) | 接入、主题与动效、命令式 API、本地 Demo、发布与贡献 |
| [**API 文档**](./docs/API.md) | 公开 `Bz*` / 主题 API 分类索引与示例 |
| [NAMING.md](./NAMING.md) | 小程序 ↔ Compose 命名对照 |
| [PORTING.md](./PORTING.md) | 移植进度（含 v1.3 列表与互动组件） |

- **公开仓库（GitHub）**：https://github.com/LeeYaMaster/breeze-ui-for-android
- **公开仓库（Gitee）**：https://gitee.com/leeyamaster/breeze-ui-for-android
- **Cursor 私有 codebase**：https://cursor.com/codebase/levi-li-dev/breeze-ui-for-android

- **产品名**：Breeze UI For Android
- **Maven 本地发布**：`com.breeze.ui:breeze-ui:1.3.0`
- **JitPack**：`com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:1.3.0`（合并后由维护者打 Git tag `1.3.0` 再触发构建）
- **最低 SDK**：24
- **UI**：Compose + Breeze 品牌视觉（非 Material 默认紫色）

品牌默认色：主色 `#5b6cff`、辅色 `#7c3aed`、浅色 `#eef0ff`，渐变 `135deg #5b6cff → #7c3aed → #22d3ee`。主题变体：`default` / `blue` / `purple` / `orange` / `red` / `cyan`。

## 动效（Motion）

库内统一使用 **`BreezeMotion`** 令牌（`DurationFast/Normal/Slow`、`EasingStandard/Emphasized`，以及 `springPress` / `springSmooth` / `springEmphasis` 弹簧规格）。交互默认走 **`Modifier.bzClickable`**（主题色 Ripple）。系统关闭 Animator 时自动降级。

Modal / ActionSheet / Toast、Tabs / Segment 指示器、进度条（含不确定态与圆形）、骨架屏 shimmer、按钮按压回弹与主 CTA 呼吸、`BzBessel` 路径动画等均遵循上述令牌。

## 工程结构

| 模块 | 说明 |
| ---- | ---- |
| `:breeze-ui` | 可发布的 AAR 库 |
| `:app` | 演示应用「Breeze UI For Android」 |

详细说明见 [开发手册](./docs/DEVELOPER_GUIDE.md)；命名对照见 [NAMING.md](./NAMING.md)，移植进度见 [PORTING.md](./PORTING.md)。

## 同步到 GitHub

```bash
chmod +x scripts/push-to-github.sh
# 需 gh auth login 或 export GITHUB_TOKEN=...
./scripts/push-to-github.sh main
```

远程名默认为 `github` → `https://github.com/LeeYaMaster/breeze-ui-for-android.git`。

Gitee（需 `GITEE_TOKEN` 或账号密码）：

```bash
chmod +x scripts/push-to-gitee.sh
export GITEE_TOKEN=...
./scripts/push-to-gitee.sh main
```

## 本地运行

```bash
./gradlew :app:installDebug
```

```bash
./gradlew :breeze-ui:assembleRelease :app:assembleDebug
```

## 在其他项目中使用

当前库版本：**1.3.0**（`group` = `com.breeze.ui`，`artifactId` = `breeze-ui`）。

### JitPack（推荐第三方接入）

1. 在 **settings** 中增加 JitPack 仓库（本仓库为多模块工程，依赖坐标中的模块名为 `breeze-ui`）。

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

2. 在 **app 模块** 添加依赖（发布 tag `1.3.0` 后使用；合并前可用 JitPack 的 commit hash 试构建）：

**Kotlin DSL — `build.gradle.kts`：**

```kotlin
dependencies {
    implementation("com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:1.3.0")
}
```

**Groovy — `build.gradle`：**

```gradle
dependencies {
    implementation 'com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:1.3.0'
}
```

JitPack 构建配置见根目录 [`jitpack.yml`](./jitpack.yml)（执行 `:breeze-ui:publishReleasePublicationToMavenLocal`）。

### Maven Publish（本地 / 自建仓库）

```bash
./gradlew :breeze-ui:publishReleasePublicationToMavenLocal
```

```kotlin
dependencies {
    implementation("com.breeze.ui:breeze-ui:1.3.0")
}
```

## 快速接入

```kotlin
setContent {
    BreezeTheme(variant = BreezeThemeVariant.Default) {
        BzPage {
            BzTitleBar(title = "首页", useGradient = true)
            BzButton(text = "确定", pulseHint = true, onClick = { BzToast.show("你好") })
        }
    }
}
```

命令式 API（需在 `BzPage` 内）：`BzToast`、`BzModal`、`BzActionSheet`。

列表场景与互动组件（`BzListPage`、`BzAdminTable`、`BzBarrage`、`BzEmoji`、`BzBessel`、`BzFullLike` 等）见 [PORTING.md](./PORTING.md) v1.3。
