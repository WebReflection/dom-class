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
  }
]);
