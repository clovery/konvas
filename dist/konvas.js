!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Konvas=e()}(this,function(){"use strict";var t=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},e=function(){function e(e){this.el=document.createElement("div"),this.el.classList.add("draggable"),this.data=t({},e),this.initStyle(),this.draw()}return e.prototype.initStyle=function(){this.el.style.position="absolute"},Object.defineProperty(e.prototype,"x",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return 0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"width",{get:function(){return this.data.width},set:function(t){this.data.width=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.data.height},set:function(t){this.data.height=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scale",{get:function(){return this.data.scale||1},set:function(t){this.data.scale=t,this.draw()},enumerable:!0,configurable:!0}),e.prototype.draw=function(){var t=this.el;t.style.width=this.width*this.scale+"px",t.style.height=this.height*this.scale+"px"},e}();return function(){function t(t,e){void 0===e&&(e={width:300,height:150}),this.elem=function(t){if("string"==typeof t){var e=document.querySelector(t);return e||document.createElement("div")}return t}(t),this.options=e,this.nodes=[],this.initStyle()}return t.prototype.initStyle=function(){this.elem.classList.add("konvas");var t=this.elem;t.style.position="relative",t.style.transformOrigin="0 0",t.style.width=this.options.width+"px",t.style.height=this.options.height+"px"},t.prototype.addNode=function(t){t instanceof e?this.nodes.push(t):(t=new e(t),this.elem.appendChild(t.el),this.nodes.push(t))},t}()});
//# sourceMappingURL=konvas.js.map
