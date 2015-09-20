var InputMirror = DOMClass({
  'with': DOMClass.bindings,
  template: '<div>' +
    '<input data-bind="value" placeholder="mirror">\n' +
    '<span>{{value}}</span>' +
  '</div>'
});