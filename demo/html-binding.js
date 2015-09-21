var HtmlBinding = DOMClass({
  'with': DOMClass.bindings,
  template: 'some `{{text}}` text boldified: {{{bold(text)}}}. ' +
            'Also some plain html: `{{{html}}}`!',
  bindings: {
    text: 'plain',
    html: 'too <strong>damn</strong> easy',
    bold: function (value) {
      return '<strong>' + this.escape(value) + '</strong>';
    },
    escape: function (value) {
      return value.replace(/[&<>'"]/g, function (m) {
        return '&#' + m.charCodeAt(0) + ';';  
      });
    }
  }
});