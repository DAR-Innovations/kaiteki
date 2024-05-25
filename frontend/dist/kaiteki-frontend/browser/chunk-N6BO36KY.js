import{a as V}from"./chunk-JUVH6QA6.js";import{a as T}from"./chunk-AJFLJPRD.js";import{$ as st,Ha as gt,Ja as B,T as lt,V as pt,W as ct,X as dt,Y as _t,Z as mt,ab as Ct,bb as ft,c as nt,ca as ut,cb as bt,da as ht,db as xt,eb as vt,fb as wt,gb as Mt,hb as St,ib as yt,jb as Pt,n as ot,nb as U,ob as Rt,p as at,pb as Ot,q as rt,v as L}from"./chunk-IDIRVXY3.js";import{Aa as R,F as w,Fb as h,Gb as J,Ib as G,Jb as k,K as I,Kb as n,Lb as o,Mb as g,Nb as f,Ob as b,Oc as Z,Qb as O,Tb as E,Vb as d,aa as W,cb as Q,cc as l,dc as D,dd as tt,ea as K,ec as m,fa as H,fb as p,fc as Y,gb as v,ja as A,ld as j,mc as y,md as et,n as q,o as x,oc as X,pa as F,qa as N,qd as it,vc as C,wc as M,xb as c,xc as $,za as P,zb as u}from"./chunk-TYBYM3PM.js";import"./chunk-REV7FFDQ.js";import"./chunk-MON7YFGF.js";var Ut=(t,e)=>e.id,Vt=(t,e)=>[t,e],zt=()=>({height:"145px",width:"100%","border-radius":"12px"});function At(t,e){if(t&1&&l(0),t&2){let i=d().$implicit;m(" ",i.description," ")}}function Lt(t,e){t&1&&l(0," Without description ")}function qt(t,e){if(t&1&&(n(0,"div",14)(1,"p",15),l(2),o(),n(3,"p",16),c(4,At,1,1)(5,Lt,1,0),o()()),t&2){let i=e.$implicit,a=d(4);u("routerLink",X(3,Vt,a.data.githubUsername,i.name)),p(2),D(i.name),p(2),h(4,i.description?4:5)}}function Wt(t,e){if(t&1&&G(0,qt,6,6,"div",14,Ut),t&2){let i=d();k(i.data)}}function Kt(t,e){t&1&&g(0,"ngx-skeleton-loader",17),t&2&&u("theme",y(1,zt))}function Qt(t,e){if(t&1&&G(0,Kt,1,2,"ngx-skeleton-loader",17,J),t&2){let i=d(4);k(i.reposSkeletons)}}function Jt(t,e){if(t&1&&c(0,Wt,2,0)(1,Qt,2,0),t&2){let i=e;h(0,i.data?0:-1),p(),h(1,i.loading?1:-1)}}function Yt(t,e){if(t&1&&(n(0,"div",11)(1,"p",12),l(2),o(),n(3,"div",13),c(4,Jt,2,2),C(5,"withLoading"),C(6,"async"),o()()),t&2){let i,a=d(),r=d();p(2),m(" Your repositories for ",a.data.githubUsername," "),p(2),h(4,(i=M(6,4,M(5,2,r.repos$)))?4:-1,i)}}function Xt(t,e){t&1&&(n(0,"p",18),l(1," Please specify and save the GitHub username to fetch your public repositoriess "),o())}function Zt(t,e){if(t&1){let i=O();n(0,"div",5)(1,"div",6)(2,"p",7),l(3,"GitHub username"),o(),n(4,"form",8),g(5,"input",9),n(6,"button",10),E("click",function(){P(i);let r=d();return R(r.saveUsername())}),l(7," Save "),o()()(),c(8,Yt,7,6,"div",11)(9,Xt,2,0),o()}if(t&2){let i=d();p(4),u("formGroup",i.formGroup),p(2),u("disabled",i.formGroup.invalid||i.formGroup.disabled),p(2),h(8,e.data?8:9)}}var Gt=(()=>{let e=class e{constructor(a,r,_){this.toastService=a,this.githubService=r,this.cd=_,this.formGroup=new _t({username:new mt(void 0,[pt.required])}),this.credentials$=this.githubService.getCredentials().pipe(W(s=>this.formGroup.patchValue({username:s.githubUsername})),w(s=>(this.toastService.error("Failed to get user credential"),x(()=>s)))),this.repos$=this.githubService.getRepos().pipe(w(s=>(this.toastService.error("Failed to get user repositories"),x(()=>s)))),this.reposSkeletons=new Array(10).fill("")}saveUsername(){let{username:a}=this.formGroup.getRawValue();a&&this.githubService.saveCredentials({githubUsername:a}).pipe(w(r=>(this.toastService.error("Failed to save the usernames"),x(()=>r))),I(1)).subscribe(()=>{this.toastService.open("Saved the username"),this.repos$=this.githubService.getRepos(),this.cd.markForCheck()})}};e.\u0275fac=function(r){return new(r||e)(v(T),v(V),v(Z))},e.\u0275cmp=F({type:e,selectors:[["app-github-dashboard"]],decls:12,vars:5,consts:[["value","GitHub Dashboard"],[1,"page","github"],[1,"github__content"],[1,"github__header"],[1,"github__separator"],[1,"github__main"],[1,"github__username-wrapper"],[1,"github__username-label"],[1,"github__username-content",3,"formGroup"],["type","text","placeholder","JohnSnow","formControlName","username",1,"github__username-input"],[1,"github__username-button",3,"click","disabled"],[1,"github__repos"],[1,"github__repos-label"],[1,"github__repos-list"],[1,"github__repos-item",3,"routerLink"],[1,"github__repos-item-name"],[1,"github__repos-item-description"],["count","1","appearance","line",3,"theme"],[1,"github__message"]],template:function(r,_){if(r&1&&(g(0,"app-page-header",0),n(1,"section",1)(2,"section",2)(3,"div",3)(4,"h2"),l(5,"GitHub integration"),o(),n(6,"p"),l(7," Our GitHub integration fetches detailed information about your public repositories using just your GitHub username, showcasing names, descriptions, languages, and activity. Perfect for developers and teams. "),o()(),g(8,"div",4),c(9,Zt,10,3,"div",5),C(10,"withLoading"),C(11,"async"),o()()),r&2){let s;p(9),h(9,(s=M(11,3,M(10,1,_.credentials$)))?9:-1,s)}},dependencies:[B,st,lt,ct,dt,ut,ht,rt,gt,j,U],styles:[".github[_ngcontent-%COMP%]{display:flex;justify-content:center}.github__content[_ngcontent-%COMP%]{max-width:100%;background:#fff;border-radius:12px;padding:34px;border:1px solid #ebeaea;display:flex;flex-direction:column;gap:30px}@media (max-width: 48em){.github__content[_ngcontent-%COMP%]{padding:22px;gap:20px}}.github__header[_ngcontent-%COMP%]{max-width:60%}.github__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:20px;font-weight:600}.github__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;color:#7c7f85;font-weight:500;margin-top:6px!important}.github__separator[_ngcontent-%COMP%]{width:100%;height:1px;background:#ebeaea}.github__username-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.github__username-label[_ngcontent-%COMP%]{font-weight:500;font-size:16px}.github__username-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.github__username-input[_ngcontent-%COMP%]{border:1px solid #e6eaee;padding:8px 12px;border-radius:6px}.github__username-button[_ngcontent-%COMP%]{padding:8px 12px;background:#068e44;color:#f4f5f5;border-radius:6px}.github__repos[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;margin-top:36px}.github__repos-label[_ngcontent-%COMP%]{font-size:16px;font-weight:500}.github__repos-list[_ngcontent-%COMP%]{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));grid-template-rows:none}.github__repos-item[_ngcontent-%COMP%]{cursor:pointer;border-radius:12px;padding:24px;border:1px solid #ebeaea}.github__repos-item[_ngcontent-%COMP%]:hover{background:#f5f5f5}.github__repos-item-name[_ngcontent-%COMP%]{font-weight:500;font-size:16px}.github__repos-item-description[_ngcontent-%COMP%]{margin-top:6px!important;color:#9c9c9c;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.github__message[_ngcontent-%COMP%]{color:#9c9c9c;text-align:center;margin-top:50px!important}"],changeDetection:0});let t=e;return t})();var S=function(t){return t.PUSH="push",t.FORCE_PUSH="force_push",t.BRANCH_CREATION="branch_creation",t.BRANCH_DELETION="branch_deletion",t.PR_MERGE="pr_merge",t.MR_QUEUE_MR="merge_queue_merge",t}(S||{});var te=(t,e)=>e.id,kt=()=>["title","createdDate","state","assignee"],Dt=()=>["title","createdDate","state","comments","assignee"];function ee(t,e){}function ie(t,e){if(t&1&&l(0),t&2){let i=d(2);m(" ",i.data.repository.description," ")}}function ne(t,e){t&1&&l(0," Without description ")}function oe(t,e){if(t&1&&(n(0,"div",11)(1,"p",24),l(2),n(3,"a",25),l(4),o()(),n(5,"p",26),l(6),C(7,"date"),o()()),t&2){let i=e.$implicit,a=e.$index,r=d(3);p(2),Y(" #",a+1," ",r.getTitleByActivity(i.activity_type)," made by "),p(),u("href",i.actor.html_url,Q),p(),D(i.actor.login),p(2),D($(7,5,i.timestamp,"medium"))}}function ae(t,e){t&1&&(n(0,"th",27),l(1," Title "),o())}function re(t,e){if(t&1&&(n(0,"td",28),l(1),o()),t&2){let i=e.$implicit;p(),m(" ",i.title," ")}}function le(t,e){t&1&&(n(0,"th",27),l(1," Created date "),o())}function pe(t,e){if(t&1&&(n(0,"td",28),l(1),C(2,"date"),o()),t&2){let i=e.$implicit;p(),m(" ",$(2,1,i.created_at,"medium")," ")}}function ce(t,e){t&1&&(n(0,"th",27),l(1," State "),o())}function de(t,e){if(t&1&&(n(0,"td",28),l(1),o()),t&2){let i=e.$implicit;p(),m(" ",i.state," ")}}function _e(t,e){t&1&&(n(0,"th",27),l(1," Assignee "),o())}function me(t,e){if(t&1&&(n(0,"td",28),l(1),o()),t&2){let i,a=e.$implicit;p(),m(" ",(i=a.assignee==null?null:a.assignee.login)!==null&&i!==void 0?i:"Unassigned"," ")}}function se(t,e){t&1&&g(0,"tr",29)}function ue(t,e){if(t&1){let i=O();n(0,"tr",30),E("click",function(){let r=P(i).$implicit,_=d(3);return R(_.navigateToUrl(r.html_url))}),o()}}function he(t,e){t&1&&(n(0,"th",27),l(1," Title "),o())}function ge(t,e){if(t&1&&(n(0,"td",28),l(1),o()),t&2){let i=e.$implicit;p(),m(" ",i.title," ")}}function Ce(t,e){t&1&&(n(0,"th",27),l(1," Created date "),o())}function fe(t,e){if(t&1&&(n(0,"td",28),l(1),C(2,"date"),o()),t&2){let i=e.$implicit;p(),m(" ",$(2,1,i.created_at,"medium")," ")}}function be(t,e){t&1&&(n(0,"th",27),l(1," State "),o())}function xe(t,e){if(t&1&&(n(0,"td",28),l(1),o()),t&2){let i=e.$implicit;p(),m(" ",i.state," ")}}function ve(t,e){t&1&&(n(0,"th",27),l(1," Comments "),o())}function we(t,e){if(t&1&&(n(0,"td",28),l(1),o()),t&2){let i=e.$implicit;p(),m(" ",i.comments," ")}}function Me(t,e){t&1&&(n(0,"th",27),l(1," Assignee "),o())}function Se(t,e){if(t&1&&(n(0,"td",28),l(1),o()),t&2){let i,a=e.$implicit;p(),m(" ",(i=a.assignee==null?null:a.assignee.login)!==null&&i!==void 0?i:"Unassigned"," ")}}function ye(t,e){t&1&&g(0,"tr",29)}function Pe(t,e){if(t&1){let i=O();n(0,"tr",30),E("click",function(){let r=P(i).$implicit,_=d(3);return R(_.navigateToUrl(r.html_url))}),o()}}function Re(t,e){if(t&1){let i=O();n(0,"div",3)(1,"div",4)(2,"app-button",5),E("click",function(){P(i);let r=d(2);return R(r.onNavigateBack())}),l(3," Back "),o()(),n(4,"h2"),l(5),o(),n(6,"p"),c(7,ie,1,1)(8,ne,1,0),o()(),g(9,"div",6),n(10,"div",7)(11,"div",8)(12,"p",9),l(13,"Recent activities"),o(),n(14,"div",10),G(15,oe,8,8,"div",11,te),o()(),n(17,"div",8)(18,"p",9),l(19,"Recent pull requests"),o(),n(20,"div",12)(21,"div",13)(22,"table",14),g(23,"caption"),f(24,15),c(25,ae,2,0,"th",16)(26,re,2,1,"td",17),b(),f(27,18),c(28,le,2,0,"th",16)(29,pe,3,4,"td",17),b(),f(30,19),c(31,ce,2,0,"th",16)(32,de,2,1,"td",17),b(),f(33,20),c(34,_e,2,0,"th",16)(35,me,2,1,"td",17),b(),c(36,se,1,0,"tr",21)(37,ue,1,0,"tr",22),o()()()(),n(38,"div",8)(39,"p",9),l(40,"Recent issues"),o(),n(41,"div",12)(42,"div",13)(43,"table",14),g(44,"caption"),f(45,15),c(46,he,2,0,"th",16)(47,ge,2,1,"td",17),b(),f(48,18),c(49,Ce,2,0,"th",16)(50,fe,3,4,"td",17),b(),f(51,19),c(52,be,2,0,"th",16)(53,xe,2,1,"td",17),b(),f(54,23),c(55,ve,2,0,"th",16)(56,we,2,1,"td",17),b(),f(57,20),c(58,Me,2,0,"th",16)(59,Se,2,1,"td",17),b(),c(60,ye,1,0,"tr",21)(61,Pe,1,0,"tr",22),o()()()()()}if(t&2){let i=d();p(5),m("Repository: ",i.data.repository.name,""),p(2),h(7,i.data.repository.description?7:8),p(8),k(i.data.activities),p(7),u("dataSource",i.data.pullRequests),p(14),u("matHeaderRowDef",y(8,kt)),p(),u("matRowDefColumns",y(9,kt)),p(6),u("dataSource",i.data.issues),p(17),u("matHeaderRowDef",y(10,Dt)),p(),u("matRowDefColumns",y(11,Dt))}}function Oe(t,e){if(t&1&&(c(0,ee,0,0),n(1,"section",1)(2,"section",2),c(3,Re,62,12),o()()),t&2){let i=e;h(0,i.data?0:-1),p(3),h(3,i.data?3:-1)}}var It=(()=>{let e=class e{constructor(a,r,_,s){this.githubService=a,this.route=r,this.toastService=_,this.location=s,this.repo$=this.getRepo()}getRepo(){let a=this.route.snapshot.paramMap.get("repoName");return a?this.githubService.getRepoDetails(a).pipe(I(1),w(r=>(this.toastService.open("Failed to get repository details"),x(()=>r)))):q(null)}navigateToUrl(a){window.open(a,"_blank")}getTitleByActivity(a){switch(a){case S.BRANCH_CREATION:return"Creating a new branch";case S.BRANCH_DELETION:return"Deleting an existing branch";case S.FORCE_PUSH:return"Force push to repository";case S.PUSH:return"Push to repository";case S.PR_MERGE:return"Pull request merged";case S.MR_QUEUE_MR:return"Merge queue creation"}}onNavigateBack(){this.location.back()}};e.\u0275fac=function(r){return new(r||e)(v(V),v(ot),v(T),v(tt))},e.\u0275cmp=F({type:e,selectors:[["app-github-repo"]],decls:4,vars:5,consts:[["value","GitHub Repository"],[1,"page","github"],[1,"github__content"],[1,"github__header"],[1,"github__back"],["icon","arrow_back_ios","variant","outline",1,"github__back-button",3,"click"],[1,"github__separator"],[1,"github__main"],[1,"github__section"],[1,"github__section-label"],[1,"github__section-content","github__activity-list"],[1,"github__activity"],[1,"github__section-content"],[1,"table_wrapper"],["mat-table","",3,"dataSource"],["matColumnDef","title"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","createdDate"],["matColumnDef","state"],["matColumnDef","assignee"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["matColumnDef","comments"],[1,"github__activity-label"],["target","_blank",1,"github__activity-link",3,"href"],[1,"github__activity-timestamp"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row","",3,"click"]],template:function(r,_){if(r&1&&(g(0,"app-page-header",0),c(1,Oe,4,2,"section",1),C(2,"withLoading"),C(3,"async")),r&2){let s;p(),h(1,(s=M(3,3,M(2,1,_.repo$)))?1:-1,s)}},dependencies:[Rt,B,Ct,bt,Mt,xt,ft,St,vt,wt,yt,Pt,j,et,U],styles:["[_nghost-%COMP%]     .mat-mdc-table{border:1px solid #e9e9e9;background:none}[_nghost-%COMP%]     .mat-mdc-row .mat-mdc-cell{border-bottom:1px solid transparent;border-top:1px solid transparent;cursor:pointer}[_nghost-%COMP%]     .mat-mdc-header-cell{font-size:12px;text-transform:uppercase;color:#afafaf}[_nghost-%COMP%]     .mdc-data-table__cell, [_nghost-%COMP%]     .mdc-data-table__header-cell{border-bottom:none}[_nghost-%COMP%]     .mat-mdc-row:hover .mat-mdc-cell{background:#f5f5f5}[_nghost-%COMP%]     .mat-mdc-table tbody, [_nghost-%COMP%]     .mat-mdc-table tfoot, [_nghost-%COMP%]     .mat-mdc-table thead, [_nghost-%COMP%]     .mat-mdc-cell, [_nghost-%COMP%]     .mat-mdc-footer-cell, [_nghost-%COMP%]     .mat-mdc-header-row, [_nghost-%COMP%]     .mat-mdc-row, [_nghost-%COMP%]     .mat-mdc-footer-row, [_nghost-%COMP%]     .mat-mdc-table .mat-mdc-header-cell{background:none}.table_wrapper[_ngcontent-%COMP%]{display:block;overflow-x:auto;white-space:nowrap}table[_ngcontent-%COMP%]{width:100%;border-radius:12px;background:#fff!important;padding:8px}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]{display:table;width:100%}.github[_ngcontent-%COMP%]{display:flex;justify-content:center}.github__content[_ngcontent-%COMP%]{max-width:100%;background:#fff;border-radius:12px;padding:26px;border:1px solid #ebeaea;display:flex;flex-direction:column;gap:30px}@media (max-width: 48em){.github__content[_ngcontent-%COMP%]{padding:22px;gap:20px}}.github__header[_ngcontent-%COMP%]{width:100%;max-width:60%}.github__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-top:24px!important;font-size:22px;font-weight:600}.github__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#898e99;margin-top:6px!important}.github__separator[_ngcontent-%COMP%]{width:100%;height:1px;background:#ebeaea}.github__main[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:40px}.github__section-label[_ngcontent-%COMP%]{font-size:16px;font-weight:500}.github__section-content[_ngcontent-%COMP%]{margin-top:16px}.github__activity[_ngcontent-%COMP%]{border-radius:12px;padding:14px;border:1px solid #ebeaea}.github__activity[_ngcontent-%COMP%]:hover{background:#f5f5f5}.github__activity-list[_ngcontent-%COMP%]{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));grid-template-rows:none}.github__activity-link[_ngcontent-%COMP%]{color:#44c96c}.github__activity-label[_ngcontent-%COMP%]{font-weight:500;font-size:14px}.github__activity-timestamp[_ngcontent-%COMP%]{margin-top:6px!important;color:#9c9c9c;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}"],changeDetection:0});let t=e;return t})();var Ee=[{path:"",component:Gt,title:"GitHub Dashboard | Kaiteki"},{path:":owner/:repoName",component:It,title:"GitHub Repository | Kaiteki"}],Ht=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=N({type:e}),e.\u0275inj=H({imports:[L.forChild(Ee),L]});let t=e;return t})();var Te=(()=>{let e=class e{constructor(a,r){this.toastService=a,this.router=r}intercept(a,r){return a.url.includes("github")?r.handle(a).pipe(w(_=>_?.status===401?(this.router.navigate(["/hub/integrations"]),this.toastService.error("GitHub integration is not connected"),x(()=>_)):(this.toastService.error("GitHub integration is not available"),x(()=>_)))):r.handle(a)}};e.\u0275fac=function(r){return new(r||e)(A(T),A(at))},e.\u0275prov=K({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),Ft=[{provide:nt,useClass:Te,multi:!0}];var ri=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=N({type:e}),e.\u0275inj=H({providers:[Ft],imports:[it,Ot,Ht]});let t=e;return t})();export{ri as GithubModule};
