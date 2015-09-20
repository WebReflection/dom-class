var XGreeter = DOMClass({

  // use bindings mixin
  'with': [DOMClass.bindings],

  // style any internal node with a class strong
  css: {'.strong':{fontWeight: 'bold'}},

  // template, it could be ES6 back-tick multi line string as well
  template: ''.concat(
    //
    // data-bind accepts one or more comma separated bindings.
    // Each data binding is a key:value pair
    //  - the key is the node property or attribute
    //  - the value is the property name in the bindings object
    // The value could also be method invocation.
    // In latter case, every time one of its parameters changes
    // the method will be re-executed and its return assigned
    // on the element as property or attribute.
    // example:
    '<p data-bind="class:changeClass(bold)">',
    //               ↑         ↑      ↑
    //               └─────────┤      └─── every time the 'bold'
    //                         │            property changes ┐
    // and the p 'class'       │                             │
    // attribute changes       └── changeClass gets invoked ←┘
    //
    // ---------------------------------------------------------
    //
    // When it comes to text nodes we don't have
    // properties or attributes like we do on elements.
    // In this case we can either bind a property by name
    // or just a method which will update the text node
    // content every time one of its parameters changes.
    //
      'Hello {{greeter(selectedIndex)}}, and Welcome!',
    //             ↑         ↑
    //             │         └─── every time the property
    // it's return │              selectedIndex changes ┐
    // is the text │                                    │
    //             └── the method greeter gets invoked ←┘
    '</p>',
    '<p><label>',
      '<small>How would like to be called?</small>', ' ',
      '<select data-bind="selectedIndex"></select>',
    //                          ↑
    // ┌────────────────────────┘
    // └─ if the element property is the same
    //    used in the bindings we can write propName
    //    instead of writing propName:propName.
    //
    //    If the select changes, or the bindings.selectedIndex
    //    is manually set to a different index
    //      - it invokes greeter(selectedIndex) writing new value
    //      - if it was a manual change it will update the select
    //      - if it was a UI user change it will update bindings
    //
    '</label></p>',
    '<p><label>',
      '<small>Would you like bold greetings?</small>', ' ',
      '<input type="checkbox" data-bind="checked:bold">',
    //                                      ↑     ↑
    // ┌────────────────────────────────────┴─────┘
    // └─ in this case we are binding the property bold
    //    of the bindings object with the checked status
    //    of the input and vice-versa, if the checked
    //    status changes for any reason, the bold property
    //    will update accordingly. This change will:
    //      - invoke the initial changeClass(bold)
    //      - it will update the class attribute on
    //        the first p node.
    //
    '</label></p>'
  ),

  // the binding object, it's inherited per each instance
  // but its bound properties are created on top
  // whenever this.createBindings(this.bindings) is called
  // The DOMClass.bindings mixin has aumatic mixin:init()
  // so that this will be understood and correctly analyzed
  // whenever a new instance is created
  bindings: {
    // reflects the initial <select> selectedIndex value
    selectedIndex: 0,
    // reflects the initial input checkbox status
    bold: 0,
    // not listened anywhere, it will be used in the constructor
    options: ['', 'Mrs', 'Miss', 'Mr', 'Jr', 'Chap'],
    // the greeter method with the index to show
    greeter: function (i) {
      // it's a method, its context is the current
      // instance of XGreeter bindings object
      return this.options[i] || 'user';
    },
    // the changeClass method returning the 'bold' or '' class
    changeClass: function (bold) {
      return bold ? 'strong' : '';
    }
  },

  // if true (or an integer greater than -1)
  // it will dispatch an event every time
  // something changes. When it's an integer
  // it will be used to debounce multiple calls.
  // If it's value is 0 it will assume ASAP invocation
  // and it will use requestAnimationFrame
  dispatchBindings: false,

  // it will be invoked per each new instance
  constructor: function () {
    // per each bindings.options
    this.bindings.options.forEach(function (option) {
      // create an option and append it to the select
      var el = this.appendChild(document.createElement('option'));
      // setting also value and content
      el.value = option;
      el.textContent = option;
    }, this.query('select'));
    // DOM4 has query and queryAll methods which look
    // for nested nodes only and DOMClass uses DOM4 features
  }
});