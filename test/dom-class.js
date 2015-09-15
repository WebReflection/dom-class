//remove:
var DOMClass = require('../build/dom-class.node.js');
//:remove

wru.test([
  {
    name: "main",
    test: function () {
      wru.assert(typeof DOMClass == "function");
      // wru.assert(0);
    }
  }, {
    name: 'basics',
    test: function () {
      var XDomClass0 = new DOMClass({
        constructor: function () {
          this.setAttribute('here', 'I am');
        }
      });
      var xdc0 = document.body.appendChild(new XDomClass0);
      setTimeout(wru.async(function () {
        wru.assert('constructor invoked', xdc0.getAttribute('here') === 'I am');
        wru.assert('right name', xdc0.nodeName === 'X-DOM-CLASS-0');
      }), 100);
    }
  }, {
    name: 'onAttached',
    test: function () {
      var XDomClass1 = new DOMClass({
        onAttached: wru.async(function () {
          wru.assert('OK');
        })
      });
      document.body.appendChild(new XDomClass1);
    }
  }, {
    name: 'onDetached',
    test: function () {
      var i =  0;
      var XDomClass2 = new DOMClass({
        onAttached: function () {
          i++;
        },
        onDetached: wru.async(function () {
          wru.assert(i === 1);
        })
      });
      document.body.appendChild(new XDomClass2);
      document.body.removeChild(document.body.lastChild);
    }
  }, {
    name: 'onChanged',
    test: function () {
      var XDomClass3 = new DOMClass({
        onChanged: wru.async(function (name, previously, value) {
          wru.assert('name is correct', name === 'all');
          wru.assert('previously not there', !previously);
          wru.assert('value is correct', value === 'good');
        })
      });
      document.body.appendChild(new XDomClass3).setAttribute('all', 'good');
    }
  }, {
    name: 'name',
    test: function () {
      var XNamed = new DOMClass({
        name: 'x-named',
        constructor: wru.async(function () {
          wru.assert(this.nodeName.toLowerCase() === 'x-named');
        })
      });
      document.body.appendChild(new XNamed);
    }
  }, {
    name: 'lazily implemented',
    test: function () {
      var div = document.body.appendChild(document.createElement('div'));
      var constructor = wru.async(function () {
        wru.assert(this.textContent === 'yo');
        this.parentNode.removeChild(this);
      });
      div.innerHTML = '<x-da-fuq>yo</x-da-fuq>';
      setTimeout(function () {
        var XDaFuq = new DOMClass({
          name: 'x-da-fuq',
          constructor: constructor
        });
      }, 100);
    }
  }, {
    name: 'css',
    test: function () {
      var XStyled = new DOMClass({
        name: 'x-styled',
        css: {
          'x-styled': {cursor: 'pointer'},
          'span': {fontSize: 37}
        },
        onAttached: wru.async(function () {
          wru.assert('main style is OK', getComputedStyle(this, null).getPropertyValue('cursor') === 'pointer');
          wru.assert('sub style is OK', getComputedStyle(this.firstChild, null).getPropertyValue('font-size') === '37px');
          this.parentNode.removeChild(this);
        })
      });
      var div = document.body.appendChild(document.createElement('div'));
      div.innerHTML = '<x-styled><span>yo</span></x-styled>';
    }
  }, {
    name: 'this.css',
    test: function () {
      var XReStyled = new DOMClass({
        name: 'x-re-styled',
        css: {
          '': {cursor: 'pointer'},
          'span': {fontSize: 37}
        },
        constructor: function () {
          this.css.overwrite({
            span: {fontSize: 27}
          });
        },
        onAttached: wru.async(function () {
          wru.assert('main style is OK', getComputedStyle(this, null).getPropertyValue('cursor') === 'pointer');
          wru.assert('sub style is OK', getComputedStyle(this.firstChild, null).getPropertyValue('font-size') === '27px');
          this.parentNode.removeChild(this);
        })
      });
      var div = document.body.appendChild(document.createElement('div'));
      div.innerHTML = '<x-re-styled><span>yo</span></x-re-styled>';
    }
  }
]);
