/**
 * 图片上传组件
 * @typedef {Object} UploadProps
 * @property {Array} [fileList=[]] 已上传文件列表
 * @typedef {Object} UploadMethods
 * @property {function(): void} chooseImage 选择图片并加入 fileList
 * @property {function(WechatMiniprogram.CustomEvent): void} delImg 删除图片，dataset.index 为索引
 * @property {function(WechatMiniprogram.CustomEvent): void} viewImage 预览图片，dataset.url 为当前 url
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    fileList: {
      type: Array,
      value: []
    }
  },

  data: {

  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    chooseImage() {
      this.doUpload((res) => {
        const url = res.tempFilePaths && res.tempFilePaths[0];
        if (!url) return;
        const fileList = [...(this.data.fileList || []), url];
        this.setData({ fileList });
        this.triggerEvent('change', { fileList });
      });
    },

    delImg(e) {
      const fileList = [...(this.data.fileList || [])];
      fileList.splice(e.currentTarget.dataset.index, 1);
      this.setData({ fileList });
      this.triggerEvent('change', { fileList });
    },

    viewImage(e) {
      wx.previewImage({
        urls: this.data.fileList,
        current: e.currentTarget.dataset.url,
      });
    },

    doUpload(callbackFun) {
      wx.chooseImage({
        success(res) {
          callbackFun({
            tempFilePaths: res.tempFilePaths,
          });
        },
      });
    },
  },
});
