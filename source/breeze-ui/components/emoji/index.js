const { emojiList } = require('../../utils/emojiMap');

Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
  },
  properties: {
    customClass: { type: String, value: '' },
  },
  data: {
    emojiList,
  },
  methods: {
    chooseEmoji(e) {
      const src = e.currentTarget.dataset.src;
      this.triggerEvent('chooseEmoji', { src });
    },
  },
});
