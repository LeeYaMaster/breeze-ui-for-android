/**
 * 日历组件
 * 无对外 properties，内部维护 year、month、today、space 等。
 * @typedef {Object} CalendarMethods
 * @property {function(): void} next 下月
 * @property {function(): void} last 上月
 * @property {function(WechatMiniprogram.CustomEvent): void} click 点击日期，触发 click 事件，detail: { year, month, today, week }
 */
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' }
  },
  lifetimes: {
    attached() {
      this.getNowTime();
      this.getSpace();
      this.createDay();
      this.emit();
    }
  },

  data: {
    year: 0,
    month: 0,
    today: 0,
    space: 0
  },

  methods: {
  onTap(e) {
    const { dataset = {} } = e.currentTarget || {};
    this.triggerEvent('tap', { ...e.detail, dataset }, {});
  },
    getNowTime() {
      const time = new Date();
      this.setData({
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        today: time.getDate(),
        week: time.getDay()
      })
    },
    createDay() {
      let day = [];
      let time = new Date();
      time.setMonth(this.data.month);
      time.setDate(0);
      let len = time.getDate();
      console.log(len)
      for (let i = 1; i <= len; i++) {
        day.push(i);
      }
      this.setData({
        day
      })
    },
    getSpace() {
      let time = new Date(this.data.year, this.data.month - 1, 1);
      time = new Date(time.setDate(0))
      const space = time.getDay();
      this.setData({
        space
      })
    },
    next(e) {
      let month = this.data.month;
      if (month == 12) {
        this.setData({
          year: this.data.year + 1,
          month: 1
        })
      } else {
        this.setData({
          month: month + 1
        })
      }
      this.getSpace();
      this.createDay();
      this.check();
      this.triggerEvent('tap', { action: 'next', ...(e?.detail || {}), dataset: e?.currentTarget?.dataset || {} }, {});
    },
    // 今月选择31，下月只有30，那么选择的today更改为30
    check(){
      let {today,year,month} = this.data;
      const time = new Date(year,month,0);
      let maxDay = time.getDate()
      console.log(today,maxDay)
      if(today > maxDay){
        this.setData({
          today: maxDay
        })
      }
    },
    last(e) {
      let month = this.data.month;
      if (month == 1) {
        this.setData({
          year: this.data.year - 1,
          month: 12
        })
      } else {
        this.setData({
          month: month - 1
        })
      }
      this.getSpace();
      this.createDay();
      this.check();
      this.triggerEvent('tap', { action: 'last', ...(e?.detail || {}), dataset: e?.currentTarget?.dataset || {} }, {});
    },
    click(e) {
      let today = e.currentTarget.dataset.today;
      this.setData({ today });
      this.emit();
      this.triggerEvent('tap', { today, ...(e.detail || {}), dataset: e.currentTarget?.dataset || {} }, {});
    },
    emit(){
      // 传递给父组件
      let {
        year,
        month,
        today
      } = this.data;
      let time = new Date(year, month - 1, today);
      let week = time.getDay();
      week = this.formatWeek(week)
      this.triggerEvent('click', {
        year,
        month,
        today,
        week
      }, {})
    },
    formatWeek(data) {
      switch (data) {
        case 1:
          return '一';
        case 2:
          return '二';
        case 3:
          return '三';
        case 4:
          return '四';
        case 5:
          return '五';
        case 6:
          return '六';
        case 0:
          return '七';
      }
    }
  }
})
