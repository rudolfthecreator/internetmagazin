"use strict";(self["webpackChunktest2"]=self["webpackChunktest2"]||[]).push([[658],{658:function(n,t,u){u.r(t),u.d(t,{default:function(){return g}});var e=u(641),c=u(33),i=u(953),s=u(278),a=u(565),l={class:"products"},r=["src"],o={class:"description"},v={class:"price"},d=["onClick"],k={key:1},p=["onClick"],f=["onClick"],C={class:"pagination"},h=["onClick"],m=(0,e.pM)({__name:"ProductsView",setup:function(n){var t=(0,s.Pj)(),u=(0,i.KR)();fetch("https://dummyjson.com/products").then((function(n){return n.json()})).then((function(n){u.value=n.products}));var m=(0,i.KR)(0),_=(0,e.EW)((function(){return u.value?Math.ceil(u.value.length/8):0})),b=(0,e.EW)((function(){return u.value?u.value.slice(8*m.value,8*m.value+8):[]}));return function(n,u){return(0,e.uX)(),(0,e.CE)(e.FK,null,[(0,e.Lk)("div",l,[((0,e.uX)(!0),(0,e.CE)(e.FK,null,(0,e.pI)(b.value,(function(n){return(0,e.uX)(),(0,e.CE)("div",{key:n.id,class:"item"},[(0,e.Lk)("img",{src:n.images[0]},null,8,r),(0,e.Lk)("strong",null,(0,c.v_)(n.title)+". "+(0,c.v_)(n.brand),1),(0,e.Lk)("span",o,(0,c.v_)(n.description),1),(0,e.Lk)("span",v,(0,c.v_)((0,i.R1)(a.a)(100*n.price))+" ₽",1),(0,i.R1)(t).state.basket.has(n.id)?((0,e.uX)(),(0,e.CE)("div",k,[(0,e.Lk)("button",{class:"width",onClick:function(u){return(0,i.R1)(t).dispatch("minusOrDelete",n)}}," - ",8,p),(0,e.eW)(" "+(0,c.v_)((0,i.R1)(t).state.basket.get(n.id).count)+" ",1),(0,e.Lk)("button",{class:"width",onClick:function(u){return(0,i.R1)(t).commit("plusCount",n)}}," + ",8,f)])):((0,e.uX)(),(0,e.CE)("button",{key:0,onClick:function(u){return(0,i.R1)(t).commit("addProduct",n)}}," В корзину ",8,d))])})),128))]),(0,e.Lk)("div",C,[((0,e.uX)(!0),(0,e.CE)(e.FK,null,(0,e.pI)(_.value,(function(n){return(0,e.uX)(),(0,e.CE)("div",{key:n,class:(0,c.C4)(n==m.value+1?"page page__current":"page"),onClick:function(t){return m.value=n-1}},(0,c.v_)(n),11,h)})),128))])],64)}}}),_=u(262);const b=(0,_.A)(m,[["__scopeId","data-v-6fe936b8"]]);var g=b}}]);
//# sourceMappingURL=658.504ead0e.js.map