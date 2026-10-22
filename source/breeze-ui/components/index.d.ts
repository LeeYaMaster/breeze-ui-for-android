/**
 * Breeze UI 组件库类型定义汇总
 * 供 TypeScript 用户按需引用各组件 Props / Methods 类型
 *
 * 使用示例（在 .ts 页面中）：
 * import type { ButtonProps, ModalProps, ToastMethods } from '/breeze-ui/components';
 *
 * // 为 selectComponent 结果标注类型
 * const toast = this.selectComponent('#toast') as WechatMiniprogram.Component.TrivialInstance & ToastMethods;
 * toast.setShow('success', '操作成功');
 */

// 基础与布局
export type { ButtonProps } from './button';
export type { FlexProps } from './flex';
export type { FlexItemProps } from './flex-item';
export type { GridProps } from './grid';
export type { IconProps } from './icon';
export type { TagProps } from './tag';
export type { AvatarProps } from './avatar';
export type { AvatarGroupProps } from './avatar-group';
export type { ProgressProps } from './progress';

// 导航与标题
export type { PageProps } from './page';
export type { ConfigProviderProps, ConfigProviderMethods, BzConfig } from './config-provider';
export type { BzCustomProps, BzCustomMethods } from './bz-custom';
export type { BzCustomProProps, BzCustomProMethods } from './bz-custom-pro';
export type { TitleBarProps, TitleBarMethods } from './title-bar';

// 表单与选择
export type {
  FormProps,
  FormMethods,
  FormFieldProps,
  FormFieldMethods,
  FormRule,
  FormValidateResult,
} from './form';
export type { InputProps, InputMethods } from './input';
export type { TextareaProps, TextareaMethods } from './textarea';
export type { SwitchProps } from './switch';
export type { CheckboxProps } from './checkbox';
export type { PickerProps, PickerMethods } from './picker';
export type { RadioGroupProps, RadioGroupOption } from './radio-group';
export type { CheckboxGroupProps, CheckboxGroupOption } from './checkbox-group';
export type { ChooseProps } from './choose';
export type { RateProps } from './rate';
export type { DoubleSliderProps, DoubleSliderRangeChangeDetail } from './double-slider';
export type { ColorPickerProps, ColorPickerChangeDetail } from './color-picker';

// 反馈与展示
export type { ActionSheetProps, ActionSheetMethods, ActionSheetShowOptions, ActionSheetItem } from './action-sheet';
export type { ActionSheetAPI } from '../utils/action-sheet';
export type { TabsProps, TabsChangeDetail, TabItem } from './tabs';
export type { CellProps } from './cell';
export type { SliderProps, SliderChangeDetail } from './slider';
export type { PullRefreshProps } from './pull-refresh';
export type { ModalProps, ModalMethods, ModalShowOptions as ComponentModalShowOptions } from './modal';
export type { ModalAPI, ModalShowOptions } from '../utils/modal';
export type { ToastMethods, ToastProps, ToastShowOptions } from './toast';
export type { ToastAPI, ToastShowOptions as UtilsToastShowOptions, ToastTopAPI } from '../utils/toast';
export type { ToastTopProps, ToastTopMethods, ToastTopShowOptions } from './toast-top';
export type { ToastTopProps, ToastTopMethods } from './toast-top';
export type { TooltipProps } from './tooltip';
export type { SkeletonProps } from './skeleton';
export type { EmptyProps } from './empty';
export type { StateBoxProps } from './state-box';
export type { ListPageProps } from './list-page';
export type { LoadmoreProps } from './loadmore';
export type { LoadingProps } from './loading';

// 列表与卡片
export type { SegmentProps, SegmentMethods } from './segment';
export type { StepsProps } from './steps';
export type { CardProps } from './card';
export type { ListMenuProps } from './list-menu';
export type { ListMenuItemProps } from './list-menu-item';
export type { ListMessageProps } from './list-message';
export type { ListGridProps } from './list-grid';
export type { TableProps, TableMethods } from './table';
export type { AdminTableProps, AdminTableMethods } from './admin-table';

// 扩展组件
export type { StickyProps } from './sticky';
export type { UploadProps, UploadMethods } from './upload';
export type { CalendarMethods } from './calendar';
export type { WaterfallFlowProps, WaterfallFlowMethods } from './waterfall-flow';
export type { BarrageCreateOption, BarrageMethods } from './barrage';
export type { FullLikeProps } from './full-like';
export type { BesselProps } from './bessel';
export type { EmojiProps } from './emoji';
export type { TimelineProps } from './timeline';
export type { ConfigAPI, BzConfig as UtilsBzConfig } from '../utils/config';
