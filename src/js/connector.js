const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

const onBtnClick = function (t, opts) {
  return t.board('all')
    .then(function (board) {
      console.log(JSON.stringify(board, null, 2));
    });
};

window.TrelloPowerUp.initialize({
  'board-buttons': function (t, opts) {
    return {
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'Callback',
      callback: onBtnClick,
      condition: 'admin'
    }
  }
});