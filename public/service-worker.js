if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,t)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let n={};const f=e=>r(e,o),d={module:{uri:o},exports:n,require:f};s[o]=Promise.all(i.map((e=>d[e]||f(e)))).then((e=>(t(...e),n)))}}define(["./workbox-791ba835"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets.js",revision:"334a5a716b49b9e1f35cc569f18067e5"},{url:"leaderboard.js",revision:"3a61a9c0194f13888d24f154fa6d236f"},{url:"leaderboard.js.LICENSE.txt",revision:"360ff95233be7ab39f74511fd9ead68c"},{url:"main.js",revision:"a954374edd1e1f23907cea9e72e02d8b"},{url:"main.js.LICENSE.txt",revision:"360ff95233be7ab39f74511fd9ead68c"}],{})}));
