(this.webpackJsonppore=this.webpackJsonppore||[]).push([[0],{23:function(e,t,n){e.exports=n(33)},28:function(e,t,n){},29:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(8),u=n.n(r),i=(n(28),n(21)),c=n(11),l=(n(29),n(18)),s=n(37),d=n(36);n(30);var f=function(){var e=o.a.useState(null),t=Object(c.a)(e,2),n=t[0],a=t[1],r=o.a.useState(null),u=Object(c.a)(r,2),f=(u[0],u[1]),m=o.a.useState(1),p=Object(c.a)(m,2),F=p[0],v=p[1],h=o.a.useState(1),g=Object(c.a)(h,2),E=g[0],w=g[1],A=o.a.useState(!1),b=Object(c.a)(A,2),y=b[0],k=b[1],x=o.a.useState([]),S=Object(c.a)(x,2),j=S[0],C=S[1],O=o.a.createRef(),W=.8*window.innerWidth;return console.log(W),o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"dropFileArea"},o.a.createElement("div",{style:{display:"flex",height:"40px",verticalAlign:"middle"}},o.a.createElement("div",{style:{padding:"8px"}},"Drop file or"),o.a.createElement(s.a,{onClick:function(){O.current.click()}},"Select File"),o.a.createElement("input",{type:"file",ref:O,onChange:function(e){var t=e.target.files;t.length>0&&function(e){var t=new FileReader;t.onload=function(e){a(btoa(t.result));var n=window.pdf2text(btoa(t.result));f(n);var o=n.matchAll(Object(i.a)(/([0-9]{1,2})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]{10})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([\t-\r &\x2D\.0-9A-Z\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]+|[0-9]+.[0-9]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]+,?[0-9]+\.[0-9]{2})[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9]+,?[0-9]+\.[0-9]{2})/gm,{item:1,materialno:2,description:3,date:4,quantity:5,quantifier:6,unitprice:7,totalprice:8}));C(Array.from(o).map((function(e){return e.groups})))},t.readAsBinaryString(e[0])}(t)},style:{display:"none"},accept:".pdf"}))),j.length>0&&o.a.createElement("table",{className:"po-output"},o.a.createElement("thead",null,o.a.createElement("tr",null,Object.keys(j[0]).map((function(e,t){return o.a.createElement("td",{key:t},"".concat(e,"\t"))})))),o.a.createElement("tbody",null,j.map((function(e,t){return o.a.createElement("tr",{key:"item_".concat(t)},Object.keys(e).map((function(n,a){return o.a.createElement("td",{key:"item_".concat(t,"_").concat(a)},"".concat(e[n],"\t"))})))})),o.a.createElement("tr",null))),null!==n&&o.a.createElement(s.a,{variant:"secondary",onClick:function(){k(!0)}},"View PDF"),o.a.createElement(d.a,{centered:!0,scrollable:!0,show:y,onHide:function(){k(!1)},dialogClassName:"pdf-modal",size:"xl"},o.a.createElement(d.a.Header,{closeButton:!0},o.a.createElement(d.a.Title,null,"PDF Document")),o.a.createElement(d.a.Body,null,null!==n&&o.a.createElement(l.PDFReader,{data:atob(n),size:.7,onDocumentComplete:function(e){v(e)},page:E,width:W})),o.a.createElement(d.a.Footer,null,o.a.createElement("div",null,"Page ",E," of ",F),o.a.createElement(s.a,{variant:"secondary",onClick:function(){E-1>=0&&w(E-1)},disabled:1==E},"Previous"),o.a.createElement(s.a,{variant:"secondary",onClick:function(){E+1<=F&&w(E+1)},disabled:E==F},"Next"))))},m=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function p(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}u.a.render(o.a.createElement(f,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/poer",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/poer","/service-worker.js");m?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):p(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):p(t,e)}))}}()}},[[23,1,2]]]);
//# sourceMappingURL=main.7e92f936.chunk.js.map