/**
 * Flex 布局容器
 *
 * 已开启 virtualHost，页面上的 class / custom-class 会作用到内部 .flex 根节点，
 * slot 子节点即为 flex 子项，与 <view class="flex"> 行为一致。
 *
 * @property {string} [extraClass] 额外类名（组件 prop）
 */
Component({
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },
  externalClasses: ['class', 'custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    extraClass: { type: String, value: '' },
  },
  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },
  },
});
