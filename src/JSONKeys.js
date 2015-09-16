// Mixin Example - automatically serialized bindings
var JSONKeys = (function () {
  function bind(el, property) {
    Object.defineProperty(el, property, {
      configurable: true,
      get: function () {
        return JSON.parse(this.getAttribute(property));
      },
      set: function (value) {
        if (value == null) {
          this.removeAttribute(property);
        } else {
          this.setAttribute(property, JSON.stringify(value));
        }
      }
    });
  }
  return {
    setJSONKeys: function () {
      for (var i = arguments.length; i--; bind(this, arguments[i]));
      return this;
    }
  };
}());



// test it for real
var JSONStorage = new DOMClass({
  name: 'json-storage',
  with: JSONKeys
});

var js = document.body.appendChild(new JSONStorage);
js.setJSONKeys('name', 'age', 'info');

js.name = 'Andrea';
js.age = 37;
js.info = {
  currentCity: 'London',
  sports: ['Snowboarding', 'Skydiving']
};