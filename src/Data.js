// Mixin Example - better than dataset
var Data = {
  /*! (C) 2015 Andrea Giammarchi - Mit Style License */
  data: function data(key, value) {
    var v, k = 'data-\x01-' + String(key).replace(
      /([a-z])([A-Z])/g,
      function (m, l, U) {
        return l + '-' + U.toLowerCase();
      }
    );
    if (arguments.length === 2) {
      if (value == null) {
        this.removeAttribute(k);
      } else {
        this.setAttribute(k, JSON.stringify(value));
      }
    } else {
      v = this.getAttribute(k);
      return v == null ? v : JSON.parse(v);
    }
  }
};



// test it for real
var EDiv = new DOMClass({
  with: Data,
  name: 'e-div',
  css: {'': {display: 'block'}},
  onChanged: function () {
    console.log(arguments);
  }
});

var ediv = document.body.appendChild(new EDiv);

ediv.data('name', 'Andrea');
ediv.data('age', 37);
ediv.data('info', {
  currentCity: 'London',
  sports: ['Snowboarding', 'Skydiving']
});
