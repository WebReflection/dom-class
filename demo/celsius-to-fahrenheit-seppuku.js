var CelsiusToFahrenheitSeppuku = DOMClass({
  'with': [DOMClass.bindings],
  template: '<div>' +
              '<input name="celsius" data-bind="value:celsius" type="number">°C' +
              '<span> ⇄ </span>' +
              '<input name="fahrenheit" data-bind="value:fahrenheit" type="number">°F' +
            '</div>',
  bindings: {
    // bindings can be setters too but it's easy to create a call-stack mess
    // this is just an example on how to instantly update two fields
    // no matters how the property is changed (user, ce.bindings, input.value)
    set celsius(value) { this.update('celsius', 'fahrenheit', this.toFahrenheit, value); },
    set fahrenheit(value) { this.update('fahrenheit', 'celsius', this.toCelsius, value); },
    // the main catch is to avoid recursive callbacks
    update: function (binding, change, converter, value) {
      // we need to ignore redundant calls
      if (!(binding in this.state)) {
        this.state[binding] = true;
        // we should also avoid changes in the other target
        if (!(change in this.state)) {
          // at this point we need to trigger the UI change
          // this is quite dirty approach because we deal with
          // UI in an entire DATA related context (data bindings)
          // However, we locked bindings out of their same setters
          // so this is actually kinda safe (and will try to invoke setters again)
          this[change + 'View'].value = converter.call(this, value);
        }
        delete this.state[binding];
      }
    },
    toCelsius: function (value) {
      return (5/9 * (parseFloat(value) - 32)).toFixed(1);
    },
    toFahrenheit: function (value) {
      return (9/5 * parseFloat(value) + 32).toFixed(1);
    }
  },
  constructor: function () {
    // enrich current bindings with a state
    // and give it the ability to directly change the UI
    this.bindings.state = Object.create(null);
    this.bindings.celsiusView = this.query('[name="celsius"]');
    this.bindings.fahrenheitView = this.query('[name="fahrenheit"]');
  }
});