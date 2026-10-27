# Changelog

All notable changes to **Breeze UI For Android** (`com.breeze.ui:breeze-ui`) are documented here.

## [1.3.0]

First Maven / JitPack release aligned with the Breeze WeChat mini-program UI through **v1.3**.

### Added

- **Jetpack Compose** port of Breeze components (v1.0–v1.3): navigation/layout, forms, feedback, lists, cards, extended pickers, and interactive widgets (`BzAdminTable`, `BzListPage`, `BzBarrage`, `BzEmoji`, `BzFullLike`, `BzBessel`, etc.). See [PORTING.md](./PORTING.md) for the full list.
- **Theme**: `BreezeTheme`, `BreezeThemeVariant` (`default` / `blue` / `purple` / `orange` / `red` / `cyan`), `BreezeTokens`, `BzConfigProvider`, and brand-colored interaction via **`Modifier.bzClickable`** (theme ripple).
- **Motion**: `BreezeMotion` tokens, spring presets, and component animations (overlays, tabs/segment, progress, skeleton shimmer, button press, etc.).
- **Navigation**: **`BzNavTransitions`** and **`NavGraphBuilder.bzPage`** for Navigation Compose page transitions (with animator-duration fallback).
- **Imperative overlays**: `BzToast`, `BzModal`, `BzActionSheet`, `BzToastTop` (host inside `BzPage`).
- **Docs**: Ant Design–style browser gallery ([`docs/site/`](./docs/site/)), [API.md](./docs/API.md), [DEVELOPER_GUIDE.md](./docs/DEVELOPER_GUIDE.md).

### Publishing

- Maven coordinates: `com.breeze.ui:breeze-ui:1.3.0`
- JitPack: `com.github.LeeYaMaster.breeze-ui-for-android:breeze-ui:1.3.0` (after Git tag `1.3.0` on the public repo)
- Min SDK **24**, Compose + Material3 plumbing

### Known limitations

- **`BzStickyHeader`**: list-item style placeholder; true sticky behavior depends on Compose `stickyHeader` APIs ([PORTING.md](./PORTING.md)).
- **`BzAvatar`**: `imageUrl` is accepted in the API but not loaded yet (label / placeholder icon only).
- **Dark theme**: `BreezeTheme` uses a light color scheme only; no dedicated dark variant yet.
- **Imperative overlays** must be used within a `BzPage` host.
- Remaining mini-program–only plugins are out of scope; see `source/docs/组件清单.md`.
