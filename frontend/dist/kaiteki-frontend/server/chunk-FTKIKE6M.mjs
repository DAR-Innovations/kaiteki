import './polyfills.server.mjs';
import{b as ee}from"./chunk-IWV7G257.mjs";import{ea as V,ja as J}from"./chunk-JAB3SG4D.mjs";import{a as d,b as z}from"./chunk-FME56UVT.mjs";function U(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var R=U();function le(a){R=a}var oe=/[&<>"']/,de=new RegExp(oe.source,"g"),ae=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,xe=new RegExp(ae.source,"g"),be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},te=a=>be[a];function x(a,n){if(n){if(oe.test(a))return a.replace(de,te)}else if(ae.test(a))return a.replace(xe,te);return a}var me=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function we(a){return a.replace(me,(n,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}var ye=/(^|[^\[])\^/g;function k(a,n){let t=typeof a=="string"?a:a.source;n=n||"";let e={replace:(i,r)=>{let s=typeof r=="string"?r:r.source;return s=s.replace(ye,"$1"),t=t.replace(i,s),e},getRegex:()=>new RegExp(t,n)};return e}function ne(a){try{a=encodeURI(a).replace(/%25/g,"%")}catch{return null}return a}var E={exec:()=>null};function se(a,n){let t=a.replace(/\|/g,(r,s,l)=>{let o=!1,p=s;for(;--p>=0&&l[p]==="\\";)o=!o;return o?"|":" |"}),e=t.split(/ \|/),i=0;if(e[0].trim()||e.shift(),e.length>0&&!e[e.length-1].trim()&&e.pop(),n)if(e.length>n)e.splice(n);else for(;e.length<n;)e.push("");for(;i<e.length;i++)e[i]=e[i].trim().replace(/\\\|/g,"|");return e}function q(a,n,t){let e=a.length;if(e===0)return"";let i=0;for(;i<e;){let r=a.charAt(e-i-1);if(r===n&&!t)i++;else if(r!==n&&t)i++;else break}return a.slice(0,e-i)}function $e(a,n){if(a.indexOf(n[1])===-1)return-1;let t=0;for(let e=0;e<a.length;e++)if(a[e]==="\\")e++;else if(a[e]===n[0])t++;else if(a[e]===n[1]&&(t--,t<0))return e;return-1}function ie(a,n,t,e){let i=n.href,r=n.title?x(n.title):null,s=a[1].replace(/\\([\[\]])/g,"$1");if(a[0].charAt(0)!=="!"){e.state.inLink=!0;let l={type:"link",raw:t,href:i,title:r,text:s,tokens:e.inlineTokens(s)};return e.state.inLink=!1,l}return{type:"image",raw:t,href:i,title:r,text:x(s)}}function Te(a,n){let t=a.match(/^(\s+)(?:```)/);if(t===null)return n;let e=t[1];return n.split(`
`).map(i=>{let r=i.match(/^\s+/);if(r===null)return i;let[s]=r;return s.length>=e.length?i.slice(e.length):i}).join(`
`)}var S=class{options;rules;lexer;constructor(n){this.options=n||R}space(n){let t=this.rules.block.newline.exec(n);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(n){let t=this.rules.block.code.exec(n);if(t){let e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:q(e,`
`)}}}fences(n){let t=this.rules.block.fences.exec(n);if(t){let e=t[0],i=Te(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(n){let t=this.rules.block.heading.exec(n);if(t){let e=t[2].trim();if(/#$/.test(e)){let i=q(e,"#");(this.options.pedantic||!i||/ $/.test(i))&&(e=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(n){let t=this.rules.block.hr.exec(n);if(t)return{type:"hr",raw:t[0]}}blockquote(n){let t=this.rules.block.blockquote.exec(n);if(t){let e=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);e=q(e.replace(/^ *>[ \t]?/gm,""),`
`);let i=this.lexer.state.top;this.lexer.state.top=!0;let r=this.lexer.blockTokens(e);return this.lexer.state.top=i,{type:"blockquote",raw:t[0],tokens:r,text:e}}}list(n){let t=this.rules.block.list.exec(n);if(t){let e=t[1].trim(),i=e.length>1,r={type:"list",raw:"",ordered:i,start:i?+e.slice(0,-1):"",loose:!1,items:[]};e=i?`\\d{1,9}\\${e.slice(-1)}`:`\\${e}`,this.options.pedantic&&(e=i?e:"[*+-]");let s=new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),l="",o="",p=!1;for(;n;){let c=!1;if(!(t=s.exec(n))||this.rules.block.hr.test(n))break;l=t[0],n=n.substring(l.length);let u=t[2].split(`
`,1)[0].replace(/^\t+/,M=>" ".repeat(3*M.length)),h=n.split(`
`,1)[0],f=0;this.options.pedantic?(f=2,o=u.trimStart()):(f=t[2].search(/[^ ]/),f=f>4?1:f,o=u.slice(f),f+=t[1].length);let y=!1;if(!u&&/^ *$/.test(h)&&(l+=h+`
`,n=n.substring(h.length+1),c=!0),!c){let M=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),X=new RegExp(`^ {0,${Math.min(3,f-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),Y=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:\`\`\`|~~~)`),K=new RegExp(`^ {0,${Math.min(3,f-1)}}#`);for(;n;){let Q=n.split(`
`,1)[0];if(h=Q,this.options.pedantic&&(h=h.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),Y.test(h)||K.test(h)||M.test(h)||X.test(n))break;if(h.search(/[^ ]/)>=f||!h.trim())o+=`
`+h.slice(f);else{if(y||u.search(/[^ ]/)>=4||Y.test(u)||K.test(u)||X.test(u))break;o+=`
`+h}!y&&!h.trim()&&(y=!0),l+=Q+`
`,n=n.substring(Q.length+1),u=h.slice(f)}}r.loose||(p?r.loose=!0:/\n *\n *$/.test(l)&&(p=!0));let b=null,$;this.options.gfm&&(b=/^\[[ xX]\] /.exec(o),b&&($=b[0]!=="[ ] ",o=o.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:l,task:!!b,checked:$,loose:!1,text:o,tokens:[]}),r.raw+=l}r.items[r.items.length-1].raw=l.trimEnd(),r.items[r.items.length-1].text=o.trimEnd(),r.raw=r.raw.trimEnd();for(let c=0;c<r.items.length;c++)if(this.lexer.state.top=!1,r.items[c].tokens=this.lexer.blockTokens(r.items[c].text,[]),!r.loose){let u=r.items[c].tokens.filter(f=>f.type==="space"),h=u.length>0&&u.some(f=>/\n.*\n/.test(f.raw));r.loose=h}if(r.loose)for(let c=0;c<r.items.length;c++)r.items[c].loose=!0;return r}}html(n){let t=this.rules.block.html.exec(n);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(n){let t=this.rules.block.def.exec(n);if(t){let e=t[1].toLowerCase().replace(/\s+/g," "),i=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:r}}}table(n){let t=this.rules.block.table.exec(n);if(!t||!/[:|]/.test(t[2]))return;let e=se(t[1]),i=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(e.length===i.length){for(let l of i)/^ *-+: *$/.test(l)?s.align.push("right"):/^ *:-+: *$/.test(l)?s.align.push("center"):/^ *:-+ *$/.test(l)?s.align.push("left"):s.align.push(null);for(let l of e)s.header.push({text:l,tokens:this.lexer.inline(l)});for(let l of r)s.rows.push(se(l,s.header.length).map(o=>({text:o,tokens:this.lexer.inline(o)})));return s}}lheading(n){let t=this.rules.block.lheading.exec(n);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(n){let t=this.rules.block.paragraph.exec(n);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(n){let t=this.rules.block.text.exec(n);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(n){let t=this.rules.inline.escape.exec(n);if(t)return{type:"escape",raw:t[0],text:x(t[1])}}tag(n){let t=this.rules.inline.tag.exec(n);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(n){let t=this.rules.inline.link.exec(n);if(t){let e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;let s=q(e.slice(0,-1),"\\");if((e.length-s.length)%2===0)return}else{let s=$e(t[2],"()");if(s>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){let s=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);s&&(i=s[1],r=s[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(e)?i=i.slice(1):i=i.slice(1,-1)),ie(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(n,t){let e;if((e=this.rules.inline.reflink.exec(n))||(e=this.rules.inline.nolink.exec(n))){let i=(e[2]||e[1]).replace(/\s+/g," "),r=t[i.toLowerCase()];if(!r){let s=e[0].charAt(0);return{type:"text",raw:s,text:s}}return ie(e,r,e[0],this.lexer)}}emStrong(n,t,e=""){let i=this.rules.inline.emStrongLDelim.exec(n);if(!i||i[3]&&e.match(/[\p{L}\p{N}]/u))return;if(!(i[1]||i[2]||"")||!e||this.rules.inline.punctuation.exec(e)){let s=[...i[0]].length-1,l,o,p=s,c=0,u=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*n.length+s);(i=u.exec(t))!=null;){if(l=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!l)continue;if(o=[...l].length,i[3]||i[4]){p+=o;continue}else if((i[5]||i[6])&&s%3&&!((s+o)%3)){c+=o;continue}if(p-=o,p>0)continue;o=Math.min(o,o+p+c);let h=[...i[0]][0].length,f=n.slice(0,s+i.index+h+o);if(Math.min(s,o)%2){let b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}let y=f.slice(2,-2);return{type:"strong",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(n){let t=this.rules.inline.code.exec(n);if(t){let e=t[2].replace(/\n/g," "),i=/[^ ]/.test(e),r=/^ /.test(e)&&/ $/.test(e);return i&&r&&(e=e.substring(1,e.length-1)),e=x(e,!0),{type:"codespan",raw:t[0],text:e}}}br(n){let t=this.rules.inline.br.exec(n);if(t)return{type:"br",raw:t[0]}}del(n){let t=this.rules.inline.del.exec(n);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(n){let t=this.rules.inline.autolink.exec(n);if(t){let e,i;return t[2]==="@"?(e=x(t[1]),i="mailto:"+e):(e=x(t[1]),i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(n){let t;if(t=this.rules.inline.url.exec(n)){let e,i;if(t[2]==="@")e=x(t[0]),i="mailto:"+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0]);e=x(t[0]),t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(n){let t=this.rules.inline.text.exec(n);if(t){let e;return this.lexer.state.inRawBlock?e=t[0]:e=x(t[0]),{type:"text",raw:t[0],text:e}}}},Re=/^(?: *(?:\n|$))+/,ze=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Ae=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,P=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Se=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ce=/(?:[*+-]|\d{1,9}[.)])/,he=k(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,ce).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),j=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ie=/^[^\n]+/,F=/(?!\s*\])(?:\\.|[^\[\]\\])+/,_e=k(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",F).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ce=k(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ce).getRegex(),O="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",N=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ee=k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",N).replace("tag",O).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),pe=k(j).replace("hr",P).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",O).getRegex(),Le=k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",pe).getRegex(),W={blockquote:Le,code:ze,def:_e,fences:Ae,heading:Se,hr:P,html:Ee,lheading:he,list:Ce,newline:Re,paragraph:pe,table:E,text:Ie},re=k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",P).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",O).getRegex(),Pe=z(d({},W),{table:re,paragraph:k(j).replace("hr",P).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",re).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",O).getRegex()}),Be=z(d({},W),{html:k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",N).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:E,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:k(j).replace("hr",P).replace("heading",` *#{1,6} *[^
]`).replace("lheading",he).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()}),ue=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,qe=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,fe=/^( {2,}|\\)\n(?!\s*$)/,Ze=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,B="\\p{P}\\p{S}",ve=k(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,B).getRegex(),Oe=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Me=k(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,B).getRegex(),Qe=k("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,B).getRegex(),De=k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,B).getRegex(),He=k(/\\([punct])/,"gu").replace(/punct/g,B).getRegex(),Ue=k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),je=k(N).replace("(?:-->|$)","-->").getRegex(),Fe=k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",je).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),v=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Ne=k(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",v).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ge=k(/^!?\[(label)\]\[(ref)\]/).replace("label",v).replace("ref",F).getRegex(),ke=k(/^!?\[(ref)\](?:\[\])?/).replace("ref",F).getRegex(),We=k("reflink|nolink(?!\\()","g").replace("reflink",ge).replace("nolink",ke).getRegex(),G={_backpedal:E,anyPunctuation:He,autolink:Ue,blockSkip:Oe,br:fe,code:qe,del:E,emStrongLDelim:Me,emStrongRDelimAst:Qe,emStrongRDelimUnd:De,escape:ue,link:Ne,nolink:ke,punctuation:ve,reflink:ge,reflinkSearch:We,tag:Fe,text:Ze,url:E},Ge=z(d({},G),{link:k(/^!?\[(label)\]\((.*?)\)/).replace("label",v).getRegex(),reflink:k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",v).getRegex()}),D=z(d({},G),{escape:k(ue).replace("])","~|])").getRegex(),url:k(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),Xe=z(d({},D),{br:k(fe).replace("{2,}","*").getRegex(),text:k(D.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()}),Z={normal:W,gfm:Pe,pedantic:Be},C={normal:G,gfm:D,breaks:Xe,pedantic:Ge},m=class a{tokens;options;state;tokenizer;inlineQueue;constructor(n){this.tokens=[],this.tokens.links=Object.create(null),this.options=n||R,this.options.tokenizer=this.options.tokenizer||new S,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={block:Z.normal,inline:C.normal};this.options.pedantic?(t.block=Z.pedantic,t.inline=C.pedantic):this.options.gfm&&(t.block=Z.gfm,this.options.breaks?t.inline=C.breaks:t.inline=C.gfm),this.tokenizer.rules=t}static get rules(){return{block:Z,inline:C}}static lex(n,t){return new a(t).lex(n)}static lexInline(n,t){return new a(t).inlineTokens(n)}lex(n){n=n.replace(/\r\n|\r/g,`
`),this.blockTokens(n,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let e=this.inlineQueue[t];this.inlineTokens(e.src,e.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(n,t=[]){this.options.pedantic?n=n.replace(/\t/g,"    ").replace(/^ +$/gm,""):n=n.replace(/^( *)(\t+)/gm,(l,o,p)=>o+"    ".repeat(p.length));let e,i,r,s;for(;n;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(e=l.call({lexer:this},n,t))?(n=n.substring(e.raw.length),t.push(e),!0):!1))){if(e=this.tokenizer.space(n)){n=n.substring(e.raw.length),e.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(e);continue}if(e=this.tokenizer.code(n)){n=n.substring(e.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+e.raw,i.text+=`
`+e.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(e);continue}if(e=this.tokenizer.fences(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.heading(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.hr(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.blockquote(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.list(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.html(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.def(n)){n=n.substring(e.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+e.raw,i.text+=`
`+e.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[e.tag]||(this.tokens.links[e.tag]={href:e.href,title:e.title});continue}if(e=this.tokenizer.table(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.lheading(n)){n=n.substring(e.raw.length),t.push(e);continue}if(r=n,this.options.extensions&&this.options.extensions.startBlock){let l=1/0,o=n.slice(1),p;this.options.extensions.startBlock.forEach(c=>{p=c.call({lexer:this},o),typeof p=="number"&&p>=0&&(l=Math.min(l,p))}),l<1/0&&l>=0&&(r=n.substring(0,l+1))}if(this.state.top&&(e=this.tokenizer.paragraph(r))){i=t[t.length-1],s&&i.type==="paragraph"?(i.raw+=`
`+e.raw,i.text+=`
`+e.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(e),s=r.length!==n.length,n=n.substring(e.raw.length);continue}if(e=this.tokenizer.text(n)){n=n.substring(e.raw.length),i=t[t.length-1],i&&i.type==="text"?(i.raw+=`
`+e.raw,i.text+=`
`+e.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(e);continue}if(n){let l="Infinite loop on byte: "+n.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(n,t=[]){return this.inlineQueue.push({src:n,tokens:t}),t}inlineTokens(n,t=[]){let e,i,r,s=n,l,o,p;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,l.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;n;)if(o||(p=""),o=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(e=c.call({lexer:this},n,t))?(n=n.substring(e.raw.length),t.push(e),!0):!1))){if(e=this.tokenizer.escape(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.tag(n)){n=n.substring(e.raw.length),i=t[t.length-1],i&&e.type==="text"&&i.type==="text"?(i.raw+=e.raw,i.text+=e.text):t.push(e);continue}if(e=this.tokenizer.link(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.reflink(n,this.tokens.links)){n=n.substring(e.raw.length),i=t[t.length-1],i&&e.type==="text"&&i.type==="text"?(i.raw+=e.raw,i.text+=e.text):t.push(e);continue}if(e=this.tokenizer.emStrong(n,s,p)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.codespan(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.br(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.del(n)){n=n.substring(e.raw.length),t.push(e);continue}if(e=this.tokenizer.autolink(n)){n=n.substring(e.raw.length),t.push(e);continue}if(!this.state.inLink&&(e=this.tokenizer.url(n))){n=n.substring(e.raw.length),t.push(e);continue}if(r=n,this.options.extensions&&this.options.extensions.startInline){let c=1/0,u=n.slice(1),h;this.options.extensions.startInline.forEach(f=>{h=f.call({lexer:this},u),typeof h=="number"&&h>=0&&(c=Math.min(c,h))}),c<1/0&&c>=0&&(r=n.substring(0,c+1))}if(e=this.tokenizer.inlineText(r)){n=n.substring(e.raw.length),e.raw.slice(-1)!=="_"&&(p=e.raw.slice(-1)),o=!0,i=t[t.length-1],i&&i.type==="text"?(i.raw+=e.raw,i.text+=e.text):t.push(e);continue}if(n){let c="Infinite loop on byte: "+n.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return t}},I=class{options;constructor(n){this.options=n||R}code(n,t,e){let i=(t||"").match(/^\S*/)?.[0];return n=n.replace(/\n$/,"")+`
`,i?'<pre><code class="language-'+x(i)+'">'+(e?n:x(n,!0))+`</code></pre>
`:"<pre><code>"+(e?n:x(n,!0))+`</code></pre>
`}blockquote(n){return`<blockquote>
${n}</blockquote>
`}html(n,t){return n}heading(n,t,e){return`<h${t}>${n}</h${t}>
`}hr(){return`<hr>
`}list(n,t,e){let i=t?"ol":"ul",r=t&&e!==1?' start="'+e+'"':"";return"<"+i+r+`>
`+n+"</"+i+`>
`}listitem(n,t,e){return`<li>${n}</li>
`}checkbox(n){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(n){return`<p>${n}</p>
`}table(n,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+n+`</thead>
`+t+`</table>
`}tablerow(n){return`<tr>
${n}</tr>
`}tablecell(n,t){let e=t.header?"th":"td";return(t.align?`<${e} align="${t.align}">`:`<${e}>`)+n+`</${e}>
`}strong(n){return`<strong>${n}</strong>`}em(n){return`<em>${n}</em>`}codespan(n){return`<code>${n}</code>`}br(){return"<br>"}del(n){return`<del>${n}</del>`}link(n,t,e){let i=ne(n);if(i===null)return e;n=i;let r='<a href="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=">"+e+"</a>",r}image(n,t,e){let i=ne(n);if(i===null)return e;n=i;let r=`<img src="${n}" alt="${e}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(n){return n}},L=class{strong(n){return n}em(n){return n}codespan(n){return n}del(n){return n}html(n){return n}text(n){return n}link(n,t,e){return""+e}image(n,t,e){return""+e}br(){return""}},w=class a{options;renderer;textRenderer;constructor(n){this.options=n||R,this.options.renderer=this.options.renderer||new I,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new L}static parse(n,t){return new a(t).parse(n)}static parseInline(n,t){return new a(t).parseInline(n)}parse(n,t=!0){let e="";for(let i=0;i<n.length;i++){let r=n[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){let s=r,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(s.type)){e+=l||"";continue}}switch(r.type){case"space":continue;case"hr":{e+=this.renderer.hr();continue}case"heading":{let s=r;e+=this.renderer.heading(this.parseInline(s.tokens),s.depth,we(this.parseInline(s.tokens,this.textRenderer)));continue}case"code":{let s=r;e+=this.renderer.code(s.text,s.lang,!!s.escaped);continue}case"table":{let s=r,l="",o="";for(let c=0;c<s.header.length;c++)o+=this.renderer.tablecell(this.parseInline(s.header[c].tokens),{header:!0,align:s.align[c]});l+=this.renderer.tablerow(o);let p="";for(let c=0;c<s.rows.length;c++){let u=s.rows[c];o="";for(let h=0;h<u.length;h++)o+=this.renderer.tablecell(this.parseInline(u[h].tokens),{header:!1,align:s.align[h]});p+=this.renderer.tablerow(o)}e+=this.renderer.table(l,p);continue}case"blockquote":{let s=r,l=this.parse(s.tokens);e+=this.renderer.blockquote(l);continue}case"list":{let s=r,l=s.ordered,o=s.start,p=s.loose,c="";for(let u=0;u<s.items.length;u++){let h=s.items[u],f=h.checked,y=h.task,b="";if(h.task){let $=this.renderer.checkbox(!!f);p?h.tokens.length>0&&h.tokens[0].type==="paragraph"?(h.tokens[0].text=$+" "+h.tokens[0].text,h.tokens[0].tokens&&h.tokens[0].tokens.length>0&&h.tokens[0].tokens[0].type==="text"&&(h.tokens[0].tokens[0].text=$+" "+h.tokens[0].tokens[0].text)):h.tokens.unshift({type:"text",text:$+" "}):b+=$+" "}b+=this.parse(h.tokens,p),c+=this.renderer.listitem(b,y,!!f)}e+=this.renderer.list(c,l,o);continue}case"html":{let s=r;e+=this.renderer.html(s.text,s.block);continue}case"paragraph":{let s=r;e+=this.renderer.paragraph(this.parseInline(s.tokens));continue}case"text":{let s=r,l=s.tokens?this.parseInline(s.tokens):s.text;for(;i+1<n.length&&n[i+1].type==="text";)s=n[++i],l+=`
`+(s.tokens?this.parseInline(s.tokens):s.text);e+=t?this.renderer.paragraph(l):l;continue}default:{let s='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return e}parseInline(n,t){t=t||this.renderer;let e="";for(let i=0;i<n.length;i++){let r=n[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){let s=this.options.extensions.renderers[r.type].call({parser:this},r);if(s!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){e+=s||"";continue}}switch(r.type){case"escape":{let s=r;e+=t.text(s.text);break}case"html":{let s=r;e+=t.html(s.text);break}case"link":{let s=r;e+=t.link(s.href,s.title,this.parseInline(s.tokens,t));break}case"image":{let s=r;e+=t.image(s.href,s.title,s.text);break}case"strong":{let s=r;e+=t.strong(this.parseInline(s.tokens,t));break}case"em":{let s=r;e+=t.em(this.parseInline(s.tokens,t));break}case"codespan":{let s=r;e+=t.codespan(s.text);break}case"br":{e+=t.br();break}case"del":{let s=r;e+=t.del(this.parseInline(s.tokens,t));break}case"text":{let s=r;e+=t.text(s.text);break}default:{let s='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return e}},A=class{options;constructor(n){this.options=n||R}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}},H=class{defaults=U();options=this.setOptions;parse=this.#e(m.lex,w.parse);parseInline=this.#e(m.lexInline,w.parseInline);Parser=w;Renderer=I;TextRenderer=L;Lexer=m;Tokenizer=S;Hooks=A;constructor(...n){this.use(...n)}walkTokens(n,t){let e=[];for(let i of n)switch(e=e.concat(t.call(this,i)),i.type){case"table":{let r=i;for(let s of r.header)e=e.concat(this.walkTokens(s.tokens,t));for(let s of r.rows)for(let l of s)e=e.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=i;e=e.concat(this.walkTokens(r.items,t));break}default:{let r=i;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(s=>{let l=r[s].flat(1/0);e=e.concat(this.walkTokens(l,t))}):r.tokens&&(e=e.concat(this.walkTokens(r.tokens,t)))}}return e}use(...n){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(e=>{let i=d({},e);if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let s=t.renderers[r.name];s?t.renderers[r.name]=function(...l){let o=r.renderer.apply(this,l);return o===!1&&(o=s.apply(this,l)),o}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[r.level];s?s.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),i.extensions=t),e.renderer){let r=this.defaults.renderer||new I(this.defaults);for(let s in e.renderer){if(!(s in r))throw new Error(`renderer '${s}' does not exist`);if(s==="options")continue;let l=s,o=e.renderer[l],p=r[l];r[l]=(...c)=>{let u=o.apply(r,c);return u===!1&&(u=p.apply(r,c)),u||""}}i.renderer=r}if(e.tokenizer){let r=this.defaults.tokenizer||new S(this.defaults);for(let s in e.tokenizer){if(!(s in r))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let l=s,o=e.tokenizer[l],p=r[l];r[l]=(...c)=>{let u=o.apply(r,c);return u===!1&&(u=p.apply(r,c)),u}}i.tokenizer=r}if(e.hooks){let r=this.defaults.hooks||new A;for(let s in e.hooks){if(!(s in r))throw new Error(`hook '${s}' does not exist`);if(s==="options")continue;let l=s,o=e.hooks[l],p=r[l];A.passThroughHooks.has(s)?r[l]=c=>{if(this.defaults.async)return Promise.resolve(o.call(r,c)).then(h=>p.call(r,h));let u=o.call(r,c);return p.call(r,u)}:r[l]=(...c)=>{let u=o.apply(r,c);return u===!1&&(u=p.apply(r,c)),u}}i.hooks=r}if(e.walkTokens){let r=this.defaults.walkTokens,s=e.walkTokens;i.walkTokens=function(l){let o=[];return o.push(s.call(this,l)),r&&(o=o.concat(r.call(this,l))),o}}this.defaults=d(d({},this.defaults),i)}),this}setOptions(n){return this.defaults=d(d({},this.defaults),n),this}lexer(n,t){return m.lex(n,t??this.defaults)}parser(n,t){return w.parse(n,t??this.defaults)}#e(n,t){return(e,i)=>{let r=d({},i),s=d(d({},this.defaults),r);this.defaults.async===!0&&r.async===!1&&(s.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),s.async=!0);let l=this.#t(!!s.silent,!!s.async);if(typeof e>"u"||e===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s),s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(e):e).then(o=>n(o,s)).then(o=>s.hooks?s.hooks.processAllTokens(o):o).then(o=>s.walkTokens?Promise.all(this.walkTokens(o,s.walkTokens)).then(()=>o):o).then(o=>t(o,s)).then(o=>s.hooks?s.hooks.postprocess(o):o).catch(l);try{s.hooks&&(e=s.hooks.preprocess(e));let o=n(e,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let p=t(o,s);return s.hooks&&(p=s.hooks.postprocess(p)),p}catch(o){return l(o)}}}#t(n,t){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let i="<p>An error occurred:</p><pre>"+x(e.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(e);throw e}}},T=new H;function g(a,n){return T.parse(a,n)}g.options=g.setOptions=function(a){return T.setOptions(a),g.defaults=T.defaults,le(g.defaults),g};g.getDefaults=U;g.defaults=R;g.use=function(...a){return T.use(...a),g.defaults=T.defaults,le(g.defaults),g};g.walkTokens=function(a,n){return T.walkTokens(a,n)};g.parseInline=T.parseInline;g.Parser=w;g.parser=w.parse;g.Renderer=I;g.TextRenderer=L;g.Lexer=m;g.lexer=m.lex;g.Tokenizer=S;g.Hooks=A;g.parse=g;var Ye=g.options,Ke=g.setOptions,Ve=g.use,Je=g.walkTokens,et=g.parseInline;var tt=w.parse,nt=m.lex;var _=function(a){return a.SUMMARIZE="SUMMARIZE",a.PARAPHRASE="PARAPHRASE",a.KEYWORDS="KEYWORDS",a.CHATBOT="CHATBOT",a.VOICE="VOICE",a}(_||{});var ct=(()=>{let n=class n{constructor(e){this.httpClient=e,this.baseURL="/kaizen/v1"}summarizeText(e){return this.httpClient.post(`${this.baseURL}/summarize`,e)}extractKeywords(e){return this.httpClient.post(`${this.baseURL}/keywords`,e)}getTaskGuide(e){return this.httpClient.post(`${this.baseURL}/task-guide`,e)}paraphraseText(e){return this.httpClient.post(`${this.baseURL}/paraphrase`,e)}promptChatbot(e){return this.httpClient.post(`${this.baseURL}/chatbot`,e)}getKaizenResponse(e,i){switch(i){case _.CHATBOT:return this.promptChatbot(e);case _.KEYWORDS:return this.extractKeywords(e);case _.SUMMARIZE:return this.summarizeText(e);case _.PARAPHRASE:return this.paraphraseText(e);default:return}}};n.\u0275fac=function(i){return new(i||n)(J(ee))},n.\u0275prov=V({token:n,factory:n.\u0275fac,providedIn:"root"});let a=n;return a})();export{g as a,_ as b,ct as c};
