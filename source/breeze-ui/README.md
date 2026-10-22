# Breeze UI 组件库

本目录为**可独立复制**的微信小程序 UI 组件库，复制到其他项目时只需拷贝整个 `breeze-ui` 文件夹。

## 目录结构

```
breeze-ui/
├── components/          # 小程序组件（约 60 个，每个含 index.js/json/wxml/wxss）
│   ├── button/
│   ├── page/            # 页面布局（内置 toast/modal）
│   ├── config-provider/ # 局部主题 / 圆角 / 字号
│   ├── bz-custom/       # 自定义导航栏
│   ├── modal/
│   └── ...
├── styles/              # 样式体系（tokens / 工具类 / shared / 组件样式入口）
│   ├── index.wxss       # 样式全量入口
│   ├── shared/          # bar、nav、swiper、native-controls 等共用样式
│   └── components/      # 全局 @import 入口（index.wxss）
├── utils/               # 库内部工具（validator、toast、theme、config 等）
├── main.wxss            # 对外样式入口（@import styles/index.wxss）
├── theme.wxss           # 主题色 CSS 变量
├── icon.wxss            # 图标字体
├── iconfont.wxss        # 富文本图标
└── animation.wxss       # 动画
```

## 接入方式

在宿主项目的 `app.wxss` 顶部（相对路径，与 `app.wxss` 同级）：

```css
@import "breeze-ui/main.wxss";
@import "breeze-ui/theme.wxss";
@import "breeze-ui/icon.wxss";
@import "breeze-ui/iconfont.wxss";
@import "breeze-ui/animation.wxss";
```

在 `app.json` 的 `usingComponents` 中按需注册（组件路径以 `/` 开头，相对项目根目录）：

```json
{
  "usingComponents": {
    "bz-button": "/breeze-ui/components/button/index",
    "bz-page": "/breeze-ui/components/page/index"
  }
}
```

完整组件列表见 [docs/组件清单.md](../docs/组件清单.md)。

## 路径约定

| 类型 | 写法 | 示例 |
|------|------|------|
| 样式 `@import` | 相对路径 | `"breeze-ui/main.wxss"`、`"../../styles/shared/form-group.wxss"` |
| 组件注册 | 绝对路径（微信惯例） | `"/breeze-ui/components/button/index"` |

## 样式说明

详见 [styles/README.md](./styles/README.md)。

## 类型定义

各组件 `index.d.ts` 提供 Props / Methods 类型；汇总导出见 `components/index.d.ts`。
