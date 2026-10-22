/**
 * 内容区状态优先级（供 bz-state-box / bz-list-page 与单测共用）
 * @returns {{ viewState: 'loading'|'skeleton'|'error'|'empty'|'content', errorMessage: string }}
 */
function resolveViewState(options) {
  const input = options || {};
  const { loading, skeleton, error, empty, errorText } = input;
  let viewState = 'content';
  let errorMessage = '';

  if (loading) {
    viewState = 'loading';
  } else if (skeleton) {
    viewState = 'skeleton';
  } else if (error) {
    viewState = 'error';
    errorMessage =
      typeof error === 'string' && error
        ? error
        : errorText || '加载失败，请稍后重试';
  } else if (empty) {
    viewState = 'empty';
  }

  return { viewState, errorMessage };
}

module.exports = {
  resolveViewState,
};
