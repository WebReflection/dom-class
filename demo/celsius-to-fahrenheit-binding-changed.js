var CelsiusToFahrenheitBindingChanged = DOMClass({
  'with': [DOMClass.bindings],
  template: '<div>' +
              '<input name="celsius" data-bind="value:celsius" type="number">°C' +
              '<span> ⇄ </span>' +
              '<input name="fahrenheit" data-bind="value:fahrenheit" type="number">°F' +
            '</div>',
  bindings: {},
  dispatchBindings: true,
  constructor: function () {
    this.addEventListener('bindingChanged', this);
  },
  handleEvent: function (e) {
    // if it was a celsius, update fahrenheit and vice-versa
    var
      key = e.detail.key,
      which = key === 'celsius' ?
        'fahrenheit' : 'celsius',
      convert = key === 'celsius' ?
        'toFahrenheit' : 'toCelsius',
      value = this[convert](e.detail.value)
    ;
    // avoid repeated dispatch when value is the same
    if (value !== this.bindings[which])
      this.bindings[which] = value;
  },
  toCelsius: function (value) {
    return (5/9 * (parseFloat(value) - 32)).toFixed(1);
  },
  toFahrenheit: function (value) {
    return (9/5 * parseFloat(value) + 32).toFixed(1);
  },
  setCelsius: function (value) {
    // this will cause a dispatch
    this.bindings.celsius = value;
  },
  setFahrenheit: function (value) {
    // this will cause a dispatch
    this.bindings.fahrenheit = value;
  }
});