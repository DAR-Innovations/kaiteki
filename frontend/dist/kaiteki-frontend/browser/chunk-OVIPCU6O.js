import{c as o}from"./chunk-T7QTB5KA.js";import{b as c}from"./chunk-EPUQ6IPG.js";import{Y as n,ea as s,ja as m,o as i}from"./chunk-TYBYM3PM.js";var p=(()=>{let r=class r{constructor(e){this.httpClient=e,this.baseUrl="/api/v1/performance"}getMetrics(e){return this.httpClient.get(`${this.baseUrl}/teams/${e}/metrics`)}updateMetrics(e,t){return this.httpClient.put(`${this.baseUrl}/teams/${e}/metrics`,t)}getTeamPerformance(e){return this.httpClient.get(`${this.baseUrl}/teams/${e}`)}getTeamMemberPerformance(e){return this.httpClient.get(`${this.baseUrl}/team-members/${e}`)}getTeamMemberPerformanceByTeam(e){return this.httpClient.get(`${this.baseUrl}/team-members/teams/${e}`)}addMemberScreenTimeMinutes(e,t){return this.httpClient.post(`${this.baseUrl}/team-members/${e}/add/screen-time?minutes=${t}`,{})}getLatestUserPerformance(){return this.httpClient.get(`${this.baseUrl}/users`)}getPredictedTeamPerformance(e){return this.httpClient.get(`${this.baseUrl}/teams/${e}/predicted`)}};r.\u0275fac=function(t){return new(t||r)(m(c))},r.\u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"});let a=r;return a})();var T=(()=>{let r=class r{constructor(e,t){this.performanceApiService=e,this.teamsService=t}getMetrics(){return this.teamsService.currentTeam$.pipe(n(e=>e?this.performanceApiService.getMetrics(e.id):i(()=>Error("No current team"))))}updateMetrics(e){return this.teamsService.currentTeam$.pipe(n(t=>t?this.performanceApiService.updateMetrics(t.id,e):i(()=>Error("No current team"))))}getTeamPerformance(){return this.teamsService.currentTeam$.pipe(n(e=>e?this.performanceApiService.getTeamPerformance(e.id):i(()=>Error("No current team"))))}getTeamMemberPerformance(e){return this.performanceApiService.getTeamMemberPerformance(e)}getLatestUserPerformance(){return this.performanceApiService.getLatestUserPerformance()}getPredictedTeamPerformance(){return this.teamsService.currentTeam$.pipe(n(e=>e?this.performanceApiService.getPredictedTeamPerformance(e.id):i(()=>Error("No current team"))))}getCurrentTeamMemberPerformance(){return this.teamsService.currentTeamMember$.pipe(n(e=>e?this.getTeamMemberPerformance(e.id):i(()=>Error("No current team member"))))}getTeamMemberPerformanceByTeam(){return this.teamsService.currentTeam$.pipe(n(e=>e?this.performanceApiService.getTeamMemberPerformanceByTeam(e.id):i(()=>Error("No current team"))))}addMemberScreenTimeMinutes(e){return this.teamsService.currentTeamMember$.pipe(n(t=>t?this.performanceApiService.addMemberScreenTimeMinutes(t.id,e):i(()=>Error("No current team member"))))}};r.\u0275fac=function(t){return new(t||r)(m(p),m(o))},r.\u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"});let a=r;return a})();export{T as a};