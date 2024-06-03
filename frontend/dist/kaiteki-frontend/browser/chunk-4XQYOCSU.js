import{a as A,c as Se}from"./chunk-7WXLRD27.js";import{a as se}from"./chunk-7NOJP65O.js";import{a as x}from"./chunk-6HX3H25K.js";import{B as ce,D as le,Ia as L,O as de,S as z,U as pe,V as N,W as v,X as M,Y as S,_ as w,a as re,ba as y,ca as k,ja as me,ka as ue,m as ae,ma as fe,na as he,oa as ge,ob as Me,p as U,pa as _e,ra as be,u as K,ua as Ce,va as xe,wa as Ne,xa as ve}from"./chunk-XIB24JUK.js";import{Aa as R,Bb as ie,F as h,Fb as G,I as O,Ib as B,Jb as Q,Ka as te,Kb as r,Lb as a,Mb as f,N as F,Oc as D,Qb as H,Tb as g,Vb as b,_ as p,cc as l,dc as $,ea as Z,f as P,fa as T,fb as s,gb as c,ja as ee,k as X,nc as oe,o as _,pa as C,qa as V,qd as ne,xb as q,za as j,zb as m}from"./chunk-TYBYM3PM.js";import"./chunk-REV7FFDQ.js";import"./chunk-MON7YFGF.js";var we=(()=>{let i=class i{constructor(e,t){this.dialogRef=e,this.toastService=t,this.form=new M({title:new S("",[pe.required])})}onBackClick(){this.dialogRef.close()}onSubmitClick(){let{title:e}=this.form.getRawValue();if(!e){this.toastService.error("Missing title");return}let t={title:e};this.dialogRef.close(t)}};i.\u0275fac=function(t){return new(t||i)(c(ue),c(x))},i.\u0275cmp=C({type:i,selectors:[["app-create-note-dialog"]],decls:13,vars:2,consts:[["mat-dialog-title","",1,"create-note__title"],["mat-dialog-content",""],[1,"create-note__form",3,"formGroup"],["appearance","outline"],["matInput","","formControlName","title"],["align","end"],["mat-stroked-button","",3,"click"],["mat-flat-button","","color","primary","type","submit",3,"click","disabled"]],template:function(t,n){t&1&&(r(0,"h1",0),l(1,` Create a note
`),a(),r(2,"section",1)(3,"form",2)(4,"mat-form-field",3)(5,"mat-label"),l(6,"Title"),a(),f(7,"input",4),a()()(),r(8,"mat-dialog-actions",5)(9,"button",6),g("click",function(){return n.onBackClick()}),l(10," Back "),a(),r(11,"button",7),g("click",function(){return n.onSubmitClick()}),l(12," Create "),a()()),t&2&&(s(3),m("formGroup",n.form),s(8),m("disabled",n.form.invalid))},dependencies:[ce,xe,Ce,be,he,_e,ge,w,z,N,v,y,k],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}.create-note__title[_ngcontent-%COMP%]{font-size:20px;font-weight:500}.create-note__form[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:22px}"],changeDetection:0});let o=i;return o})();var E=(()=>{let i=class i{constructor(e){this.httpClient=e,this.baseURL=`${se.apiUrl}/api/v1/notes`}getNote(e){return this.httpClient.get(`${this.baseURL}/${e}`)}getNotes(e){return this.httpClient.get(`${this.baseURL}`,{params:de(e)})}deleteNote(e){return this.httpClient.delete(`${this.baseURL}/${e}`)}updateNote(e,t){return this.httpClient.put(`${this.baseURL}/${e}`,t)}createNote(e){return this.httpClient.post(`${this.baseURL}`,e)}};i.\u0275fac=function(t){return new(t||i)(ee(re))},i.\u0275prov=Z({token:i,factory:i.\u0275fac,providedIn:"root"});let o=i;return o})();var ye=(o,i)=>i.id,$e=o=>[o];function Te(o,i){if(o&1){let d=H();r(0,"button",9),g("click",function(){let t=j(d).$implicit,n=b();return R(n.onSelectNote(t))}),r(1,"p",10),l(2),a(),r(3,"button",11),g("click",function(t){let n=j(d).$implicit,u=b();return R(u.deleteNote(t,n.id))}),r(4,"mat-icon"),l(5,"delete"),a()()()}if(o&2){let d=i.$implicit,e=b();ie("sidebar__item-active",d.id===(e.selectedNote==null?null:e.selectedNote.id)),s(2),$(d.title)}}function Ve(o,i){if(o&1){let d=H();r(0,"div",8)(1,"p",10),l(2),a(),r(3,"button",12),g("click",function(t){let n=j(d).$implicit,u=b();return R(u.deleteNote(t,n.id))}),r(4,"mat-icon"),l(5,"delete"),a()()()}if(o&2){let d=i.$implicit;m("routerLink",oe(2,$e,d.id)),s(2),$(d.title)}}var ke=(()=>{let i=class i{constructor(e,t,n,u){this.dialog=e,this.noteService=t,this.toastrService=n,this.cd=u,this.selectedNoteId=new te,this.unsubscribe$=new P,this.selectedNote=null,this.notes=[],this.searchForm=new M({searchValue:new S("")})}ngOnInit(){this.getNotes(),this.searchForm.valueChanges.pipe(O(500),F(),p(this.unsubscribe$)).subscribe(()=>this.getNotes())}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}onSelectNote(e){e&&(this.selectedNote=e,this.selectedNoteId.emit(e.id))}onCreateNote(){this.dialog.open(we,{minWidth:"30%"}).afterClosed().pipe(p(this.unsubscribe$)).subscribe(t=>{t&&this.noteService.createNote(t).pipe(p(this.unsubscribe$),h(()=>(this.toastrService.error("Failed to create note"),X))).subscribe(()=>{this.toastrService.open("Successfully created note"),this.getNotes()})})}getNotes(){let t={searchValue:this.searchForm.getRawValue().searchValue??void 0};this.noteService.getNotes(t).pipe(h(n=>(this.toastrService.error("Failed to get notes"),_(()=>n))),p(this.unsubscribe$)).subscribe(n=>{this.notes=n,this.cd.markForCheck()})}deleteNote(e,t){e.stopPropagation(),this.noteService.deleteNote(t).pipe(h(n=>(this.toastrService.error("Failed to delete note"),_(()=>n))),p(this.unsubscribe$)).subscribe(()=>{this.toastrService.open("Successfully deleted a note"),this.getNotes()})}};i.\u0275fac=function(t){return new(t||i)(c(fe),c(E),c(x),c(D))},i.\u0275cmp=C({type:i,selectors:[["app-notes-sidebar"]],outputs:{selectedNoteId:"selectedNoteId"},decls:15,vars:1,consts:[[1,"sidebar"],[1,"create_note"],[3,"click"],[1,"sidebar__search",3,"formGroup"],["formControlName","searchValue","placeholder","Search","type","text",1,"sidebar__search-input"],[1,"sidebar__list","desktop"],[1,"sidebar__item",3,"sidebar__item-active"],[1,"sidebar__list","mobile"],[1,"sidebar__item",3,"routerLink"],[1,"sidebar__item",3,"click"],[1,"sidebar__item-title"],["matTooltip","Delete Note",1,"sidebar__item-delete",3,"click"],["matTooltip","Delete Note",1,"sidebar__item-delete","mobile",3,"click"]],template:function(t,n){t&1&&(r(0,"aside",0)(1,"div",1)(2,"h4"),l(3,"Recent Notes"),a(),r(4,"button",2),g("click",function(){return n.onCreateNote()}),r(5,"mat-icon"),l(6,"add"),a()()(),r(7,"form",3),f(8,"input",4),a(),r(9,"div",5),B(10,Te,6,3,"button",6,ye),a(),r(12,"div",7),B(13,Ve,6,4,"div",8,ye),a()()),t&2&&(s(7),m("formGroup",n.searchForm),s(3),Q(n.notes),s(3),Q(n.notes))},dependencies:[le,ve,w,z,N,v,y,k,U],styles:[".desktop[_ngcontent-%COMP%]{display:none}@media (min-width: 48em){.desktop[_ngcontent-%COMP%]{display:block}}.sidebar[_ngcontent-%COMP%]{width:290px;height:96%;overflow-y:auto;border-radius:8px;margin:16px;background:#fff;border:1px solid #e6eaee;color:#242424}@media (max-width: 48em){.sidebar[_ngcontent-%COMP%]{width:unset;padding:12px}}.sidebar[_ngcontent-%COMP%]   .sidebar__title[_ngcontent-%COMP%]{padding:0 22px;font-size:22px;font-weight:500}.sidebar__list[_ngcontent-%COMP%]{padding:18px 22px 22px;display:flex;flex-direction:column;gap:12px}@media (min-width: 48em){.sidebar__list[_ngcontent-%COMP%]{gap:8px}}@media (min-width: 48em){.sidebar__list.mobile[_ngcontent-%COMP%]{display:none}}.sidebar__list.desktop[_ngcontent-%COMP%]{display:none}@media (min-width: 48em){.sidebar__list.desktop[_ngcontent-%COMP%]{display:flex}}.sidebar__item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;gap:.8rem;padding:10px 12px;border-radius:8px;cursor:pointer}.sidebar__item[_ngcontent-%COMP%]:hover{background:#f0f4f8}.sidebar__item[_ngcontent-%COMP%]:hover   .sidebar__item-delete[_ngcontent-%COMP%]{display:flex}.sidebar__item-title[_ngcontent-%COMP%]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.sidebar__item-delete[_ngcontent-%COMP%]{display:none;align-items:center;justify-content:center;width:fit-content}.sidebar__item-delete.mobile[_ngcontent-%COMP%]{display:flex}.sidebar__item-delete[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px;color:#6e6e6e}.sidebar__item-active[_ngcontent-%COMP%]{background:#068e44;color:#f4f5f5}.sidebar__item-active[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#f4f5f5}.sidebar__item-active[_ngcontent-%COMP%]:hover{background:#068e44;color:#f4f5f5}.sidebar__search[_ngcontent-%COMP%]{padding:0 22px}@media (max-width: 48em){.sidebar__search[_ngcontent-%COMP%]{padding:12px 8px}}.sidebar__search-input[_ngcontent-%COMP%]{width:100%;padding:10px 16px;border:1px solid #e6eaee;border-radius:10px}.create_note[_ngcontent-%COMP%]{position:sticky;top:0;padding:22px 22px 26px;background:#fff;z-index:auto;display:flex;align-items:center;justify-content:space-between;gap:12px}@media screen and (max-width: 40em){.create_note[_ngcontent-%COMP%]{padding:14px 8px 10px}}.create_note[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:20px;font-weight:500}@media screen and (max-width: 40em){.create_note[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:16px}}.create_note[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:8px;background:#068e44;padding:4px;border-radius:9999px}.create_note[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;color:#f4f5f5}"],changeDetection:0});let o=i;return o})();function Ge(o,i){if(o&1&&(r(0,"h4"),l(1),a()),o&2){let d=b();s(),$(d.selectedNote.title)}}var Pe=(()=>{let i=class i{constructor(e,t,n,u){this.notesService=e,this.route=t,this.toastService=n,this.cd=u,this.unsubscribe$=new P,this.selectedNote=null,this.form=new M({content:new S("")}),this.quillConfig={history:!0,toolbar:{container:[[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{align:[]}],[{list:"ordered"},{list:"bullet"}],[{color:[]},{background:[]}],["link"],["clean"]]}}}ngOnInit(){this.getNote(),this.editorContent?.valueChanges.pipe(O(2e3),F(),p(this.unsubscribe$)).subscribe(e=>this.onNoteUpdate(e))}ngOnDestroy(){this.updateNote(),this.unsubscribe$.next(),this.unsubscribe$.complete()}getNote(){let e=this.getIdFromParams();e&&this.notesService.getNote(e).pipe(p(this.unsubscribe$),h(t=>(this.toastService.open("Failed to get note"),_(()=>t)))).subscribe(t=>{this.selectedNote=t,this.editorContent?.patchValue(t.content),this.cd.markForCheck()})}onNoteUpdate(e){this.selectedNote&&(e=e??"",this.notesService.updateNote(this.selectedNote.id,{content:e}).pipe(p(this.unsubscribe$),h(t=>(this.toastService.open("Failed to save note"),_(()=>t)))).subscribe())}updateNote(){let e=this.form.getRawValue();this.onNoteUpdate(e.content)}getIdFromParams(){let e=this.route.snapshot.paramMap.get("id");if(!e)return;let t=Number(e);if(!isNaN(t))return t}get editorContent(){return this.form.get("content")}};i.\u0275fac=function(t){return new(t||i)(c(E),c(ae),c(x),c(D))},i.\u0275cmp=C({type:i,selectors:[["app-note-edit"]],decls:9,vars:4,consts:[["value","Note Edit"],[1,"page","note"],[1,"note__header"],["routerLink","../",1,"note__back"],["icon","arrow_back",3,"size"],[1,"note__content"],[3,"formGroup"],["formControlName","content","theme","snow",1,"quill__editor",3,"modules"]],template:function(t,n){t&1&&(f(0,"app-page-header",0),r(1,"section",1)(2,"div",2)(3,"button",3),f(4,"app-icon",4),a(),q(5,Ge,2,1,"h4"),a(),r(6,"main",5)(7,"form",6),f(8,"quill-editor",7),a()()()),t&2&&(s(4),m("size",20),s(),G(5,n.selectedNote?5:-1),s(2),m("formGroup",n.form),s(),m("modules",n.quillConfig))},dependencies:[Ne,L,w,N,v,y,k,U,A],styles:["[_nghost-%COMP%]     .ql-toolbar.ql-snow{border-radius:6px 6px 0 0;background:#fff;padding:16px;border:1px solid #e6eaee}[_nghost-%COMP%]     .ql-editor{padding:16px}[_nghost-%COMP%]     .ql-container.ql-snow{background:#fff;border-radius:0 0 6px 6px;border:1px solid #e6eaee}.note[_ngcontent-%COMP%]{position:relative;z-index:5}.note__wrapper[_ngcontent-%COMP%]{padding:16px 8px}@media (min-width: 40em){.note__wrapper[_ngcontent-%COMP%]{padding:8px 22px}}.note__header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.note__header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:16px;font-weight:600}.note__content[_ngcontent-%COMP%]{margin-top:16px}.quill__editor[_ngcontent-%COMP%]{width:100%;height:calc(100vh - 210px)}"],changeDetection:0});let o=i;return o})();function Ue(o,i){if(o&1&&(r(0,"form",4),f(1,"quill-editor",5),a()),o&2){let d=b();m("formGroup",d.form),s(),m("modules",d.quillConfig)}}function ze(o,i){o&1&&(r(0,"div",6)(1,"p",7),l(2,"Select note"),a()())}var Oe=(()=>{let i=class i{constructor(e,t,n){this.notesService=e,this.toastService=t,this.cd=n,this.unsubscribe$=new P,this.selectedNote=null,this.quillConfig={history:!0,toolbar:{container:[[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{align:[]}],[{list:"ordered"},{list:"bullet"}],[{color:[]},{background:[]}],["link"],["clean"]]}},this.form=new M({content:new S("")})}ngOnInit(){this.editorContent?.valueChanges.pipe(O(1e3),F(),p(this.unsubscribe$)).subscribe(e=>this.onNoteUpdate(e))}ngOnDestroy(){this.updateNote(),this.unsubscribe$.next(),this.unsubscribe$.complete()}onSelectNote(e){this.selectedNote?.id!=e&&(this.updateNote(),this.notesService.getNote(e).pipe(h(t=>(this.toastService.open("Failed to get note"),_(()=>t))),p(this.unsubscribe$)).subscribe(t=>{this.selectedNote=t,this.editorContent?.patchValue(t.content),this.cd.markForCheck()}))}onNoteUpdate(e){this.selectedNote&&(e=e??"",this.notesService.updateNote(this.selectedNote.id,{content:e}).pipe(p(this.unsubscribe$),h(t=>(this.toastService.open("Failed to save note"),_(()=>t)))).subscribe())}updateNote(){let e=this.form.getRawValue();this.onNoteUpdate(e.content)}get editorContent(){return this.form.get("content")}};i.\u0275fac=function(t){return new(t||i)(c(E),c(x),c(D))},i.\u0275cmp=C({type:i,selectors:[["app-notes"]],decls:6,vars:1,consts:[["value","Notes"],[1,"notes-wrapper","desktop"],[3,"selectedNoteId"],[1,"notes__content"],[3,"formGroup"],["formControlName","content","theme","snow","placeholder","",1,"quill__editor",3,"modules"],[1,"empty-note__wrapper"],[1,"empty-note__label"]],template:function(t,n){t&1&&(f(0,"app-page-header",0),r(1,"div",1)(2,"app-notes-sidebar",2),g("selectedNoteId",function(De){return n.onSelectNote(De)}),a(),r(3,"main",3),q(4,Ue,2,2,"form",4)(5,ze,3,0),a()()),t&2&&(s(4),G(4,n.selectedNote?4:5))},dependencies:[L,w,N,v,y,k,A,ke],styles:["[_nghost-%COMP%]     .ql-toolbar.ql-snow{background:#fff;padding:22px;border-radius:8px;border:1px solid #e6eaee}[_nghost-%COMP%]     .ql-container.ql-snow{border:none;padding:12px 0 0}[_nghost-%COMP%]     .ql-editor{border:1px solid #e6eaee;background:#fff;padding:22px;border-radius:8px}.notes-wrapper[_ngcontent-%COMP%]{position:relative;display:flex;height:100%}@media (max-width: 48em){.notes-wrapper[_ngcontent-%COMP%]{padding-top:0;border-top:none;display:block}}.notes__content[_ngcontent-%COMP%]{flex:1;padding:16px}@media (max-width: 48em){.notes__content[_ngcontent-%COMP%]{display:none}}.empty-note__wrapper[_ngcontent-%COMP%]{height:100%;display:flex;align-items:center;justify-content:center}.empty-note__label[_ngcontent-%COMP%]{font-size:16px;color:#7a7a7a}.quill__editor[_ngcontent-%COMP%]{width:100%;height:calc(100vh - 180px)}"],changeDetection:0});let o=i;return o})();var Le=[{path:"",component:Oe,title:"Notes | Kaiteki"},{path:":id",component:Pe,title:"Note | Kaiteki"}],Fe=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=V({type:i}),i.\u0275inj=T({imports:[K.forChild(Le),K]});let o=i;return o})();var Dt=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=V({type:i}),i.\u0275inj=T({imports:[ne,Me,Fe,me,Se.forRoot()]});let o=i;return o})();export{Dt as NotesModule};