/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
/*@cc_on (function(f){window.setTimeout=f(window.setTimeout);window.setInterval=f(window.setInterval)})(function(f){return function(c,t){var a=[].slice.call(arguments,2);return f(function(){c.apply(this,a)},t)}}); @*/
(function(e){"use strict";function t(){return c.createDocumentFragment()}function n(e){return c.createElement(e)}function r(e,t){if(!e)throw new Error("Failed to construct "+t+": 1 argument required, but only 0 present.")}function i(e){if(e.length===1)return s(e[0]);for(var n=t(),r=R.call(e),i=0;i<e.length;i++)n.appendChild(s(r[i]));return n}function s(e){return typeof e=="string"?c.createTextNode(e):e}for(var o,u,a,f,l,c=e.document,h=Object.prototype.hasOwnProperty,p=Object.defineProperty||function(e,t,n){return h.call(n,"value")?e[t]=n.value:(h.call(n,"get")&&e.__defineGetter__(t,n.get),h.call(n,"set")&&e.__defineSetter__(t,n.set)),e},d=[].indexOf||function(t){var n=this.length;while(n--)if(this[n]===t)break;return n},v=function(e){if(!e)throw"SyntaxError";if(w.test(e))throw"InvalidCharacterError";return e},m=function(e){var t=typeof e.className=="undefined",n=t?e.getAttribute("class")||"":e.className,r=t||typeof n=="object",i=(r?t?n:n.baseVal:n).replace(b,"");i.length&&q.push.apply(this,i.split(w)),this._isSVG=r,this._=e},g={get:function(){return new m(this)},set:function(){}},y="dom4-tmp-".concat(Math.random()*+(new Date)).replace(".","-"),b=/^\s+|\s+$/g,w=/\s+/,E=" ",S="classList",x=function(t,n){if(this.contains(t))n||this.remove(t);else if(n===undefined||n)n=!0,this.add(t);return!!n},T=e.DocumentFragment&&DocumentFragment.prototype,N=e.Node,C=(N||Element).prototype,k=e.CharacterData||N,L=k&&k.prototype,A=e.DocumentType,O=A&&A.prototype,M=(e.Element||N||e.HTMLElement).prototype,_=e.HTMLSelectElement||n("select").constructor,D=_.prototype.remove,P=e.ShadowRoot,H=e.SVGElement,B=/ /g,j="\\ ",F=function(e){var t=e==="querySelectorAll";return function(n){var r,i,s,o,u,a,f=this.parentNode;if(f){for(s=this.getAttribute("id")||y,o=s===y?s:s.replace(B,j),a=n.split(","),i=0;i<a.length;i++)a[i]="#"+o+" "+a[i];n=a.join(",")}s===y&&this.setAttribute("id",s),u=(f||this)[e](n),s===y&&this.removeAttribute("id");if(t){i=u.length,r=new Array(i);while(i--)r[i]=u[i]}else r=u;return r}},I=function(e){"query"in e||(e.query=M.query),"queryAll"in e||(e.queryAll=M.queryAll)},q=["matches",M.matchesSelector||M.webkitMatchesSelector||M.khtmlMatchesSelector||M.mozMatchesSelector||M.msMatchesSelector||M.oMatchesSelector||function(t){var n=this.parentNode;return!!n&&-1<d.call(n.querySelectorAll(t),this)},"closest",function(t){var n=this,r;while((r=n&&n.matches)&&!n.matches(t))n=n.parentNode;return r?n:null},"prepend",function(){var t=this.firstChild,n=i(arguments);t?this.insertBefore(n,t):this.appendChild(n)},"append",function(){this.appendChild(i(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(i(arguments),this)},"after",function(){var t=this.parentNode,n=this.nextSibling,r=i(arguments);t&&(n?t.insertBefore(r,n):t.appendChild(r))},"replace",function(){this.replaceWith.apply(this,arguments)},"replaceWith",function(){var t=this.parentNode;t&&t.replaceChild(i(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)},"query",F("querySelector"),"queryAll",F("querySelectorAll")],R=q.slice,U=q.length;U;U-=2){u=q[U-2],u in M||(M[u]=q[U-1]),u==="remove"&&(_.prototype[u]=function(){return 0<arguments.length?D.apply(this,arguments):M.remove.call(this)}),/^(?:before|after|replace|replaceWith|remove)$/.test(u)&&(k&&!(u in L)&&(L[u]=q[U-1]),A&&!(u in O)&&(O[u]=q[U-1]));if(/^(?:append|prepend)$/.test(u))if(T)u in T||(T[u]=q[U-1]);else try{t().constructor.prototype[u]=q[U-1]}catch(z){}}I(c);if(T)I(T);else try{I(t().constructor.prototype)}catch(z){}P&&I(P.prototype),n("a").matches("a")||(M[u]=function(e){return function(n){return e.call(this.parentNode?this:t().appendChild(this),n)}}(M[u])),m.prototype={length:0,add:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)||q.push.call(this,u);this._isSVG?this._.setAttribute("class",""+this):this._.className=""+this},contains:function(e){return function(n){return U=e.call(this,u=v(n)),-1<U}}([].indexOf||function(e){U=this.length;while(U--&&this[U]!==e);return U}),item:function(t){return this[t]||null},remove:function(){for(var t=0,n;t<arguments.length;t++)n=arguments[t],this.contains(n)&&q.splice.call(this,U,1);this._isSVG?this._.setAttribute("class",""+this):this._.className=""+this},toggle:x,toString:function W(){return q.join.call(this,E)}},H&&!(S in H.prototype)&&p(H.prototype,S,g),S in c.documentElement?(f=n("div")[S],f.add("a","b","a"),"a b"!=f&&(a=f.constructor.prototype,"add"in a||(a=e.TemporaryTokenList.prototype),l=function(e){return function(){var t=0;while(t<arguments.length)e.call(this,arguments[t++])}},a.add=l(a.add),a.remove=l(a.remove),a.toggle=x)):p(M,S,g),"contains"in C||p(C,"contains",{value:function(e){while(e&&e!==this)e=e.parentNode;return this===e}}),"head"in c||p(c,"head",{get:function(){return o||(o=c.getElementsByTagName("head")[0])}}),function(){for(var t,n=e.requestAnimationFrame,r=e.cancelAnimationFrame,i=["o","ms","moz","webkit"],s=i.length;!r&&s--;)n=n||e[i[s]+"RequestAnimationFrame"],r=e[i[s]+"CancelAnimationFrame"]||e[i[s]+"CancelRequestAnimationFrame"];r||(n?(t=n,n=function(e){var n=!0;return t(function(){n&&e.apply(this,arguments)}),function(){n=!1}},r=function(e){e()}):(n=function(e){return setTimeout(e,15,15)},r=function(e){clearTimeout(e)})),e.requestAnimationFrame=n,e.cancelAnimationFrame=r}();try{new e.CustomEvent("?")}catch(z){e.CustomEvent=function(e,t){function n(n,i){var s=c.createEvent(e);if(typeof n!="string")throw new Error("An event name must be provided");return e=="Event"&&(s.initCustomEvent=r),i==null&&(i=t),s.initCustomEvent(n,i.bubbles,i.cancelable,i.detail),s}function r(e,t,n,r){this.initEvent(e,t,n),this.detail=r}return n}(e.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}try{new Event("_")}catch(z){z=function(e){function t(e,t){r(arguments.length,"Event");var n=c.createEvent("Event");return t||(t={}),n.initEvent(e,!!t.bubbles,!!t.cancelable),n}return t.prototype=e.prototype,t}(e.Event||function(){}),p(e,"Event",{value:z}),Event!==z&&(Event=z)}try{new KeyboardEvent("_",{})}catch(z){z=function(t){function a(e){for(var t=[],n=["ctrlKey","Control","shiftKey","Shift","altKey","Alt","metaKey","Meta","altGraphKey","AltGraph"],r=0;r<n.length;r+=2)e[n[r]]&&t.push(n[r+1]);return t.join(" ")}function f(e,t){for(var n in t)t.hasOwnProperty(n)&&!t.hasOwnProperty.call(e,n)&&(e[n]=t[n]);return e}function l(e,t,n){try{t[e]=n[e]}catch(r){}}function h(t,o){r(arguments.length,"KeyboardEvent"),o=f(o||{},i);var u=c.createEvent(s),h=o.ctrlKey,p=o.shiftKey,d=o.altKey,v=o.metaKey,m=o.altGraphKey,g=n>3?a(o):null,y=String(o.key),b=String(o.char),w=o.location,E=o.keyCode||(o.keyCode=y)&&y.charCodeAt(0)||0,S=o.charCode||(o.charCode=b)&&b.charCodeAt(0)||0,x=o.bubbles,T=o.cancelable,N=o.repeat,C=o.locale,k=o.view||e,L;o.which||(o.which=o.keyCode);if("initKeyEvent"in u)u.initKeyEvent(t,x,T,k,h,d,p,v,E,S);else if(0<n&&"initKeyboardEvent"in u){L=[t,x,T,k];switch(n){case 1:L.push(y,w,h,p,d,v,m);break;case 2:L.push(h,d,p,v,E,S);break;case 3:L.push(y,w,h,d,p,v,m);break;case 4:L.push(y,w,g,N,C);break;default:L.push(char,y,w,g,N,C)}u.initKeyboardEvent.apply(u,L)}else u.initEvent(t,x,T);for(y in u)i.hasOwnProperty(y)&&u[y]!==o[y]&&l(y,u,o);return u}var n=0,i={"char":"",key:"",location:0,ctrlKey:!1,shiftKey:!1,altKey:!1,metaKey:!1,altGraphKey:!1,repeat:!1,locale:navigator.language,detail:0,bubbles:!1,cancelable:!1,keyCode:0,charCode:0,which:0},s;try{var o=c.createEvent("KeyboardEvent");o.initKeyboardEvent("keyup",!1,!1,e,"+",3,!0,!1,!0,!1,!1),n=(o.keyIdentifier||o.key)=="+"&&(o.keyLocation||o.location)==3&&(o.ctrlKey?o.altKey?1:3:o.shiftKey?2:4)||9}catch(u){}return s=0<n?"KeyboardEvent":"Event",h.prototype=t.prototype,h}(e.KeyboardEvent||function(){}),p(e,"KeyboardEvent",{value:z}),KeyboardEvent!==z&&(KeyboardEvent=z)}try{new MouseEvent("_",{})}catch(z){z=function(t){function n(t,n){r(arguments.length,"MouseEvent");var i=c.createEvent("MouseEvent");return n||(n={}),i.initMouseEvent(t,!!n.bubbles,!!n.cancelable,n.view||e,n.detail||1,n.screenX||0,n.screenY||0,n.clientX||0,n.clientY||0,!!n.ctrlKey,!!n.altKey,!!n.shiftKey,!!n.metaKey,n.button||0,n.relatedTarget||null),i}return n.prototype=t.prototype,n}(e.MouseEvent||function(){}),p(e,"MouseEvent",{value:z}),MouseEvent!==z&&(MouseEvent=z)}})(window),function(e){"use strict";function n(){}function r(e,t,n){function i(e){i.once&&(e.currentTarget.removeEventListener(e.type,t,i),i.removed=!0),i.passive&&(e.preventDefault=r.preventDefault),typeof i.callback=="function"?i.callback.call(this,e):i.callback&&i.callback.handleEvent(e),i.passive&&delete e.preventDefault}return i.type=e,i.callback=t,i.capture=!!n.capture,i.passive=!!n.passive,i.once=!!n.once,i.removed=!1,i}var t=e.WeakMap||function(){function s(e,i,s){n=s,t=!1,r=undefined,e.dispatchEvent(i)}function o(e){this.value=e}function u(){e++,this.__ce__=new i("@DOMMap:"+e+Math.random())}var e=0,t=!1,n=!1,r;return o.prototype.handleEvent=function(i){t=!0,n?i.currentTarget.removeEventListener(i.type,this,!1):r=this.value},u.prototype={constructor:u,"delete":function(n){return s(n,this.__ce__,!0),t},get:function(t){s(t,this.__ce__,!1);var n=r;return r=undefined,n},has:function(n){return s(n,this.__ce__,!1),t},set:function(t,n){return s(t,this.__ce__,!0),t.addEventListener(this.__ce__.type,new o(n),!1),this}},u}();n.prototype=(Object.create||Object)(null),r.preventDefault=function(){};var i=e.CustomEvent,s=Object.prototype.hasOwnProperty,o=e.dispatchEvent,u=e.addEventListener,a=e.removeEventListener,f=0,l=function(){f++},c=[].indexOf||function(t){var n=this.length;while(n--)if(this[n]===t)break;return n},h=function(e){return"".concat(e.capture?"1":"0",e.passive?"1":"0",e.once?"1":"0")},p,d;try{u("_",l,{once:!0}),o(new i("_")),o(new i("_")),a("_",l,{once:!0})}catch(v){}f!==1&&function(){function s(e){return function(s,o,u){if(u&&typeof u!="boolean"){var a=i.get(this),f=h(u),l,p,d;a||i.set(this,a=new n),s in a||(a[s]={handler:[],wrap:[]}),p=a[s],l=c.call(p.handler,o),l<0?(l=p.handler.push(o)-1,p.wrap[l]=d=new n):d=p.wrap[l],f in d||(d[f]=r(s,o,u),e.call(this,s,d[f],d[f].capture))}else e.call(this,s,o,u)}}function o(e){return function(n,r,s){if(s&&typeof s!="boolean"){var o=i.get(this),u,a,f,l;if(o&&n in o){f=o[n],a=c.call(f.handler,r);if(-1<a){u=h(s),l=f.wrap[a];if(u in l){e.call(this,n,l[u],l[u].capture),delete l[u];for(u in l)return;f.handler.splice(a,1),f.wrap.splice(a,1),f.handler.length===0&&delete o[n]}}}}else e.call(this,n,r,s)}}var i=new t;p=function(e){if(!e)return;var t=e.prototype;t.addEventListener=s(t.addEventListener),t.removeEventListener=o(t.removeEventListener)},e.EventTarget?p(EventTarget):(p(e.Text),p(e.Element||e.HTMLElement),p(e.HTMLDocument),p(e.Window||{prototype:e}),p(e.XMLHttpRequest))}()}(self);
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)vt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(vt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Q&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&e.prevValue!==e.newValue&&t.attributeChangedCallback(r,n===e[a]?null:e.prevValue,n===e[l]?null:e.newValue)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(n--,F.splice(t--,1),vt(e,o))}function dt(e){throw new Error("A "+e+" type is already registered")}function vt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function mt(e){return e?(mt.prototype=e,new mt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){c=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&(o=s.getAttribute(i.attributeName),o!==i.oldValue&&s.attributeChangedCallback(i.attributeName,i.oldValue,o)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t}),-2<S.call(y,v+c)+S.call(y,d+c)&&dt(n);if(!m.test(c)||-1<S.call(g,c))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,c):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():c,c,p;return f&&-1<S.call(y,d+l)&&dt(l),p=y.push((f?v:d)+c)-1,w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[p]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");
var restyle=function(e){"use strict";function f(e,t,n,r,i){this.component=e,this.node=t,this.css=n,this.prefixes=r,this.doc=i}function l(e){e instanceof f||(e=a(this.component,e,this.prefixes,this.doc)),this.remove(),f.call(this,e.component,e.node,e.css,e.prefixes,e.doc)}function c(e,t,n){return t+"-"+n.toLowerCase()}function h(e,t,n){var i=[],s=typeof t=="number"?"px":"",o=e.replace(r,c),u;for(u=0;u<n.length;u++)i.push("-",n[u],"-",o,":",t,s,";");return i.push(o,":",t,s,";"),i.join("")}function p(e,t){return e.length?e+"-"+t:t}function d(e,t,r,i){var s,u,a;for(s in r)if(n.call(r,s))if(typeof r[s]=="object")if(o(r[s])){u=r[s];for(a=0;a<u.length;a++)e.push(h(p(t,s),u[a],i))}else d(e,p(t,s),r[s],i);else e.push(h(p(t,s),r[s],i));return e.join("")}function v(e,t,r){var o=[],a,f,l,c,h,p,m,g,y,b;for(m in t)if(n.call(t,m)){b=m.length,b||(m=e.slice(0,-1)),a=m.charAt(0)==="@",p=a||!e.indexOf(m+" "),f=a&&s.test(m)?e:"",l=a&&!i.test(m),c=l?m.slice(1):m,g=u.concat(t[b?m:""]);for(y=0;y<g.length;y++){h=g[y];if(l){b=r.length;while(b--)o.push("@-",r[b],"-",c,"{",v(f,h,[r[b]]),"}");o.push(m,"{",v(f,h,r),"}")}else o.push(p?m:e+m,"{",d([],"",h,r),"}")}}return o.join("")}var t=e.toString,n=e.hasOwnProperty,r=/([a-z])([A-Z])/g,i=/^@(?:page|font-face)/,s=/^@(?:media)/,o=Array.isArray||function(e){return t.call(e)==="[object Array]"},u=[],a;return f.prototype={overwrite:l,replace:l,set:l,remove:function(){var e=this.node,t=e.parentNode;t&&t.removeChild(e)},valueOf:function(){return this.css}},{"undefined":!0}[typeof document]?(a=function(e,t,n){return typeof e=="object"?(n=t,t=e,e=""):e+=" ",v(e,t,n||u)},a.restyle=a):a=function(e,t,n,r){typeof e=="object"?(r=n,n=t,t=e,i=e=""):i=e+" ";var i,s=r||(r=document),o=v(i,t,n||(n=a.prefixes)),u=s.head||s.getElementsByTagName("head")[0]||s.documentElement,l=u.insertBefore(s.createElement("style"),u.lastChild);return l.type="text/css",l.styleSheet?l.styleSheet.cssText=o:l.appendChild(s.createTextNode(o)),new f(e,l,o,n,r)},{"undefined":!0}[typeof window]||(a.animate=function(t){var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){setTimeout(e,10)},r={},i="restyle-".concat(Math.random()*+(new Date),"-"),s=0,o,u;switch(!0){case!!t.AnimationEvent:o="animationend";break;case!!t.WebKitAnimationEvent:o="webkitAnimationEnd";break;case!!t.MSAnimationEvent:o="MSAnimationEnd";break;case!!t.OAnimationEvent:o="oanimationend"}switch(!0){case!!t.TransitionEvent:u="transitionend";break;case!!t.WebKitTransitionEvent:u="webkitTransitionEnd";break;case!!t.MSTransitionEvent:u="MSTransitionEnd";break;case!!t.OTransitionEvent:u="oTransitionEnd"}a.transition=function(e,t,o){function b(){u?e.removeEventListener(u,E,!1):(clearTimeout(y),y=0)}function w(){d[v]=g.last=S(h,c.shift()),g.css.replace(d),u?e.addEventListener(u,E,!1):y=setTimeout(E,10)}function E(t){b(),c.length?n(w):(t?t.detail=m:t=new CustomEvent("transitionend",{detail:m}),o&&o.call(e,t))}function S(e,t){for(var n in t)e[n]=t[n];return e}var f=t.transition||"all .3s ease-out",l=e.getAttribute("id"),c=[].concat(t.to),h=S({},t.from),p=!l,d={},v,m,g,y;return p&&e.setAttribute("id",l=(i+s++).replace(".","-")),v="#"+l,r.hasOwnProperty(l)?(g=r[l],h=g.last=S(g.last,h),d[v]=h,g.transition.remove(),g.css.replace(d)):g=r[l]={last:d[v]=h,css:a(d)},n(function(){d[v]={transition:f},g.transition=a(d),n(w)}),m={clean:function(){p&&e.removeAttribute("id"),b(),g.transition.remove(),g.css.remove(),delete r[l]},drop:b}},f.prototype.getAnimationDuration=function(e,t){for(var n,r,i=e.className.split(/\s+/),s=i.length;s--;){n=i[s];if(n.length&&(new RegExp("\\."+n+"(?:|\\{|\\,)([^}]+?)\\}")).test(this.css)){n=RegExp.$1;if((new RegExp("animation-name:"+t+";.*?animation-duration:([^;]+?);")).test(n)||(new RegExp("animation:\\s*"+t+"\\s+([^\\s]+?);")).test(n)){n=RegExp.$1,r=parseFloat(n);if(r)return r*(/[^m]s$/.test(n)?1e3:1)}}}return-1},f.prototype.getTransitionDuration=function(e){var t=getComputedStyle(e),n=t.getPropertyValue("transition-duration")||/\s(\d+(?:ms|s))/.test(t.getPropertyValue("transition"))&&RegExp.$1;return parseFloat(n)*(/[^m]s$/.test(n)?1e3:1)},f.prototype.transit=u?function(e,t){function n(n){r(),t.call(e,n)}function r(){e.removeEventListener(u,n,!1)}return e.addEventListener(u,n,!1),{drop:r}}:function(e,t){var n=setTimeout(t,this.getTransitionDuration(e));return{drop:function(){clearTimeout(n)}}},f.prototype.animate=o?function(t,n,r){function i(e){e.animationName===n&&(s(),r.call(t,e))}function s(){t.removeEventListener(o,i,!1)}return t.addEventListener(o,i,!1),{drop:s}}:function(n,r,i){var s,o,u=this.getAnimationDuration(n,r);return u<0?o=e:(s=setTimeout(function(){i.call(n,{type:"animationend",animationName:r,currentTarget:n,target:n,stopImmediatePropagation:e,stopPropagation:e,preventDefault:e})},u),o=function(){clearTimeout(s)}),{drop:o}}}(window)),a.customElement=function(e,t,n){var r,i="extends",s=Object.create(t.prototype),o={prototype:s},u=o.hasOwnProperty,f=n&&u.call(n,i);f&&(o[i]=n[i]);for(r in n)r!==i&&(s[r]=r==="css"?a(f?n[i]+"[is="+e+"]":e,n[r]):n[r]);return document.registerElement(e,o)},a.prefixes=["webkit","moz","ms","o"],a}({});
var Class=Class||function(e){"use strict";function D(e,t,n,r){for(var s,o=[],u=0;u<e.length;u++)s=X(e[u]),d.call(s,i)&&o.push(s[i]),B(s,t,n,!1,!1,r);return o}function P(e){for(var t,n,r,i=y(N(e)),s=C(e),o=0;o<s.length;o++)t=s[o],n=E(e,t),d.call(n,f)&&j(n,P),w(i,t,n);return i}function H(e,t){for(var n,r,i,s,o=C(e),u=0;u<o.length;u++)n=o[u],r=E(e,n),d.call(t,n)?d.call(r,f)&&(i=r[f],z(i)&&(r=E(t,n),d.call(r,f)&&(s=r[f],z(s)&&H(i,s)))):(d.call(r,f)&&j(r,P),w(t,n,r))}function B(e,t,n,r,i,s){for(var o,u=typeof e!="function",a=C(e),f=0;f<a.length;f++)o=a[f],(u||A.call(L,o)<0)&&U(o,i)&&(d.call(t,o)&&J("duplicated: "+o.toString()),V(n,t,o,E(e,o),r,s))}function j(e,t){var n=e[f];z(n)&&(e[f]=t(n))}function F(e,t){var n=function(){};return e&&""+t!=""+n?function(){return t.apply(this,arguments)}:n}function I(e,t,n,r){var i=R(t,r);w(e,t,{enumerable:!1,configurable:i,writable:i,value:n})}function q(e){return e?(e<65||90<e)&&(e<97||122<e)&&e!==95:!0}function R(e,t){return t?!W(e):!0}function U(e,a){return e!==t&&e!==n&&e!==r&&e!==s&&e!==o&&e!==u&&e!==l&&(a||e!==i)}function z(e){return e!=null&&typeof e=="object"}function W(e){for(var t,n=0;n<e.length;n++){t=e.charCodeAt(n);if((t<65||90<t)&&t!==95)return!1}return!0}function X(t){if(z(t))return t;var n,r,s,o,u;if(t.isClass){t.length&&J((t.name||"Class")+" should not expect arguments");for(o={init:t},u=t.prototype;u&&u!==e.prototype;u=N(u))for(n=0,s=C(u);n<s.length;n++)r=s[n],U(r,!1)&&!d.call(o,r)&&w(o,r,E(u,r))}else for(n=0,o={},u=t({}),s=C(u);n<s.length;n++)r=s[n],r!==i&&(~r.toString().indexOf("mixin:init")&&k(u[r])?o.init=u[r][0]:w(o,r,E(u,r)));return o}function V(e,n,r,i,s,o){var u=d.call(i,f),a,l;if(s){if(d.call(n,r)){e&&z(n[r])&&z(e[t][r])&&H(e[t][r],n[r]);return}u&&j(i,P)}else u?(l=i[f],typeof l=="function"&&M(l)&&(i[f]=K(e,r,l,s))):o&&(Q(e,r,i,"get"),Q(e,r,i,"set"));a=R(r,s),i.enumerable=!1,i.configurable=a,u&&(i.writable=a),w(n,r,i)}function $(e,t){for(var n,r,i=0;i<e.length;i++){n=e[i];for(r in n)d.call(n,r)&&!d.call(t,r)&&J(r.toString()+" is not implemented")}}function J(e){try{console.warn(e)}catch(t){}}function K(e,t,n,r){return function(){d.call(this,u)||I(this,u,null,r);var i=this[u],s=this[u]=e[t],o=n.apply(this,arguments);return this[u]=i,o}}function Q(e,t,n,r,i){d.call(n,r)&&M(n[r])&&(n[r]=K(E(e,t),r,n[r],i))}var t="constructor",n="extends",r="implements",i="init",s="prototype",o="static",u="super",a="toString",f="value",l="with",c="__proto__",h=["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString",a,"valueOf"],p=e[s],d=p[h[0]],v=p[a],m=p[h[2]]||function(e){for(var t in this)if(e===t)return d.call(this,e);return!1},g=!m.call({toString:0},a),y=e.create||function(e){var t=this instanceof y;return y[s]=t?b:e||p,t?this:new y},b=y[s],w=e.defineProperty,E=e.getOwnPropertyDescriptor,S=e.getOwnPropertyNames||function(e){var t=[],n,r;for(r in e)d.call(e,r)&&t.push(r);if(g)for(n=0;n<h.length;n++)r=h[n],d.call(e,r)&&t.push(r);return t},x=e.getOwnPropertySymbols||function(){return[]},T=e.getPrototypeOf,N=T||function(e){return e[c]||null},C=function(e){return S(e).concat(x(e))},k=Array.isArray||function(e){return v.call(e)==="[object Array]"},L=S(function(){}).concat("arguments"),A=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},O={value:!0},M=(""+function(){this["super"]()}).indexOf(u)<0?function(){return!0}:function(e){var t=""+e,n=t.indexOf(u);return n<0?!1:q(t.charCodeAt(n-1))&&q(t.charCodeAt(n+5))};try{w({},"{}",{})}catch(_){"__defineGetter__"in{}?(w=function(e,t,n){return d.call(n,f)?e[t]=n[f]:(d.call(n,"get")&&e.__defineGetter__(t,n.get),d.call(n,"set")&&e.__defineSetter__(t,n.set)),e},E=function(e,t){var n=e.__lookupGetter__(t),r=e.__lookupSetter__(t),i={};return n||r?(n&&(i.get=n),r&&(i.set=r)):i[f]=e[t],i}):(w=function(e,t,n){return e[t]=n[f],e},E=function(e,t){return{value:e[t]}})}return function(e){var i=d.call(e,t),u=d.call(e,n),a=u&&e[n],f=u&&typeof a=="function",h=f?a[s]:a,p=i?e[t]:F(f,a),m=u&&i&&M(p),g=u?y(h):p[s],b=v.call(h).indexOf(" GObject_")<0,E,S;return m&&b&&(p=K(h,t,p,!1)),d.call(e,l)&&(E=D([].concat(e[l]),g,h,b),S=E.length,S&&(p=function(e){return function(){var t=0;while(t<S)E[t++].call(this);return e.apply(this,arguments)}}(p),p[s]=g)),d.call(e,o)&&B(e[o],p,h,!0,!0,b),u&&(a!==h&&B(a,p,h,!0,!0,b),p[s]=g),g[t]!==p&&I(g,t,p,!1),B(e,g,h,!1,!0,b),d.call(e,r)&&$([].concat(e[r]),g),u&&!T&&I(g,c,h,!1),w(p,"isClass",O)}}(Object);
var DOMClass=function(e,t,n){"use strict";var r="onAttached",i="attachedCallback",s="onChanged",o="attributeChangedCallback",u="constructor",a="createdCallback",f="css",l="<style>",c="stylesheet",h="onDetached",p="detachedCallback",d="extends",v="name",m=e.document,g=m.documentElement,y=n.hasOwnProperty,b=t.prototype,w=function(e,t){for(var n,r=C(e),i=r.length;i--;)n=r[i],L.indexOf(n)<0&&!y.call(t,n)&&E(t,n,S(e,n))},E=n.defineProperty,S=n.getOwnPropertyDescriptor,x=n.getOwnPropertyNames||n.keys||function(e){var t=[],n;for(n in e)y.call(e,n)&&t.push(n);return t},T=n.getOwnPropertySymbols||function(){return b},N=function(t){return e["HTML"+t+"Element"]},C=function(e){return T(e).concat(x(e))},k=function(e,t){if(!t.length){var n=e.getAttribute("data-arguments");n&&(t=n.charAt(0)==="["?JSON.parse(n):n.split(/\s*,\s*/))}return t},L=C(function(){}),A=function(e,t,n,r){y.call(e,t)&&(n[r]=e[t])},O=function(){for(var n=+this,r=n,i=arguments.length,s=i-n,o=new t(s<0?0:s);r<i;r++)o[r-n]=arguments[r];return o},M=function(e){return e+"-i-"+(y.call(P,e)?++P[e]:P[e]=0)},_=function(e,t,n){var r;e.setAttribute("dom-class-uid",n),E(e,f,{configurable:!0,get:function(){return r||(r=restyle(t+'[dom-class-uid="'+n+'"]',{}))},set:function(t){e[f].replace(t)}})},D=function(e,t){var n=new XMLHttpRequest,r=m.body||m.head||g,i,s;try{n.open("GET",t,!1),n.send(null),i=n.responseText,s=r.insertBefore(m.createElement("style"),r.lastChild),s.type="text/css","styleSheet"in s?s.styleSheet.cssText=i:s.appendChild(m.createTextNode(i))}catch(o){s=m.createElement("link"),s.href=t,s.rel="stylesheet",s.type="text/css",r.insertBefore(s,r.lastChild)}return g.offsetWidth},P={},H=0;return function(t){var n=function(){return C&&(C=!1,D(F,L)),g=O.apply(0,arguments),new B},g=b,S={},x=y.call(t,f),T=y.call(t,u),C=y.call(t,c),L=C&&t[c],P=T&&t[u],B,j,F,I,q,R;A(t,r,S,i),A(t,s,S,o),A(t,h,S,p);for(F in t)if(y.call(t,F))switch(F){case r:case s:case u:case h:case d:case v:case f:case c:break;default:S[F]=t[F]}S[d]=y.call(t,d)?t[d].prototype:HTMLElement.prototype;if(S[d]instanceof HTMLElement)switch(t[d]){case N("Anchor"):R="a";break;case N("Audio"):R="audio";break;case N("BR"):R="br";break;case N("Body"):R="body";break;case N("Button"):R="button";break;case N("Canvas"):R="canvas";break;case N("Col"):R="col";break;case N("DataList"):R="dl";break;case N("Div"):R="div";break;case N("Form"):R="form";break;case N("HR"):R="hr";break;case N("Head"):R="head";break;case N("IFrame"):R="iframe";break;case N("Image"):R="img";break;case N("Input"):R="input";break;case N("LI"):R="li";break;case N("Label"):R="label";break;case N("Legend"):R="legend";break;case N("Link"):R="link";break;case N("Menu"):R="menu";break;case N("OList"):R="ol";break;case N("Option"):R="option";break;case N("Paragraph"):R="p";break;case N("Progress"):R="progress";break;case N("Quote"):R="quote";break;case N("Select"):R="select";break;case N("Span"):R="span";break;case N("Style"):R="style";break;case N("Table"):R="table";break;case N("TableCaption"):R="caption";break;case N("TableCell"):R="td";break;case N("TableCol"):R="colgroup";break;case N("TableRow"):R="tr";break;case N("TableSection"):R="tbody";break;case N("Table"):R="table";break;case N("Table"):R="table";break;case N("TextArea"):R="textarea";break;case N("Track"):R="track";break;case N("UList"):R="ul";break;case N("Video"):R="video"}return F=y.call(t,v)?t[v]:"x-dom-class-"+H++,x&&(q=R?R+'[is="'+F+'"]':F,S[l]=restyle(q,t[f])),S[a]=function(){var e=k(this,g);g=b,j.apply(this,e),x&&_(this,q,M(F)),T&&P.apply(this,e)},j=new Class(S),w(j,n),I={prototype:j.prototype},R&&(I[d]=R),B=m.registerElement(F,I),n.prototype=B.prototype,E(B.prototype,u,{value:n}),n}}(this&&this.window||global,Array,Object);