var Bindings = Bindings || (function (O) {'usew strict';

  /*! (C) 2015 Andrea Giammarchi - Mit Style License */

  // I must admit this wasn't fun ... so many quirks!
  // works down to Android 2.3, webOS (wut?!) and Windows Phone 7
  // BB7 has problems defining properties on DOM Object
  // ... I salute you BB7, it's been fun!

  var
    // constants
    STATE_OFF = 0,
    STATE_DIRECT = 1,
    STATE_ATTRIBUTE = 2,
    STATE_EVENT = 4,
    DOM_ATTR_MODIFIED = 'DOMAttrModified',
    MO_NAME = '__mo_bindings',
    ON_ATTACHED = 'attachedCallback',
    ON_DETACHED = 'detachedCallback',
    GET_ATTRIBUTE = 'getAttribute',
    SET_ATTRIBUTE = 'setAttribute',
    // shortcuts
    create = O.create,
    dP = O.defineProperty,
    gPO = O.getPrototypeOf,
    gOPD = O.getOwnPropertyDescriptor,
    // RegExp used all the time
    ignore = /IFRAME|NOFRAMES|NOSCRIPT|SCRIPT|SELECT|STYLE|TEXTAREA|[a-z]/,
    oneWay = /\{\{[\S\s]+?\}\}/g,
    comma = /\s*,\s*/,
    colon = /\s*:\s*/,
    spaces = /^\s+|\s+$/g,
    decepticons = /^([\S]+?)\(([\S\s]*?)\)/,
    // MutationObserver common options
    whatToObserve = {attributes: true, subtree: true},
    // moar shortcuts
    hOP = whatToObserve.hasOwnProperty,
    on = function (el, type, handler) {
      el.addEventListener(type, handler, true);
      //                                  ^ ... but why?
      // because usually devs set listeners in bubbling
      // phase, meaning this one might fire before ^_^
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

  // if there's some binding in the wild, like inside
  // a generic node, it will be bound "one way" here
  function boundTextNode(bindings, key, node) {
    var setter = hOP.call(bindings, key) && gOPD(bindings, key).set;
    dP(bindings, key, createGetSet(
      function get() { return node.nodeValue; },
      function set(value) {
        node.nodeValue = value;
        if (setter) setter(value);
      }
    ));
    return node;
  }

  // if there's some binding dependent to a method it will update
  // the node whenever one bound parameter of the method changes
  function boundTransformer(source, autobots, bindings, method, keys, node) {
    keys.split(comma).forEach(optimusPrime, {
      autobots: autobots,
      bindings: bindings,
      method: source[method],
      source: source,
      onUpdate: function (value) {
        node.nodeValue = value;
      }
    });
    return node;
  }

  // from a list of property names, returns an Array of values
  function getArgs() {
    var a = [], i = 0;
    while (i < arguments.length) a[i] = this[arguments[i++]];
    return a;
  }

  // it controls all autobots, trying to defeat
  // all decepticons attack through their callbacks
  function optimusPrime(key, i, args) {
    var
      autobots = this.autobots,
      bindings = this.bindings,
      method = this.method,
      onUpdate = this.onUpdate,
      has = hOP.call(bindings, key),
      descriptor = has && gOPD(bindings, key),
      getter = has && descriptor.get,
      setter = has && descriptor.set
    ;
    autobots[key] = this.source[key];
    dP(bindings, key, createGetSet(
      has ? getter : function get() { return autobots[key]; },
      function set(value) {
        autobots[key] = value;
        onUpdate(method.apply(bindings, getArgs.apply(autobots, args)));
        if (has) setter(value);
      }
    ));
    onUpdate(method.apply(bindings, getArgs.apply(autobots, args)));
  }

  // plain borrowed from twemoji, that's my code anyway ^_^
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

  // used to understand if and how to dispatch events
  function convertShenanigansToNumber(i) {
    switch (true) {
      case typeof i === 'number': return i < 0 ? -1 : i;
      case i: return 133;
      default: return -1;
    }
  }

  return {

    // if the template is the same per each component
    // or there are common bindings, it does everything once created
    init: function () {
      if (this.template || this.bindings) this.withBindings(this);
    },

    // but it's also possible to lazy atatch bindings later on
    // changing them in the wild might work but it's not fully tested
    // and definitively it's not suggested (also quite dirty pattern)
    withBindings: function (info) {

      // if the template is there but the node has no content
      // meaning it has been probably created via JS
      // it will inject the template right away
      if (info.template && !trim.call(this.textContent)) {
        this.innerHTML = info.template;
      }

      var
        // shortcut and reference
        self = this,
        // grab current document or use the global one
        document = self.ownerDocument || document,
        // used to define defaults, actually optional
        bindings = info.bindings || {},
        // will find all possible nodes with one-way bindings
        textNodes = grabAllTextNodes(self, []),
        // holds singular properties values related to nodes or attributes
        autobots = create(null),
        // maps DOM attribute names => bindings properties name
        map = create(null),
        // will be actually the exported binding object
        values = create(info.bindings || null),
        // grab all nodes with some [data-bind="value:prop"] info
        attributes = self.queryAll('[data-bind]'),
        // used as every DOM_ATTR_MODIFIED handler
        dAM = function (e) {
          var key = e.attrName, previous = state;
          state = STATE_EVENT;
          values[map[key]] = e.currentTarget[GET_ATTRIBUTE](key);
          state = previous;
        },
        // will be updated later on if a MutationObserver is needed
        setMO = false,
        // default state
        state = STATE_OFF,
        // refer to the previous mo in case
        // it's an update and not the first time
        mo = hasMo && self[MO_NAME],
        // NOTIFICATIONS
        // if bindings are dispatched, figure out in which frequency
        dispatchDelay = convertShenanigansToNumber(
          info.dispatchBindings || this.dispatchBindings
        ),
        // internal boolean flag, if dispatchDelay < 0 don't
        dispatchBindings = -1 < dispatchDelay,
        // in case there are bindings to dispatch, use a storage to filter notifications
        tobeNotified = dispatchBindings && create(null),
        // used to schedule and clean up notifications
        // the value 0 means ASAP and in that case rAF is used instead of setTimeout
        dispatcher = dispatchBindings && function (key) {
          delete tobeNotified[key];
          self.dispatchEvent(new CustomEvent('bindingChanged', {detail: {
            key: key,
            value: values[key]
          }}));
        },
        // schedules the dispatcher accordingly with the delay
        // if the dispatchDelay is 0 will use rAF instead (ASAP)
        dispatchScheduler = dispatchDelay ?
          function (key) {
            if (key in tobeNotified) clearTimeout(tobeNotified[key]);
            tobeNotified[key] = setTimeout(dispatcher, dispatchDelay, key);
          } :
          function (key) {
            if (key in tobeNotified) cancelAnimationFrame(tobeNotified[key]);
            tobeNotified[key] = requestAnimationFrame(function () {
              dispatcher(key);
            });
          }
      ;

      // loop over all text nodes
      textNodes.forEach(function (node) {
        var
          k, m, j, l, i = 0,
          value = node.nodeValue,
          nodes = [],
          bound = [],
          parentNode = node.parentNode,
          descriptor
        ;
        while ((m = oneWay.exec(value))) {
          j = m.index;
          l = m[0].length;
          nodes.push(value.slice(i, j));
          bound.push(value.substr(j + 2, l - 4));
          i = j + l;
        }
        // and in case there was some binding in the wild
        if (bound.length) {
          // drop current node
          node.remove();
          // put last part of the loop in the list of nodes
          nodes.push(value.slice(i));
          // and append all of them
          nodes.forEach(function (text, i) {
            // let's ignore empty text nodes
            if (text.length) parentNode.append(document.createTextNode(text));
            // bound nodes are always after regular
            // unless we are at the end of the list
            if (i < bound.length) {
              k = trim.call(bound[i]);
              parentNode.append(
                (m = decepticons.exec(k)) ?
                  boundTransformer(
                    bindings, autobots, values, m[1], m[2], document.createTextNode('')
                  ) :
                  boundTextNode(
                    values, k, document.createTextNode(bindings[k] || '')
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
            // update only known values and only if the context is the right one
            // remember: we have one values per component shared only
            // with its own sub nodes. If somebody .call via different context
            // we don't want the values to be updated
            if (key in map && this === el) values[map[key]] = value;
            state = previous;
          }
        ;

        // KnockOut style, data-bind accepts a comma separated list of key/value pairs
        el[GET_ATTRIBUTE]('data-bind')
        .split(comma)
        .filter(function (info, i, all) {
          // sanitizes functions with possible multiple arguments
          if (info.indexOf('(') > 0 && info.indexOf(')') < 0) {
            all[i + 1] = info + ',' + all[i + 1];
            return false;
          }
          return true;
        }).forEach(function (info, i) {

          var
            // these pairs can optionally be separated via `:`
            pair = info.split(colon),
            // so that we always have the related element attribute name
            key = pair[0],
            // and eventually the corresponding property name on the binding
            value = pair[1] || key,
            // we also need to know if somehow this property is already processed
            hasSet = hOP.call(values, value),
            // and if it's one of those magic one
            // (value for inputs, selectedIndex for selects, checked for checkbox, etc)
            direct = key in el,
            m = pair[1] && decepticons.exec(value),
            handler,
            setter,
            descriptor,
            onAttached,
            onDetached,
            v, args
          ;

          // one way binding, the attribute does not trigger changes in values
          // but it gets updated every time one of its parameters changes
          if (m) {
            m[2].split(comma).forEach(optimusPrime, {
              autobots: autobots,
              bindings: values,
              method: bindings[m[1]],
              source: bindings,
              onUpdate: direct ?
                function direct(value) { el[key] = value; } :
                function indirect(value) { setAttribute.call(el, key, value); }
            });
          } else {
            // handy to bring back property name from an attribute one
            map[key] = value;
            // in case processed, we need to keep that "in mind"
            if (hasSet) setter = gOPD(values, value).set;
            // if it's a direct property ...
            if (direct) {
              // we can simply set it as such using provided defaults
              if (hOP.call(bindings, value)) el[key] = bindings[value];
              // console.log(gOPD(el, 'key'));
              // whenever we set such property via exported bindings
              dP(values, value, createGetSet(
                // we either return it directly
                function get() { return el[key]; },
                // or we set it directly
                function set(v) {
                  var previous = state;
                  state = STATE_DIRECT;
                  // console.log('direct', previous, state);
                  switch (previous) {
                    case STATE_OFF:
                    case STATE_EVENT:
                      el[key] = v;
                      if (dispatchBindings) dispatchScheduler(value);
                      break;
                  }
                  // if there was already a setter
                  // we should probably invoke it
                  if (hasSet) setter(v);
                  state = previous;
                }
              ));
              // in few specific cases where the input could change via UI
              // we should update exported bindings property too
              handler = function (e) {
                var previous = state;
                state = STATE_EVENT;
                values[value] = el[key];
                state = previous;
              };
              switch (key) {
                case 'value':
                  on(el, 'input', handler);
                /* falls through */
                case 'checked':
                /* falls through */
                case 'selectedIndex':
                  on(el, 'change', handler);
                  break;
              }
              // we also would like to do the same in case
              // somebody directly changes the input.value
              // or the selectedIndex
              descriptor = getInterceptor(el, key);
              // if we can reuse the descriptor, we're better off this way
              if (descriptor) {
                dP(el, key, {
                  configurable: true,
                  enumerable: descriptor.enumerable,
                  // get it as it's supposed to be get
                  get: descriptor.get,
                  // use the descriptor once set to update the element value
                  // and also update exported bindings property
                  set: function (v) {
                    var previous = state;
                    state = STATE_ATTRIBUTE;
                    descriptor.set.call(el, v);
                    values[value] = v;
                    state = previous;
                  }
                });
              }
              // if we cannot reuse the inherited descriptor
              // we unfortunately need some utterly ugly polling fallback
              else {
                // polling seems to be the best option
                v = el[key];
                // each time the following runs ...
                handler = function () {
                  // if direct property access is different
                  // from the known value
                  if (el[key] !== v) {
                    // we update the value
                    // and the exported bindings
                    var previous = state;
                    state = STATE_ATTRIBUTE;
                    v = el[key];
                    values[value] = v;
                    state = previous;
                  }
                  // check again ASAP
                  i = schedule(handler);
                };
                // in order to have a not so greedy schedule
                // let's disable scheduling when the component
                // is not even on the DOM
                // TODO: should this actually run regardless?
                onAttached = self[ON_ATTACHED];
                onDetached = self[ON_DETACHED];
                dP(self, ON_ATTACHED, {
                  configurable: true,
                  value: function () {
                    handler(cancel(i));
                    if (onAttached) onAttached.apply(el, arguments);
                  }
                });
                dP(self, ON_DETACHED, {
                  configurable: true,
                  value: function () {
                    cancel(i);
                    if (onDetached) onDetached.apply(el, arguments);
                  }
                });
                // let's start checking
                handler();
              }
            }
            // here we are in setAttribute land
            else {
              // we can use the native method to set default value, if any
              if (hOP.call(bindings, value)) setAttribute.call(el, key, bindings[value]);
              // now we can set a different operation to update exported bindings
              dP(values, value, createGetSet(
                // we use getAttribute when accessed
                function get() { return el[GET_ATTRIBUTE](key); },
                // and we use native setAttribute when changed
                function set(v) {
                  var previous = state;
                  state = STATE_ATTRIBUTE;
                  // console.log('attribute', previous, state);
                  switch (previous) {
                    case STATE_OFF:
                    case STATE_DIRECT:
                      if (hasMo) mo.disconnect();
                      else if(hasDAM) off(el, DOM_ATTR_MODIFIED, dAM);
                      setAttribute.call(el, key, v);
                      if (dispatchBindings) dispatchScheduler(value);
                      if (hasMo) mo.observe(self, whatToObserve);
                      else if(hasDAM) on(el, DOM_ATTR_MODIFIED, dAM);
                      break;
                  }
                  // here again, if there was already a setter
                  // we should probably invoke it
                  if (hasSet) setter(v);
                  state = previous;
                }
              ));
              // if we need to know about attributes
              // and MutationObserver is available
              if (hasMo) setMO = true; // let's use it
              // otherwise if DOMAttributeModified works
              // let's set a listener
              else if (hasDAM) on(el, DOM_ATTR_MODIFIED, dAM);
              // otherwise let's set once the  new fake method
              // it will simulate an event as if it was a DOMAttrModified
              else if (el[SET_ATTRIBUTE] !== fakeSetAttribute){
                dP(el, SET_ATTRIBUTE, {
                  configurable: true,
                  value: fakeSetAttribute
                });
              }
            }
          }
        });
      });

      // if MutationObserver is available
      if (hasMo) {
        // we should probably get rid of it
        if (mo) mo.disconnect();
        // if there was at least one attribute to listen to
        if (setMO) {
          // we can recreate a MutationObserver
          mo = dP(self, MO_NAME, {
            configurable: true,
            // so that per each record
            value: new MO(function (records) {
              var previous = state;
              state = STATE_EVENT;
              // console.log('Mutation Observer', previous, state);
              for (var key, r, i = 0; i < records.length; i++) {
                r = records[i];
                // if it's about an attribute
                if (r.type === 'attributes') {
                  key = r.attributeName;
                  // and there is a key to take care of
                  // and such key is also well known
                  /* jshint eqnull:true */
                  if (key != null && key in map) {
                    // we can update the value
                    values[map[key]] = r.target[GET_ATTRIBUTE](key);
                  }
                }
              }
              state = previous;
            })
          })[MO_NAME];
          // let's observe the node and its subnodes
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

      // exported bindings
      return dP(self, 'bindings', {
        configurable: true,
        enumerable: true,
        writable: false,
        value: values
      });

    }
  };

}(Object));