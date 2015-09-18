var Bindings = (function (O) {'usew strict';

  /*! (C) 2015 Andrea Giammarchi - Mit Style License */

  // I must admit this wasn't fun ... so many quirks!
  // works down to Android 2.3 and Windows Phone 7
  // BB7 has problems defining properties on DOM Object
  // ... I salute you BB7, it's been fun!

  var
    STATE_OFF = 0,
    STATE_DIRECT = 1,
    STATE_ATTRIBUTE = 2,
    STATE_EVENT = 4,
    DOM_ATTR_MODIFIED = 'DOMAttrModified',
    MO_NAME = '__mo_bindings',
    SET_ATTRIBUTE = 'setAttribute',
    create = O.create,
    dP = O.defineProperty,
    gPO = O.getPrototypeOf,
    gOPD = O.getOwnPropertyDescriptor,
    ignore = /IFRAME|NOFRAMES|NOSCRIPT|SCRIPT|SELECT|STYLE|TEXTAREA|[a-z]/,
    oneWay = /\{\{\S+?\}\}/g,
    comma = /\s*,\s*/,
    colon = /\s*:\s*/,
    spaces = /^\s+|\s+$/g,
    whatToObserve = {attributes: true, subtree: true},
    bindingsToString = {
      toString: {
        configurable: true,
        writable: true,
        value: function toString() { return '[object bindings]'; }
      }
    },
    hOP = whatToObserve.hasOwnProperty,
    on = function (el, type, handler) {
      el.addEventListener(type, handler, true);
    },
    off = function (el, type, handler) {
      el.removeEventListener(type, handler, true);
    },
    trim = MO_NAME.trim || function () {
      return this.replace(spaces, '');
    },
    createGetSet = function (get, set) {
      return {
        configurable: true,
        enumerable: true,
        get: get,
        set: set
      };
    },
    // given an element and a property
    // with direct info manipulation capability
    // test if there is a descriptor that could be
    // used in case it's wrapped/redefined
    getInterceptor = function (el, key) {
      var proto = el, descriptor;
      while (proto && !hOP.call(proto, key)) proto = gPO(proto);
      if (proto) {
        descriptor = gOPD(proto, key);
        if ('set' in descriptor && 'get' in descriptor) {
          try {
            if (descriptor.get.call(el) !== el[key]) {
              throw descriptor;
            }
            return descriptor;
          } catch (iOS) {}
        }
      }
      return null;
    },
    MO =  window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver,
    hasMo = !!MO,
    schedule = function (fn) {
      // requestAnimationFrame would be too greedy
      // however, it has its advantages like not bothering
      // when the window/tab is not focused or something else.
      // in this way we are sure we'll reschedule the timer
      // only if rAF executes, instead of forever re-scheduled
      return setTimeout(requestAnimationFrame, 100, fn);
    },
    cancel = clearTimeout, // cancelAnimationFrame
    hasDAM = hasMo
  ;

  // verify if the DOMAttrModified listener works at all
  if (!hasDAM) {
    (function verifyItWorks(html, uid) {
      function suchAGoodBoy() { hasDAM = true; }
      on(html, DOM_ATTR_MODIFIED, suchAGoodBoy);
      html[SET_ATTRIBUTE](uid, 1);
      html.removeAttribute(uid);
      off(html, DOM_ATTR_MODIFIED, suchAGoodBoy);
    }(
      document.documentElement,
      'dom-' + (Math.random() + '-class').slice(2)
    ));
  }

  function boundTextNode(bindings, key, node) {
    dP(bindings, key, createGetSet(
      function get() { return node.nodeValue; },
      function set(value) {
        // console.log('text', key, value);
        node.nodeValue = value;
      }
    ));
    return node;
  }

  function grabAllTextNodes(node, allText) {
    var
      childNodes = node.childNodes,
      length = childNodes.length,
      subnode,
      nodeType;
    while (length--) {
      subnode = childNodes[length];
      nodeType = subnode.nodeType;
      if (nodeType === 3) allText.push(subnode);
      else if (nodeType === 1 && !ignore.test(subnode.nodeName)) {
        grabAllTextNodes(subnode, allText);
      }
    }
    return allText;
  }

  return {

    init: function () {
      if (this.template || this.bindings) this.withBindings(this);
    },

    withBindings: function (info) {

      if (info.template && !trim.call(this.textContent)) {
        this.innerHTML = info.template;
      }

      var
        self = this,
        document = self.ownerDocument || document,
        bindings = info.bindings || {},
        textNodes = grabAllTextNodes(self, []),
        map = create(null),
        values = create(null, bindingsToString),
        attributes = textNodes.slice.call(
          self.querySelectorAll('[data-bind]')
        ),
        state = STATE_OFF,
        dAM = function (e) {
          var key = e.attrName, previous = state;
          state = STATE_EVENT;
          values[map[key]] = e.currentTarget.getAttribute(key);
          state = previous;
        },
        setMO = false
      ;

      textNodes.forEach(function (node) {
        var
          k, m, j, l, i = 0,
          value = node.nodeValue,
          nodes = [],
          bound = [],
          parentNode = node.parentNode
        ;
        while (m = oneWay.exec(value)) {
          j = m.index;
          l = m[0].length;
          nodes.push(value.slice(i, j));
          bound.push(value.substr(j + 2, l - 4));
          i = j + l;
        }
        if (bound.length) {
          nodes.push(value.slice(i));
          parentNode.removeChild(node);
          nodes.forEach(function (text, i) {
            parentNode.appendChild(document.createTextNode(text));
            if (i < bound.length) {
              k = bound[i];
              parentNode.appendChild(
                boundTextNode(
                  values,
                  k,
                  document.createTextNode(bindings[k] || '')
                )
              );
            }
          });
        }
      });

      attributes.forEach(function (el) {
        var
          setAttribute = el[SET_ATTRIBUTE],
          fakeSetAttribute = function (key, value) {
            var previous = state;
            state = STATE_EVENT;  // it's a white lie to simulate DAM
            setAttribute.call(this, key, value);
            // update only known  values
            if (key in map && this === el) values[map[key]] = value;
            state = previous;
          }
        ;
        el.getAttribute('data-bind').split(comma).forEach(function (info, i) {
          var
            pair = info.split(colon),
            key = pair[0],
            value = pair[1] || key,
            hasSet = value in values,
            direct = key in el,
            handler,
            setter,
            descriptor,
            onAttached,
            onDetached,
            v
          ;
          map[key] = value;
          if (hasSet) setter = gOPD(values, value).set;
          if (direct) {
            el[key] = bindings[value] || '';
            // console.log(gOPD(el, 'key'));
            dP(values, value, createGetSet(
              function get() { return el[key]; },
              function set(value) {
                var previous = state;
                state = STATE_DIRECT;
                // console.log('direct', previous, state);
                switch (previous) {
                  case STATE_OFF:
                  case STATE_EVENT:
                    el[key] = value;
                    break;
                }
                if (hasSet) setter(value);
                state = previous;
              }
            ));
            handler = function (e) {
              var previous = state;
              state = STATE_EVENT;
              values[value] = el[key];
              state = previous;
            };
            switch (key) {
              case 'value':
                on(el, 'input', handler);
              case 'checked':
              case 'selectedIndex':
                on(el, 'change', handler);
                break;
            }
            descriptor = getInterceptor(el, key);
            // if we can reuse the descriptor, we're better off this way
            if (descriptor) {
              dP(el, key, {
                configurable: true,
                enumerable: descriptor.enumerable,
                get: descriptor.get,
                set: function (v) {
                  var previous = state;
                  state = STATE_ATTRIBUTE;
                  descriptor.set.call(el, v);
                  values[value] = v;
                  state = previous;
                }
              });
            }
            // otherwise we need some utterly ugly polling fallback
            else {
              v = el[key];
              handler = function () {
                if (el[key] !== v) {
                  var previous = state;
                  state = STATE_ATTRIBUTE;
                  v = el[key];
                  values[value] = v;
                  state = previous;
                }
                i = schedule(handler);
              };
              onAttached = self.attachedCallback;
              onDetached = self.detachedCallback;
              dP(self, 'attachedCallback', {
                configurable: true,
                value: function () {
                  handler(cancel(i));
                  if (onAttached) onAttached.apply(el, arguments);
                }
              });
              dP(self, 'detachedCallback', {
                configurable: true,
                value: function () {
                  cancel(i);
                  if (onDetached) onDetached.apply(el, arguments);
                }
              });
              handler();
            }
          } else {
            setAttribute.call(el, key, bindings[value]);
            dP(values, value, createGetSet(
              function get() { return el.getAttribute(key); },
              function set(value) {
                var previous = state;
                state = STATE_ATTRIBUTE;
                // console.log('attribute', previous, state);
                switch (previous) {
                  case STATE_OFF:
                  case STATE_DIRECT:
                    if (hasMo) mo.disconnect();
                    else if(hasDAM) off(el, DOM_ATTR_MODIFIED, dAM);
                    setAttribute.call(el, key, value);
                    if (hasMo) mo.observe(self, whatToObserve);
                    else if(hasDAM) on(el, DOM_ATTR_MODIFIED, dAM);
                    break;
                }
                if (hasSet) setter(value);
                state = previous;
              }
            ));
            if (hasMo) setMO = true;
            else if (hasDAM) on(el, DOM_ATTR_MODIFIED, dAM);
            else if (el[SET_ATTRIBUTE] !== fakeSetAttribute){
              dP(el, SET_ATTRIBUTE, {
                configurable: true,
                value: fakeSetAttribute
              });
            }
          }
        });
      });

      if (hasMo) {
        mo = self[MO_NAME];
        if (mo) mo.disconnect();
        if (setMO) {
          mo = dP(self, MO_NAME, {
            configurable: true,
            value: new MO(function (records) {
              var previous = state;
              state = STATE_EVENT;
              // console.log('Mutation Observer', previous, state);
              for (var key, r, i = 0; i < records.length; i++) {
                r = records[i];
                if (r.type === 'attributes') {
                  key = r.attributeName;
                  if (key != null) {
                    values[map[key]] = r.target.getAttribute(key);
                  }
                }
              }
              state = previous;
            })
          })[MO_NAME];
          mo.observe(self, whatToObserve);

          /* // TODO: should mo stop listening when offline ?
          dP(self, 'attachedCallback', {
            configurable: true,
            value: function () {
              mo.observe(self, whatToObserve);
              if (onAttached) onAttached.apply(self, arguments);
            }
          });
          dP(self, 'detachedCallback', {
            configurable: true,
            value: function () {
              mo.disconnect();
              if (onDetached) onDetached.apply(self, arguments);
            }
          });
          //*/

        }
      }

      return dP(self, 'bindings', {
        configurable: true,
        enumerable: true,
        writable: false,
        value: values
      });

    }
  };

}(Object));

// examples

/*

var EditableNameTag = DOMClass({
  with: Bindings,
  name: 'editable-name-tag',
  template: '<p data-bind="custom:owner">'+
              'This is a <strong>{{owner}}</strong>\'s editable-name-tag.' +
            '</p>' +
            '<input data-bind="value:owner" placeholder="Your name here...">',
  bindings: {owner: "Daniel"}
});

var ent = document.body.insertBefore(
  new EditableNameTag,
  document.body.firstChild
);

function verify() {
  console.log(
    ent.bindings.owner,
    ent.firstChild.getAttribute('custom'),
    ent.lastChild.value,
    ent.firstChild.childNodes[1].textContent
  );
}

setTimeout(function () {
  ent.bindings.owner = 'Andrea';
  setTimeout(function () {
    verify();
    ent.firstChild.setAttribute('custom', 'WebReflection');
    setTimeout(function () {
      verify();
      ent.lastChild.value = 'Daniel';
      setTimeout(verify, 1000);
    }, 1000);
  }, 1000);
}, 1000);

//*/

/*
Bindings.withBindings.call(document.body, {
  template: '<input data-bind="value:name, random">' +
            '<input type="checkbox" data-bind="checked">',
  bindings: {name: 'webreflection', random: 'wut', checked: false}
});

setTimeout(function () {
  document.body.bindings.name = 'asd';
  document.body.bindings.checked = true;
}, 500);
//*/

/*
Bindings.withBindings.call(document.body, {
  template: '[a]{{b}}[c]',
  bindings: {b: '<b>wut</b>'}
});

document.body.bindings.b = 'hello there';
//*/

/*

var BoundContent = new DOMClass({
  with: Bindings
});

var bc = (new BoundContent).withBindings({
  template: '<span>{{text}}</span>',
  bindings: {text: 'Hello World'}
});

//*/