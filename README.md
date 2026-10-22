# Breeze UI For Android

将微信小程序 **Breeze UI** 移植为 **Jetpack Compose** Android 组件库，供其他应用通过 Maven / JitPack 依赖。

- **公开仓库（GitHub）**：https://github.com/LeeYaMaster/breeze-ui-for-android
- **公开仓库（Gitee）**：https://gitee.com/leeyamaster/breeze-ui-for-android
- **Cursor 私有 codebase**：https://cursor.com/codebase/levi-li-dev/breeze-ui-for-android

- **产品名**：Breeze UI For Android
- **Maven**：`com.breeze.ui:breeze-ui`（坐标未改，无需迁移）
- **最低 SDK**：24
- **UI**：Compose + Breeze 品牌视觉（非 Material 默认紫色）

品牌默认色：主色 `#5b6cff`、辅色 `#7c3aed`、浅色 `#eef0ff`，渐变 `135deg #5b6cff → #7c3aed → #22d3ee`。主题变体：`default` / `blue` / `purple` / `orange` / `red` / `cyan`。

## 动效（Motion）

库内统一使用 **`BreezeMotion`** 令牌（`DurationFast/Normal/Slow`、`EasingStandard/Emphasized` 等）。交互默认走 **`Modifier.bzClickable`**（主题色 Ripple）。系统关闭 Animator 时自动降级。

Modal / ActionSheet / Toast、Tabs / Segment 指示器、进度条、骨架屏 shimmer、按钮按压与主 CTA 呼吸等均遵循上述令牌。

## 工程结构

| 模块 | 说明 |
| ---- | ---- |
| `:breeze-ui` | 可发布的 AAR 库 |
| `:app` | 演示应用「Breeze UI For Android」 |

命名对照见 [NAMING.md](./NAMING.md)，移植进度见 [PORTING.md](./PORTING.md)。

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

### JitPack

```gradle
repositories { maven { url 'https://jitpack.io' } }
dependencies {
    implementation 'com.github.<你的用户名>.<仓库名>:breeze-ui:1.0.0'
}
```

### Maven Publish（本地）

```bash
./gradlew :breeze-ui:publishReleasePublicationToMavenLocal
```

```gradle
dependencies { implementation 'com.breeze.ui:breeze-ui:1.0.0' }
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
