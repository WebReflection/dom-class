/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
var DOMClass=function(e,t){"use strict";var n="onAttached",r="attachedCallback",i="onChanged",s="attributeChangedCallback",o="constructor",u="createdCallback",a="css",f="onDetached",l="detachedCallback",c="extends",h="name",p=t.hasOwnProperty,d=e.prototype,v=function(e,t){if(!t.length){var n=e.getAttribute("data-arguments");n&&(t=n.charAt(0)==="["?JSON.parse(n):n.split(/\s*,\s*/))}return t},m=function(e,t,n,r){p.call(e,t)&&(n[r]=e[t])},g=function(){for(var n=+this,r=n,i=arguments.length,s=i-n,o=new e(s<0?0:s);r<i;r++)o[r-n]=arguments[r];return o},y=function(e){return e+"-i-"+(p.call(b,e)?++b[e]:b[e]=0)},b={},w=0;return function(t){var b=function(){return E=g.apply(0,arguments),new C},E=d,S={},x=p.call(t,a),T=p.call(t,o),N=T&&t[o],C,k,L;m(t,n,S,r),m(t,i,S,s),m(t,f,S,l);for(L in t)if(p.call(t,L))switch(L){case n:case i:case o:case f:case c:case h:case a:break;default:S[L]=t[L]}return S[c]=p.call(t,c)?t[c].prototype:HTMLElement.prototype,L=p.call(t,h)?t[h]:"x-dom-class-"+w++,x&&(S[a]=restyle(L,t[a])),S[u]=function(){E=v(this,E),k.apply(this,E),x&&(this.classList.add(y(L)),this.css=restyle(L+"."+this.className.split(" ").pop(),{})),T&&N.apply(this,E)},k=new Class(S),C=document.registerElement(L,{prototype:k.prototype}),b.prototype=C.prototype,b}}(Array,Object);