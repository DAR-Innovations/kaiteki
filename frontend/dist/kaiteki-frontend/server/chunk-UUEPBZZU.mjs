import './polyfills.server.mjs';
import{a as o}from"./chunk-OXKDUHB6.mjs";import{b as s}from"./chunk-IWV7G257.mjs";import{ea as r,ja as n}from"./chunk-JAB3SG4D.mjs";var c=(()=>{let t=class t{constructor(e){this.httpClient=e,this.baseUrl=`${o.apiUrl}/api/v1/integrations/github`}connectIntegration(){return this.httpClient.post(`${this.baseUrl}/connect`,{})}disconnectIntegration(){return this.httpClient.put(`${this.baseUrl}/disconnect`,{})}getCredentials(){return this.httpClient.get(`${this.baseUrl}/credentials`)}saveCredentials(e){return this.httpClient.post(`${this.baseUrl}/credentials`,e)}getRepos(){return this.httpClient.get(`${this.baseUrl}/repos`)}getRepoDetails(e){return this.httpClient.get(`${this.baseUrl}/repos/${e.trim()}`)}};t.\u0275fac=function(a){return new(a||t)(n(s))},t.\u0275prov=r({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();export{c as a};