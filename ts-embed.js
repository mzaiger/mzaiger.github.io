/* ts-embed.js: put this file in the ROOT of the marcitech.is-a.dev base repo, then load it from each site (one line, or from a shared file):
     <script src="/ts-embed.js"></script>
   It does nothing unless the page is opened inside Trendslope. Inside Trendslope it
   1) says hello, so Trendslope knows this site can cooperate,
   2) leaves room at the top of the page for Trendslope's banner (Trendslope sends how much), and
   3) reports how far the page has scrolled, so the banner can slide away with it.
   The page keeps scrolling by itself inside its frame, so its own sticky bars, popups and fixed buttons all keep working normally. */
(()=>{
if(window.parent===window)return;
const ALLOWED=['https://www.trendslope.com','https://trendslope.com','https://marcitech.is-a.dev'];
let po='';try{po=(location.ancestorOrigins&&location.ancestorOrigins[0])||new URL(document.referrer).origin}catch{}
if(!ALLOWED.includes(po))return;
const de=document.documentElement,post=m=>{try{parent.postMessage(Object.assign({tsEmbed:1},m),po)}catch{}};
de.classList.add('ts-embedded');
post({type:'hello'});

// scroll position -> Trendslope. Read every frame while the page is moving (iOS can delay scroll events), send only when it changed.
let lastY=-1,run=0,still=0;
const y=()=>Math.max(0,Math.round(window.scrollY||de.scrollTop||(document.body&&document.body.scrollTop)||0));
const loop=()=>{const v=y();if(v!==lastY){lastY=v;still=0;post({type:'scroll',y:v})}else if(++still>12){run=0;return}requestAnimationFrame(loop)};
addEventListener('scroll',()=>{if(!run){run=1;still=0;requestAnimationFrame(loop)}},{passive:true});
addEventListener('pageshow',()=>{lastY=-1;post({type:'hello'})});

// room for Trendslope's banner, which sits over the top of the frame
addEventListener('message',e=>{
 if(e.origin!==po||e.source!==parent)return;const m=e.data;if(!m||m.tsEmbed!==1)return;
 if(m.type==='pad'){const tg=m.onBody?document.body:de;if(!tg)return;
  if(tg._tsBase===undefined)tg._tsBase=parseFloat(getComputedStyle(tg).paddingTop)||0;
  tg.style.paddingTop=(tg._tsBase+(m.px||0))+'px';
  lastY=-1;if(!run){run=1;still=0;requestAnimationFrame(loop)}   // re-send the scroll position after the padding changes
 }
});
})();
