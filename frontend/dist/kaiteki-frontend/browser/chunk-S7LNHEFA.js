import{a as F}from"./chunk-34HOUZZI.js";import{a as j}from"./chunk-AFMGG7ZR.js";import{C as E,Ga as I,Ha as L,Ja as q,nb as z,pb as B,v as b}from"./chunk-IDIRVXY3.js";import{Aa as S,Fb as d,Kb as o,Lb as n,Mb as m,Qb as O,Tb as P,Vb as p,cc as r,ec as v,fa as s,fb as l,gb as C,ld as T,mc as y,pa as M,qa as g,qd as D,vc as h,wc as x,xb as _,za as k,zb as f}from"./chunk-TYBYM3PM.js";import"./chunk-REV7FFDQ.js";import"./chunk-MON7YFGF.js";var U=()=>({width:"300px",height:"300px","border-radius":"8px"}),$=()=>({display:"flex",width:"300px",height:"20px","border-radius":"8px"});function Q(t,e){t&1&&(o(0,"div")(1,"p",11),r(2,"Integration Key"),n(),o(3,"p",12),r(4),n()()),t&2&&(l(4),v(" ",e.key," "))}function V(t,e){if(t&1){let c=O();o(0,"div",5)(1,"div",7),m(2,"qrcode",8),n(),o(3,"div",9)(4,"div",10)(5,"h3"),r(6,"Scan QR Code"),n(),o(7,"p"),r(8,"Point your device camera at this QR code and click the link"),n()(),o(9,"div")(10,"p",11),r(11,"Link"),n(),o(12,"p",12),r(13),n()(),_(14,Q,5,1,"div"),h(15,"async"),o(16,"button",13),P("click",function(){k(c);let i=p(),u=p();return S(u.onOpenUrl(i.data.link))}),r(17," Open URL "),n()()()}if(t&2){let c,a=p(),i=p();l(2),f("qrdata",a.data.link)("scale",1)("width",350),l(11),v(" ",a.data.link," "),l(),d(14,(c=x(15,5,i.integrationKey$))?14:-1,c)}}function A(t,e){t&1&&(o(0,"div",6),m(1,"ngx-skeleton-loader",14)(2,"ngx-skeleton-loader",15),n()),t&2&&(l(),f("theme",y(2,U)),l(),f("theme",y(3,$)))}function H(t,e){if(t&1&&_(0,V,18,7,"div",5)(1,A,3,4,"div",6),t&2){let c=e;d(0,c.data?0:-1),l(),d(1,c.loading?1:-1)}}var K=(()=>{let e=class e{constructor(a,i){this.telegramService=a,this.integrationService=i,this.url$=this.telegramService.getBotLink(),this.integrationKey$=this.integrationService.getUserIntegrationCredentials()}onOpenUrl(a){window.open(a,"_blank")}};e.\u0275fac=function(i){return new(i||e)(C(F),C(j))},e.\u0275cmp=M({type:e,selectors:[["app-telegram-dashboard"]],decls:12,vars:5,consts:[["value","Telegram"],[1,"page","telegram"],[1,"telegram__content"],[1,"telegram__header"],[1,"telegram__separator"],[1,"telegram__section"],[1,"telegram__loading"],[1,"telegram__qr"],["elementType","url","errorCorrectionLevel","M",3,"qrdata","scale","width"],[1,"telegram__section-details"],[1,"telegram__section-details-header"],[1,"telegram__section-details-label"],[1,"telegram__section-details-link"],["mat-flat-button","","color","primary",3,"click"],["count","1","appearance","line",3,"theme"],["count","4","appearance","line",3,"theme"]],template:function(i,u){if(i&1&&(m(0,"app-page-header",0),o(1,"section",1)(2,"section",2)(3,"div",3)(4,"h2"),r(5,"Telegram integration"),n(),o(6,"p"),r(7," Stay on top of your schedule! Our Telegram integration brings you notifications, upcoming tasks & events, and even helps answer questions within the platform, all through Telegram. "),n()(),m(8,"div",4),_(9,H,2,2),h(10,"withLoading"),h(11,"async"),n()()),i&2){let w;l(9),d(9,(w=x(11,3,x(10,1,u.url$)))?9:-1,w)}},dependencies:[q,E,L,I,T,z],styles:[".telegram[_ngcontent-%COMP%]{display:flex;justify-content:center}.telegram__content[_ngcontent-%COMP%]{max-width:100%;background:#fff;border-radius:12px;padding:34px;border:1px solid #ebeaea;display:flex;flex-direction:column;gap:30px}@media (max-width: 48em){.telegram__content[_ngcontent-%COMP%]{padding:22px;gap:20px}}.telegram__header[_ngcontent-%COMP%]{max-width:60%}.telegram__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:16px;font-weight:600}.telegram__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;color:#7c7f85;font-weight:500}.telegram__loading[_ngcontent-%COMP%]{display:flex;gap:24px;align-items:center;justify-content:center}.telegram__section[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:24px}.telegram__section-details[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}.telegram__section-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:16px;font-weight:600}.telegram__section-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;color:#7c7f85;font-weight:500}.telegram__section-details-link[_ngcontent-%COMP%]{font-size:14px;color:#242424;padding:8px 16px;border-radius:6px;border:1px solid #cacccb;background:#f8f9fad9}.telegram__separator[_ngcontent-%COMP%]{width:100%;height:1px;background:#ebeaea}"],changeDetection:0});let t=e;return t})();var W=[{path:"",component:K,title:"Telegram Dashboard | Kaiteki"}],R=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=g({type:e}),e.\u0275inj=s({imports:[b.forChild(W),b]});let t=e;return t})();var se=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=g({type:e}),e.\u0275inj=s({imports:[D,B,R]});let t=e;return t})();export{se as TelegramModule};
