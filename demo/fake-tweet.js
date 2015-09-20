var  FakeTweet = DOMClass({
  'with': DOMClass.bindings,
  css: {
    '': {
      display: 'block',
      position: 'relative'
    },
    '.left': {
      width: 64,
      position: 'absolute'
    },
    '.right': {
      padding: '8px 8px 8px 72px'
    },
    'header .handler, header .time': {
      marginLeft: 8,
      fontSize: '.8em',
      color: '#666'
    },
    'header .time:before': {
      content: '"-"',
      marginRight: 8
    },
    'footer a, footer a:hover': {
      textDecoration: 'none',
      color: '#666',
      fontSize: 'bold',
      marginRight: '15%'
    },
    'footer a:first-child': {
      marginLeft: '15%'
    },
    'strong, .content': {
      fontSize: '.9em'
    }
  },
  template: ''.concat(
    '<div class="left">',
      '<random-avatar size="64"></random-avatar>',
    '</div>',
    '<div class="right">',
      '<header>',
        '<strong>{{name}}</strong>',
        '<span class="handler">{{handler}}</span>',
        '<span class="time">{{time}}</span>',
      '</header>',
      '<div class="content">{{content}}</div>',
      '<footer>',
        '<a href="#reply">⤺</a>',
        '<a href="#retweet">⟲</a>',
        '<a href="#favorite">🌟</a>',
        '<a href="#more">...</a>',
      '</footer>',
    '</div>'
  ),
  constructor: function (info) {
    for (var key in info) this.bindings[key] = info[key];
  }
});