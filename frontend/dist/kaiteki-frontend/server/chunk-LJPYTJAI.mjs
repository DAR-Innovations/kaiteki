import './polyfills.server.mjs';
import{a as ce,b as c,c as S}from"./chunk-FTKIKE6M.mjs";import{a as W}from"./chunk-25DJJPSL.mjs";import{I as Q,K as g,L as X,M as ee,N as te,O as P,Q as ie,T as ne,U as oe,V as ae,W as re,X as se,eb as le,n as O,t as J,wa as pe,ya as de}from"./chunk-UGHUVQZH.mjs";import"./chunk-IWV7G257.mjs";import{Bb as u,F as E,Hb as d,Ib as V,K as I,Kb as B,Lb as D,Mb as a,Nb as s,O as A,Ob as _,Vb as G,Xb as f,_ as K,a as q,db as L,ea as F,ec as l,f as T,fa as b,g as h,gc as y,hb as r,ib as k,ja as $,o as H,oc as U,pa as N,pc as C,qa as x,rd as Y,wd as Z,xc as v,yc as z,zb as m}from"./chunk-JAB3SG4D.mjs";import"./chunk-6VT7JIM2.mjs";import"./chunk-FME56UVT.mjs";var me=(()=>{let t=class t{constructor(i){this.kaizenAPIService=i,this.userResponseSubject=new h(null),this.userRequestSubject=new h(null),this.isLoadingSubject=new h(!1),this.request$=this.userRequestSubject.asObservable(),this.response$=this.userResponseSubject.asObservable(),this.isLoading$=this.isLoadingSubject.asObservable()}get response(){return this.userResponseSubject.value}resetValues(){this.userRequestSubject.next(""),this.userResponseSubject.next(""),this.isLoadingSubject.next(!1)}setRequest(i){this.userRequestSubject.next(i)}setResponse(i){this.userResponseSubject.next(i)}setLoading(i){this.isLoadingSubject.next(i)}};t.\u0275fac=function(n){return new(n||t)($(S))},t.\u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var R=e=>({value:e}),he=()=>({height:"200px","border-radius":"8px"});function be(e,t){e&1&&(a(0,"div",11)(1,"span",13),l(2," Unlock the power of AI with Kaizen"),s(),a(3,"span",14),l(4," Your questions answered, your tasks automated "),s()())}function xe(e,t){if(e&1&&(a(0,"div",12)(1,"p",15),l(2,"You"),s(),a(3,"div",16)(4,"p",17),l(5),s()()()),e&2){let o=f();r(5),y(" ",o.value," ")}}function ke(e,t){if(e&1&&m(0,be,5,0,"div",11)(1,xe,6,1,"div",12),e&2){let o=t;d(0,o.value?-1:0),r(),d(1,o.value?1:-1)}}function Ce(e,t){e&1&&_(0,"ngx-skeleton-loader",10),e&2&&u("theme",U(1,he))}function ve(e,t){if(e&1&&(a(0,"div",18)(1,"div",19)(2,"p",20),l(3,"Kaizen"),s(),_(4,"img",21),s(),a(5,"div",22),_(6,"p",23),s()()),e&2){let o=f(),i=f(3);r(6),u("innerHTML",i.getFormattedResponse(o.value),L)}}function ze(e,t){e&1&&m(0,ve,7,1,"div",18),e&2&&d(0,t.value?0:-1)}function Se(e,t){if(e&1&&(m(0,ke,2,2),v(1,"async"),m(2,Ce,1,2,"ngx-skeleton-loader",10)(3,ze,1,1),v(4,"async")),e&2){let o,i,n=f(2);d(0,(o=C(7,R,z(1,3,n.request$)))?0:-1,o),r(2),d(2,t.value?2:-1),r(),d(3,(i=C(9,R,z(4,5,n.response$)))?3:-1,i)}}function Me(e,t){if(e&1&&(a(0,"div",2)(1,"div",9),m(2,Se,5,11),v(3,"async"),s()()),e&2){let o,i=f();r(2),d(2,(o=C(3,R,z(3,1,i.loading$)))?2:-1,o)}}function we(e,t){e&1&&(a(0,"div",3),l(1,"Currently under development"),s())}function ye(e,t){if(e&1&&(a(0,"option",6),l(1),s()),e&2){let o=t.$implicit;u("value",o.id),r(),y(" ",o.label," ")}}var ue=(()=>{let t=class t{constructor(i,n,p){this.toastService=i,this.kaizenService=n,this.kaizenAPIService=p,this.destroy$=new T,this.kaizenRequestSubscription=new q,this.response$=this.kaizenService.response$,this.request$=this.kaizenService.request$,this.loading$=this.kaizenService.isLoading$,this.currentMode=c.CHATBOT,this.modeOptions=[{id:c.CHATBOT,label:"Chatbot"},{id:c.SUMMARIZE,label:"Summarize"},{id:c.PARAPHRASE,label:"Paraphrase"},{id:c.KEYWORDS,label:"Extract Keywords"}],this.form=new te({mode:new P(c.CHATBOT,[g.required]),prompt:new P("",[g.required,g.minLength(2),g.maxLength(4048)])})}ngOnInit(){this.trackFormValueChanges()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.kaizenRequestSubscription.unsubscribe()}trackFormValueChanges(){this.form.valueChanges.pipe(K(this.destroy$)).subscribe(i=>{if(i){let n=i.mode??c.CHATBOT;this.currentMode!==n&&(this.currentMode=n,this.kaizenRequestSubscription.unsubscribe(),this.kaizenService.resetValues())}})}onSubmit(){let{mode:i,prompt:n}=this.form.getRawValue();if(!n||!i){this.toastService.error("Mode or prompt is missing or invalid");return}let p={prompt:n.trim()};this.kaizenService.response&&this.kaizenService.setResponse(""),this.kaizenService.setRequest(n.trim()),this.kaizenService.setLoading(!0),this.form.patchValue({prompt:"",mode:i});let M=this.kaizenAPIService.getKaizenResponse(p,i);if(!M){this.toastService.error("Mode is not supported");return}this.kaizenRequestSubscription=M.pipe(I(1),E(w=>(this.toastService.error("Failed to get prompt result"),H(()=>w))),A(()=>this.kaizenService.setLoading(!1))).subscribe(w=>{this.kaizenService.setResponse(w.result)})}isVoiceAssistantMode(){return this.currentMode===c.VOICE}getFormattedResponse(i){return ce(i)}};t.\u0275fac=function(n){return new(n||t)(k(W),k(me),k(S))},t.\u0275cmp=N({type:t,selectors:[["app-kaizen-home"]],decls:12,vars:4,consts:[["value","Kaizen"],[1,"page","kaizen"],[1,"kaizen__messages-wrapper"],[1,"kaizen__voice"],[1,"kaizen__toolbar",3,"formGroup"],["formControlName","mode",1,"kaizen__toolbar-modes"],[3,"value"],["type","text","placeholder","Enter prompt","formControlName","prompt",1,"kaizen__toolbar-input"],["type","submit",1,"kaizen__toolbar-button",3,"click","disabled"],[1,"kaizen__messages"],["count","1","appearance","line",3,"theme"],[1,"kaizen__slogan"],[1,"kaizen__request"],[1,"kaizen__slogan-title"],[1,"kaizen__slogan-subtitle"],[1,"kaizen__request-author"],[1,"kaizen__request-box"],[1,"kaizen__request-box-text"],[1,"kaizen__response"],[1,"kaizen__response-header"],[1,"kaizen__response-author"],["src","/assets/images/icons/kaizen-sparkles-gradient.svg","alt","sparkles"],[1,"kaizen__response-box"],[1,"kaizen__response-box-text",3,"innerHTML"]],template:function(n,p){n&1&&(_(0,"app-page-header",0),a(1,"section",1),m(2,Me,4,5,"div",2)(3,we,2,0,"div",3),a(4,"form",4)(5,"select",5),B(6,ye,2,2,"option",6,V),s(),_(8,"input",7),a(9,"button",8),G("click",function(){return p.onSubmit()}),a(10,"mat-icon"),l(11,"send"),s()()()()),n&2&&(r(2),d(2,p.isVoiceAssistantMode()?-1:2),r(),d(3,p.isVoiceAssistantMode()?3:-1),r(),u("formGroup",p.form),r(2),D(p.modeOptions),r(3),u("disabled",p.form.invalid))},dependencies:[de,J,ie,re,se,Q,ae,X,ee,ne,oe,pe,Y],styles:["[_nghost-%COMP%]     pre{max-width:100%;background:#fff;color:#666;page-break-inside:avoid;margin:20px 0;overflow-x:auto;padding:1em 1.5em;display:block;word-wrap:break-word;background:#ffffff1a;border-radius:16px;box-shadow:0 4px 30px #0000001a;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);border:1px solid rgba(255,255,255,.3)}[_nghost-%COMP%]     code{font-family:Red Hat Mono,monospace;font-weight:500}.kaizen[_ngcontent-%COMP%]{height:100%;line-height:1.5rem}.kaizen__messages[_ngcontent-%COMP%]{width:60%;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;gap:22px}@media screen and (max-width: 48em){.kaizen__messages[_ngcontent-%COMP%]{width:100%}}.kaizen__messages-wrapper[_ngcontent-%COMP%]{height:90%;display:flex;justify-content:center;padding:22px}.kaizen__request-author[_ngcontent-%COMP%]{padding:0 18px}.kaizen__request-box[_ngcontent-%COMP%]{margin-top:8px;padding:12px 18px;border-radius:12px;background:#f1f5f9;border:1px solid #e6eaee}.kaizen__response-header[_ngcontent-%COMP%]{display:flex;align-items:center;padding:0 18px;gap:8px}.kaizen__response-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:14px;height:14px;filter:invert(79%) sepia(90%) saturate(434%) hue-rotate(61deg) brightness(101%) contrast(98%)}.kaizen__response-author[_ngcontent-%COMP%]{width:fit-content;background:#11998e;background:-webkit-linear-gradient(90grad,#11998e,#29b15d);background:linear-gradient(90grad,#11998e,#29b15d);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.kaizen__response-box[_ngcontent-%COMP%]{margin-top:8px;padding:12px 18px;border-radius:12px;border:1px solid #e6eaee;background:#f1f5f9;background:linear-gradient(25deg,#f1f5f9 60%,#63f36833)}.kaizen__slogan[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:auto 0;gap:8px;text-align:center;line-height:32px}.kaizen__slogan-title[_ngcontent-%COMP%]{font-size:30px;font-weight:500;background:#11998e;background:-webkit-linear-gradient(90grad,#11998e,#38ef7d);background:linear-gradient(90grad,#11998e,#38ef7d);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.kaizen__slogan-subtitle[_ngcontent-%COMP%]{color:#7f95b0;font-size:18px}.kaizen__toolbar[_ngcontent-%COMP%]{height:10%;margin:auto 0;display:flex;align-items:center;justify-content:space-between;gap:12px}.kaizen__toolbar-modes[_ngcontent-%COMP%]{padding:14px;background:#f1f1f1;border-radius:8px;border:1px solid #e6eaee;border-right:14px solid transparent}.kaizen__toolbar-input[_ngcontent-%COMP%]{width:100%;padding:14px 18px;background:#f1f1f1;border-radius:8px;border:1px solid #e6eaee}.kaizen__toolbar-button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:16px;border-radius:8px;background:#068e44}.kaizen__toolbar-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px;color:#fff;transform:rotate(-45deg);margin-right:-4px;margin-top:-4px}"],changeDetection:0});let e=t;return e})();var Oe=[{path:"",component:ue,title:"Kaizen | Kaiteki"}],_e=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=x({type:t}),t.\u0275inj=b({imports:[O.forChild(Oe),O]});let e=t;return e})();var Ze=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=x({type:t}),t.\u0275inj=b({imports:[Z,le,_e]});let e=t;return e})();export{Ze as KaizenModule};
