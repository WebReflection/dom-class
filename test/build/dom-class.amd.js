/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
define(["es-class","restyle"],function(e,t){var n=function(n,r){"use strict";var i="onAttached",s="attachedCallback",o="onChanged",u="attributeChangedCallback",a="constructor",f="createdCallback",l="css",c="onDetached",h="detachedCallback",p="extends",d="name",v=r.hasOwnProperty,m=n.prototype,g=function(e,t){if(!t.length){var n=e.getAttribute("data-arguments");n&&(t=n.charAt(0)==="["?JSON.parse(n):n.split(/\s*,\s*/))}return t},y=function(e,t,n,r){v.call(e,t)&&(n[r]=e[t])},b=function(){for(var t=+this,r=t,i=arguments.length,s=i-t,o=new n(s<0?0:s);r<i;r++)o[r-t]=arguments[r];return o},w=function(e){return e+"-i-"+(v.call(E,e)?++E[e]:E[e]=0)},E={},S=0;return function(r){var E=function(){return x=b.apply(0,arguments),new L},x=m,T={},N=v.call(r,l),C=v.call(r,a),k=C&&r[a],L,A,O;y(r,i,T,s),y(r,o,T,u),y(r,c,T,h);for(O in r)if(v.call(r,O))switch(O){case i:case o:case a:case c:case p:case d:case l:break;default:T[O]=r[O]}return T[p]=v.call(r,p)?r[p].prototype:HTMLElement.prototype,O=v.call(r,d)?r[d]:"x-dom-class-"+S++,N&&(T[l]=t(O,r[l])),T[f]=function(){x=g(this,x),A.apply(this,x),N&&(this.classList.add(w(O)),this.css=t(O+"."+this.className.split(" ").pop(),{})),C&&k.apply(this,x)},A=new e(T),L=document.registerElement(O,{prototype:A.prototype}),E.prototype=L.prototype,E}}(Array,Object);return n});