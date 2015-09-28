/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
/*@cc_on (function(f){window.setTimeout=f(window.setTimeout);window.setInterval=f(window.setInterval)})(function(f){return function(c,t){var a=[].slice.call(arguments,2);return f(function(){c.apply(this,a)},t)}}); @*/
(function(e){"use strict";function t(){return l.createDocumentFragment()}function n(e){return l.createElement(e)}function r(e){if(e.length===1)return i(e[0]);for(var n=t(),r=I.call(e),s=0;s<e.length;s++)n.appendChild(i(r[s]));return n}function i(e){return typeof e=="string"?l.createTextNode(e):e}for(var s,o,u,a,f,l=e.document,c=Object.defineProperty||function(e,t,n){e.__defineGetter__(t,n.get)},h=[].indexOf||function(t){var n=this.length;while(n--)if(this[n]===t)break;return n},p=function(e){if(!e)throw"SyntaxError";if(y.test(e))throw"InvalidCharacterError";return e},d=function(e){var t=e.className,n=typeof t=="object",r=(n?t.baseVal:t).replace(g,"");r.length&&F.push.apply(this,r.split(y)),this._isSVG=n,this._=e},v={get:function(){return new d(this)},set:function(){}},m="dom4-tmp-".concat(Math.random()*+(new Date)).replace(".","-"),g=/^\s+|\s+$/g,y=/\s+/,b=" ",w="classList",E=function(t,n){if(this.contains(t))n||this.remove(t);else if(n===undefined||n)n=!0,this.add(t);return!!n},S=e.DocumentFragment,x=e.Node,T=x&&x.prototype,N=e.CharacterData||x,C=N&&N.prototype,k=e.DocumentType,L=k&&k.prototype,A=(e.Element||x||e.HTMLElement).prototype,O=e.HTMLSelectElement||n("select").constructor,M=O.prototype.remove,_=e.ShadowRoot,D=e.SVGElement,P=/ /g,H="\\ ",B=function(e){var t=e==="querySelectorAll";return function(n){var r,i,s,o,u,a,f=this.parentNode;if(f){for(s=this.getAttribute("id")||m,o=s===m?s:s.replace(P,H),a=n.split(","),i=0;i<a.length;i++)a[i]="#"+o+" "+a[i];n=a.join(",")}s===m&&this.setAttribute("id",s),u=(f||this)[e](n),s===m&&this.removeAttribute("id");if(t){i=u.length,r=new Array(i);while(i--)r[i]=u[i]}else r=u;return r}},j=function(e){"query"in e||(e.query=A.query),"queryAll"in e||(e.queryAll=A.queryAll)},F=["matches",A.matchesSelector||A.webkitMatchesSelector||A.khtmlMatchesSelector||A.mozMatchesSelector||A.msMatchesSelector||A.oMatchesSelector||function(t){var n=this.parentNode;return!!n&&-1<h.call(n.querySelectorAll(t),this)},"closest",function(t){var n=this,r;while((r=n&&n.matches)&&!n.matches(t))n=n.parentNode;return r?n:null},"prepend",function(){var t=this.firstChild,n=r(arguments);t?this.insertBefore(n,t):this.appendChild(n)},"append",function(){this.appendChild(r(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(r(arguments),this)},"after",function(){var t=this.parentNode,n=this.nextSibling,i=r(arguments);t&&(n?t.insertBefore(i,n):t.appendChild(i))},"replace",function(){this.replaceWith.apply(this,arguments)},"replaceWith",function(){var t=this.parentNode;t&&t.replaceChild(r(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)},"query",B("querySelector"),"queryAll",B("querySelectorAll")],I=F.slice,q=F.length;q;q-=2)o=F[q-2],o in A||(A[o]=F[q-1]),o==="remove"&&(O.prototype[o]=function(){return 0<arguments.length?M.apply(this,arguments):A.remove.call(this)}),/before|after|replace|remove/.test(o)&&(N&&!(o in C)&&(C[o]=F[q-1]),k&&!(o in L)&&(L[o]=F[q-1]));j(l);if(S)j(S.prototype);else try{j(t().constructor.prototype)}catch(R){}_&&j(_.prototype),n("a").matches("a")||(A[o]=function(e){return function(n){return e.call(this.parentNode?this:t().appendChild(this),n)}}(A[o])),d.prototype={length:0,add:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)||F.push.call(this,o);this._isSVG?this._.setAttribute("class",""+this):this._.className=""+this},contains:function(e){return function(n){return q=e.call(this,o=p(n)),-1<q}}([].indexOf||function(e){q=this.length;while(q--&&this[q]!==e);return q}),item:function(t){return this[t]||null},remove:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)&&F.splice.call(this,q,1);this._isSVG?this._.setAttribute("class",""+this):this._.className=""+this},toggle:E,toString:function U(){return F.join.call(this,b)}},D&&!(w in D.prototype)&&c(D.prototype,w,v),w in l.documentElement?(a=n("div")[w],a.add("a","b","a"),"a b"!=a&&(u=a.constructor.prototype,"add"in u||(u=e.TemporaryTokenList.prototype),f=function(e){return function(){var t=0;while(t<arguments.length)e.call(this,arguments[t++])}},u.add=f(u.add),u.remove=f(u.remove),u.toggle=E)):c(A,w,v),"contains"in T||c(T,"contains",{value:function(e){while(e&&e!==this)e=e.parentNode;return this===e}}),"head"in l||c(l,"head",{get:function(){return s||(s=l.getElementsByTagName("head")[0])}}),function(){for(var t,n=e.requestAnimationFrame,r=e.cancelAnimationFrame,i=["o","ms","moz","webkit"],s=i.length;!r&&s--;)n=n||e[i[s]+"RequestAnimationFrame"],r=e[i[s]+"CancelAnimationFrame"]||e[i[s]+"CancelRequestAnimationFrame"];r||(n?(t=n,n=function(e){var n=!0;return t(function(){n&&e.apply(this,arguments)}),function(){n=!1}},r=function(e){e()}):(n=function(e){return setTimeout(e,15,15)},r=function(e){clearTimeout(e)})),e.requestAnimationFrame=n,e.cancelAnimationFrame=r}();try{new e.CustomEvent("?")}catch(R){e.CustomEvent=function(e,t){function n(n,i){var s=l.createEvent(e);if(typeof n!="string")throw new Error("An event name must be provided");return e=="Event"&&(s.initCustomEvent=r),i==null&&(i=t),s.initCustomEvent(n,i.bubbles,i.cancelable,i.detail),s}function r(e,t,n,r){this.initEvent(e,t,n),this.detail=r}return n}(e.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}})(window);
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)dt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(dt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.prevValue,i=e.newValue;Q&&t.attributeChangedCallback&&e.attrName!=="style"&&t.attributeChangedCallback(e.attrName,n===e[a]?null:r,n===e[l]?null:i)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(F.splice(t,1),dt(e,o))}function dt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function vt(e){return e?(vt.prototype=e,new vt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){p=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o=0,u=r.length;o<u;o++)i=r[o],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&s.attributeChangedCallback(i.attributeName,i.oldValue,s.getAttribute(i.attributeName)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t});if(-2<S.call(y,v+p)+S.call(y,d+p))throw new Error("A "+n+" type is already registered");if(!m.test(p)||-1<S.call(g,p))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,p):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():p,c=y.push((f?v:d)+p)-1,p;return w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[c]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");
var restyle=function(e){"use strict";function f(e,t,n,r,i){this.component=e,this.node=t,this.css=n,this.prefixes=r,this.doc=i}function l(e){e instanceof f||(e=a(this.component,e,this.prefixes,this.doc)),this.remove(),f.call(this,e.component,e.node,e.css,e.prefixes,e.doc)}function c(e,t,n){return t+"-"+n.toLowerCase()}function h(e,t,n){var i=[],s=typeof t=="number"?"px":"",o=e.replace(r,c),u;for(u=0;u<n.length;u++)i.push("-",n[u],"-",o,":",t,s,";");return i.push(o,":",t,s,";"),i.join("")}function p(e,t){return e.length?e+"-"+t:t}function d(e,t,r,i){var s,u,a;for(s in r)if(n.call(r,s))if(typeof r[s]=="object")if(o(r[s])){u=r[s];for(a=0;a<u.length;a++)e.push(h(p(t,s),u[a],i))}else d(e,p(t,s),r[s],i);else e.push(h(p(t,s),r[s],i));return e.join("")}function v(e,t,r){var o=[],a,f,l,c,h,p,m,g,y,b;for(m in t)if(n.call(t,m)){b=m.length,b||(m=e.slice(0,-1)),a=m.charAt(0)==="@",p=a||!e.indexOf(m+" "),f=a&&s.test(m)?e:"",l=a&&!i.test(m),c=l?m.slice(1):m,g=u.concat(t[b?m:""]);for(y=0;y<g.length;y++){h=g[y];if(l){b=r.length;while(b--)o.push("@-",r[b],"-",c,"{",v(f,h,[r[b]]),"}");o.push(m,"{",v(f,h,r),"}")}else o.push(p?m:e+m,"{",d([],"",h,r),"}")}}return o.join("")}var t=e.toString,n=e.hasOwnProperty,r=/([a-z])([A-Z])/g,i=/^@(?:page|font-face)/,s=/^@(?:media)/,o=Array.isArray||function(e){return t.call(e)==="[object Array]"},u=[],a;return f.prototype={overwrite:l,replace:l,set:l,remove:function(){var e=this.node,t=e.parentNode;t&&t.removeChild(e)},valueOf:function(){return this.css}},{"undefined":!0}[typeof document]?(a=function(e,t,n){return typeof e=="object"?(n=t,t=e,e=""):e+=" ",v(e,t,n||u)},a.restyle=a):a=function(e,t,n,r){typeof e=="object"?(r=n,n=t,t=e,i=e=""):i=e+" ";var i,s=r||(r=document),o=v(i,t,n||(n=a.prefixes)),u=s.head||s.getElementsByTagName("head")[0]||s.documentElement,l=u.insertBefore(s.createElement("style"),u.lastChild);return l.type="text/css",l.styleSheet?l.styleSheet.cssText=o:l.appendChild(s.createTextNode(o)),new f(e,l,o,n,r)},{"undefined":!0}[typeof window]||(a.animate=function(t){var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){setTimeout(e,10)},r={},i="restyle-".concat(Math.random()*+(new Date),"-"),s=0,o,u;switch(!0){case!!t.AnimationEvent:o="animationend";break;case!!t.WebKitAnimationEvent:o="webkitAnimationEnd";break;case!!t.MSAnimationEvent:o="MSAnimationEnd";break;case!!t.OAnimationEvent:o="oanimationend"}switch(!0){case!!t.TransitionEvent:u="transitionend";break;case!!t.WebKitTransitionEvent:u="webkitTransitionEnd";break;case!!t.MSTransitionEvent:u="MSTransitionEnd";break;case!!t.OTransitionEvent:u="oTransitionEnd"}a.transition=function(e,t,o){function b(){u?e.removeEventListener(u,E,!1):(clearTimeout(y),y=0)}function w(){d[v]=g.last=S(h,c.shift()),g.css.replace(d),u?e.addEventListener(u,E,!1):y=setTimeout(E,10)}function E(t){b(),c.length?n(w):(t?t.detail=m:t=new CustomEvent("transitionend",{detail:m}),o&&o.call(e,t))}function S(e,t){for(var n in t)e[n]=t[n];return e}var f=t.transition||"all .3s ease-out",l=e.getAttribute("id"),c=[].concat(t.to),h=S({},t.from),p=!l,d={},v,m,g,y;return p&&e.setAttribute("id",l=(i+s++).replace(".","-")),v="#"+l,r.hasOwnProperty(l)?(g=r[l],h=g.last=S(g.last,h),d[v]=h,g.transition.remove(),g.css.replace(d)):g=r[l]={last:d[v]=h,css:a(d)},n(function(){d[v]={transition:f},g.transition=a(d),n(w)}),m={clean:function(){p&&e.removeAttribute("id"),b(),g.transition.remove(),g.css.remove(),delete r[l]},drop:b}},f.prototype.getAnimationDuration=function(e,t){for(var n,r,i=e.className.split(/\s+/),s=i.length;s--;){n=i[s];if(n.length&&(new RegExp("\\."+n+"(?:|\\{|\\,)([^}]+?)\\}")).test(this.css)){n=RegExp.$1;if((new RegExp("animation-name:"+t+";.*?animation-duration:([^;]+?);")).test(n)||(new RegExp("animation:\\s*"+t+"\\s+([^\\s]+?);")).test(n)){n=RegExp.$1,r=parseFloat(n);if(r)return r*(/[^m]s$/.test(n)?1e3:1)}}}return-1},f.prototype.getTransitionDuration=function(e){var t=getComputedStyle(e),n=t.getPropertyValue("transition-duration")||/\s(\d+(?:ms|s))/.test(t.getPropertyValue("transition"))&&RegExp.$1;return parseFloat(n)*(/[^m]s$/.test(n)?1e3:1)},f.prototype.transit=u?function(e,t){function n(n){r(),t.call(e,n)}function r(){e.removeEventListener(u,n,!1)}return e.addEventListener(u,n,!1),{drop:r}}:function(e,t){var n=setTimeout(t,this.getTransitionDuration(e));return{drop:function(){clearTimeout(n)}}},f.prototype.animate=o?function(t,n,r){function i(e){e.animationName===n&&(s(),r.call(t,e))}function s(){t.removeEventListener(o,i,!1)}return t.addEventListener(o,i,!1),{drop:s}}:function(n,r,i){var s,o,u=this.getAnimationDuration(n,r);return u<0?o=e:(s=setTimeout(function(){i.call(n,{type:"animationend",animationName:r,currentTarget:n,target:n,stopImmediatePropagation:e,stopPropagation:e,preventDefault:e})},u),o=function(){clearTimeout(s)}),{drop:o}}}(window)),a.customElement=function(e,t,n){var r,i="extends",s=Object.create(t.prototype),o={prototype:s},u=o.hasOwnProperty,f=n&&u.call(n,i);f&&(o[i]=n[i]);for(r in n)r!==i&&(s[r]=r==="css"?a(f?n[i]+"[is="+e+"]":e,n[r]):n[r]);return document.registerElement(e,o)},a.prefixes=["webkit","moz","ms","o"],a}({});
var Class=Class||function(e){"use strict";function N(e,t,n){for(var r,s=[],o=0;o<e.length;o++)r=D(e[o]),p.call(r,i)&&s.push(r[i]),C(r,t,n,!1,!1);return s}function C(e,t,n,r,i){for(var s,o=typeof e!="function",u=y(e),a=0;a<u.length;a++)s=u[a],(o||S.call(E,s)<0)&&M(s,i)&&(p.call(t,s)&&B("duplicated: "+s),P(n,t,s,g(e,s),r))}function k(e,t){var n=function(){};return e&&""+t!=""+n?function(){return t.apply(this,arguments)}:n}function L(e,t,n,r){var i=O(t,r);m(e,t,{enumerable:!1,configurable:i,writable:i,value:n})}function A(e){return e?(e<65||90<e)&&(e<97||122<e)&&e!==95:!0}function O(e,t){return t?!_(e):!0}function M(e,f){return e!==t&&e!==n&&e!==r&&e!==s&&e!==o&&e!==u&&e!==a&&(f||e!==i)}function _(e){for(var t,n=0;n<e.length;n++){t=e.charCodeAt(n);if((t<65||90<t)&&t!==95)return!1}return!0}function D(t){if(typeof t=="object")return t;t.length&&B((t.name||"Class")+" should not expect arguments");for(var n,r,i,s={init:t},o=t.prototype;o&&o!==e.prototype;o=w(o))for(n=0,i=y(o);n<i.length;n++)r=i[n],M(r,!1)&&!p.call(s,r)&&m(s,r,g(o,r));return s}function P(e,t,n,r,i){var s=p.call(r,"value"),o,u;if(i){if(p.call(t,n))return}else s?(u=r.value,typeof u=="function"&&x(u)&&(r.value=j(e,n,u,i))):(F(e,n,r,"get"),F(e,n,r,"set"));o=O(n,i),r.enumerable=!1,r.configurable=o,s&&(r.writable=o),m(t,n,r)}function H(e,t){for(var n,r,i=0;i<e.length;i++){n=e[i];for(r in n)p.call(n,r)&&!p.call(t,r)&&B(r+" is not implemented")}}function B(e){try{console.warn(e)}catch(t){}}function j(e,t,n,r){return function(){p.call(this,u)||L(this,u,null,r);var i=this[u],s=this[u]=e[t],o=n.apply(this,arguments);return this[u]=i,o}}function F(e,t,n,r,i){p.call(n,r)&&x(n[r])&&(n[r]=j(g(e,t),r,n[r],i))}var t="constructor",n="extends",r="implements",i="init",s="prototype",o="static",u="super",a="with",f="__proto__",l=["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],c={}[l[2]]||function(e){for(var t in this)if(e===t)return this.hasOwnProperty(e);return!1},h=!c.call({valueOf:0},l[5]),p=e[l[0]],d=e.create||function(e){var t=this instanceof d;return d[s]=t?v:e,t?this:new d},v=d[s],m=e.defineProperty,g=e.getOwnPropertyDescriptor,y=e.getOwnPropertyNames||function(e){var t=[],n,r;for(r in e)p.call(e,r)&&t.push(r);if(h)for(n=0;n<l.length;n++)r=l[n],p.call(e,r)&&t.push(r);return t},b=e.getPrototypeOf,w=b||function(e){return e[f]||null},E=y(function(){}),S=E.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=(""+function(){this["super"]()}).indexOf(u)<0?function(){return!0}:function(e){var t=""+e,n=t.indexOf(u);return n<0?!1:A(t.charCodeAt(n-1))&&A(t.charCodeAt(n+5))};try{m({},"{}",{})}catch(T){"__defineGetter__"in{}?(m=function(e,t,n){return p.call(n,"value")?e[t]=n.value:(p.call(n,"get")&&e.__defineGetter__(t,n.get),p.call(n,"set")&&e.__defineSetter__(t,n.set)),e},g=function(e,t){var n=e.__lookupGetter__(t),r=e.__lookupSetter__(t),i={};return n||r?(n&&(i.get=n),r&&(i.set=r)):i.value=e[t],i}):(m=function(e,t,n){return e[t]=n.value,e},g=function(e,t){return{value:e[t]}})}return function(e){var i=p.call(e,t),u=p.call(e,n),l=u&&e[n],c=u&&typeof l=="function",h=c?l[s]:l,v=i?e[t]:k(c,l),m=u&&i&&x(v),g=u?d(h):v[s],y,w;return m&&(v=j(h,t,v,!1)),p.call(e,a)&&(y=N([].concat(e[a]),g,h),w=y.length,w&&(v=function(e){return function(){var t=0;while(t<w)y[t++].call(this);return e.apply(this,arguments)}}(v),v[s]=g)),p.call(e,o)&&C(e[o],v,h,!0,!0),u&&(l!==h&&C(l,v,h,!0,!0),v[s]=g),g[t]!==v&&L(g,t,v,!1),C(e,g,h,!1,!0),p.call(e,r)&&H([].concat(e[r]),g),u&&!b&&L(g,f,h,!1),v}}(Object);
var DOMClass=function(e,t,n){"use strict";var r="onAttached",i="attachedCallback",s="onChanged",o="attributeChangedCallback",u="constructor",a="createdCallback",f="css",l="<style>",c="onDetached",h="detachedCallback",p="extends",d="name",v=n.hasOwnProperty,m=t.prototype,g=function(e,t){for(var n,r=x(e),i=r.length;i--;)n=r[i],N.indexOf(n)<0&&!v.call(t,n)&&y(t,n,b(e,n))},y=n.defineProperty,b=n.getOwnPropertyDescriptor,w=n.getOwnPropertyNames||n.keys||function(e){var t=[],n;for(n in e)v.call(e,n)&&t.push(n);return t},E=n.getOwnPropertySymbols||function(){return m},S=function(t){return e["HTML"+t+"Element"]},x=function(e){return E(e).concat(w(e))},T=function(e,t){if(!t.length){var n=e.getAttribute("data-arguments");n&&(t=n.charAt(0)==="["?JSON.parse(n):n.split(/\s*,\s*/))}return t},N=x(function(){}),C=function(e,t,n,r){v.call(e,t)&&(n[r]=e[t])},k=function(){for(var n=+this,r=n,i=arguments.length,s=i-n,o=new t(s<0?0:s);r<i;r++)o[r-n]=arguments[r];return o},L=function(e){return e+"-i-"+(v.call(O,e)?++O[e]:O[e]=0)},A=function(e,t,n){var r;e.setAttribute("dom-class-uid",n),y(e,f,{configurable:!0,get:function(){return r||(r=restyle(t+'[dom-class-uid="'+n+'"]',{}))},set:function(t){e[f].replace(t)}})},O={},M=0;return function(t){var n=function(){return b=k.apply(0,arguments),new O},b=m,w={},E=v.call(t,f),x=v.call(t,u),N=x&&t[u],O,_,D,P,H;C(t,r,w,i),C(t,s,w,o),C(t,c,w,h);for(D in t)if(v.call(t,D))switch(D){case r:case s:case u:case c:case p:case d:case f:break;default:w[D]=t[D]}w[p]=v.call(t,p)?t[p].prototype:HTMLElement.prototype;if(w[p]instanceof HTMLElement)switch(t[p]){case S("Anchor"):H="a";break;case S("Audio"):H="audio";break;case S("BR"):H="br";break;case S("Body"):H="body";break;case S("Button"):H="button";break;case S("Canvas"):H="canvas";break;case S("Col"):H="col";break;case S("DataList"):H="dl";break;case S("Div"):H="div";break;case S("Form"):H="form";break;case S("HR"):H="hr";break;case S("Head"):H="head";break;case S("IFrame"):H="iframe";break;case S("Image"):H="img";break;case S("Input"):H="input";break;case S("LI"):H="li";break;case S("Label"):H="label";break;case S("Legend"):H="legend";break;case S("Link"):H="link";break;case S("Menu"):H="menu";break;case S("OList"):H="ol";break;case S("Option"):H="option";break;case S("Paragraph"):H="p";break;case S("Progress"):H="progress";break;case S("Quote"):H="quote";break;case S("Select"):H="select";break;case S("Span"):H="span";break;case S("Style"):H="style";break;case S("Table"):H="table";break;case S("TableCaption"):H="caption";break;case S("TableCell"):H="td";break;case S("TableCol"):H="colgroup";break;case S("TableRow"):H="tr";break;case S("TableSection"):H="tbody";break;case S("Table"):H="table";break;case S("Table"):H="table";break;case S("TextArea"):H="textarea";break;case S("Track"):H="track";break;case S("UList"):H="ul";break;case S("Video"):H="video"}return D=v.call(t,d)?t[d]:"x-dom-class-"+M++,E&&(w[l]=restyle(D,t[f])),w[a]=function(){var e=T(this,b);b=m,_.apply(this,e),E&&A(this,D,L(D)),x&&N.apply(this,e)},_=new Class(w),g(_,n),P={prototype:_.prototype},H&&(P[p]=H),O=document.registerElement(D,P),n.prototype=O.prototype,y(O.prototype,u,{value:n}),n}}(this.window||global,Array,Object);