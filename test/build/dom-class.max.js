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
var DOMClass = (function (g, A, O) {'use strict';
  var
    ATTACHED = 'onAttached',
    ATTACHED_CALLBACK = 'attachedCallback',
    CHANGED = 'onChanged',
    CHANGED_CALLBACK = 'attributeChangedCallback',
    CONSTRUCTOR = 'constructor',
    CONSTRUCTOR_CALLBACK = 'createdCallback',
    CSS = 'css',
    STYLE = '<style>',
    DETACHED = 'onDetached',
    DETACHED_CALLBAK = 'detachedCallback',
    EXTENDS = 'extends',
    NAME = 'name',
    hOP = O.hasOwnProperty,
    empty = A.prototype,
    copyOwn = function (source, target) {
      for (var k, p = gOK(source), i = p.length; i--;) {
        k = p[i];
        if (ignore.indexOf(k) < 0 && !hOP.call(target, k)) {
          dP(target, k, gOPD(source, k));
        }
      }
    },
    dP = O.defineProperty,
    gOPD = O.getOwnPropertyDescriptor,
    gOPN = O.getOwnPropertyNames || O.keys || function (o) {
      var a = [], k;
      for (k in o) if (hOP.call(o, k)) a.push(k);
      return a;
    },
    gOPS = O.getOwnPropertySymbols || function () {
      return empty;
    },
    getHTMLConstructor = function (name) {
      return g['HTML' + name + 'Element'];
    },
    gOK = function (obj) {
      return gOPS(obj).concat(gOPN(obj));
    },
    grantArguments = function (el, args) {
      if (!args.length) {
        var attr = el.getAttribute('data-arguments');
        if (attr) {
          args = attr.charAt(0) === '[' ?
            JSON.parse(attr) :
            attr.split(/\s*,\s*/);
        }
      }
      return args;
    },
    ignore = gOK(function () {}),
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
    lazyStyle = function (el, key, uniqueClassId) {
      var style;
      el.setAttribute('dom-class-uid', uniqueClassId);
      dP(el, CSS, {
        configurable: true,
        get: function () {
          return style || (style = restyle(
            key + '[dom-class-uid="' + uniqueClassId + '"]', {}
          ));
        },
        set: function (info) {
          el[CSS].replace(info);
        }
      });
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
      key, proto, nodeName
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
    if (el[EXTENDS] instanceof HTMLElement) {
      // dumbest thing I've possibly ever written, right here!
      //  Object.getOwnPropertyNames(this).filter((k) => {return k.slice(0, 4)==='HTML'}).map((k)=>{return k.slice(4, -7)}).sort();
      //  ["", "AllCol", "Anchor", "Applet", "Area", "Audio", "BR", "Base", "Body", "Button", "Canvas", "Col", "Content",
      //  "D", "DList", "DataList", "Details", "Dialog", "Directory", "Div", "Embed", "FieldSet", "Font", "Form", "FormControlsCol",
      //  "Frame", "FrameSet", "HR", "Head", "Heading", "Html", "IFrame", "Image", "Input", "Keygen", "LI", "Label", "Legend",
      //  "Link", "Map", "Marquee", "Media", "Menu", "Meta", "Meter", "Mod", "OList", "Object", "OptGroup", "Option", "OptionsCol",
      //  "Output", "Paragraph", "Param", "Picture", "Pre", "Progress", "Quote", "Script", "Select", "Shadow", "Source", "Span",
      //  "Style", "Table", "TableCaption", "TableCell", "TableCol", "TableRow", "TableSection", "Template", "TextArea", "Title",
      //  "Track", "UList", "Unknown", "Video"]
      // but I'll enable only most common one ... please file a bug if you need others
      // also, if you know a way to retrieve a nodeName via its constructor please shout it to me!
      switch (description[EXTENDS]) {
        case getHTMLConstructor('Anchor'): nodeName = 'a'; break;
        case getHTMLConstructor('Audio'): nodeName = 'audio'; break;
        case getHTMLConstructor('BR'): nodeName = 'br'; break;
        case getHTMLConstructor('Body'): nodeName = 'body'; break;
        case getHTMLConstructor('Button'): nodeName = 'button'; break;
        case getHTMLConstructor('Canvas'): nodeName = 'canvas'; break;
        case getHTMLConstructor('Col'): nodeName = 'col'; break;
        case getHTMLConstructor('DataList'): nodeName = 'dl'; break;
        case getHTMLConstructor('Div'): nodeName = 'div'; break;
        case getHTMLConstructor('Form'): nodeName = 'form'; break;
        case getHTMLConstructor('HR'): nodeName = 'hr'; break;
        case getHTMLConstructor('Head'): nodeName = 'head'; break;
        case getHTMLConstructor('IFrame'): nodeName = 'iframe'; break;
        case getHTMLConstructor('Image'): nodeName = 'img'; break;
        case getHTMLConstructor('Input'): nodeName = 'input'; break;
        case getHTMLConstructor('LI'): nodeName = 'li'; break;
        case getHTMLConstructor('Label'): nodeName = 'label'; break;
        case getHTMLConstructor('Legend'): nodeName = 'legend'; break;
        case getHTMLConstructor('Link'): nodeName = 'link'; break;
        case getHTMLConstructor('Menu'): nodeName = 'menu'; break;
        case getHTMLConstructor('OList'): nodeName = 'ol'; break;
        case getHTMLConstructor('Option'): nodeName = 'option'; break;
        case getHTMLConstructor('Paragraph'): nodeName = 'p'; break;
        case getHTMLConstructor('Progress'): nodeName = 'progress'; break;
        case getHTMLConstructor('Quote'): nodeName = 'quote'; break;
        case getHTMLConstructor('Select'): nodeName = 'select'; break;
        case getHTMLConstructor('Span'): nodeName = 'span'; break;
        case getHTMLConstructor('Style'): nodeName = 'style'; break;
        case getHTMLConstructor('Table'): nodeName = 'table'; break;
        case getHTMLConstructor('TableCaption'): nodeName = 'caption'; break;
        case getHTMLConstructor('TableCell'): nodeName = 'td'; break;
        case getHTMLConstructor('TableCol'): nodeName = 'colgroup'; break;
        case getHTMLConstructor('TableRow'): nodeName = 'tr'; break;
        case getHTMLConstructor('TableSection'): nodeName = 'tbody'; break;
        case getHTMLConstructor('Table'): nodeName = 'table'; break;
        case getHTMLConstructor('Table'): nodeName = 'table'; break;
        case getHTMLConstructor('TextArea'): nodeName = 'textarea'; break;
        case getHTMLConstructor('Track'): nodeName = 'track'; break;
        case getHTMLConstructor('UList'): nodeName = 'ul'; break;
        case getHTMLConstructor('Video'): nodeName = 'video'; break;
        // GZIP ALL THE THINGS!
      }
    }
    key = hOP.call(description, NAME) ? description[NAME] : ('x-dom-class-' + i++);
    if (css) el[STYLE] = restyle(key, description[CSS]);
    el[CONSTRUCTOR_CALLBACK] = function () {
      var a = grantArguments(this, args);
      args = empty;
      constructor.apply(this, a);
      if (css) lazyStyle(this, key, uid(key));
      if (init) createdCallback.apply(this, a);
    };
    constructor = new Class(el);
    copyOwn(constructor, CustomElement);
    proto = {prototype: constructor.prototype};
    // if we are extending an HTML element
    // we should retrieve a name and an `is` property
    if (nodeName) proto[EXTENDS] = nodeName;
    Element = document.registerElement(key, proto);
    CustomElement.prototype = Element.prototype;
    dP(Element.prototype, CONSTRUCTOR, {value: CustomElement});
    return CustomElement;
  };
}(this.window || global, Array, Object));