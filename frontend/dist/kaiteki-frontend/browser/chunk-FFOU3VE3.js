import{a as I}from"./chunk-EMPOD3R7.js";import{a as ft}from"./chunk-7CHYE7TG.js";import{a as b}from"./chunk-6HX3H25K.js";import{D,Ia as K,a as dt,b as mt,m as B,mb as gt,o as yt,ob as _t,p as V,u as G}from"./chunk-XIB24JUK.js";import{Aa as $,Bb as q,F as O,Fb as c,Ib as k,Jb as w,Kb as a,Lb as r,Mb as d,O as ot,Oc as U,Qb as F,Tb as z,Vb as m,aa as at,cb as h,cc as s,dc as C,ea as L,ec as v,f as tt,fa as N,fb as l,fc as rt,g as et,gb as y,ja as j,jd as lt,k as Q,ld as E,md as pt,nc as T,o as S,pa as u,qa as R,qd as ct,s as it,t as nt,vc as P,wc as M,xb as _,xc as st,za as A,zb as g}from"./chunk-TYBYM3PM.js";var Y=(()=>{let t=class t{constructor(n){this.http=n,this.baseUrl="/api/v1/integrations/spotify/player",this.currentTrackSubject=new et(null),this.currentTrack$=this.currentTrackSubject.asObservable()}getPlaybackState(){return this.http.get(this.baseUrl)}setPlaybackVolume(n){return this.http.put(`${this.baseUrl}/volume?volume=${n}`,{})}startResumePlayback(n){return this.http.post(`${this.baseUrl}/start?trackUri=${n}`,{})}pausePlayback(){return this.http.post(`${this.baseUrl}/pause`,{})}getCurrentPlayingTrack(){return this.http.get(`${this.baseUrl}/current-track`)}skipToNextTrack(){return this.http.post(`${this.baseUrl}/next`,{})}skipToPreviousTrack(){return this.http.post(`${this.baseUrl}/previous`,{})}setTrackProgress(n){return this.http.put(`${this.baseUrl}/progress?positionMs=${n}`,{})}setCurrentTrack(n){this.currentTrackSubject.next(n)}};t.\u0275fac=function(i){return new(i||t)(j(dt))},t.\u0275prov=L({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var Et=(e,t)=>t.track.id,Dt=e=>({value:e});function It(e,t){if(e&1){let o=F();a(0,"tr",6),z("click",function(){let i=A(o).$implicit,p=m(2);return $(p.setCurrentTrack(i.track))}),a(1,"td"),s(2),r(),a(3,"td",7),d(4,"img",8),a(5,"div",9)(6,"p",10),s(7),r(),a(8,"p",11),s(9),r()()(),a(10,"td",12),s(11),r(),a(12,"td",13),s(13),P(14,"date"),r(),a(15,"td"),s(16),r()()}if(e&2){let o=t.$implicit,n=t.$index,i=m(),p=m();q("playlist-songs-active",(i.value==null?null:i.value.id)===o.track.id),l(2),C(n+1),l(2),g("src",o.track.album.images[0].url,h),l(2),q("playlist-song-name-active",(i.value==null?null:i.value.id)===o.track.id),l(),v(" ",o.track.name," "),l(2),v(" ",p.getTrackArtistsNames(o.track.artists)," "),l(2),C(o.track.album.name),l(2),v(" ",st(14,11,o.track.album.releaseDate,"MMM d, y")," "),l(3),C(p.formatMsToMinutes(o.track.durationMs))}}function jt(e,t){if(e&1&&(a(0,"table",0)(1,"thead")(2,"tr")(3,"th"),s(4,"#"),r(),a(5,"th"),s(6,"Title"),r(),a(7,"th",1),s(8,"Album"),r(),a(9,"th",2),s(10,"Release Date"),r(),a(11,"th")(12,"mat-icon",3),s(13,"access_time"),r()()()(),d(14,"tr",4),a(15,"tbody"),k(16,It,17,14,"tr",5,Et),r()()),e&2){let o=m();l(16),w(o.songs)}}var Ct=(()=>{let t=class t{constructor(n){this.spotifyPlayerService=n,this.songs=[],this.currentTrack$=this.spotifyPlayerService.currentTrack$}setCurrentTrack(n){this.spotifyPlayerService.setCurrentTrack(n)}getTrackArtistsNames(n){return n.map(i=>i.name).join(", ")}formatMsToMinutes(n){let i=Math.floor(n/1e3),p=Math.floor(i/60),f=i%60,H=p.toString().padStart(2,"0"),Tt=f.toString().padStart(2,"0");return`${H}:${Tt}`}};t.\u0275fac=function(i){return new(i||t)(y(Y))},t.\u0275cmp=u({type:t,selectors:[["app-playlist-songs"]],inputs:{songs:"songs"},decls:2,vars:5,consts:[[1,"playlist-songs"],[1,"playlist-songs__album-header"],[1,"playlist-songs__date-header"],[1,"playlist-songs__duration-header"],["colspan","2",1,"separator"],[3,"playlist-songs-active"],[3,"click"],[1,"playlist-song-details"],["alt","song.track.name",1,"playlist-song-img",3,"src"],[1,"playlist-song__names"],[1,"playlist-song-name"],[1,"playlist-song-artist"],[1,"playlist-songs__album-cell"],[1,"playlist-songs__date-cell"]],template:function(i,p){if(i&1&&(_(0,jt,18,0,"table",0),P(1,"async")),i&2){let f;c(0,(f=T(3,Dt,M(1,1,p.currentTrack$)))?0:-1,f)}},dependencies:[D,E,pt],styles:[".playlist-songs[_ngcontent-%COMP%]{border-collapse:collapse;width:100%}.separator[_ngcontent-%COMP%]{height:16px}.playlist-songs[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:.7rem 1rem;text-align:left}.playlist-songs[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{position:sticky;top:0;background:#f8f9fad9;padding:.7rem 1rem;text-align:left;font-weight:400;border-bottom:1px solid #dbdbdb}.playlist-songs__duration-header[_ngcontent-%COMP%]{width:20px;height:20px;font-size:20px}.playlist-songs[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-right:0}.playlist-song-img[_ngcontent-%COMP%]{width:2.5rem;height:2.5rem;border-radius:4px;background:#8b8b8b}.playlist-song-details[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.playlist-song__names[_ngcontent-%COMP%]{display:flex;flex-direction:column}.playlist-songs[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child, .playlist-songs[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child{text-align:right}.playlist-song-name[_ngcontent-%COMP%]{font-weight:500}td[_ngcontent-%COMP%]:first-child{border-top-left-radius:8px;border-bottom-left-radius:8px}td[_ngcontent-%COMP%]:last-child{border-bottom-right-radius:8px;border-top-right-radius:8px}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{cursor:pointer}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#909ba71c}.playlist-songs__album-header[_ngcontent-%COMP%], .playlist-songs__album-cell[_ngcontent-%COMP%], .playlist-songs__date-header[_ngcontent-%COMP%], .playlist-songs__date-cell[_ngcontent-%COMP%]{display:none}@media (min-width: 48em){.playlist-songs__album-header[_ngcontent-%COMP%], .playlist-songs__album-cell[_ngcontent-%COMP%], .playlist-songs__date-header[_ngcontent-%COMP%], .playlist-songs__date-cell[_ngcontent-%COMP%]{display:table-cell}}.playlist-song-artist[_ngcontent-%COMP%]{color:#525252}.playlist-songs-active[_ngcontent-%COMP%], .playlist-songs-active[_ngcontent-%COMP%]:hover{background-color:#6e79832a}.playlist-song-name-active[_ngcontent-%COMP%]{color:#068e44}"],changeDetection:0});let e=t;return e})();function $t(e,t){if(e&1){let o=F();a(0,"div",0)(1,"div",2),d(2,"img",3),a(3,"div",4)(4,"p",5),s(5),r(),a(6,"p",6),s(7),r()()(),a(8,"audio",7),s(9," Your browser does not support the audio element. "),r(),a(10,"button",8),z("click",function(){A(o);let i=m(2);return $(i.toggleExpandPlayer())}),a(11,"mat-icon"),s(12,"close_fullscreen"),r()()()}if(e&2){let o=m(),n=m();l(2),g("src",o.album.images[0].url,h)("alt",o.name),l(3),C(o.name),l(2),v(" ",n.getArtistsNames(o.artists)," "),l(),g("volume",.1)("src",o.previewUrl,h)}}function Ft(e,t){if(e&1){let o=F();a(0,"button",9),z("click",function(){A(o);let i=m(2);return $(i.toggleExpandPlayer())}),d(1,"img",10),r()}}function zt(e,t){if(e&1&&_(0,$t,13,6,"div",0)(1,Ft,2,0,"button",1),e&2){let o=m();c(0,o.expand?0:-1),l(),c(1,o.expand?-1:1)}}var se=(()=>{let t=class t{constructor(n,i,p){this.spotifyPlayerService=n,this.toastService=i,this.cd=p,this.currentTrack=null,this.expand=!0}ngOnInit(){this.spotifyPlayerService.currentTrack$.subscribe(n=>{this.currentTrack=n,this.cd.detectChanges()})}toggleExpandPlayer(){this.expand=!this.expand}getArtistsNames(n){return n.map(i=>i.name).join(", ")}};t.\u0275fac=function(i){return new(i||t)(y(Y),y(b),y(U))},t.\u0275cmp=u({type:t,selectors:[["app-spotify-player"]],decls:1,vars:1,consts:[[1,"spotify-player"],[1,"spotify-player-button"],[1,"spotify-player__info"],["loading","lazy",1,"spotify-player__info-img",3,"src","alt"],[1,"spotify-player__info-details"],[1,"spotify-player__info-song"],[1,"spotify-player__info-artist"],["controls","","autoplay","",1,"spotify-player__external",3,"volume","src"],[1,"spotify-player__close",3,"click"],[1,"spotify-player-button",3,"click"],["src","assets/images/integrations/spotify.svg","alt","Spotify"]],template:function(i,p){if(i&1&&_(0,zt,2,2),i&2){let f;c(0,(f=p.currentTrack)?0:-1,f)}},dependencies:[D],styles:[".spotify-player[_ngcontent-%COMP%]{width:100%;position:fixed;bottom:0;left:0;right:0;background:linear-gradient(to bottom,#1b1b1b,#053b25);z-index:1;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;color:#fff;gap:24px}.spotify-player__info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.spotify-player__info-img[_ngcontent-%COMP%]{width:50px;height:50px;background:#ccc;border-radius:4px}.spotify-player__info-artist[_ngcontent-%COMP%]{font-size:12px;color:#888}.spotify-player__player[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;gap:8px}@media screen and (max-width: 40em){.spotify-player__player[_ngcontent-%COMP%]{display:none}}.spotify-player__player-actions[_ngcontent-%COMP%]{display:flex;gap:14px}.spotify-player__player-actions[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:36px;height:36px;font-size:36px}.spotify-player__player-actions-move[_ngcontent-%COMP%]{color:#e9e9e9}.spotify-player__player-actions-move[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:28px;height:28px;font-size:28px}.spotify-player__player-time[_ngcontent-%COMP%]{width:360px;height:2px}.spotify-player__player-time[_ngcontent-%COMP%]::-webkit-slider-thumb{width:2px;height:2px}.spotify-player__volume[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.spotify-player__volume[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:20px;height:20px;font-size:20px}@media screen and (max-width: 40em){.spotify-player__volume-button[_ngcontent-%COMP%]{display:none!important}}.spotify-player__volume-range[_ngcontent-%COMP%]{width:100px;height:2px}@media screen and (max-width: 40em){.spotify-player__volume-range[_ngcontent-%COMP%]{display:none}}.spotify-player__volume-player[_ngcontent-%COMP%]{display:none}@media screen and (max-width: 40em){.spotify-player__volume-player[_ngcontent-%COMP%]{display:block}}.spotify-player-button[_ngcontent-%COMP%]{position:fixed;bottom:22px;right:22px;padding:4px;border-radius:6px;background:#1b1b1b}@media screen and (max-width: 40em){.spotify-player-button[_ngcontent-%COMP%]{bottom:8px;right:8px}}.spotify-player-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:28px;height:28px}.spotify-player__close[_ngcontent-%COMP%]{margin-left:14px}.spotify-player__close[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px}audio[_ngcontent-%COMP%]{width:100%}audio[_ngcontent-%COMP%]::-webkit-media-controls-enclosure{background-color:transparent}audio[_ngcontent-%COMP%]::-webkit-media-controls-play-button, audio[_ngcontent-%COMP%]::-webkit-media-controls-volume-slider, audio[_ngcontent-%COMP%]::-webkit-media-controls-current-time-display, audio[_ngcontent-%COMP%]::-webkit-media-controls-time-remaining-display, audio[_ngcontent-%COMP%]::-webkit-media-controls-timeline, audio[_ngcontent-%COMP%]::-webkit-media-controls-mute-button{filter:invert(1)}"],changeDetection:0});let e=t;return e})();function Lt(e,t){e&1&&(a(0,"p"),s(1,"Processing..."),r())}function Nt(e,t){e&1&&(a(0,"div",1)(1,"mat-icon"),s(2,"check_circle"),r()(),a(3,"h1",2),s(4,"CONNECTED"),r(),a(5,"p",3),s(6," You logged into spotify account."),d(7,"br"),s(8," Now you can explore more features in spotify integration page "),r(),a(9,"a",4),s(10,"Return to integrations"),r())}function Rt(e,t){e&1&&(a(0,"div",5)(1,"mat-icon"),s(2,"error_outline"),r()(),a(3,"h1",6),s(4,"FAILED TO CONNECT"),r(),a(5,"p",3),s(6," The integration to spotify is failed."),d(7,"br"),s(8," Try again later or contact our support service "),r(),a(9,"a",4),s(10,"Return to integrations"),r())}var Pt=(()=>{let t=class t{constructor(n,i,p,f,H){this.spotifyService=n,this.route=i,this.cd=p,this.toastService=f,this.integrationsService=H,this.unsubscribe$=new tt,this.isLoading=!0,this.isSuccess=!1}ngOnInit(){this.handleAuth()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}handleAuth(){let n=this.route.snapshot.queryParamMap.get("code");n&&this.spotifyService.handleAuthCode(n).pipe(at(()=>{this.isLoading=!0,this.isSuccess=!1}),O(i=>(this.isSuccess=!1,this.toastService.error("Failed to log in spotify"),S(()=>i))),ot(()=>{this.isLoading=!1,this.cd.markForCheck()})).subscribe(()=>{this.isSuccess=!0,this.toastService.open("Successfully integrated with spotify"),this.integrationsService.refreshIntegrations(),this.cd.markForCheck()})}};t.\u0275fac=function(i){return new(i||t)(y(I),y(B),y(U),y(b),y(ft))},t.\u0275cmp=u({type:t,selectors:[["app-spotify-auth"]],decls:4,vars:3,consts:[[1,"spotify-auth__wrapper"],[1,"spotify-auth__icon"],[1,"spotify-auth__title"],[1,"spotify-auth__text"],["routerLink","/hub/integrations",1,"spotify-auth__button"],[1,"spotify-auth__icon","error"],[1,"spotify-auth__title","error"]],template:function(i,p){i&1&&(a(0,"div",0),_(1,Lt,2,0,"p")(2,Nt,11,0)(3,Rt,11,0),r()),i&2&&(l(),c(1,!p.isSuccess&&p.isLoading?1:-1),l(),c(2,p.isSuccess&&!p.isLoading?2:-1),l(),c(3,!p.isSuccess&&!p.isLoading?3:-1))},dependencies:[D,V],styles:[".spotify-auth__wrapper[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;flex-direction:column;justify-content:center;text-align:center}.spotify-auth__icon[_ngcontent-%COMP%]{display:flex;justify-content:center}.spotify-auth__icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:80px;width:80px;height:80px;color:green}.spotify-auth__title[_ngcontent-%COMP%]{margin-top:40px!important;font-size:42px;font-weight:600;color:#068e44;color:green}.spotify-auth__text[_ngcontent-%COMP%]{margin-top:30px!important}.spotify-auth__button[_ngcontent-%COMP%]{margin-top:40px;padding:10px 24px;border:1px solid #a5a5a5;color:#242424;border-radius:4px}.error[_ngcontent-%COMP%]{color:#df2d2d}.error[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#df2d2d}"],changeDetection:0});let e=t;return e})();var Ut=e=>["playlist",e];function Bt(e,t){if(e&1&&(a(0,"div",0),d(1,"img",1),a(2,"h4",2),s(3),r(),a(4,"p",3),s(5),r()()),e&2){let o=m();g("routerLink",T(6,Ut,o.playlist.id)),l(),g("src",o.playlist.images[0].url,h)("alt",o.playlist.name),l(2),v(" ",o.playlist.name," "),l(2),rt(" Creator ",o.playlist.owner.displayName,", Tracks ",o.playlist.tracks.total," ")}}var bt=(()=>{let t=class t{constructor(){this.playlist=null}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=u({type:t,selectors:[["app-dashboard-playlist-item"]],inputs:{playlist:"playlist"},decls:1,vars:1,consts:[[1,"spotify-playlists__list-item",3,"routerLink"],["loading","lazy",1,"spotify-playlists__list-item-img",3,"src","alt"],[1,"spotify-playlists__list-item-title"],[1,"spotify-playlists__list-item-subtitle"]],template:function(i,p){i&1&&_(0,Bt,6,8,"div",0),i&2&&c(0,p.playlist?0:-1)},dependencies:[V],styles:[".spotify-playlists__list-item[_ngcontent-%COMP%]{cursor:pointer;transition:all ease .4s}.spotify-playlists__list-item-img[_ngcontent-%COMP%]{width:100%;max-height:300px;margin-bottom:10px;border-radius:4px;background:#d3d3d3;object-fit:cover}@media screen and (max-width: 40em){.spotify-playlists__list-item-img[_ngcontent-%COMP%]{height:140px}}.spotify-playlists__list-item-title[_ngcontent-%COMP%]{margin-bottom:4px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.spotify-playlists__list-item-subtitle[_ngcontent-%COMP%]{font-size:12px;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"],changeDetection:0});let e=t;return e})();var X=(e,t)=>t.id;function Yt(e,t){if(e&1&&d(0,"app-dashboard-playlist-item",8),e&2){let o=t.$implicit;g("playlist",o)}}function Ht(e,t){if(e&1&&(a(0,"div",5)(1,"h2",6),s(2,"Your playlists"),r(),a(3,"div",7),k(4,Yt,1,1,"app-dashboard-playlist-item",8,X),r()()),e&2){let o=m(2);l(4),w(o.data.savedPlaylists)}}function Qt(e,t){if(e&1&&d(0,"app-dashboard-playlist-item",8),e&2){let o=t.$implicit;g("playlist",o)}}function qt(e,t){if(e&1&&(a(0,"div",5)(1,"h2",6),s(2,"Chill Mood"),r(),a(3,"div",7),k(4,Qt,1,1,"app-dashboard-playlist-item",8,X),r()()),e&2){let o=m(2);l(4),w(o.data.chillPlaylists)}}function Gt(e,t){if(e&1&&d(0,"app-dashboard-playlist-item",8),e&2){let o=t.$implicit;g("playlist",o)}}function Jt(e,t){if(e&1&&(a(0,"div",5)(1,"h2",6),s(2,"Trending"),r(),a(3,"div",7),k(4,Gt,1,1,"app-dashboard-playlist-item",8,X),r()()),e&2){let o=m(2);l(4),w(o.data.trendingPlaylists)}}function Wt(e,t){if(e&1&&_(0,Ht,6,0,"div",5)(1,qt,6,0,"div",5)(2,Jt,6,0,"div",5),e&2){let o=m();c(0,o.data.savedPlaylists?0:-1),l(),c(1,o.data.chillPlaylists?1:-1),l(),c(2,o.data.trendingPlaylists?2:-1)}}function Xt(e,t){e&1&&(a(0,"div",3),s(1,"Loading"),r())}function Zt(e,t){e&1&&(a(0,"div",4),s(1,"Error"),r())}function te(e,t){if(e&1&&_(0,Wt,3,3)(1,Xt,2,0,"div",3)(2,Zt,2,0,"div",4),e&2){let o=t;c(0,o.data?0:-1),l(),c(1,o?1:-1),l(),c(2,o.error?2:-1)}}var St={newReleases:"0JQ5DAqbMKFz6FAsUtgAab",chill:"0JQ5DAqbMKFFzDl7qN9Apr",trending:"0JQ5DAqbMKFQIL0AXnG5AK"},Mt=(()=>{let t=class t{constructor(n){this.spotifyService=n,this.playlists$=nt([this.spotifyService.getUsersSavedPlaylists(),this.spotifyService.getPlaylistsByCategory(St.chill),this.spotifyService.getPlaylistsByCategory(St.trending)]).pipe(it(([i,p,f])=>({savedPlaylists:i,chillPlaylists:p,trendingPlaylists:f})))}};t.\u0275fac=function(i){return new(i||t)(y(I))},t.\u0275cmp=u({type:t,selectors:[["app-spotify-dashboard"]],decls:6,vars:5,consts:[["value","Spotify"],[1,"page","spotify-home"],[1,"spotify-wrapper"],[1,"spotify-loading"],[1,"spotify-error"],[1,"spotify-playlists"],[1,"spotify-playlists__title"],[1,"spotify-playlists__list"],[3,"playlist"]],template:function(i,p){if(i&1&&(d(0,"app-page-header",0),a(1,"section",1)(2,"div",2),_(3,te,3,3),P(4,"withLoading"),P(5,"async"),r()()),i&2){let f;l(3),c(3,(f=M(5,3,M(4,1,p.playlists$)))?3:-1,f)}},dependencies:[K,bt,E,gt],styles:[".spotify-home[_ngcontent-%COMP%]{display:flex;justify-content:center}.spotify-wrapper[_ngcontent-%COMP%]{width:80%;display:flex;flex-direction:column;gap:40px}@media screen and (max-width: 48em){.spotify-wrapper[_ngcontent-%COMP%]{width:100%}}.spotify-playlists__title[_ngcontent-%COMP%]{font-size:22px;font-weight:700;margin-bottom:20px}.spotify-playlists__list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));column-gap:24px;row-gap:30px;overflow-x:auto}@media screen and (max-width: 40em){.spotify-playlists__list[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}}"],changeDetection:0});let e=t;return e})();var Z=["#6366F1","#1D4ED8","#1A73E8","#EF4444","#FFC107","#F78DA7","#9B59B6"];var ee=e=>({background:e});function ie(e,t){if(e&1&&(a(0,"div",2)(1,"div",3),d(2,"img",4),a(3,"div",5)(4,"p",6),s(5,"Playlist"),r(),a(6,"h1",7),s(7),r()()()(),a(8,"div"),d(9,"app-playlist-songs",8),r()),e&2){let o=t,n=m();g("ngStyle",T(5,ee,n.getRandomBackgroundColor())),l(2),g("src",o.images[0].url,h)("alt",o.name),l(5),C(o.name),l(2),g("songs",o.tracks.items)}}var Ot=(()=>{let t=class t{constructor(n,i,p){this.route=n,this.spotifyService=i,this.toastService=p,this.playlist$=this.getPlaylist()}getRandomBackgroundColor(){let n=Math.floor(Math.random()*Z.length);return`linear-gradient(to bottom, ${Z[n]}, #f8f9fa)`}getPlaylist(){let n=this.route.snapshot.paramMap.get("playlistId");return n?this.spotifyService.getPlaylistDetailsById(n).pipe(O(i=>(this.toastService.open("Failed to get playlist"),S(()=>i),Q))):(this.toastService.open("Playlist id is not found"),Q)}};t.\u0275fac=function(i){return new(i||t)(y(B),y(I),y(b))},t.\u0275cmp=u({type:t,selectors:[["app-spotify-playlist"]],decls:4,vars:3,consts:[["value","Spotify Playlist"],[1,"page"],[1,"spotify-playlist",3,"ngStyle"],[1,"spotify-playlist-info"],[1,"spotify-playlist-img",3,"src","alt"],[1,"spotify-playlist-details"],[1,"spotify-playlist-title"],[1,"spotify-playlist-name"],[3,"songs"]],template:function(i,p){if(i&1&&(d(0,"app-page-header",0),a(1,"section",1),_(2,ie,10,7),P(3,"async"),r()),i&2){let f;l(2),c(2,(f=M(3,1,p.playlist$))?2:-1,f)}},dependencies:[lt,K,Ct,E],styles:[".spotify-playlist[_ngcontent-%COMP%]{padding:2rem;min-height:20rem;border-radius:4px}@media screen and (max-width: 40em){.spotify-playlist[_ngcontent-%COMP%]{min-height:24rem;padding:1rem}}.spotify-playlist-info[_ngcontent-%COMP%]{display:flex;gap:30px}@media screen and (max-width: 40em){.spotify-playlist-info[_ngcontent-%COMP%]{flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:20px}}.spotify-playlist-img[_ngcontent-%COMP%]{width:13rem;height:13rem;flex-shrink:0;border-radius:6px;box-shadow:0 25px 50px -12px #00000040;background:#afafaf}.spotify-playlist-details[_ngcontent-%COMP%]{margin-top:auto;padding-bottom:12px}.spotify-playlist-name[_ngcontent-%COMP%]{margin-top:6px;font-size:3rem;line-height:1;font-weight:700}@media screen and (max-width: 40em){.spotify-playlist-name[_ngcontent-%COMP%]{font-size:2rem}}.spotify-playlist-subtitle[_ngcontent-%COMP%]{margin-top:12px!important}"],changeDetection:0});let e=t;return e})();var ne=(()=>{let t=class t{constructor(n,i){this.toastService=n,this.router=i}intercept(n,i){return n.url.includes("spotify")?i.handle(n).pipe(O(p=>p?.status===401?(this.router.navigate(["/hub/integrations"]),this.toastService.error("Spotify integration is not connected"),S(()=>p)):(this.toastService.error("Spotify integration is not available"),S(()=>p)))):i.handle(n)}};t.\u0275fac=function(i){return new(i||t)(j(b),j(yt))},t.\u0275prov=L({token:t,factory:t.\u0275fac});let e=t;return e})(),kt=[{provide:mt,useClass:ne,multi:!0}];var oe=[{path:"",component:Mt,title:"Spotify Dashboard | Kaiteki"},{path:"auth",component:Pt,title:"Spotify Auth | Kaiteki"},{path:"playlist/:playlistId",component:Ot,title:"Spotify Playlist | Kaiteki"}],wt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=R({type:t}),t.\u0275inj=N({imports:[G.forChild(oe),G]});let e=t;return e})();var Ve=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=R({type:t}),t.\u0275inj=N({providers:[kt],imports:[ct,_t,wt]});let e=t;return e})();export{se as a,Ve as b};
