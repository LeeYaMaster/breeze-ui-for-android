const MAX_BOX = 40;
const CLICK_GAP = 120;

Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
  },
  data: {
    box: [],
  },

  lifetimes: {
    attached() {
      // 实例级状态，避免多实例全局变量污染
      this._idx = 0;
      this._timer = null;
      this._count = 0;
      this._lastClickAt = 0;
    },
    detached() {
      // 组件销毁时清理定时器，防止内存泄漏
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    },
  },

  methods: {
    pageClick(e) {
      const now = Date.now();
      if (this._lastClickAt && now - this._lastClickAt < CLICK_GAP) {
        return;
      }
      this._lastClickAt = now;

      const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || {};
      const x = touch.x != null ? touch.x : e.detail.x;
      const y = touch.y != null ? touch.y : e.detail.y;
      if (x == null || y == null) return;

      this._idx += 1;
      const itemIdx = this._idx;
      const obj = {
        x,
        y,
        element: [this.created()],
        idx: itemIdx,
      };

      // 直接 concat，不做 filter(Boolean)，避免改变已有项在数组中的位置
      let box = this.data.box.concat(obj);
      if (box.length > MAX_BOX) {
        box = box.slice(box.length - MAX_BOX);
      }
      this.setData({ box });
      this.triggerEvent('likeClick', {});
      this.likeHandle();

      // 6 秒后移除该气泡：用 filter 剔除，不残留 undefined 项
      setTimeout(() => {
        const current = this.data.box;
        const next = current.filter((item) => item && item.idx !== itemIdx);
        // 只有真正有变化才 setData
        if (next.length < current.length) {
          this.setData({ box: next });
        }
      }, 6000);
    },

    created() {
      const b = Math.floor(Math.random() * 6) + 1;
      const bl = Math.floor(Math.random() * 11) + 1;
      const image = [
        '/color_pro_img/star/1.png',
        '/color_pro_img/star/2.png',
        '/color_pro_img/star/3.png',
        '/color_pro_img/star/4.png',
        '/color_pro_img/star/5.png',
        '/color_pro_img/star/6.png',
        '/color_pro_img/star/7.png',
        '/color_pro_img/star/8.png',
        '/color_pro_img/star/9.png',
      ];
      return {
        className: 'bubble bl' + bl,
        image: image[b],
      };
    },

    likeHandle() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      this._count += 1;
      this._timer = setTimeout(() => {
        this.triggerEvent('likeClickDelay', {
          data: { number: this._count },
        });
        this._count = 0;
      }, 3000);
    },
  },
});
