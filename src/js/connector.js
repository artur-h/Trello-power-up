const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

function onBtnClick(t, opts) {
  return t.modal({
    url: 'https://wedcat-trello-power-up.netlify.com/modal.html',
    fullscreen: true
  })
}

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