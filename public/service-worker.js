if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,t)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let n={};const d=e=>r(e,o),f={module:{uri:o},exports:n,require:d};s[o]=Promise.all(i.map((e=>f[e]||d(e)))).then((e=>(t(...e),n)))}}define(["./workbox-791ba835"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets.js",revision:"7113fc6078c94ab36984fd1820caa45b"},{url:"leaderboard.js",revision:"c3e785e3cdb18f0a4e8e95b477946537"},{url:"leaderboard.js.LICENSE.txt",revision:"360ff95233be7ab39f74511fd9ead68c"},{url:"main.js",revision:"54254ad6b3d0c3d32e3d93b2a0628102"},{url:"main.js.LICENSE.txt",revision:"360ff95233be7ab39f74511fd9ead68c"}],{})}));
