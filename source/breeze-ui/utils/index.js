const Theme = require('./theme');
const Config = require('./config');
const Toast = require('./toast');
const Modal = require('./modal');
const ActionSheet = require('./action-sheet');
const Skeleton = require('./skeleton');

const feedback = {
  toast: Toast,
  modal: Modal,
  sheet: ActionSheet,
};

module.exports = {
  Theme,
  Config,
  Toast,
  Modal,
  ActionSheet,
  Skeleton,
  feedback,
};
