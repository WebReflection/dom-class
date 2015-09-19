dom-class [![build status](https://secure.travis-ci.org/WebReflection/dom-class.svg)](http://travis-ci.org/WebReflection/dom-class)
=========

Built on top of [es-class](https://github.com/WebReflection/es-class#es-class-), and integrating handy [restyle](https://github.com/WebReflection/restyle#restyle) features, `DOMClass` is a lightweight, cross browser, simplification of [WebComponents](http://www.w3.org/standards/techs/components#w3c_all).


Please read the [related blog post](https://www.webreflection.co.uk/blog/2015/09/17/simplified-web-components-via-dom-class) to know extra details about this project.

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
  * Blackberry OS 7* and OS 10
  * webOS 2 or LG TV
  * Samsung Bada OS 2 or greater
  * NOKIA Asha with Express Browser

If you'd like to know if your browser is supported please check the [live test page](http://webreflection.github.io/dom-class/test/) and let me know if something is not green, thank you.


### Which file for what ?

The [build folder](https://github.com/WebReflection/dom-class/blob/master/build/) contains all variants, following explained:

  * **vanilla** `DOMClass` [minified](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.js) or [magnified](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.max.js), both requires [es-class](https://github.com/WebReflection/es-class) and, if used, [restyle](https://github.com/WebReflection/restyle)
  * **browserify** [CommonJS module](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.node.js), which also depends on [es-class](https://github.com/WebReflection/es-class) and [restyle](https://github.com/WebReflection/restyle)
  * **AMD** [module](https://github.com/WebReflection/dom-class/blob/master/build/dom-class.amd.js), which also depends on [es-class](https://github.com/WebReflection/es-class) and [restyle](https://github.com/WebReflection/restyle)
  * **Vitamer JS** [all in one shot](https://github.com/WebReflection/dom-class/blob/master/build/vitamer.js), which also optionally comes with [query-result](https://github.com/WebReflection/query-result) to simplify common DOM manipulation and operations. Such version is called [vitamer-qr.js](https://github.com/WebReflection/dom-class/blob/master/build/vitamer-qr.js)


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
