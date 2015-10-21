var minifiedHTML = (function (escaped, es, trim, voidType) {
  function attributes(el) {
    for (var
      attr,
      value,
      out = [],
      attrs = el.attributes,
      len = attrs.length,
      i = 0; i < len; i++
    ) {
      attr = attrs[i];
      value = attr.value || attr.nodeValue || '';
      out.push(' ', attr.name || attr.nodeName);
      if (value) out.push('="', value.replace(es, cape), '"');
    }
    return out.join('');
  }
  function cape(m) {
    return escaped[m];
  }
  function minifiedHTML(el) {
    if (el.nodeType !== 1) return '';
    for (var
      child,
      nodeName = (el.nodeName || el.tagName).toLowerCase(),
      out = ['<', nodeName, attributes(el), '>'],
      childNodes = el.childNodes,
      len = childNodes.length,
      i = 0; i < len; i++
    ) {
      child = childNodes[i];
      switch (child.nodeType) {
        case 1: out.push(minifiedHTML(child));
          break;
        case 3: out.push(child.textContent.replace(trim, '').replace(es, cape));
          break;
      }
    }
    if (!voidType.test(nodeName)) out.push('</', nodeName, '>');
    return out.join('');
  }
  return minifiedHTML;
}(
  {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  },
  /[&<>'"]/g,
  /^\s+|\s+$/g,
  /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i
));