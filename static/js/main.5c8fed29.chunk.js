(this.webpackJsonppore=this.webpackJsonppore||[]).push([[0],{23:function(e,t,u){e.exports=u(33)},28:function(e,t,u){},29:function(e,t,u){},33:function(e,t,u){"use strict";u.r(t);var a=u(0),n=u.n(a),r=u(8),o=u.n(r),c=(u(28),u(14)),l=u(9),i=(u(29),u(19)),s=u(37),F=u(36);u(30);var d=function(){var e=n.a.useState(null),t=Object(l.a)(e,2),u=t[0],a=t[1],r=n.a.useState(null),o=Object(l.a)(r,2),d=(o[0],o[1]),m=n.a.useState(1),p=Object(l.a)(m,2),f=p[0],E=p[1],A=n.a.useState(1),v=Object(l.a)(A,2),g=v[0],h=v[1],b=n.a.useState(!1),x=Object(l.a)(b,2),w=x[0],y=x[1],O=n.a.useState([]),k=Object(l.a)(O,2),D=k[0],j=k[1],P=n.a.useState(""),S=Object(l.a)(P,2),N=S[0],C=S[1],W=n.a.useState(""),R=Object(l.a)(W,2),B=R[0],T=R[1],_=n.a.createRef(),z=function(e){var t=new FileReader;t.onload=function(e){a(btoa(t.result));var u=window.pdf2text(btoa(t.result));u.match(Object(c.a)(/PO[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+Number[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+)/,{ponumber:1}))?C(u.match(Object(c.a)(/PO[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+Number[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+)/,{ponumber:1})).groups.ponumber):C(""),u.match(Object(c.a)(/PO[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+Date[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+[\x2D\.\\\|][0-9]+[\x2D\.\\\|][0-9]+)/,{podate:1}))?T(u.match(Object(c.a)(/PO[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+Date[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+[\x2D\.\\\|][0-9]+[\x2D\.\\\|][0-9]+)/,{podate:1})).groups.podate):T(""),d(u);var n=u.matchAll(Object(c.a)(/([0-9]{1,2})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]{10})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([\t-\r &'\x2D\.0-9A-Z_a-z\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]+|[0-9]+.[0-9]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]+,?[0-9]*\.[0-9]{2})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]+,?[0-9]+\.[0-9]{2})/gm,{item:1,materialno:2,description:3,date:4,quantity:5,quantifier:6,unitprice:7,totalprice:8}));j(Array.from(n).map((function(e){return e.groups})))},t.readAsBinaryString(e[0])},U=.8*window.innerWidth;return console.log(U),n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"dropFileArea",onDragOver:function(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"},onDrop:function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;z(t)}},n.a.createElement("div",{style:{display:"flex",height:"40px",verticalAlign:"middle"}},n.a.createElement("div",{style:{padding:"8px"}},"Drop file or"),n.a.createElement(s.a,{onClick:function(){_.current.click()}},"Select File"),n.a.createElement("input",{type:"file",ref:_,onChange:function(e){var t=e.target.files;t.length>0&&z(t)},style:{display:"none"},accept:".pdf"}))),D.length>0&&n.a.createElement(n.a.Fragment,null,n.a.createElement("table",{className:"po-output"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"PO Number"),n.a.createElement("td",null,"PO Date"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,N),n.a.createElement("td",null,B)))),n.a.createElement("table",{className:"po-output"},n.a.createElement("thead",null,n.a.createElement("tr",null,Object.keys(D[0]).map((function(e,t){return n.a.createElement("td",{key:t},"".concat(e,"\t"))})))),n.a.createElement("tbody",null,D.map((function(e,t){return n.a.createElement("tr",{key:"item_".concat(t)},Object.keys(e).map((function(u,a){return n.a.createElement("td",{key:"item_".concat(t,"_").concat(a)},"".concat(e[u],"\t"))})))})),n.a.createElement("tr",null)))),null!==u&&n.a.createElement(s.a,{variant:"secondary",onClick:function(){y(!0)}},"View PDF"),n.a.createElement(F.a,{centered:!0,scrollable:!0,show:w,onHide:function(){y(!1)},dialogClassName:"pdf-modal",size:"xl"},n.a.createElement(F.a.Header,{closeButton:!0},n.a.createElement(F.a.Title,null,"PDF Document")),n.a.createElement(F.a.Body,null,null!==u&&n.a.createElement(i.PDFReader,{data:atob(u),size:.7,onDocumentComplete:function(e){E(e)},page:g,width:U})),n.a.createElement(F.a.Footer,null,n.a.createElement("div",null,"Page ",g," of ",f),n.a.createElement(s.a,{variant:"secondary",onClick:function(){g-1>=0&&h(g-1)},disabled:1==g},"Previous"),n.a.createElement(s.a,{variant:"secondary",onClick:function(){g+1<=f&&h(g+1)},disabled:g==f},"Next"))))},m=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function p(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var u=e.installing;null!=u&&(u.onstatechange=function(){"installed"===u.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(n.a.createElement(d,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/poer",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/poer","/service-worker.js");m?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(u){var a=u.headers.get("content-type");404===u.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):p(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):p(t,e)}))}}()}},[[23,1,2]]]);
//# sourceMappingURL=main.5c8fed29.chunk.js.map