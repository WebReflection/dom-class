
// examples, feel free to ignore this file, is rather pointless in  its current state


/*

// test it for real
var EDiv = new DOMClass({
  with: Data,
  name: 'e-div',
  css: {'': {display: 'block'}},
  onChanged: function () {
    console.log(arguments);
  }
});

var ediv = document.body.appendChild(new EDiv);

ediv.data('name', 'Andrea');
ediv.data('age', 37);
ediv.data('info', {
  currentCity: 'London',
  sports: ['Snowboarding', 'Skydiving']
});

//*/

/*
document.body.innerHTML = '';
Bindings.withBindings.call(document.body, {
  template: '<input data-bind="value:a">' +
            '<input data-bind="value:b">' +
            '<input data-bind="value:sum(a,b)" disabled>' +
            '<br/>' +
            'The sum of {{a}} + {{b}} is equal to {{sum(a,b)}}',
  bindings: {a: 0, b: 0, sum: function (a, b) {
    var result = parseFloat(a) + parseFloat(b);
    return isNaN(result) ? '?' : result;
  }}
});
//*/

/*

document.body.innerHTML = '';
Bindings.withBindings.call(document.body, {
  template: '{{sum(a,b)}} or just {{a}} and just {{b}}',
  bindings: {a: 1, b: 2, sum: function (a, b) {
    return a + b;
  }}
});

*/

/*

var ToUpperCase = DOMClass({
  with: Bindings,
  template: '{{name}} {{surname}}',
  bindings: {
    get name() {
      return this._name;
    },
    set name(value) {
      this._name = value.toUpperCase();
    }
  }
});

var tuc = document.body.insertBefore(
  new ToUpperCase,
  document.body.firstChild
);


*/

/*

var Celsius2Fahrenheit = DOMClass({
  with: Bindings,
  name: 'celsius-2-Fahrenheit',
  css: {
    'input': {
      maxWidth: 64,
      border: {width: 1, color: 'silver'}
    }
  },
  template: '<div>' +
              '<input name="celsius" type="number" data-bind="value:celsius">°C' +
              '<span> ⇄ </span>' +
              '<input name="fahrenheit" type="number" data-bind="value:fahrenheit">°F' +
            '</div>',
  bindings: {
    celsius: 32,
    fahrenheit: 0
  },
  constructor: function () {
    this.addEventListener('input', function (e) {
      switch (e.target.name) {
        case 'celsius':
          e.currentTarget.bindings.fahrenheit =
            9/5 * parseFloat(e.target.value) + 32;
          break;
        case 'fahrenheit':
          e.currentTarget.bindings.celsius =
            5/9 * (parseFloat(e.target.value) - 32)
          break;
      }
    });
  },
  updateTemperature: function (which, temp) {
    if (which in this.bindings) {
      this.bindings[which] = temp;
      this.query('[name="' + which + '"]').dispatchEvent(
        new CustomEvent('input', {bubbles: true})
      ); 
    } else {
      alert('how to convert ' + which + ' ?');
    }
  }
});

var c2f = document.body.insertBefore(
  new Celsius2Fahrenheit,
  document.body.firstChild
);

//*/

/*
var EditableNameTag = DOMClass({
  with: Bindings,
  name: 'editable-name-tag',
  template: '<p data-bind="custom:owner">'+
              'This is a <strong>{{owner}}</strong>\'s editable-name-tag.' +
            '</p>' +
            '<input data-bind="value:owner" placeholder="Your name here...">',
  bindings: {owner: "Daniel"}
});

var ent = document.body.insertBefore(
  new EditableNameTag,
  document.body.firstChild
);

function verify() {
  console.log(
    ent.bindings.owner,
    ent.firstChild.getAttribute('custom'),
    ent.lastChild.value,
    ent.firstChild.childNodes[1].textContent
  );
}

setTimeout(function () {
  ent.bindings.owner = 'Andrea';
  setTimeout(function () {
    verify();
    ent.firstChild.setAttribute('custom', 'WebReflection');
    setTimeout(function () {
      verify();
      ent.lastChild.value = 'Daniel';
      setTimeout(verify, 1000);
    }, 1000);
  }, 1000);
}, 1000);

//*/

/*
Bindings.withBindings.call(document.body, {
  template: '<input data-bind="value:name, random">' +
            '<input type="checkbox" data-bind="checked">',
  bindings: {name: 'webreflection', random: 'wut', checked: false}
});

setTimeout(function () {
  document.body.bindings.name = 'asd';
  document.body.bindings.checked = true;
}, 500);
//*/

/*
Bindings.withBindings.call(document.body, {
  template: '{{dumber}} and {{dumber}}',
  bindings: {dumber: 'dumber'}
});

document.body.bindings.dumber = 'yo';
//*/

/*

var BoundContent = new DOMClass({
  with: Bindings
});

var bc = (new BoundContent).withBindings({
  template: '<span>{{text}}</span>',
  bindings: {text: 'Hello World'}
});

//*/