/**
 * 卡片组件属性
 */
export interface CardProps {
  /** 卡片类型 */
  type?: string;
  /** 是否为卡片样式 */
  isCard?: boolean;
  /** 卡片数据数组 */
  data?: any[];
  /** 模式 */
  mode?: string;
  /** 列配置 */
  column?: string;
  /** 加载中 */
  loading?: boolean;
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}
