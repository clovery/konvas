!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Konvas=e()}(this,function(){"use strict";var t=function(){function t(t,e){var i=this;this.onMouseDown=function(t){var e=t.target;i.active=i.canvas.getNode(e.id),i.active&&i.active.isDraggable&&(i.dragging=!0,i.mouse&&i.active&&(i.startPoint={x:i.mouse.x-i.active.x,y:i.mouse.y-i.active.y}),i.opts.onStart(e.id))},this.onMouseMove=function(t){t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault();var e=t.pageX-i.canvas.left,n=t.pageY-i.canvas.top;if(e/=i.canvas.scale,n/=i.canvas.scale,i.mouse={x:e,y:n},i.dragging&&i.active){e-=i.startPoint.x;var o=String(Math.round(e)),s=String(Math.round(n-i.startPoint.y)),r=function(t,e,i,n){var o=t,s=e;return t<=0&&(o=0),e<=0&&(s=0),t+n.width>=i.width&&(o=i.width-n.width),e+n.height>=i.height&&(s=i.height-n.height),{x:o>=0?o:-1,y:s>=0?s:-1}}(e=parseInt(o,10),n=parseInt(s,10),i.canvas,i.active);(r.x>=0||r.y>=0)&&(e=r.x,n=r.y),i.opts.onMove(i.active.id,{x:e,y:n}),i.x=e,i.y=n}},this.onMouseUp=function(){if(i.dragging&&i.active){i.dragging=!1;var t=i.active.id;t&&(void 0!==i.x&&void 0!==i.y&&i.opts.onStop(t,{x:i.x,y:i.y}),i.x=null,i.y=null,i.active=null)}},this.canvas=t,this.opts=e,this.x=0,this.y=0,this.initEvent()}return t.prototype.initEvent=function(){this.canvas.el.addEventListener("mousedown",this.onMouseDown,!1),this.canvas.el.addEventListener("mouseup",this.onMouseUp,!1),document.documentElement.addEventListener("mousemove",this.onMouseMove,!1),document.documentElement.addEventListener("mouseup",this.onMouseUp,!1)},t}(),e=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t};var i=1,n=function(){function t(t){this.el=document.createElement("div"),this.id=String(i++),this.el.id=this.id,this.el.classList.add("node"),this.isDraggable="boolean"!=typeof t.draggable||t.draggable,this.islocked=!1,this.data=e({},t),this.x=this.data.x||0,this.y=this.data.y||0,this.layout={rotate:0},this.initStyle(),this.render()}return t.prototype.initStyle=function(){this.el.style.position="absolute"},Object.defineProperty(t.prototype,"width",{get:function(){return this.data.width},set:function(t){this.data.width=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.data.height},set:function(t){this.data.height=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rotate",{get:function(){return this.layout.rotate},set:function(t){this.layout.rotate=t,this.el.style.transform="rotate("+t+"deg)"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scale",{get:function(){return this.data.scale||1},set:function(t){this.data.scale=t,this.render()},enumerable:!0,configurable:!0}),t.prototype.lock=function(){this.islocked=!0,this.isDraggable=!1},t.prototype.unlock=function(){this.islocked=!1,this.isDraggable=!0},t.prototype.move=function(t,e){this.x=t,this.y=e;var i=this.el;i.style.left=t+"px",i.style.top=e+"px"},t.prototype.render=function(){var t=this.el,e=this.x*this.scale,i=this.y*this.scale,n=this.width*this.scale,o=this.height*this.scale;t.style.left=e+"px",t.style.top=i+"px",t.style.width=n+"px",t.style.height=o+"px"},t.prototype.wrap=function(t){this.wrapper||(this.el.appendChild(t),this.wrapper=t)},t.prototype.toJSON=function(){return{x:this.x,y:this.y,width:this.width,height:this.height,scale:this.scale}},t}();return function(){function e(e,i){void 0===i&&(i={width:600,height:300,scale:1});var n=this;this.el=function(t){if("string"==typeof t){var e=document.querySelector(t);return e||document.createElement("div")}return t}(e),this.options=i,this.nodes=[],this.layout={width:i.width,height:i.height,scale:i.scale||1},this.dragger=new t(this,{onStart:function(t){var e=n.getNode(t);e&&(n.activeNode=e)},onMove:function(t,e){var i=e.x,o=e.y;n.activeNode.move(i,o)},onStop:function(t){}}),this.initStyle()}return e.prototype.initStyle=function(){this.el.classList.add("konvas");var t=this.el;t.style.position="relative",t.style.transformOrigin="0 0",this.render()},e.prototype.render=function(){var t=this.el,e=this.width*this.scale,i=this.height*this.scale;t.setAttribute("data-scale",String(this.scale)),t.style.width=e+"px",t.style.height=i+"px"},e.prototype.addNode=function(t){return t instanceof n?this.nodes.push(t):(t=new n(t),this.el.appendChild(t.el),this.nodes.push(t)),t},e.prototype.getNode=function(t){return"string"==typeof t?this.nodes.filter(function(e){return e.id===t})[0]:t},Object.defineProperty(e.prototype,"left",{get:function(){return this.el.getBoundingClientRect().left},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"top",{get:function(){return this.el.getBoundingClientRect().top},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scale",{get:function(){return this.layout.scale},set:function(t){this.layout.scale=t,this.nodes.forEach(function(e){return e.scale=t}),this.render()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"width",{get:function(){return this.layout.width},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.layout.height},enumerable:!0,configurable:!0}),e.prototype.toJSON=function(){var t=this.nodes.map(function(t){return t.toJSON()});return{width:this.width,height:this.height,scale:this.scale,nodes:t}},e.prototype.setStyle=function(t){!function(t,e){var i=t;if(e){var n=[];for(var o in e)o&&n.push(o+": "+e[o]+";");i.setAttribute("style",n.join(";"))}}(this.el,t)},e}()});
//# sourceMappingURL=konvas.js.map
