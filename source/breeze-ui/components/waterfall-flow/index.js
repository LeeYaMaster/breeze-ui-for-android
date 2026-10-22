/**
 * 瀑布流组件
 * @typedef {Object} WaterfallFlowProps
 * @property {Array} [data=[]] 数据数组，每项需含 image 字段（图片地址），组件会计算 height 并左右分布
 * @typedef {Object} WaterfallFlowMethods
 * @property {function(Array): void} create 根据 data 创建瀑布流布局
 * @property {function(Array): void} sort 将数据排序到左右列
 */
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    data: {
      type: Array,
      value: [],
      observer(newVal) {
        this.create((newVal || []).slice());
      },
    },
  },

  data: {
    leftData: [],
    rightData: [],
  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    resetLayoutState() {
      this._leftHeight = 0;
      this._rightHeight = 0;
      this._leftData = [];
      this._rightData = [];
    },

    create(data) {
      if (!data || !data.length) {
        this.resetLayoutState();
        this.setData({
          leftData: [],
          rightData: [],
        });
        return;
      }

      this.resetLayoutState();
      const promiseArr = data.map((item, index) => {
        return new Promise((resolve) => {
          wx.getImageInfo({
            src: item.image,
            complete: (res) => {
              const nextItem = { ...item };
              const proportion = res.width ? res.height / res.width : 1;
              const width = 375;
              nextItem.height = width * proportion;
              resolve(nextItem);
            },
          });
        });
      });

      Promise.all(promiseArr).then((res) => {
        this.sort(res);
        this.setData({
          leftData: this._leftData,
          rightData: this._rightData,
        });
      });
    },

    sort(data) {
      data.forEach((item) => {
        if (this._leftHeight <= this._rightHeight) {
          this._leftHeight += item.height;
          this._leftData.push(item);
        } else {
          this._rightHeight += item.height;
          this._rightData.push(item);
        }
      });
    },
  },
});
