/**
 * 评分组件属性
 */
export interface RateProps {
  /** 星星总数，默认 5 */
  count?: number;
  /** 满分，用于 click 事件 result 计算，默认 100 */
  score?: number;
  /** 当前选中星数，默认 0 */
  value?: number;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
