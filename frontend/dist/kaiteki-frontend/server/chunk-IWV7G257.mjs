import './polyfills.server.mjs';
import{$a as nt,$c as ae,Cd as le,D as Xe,Dc as at,Ec as oe,Fc as ie,G as Je,Ga as we,Gc as Re,Jc as ct,Kc as be,Lc as lt,Na as re,O as ve,Pa as j,Ra as Ee,Sa as se,Uc as dt,Va as F,Vc as ut,Wa as U,Xa as Qe,Y as Ge,Ya as He,Za as et,_a as tt,aa as qe,ab as rt,ad as ht,ba as D,bb as st,bd as ft,c as ge,ca as P,cb as L,cd as R,ea as g,fa as ee,gb as K,ha as E,ja as h,ka as w,ld as ce,m as Ke,n as H,na as $,nb as ot,pb as it,qa as te,qb as A,s as V,ta as ne,ua as We,va as Ze,wa as Ye,wd as pt,yb as Te,zd as Me}from"./chunk-JAB3SG4D.mjs";import{a as z,b as Ve,d as $e,h as me}from"./chunk-FME56UVT.mjs";var J=class{},G=class{},M=class t{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(s=>{let n=s.indexOf(":");if(n>0){let r=s.slice(0,n),o=r.toLowerCase(),a=s.slice(n+1).trim();this.maybeSetNormalizedName(r,o),this.headers.has(o)?this.headers.get(o).push(a):this.headers.set(o,[a])}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((s,n)=>{this.setHeaderEntries(n,s)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([s,n])=>{this.setHeaderEntries(s,n)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let s=this.headers.get(e.toLowerCase());return s&&s.length>0?s[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,s){return this.clone({name:e,value:s,op:"a"})}set(e,s){return this.clone({name:e,value:s,op:"s"})}delete(e,s){return this.clone({name:e,value:s,op:"d"})}maybeSetNormalizedName(e,s){this.normalizedNames.has(s)||this.normalizedNames.set(s,e)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(s=>{this.headers.set(s,e.headers.get(s)),this.normalizedNames.set(s,e.normalizedNames.get(s))})}clone(e){let s=new t;return s.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,s.lazyUpdate=(this.lazyUpdate||[]).concat([e]),s}applyUpdate(e){let s=e.name.toLowerCase();switch(e.op){case"a":case"s":let n=e.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(e.name,s);let r=(e.op==="a"?this.headers.get(s):void 0)||[];r.push(...n),this.headers.set(s,r);break;case"d":let o=e.value;if(!o)this.headers.delete(s),this.normalizedNames.delete(s);else{let a=this.headers.get(s);if(!a)return;a=a.filter(i=>o.indexOf(i)===-1),a.length===0?(this.headers.delete(s),this.normalizedNames.delete(s)):this.headers.set(s,a)}break}}setHeaderEntries(e,s){let n=(Array.isArray(s)?s:[s]).map(o=>o.toString()),r=e.toLowerCase();this.headers.set(r,n),this.maybeSetNormalizedName(e,r)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(s=>e(this.normalizedNames.get(s),this.headers.get(s)))}};var Pe=class{encodeKey(e){return yt(e)}encodeValue(e){return yt(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function Gt(t,e){let s=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[a,i]=o==-1?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,o)),e.decodeValue(r.slice(o+1))],l=s.get(a)||[];l.push(i),s.set(a,l)}),s}var qt=/%(\d[a-f0-9])/gi,Wt={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function yt(t){return encodeURIComponent(t).replace(qt,(e,s)=>Wt[s]??e)}function de(t){return`${t}`}var O=class t{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new Pe,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=Gt(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(s=>{let n=e.fromObject[s],r=Array.isArray(n)?n.map(de):[de(n)];this.map.set(s,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let s=this.map.get(e);return s?s[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,s){return this.clone({param:e,value:s,op:"a"})}appendAll(e){let s=[];return Object.keys(e).forEach(n=>{let r=e[n];Array.isArray(r)?r.forEach(o=>{s.push({param:n,value:o,op:"a"})}):s.push({param:n,value:r,op:"a"})}),this.clone(s)}set(e,s){return this.clone({param:e,value:s,op:"s"})}delete(e,s){return this.clone({param:e,value:s,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let s=this.encoder.encodeKey(e);return this.map.get(e).map(n=>s+"="+this.encoder.encodeValue(n)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let s=new t({encoder:this.encoder});return s.cloneFrom=this.cloneFrom||this,s.updates=(this.updates||[]).concat(e),s}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let s=(e.op==="a"?this.map.get(e.param):void 0)||[];s.push(de(e.value)),this.map.set(e.param,s);break;case"d":if(e.value!==void 0){let n=this.map.get(e.param)||[],r=n.indexOf(de(e.value));r!==-1&&n.splice(r,1),n.length>0?this.map.set(e.param,n):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var Ne=class{constructor(){this.map=new Map}set(e,s){return this.map.set(e,s),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function Zt(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function mt(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function gt(t){return typeof Blob<"u"&&t instanceof Blob}function vt(t){return typeof FormData<"u"&&t instanceof FormData}function Yt(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var X=class t{constructor(e,s,n,r){this.url=s,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase();let o;if(Zt(this.method)||r?(this.body=n!==void 0?n:null,o=r):o=n,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new M,this.context??=new Ne,!this.params)this.params=new O,this.urlWithParams=s;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=s;else{let i=s.indexOf("?"),l=i===-1?"?":i<s.length-1?"&":"";this.urlWithParams=s+l+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||mt(this.body)||gt(this.body)||vt(this.body)||Yt(this.body)?this.body:this.body instanceof O?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||vt(this.body)?null:gt(this.body)?this.body.type||null:mt(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof O?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(e={}){let s=e.method||this.method,n=e.url||this.url,r=e.responseType||this.responseType,o=e.transferCache??this.transferCache,a=e.body!==void 0?e.body:this.body,i=e.withCredentials??this.withCredentials,l=e.reportProgress??this.reportProgress,c=e.headers||this.headers,u=e.params||this.params,d=e.context??this.context;return e.setHeaders!==void 0&&(c=Object.keys(e.setHeaders).reduce((y,T)=>y.set(T,e.setHeaders[T]),c)),e.setParams&&(u=Object.keys(e.setParams).reduce((y,T)=>y.set(T,e.setParams[T]),u)),new t(s,n,a,{params:u,headers:c,context:d,reportProgress:l,responseType:r,withCredentials:i,transferCache:o})}},I=function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t}(I||{}),q=class{constructor(e,s=W.Ok,n="OK"){this.headers=e.headers||new M,this.status=e.status!==void 0?e.status:s,this.statusText=e.statusText||n,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}},he=class t extends q{constructor(e={}){super(e),this.type=I.ResponseHeader}clone(e={}){return new t({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},x=class t extends q{constructor(e={}){super(e),this.type=I.Response,this.body=e.body!==void 0?e.body:null}clone(e={}){return new t({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},N=class extends q{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},W=function(t){return t[t.Continue=100]="Continue",t[t.SwitchingProtocols=101]="SwitchingProtocols",t[t.Processing=102]="Processing",t[t.EarlyHints=103]="EarlyHints",t[t.Ok=200]="Ok",t[t.Created=201]="Created",t[t.Accepted=202]="Accepted",t[t.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",t[t.NoContent=204]="NoContent",t[t.ResetContent=205]="ResetContent",t[t.PartialContent=206]="PartialContent",t[t.MultiStatus=207]="MultiStatus",t[t.AlreadyReported=208]="AlreadyReported",t[t.ImUsed=226]="ImUsed",t[t.MultipleChoices=300]="MultipleChoices",t[t.MovedPermanently=301]="MovedPermanently",t[t.Found=302]="Found",t[t.SeeOther=303]="SeeOther",t[t.NotModified=304]="NotModified",t[t.UseProxy=305]="UseProxy",t[t.Unused=306]="Unused",t[t.TemporaryRedirect=307]="TemporaryRedirect",t[t.PermanentRedirect=308]="PermanentRedirect",t[t.BadRequest=400]="BadRequest",t[t.Unauthorized=401]="Unauthorized",t[t.PaymentRequired=402]="PaymentRequired",t[t.Forbidden=403]="Forbidden",t[t.NotFound=404]="NotFound",t[t.MethodNotAllowed=405]="MethodNotAllowed",t[t.NotAcceptable=406]="NotAcceptable",t[t.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",t[t.RequestTimeout=408]="RequestTimeout",t[t.Conflict=409]="Conflict",t[t.Gone=410]="Gone",t[t.LengthRequired=411]="LengthRequired",t[t.PreconditionFailed=412]="PreconditionFailed",t[t.PayloadTooLarge=413]="PayloadTooLarge",t[t.UriTooLong=414]="UriTooLong",t[t.UnsupportedMediaType=415]="UnsupportedMediaType",t[t.RangeNotSatisfiable=416]="RangeNotSatisfiable",t[t.ExpectationFailed=417]="ExpectationFailed",t[t.ImATeapot=418]="ImATeapot",t[t.MisdirectedRequest=421]="MisdirectedRequest",t[t.UnprocessableEntity=422]="UnprocessableEntity",t[t.Locked=423]="Locked",t[t.FailedDependency=424]="FailedDependency",t[t.TooEarly=425]="TooEarly",t[t.UpgradeRequired=426]="UpgradeRequired",t[t.PreconditionRequired=428]="PreconditionRequired",t[t.TooManyRequests=429]="TooManyRequests",t[t.RequestHeaderFieldsTooLarge=431]="RequestHeaderFieldsTooLarge",t[t.UnavailableForLegalReasons=451]="UnavailableForLegalReasons",t[t.InternalServerError=500]="InternalServerError",t[t.NotImplemented=501]="NotImplemented",t[t.BadGateway=502]="BadGateway",t[t.ServiceUnavailable=503]="ServiceUnavailable",t[t.GatewayTimeout=504]="GatewayTimeout",t[t.HttpVersionNotSupported=505]="HttpVersionNotSupported",t[t.VariantAlsoNegotiates=506]="VariantAlsoNegotiates",t[t.InsufficientStorage=507]="InsufficientStorage",t[t.LoopDetected=508]="LoopDetected",t[t.NotExtended=510]="NotExtended",t[t.NetworkAuthenticationRequired=511]="NetworkAuthenticationRequired",t}(W||{});function De(t,e){return{body:e,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,transferCache:t.transferCache}}var Qt=(()=>{let e=class e{constructor(n){this.handler=n}request(n,r,o={}){let a;if(n instanceof X)a=n;else{let c;o.headers instanceof M?c=o.headers:c=new M(o.headers);let u;o.params&&(o.params instanceof O?u=o.params:u=new O({fromObject:o.params})),a=new X(n,r,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:u,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let i=H(a).pipe(Je(c=>this.handler.handle(c)));if(n instanceof X||o.observe==="events")return i;let l=i.pipe(Xe(c=>c instanceof x));switch(o.observe||"body"){case"body":switch(a.responseType){case"arraybuffer":return l.pipe(V(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return l.pipe(V(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return l.pipe(V(c=>{if(c.body!==null&&typeof c.body!="string")throw new Error("Response is not a string.");return c.body}));case"json":default:return l.pipe(V(c=>c.body))}case"response":return l;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(n,r={}){return this.request("DELETE",n,r)}get(n,r={}){return this.request("GET",n,r)}head(n,r={}){return this.request("HEAD",n,r)}jsonp(n,r){return this.request("JSONP",n,{params:new O().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(n,r={}){return this.request("OPTIONS",n,r)}patch(n,r,o={}){return this.request("PATCH",n,De(o,r))}post(n,r,o={}){return this.request("POST",n,De(o,r))}put(n,r,o={}){return this.request("PUT",n,De(o,r))}};e.\u0275fac=function(r){return new(r||e)(h(J))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),Ht=/^\)\]\}',?\n/,en="X-Request-URL";function wt(t){if(t.url)return t.url;let e=en.toLocaleLowerCase();return t.headers.get(e)}var Ae=(()=>{let e=class e{constructor(){this.fetchImpl=w(Oe,{optional:!0})?.fetch??fetch.bind(globalThis),this.ngZone=w(A)}handle(n){return new ge(r=>{let o=new AbortController;return this.doRequest(n,o.signal,r).then(Ie,a=>r.error(new N({error:a}))),()=>o.abort()})}doRequest(n,r,o){return me(this,null,function*(){let a=this.createRequestInit(n),i;try{let v=this.fetchImpl(n.urlWithParams,z({signal:r},a));tn(v),o.next({type:I.Sent}),i=yield v}catch(v){o.error(new N({error:v,status:v.status??0,statusText:v.statusText,url:n.urlWithParams,headers:v.headers}));return}let l=new M(i.headers),c=i.statusText,u=wt(i)??n.urlWithParams,d=i.status,y=null;if(n.reportProgress&&o.next(new he({headers:l,status:d,statusText:c,url:u})),i.body){let v=i.headers.get("content-length"),S=[],p=i.body.getReader(),f=0,b,C,m=typeof Zone<"u"&&Zone.current;yield this.ngZone.runOutsideAngular(()=>me(this,null,function*(){for(;;){let{done:k,value:B}=yield p.read();if(k)break;if(S.push(B),f+=B.length,n.reportProgress){C=n.responseType==="text"?(C??"")+(b??=new TextDecoder).decode(B,{stream:!0}):void 0;let ze=()=>o.next({type:I.DownloadProgress,total:v?+v:void 0,loaded:f,partialText:C});m?m.run(ze):ze()}}}));let _=this.concatChunks(S,f);try{let k=i.headers.get("Content-Type")??"";y=this.parseBody(n,_,k)}catch(k){o.error(new N({error:k,headers:new M(i.headers),status:i.status,statusText:i.statusText,url:wt(i)??n.urlWithParams}));return}}d===0&&(d=y?W.Ok:0),d>=200&&d<300?(o.next(new x({body:y,headers:l,status:d,statusText:c,url:u})),o.complete()):o.error(new N({error:y,headers:l,status:d,statusText:c,url:u}))})}parseBody(n,r,o){switch(n.responseType){case"json":let a=new TextDecoder().decode(r).replace(Ht,"");return a===""?null:JSON.parse(a);case"text":return new TextDecoder().decode(r);case"blob":return new Blob([r],{type:o});case"arraybuffer":return r.buffer}}createRequestInit(n){let r={},o=n.withCredentials?"include":void 0;if(n.headers.forEach((a,i)=>r[a]=i.join(",")),r.Accept??="application/json, text/plain, */*",!r["Content-Type"]){let a=n.detectContentTypeHeader();a!==null&&(r["Content-Type"]=a)}return{body:n.serializeBody(),method:n.method,headers:r,credentials:o}}concatChunks(n,r){let o=new Uint8Array(r),a=0;for(let i of n)o.set(i,a),a+=i.length;return o}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),Oe=class{};function Ie(){}function tn(t){t.then(Ie,Ie)}function It(t,e){return e(t)}function nn(t,e){return(s,n)=>e.intercept(s,{handle:r=>t(r,n)})}function rn(t,e,s){return(n,r)=>Ye(s,()=>e(n,o=>t(o,r)))}var sn=new E(""),Se=new E(""),St=new E(""),kt=new E("");function on(){let t=null;return(e,s)=>{t===null&&(t=(w(sn,{optional:!0})??[]).reduceRight(nn,It));let n=w(Te),r=n.add();return t(e,s).pipe(ve(()=>n.remove(r)))}}var Et=(()=>{let e=class e extends J{constructor(n,r){super(),this.backend=n,this.injector=r,this.chain=null,this.pendingTasks=w(Te);let o=w(kt,{optional:!0});this.backend=o??n}handle(n){if(this.chain===null){let o=Array.from(new Set([...this.injector.get(Se),...this.injector.get(St,[])]));this.chain=o.reduceRight((a,i)=>rn(a,i,this.injector),It)}let r=this.pendingTasks.add();return this.chain(n,o=>this.backend.handle(o)).pipe(ve(()=>this.pendingTasks.remove(r)))}};e.\u0275fac=function(r){return new(r||e)(h(G),h(Ze))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})();var an=/^\)\]\}',?\n/;function cn(t){return"responseURL"in t&&t.responseURL?t.responseURL:/^X-Request-URL:/m.test(t.getAllResponseHeaders())?t.getResponseHeader("X-Request-URL"):null}var Tt=(()=>{let e=class e{constructor(n){this.xhrFactory=n}handle(n){if(n.method==="JSONP")throw new D(-2800,!1);let r=this.xhrFactory;return(r.\u0275loadImpl?Ke(r.\u0275loadImpl()):H(null)).pipe(Ge(()=>new ge(a=>{let i=r.build();if(i.open(n.method,n.urlWithParams),n.withCredentials&&(i.withCredentials=!0),n.headers.forEach((p,f)=>i.setRequestHeader(p,f.join(","))),n.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!n.headers.has("Content-Type")){let p=n.detectContentTypeHeader();p!==null&&i.setRequestHeader("Content-Type",p)}if(n.responseType){let p=n.responseType.toLowerCase();i.responseType=p!=="json"?p:"text"}let l=n.serializeBody(),c=null,u=()=>{if(c!==null)return c;let p=i.statusText||"OK",f=new M(i.getAllResponseHeaders()),b=cn(i)||n.url;return c=new he({headers:f,status:i.status,statusText:p,url:b}),c},d=()=>{let{headers:p,status:f,statusText:b,url:C}=u(),m=null;f!==W.NoContent&&(m=typeof i.response>"u"?i.responseText:i.response),f===0&&(f=m?W.Ok:0);let _=f>=200&&f<300;if(n.responseType==="json"&&typeof m=="string"){let k=m;m=m.replace(an,"");try{m=m!==""?JSON.parse(m):null}catch(B){m=k,_&&(_=!1,m={error:B,text:m})}}_?(a.next(new x({body:m,headers:p,status:f,statusText:b,url:C||void 0})),a.complete()):a.error(new N({error:m,headers:p,status:f,statusText:b,url:C||void 0}))},y=p=>{let{url:f}=u(),b=new N({error:p,status:i.status||0,statusText:i.statusText||"Unknown Error",url:f||void 0});a.error(b)},T=!1,v=p=>{T||(a.next(u()),T=!0);let f={type:I.DownloadProgress,loaded:p.loaded};p.lengthComputable&&(f.total=p.total),n.responseType==="text"&&i.responseText&&(f.partialText=i.responseText),a.next(f)},S=p=>{let f={type:I.UploadProgress,loaded:p.loaded};p.lengthComputable&&(f.total=p.total),a.next(f)};return i.addEventListener("load",d),i.addEventListener("error",y),i.addEventListener("timeout",y),i.addEventListener("abort",y),n.reportProgress&&(i.addEventListener("progress",v),l!==null&&i.upload&&i.upload.addEventListener("progress",S)),i.send(l),a.next({type:I.Sent}),()=>{i.removeEventListener("error",y),i.removeEventListener("abort",y),i.removeEventListener("load",d),i.removeEventListener("timeout",y),n.reportProgress&&(i.removeEventListener("progress",v),l!==null&&i.upload&&i.upload.removeEventListener("progress",S)),i.readyState!==i.DONE&&i.abort()}})))}};e.\u0275fac=function(r){return new(r||e)(h(le))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),Lt=new E(""),ln="XSRF-TOKEN",dn=new E("",{providedIn:"root",factory:()=>ln}),un="X-XSRF-TOKEN",hn=new E("",{providedIn:"root",factory:()=>un}),fe=class{},fn=(()=>{let e=class e{constructor(n,r,o){this.doc=n,this.platform=r,this.cookieName=o,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let n=this.doc.cookie||"";return n!==this.lastCookieString&&(this.parseCount++,this.lastToken=ce(n,this.cookieName),this.lastCookieString=n),this.lastToken}};e.\u0275fac=function(r){return new(r||e)(h(R),h(j),h(dn))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})();function pn(t,e){let s=t.url.toLowerCase();if(!w(Lt)||t.method==="GET"||t.method==="HEAD"||s.startsWith("http://")||s.startsWith("https://"))return e(t);let n=w(fe).getToken(),r=w(hn);return n!=null&&!t.headers.has(r)&&(t=t.clone({headers:t.headers.set(r,n)})),e(t)}var ke=function(t){return t[t.Interceptors=0]="Interceptors",t[t.LegacyInterceptors=1]="LegacyInterceptors",t[t.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",t[t.NoXsrfProtection=3]="NoXsrfProtection",t[t.JsonpSupport=4]="JsonpSupport",t[t.RequestsMadeViaParent=5]="RequestsMadeViaParent",t[t.Fetch=6]="Fetch",t}(ke||{});function xt(t,e){return{\u0275kind:t,\u0275providers:e}}function yn(...t){let e=[Qt,Tt,Et,{provide:J,useExisting:Et},{provide:G,useExisting:Tt},{provide:Se,useValue:pn,multi:!0},{provide:Lt,useValue:!0},{provide:fe,useClass:fn}];for(let s of t)e.push(...s.\u0275providers);return ne(e)}var Rt=new E("");function mn(){return xt(ke.LegacyInterceptors,[{provide:Rt,useFactory:on},{provide:Se,useExisting:Rt,multi:!0}])}function Hn(){return xt(ke.Fetch,[Ae,{provide:G,useExisting:Ae},{provide:kt,useExisting:Ae}])}var er=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=te({type:e}),e.\u0275inj=ee({providers:[yn(mn())]});let t=e;return t})();var bt="b",Mt="h",Dt="s",At="st",Pt="u",Nt="rt",ue=new E(""),gn=["GET","HEAD"];function vn(t,e){let u=w(ue),{isCacheActive:s}=u,n=$e(u,["isCacheActive"]),{transferCache:r,method:o}=t;if(!s||o==="POST"&&!n.includePostRequests&&!r||o!=="POST"&&!gn.includes(o)||r===!1||n.filter?.(t)===!1)return e(t);let a=w(se),i=En(t),l=a.get(i,null),c=n.includeHeaders;if(typeof r=="object"&&r.includeHeaders&&(c=r.includeHeaders),l){let{[bt]:d,[Nt]:y,[Mt]:T,[Dt]:v,[At]:S,[Pt]:p}=l,f=d;switch(y){case"arraybuffer":f=new TextEncoder().encode(d).buffer;break;case"blob":f=new Blob([d]);break}let b=new M(T);return H(new x({body:f,headers:b,status:v,statusText:S,url:p}))}return e(t).pipe(qe(d=>{d instanceof x&&a.set(i,{[bt]:d.body,[Mt]:wn(d.headers,c),[Dt]:d.status,[At]:d.statusText,[Pt]:d.url||"",[Nt]:t.responseType})}))}function wn(t,e){if(!e)return{};let s={};for(let n of e){let r=t.getAll(n);r!==null&&(s[n]=r)}return s}function Ot(t){return[...t.keys()].sort().map(e=>`${e}=${t.getAll(e)}`).join("&")}function En(t){let{params:e,method:s,responseType:n,url:r}=t,o=Ot(e),a=t.serializeBody();a instanceof URLSearchParams?a=Ot(a):typeof a!="string"&&(a="");let i=[s,n,r,a,o].join("|"),l=Tn(i);return l}function Tn(t){let e=0;for(let s of t)e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,e.toString()}function Ct(t){return[{provide:ue,useFactory:()=>(it("NgHttpTransferCache"),z({isCacheActive:!0},t))},{provide:St,useValue:vn,multi:!0,deps:[se,ue]},{provide:ct,multi:!0,useFactory:()=>{let e=w(be),s=w(ue);return()=>{lt(e).then(()=>{s.isCacheActive=!1})}}}]}var Ce=class extends ft{constructor(){super(...arguments),this.supportsDOMEvents=!0}},jt=class t extends Ce{static makeCurrent(){ht(new t)}onAndCancel(e,s,n){return e.addEventListener(s,n),()=>{e.removeEventListener(s,n)}}dispatchEvent(e,s){e.dispatchEvent(s)}remove(e){e.parentNode&&e.parentNode.removeChild(e)}createElement(e,s){return s=s||this.getDefaultDocument(),s.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,s){return s==="window"?window:s==="document"?e:s==="body"?e.body:null}getBaseHref(e){let s=bn();return s==null?null:Mn(s)}resetBaseElement(){Z=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return ce(document.cookie,e)}},Z=null;function bn(){return Z=Z||document.querySelector("base"),Z?Z.getAttribute("href"):null}function Mn(t){return new URL(t,document.baseURI).pathname}var je=class{addToWindow(e){P.getAngularTestability=(n,r=!0)=>{let o=e.findTestabilityInTree(n,r);if(o==null)throw new D(5103,!1);return o},P.getAllAngularTestabilities=()=>e.getAllTestabilities(),P.getAllAngularRootElements=()=>e.getAllRootElements();let s=n=>{let r=P.getAllAngularTestabilities(),o=r.length,a=function(){o--,o==0&&n()};r.forEach(i=>{i.whenStable(a)})};P.frameworkStabilizers||(P.frameworkStabilizers=[]),P.frameworkStabilizers.push(s)}findTestabilityInTree(e,s,n){if(s==null)return null;let r=e.getTestability(s);return r??(n?ae().isShadowRoot(s)?this.findTestabilityInTree(e,s.host,!0):this.findTestabilityInTree(e,s.parentElement,!0):null)}},Dn=(()=>{let e=class e{build(){return new XMLHttpRequest}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),Fe=new E(""),Bt=(()=>{let e=class e{constructor(n,r){this._zone=r,this._eventNameToPlugin=new Map,n.forEach(o=>{o.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,r,o){return this._findPluginFor(r).addEventListener(n,r,o)}getZone(){return this._zone}_findPluginFor(n){let r=this._eventNameToPlugin.get(n);if(r)return r;if(r=this._plugins.find(a=>a.supports(n)),!r)throw new D(5101,!1);return this._eventNameToPlugin.set(n,r),r}};e.\u0275fac=function(r){return new(r||e)(h(Fe),h(A))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),pe=class{constructor(e){this._doc=e}},Le="ng-app-id",zt=(()=>{let e=class e{constructor(n,r,o,a={}){this.doc=n,this.appId=r,this.nonce=o,this.platformId=a,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=Me(a),this.resetHostNodes()}addStyles(n){for(let r of n)this.changeUsageCount(r,1)===1&&this.onStyleAdded(r)}removeStyles(n){for(let r of n)this.changeUsageCount(r,-1)<=0&&this.onStyleRemoved(r)}ngOnDestroy(){let n=this.styleNodesInDOM;n&&(n.forEach(r=>r.remove()),n.clear());for(let r of this.getAllStyles())this.onStyleRemoved(r);this.resetHostNodes()}addHost(n){this.hostNodes.add(n);for(let r of this.getAllStyles())this.addStyleToHost(n,r)}removeHost(n){this.hostNodes.delete(n)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(n){for(let r of this.hostNodes)this.addStyleToHost(r,n)}onStyleRemoved(n){let r=this.styleRef;r.get(n)?.elements?.forEach(o=>o.remove()),r.delete(n)}collectServerRenderedStyles(){let n=this.doc.head?.querySelectorAll(`style[${Le}="${this.appId}"]`);if(n?.length){let r=new Map;return n.forEach(o=>{o.textContent!=null&&r.set(o.textContent,o)}),r}return null}changeUsageCount(n,r){let o=this.styleRef;if(o.has(n)){let a=o.get(n);return a.usage+=r,a.usage}return o.set(n,{usage:r,elements:[]}),r}getStyleElement(n,r){let o=this.styleNodesInDOM,a=o?.get(r);if(a?.parentNode===n)return o.delete(r),a.removeAttribute(Le),a;{let i=this.doc.createElement("style");return this.nonce&&i.setAttribute("nonce",this.nonce),i.textContent=r,this.platformIsServer&&i.setAttribute(Le,this.appId),n.appendChild(i),i}}addStyleToHost(n,r){let o=this.getStyleElement(n,r),a=this.styleRef,i=a.get(r)?.elements;i?i.push(o):a.set(r,{elements:[o],usage:1})}resetHostNodes(){let n=this.hostNodes;n.clear(),n.add(this.doc.head)}};e.\u0275fac=function(r){return new(r||e)(h(R),h(re),h(Ee,8),h(j))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),xe={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},Be=/%COMP%/g,Vt="%COMP%",An=`_nghost-${Vt}`,Pn=`_ngcontent-${Vt}`,Nn=!0,On=new E("",{providedIn:"root",factory:()=>Nn});function In(t){return Pn.replace(Be,t)}function Sn(t){return An.replace(Be,t)}function $t(t,e){return e.map(s=>s.replace(Be,t))}var Ft=(()=>{let e=class e{constructor(n,r,o,a,i,l,c,u=null){this.eventManager=n,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestroy=a,this.doc=i,this.platformId=l,this.ngZone=c,this.nonce=u,this.rendererByCompId=new Map,this.platformIsServer=Me(l),this.defaultRenderer=new Y(n,i,c,this.platformIsServer)}createRenderer(n,r){if(!n||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===$.ShadowDom&&(r=Ve(z({},r),{encapsulation:$.Emulated}));let o=this.getOrCreateRenderer(n,r);return o instanceof ye?o.applyToHost(n):o instanceof Q&&o.applyStyles(),o}getOrCreateRenderer(n,r){let o=this.rendererByCompId,a=o.get(r.id);if(!a){let i=this.doc,l=this.ngZone,c=this.eventManager,u=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,y=this.platformIsServer;switch(r.encapsulation){case $.Emulated:a=new ye(c,u,r,this.appId,d,i,l,y);break;case $.ShadowDom:return new Ue(c,u,n,r,i,l,this.nonce,y);default:a=new Q(c,u,r,d,i,l,y);break}o.set(r.id,a)}return a}ngOnDestroy(){this.rendererByCompId.clear()}};e.\u0275fac=function(r){return new(r||e)(h(Bt),h(zt),h(re),h(On),h(R),h(j),h(A),h(Ee))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),Y=class{constructor(e,s,n,r){this.eventManager=e,this.doc=s,this.ngZone=n,this.platformIsServer=r,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(e,s){return s?this.doc.createElementNS(xe[s]||s,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,s){(Ut(e)?e.content:e).appendChild(s)}insertBefore(e,s,n){e&&(Ut(e)?e.content:e).insertBefore(s,n)}removeChild(e,s){e&&e.removeChild(s)}selectRootElement(e,s){let n=typeof e=="string"?this.doc.querySelector(e):e;if(!n)throw new D(-5104,!1);return s||(n.textContent=""),n}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,s,n,r){if(r){s=r+":"+s;let o=xe[r];o?e.setAttributeNS(o,s,n):e.setAttribute(s,n)}else e.setAttribute(s,n)}removeAttribute(e,s,n){if(n){let r=xe[n];r?e.removeAttributeNS(r,s):e.removeAttribute(`${n}:${s}`)}else e.removeAttribute(s)}addClass(e,s){e.classList.add(s)}removeClass(e,s){e.classList.remove(s)}setStyle(e,s,n,r){r&(K.DashCase|K.Important)?e.style.setProperty(s,n,r&K.Important?"important":""):e.style[s]=n}removeStyle(e,s,n){n&K.DashCase?e.style.removeProperty(s):e.style[s]=""}setProperty(e,s,n){e!=null&&(e[s]=n)}setValue(e,s){e.nodeValue=s}listen(e,s,n){if(typeof e=="string"&&(e=ae().getGlobalEventTarget(this.doc,e),!e))throw new Error(`Unsupported event target ${e} for event ${s}`);return this.eventManager.addEventListener(e,s,this.decoratePreventDefault(n))}decoratePreventDefault(e){return s=>{if(s==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(s)):e(s))===!1&&s.preventDefault()}}};function Ut(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var Ue=class extends Y{constructor(e,s,n,r,o,a,i,l){super(e,o,a,l),this.sharedStylesHost=s,this.hostEl=n,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let c=$t(r.id,r.styles);for(let u of c){let d=document.createElement("style");i&&d.setAttribute("nonce",i),d.textContent=u,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,s){return super.appendChild(this.nodeOrShadowRoot(e),s)}insertBefore(e,s,n){return super.insertBefore(this.nodeOrShadowRoot(e),s,n)}removeChild(e,s){return super.removeChild(this.nodeOrShadowRoot(e),s)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Q=class extends Y{constructor(e,s,n,r,o,a,i,l){super(e,o,a,i),this.sharedStylesHost=s,this.removeStylesOnCompDestroy=r,this.styles=l?$t(l,n.styles):n.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},ye=class extends Q{constructor(e,s,n,r,o,a,i,l){let c=r+"-"+n.id;super(e,s,n,o,a,i,l,c),this.contentAttr=In(c),this.hostAttr=Sn(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,s){let n=super.createElement(e,s);return super.setAttribute(n,this.contentAttr,""),n}},kn=(()=>{let e=class e extends pe{constructor(n){super(n)}supports(n){return!0}addEventListener(n,r,o){return n.addEventListener(r,o,!1),()=>this.removeEventListener(n,r,o)}removeEventListener(n,r,o){return n.removeEventListener(r,o)}};e.\u0275fac=function(r){return new(r||e)(h(R))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),_t=["alt","control","meta","shift"],Ln={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},xn={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},Cn=(()=>{let e=class e extends pe{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,r,o){let a=e.parseEventName(r),i=e.eventCallback(a.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ae().onAndCancel(n,a.domEventName,i))}static parseEventName(n){let r=n.toLowerCase().split("."),o=r.shift();if(r.length===0||!(o==="keydown"||o==="keyup"))return null;let a=e._normalizeKey(r.pop()),i="",l=r.indexOf("code");if(l>-1&&(r.splice(l,1),i="code."),_t.forEach(u=>{let d=r.indexOf(u);d>-1&&(r.splice(d,1),i+=u+".")}),i+=a,r.length!=0||a.length===0)return null;let c={};return c.domEventName=o,c.fullKey=i,c}static matchEventFullKeyCode(n,r){let o=Ln[n.key]||n.key,a="";return r.indexOf("code.")>-1&&(o=n.code,a="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),_t.forEach(i=>{if(i!==o){let l=xn[i];l(n)&&(a+=i+".")}}),a+=o,a===r)}static eventCallback(n,r,o){return a=>{e.matchEventFullKeyCode(a,n)&&o.runGuarded(()=>r(a))}}static _normalizeKey(n){return n==="esc"?"escape":n}};e.\u0275fac=function(r){return new(r||e)(h(R))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})();function jn(){return new we}var Fn=new E(""),Un=[{provide:oe,useClass:je,deps:[]},{provide:at,useClass:ie,deps:[A,Re,oe]},{provide:ie,useClass:ie,deps:[A,Re,oe]}],_n=[{provide:We,useValue:"root"},{provide:we,useFactory:jn,deps:[]},{provide:Fe,useClass:kn,multi:!0,deps:[R,A,j]},{provide:Fe,useClass:Cn,multi:!0,deps:[R]},Ft,zt,Bt,{provide:ot,useExisting:Ft},{provide:le,useClass:Dn,deps:[]},[]],Tr=(()=>{let e=class e{constructor(n){}static withServerTransition(n){return{ngModule:e,providers:[{provide:re,useValue:n.appId}]}}};e.\u0275fac=function(r){return new(r||e)(h(Fn,12))},e.\u0275mod=te({type:e}),e.\u0275inj=ee({providers:[..._n,...Un],imports:[pt,dt]});let t=e;return t})();var Rr=(()=>{let e=class e{constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}};e.\u0275fac=function(r){return new(r||e)(h(R))},e.\u0275prov=g({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var Bn=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=g({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=h(zn),o},providedIn:"root"});let t=e;return t})(),zn=(()=>{let e=class e extends Bn{constructor(n){super(),this._doc=n}sanitize(n,r){if(r==null)return null;switch(n){case L.NONE:return r;case L.HTML:return U(r,"HTML")?F(r):st(this._doc,String(r)).toString();case L.STYLE:return U(r,"Style")?F(r):r;case L.SCRIPT:if(U(r,"Script"))return F(r);throw new D(5200,!1);case L.URL:return U(r,"URL")?F(r):rt(String(r));case L.RESOURCE_URL:if(U(r,"ResourceURL"))return F(r);throw new D(5201,!1);default:throw new D(5202,!1)}}bypassSecurityTrustHtml(n){return Qe(n)}bypassSecurityTrustStyle(n){return He(n)}bypassSecurityTrustScript(n){return et(n)}bypassSecurityTrustUrl(n){return tt(n)}bypassSecurityTrustResourceUrl(n){return nt(n)}};e.\u0275fac=function(r){return new(r||e)(h(R))},e.\u0275prov=g({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),_e=function(t){return t[t.NoHttpTransferCache=0]="NoHttpTransferCache",t[t.HttpTransferCacheOptions=1]="HttpTransferCacheOptions",t}(_e||{});function br(...t){let e=[],s=new Set,n=s.has(_e.HttpTransferCacheOptions);for(let{\u0275providers:r,\u0275kind:o}of t)s.add(o),r.length&&e.push(r);return ne([[],ut(),s.has(_e.NoHttpTransferCache)||n?[]:Ct({}),e])}export{O as a,Qt as b,sn as c,St as d,yn as e,Hn as f,er as g,jt as h,Fe as i,pe as j,Ft as k,Tr as l,Rr as m,Bn as n,br as o};
