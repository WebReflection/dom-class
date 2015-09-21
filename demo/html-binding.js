var HtmlBinding = DOMClass({
  'with': DOMClass.bindings,
  template: 'there will be some html  here: {{{html}}}',
  bindings: {html: 'Oh <strong>hi</strong> there!'}
});