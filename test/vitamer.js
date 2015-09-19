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
  }, {
    name: 'arguments are passed',
    test: function () {
      var random = Math.random();
      var XArgs = new DOMClass({
        constructor: wru.async(function () {
          wru.assert(arguments[0] === random);
        })
      });
      document.body.appendChild(new XArgs(random));
    }
  }, {
    name: 'arguments are passed via DOM through JSON',
    test: function () {
      var random = Math.random();
      var XArgs = new DOMClass({
        name: 'x-with-args',
        constructor: wru.async(function () {
          wru.assert(arguments[0] === random);
        })
      });
      var div = document.body.appendChild(document.createElement('div'));
      div.innerHTML = '<x-with-args data-arguments="[' + random + ']"></x-with-args>';
    }
  }, {
    name: 'arguments are passed via DOM through split',
    test: function () {
      var XArgs = new DOMClass({
        name: 'x-with-split-args',
        constructor: wru.async(function () {
          wru.assert(arguments[0] === 'a' && arguments[1] === '2');
        })
      });
      var div = document.body.appendChild(document.createElement('div'));
      div.innerHTML = '<x-with-split-args data-arguments="a,2"></x-with-split-args>';
    }
  }, {
    name: 'instanceof',
    test: function () {
      var XWCon = new DOMClass({
        constructor: function () {}
      });
      var XWOCon = new DOMClass({});
      wru.assert('with constructor',
        new XWCon instanceof XWCon ||
        // IE9
        new XWCon instanceof HTMLUnknownElement);
      wru.assert('without constructor',
        new XWOCon instanceof XWOCon ||
        // IE9
        new XWCon instanceof HTMLUnknownElement);
    }
  }, {
    name: 'constructor is the correct one',
    test: function() {
      var X = new DOMClass({
        constructor: wru.async(function () {
          var isntIt = this.constructor === X;
          if (!isntIt) {
            delete this.constructor;
            this.constructor = X;
            Object.defineProperty(this, 'constructor', {value: X});
            isntIt = this.constructor === X;
            if (isntIt) {
              throw new Error('unexpected unfixed problem');
            } else {
              // expected epic fail in phantom JS
              isntIt = true;
            }
          }
          wru.assert(isntIt);
        })
      });
      document.body.appendChild(new X);
    }
  }, {
    name: 'x-clock',
    test: function () {
      var XClock = new DOMClass({
        static: {
          updateClock: function (xClock) {
            var
              now = new Date(),
              hour = xClock.getAttribute("hours") || now.getHours(),
              minute = xClock.getAttribute("minutes") || now.getMinutes(),
              second = xClock.getAttribute("seconds") || now.getSeconds(),
              secondAngle = second * 6,
              minuteAngle = minute * 6 + secondAngle / 60,
              hourAngle = ( ( hour % 12 ) / 12 ) * 360 + 90 + minute / 12,
              rotate = function (deg) {
                return "rotate(" + deg + "deg)";
              }
            ;
            xClock.css.overwrite({
              '.clock-face-hour': {
                transform: rotate(hourAngle)
              },
              '.clock-face-minute': {
                transform: rotate(minuteAngle)
              },
              '.clock-face-second': {
                transform: rotate(secondAngle)
              }
            });
          }
        },
        constructor: wru.async(function () {
          this.innerHTML =
            "<div class='clock-face-container'>" +
              "<div class='clock-face-hour'></div>" +
              "<div class='clock-face-minute'></div>" +
              "<div class='clock-face-second'></div>" +
            "</div>";
          this.time = setInterval(XClock.updateClock, 1000, this);
          XClock.updateClock(this);
          wru.assert('OK');
        }),
        css: {
          '': {
            display: 'block',
            width: 100,
            height: 100,
            position: 'relative',
            border: '6px solid black',
            'border-radius': '50%'
          },
          '.clock-face-container::after': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 12,
            height: 12,
            margin: '-6px 0 0 -6px',
            background: 'black',
            'border-radius': 6,
            content: '""',
            display: 'block'
          },
          '.clock-face-container > div': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            background: 'black'
          },
          '.clock-face-hour': {
            margin: '-4px 0 -4px -25%',
            padding: '4px 0 4px 25%',
            'transform-origin': '100% 50%',
            'border-radius': '4px 0 0 4px'
          },
          '.clock-face-minute': {
            margin: '-40% -3px 0',
            padding: '40% 3px 0',
            'transform-origin': '50% 100%',
            'border-radius': '3px 3px 0 0'
          },
          '.clock-face-second': {
            margin: '-40% -1px 0 0',
            padding: '40% 1px 0',
            'transform-origin': '50% 100%'
          }
        }
      });
      document.body.insertBefore(
        new XClock,
        document.body.firstChild
      );
    }
  }, {
    name: 'bindings as mixin',
    test: function () {
      var failures = [];
      var done = wru.async(function () {
        if (failures.length) {
          wru.assert([''].concat(failures, '').join('\n'), false);
        } else {
          wru.assert('OK');
        }
      });
      function verify() {
        var value = ent.bindings.owner;
        if (!value) {
          failures.push('bindings.owner');
        } else if (value != ent.firstChild.getAttribute('custom')) {
          failures.push('should be ' + value + ' but firstChild.getAttribute is ' + ent.firstChild.getAttribute('custom'));
        } else if (value != ent.lastChild.value) {
          failures.push('should be ' + value + ' but lastChild.value is ' + ent.lastChild.value);
        } else if (value != ent.firstChild.childNodes[1].textContent) {
          failures.push('should be ' + value + ' but childNodes[1].textContent is ' + ent.lastChild.value);
        }
      }
      var EditableNameTag = DOMClass({
        'with': Bindings,
        name: 'editable-name-tag',
        template: '<p data-bind="custom:owner">'+
                    'This is a <strong>{{owner}}</strong>\'s editable-name-tag.' +
                  '</p>' +
                  '<input data-bind="value:owner" placeholder="Your name here...">',
        bindings: {owner: "Daniel"}
      });
      window.ent = document.body.insertBefore(
        new EditableNameTag,
        document.body.firstChild
      );
      setTimeout(function () {
        ent.bindings.owner = 'Andrea';
        setTimeout(function () {
          verify();
          ent.firstChild.setAttribute('custom', 'WebReflection');
          setTimeout(function () {
            verify();
            ent.lastChild.value = 'Daniel';
            setTimeout(function () {
              verify();
              done();
            }, 350);
          }, 350);
        }, 350);
      }, 350);
    }
  }, {
    name: 'temperature two way',
    test: function () {
      var Celsius2Fahrenheit = DOMClass({
        'with': Bindings,
        name: 'celsius-2-Fahrenheit',
        css: {'input': {
          maxWidth: 64,
          border: {width: 1, color: 'silver'}
        }},
        template: '<div>' +
                    '<input name="celsius" type="number" data-bind="value:celsius">°C' +
                    '<span> ⇄ </span>' +
                    '<input name="fahrenheit" type="number" data-bind="value:fahrenheit">°F' +
                  '</div>',
        bindings: {
          celsius: 0,
          fahrenheit: 0
        },
        constructor: function () {
          this.query('[name="celsius"]').addEventListener('input', this);
          this.query('[name="fahrenheit"]').addEventListener('input', this);
        },
        updateTemperature: function (which, temp) {
          if (which in this.bindings) {
            this.bindings[which] = temp;
            this.query('[name="' + which + '"]').dispatchEvent(
              new CustomEvent('input')
            ); 
          } else {
            alert('dunno how to convert ' + which);
          }
        },
        // using the class itself to handle events? Why not!
        handleEvent: function (e) {
          var el = e.currentTarget;
          if (e.type === 'input') {
            switch (el.name) {
              case 'celsius':
                this.bindings.fahrenheit =
                  9/5 * parseFloat(el.value) + 32;
                break;
              case 'fahrenheit':
                this.bindings.celsius =
                  5/9 * (parseFloat(el.value) - 32)
                break;
            }
          }
        }
      });

      window.c2f = document.body.insertBefore(
        new Celsius2Fahrenheit,
        document.body.firstChild
      );

      c2f.updateTemperature('celsius', 30);

    }
  }, {
    name: 'sum between inputs',
    test: function () {
      var SumOfTwo = DOMClass({
        'with': Bindings,
        template: '<input data-bind="value:a" type="number">' +
                  '<input data-bind="value:b" type="number">' +
                  '<input data-bind="value:sum(a, b)">' +
                  '<br/>' +
                  'The sum of {{a}} + {{b}} is equal to {{sum(a, b)}}',
        bindings: {a: 0, b: 0, sum: function (a, b) {
          var result = parseFloat(a) + parseFloat(b);
          return isNaN(result) ? '?' : result;
        }},
        dispatchBindings: true
      });
      window.sot = document.body.insertBefore(
        new SumOfTwo,
        document.body.firstChild
      );
      sot.addEventListener('bindingChanged', function (e) {
        if (window.console) console.log(e.detail);
      });
    }
  }
]);