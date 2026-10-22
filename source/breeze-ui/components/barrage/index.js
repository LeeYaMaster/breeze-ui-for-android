/**
 * 弹幕组件
 * 通过 selectComponent 调用 push(object) 或 create(object) 添加弹幕。
 *
 * 使用方式（页面中）：
 *   <bz-barrage id="barrage" custom-class="danmu-fill"></bz-barrage>
 *   const barrage = this.selectComponent('#barrage')
 *   barrage.push({ text: 'hello', status: 'like' })
 */
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

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    /**
     * 自动移除过期弹幕：filter 彻底剔除超时项，不残留 undefined
     * 由 setInterval 每 12 秒调用
     */
    autoRemoveBarrage() {
      const now = Date.now();
      const box = this.data.box;
      const next = box.filter(
        (item) => item && typeof item.createTime === 'number' && (now - item.createTime) < 12000,
      );
      // 只在数组实际发生变化时才 setData，避免无效渲染
      if (next.length !== box.length) {
        this.setData({ box: next });
      }
    },

    /**
     * 获取不重复的随机 top 值 (%)
     */
    getUniqueTop() {
      const box = this.data.box || [];
      const recentTops = box
        .slice(-10)
        .map((item) => (item ? item.top : null))
        .filter((t) => typeof t === 'number');

      let top;
      let tries = 0;
      do {
        top = 8 + Math.floor(Math.random() * 76);
        tries++;
        if (tries > 100) break;
      } while (recentTops.some((rt) => Math.abs(rt - top) <= 6));

      return top;
    },

    /**
     * 创建一条弹幕对象（不自动加入数据）
     */
    create(object) {
      // 防御：确保 _idx 已初始化
      if (typeof this._idx !== 'number') {
        this._idx = 0;
      }
      this._idx += 1;

      return {
        text: object.text || '',
        status: object.status || 'like',
        gift: object.gift || 0,
        id: 'a' + this._idx,
        top: this.getUniqueTop(),
        time: Number((Math.random() * 4 + 6).toFixed(1)),
        createTime: Date.now(),
        color: this.getRandomColor(),
      };
    },

    /**
     * 创建一条弹幕并追加到渲染数据
     */
    push(object) {
      const item = this.create(object);
      // 用 concat 产生新数组引用，确保 WeChat diff 检测到变化
      const box = this.data.box.concat(item);
      this.setData({ box });
      return item;
    },

    getRandomColor() {
      const palette = [
        'rgba(91, 108, 255, 0.9)',
        'rgba(124, 58, 237, 0.9)',
        'rgba(28, 187, 180, 0.9)',
        'rgba(243, 123, 29, 0.9)',
        'rgba(229, 77, 66, 0.9)',
        'rgba(16, 185, 129, 0.9)',
        'rgba(59, 130, 246, 0.9)',
      ];
      return palette[Math.floor(Math.random() * palette.length)];
    },

    /** 测试用：添加一条示例弹幕 */
    test() {
      const idx = typeof this._idx === 'number' ? this._idx : 0;
      this.push({
        text: 'LeeYa祝你恭喜发财' + (idx + 1) + '次',
        status: 'like',
        gift: 0,
      });
    },
  },

  lifetimes: {
    attached() {
      this._idx = 0;
      this._autoRemoveTimer = setInterval(() => {
        this.autoRemoveBarrage();
      }, 12000);
    },

    detached() {
      if (this._autoRemoveTimer) {
        clearInterval(this._autoRemoveTimer);
        this._autoRemoveTimer = null;
      }
    },
  },
});
