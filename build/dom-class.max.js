/*!
Copyright (C) 2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var DOMClass = (function (A, O) {'use strict';
  var
    ATTACHED = 'onAttached',
    ATTACHED_CALLBACK = 'attachedCallback',
    CHANGED = 'onChanged',
    CHANGED_CALLBACK = 'attributeChangedCallback',
    CONSTRUCTOR = 'constructor',
    CONSTRUCTOR_CALLBACK = 'createdCallback',
    CSS = 'css',
    DETACHED = 'onDetached',
    DETACHED_CALLBAK = 'detachedCallback',
    EXTENDS = 'extends',
    NAME = 'name',
    hOP = O.hasOwnProperty,
    empty = A.prototype,
    setIfThere = function  (where, what, target, alias) {
      if (hOP.call(where, what)) {
        target[alias] = where[what];
      }
    },
    // WUT? https://gist.github.com/WebReflection/4327762cb87a8c634a29
    slice = function slice() {
      for (var
        o = +this,
        i = o,
        l = arguments.length,
        n = l - o,
        a = new A(n < 0 ? 0 : n);
        i < l; i++
      ) a[i - o] = arguments[i];
      return a;
    },
    uid = function (name) {
      return name + '-i-' + (
        hOP.call(uids, name) ? ++uids[name] : (uids[name] = 0)
      );
    },
    uids = {},
    i = 0
  ;
  return function DOMClass(description) {
    var
      CustomElement = function CustomElement() {
        args = slice.apply(0, arguments);
        return new Element();
      },
      args = empty,
      el = {},
      css = hOP.call(description, CSS),
      init = hOP.call(description, CONSTRUCTOR),
      createdCallback = init && description[CONSTRUCTOR],
      Element,
      constructor,
      key
    ;
    setIfThere(description, ATTACHED, el, ATTACHED_CALLBACK);
    setIfThere(description, CHANGED, el, CHANGED_CALLBACK);
    setIfThere(description, DETACHED, el, DETACHED_CALLBAK);
    for (key in description) {
      if (hOP.call(description, key)) {
        switch (key) {
          case ATTACHED:
          case CHANGED:
          case CONSTRUCTOR:
          case DETACHED:
          case EXTENDS:
          case NAME:
          case CSS:
            break;
          default:
            el[key] = description[key];
            break;
        }
      }
    }
    el[EXTENDS] = hOP.call(description, EXTENDS) ?
      description[EXTENDS].prototype :
      HTMLElement.prototype
    ;
    key = hOP.call(description, NAME) ? description[NAME] : ('x-dom-class-' + i++);
    if (css) el[CSS] = restyle(key, description[CSS]);
    el[CONSTRUCTOR_CALLBACK] = function () {
      constructor.apply(this, args);
      if (css) {
        this.classList.add(uid(key));
        this.css = restyle(key + '.' + this.className.split(' ').pop(), {});
      }
      if (init) createdCallback.apply(this, args);
    };
    constructor = new Class(el);
    Element = document.registerElement(
      key,
      {prototype: constructor.prototype}
    );
    CustomElement.prototype = Element.prototype;
    return CustomElement;
  };
}(Array, Object));