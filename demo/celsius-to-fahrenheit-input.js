var CelsiusToFahrenheitInput = DOMClass({
  'with': [DOMClass.bindings],
  template: '<div>' +
              '<input name="celsius" data-bind="value:celsius" type="number">°C' +
              '<span> ⇄ </span>' +
              '<input name="fahrenheit" data-bind="value:fahrenheit" type="number">°F' +
            '</div>',
  bindings: {},
  constructor: function () {
    // whenever an input event bubbles up
    this.addEventListener('input', this);
  },
  handleEvent: function (e) {
    // if it was a celsius, update fahrenheit and vice-versa
    var
      key = e.target.name,
      which = key === 'celsius' ?
        'fahrenheit' : 'celsius',
      convert = key === 'celsius' ?
        'toFahrenheit' : 'toCelsius'
    ;
    this.bindings[which] = this[convert](e.target.value);
  },
  setCelsius: function (value) {
    this.bindings.celsius = value;
    this.bindings.fahrenheit = this.toFahrenheit(value);
  },
  setFahrenheit: function (value) {
    this.bindings.fahrenheit = value;
    this.bindings.celsius = this.toCelsius(value);
  },
  toCelsius: function (value) {
    return (5/9 * (parseFloat(value) - 32)).toFixed(1);
  },
  toFahrenheit: function (value) {
    return (9/5 * parseFloat(value) + 32).toFixed(1);
  }
});