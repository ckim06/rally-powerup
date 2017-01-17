/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';


var cardButtonCallback = function(t){
  return t.popup({
    title: 'Rally',
    url: '/web/index.html'
  });
};

TrelloPowerUp.initialize({
  'attachment-sections': function(t, options){
      return [{
        id: 'rally',
        icon: GRAY_ICON,
        title: 'Rally',
        claimed:[
          'https://power-up-trello.herokuapp.com/web/index.html'
        ],
        content: {
          type: 'iframe',
          url: t.signUrl('./web/index.html', { ref: 'you can pass your section args here' })
        }
      }];
  }
});
