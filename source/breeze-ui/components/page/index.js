/**
 * 页面布局容器：内置 global toast / modal / toast-top / action-sheet，减少每页重复挂载
 * @property {boolean} [toast=true] 挂载 <bz-toast global />
 * @property {boolean} [modal=false] 挂载 <bz-modal global />
 * @property {boolean} [toastTop=false] 挂载 <bz-toast-top global />
 * @property {boolean} [actionSheet=false] 挂载 <bz-action-sheet global />
 * @property {string} [customClass] 根节点额外 class
 */
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    toast: { type: Boolean, value: true },
    modal: { type: Boolean, value: false },
    toastTop: { type: Boolean, value: false },
    actionSheet: { type: Boolean, value: false },
    customClass: { type: String, value: '' },
  },
});
