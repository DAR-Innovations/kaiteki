import './polyfills.server.mjs';
import{H as he,J as ue}from"./chunk-UGHUVQZH.mjs";import{n as v}from"./chunk-IWV7G257.mjs";import{Bb as D,Da as ee,Fa as te,Hb as P,I as x,Ja as q,Ka as c,Mb as ne,Nb as oe,Ob as p,Pa as I,Rc as ae,V as K,Yb as re,Zb as w,a as $,cb as j,cd as H,da as N,db as ie,ea as W,fa as Z,ha as X,hb as k,ib as m,ja as F,ka as f,mc as le,md as de,nc as M,ob as O,p as J,pa as C,qa as Y,qb as S,r as Q,ra as _,u as V,ub as se,wd as T,x as U,ya as y,z as E,zb as R,zd as A}from"./chunk-JAB3SG4D.mjs";import{h as L}from"./chunk-FME56UVT.mjs";var z={toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"],["table"]]},B=new X("config",{providedIn:"root",factory:()=>({modules:z})});var fe=[[["","above-quill-editor-toolbar",""]],[["","quill-editor-toolbar",""]],[["","below-quill-editor-toolbar",""]]],me=["[above-quill-editor-toolbar]","[quill-editor-toolbar]","[below-quill-editor-toolbar]"];function ge(r,n){r&1&&p(0,"div",0)}function pe(r,n){r&1&&p(0,"div",0)}var b=(r,n)=>r||n||"html",G=(()=>{let n=class n{constructor(e,t){this.config=t,this.quill$=U(()=>L(this,null,function*(){if(!this.Quill){let i=this.document.addEventListener;this.document.addEventListener=this.document.__zone_symbol__addEventListener||this.document.addEventListener;let s=yield import("./chunk-LR7VQZKP.mjs");this.document.addEventListener=i,this.Quill=s.default?.default??s.default??s}return this.config.customOptions?.forEach(i=>{let s=this.Quill.import(i.import);s.whitelist=i.whitelist,this.Quill.register(s,!0,this.config.suppressGlobalRegisterWarning)}),yield this.registerCustomModules(this.Quill,this.config.customModules,this.config.suppressGlobalRegisterWarning)})).pipe(K({bufferSize:1,refCount:!0})),this.document=e.get(H),this.config||(this.config={modules:z})}getQuill(){return this.quill$}registerCustomModules(e,t,i){return L(this,null,function*(){if(Array.isArray(t))for(let{implementation:s,path:o}of t)J(s)&&(s=yield Q(s)),e.register(o,s,i);return e})}};n.\u0275fac=function(t){return new(t||n)(F(te),F(B,8))},n.\u0275prov=W({token:n,factory:n.\u0275fac,providedIn:"root"});let r=n;return r})(),ve=(()=>{let n=class n{constructor(){this.required=!1,this.customToolbarPosition="top",this.styles=null,this.customOptions=[],this.customModules=[],this.trimOnValidation=!1,this.compareValues=!1,this.filterNull=!1,this.defaultEmptyValue=null,this.onEditorCreated=new c,this.onEditorChanged=new c,this.onContentChanged=new c,this.onSelectionChanged=new c,this.onFocus=new c,this.onBlur=new c,this.onNativeFocus=new c,this.onNativeBlur=new c,this.disabled=!1,this.toolbarPosition="top",this.subscription=null,this.quillSubscription=null,this.elementRef=f(q),this.document=f(H),this.cd=f(ae),this.domSanitizer=f(v),this.platformId=f(I),this.renderer=f(O),this.zone=f(S),this.service=f(G),this.valueGetter=e=>{let t=e.getSemanticHTML();(t==="<p><br></p>"||t==="<div><br></div>")&&(t=this.defaultEmptyValue);let i=t,s=b(this.format,this.service.config.format);if(s==="text")i=e.getText();else if(s==="object")i=e.getContents();else if(s==="json")try{i=JSON.stringify(e.getContents())}catch{i=e.getText()}return i},this.valueSetter=(e,t)=>{let i=b(this.format,this.service.config.format);if(i==="html")return([!0,!1].includes(this.sanitize)?this.sanitize:this.service.config.sanitize||!1)&&(t=this.domSanitizer.sanitize(j.HTML,t)),e.clipboard.convert({html:t});if(i==="json")try{return JSON.parse(t)}catch{return[{insert:t}]}return t},this.selectionChangeHandler=(e,t,i)=>{let s=this.trackChanges||this.service.config.trackChanges,o=!e&&!!this.onModelTouched&&(i==="user"||s&&s==="all");!this.onBlur.observed&&!this.onFocus.observed&&!this.onSelectionChanged.observed&&!o||this.zone.run(()=>{e===null?this.onBlur.emit({editor:this.quillEditor,source:i}):t===null&&this.onFocus.emit({editor:this.quillEditor,source:i}),this.onSelectionChanged.emit({editor:this.quillEditor,oldRange:t,range:e,source:i}),o&&this.onModelTouched(),this.cd.markForCheck()})},this.textChangeHandler=(e,t,i)=>{let s=this.quillEditor.getText(),o=this.quillEditor.getContents(),l=this.quillEditor.getSemanticHTML();(l==="<p><br></p>"||l==="<div><br></div>")&&(l=this.defaultEmptyValue);let a=this.trackChanges||this.service.config.trackChanges,h=(i==="user"||a&&a==="all")&&!!this.onModelChange;!this.onContentChanged.observed&&!h||this.zone.run(()=>{h&&this.onModelChange(this.valueGetter(this.quillEditor)),this.onContentChanged.emit({content:o,delta:e,editor:this.quillEditor,html:l,oldDelta:t,source:i,text:s}),this.cd.markForCheck()})},this.editorChangeHandler=(e,t,i,s)=>{if(this.onEditorChanged.observed)if(e==="text-change"){let o=this.quillEditor.getText(),l=this.quillEditor.getContents(),a=this.quillEditor.getSemanticHTML();(a==="<p><br></p>"||a==="<div><br></div>")&&(a=this.defaultEmptyValue),this.zone.run(()=>{this.onEditorChanged.emit({content:l,delta:t,editor:this.quillEditor,event:e,html:a,oldDelta:i,source:s,text:o}),this.cd.markForCheck()})}else this.zone.run(()=>{this.onEditorChanged.emit({editor:this.quillEditor,event:e,oldRange:i,range:t,source:s}),this.cd.markForCheck()})}}static normalizeClassNames(e){return e.trim().split(" ").reduce((i,s)=>{let o=s.trim();return o&&i.push(o),i},[])}ngOnInit(){this.toolbarPosition=this.customToolbarPosition}ngAfterViewInit(){A(this.platformId)||(this.quillSubscription=this.service.getQuill().pipe(V(e=>{let t=[this.service.registerCustomModules(e,this.customModules)],i=this.beforeRender??this.service.config.beforeRender;return i&&t.push(i()),Promise.all(t).then(()=>e)})).subscribe(e=>{this.editorElem=this.elementRef.nativeElement.querySelector("[quill-editor-element]");let t=this.elementRef.nativeElement.querySelector("[quill-editor-toolbar]"),i=Object.assign({},this.modules||this.service.config.modules);t?i.toolbar=t:i.toolbar===void 0&&(i.toolbar=z.toolbar);let s=this.placeholder!==void 0?this.placeholder:this.service.config.placeholder;s===void 0&&(s="Insert text here ..."),this.styles&&Object.keys(this.styles).forEach(d=>{this.renderer.setStyle(this.editorElem,d,this.styles[d])}),this.classes&&this.addClasses(this.classes),this.customOptions.forEach(d=>{let u=e.import(d.import);u.whitelist=d.whitelist,e.register(u,!0)});let o=this.bounds&&this.bounds==="self"?this.editorElem:this.bounds;o||(o=this.service.config.bounds?this.service.config.bounds:this.document.body);let l=this.debug;!l&&l!==!1&&this.service.config.debug&&(l=this.service.config.debug);let a=this.readOnly;!a&&this.readOnly!==!1&&(a=this.service.config.readOnly!==void 0?this.service.config.readOnly:!1);let h=this.defaultEmptyValue;this.service.config.hasOwnProperty("defaultEmptyValue")&&(h=this.service.config.defaultEmptyValue);let g=this.formats;if(!g&&g===void 0&&(g=this.service.config.formats?[...this.service.config.formats]:this.service.config.formats===null?null:void 0),this.zone.runOutsideAngular(()=>{if(this.quillEditor=new e(this.editorElem,{bounds:o,debug:l,formats:g,modules:i,placeholder:s,readOnly:a,defaultEmptyValue:h,registry:this.registry,theme:this.theme||(this.service.config.theme?this.service.config.theme:"snow")}),this.onNativeBlur.observed&&(this.quillEditor.scroll.domNode.addEventListener("blur",()=>this.onNativeBlur.next({editor:this.quillEditor,source:"dom"})),this.quillEditor.getModule("toolbar").container?.addEventListener("mousedown",u=>u.preventDefault())),this.onNativeFocus.observed&&this.quillEditor.scroll.domNode.addEventListener("focus",()=>this.onNativeFocus.next({editor:this.quillEditor,source:"dom"})),this.linkPlaceholder){let u=this.quillEditor?.theme?.tooltip?.root?.querySelector("input[data-link]");u?.dataset&&(u.dataset.link=this.linkPlaceholder)}}),this.content){if(b(this.format,this.service.config.format)==="text")this.quillEditor.setText(this.content,"silent");else{let ce=this.valueSetter(this.quillEditor,this.content);this.quillEditor.setContents(ce,"silent")}this.quillEditor.getModule("history").clear()}this.setDisabledState(),this.addQuillEventListeners(),!(!this.onEditorCreated.observed&&!this.onValidatorChanged)&&requestAnimationFrame(()=>{this.onValidatorChanged&&this.onValidatorChanged(),this.onEditorCreated.emit(this.quillEditor),this.onEditorCreated.complete()})}))}ngOnDestroy(){this.dispose(),this.quillSubscription?.unsubscribe(),this.quillSubscription=null}ngOnChanges(e){if(this.quillEditor){if(e.readOnly&&this.quillEditor.enable(!e.readOnly.currentValue),e.placeholder&&(this.quillEditor.root.dataset.placeholder=e.placeholder.currentValue),e.defaultEmptyValue&&(this.quillEditor.root.dataset.defaultEmptyValue=e.defaultEmptyValue.currentValue),e.styles){let t=e.styles.currentValue,i=e.styles.previousValue;i&&Object.keys(i).forEach(s=>{this.renderer.removeStyle(this.editorElem,s)}),t&&Object.keys(t).forEach(s=>{this.renderer.setStyle(this.editorElem,s,this.styles[s])})}if(e.classes){let t=e.classes.currentValue,i=e.classes.previousValue;i&&this.removeClasses(i),t&&this.addClasses(t)}e.debounceTime&&this.addQuillEventListeners()}}addClasses(e){n.normalizeClassNames(e).forEach(t=>{this.renderer.addClass(this.editorElem,t)})}removeClasses(e){n.normalizeClassNames(e).forEach(t=>{this.renderer.removeClass(this.editorElem,t)})}writeValue(e){if(this.filterNull&&e===null||(this.content=e,!this.quillEditor))return;let t=b(this.format,this.service.config.format),i=this.valueSetter(this.quillEditor,e);if(this.compareValues){let s=this.quillEditor.getContents();if(JSON.stringify(s)===JSON.stringify(i))return}if(e){t==="text"?this.quillEditor.setText(e):this.quillEditor.setContents(i);return}this.quillEditor.setText("")}setDisabledState(e=this.disabled){this.disabled=e,this.quillEditor&&(e?(this.quillEditor.disable(),this.renderer.setAttribute(this.elementRef.nativeElement,"disabled","disabled")):(this.readOnly||this.quillEditor.enable(),this.renderer.removeAttribute(this.elementRef.nativeElement,"disabled")))}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}registerOnValidatorChange(e){this.onValidatorChanged=e}validate(){if(!this.quillEditor)return null;let e={},t=!0,i=this.quillEditor.getText(),s=this.trimOnValidation?i.trim().length:i.length===1&&i.trim().length===0?0:i.length-1,o=this.quillEditor.getContents().ops,l=!!o&&o.length===1&&[`
`,""].includes(o[0].insert?.toString());return this.minLength&&s&&s<this.minLength&&(e.minLengthError={given:s,minLength:this.minLength},t=!1),this.maxLength&&s>this.maxLength&&(e.maxLengthError={given:s,maxLength:this.maxLength},t=!1),this.required&&!s&&l&&(e.requiredError={empty:!0},t=!1),t?null:e}addQuillEventListeners(){this.dispose(),this.zone.runOutsideAngular(()=>{this.subscription=new $,this.subscription.add(E(this.quillEditor,"selection-change").subscribe(([i,s,o])=>{this.selectionChangeHandler(i,s,o)}));let e=E(this.quillEditor,"text-change"),t=E(this.quillEditor,"editor-change");typeof this.debounceTime=="number"&&(e=e.pipe(x(this.debounceTime)),t=t.pipe(x(this.debounceTime))),this.subscription.add(e.subscribe(([i,s,o])=>{this.textChangeHandler(i,s,o)})),this.subscription.add(t.subscribe(([i,s,o,l])=>{this.editorChangeHandler(i,s,o,l)}))})}dispose(){this.subscription!==null&&(this.subscription.unsubscribe(),this.subscription=null)}};n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=_({type:n,inputs:{format:"format",theme:"theme",modules:"modules",debug:"debug",readOnly:"readOnly",placeholder:"placeholder",maxLength:"maxLength",minLength:"minLength",required:"required",formats:"formats",customToolbarPosition:"customToolbarPosition",sanitize:"sanitize",beforeRender:"beforeRender",styles:"styles",registry:"registry",bounds:"bounds",customOptions:"customOptions",customModules:"customModules",trackChanges:"trackChanges",classes:"classes",trimOnValidation:"trimOnValidation",linkPlaceholder:"linkPlaceholder",compareValues:"compareValues",filterNull:"filterNull",debounceTime:"debounceTime",defaultEmptyValue:"defaultEmptyValue",valueGetter:"valueGetter",valueSetter:"valueSetter"},outputs:{onEditorCreated:"onEditorCreated",onEditorChanged:"onEditorChanged",onContentChanged:"onContentChanged",onSelectionChanged:"onSelectionChanged",onFocus:"onFocus",onBlur:"onBlur",onNativeFocus:"onNativeFocus",onNativeBlur:"onNativeBlur"},features:[y]});let r=n;return r})(),be=(()=>{let n=class n extends ve{};n.\u0275fac=(()=>{let e;return function(i){return(e||(e=ee(n)))(i||n)}})(),n.\u0275cmp=C({type:n,selectors:[["quill-editor"]],standalone:!0,features:[le([{multi:!0,provide:he,useExisting:N(()=>n)},{multi:!0,provide:ue,useExisting:N(()=>n)}]),se,M],ngContentSelectors:me,decls:5,vars:2,consts:[["quill-editor-element",""]],template:function(t,i){t&1&&(re(fe),R(0,ge,1,0,"div",0),w(1),w(2,1),w(3,2),R(4,pe,1,0,"div",0)),t&2&&(P(0,i.toolbarPosition!=="top"?0:-1),k(4),P(4,i.toolbarPosition==="top"?4:-1))},dependencies:[T],styles:["[_nghost-%COMP%]{display:inline-block}"]});let r=n;return r})(),Ee=(()=>{let n=class n{constructor(e,t){this.sanitizer=e,this.service=t,this.content="",this.innerHTML="",this.themeClass="ql-snow"}ngOnChanges(e){if(e.theme){let t=e.theme.currentValue||(this.service.config.theme?this.service.config.theme:"snow");this.themeClass=`ql-${t} ngx-quill-view-html`}else if(!this.theme){let t=this.service.config.theme?this.service.config.theme:"snow";this.themeClass=`ql-${t} ngx-quill-view-html`}if(e.content){let t=e.content.currentValue,i=[!0,!1].includes(this.sanitize)?this.sanitize:this.service.config.sanitize||!1;this.innerHTML=i?t:this.sanitizer.bypassSecurityTrustHtml(t)}}};n.\u0275fac=function(t){return new(t||n)(m(v),m(G))},n.\u0275cmp=C({type:n,selectors:[["quill-view-html"]],inputs:{content:"content",theme:"theme",sanitize:"sanitize"},standalone:!0,features:[y,M],decls:2,vars:2,consts:[[1,"ql-container",3,"ngClass"],[1,"ql-editor",3,"innerHTML"]],template:function(t,i){t&1&&(ne(0,"div",0),p(1,"div",1),oe()),t&2&&(D("ngClass",i.themeClass),k(),D("innerHTML",i.innerHTML,ie))},dependencies:[T,de],styles:[`.ql-container.ngx-quill-view-html{border:0}
`],encapsulation:2});let r=n;return r})(),Ce=(()=>{let n=class n{constructor(e,t,i,s,o,l){this.elementRef=e,this.renderer=t,this.zone=i,this.service=s,this.domSanitizer=o,this.platformId=l,this.strict=!0,this.customModules=[],this.customOptions=[],this.onEditorCreated=new c,this.quillSubscription=null,this.valueSetter=(a,h)=>{let g=b(this.format,this.service.config.format),d=h;if(g==="text")a.setText(d);else{if(g==="html")([!0,!1].includes(this.sanitize)?this.sanitize:this.service.config.sanitize||!1)&&(h=this.domSanitizer.sanitize(j.HTML,h)),d=a.clipboard.convert({html:h});else if(g==="json")try{d=JSON.parse(h)}catch{d=[{insert:h}]}a.setContents(d)}}}ngOnChanges(e){this.quillEditor&&e.content&&this.valueSetter(this.quillEditor,e.content.currentValue)}ngAfterViewInit(){A(this.platformId)||(this.quillSubscription=this.service.getQuill().pipe(V(e=>{let t=[this.service.registerCustomModules(e,this.customModules)],i=this.beforeRender??this.service.config.beforeRender;return i&&t.push(i()),Promise.all(t).then(()=>e)})).subscribe(e=>{let t=Object.assign({},this.modules||this.service.config.modules);t.toolbar=!1,this.customOptions.forEach(l=>{let a=e.import(l.import);a.whitelist=l.whitelist,e.register(a,!0)});let i=this.debug;!i&&i!==!1&&this.service.config.debug&&(i=this.service.config.debug);let s=this.formats;!s&&s===void 0&&(s=this.service.config.formats?Object.assign({},this.service.config.formats):this.service.config.formats===null?null:void 0);let o=this.theme||(this.service.config.theme?this.service.config.theme:"snow");this.editorElem=this.elementRef.nativeElement.querySelector("[quill-view-element]"),this.zone.runOutsideAngular(()=>{this.quillEditor=new e(this.editorElem,{debug:i,formats:s,modules:t,readOnly:!0,strict:this.strict,theme:o})}),this.renderer.addClass(this.editorElem,"ngx-quill-view"),this.content&&this.valueSetter(this.quillEditor,this.content),this.onEditorCreated.observers.length&&requestAnimationFrame(()=>{this.onEditorCreated.emit(this.quillEditor),this.onEditorCreated.complete()})}))}ngOnDestroy(){this.quillSubscription?.unsubscribe(),this.quillSubscription=null}};n.\u0275fac=function(t){return new(t||n)(m(q),m(O),m(S),m(G),m(v),m(I))},n.\u0275cmp=C({type:n,selectors:[["quill-view"]],inputs:{format:"format",theme:"theme",modules:"modules",debug:"debug",formats:"formats",sanitize:"sanitize",beforeRender:"beforeRender",strict:"strict",content:"content",customModules:"customModules",customOptions:"customOptions"},outputs:{onEditorCreated:"onEditorCreated"},standalone:!0,features:[y,M],decls:1,vars:0,consts:[["quill-view-element",""]],template:function(t,i){t&1&&p(0,"div",0)},dependencies:[T],styles:[`.ql-container.ngx-quill-view{border:0}
`],encapsulation:2});let r=n;return r})(),Je=(()=>{let n=class n{static forRoot(e){return{ngModule:n,providers:[{provide:B,useValue:e}]}}};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=Y({type:n}),n.\u0275inj=Z({imports:[be,Ce,Ee]});let r=n;return r})();export{be as a,Ce as b,Je as c};
