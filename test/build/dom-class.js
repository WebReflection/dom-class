/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
var DOMClass=function(e,t,n){"use strict";var r="onAttached",i="attachedCallback",s="onChanged",o="attributeChangedCallback",u="constructor",a="createdCallback",f="css",l="<style>",c="onDetached",h="detachedCallback",p="extends",d="name",v=n.hasOwnProperty,m=t.prototype,g=function(e,t){for(var n,r=x(e),i=r.length;i--;)n=r[i],N.indexOf(n)<0&&!v.call(t,n)&&y(t,n,b(e,n))},y=n.defineProperty,b=n.getOwnPropertyDescriptor,w=n.getOwnPropertyNames||n.keys||function(e){var t=[],n;for(n in e)v.call(e,n)&&t.push(n);return t},E=n.getOwnPropertySymbols||function(){return m},S=function(t){return e["HTML"+t+"Element"]},x=function(e){return E(e).concat(w(e))},T=function(e,t){if(!t.length){var n=e.getAttribute("data-arguments");n&&(t=n.charAt(0)==="["?JSON.parse(n):n.split(/\s*,\s*/))}return t},N=x(function(){}),C=function(e,t,n,r){v.call(e,t)&&(n[r]=e[t])},k=function(){for(var n=+this,r=n,i=arguments.length,s=i-n,o=new t(s<0?0:s);r<i;r++)o[r-n]=arguments[r];return o},L=function(e){return e+"-i-"+(v.call(O,e)?++O[e]:O[e]=0)},A=function(e,t,n){var r;e.setAttribute("dom-class-uid",n),y(e,f,{configurable:!0,get:function(){return r||(r=restyle(t+'[dom-class-uid="'+n+'"]',{}))},set:function(t){e[f].replace(t)}})},O={},M=0;return function(t){var n=function(){return b=k.apply(0,arguments),new O},b=m,w={},E=v.call(t,f),x=v.call(t,u),N=x&&t[u],O,_,D,P,H;C(t,r,w,i),C(t,s,w,o),C(t,c,w,h);for(D in t)if(v.call(t,D))switch(D){case r:case s:case u:case c:case p:case d:case f:break;default:w[D]=t[D]}w[p]=v.call(t,p)?t[p].prototype:HTMLElement.prototype;if(w[p]instanceof HTMLElement)switch(t[p]){case S("Anchor"):H="a";break;case S("Audio"):H="audio";break;case S("BR"):H="br";break;case S("Body"):H="body";break;case S("Button"):H="button";break;case S("Canvas"):H="canvas";break;case S("Col"):H="col";break;case S("DataList"):H="dl";break;case S("Div"):H="div";break;case S("Form"):H="form";break;case S("HR"):H="hr";break;case S("Head"):H="head";break;case S("IFrame"):H="iframe";break;case S("Image"):H="img";break;case S("Input"):H="input";break;case S("LI"):H="li";break;case S("Label"):H="label";break;case S("Legend"):H="legend";break;case S("Link"):H="link";break;case S("Menu"):H="menu";break;case S("OList"):H="ol";break;case S("Option"):H="option";break;case S("Paragraph"):H="p";break;case S("Progress"):H="progress";break;case S("Quote"):H="quote";break;case S("Select"):H="select";break;case S("Span"):H="span";break;case S("Style"):H="style";break;case S("Table"):H="table";break;case S("TableCaption"):H="caption";break;case S("TableCell"):H="td";break;case S("TableCol"):H="colgroup";break;case S("TableRow"):H="tr";break;case S("TableSection"):H="tbody";break;case S("Table"):H="table";break;case S("Table"):H="table";break;case S("TextArea"):H="textarea";break;case S("Track"):H="track";break;case S("UList"):H="ul";break;case S("Video"):H="video"}return D=v.call(t,d)?t[d]:"x-dom-class-"+M++,E&&(w[l]=restyle(D,t[f])),w[a]=function(){var e=T(this,b);b=m,_.apply(this,e),E&&A(this,D,L(D)),x&&N.apply(this,e)},_=new Class(w),g(_,n),P={prototype:_.prototype},H&&(P[p]=H),O=document.registerElement(D,P),n.prototype=O.prototype,y(O.prototype,u,{value:n}),n}}(this.window||global,Array,Object);