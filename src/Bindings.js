var Bindings = (function () {'usew strict';
  /*! (C) 2015 Andrea Giammarchi - Mit Style License */
  var
    dP = Object.defineProperty,
    ignore = /IFRAME|NOFRAMES|NOSCRIPT|SCRIPT|SELECT|STYLE|TEXTAREA|[a-z]/,
    oneWay = /\{\{\S+?\}\}/g,
    comma = /\s*,\s*/,
    colon = /\s*:\s*/,
    noOp = function () {}
  ;
  function boundTextNode(bindings, key, node) {
    dP(bindings, key, {
      enumerable: true,
      get: function () { return node.nodeValue; },
      set: function (value) { node.nodeValue = value; }
    });
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
    withBindings: function (info) {
      this.innerHTML = info.template;
      var
        document = this.ownerDocument || document,
        bindings = info.bindings || {},
        values = Object.create(null),
        textNodes = grabAllTextNodes(this, []),
        attributes = textNodes.slice.call(
          this.querySelectorAll('[data-bind]')
        ),
        onChanged = this.attributeChangedCallback || noOp
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
        nodes.push(value.slice(i));
        if (bound.length) {
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
        el.getAttribute('data-bind').split(comma).forEach(function (info) {
          var
            pair = info.split(colon),
            key = pair[0],
            value = pair[1] || key
          ;
          if (key in el) {
            el[key] = bindings[value] || '';
            dP(values, value, {
              get: function () { return el[key]; },
              set: function (value) { el[key] = value; }
            });
          } else {
            el.setAttribute(key, bindings[value]);
            dP(values, value, {
              get: function () { return el.getAttribute(key); },
              set: function (value) { el.setAttribute(key, value); }
            });
          }
        });
      });
      if (attributes.length) {
        dP(this, 'onChanged', {
          configurable: true,
          value: function (key, p, c) {
            if (key in values) {
              if (c == null) {
                delete values[key];
              } else {
                values[key] = c;
              }
            }
            onChanged.call(this, key, p, c);
          }
        });
      }
      return dP(this, 'bindings', {
        configurable: true,
        enumerable: true,
        writable: false,
        value: values
      });
    }
  };
}());

// examples

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
*/

/*
Bindings.withBindings.call(document.body, {
  template: '[a]{{b}}[c]',
  bindings: {b: '<b>wut</b>'}
});

document.body.bindings.b = 'hello there';
*/