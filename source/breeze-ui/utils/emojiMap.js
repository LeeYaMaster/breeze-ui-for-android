const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';

// 跳过 NO / OK / 删除 等符号类，从常用表情开始
const emojiStart = 7;
const emojiCount = 120;

const emojiList = [];
for (let i = emojiStart; i < emojiStart + emojiCount; i += 1) {
  emojiList.push({
    id: i,
    src: `${emojiUrl}emoji_${i}@2x.png`,
  });
}

module.exports = {
  emojiUrl,
  emojiList,
};
