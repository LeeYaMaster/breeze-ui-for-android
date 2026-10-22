/**
 * Flex 子项属性
 *
 * multiple: 1 → flex-sub，2 → flex-twice，3 → flex-treble（默认 sub）
 * 已 virtualHost，可在外层 `<view class="flex">` 内直接作为 flex 子项使用。
 */
export interface FlexItemProps {
  multiple?: string;
  extraClass?: string;
  customClass?: string;
}
