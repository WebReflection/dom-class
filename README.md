dom-class [![build status](https://secure.travis-ci.org/WebReflection/dom-class.svg)](http://travis-ci.org/WebReflection/dom-class)
=========

Built on top of [es-class](https://github.com/WebReflection/es-class#es-class-), and integrating handy [restyle](https://github.com/WebReflection/restyle#restyle) features, `DOMClass` is a lightweight, cross browser, simplification of [WebComponents](http://www.w3.org/standards/techs/components#w3c_all).


Please read the [related blog post](https://www.webreflection.co.uk/blog/2015/09/17/simplified-web-components-via-dom-class) to know extra details about this project.


### Demo
In case of doubts, some demo could quickly clarify DOMClass potentials so here they are:

  * the (in)famouse [DBMonster](http://webreflection.github.io/dom-class/demo/dbmonster.html) benchmark, a [component](https://github.com/WebReflection/dom-class/blob/master/demo/db-monster.js) split in rows and cells that performs like its pure DOM counter part
  * few [classic basic components](http://webreflection.github.io/dom-class/demo/) for forms and playful interaction, or runtime creation
  * a one to one [comparison VS Knockout JS](http://webreflection.github.io/dom-class/demo/domclass-vs-knockoutjs/), showing main differences between these two approaches. TL;DR is that `DOMClass` doesn't use `eval` or `Function` and it's based on DRY components rather than magic HTML parsing (which is not necessarily a bad thing but it's surely a different paradigm)

Finally a quoted comment from [DOMClass.bindings Mixin VS Performance](https://www.webreflection.co.uk/blog/2015/09/21/dom-class-bindings-vs-performance) post

> This is seriously cool ... so much functionality via so little framework code.It begs the question ... "What the heck are those other frameworks doing that involves so much code?". I especially like that it is based on the existing web platform as opposed to what is promised in V.Next (i.e. ES5,6, etc, etc). Outstanding work.


### How To
All [es-class features](https://github.com/WebReflection/es-class#features-example) are included, and the `constructor` will be automatically used once  the component has been initialized.

```js
var MyComponent = new DOMClass({
  constructor: function () {
    this.textContent = 'Hello World!';
  }
});

document.body.append(new MyComponent);
```

While by default new components will be created name-conflict free, it is possible to specify the desired node name via the `name` property.

```js
var XAMe = new DOMClass({
  name: 'x-a-me',
  constructor: function () {
    console.log(this.textContent);
  }
});

// we can create via new DOMClass
// or we can use the name
document.body.innerHTML = '<x-a-me>Hello Again!</x-a-me>';
```

### Extending natives
Since version `0.4.0` it is also possible to extend directly extend native and all we need is basically the following:
```js
var MyInput = DOMClass({
  extends: HTMLInputElement,
  // just for demo purpose
  constructor: function (value) {
    this.value = value;
  }
});

document.query('form').appendChild(
  new MyInput('hello')
);
```
If a native constructor is used, and it's an instance of `HTMLElement`, there's no need to use the `is` property, stick with a name and `DOMClass` will take care of the rest.


### DOMClass.bindings Mixin
Both one and two way bindings are supported, thanks to [the bindings mixin](https://github.com/WebReflection/dom-class/blob/master/src/Bindings.js). It is also possible to update partial text or html content using a different amount of curly brackets.

```js
// bringing bindings in
var EasyBindings = DOMClass({
  // bring bindings in as a mixin
  with: [DOMClass.bindings],
  // bindings will look for an optional template
  template: `
        <div>
          This will be test: {{textContent}}.<br/>
          This will be html: {{{htmlContent}}}<br/>
          While this will call upper(textContent) each time textContent changes:
          {{upper(textContent)}}<br/>
          And this will call upper(htmlContent) each time it changes:
          {{{upper(htmlContent)}}}
        </div>
  `,
  // and an optional bindings property
  bindings: {
    // we are binding textContent and htmlContent
    // we can optionally provide their defaults
    textContent: 'just <strong>text</strong>, really',
    htmlContent: 'so <strong>bring it on</strong>, html!',
    // we are also binding a method invocation
    // that will update its bound "space" when one of its
    // parameters changes
    upper: function (textOrHTML) {
      return textOrHTML.toUpperCase();
    }
    // we could add any extra property or method, even if not bound
  }
});
```
In order to avoid any sort of conflicts with the component itself, the bindings mixin creates per each new instance a `bindings` property
that will inherit from the one defined in the class so that defaults and methods can simply be shared.

We can use this property to update the text just like this:
```js
var eb = document.body.appendChild(
  new EasyBindings
);

// how can we change those properties?
eb.bindings.textContent = 'is that it?';
// it will update only yhe text part of the node

// let's update the html too
eb.bindings.htmlContent = 'but this is <strong>awesome</strong>!';
```
The bindings property is not directly aware of its owner, which is in the previous example the `new EasyBindings` variable called `eb`.
This peculiarity ensures that data bindings will be data related, and never directly UI one.
It separates concerns between the component itself and the kind of data it needs to take care of.


### Two way attributes binding
We can update some content, but we cannot be updated if the content is manually changed. This is where two way bindings become handy: inputs, selects, nodes and classes, others ... these can be all managed via this mixin.

Inspired by [KnockoutJS data-bind syntax](http://knockoutjs.com/documentation/binding-syntax.html), `DOMClass.bindings` mixin will also look for `data-bind` attribute and bind properties accordingly.

This time we'll have any sort of property name on the left, and  any sort of value on its right.
```js
var InputName = DOMClass({
  with: DOMClass.bindings,
  template: `
    <input data-bind="value:name"><br>
    Hello {{name}}!
  `
});

var me = document.body.appendChild(new InputName);
me.bindings.name = 'Andrea';
```
We can now even change directly `me.firstChild.value = "really?"` or `me.bindings.name = "no way!"` or simply digit our name in the input.


### Computed one way attributes
Like it is for text and html, we can compute those attributes that won't be manually changed.
```js
var LogIn = DOMClass({
  with: DOMClass.bindings,
  template: `
    <div>
      <input placeholder="user" data-bind="value:user">
      <br>
      <input placeholder="pass" data-bind="value:pass" type="password">
      <br>
      <input
        type="submit"
        data-bind="disabled:unauthorized(user,pass)"
      >
    <div>
  `,
  bindings: {
    unauthorized: function (user, pass) {
      return !(
        /\S+/.test(user || '') &&
        /\S{8,}/.test(pass || '')
      );
    }
  }
});


var login = document.body.appendChild(new LogIn);
// try to use input fields directly or ...
login.bindings.user = 'this should be';
login.bindings.pass = 'safe-enough';

```
If any of the parameters in `unauthorized` method gets updated, its DOM counterpart will be updated.
This works within the component or its bindings object, or from the outer world.


#### Same attribute and property name
The mixin is smart enough to understand same properties name. If the binding is called value, no need to `value:value`, just `value` would do.
```js
{
  template: `
    <input data-bind="value">
  `,
  bindings: {value: 'default'}
}
```


#### Multiple attributes binding per node
Using comma separated value would do.
```js
{
  template: `
    <span data-bind="key,data-wut:wut(some,prop),no:worries"></span>
  `,
  bindings: {
    key: 'some-key-name',
    wut: function (a, b) {
      return a +  b;
    },
    worries: 'nope'
  }
}
```

### Dispatching changed bindings
If the `dispatchBindings` property is defined, and it's either truthy or an integer greater than -1, the component will trigger a `bindingChanged` event each time something changed.
```js
var ChangingInput = DOMClass({
  with: DOMClass.bindings,
  dispatchBindings: true,
  template: '<input data-bind="value">'
});

document.body.appendChild(
  new ChangingInput
).addEventListener(
  'bindingChanged',
  console.log.bind(console)
);
```
Every time we type a letter in that input its parent component will dispatch a `CustomEvent` with a `detail` property which will contain at least two properties: `key`, representing the component `bindings[key]` that triggered such notification, and `value`, which will be the newly assigned value to that bindings property.

Please note that by default, or better setting `dispatchBindings` just as true, there will be a delay between notifications.

This makes the mechanism less greedy by default but if needed, we can specify an arbitrary amount of milliseconds.
Such amount will be used as `setTimoeut` delay or as `requestAnimationFrame` one in case it's 0, where 0 in this case means *ASAP*.

Bear in mind if you have a listener and within such lister you change another binding in the same component you are luckily to put yourself into an infinite updating loop: don't mix up UI changes and events notification with data related binding!


#### Going dirty with bindings
Of course it would be possible to assign `eb.bindings.self = this` within its constructor, but if we need to directly modify the DOM when data changes and from the inside of a bound method or setter (yes, setters in bindings are supported too) then we might rethink the logic.
There are few sketchy attempts in the demo folder, the `CelsiusToFahrenheitBindingChanged` and the `CelsiusToFahrenheitSeppuku`. These are really not recommended approaches since everything could be solved easily and cleanly via the `CelsiusToFahrenheitInput` one.


### Custom Elements callbacks
All [famous and verbose CustomElement callbacks](http://www.w3.org/TR/custom-elements/#types-of-callbacks) are aliased in a simpler, yet semantic, way.

```js
var MyCE = new DOMClass({

  // equivalent of createdCallback
  // will be invoked after the component will get initialized
  // in case there are mixins or super extends
  constructor: function () {},

  // equivalent of attachedCallback
  onAttached: function () {},

  // equivalent of detachedCallback
  onDetached: function () {},

  // equivalent of attributeChangedCallback
  onChanged: function () {}

});
```

It is possible to style elements per Component, which will eventually also create a `css` property we can use to apply own specific styles.

```js
var XSquare = new DOMClass({
  name: 'x-square',
  css: {
    // to self reference the component
    // it is also possible to use just empty selector
    // handy specially when the name is unknown
    'x-square': {
      display: 'block',
      padding: 0,
      width: 32,
      height: 32,
      border: '1px solid black'
    },
    // to reference any element within the component
    // simply use regular CSS selectors
    'span': {
      display: 'inline-block',
      width: '100%',
      lineHeight: 32,
      textAlign: 'center',
      font: {
        size: 26,
        weight: 'bold'
      }
    }
    // mediq queries, animations, and everything else
    // are also supported. Please see `restyle` documentation
  },
  // Yes! DOMClass accepts arguments too \o/
  constructor: function (text) {
    this.innerHTML = '<span>' + text + '</span>';
    // if there is a css in the prototype,
    // we can use the css property to overwrite/set the inherited one
    // following is the equivalent of this.css = { ... }
    this.css.set({
      // empty selector, same as using 'x-square'
      // to reference itself
      '': {
        backgroundColor: 'rgb(' + [
          Math.random() * 256 | 0,
          Math.random() * 256 | 0,
          Math.random() * 256 | 0
        ].join(',') + ')'
      }
    });
  }
});

// example
document.body.append(new XSquare('!'));
document.body.append(new XSquare('A'));
document.body.append(new XSquare('Z'));
```

Please note there is no ShadowDOM, template, or HTMLImport polyfill, everything works with regular, well supported, HTML5 standards and on  top of [document.registerElement](https://github.com/WebReflection/document-register-element#document-register-element).


### Live demos and benchmarks
In [the following demo page](http://webreflection.github.io/dom-class/demo/) it's possible to interact with components. Read its source code to know more.

The famous [DBMonster benchmark](http://webreflection.github.io/dom-class/demo/dbmonster.html) is also available for fun and comparison.
All compatible devices can also be tested against this page and the component file is just [this little](https://github.com/WebReflection/dom-class/blob/master/demo/db-monster.js).


### Compatibility

The following list of **desktop** browsers has been successfully tested:

  * Chrome
  * Firefox
  * IE9 or greater
  * Safari
  * Opera

The following list of **mobile** OS has been successfully tested:

  * iOS 5.1 or greater
  * Android 2.2 or greater
  * FirefoxOS 1.1 or greater
  * KindleFire 3 or greater
  * Windows Phone 7 or greater
  * Opera Mobile 12 or greater
  * Blackberry OS 10
  * webOS 2 or LG TV
  * Samsung Bada OS 2 or greater

If you'd like to know if your browser is supported please check the [live test page](http://webreflection.github.io/dom-class/test/) and let me know if something is not green, thank you.


### Which file for what ?

The [build folder](https://github.com/WebReflection/dom-class/blob/master/build/) contains all variants, following explained:

  * **vanilla** `DOMClass` [minified](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.js) or [magnified](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.max.js), both requires [es-class](https://github.com/WebReflection/es-class) and, if used, [restyle](https://github.com/WebReflection/restyle)
  * **browserify** [CommonJS module](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.node.js), which also depends on [es-class](https://github.com/WebReflection/es-class) and [restyle](https://github.com/WebReflection/restyle)
  * **AMD** [module](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.amd.js), which also depends on [es-class](https://github.com/WebReflection/es-class) and [restyle](https://github.com/WebReflection/restyle)
  * **Vitamer JS** [all in one shot](https://github.com/WebReflection/dom-class/blob/master/build/vitamer.js), which also optionally comes with [query-result](https://github.com/WebReflection/query-result) to simplify common DOM manipulation and operations. Such version is called [vitamer-qr.js](https://github.com/WebReflection/dom-class/blob/master/build/vitamer-qr.js)
  * **dom-class-mixins** [minified](https://github.com/WebReflection/dom-class/blob/master/build/dom-class-mixins.js) to bring with DOMClass handy/evergreen mixins like `DOMClass.bindings`
  * **Vitamer Mixins** [all in one file](https://github.com/WebReflection/dom-class/blob/master/build/vitamer-mixins.js) used in this repository for all tests and demos too.
  * **Vitamer Mixins and $('query-selector')** [all in one file](https://github.com/WebReflection/dom-class/blob/master/build/vitamer-mixins-qr.js), to simplify DOM manipulation on top of all the goodies brought in via `vitamer`


### What is Vitamer JS ?
Directly [from Wikipedia](https://en.wikipedia.org/wiki/Vitamer):

> Typically, the vitamin activity of multiple vitamers is due to the body's (limited) ability to convert one vitamer to another, or many vitamers to the same enzymatic cofactor(s), which is active in the body as the important form of the vitamin.
> 
> As part of the definition of vitamin, the body cannot completely synthesize an optimal amount of vitamin activity from simple foodstuffs, without some minimal amount of a vitamer molecule as a basis.

In this case it's the minimum amount of packages required in order to obtain a modern, comfortable, and cross browser environment based on latest DOM standards and proposals.

The "_all in  one shot_" file contains the following modules:

  * IE9 only [quick fix](src/ie-lte-9.js) for [standard timers](http://www.w3.org/TR/2011/WD-html5-20110525/timers.html#timers)
  * the [dom4](https://github.com/WebReflection/dom4) normalizer
  * the [document-register-element](https://github.com/WebReflection/document-register-element) polyfill
  * the powerful and handy [restyle](https://github.com/WebReflection/restyle)
  * the awesome [es-class](https://github.com/WebReflection/es-class), with lightweight traits capability and many other goodies
  * optionally the quick and clean [query-result](https://github.com/WebReflection/query-result) to simplify DOM operations
  * optionally DOMClass.mixins such `bindings` and `data` or others

From vanilla JS world, above package might be truly everything you need in order to create amazing apps, forgetting about cross platform issues or performance gotchas (greedy RAM or CPU operations).

Since the total package amount, once minified and gzipped, is *less than 9KB*, I thought *Vitamer*, as opposite to the well known *Polymer*,  would have worked as file name. Let me know if you have better name ideas :-)



### License
The MIT Style License
```
Copyright (C) 2015 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
