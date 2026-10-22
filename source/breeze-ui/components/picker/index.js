/**
 * 选择器组件
 * @typedef {Object} PickerProps
 * @property {string} [type] 类型：normal | multi | time | date | region
 * @property {boolean} [hideLabel=false] 隐藏标签，配合 bz-form-field
 * @property {string} [placeholder='请选择'] 未选中占位文案
 * @property {string} [label=''] 标签
 * @property {string} [extraClass=''] 额外类名
 * @property {Array} [picker=[]] 单列选项
 * @property {number|null} [index=null] 单列选中索引
 * @property {Array} [multiIndex=[]] 多列选中索引
 * @property {Array} [multiArray=[]] 多列数据
 * @property {string} [date=''] 日期
 * @property {string} [time=''] 时间
 * @property {string} [start=''] 起始
 * @property {string} [end=''] 结束
 * @property {Array} [region=[]] 省市区
 * @property {Array} [customItem=[]] 自定义项
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    customClass: { type: String, value: '' },
    type: String,
    hideLabel: { type: Boolean, value: false },
    placeholder: { type: String, value: '请选择' },
    value: String,
    id: String,
    label: String,
    extraClass: String,
    picker: Array,
    index: {
      type: null,
      value: null,
    },
    multiIndex: Array,
    multiArray: Array,
    date: String,
    time: String,
    start: String,
    end: String,
    customItem: Array,
    region: Array,
  },

  observers: {
    'picker, value, type': function (picker, value, type) {
      if (type && type !== 'normal') return;
      if (!picker || !picker.length) return;
      if (value === undefined || value === null || value === '') {
        this.setData({ index: null });
        return;
      }
      const index = picker.indexOf(value);
      if (index >= 0) {
        this.setData({ index });
      }
    },
  },

  methods: {
    onTap(e) {
      const { dataset = {} } = e.currentTarget || {};
      this.triggerEvent('tap', { ...e.detail, dataset }, {});
    },

    emitValueChange(value) {
      this.triggerEvent('change', { value }, { bubbles: true, composed: true });
      this.triggerEvent('valueChange', { value });
    },

    pickerChange(e) {
      const index = e.detail.value;
      const { picker = [] } = this.data;
      const value = picker[index];
      this.setData({ index });
      this.emitValueChange(value);
    },

    multiChange(e) {
      const multiIndex = e.detail.value;
      this.setData({ multiIndex });
      const multiArray = this.data.multiArray || [];
      const value = multiIndex.map((idx, column) => (multiArray[column] || [])[idx]);
      this.emitValueChange(value);
    },

    multiColumnChange(e) {
      const data = {
        multiArray: this.data.multiArray || [],
        multiIndex: [...(this.data.multiIndex || [])],
      };
      data.multiIndex[e.detail.column] = e.detail.value;

      switch (e.detail.column) {
        case 0:
          switch (data.multiIndex[0]) {
            case 0:
              data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
              data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
              break;
            case 1:
              data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
              data.multiArray[2] = ['鲫鱼', '带鱼'];
              break;
          }
          data.multiIndex[1] = 0;
          data.multiIndex[2] = 0;
          break;
        case 1:
          switch (data.multiIndex[0]) {
            case 0:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                  break;
                case 1:
                  data.multiArray[2] = ['蛔虫'];
                  break;
                case 2:
                  data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                  break;
                case 3:
                  data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                  break;
                case 4:
                  data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                  break;
              }
              break;
            case 1:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['鲫鱼', '带鱼'];
                  break;
                case 1:
                  data.multiArray[2] = ['青蛙', '娃娃鱼'];
                  break;
                case 2:
                  data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                  break;
              }
              break;
          }
          data.multiIndex[2] = 0;
          break;
      }

      this.setData(data);
    },

    timeChange(e) {
      const value = e.detail.value;
      this.setData({ time: value });
      this.emitValueChange(value);
    },

    dateChange(e) {
      const value = e.detail.value;
      this.setData({ date: value });
      this.emitValueChange(value);
    },

    regionChange(e) {
      const value = e.detail.value;
      this.setData({ region: value });
      this.emitValueChange(value);
    },
  },
});
