/**
 * 弹幕组件，通过 selectComponent 调用 create 添加弹幕。
 */
export interface BarrageProps {
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/** 创建弹幕的选项 */
export interface BarrageCreateOption {
  /** 弹幕文字 */
  text: string;
  /** 状态（如 'like'） */
  status: string;
  /** 礼物等，默认 0 */
  gift?: number;
}

/**
 * 弹幕组件实例方法
 */
export interface BarrageMethods {
  /** 创建一条弹幕对象并返回 */
  create(object: BarrageCreateOption): Record<string, any>;
  /** 创建并追加一条弹幕到数据中，返回创建的弹幕对象 */
  push(object: BarrageCreateOption): Record<string, any>;
  /** 测试用，添加一条示例弹幕 */
  test(): void;
  /** 自动移除过期弹幕 */
  autoRemoveBarrage(): void;
  /** 获取不重复的随机 top 值 */
  getUniqueTop(): number;
}
