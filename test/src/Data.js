var Data = Data || {

  /*! (C) 2015 Andrea Giammarchi - Mit Style License */

  data: function data(key, value) {
    var v, k = 'data-dom-class-' + String(key).replace(
      /([a-z])([A-Z])/g,
      function (m, l, U) {
        return l + '-' + U.toLowerCase();
      }
    ).toLowerCase();
    if (arguments.length === 2) {
      if (value == null) {
        this.removeAttribute(k);
      } else {
        this.setAttribute(k, JSON.stringify(value));
      }
    } else {
      v = this.getAttribute(k);
      return v == null ? v : JSON.parse(v);
    }
  }
};