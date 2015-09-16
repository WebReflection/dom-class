var SimpleBindings = {
  bindProperties: (function () {
    function bind(name) {
      Object.defineProperty(this, name, {
        configurable: true,
        get: function () {
          return this.getAttribute(name);
        },
        set: function (value) {
          if (value == null) {
            this.removeAttribute(name);
          } else {
            this.setAttribute(name, value);
          }
        }
      });
    }
    return function bindProperties() {
      for (var i = arguments.length; i--; bind.call(this, arguments[i]));
      return this;
    };
  }())
};



// test it for real
var Bindable = new DOMClass({
  with: SimpleBindings,
  onChanged: function () {
    console.log(arguments);
  }
});

var el = document.body.appendChild(new Bindable);
el.bindProperties('a', 'b', 'c');
el.a = 'a like agony';
el.b = 'b like boring';
el.c = 'c like cool';
