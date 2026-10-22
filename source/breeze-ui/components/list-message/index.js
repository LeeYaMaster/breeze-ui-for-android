/**
 * 聊天消息列表
 * @property {Array} items 消息项 { id, type, role, text, image, time, avatar, infoClass, actionText, actionClass }
 * @property {string} [peerAvatar] 对方默认头像
 * @property {string} [selfAvatar] 己方默认头像
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    items: { type: Array, value: [] },
    peerAvatar: { type: String, value: '' },
    selfAvatar: { type: String, value: '' },
  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },
  },
});
