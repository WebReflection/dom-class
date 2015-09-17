var Bindings = (function () {'usew strict';
  /*! (C) 2015 Andrea Giammarchi - Mit Style License */
  var
    create = Object.create,
    dP = Object.defineProperty,
    gOPD = Object.getOwnPropertyDescriptor,
    ignore = /IFRAME|NOFRAMES|NOSCRIPT|SCRIPT|SELECT|STYLE|TEXTAREA|[a-z]/,
    oneWay = /\{\{\S+?\}\}/g,
    comma = /\s*,\s*/,
    colon = /\s*:\s*/,
    noOp = function () {},
    createGetSet = function (get, set) {
      return {
        configurable: true,
        enumerable: true,
        get: get,
        set: set
      };
    },
    MO = window.MutationObserver,
    noMO = !MO
  ;
  function boundTextNode(bindings, key, node) {
    dP(bindings, key, createGetSet(
      function get() { return node.nodeValue; },
      function set(value) { node.nodeValue = value; }
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
    withBindings: function (info) {
      if (info.template) this.innerHTML = info.template;
      var
        document = this.ownerDocument || document,
        onChanged = this.attributeChangedCallback || noOp,
        bindings = info.bindings || {},
        values = create(null),
        map = create(null),
        textNodes = grabAllTextNodes(this, []),
        attributes = textNodes.slice.call(
          this.querySelectorAll('[data-bind]')
        )
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
            value = pair[1] || key,
            oneWay = value in values,
            native = key in el,
            update = true,
            handler,
            setter
          ;
          if (oneWay) setter = gOPD(values, value).set;
          if (native) {
            el[key] = bindings[value] || '';
            dP(values, value, createGetSet(
              function get() { return el[key]; },
              function set(value) {
                if (update) el[key] = value;
                if (oneWay) setter(el[key]);
              }
            ));
            handler = function (e) {
              update = false;
              values[value] = el[key];
              update = true;
            };
            switch (key) {
              case 'value':
                el.addEventListener('input', handler, true);
              case 'checked':
                el.addEventListener('change', handler, true);
                break;
            }
          } else {
            map[key] = value;
            el.setAttribute(key, bindings[value]);
            dP(values, value, createGetSet(
              function get() { return el.getAttribute(key); },
              function set(value) {
                if (update) el.setAttribute(key, value);
                if (oneWay) setter(el.getAttribute(key));
              }
            ));
            handler = function (e) {
              update = false;
              values[value] = el.getAttribute(key);
              update = true;
            };
            if (noMO) el.addEventListener('DOMAttrModified', handler, true);
            else (new MO(handler)).observe(el, {attributes: true});
          }
        });
      });
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

/*

var EditableNameTag = DOMClass({
  with: Bindings,
  name: 'editable-name-tag'
});

document.body.appendChild(new EditableNameTag).withBindings({
  template: '<p data-bind="custom:owner">'+
              'This is a <strong>{{owner}}</strong>\'s editable-name-tag.' +
            '</p>' +
            '<input data-bind="value:owner" placeholder="Your name here...">',
  bindings: {owner: "Daniel"}
});

//*/