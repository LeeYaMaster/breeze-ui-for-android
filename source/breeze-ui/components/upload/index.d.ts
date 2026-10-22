/**
 * 图片上传组件属性
 */
export interface UploadProps {
  /** 已上传文件列表 */
  fileList?: any[];
  /** 外部类名，传入 custom-class 覆盖根节点样式 */
  customClass?: string;
}

/**
 * 图片上传组件实例方法
 */
export interface UploadMethods {
  /** 选择图片 */
  chooseImage(): void;
  /** 删除图片，e.currentTarget.dataset.index 为索引 */
  delImg(e: WechatMiniprogram.CustomEvent): void;
  /** 预览图片，e.currentTarget.dataset.url 为当前 url */
  viewImage(e: WechatMiniprogram.CustomEvent): void;
}
