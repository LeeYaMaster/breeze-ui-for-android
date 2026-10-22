# 组件命名对照（微信小程序 → Android Compose）

| 小程序标签 | Android Composable / API |
| ---------- | ------------------------ |
| `bz-page` | `BzPage` |
| `bz-button` | `BzButton` |
| `bz-flex` / `bz-flex-item` | `BzFlex` / `BzFlexItem` |
| `bz-grid` | `BzGrid` |
| `bz-cell` | `BzCell` |
| `bz-tag` | `BzTag` |
| `bz-icon` | `BzIcon` |
| `bz-avatar` | `BzAvatar` |
| `bz-avatar-group` | `BzAvatarGroup` / `BzAvatarGroupItem` |
| `bz-progress` | `BzProgress` |
| `bz-loading` | `BzLoading` |
| `bz-title-bar` | `BzTitleBar` |
| `bz-input` | `BzInput` |
| `bz-textarea` | `BzTextarea` |
| `bz-switch` | `BzSwitch` |
| `bz-checkbox` | `BzCheckbox` |
| `bz-radio-group` | `BzRadioGroup` |
| `bz-rate` | `BzRate` |
| `bz-slider` | `BzSlider` |
| `bz-modal` | `BzModal`（声明式）/ `BzModal.show`（命令式） |
| `bz-action-sheet` | `BzActionSheet.show` |
| `bz-toast` | `BzToast.show` |
| `bz-skeleton` | `BzSkeleton` |
| `bz-empty` | `BzEmpty` |
| `bz-loadmore` | `BzLoadMore` |
| `bz-card` | `BzCard` |
| `bz-list-menu` / `bz-list-menu-item` | `BzListMenu` / `BzListMenuItem` |
| `bz-steps` | `BzSteps` |
| `bz-tabs` | `BzTabs` |
| `bz-segment` | `BzSegment` |
| `theme-wrap` + `theme-*` | `BreezeTheme` + `BreezeThemeVariant` |
| `bz-config-provider` | `BzConfigProvider` |
| `bz-pull-refresh` | `BzPullRefresh` |
| `bz-sticky` | `BzSticky` / `LazyListScope.BzStickyHeader` |
| `bz-waterfall-flow` | `BzWaterfallFlow` |
| `bz-calendar` | `BzCalendar` |
| `bz-picker` | `BzPicker` |
| `bz-double-slider` | `BzDoubleSlider` |
| `bz-color-picker` | `BzColorPicker` |
| `bz-upload` | `BzUpload` |
| `bz-timeline` | `BzTimeline` |
| `bz-table` | `BzTable` |
| `bz-tooltip` | `BzTooltip` |
| `bz-custom` / `bz-custom-pro` | `BzCustomNav` / `BzCustomNavPro` |

主题工具：`utils/theme.js` → `BreezeThemeController` + `BreezeThemeVariant`。
