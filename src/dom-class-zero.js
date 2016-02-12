var DOMClass = (function (O,o) {

  /*! (C) Andrea Giammarchi */

  var
    create = O.create,
    css = create(null),
    dP = O.defineProperty,
    gOPD = O.getOwnPropertyDescriptor,
    gOPN = O.getOwnPropertyNames,
    gOPS = O.getOwnPropertySymbols,
    ownKeys = gOPS ?
      function (object) {
        return gOPN(object).concat(gOPS(object));
      } :
      gOPN,
    loadCSS = function (document, href) {
      var
        head =  document.head,
        link =  document.createElement('link')
      ;
      link.rel   = 'stylesheet';
      link.type  = 'text/css';
      link.href  = href;
      css[href] = head.insertBefore(link, head.lastChild);
    }
  ;

  return function DOMClass(description) {
    for (var
      k, name, xtends,
      constructor,
      stylesheet,
      descriptors = {},
      keys = ownKeys(description),
      set = function (s) {
        dP(descriptors, s, {
          enumerable: true,
          writable: true,
          value: gOPD(description, k)
        });
      },
      i = 0; i < keys.length; i++
    ) {
      k = keys[i];
      switch (k.toLowerCase()) {
        case 'name': name = description[k]; break;
        case 'stylesheet': stylesheet = description[k]; break;
        case 'extends':
          xtends = typeof description[k] === 'function' ?
            description[k].prototype : description[k];
          break;
        case 'constructor': constructor = description[k];
                            set('createdCallback');           break;
        case 'onattached':  set('attachedCallback');          break;
        case 'onchanged':   set('attributeChangedCallback');  break;
        case 'ondetached':  set('detachedCallback');          break;
        default: set(k); break;
      }
    }
    if (stylesheet) {
      descriptors.createdCallback.value = function () {
        if (!(stylesheet in css))
          loadCSS(this.ownerDocument || document, stylesheet);
        if (constructor) constructor.apply(this, arguments);
      };
    }
    return document.registerElement(
      name || ('zero-dom-class-'+ ++o),
      {prototype: create(xtends || HTMLElement.prototype, descriptors)}
    );
  };

}(Object, 0));