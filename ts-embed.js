/* ts-embed.js: put this file in the ROOT of the marcitech.is-a.dev base repo, then add one line to each site:
     <script src="/ts-embed.js"></script>
   It does nothing unless the page is opened inside Trendslope. Inside Trendslope it tells the parent how tall the page is,
   so Trendslope can size the frame to the content and let the *top-level page* scroll (that is what makes Safari's bars collapse
   and lets the page run underneath them). Sites without this line keep working with the fixed full-screen frame. */
(()=>{
if(window.parent===window)return;
const ALLOWED=['https://www.trendslope.com','https://trendslope.com','https://marcitech.is-a.dev'];
let po='';try{po=(location.ancestorOrigins&&location.ancestorOrigins[0])||new URL(document.referrer).origin}catch{}
if(!ALLOWED.includes(po))return;
const de=document.documentElement,post=m=>{try{parent.postMessage(Object.assign({tsEmbed:1},m),po)}catch{}};
de.classList.add('ts-embedded');
post({type:'hello'});

// position:sticky only works inside the thing that scrolls. Here the frame doesn't scroll (Trendslope's page does), so sticky bars
// (like the filters) are held in place by hand: nudged down by exactly as much as the page has scrolled past them.
let vt=0;const stk=new Set();let scanT=0;
const scan=()=>{scanT=0;stk.clear();for(const el of document.body?document.body.querySelectorAll('*'):[]){try{if(getComputedStyle(el).position==='sticky')stk.add(el)}catch{}}applySticky()};
const schedScan=()=>{if(!scanT)scanT=setTimeout(scan,400)};
const applySticky=()=>{for(const el of stk){if(!el.isConnected){stk.delete(el);continue}
 const cs=getComputedStyle(el),T=parseFloat(cs.top)||0,prev=el._tsY||0,r=el.getBoundingClientRect(),natural=r.top+(window.scrollY||0)-prev;
 let y=Math.max(natural,vt+T);const par=el.parentElement;
 if(par){const pr=par.getBoundingClientRect(),pcs=getComputedStyle(par),lim=pr.bottom+(window.scrollY||0)-(parseFloat(pcs.paddingBottom)||0)-(parseFloat(pcs.borderBottomWidth)||0)-r.height-(parseFloat(cs.marginBottom)||0);y=Math.min(y,lim)}
 y=Math.max(y,natural);const d=Math.round(y-natural);
 if(d!==prev){el.style.transform=d?'translateY('+d+'px)':'';el._tsY=d}}};

// how tall is the content? (body box, so a taller frame can't keep itself tall)
let last=0,raf=0;
const measure=()=>{const b=document.body;if(!b)return 0;const r=b.getBoundingClientRect(),cs=getComputedStyle(b);
 return Math.ceil(r.bottom+(window.scrollY||0)+(parseFloat(cs.marginBottom)||0))};
const report=()=>{raf=0;const h=measure();if(h>0&&Math.abs(h-last)>=1){last=h;post({type:'height',h})}};
const sched=()=>{if(!raf)raf=requestAnimationFrame(report);schedScan()};
const start=()=>{
 sched();
 try{const ro=new ResizeObserver(sched);ro.observe(de);ro.observe(document.body)}catch{}
 try{new MutationObserver(rs=>{if(rs.every(r=>r.type==='attributes'&&r.attributeName==='style'&&r.target._tsY!==undefined))return;sched()}).observe(document.body,{childList:true,subtree:true,attributes:true})}catch{}   // (ignore our own sticky nudges)
 addEventListener('load',sched);addEventListener('resize',sched);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sched);
 setTimeout(sched,300);setTimeout(sched,1500);
};
document.readyState==='loading'?addEventListener('DOMContentLoaded',start):start();

// where the screen is inside this tall frame. For anything that is position:fixed, use these:
//   --ts-vt = px from the top of the page to the top of the visible screen, --ts-vh = visible height in px
addEventListener('message',e=>{
 if(e.origin!==po||e.source!==parent)return;const m=e.data;if(!m||m.tsEmbed!==1)return;
 if(m.type==='pad'){const tg=m.onBody?document.body:de;if(!tg)return;if(tg._tsBase===undefined)tg._tsBase=parseFloat(getComputedStyle(tg).paddingTop)||0;tg.style.paddingTop=(tg._tsBase+(m.px||0))+'px';sched()}   // room for Trendslope's banner, which sits over the top of the frame
 if(m.type==='vp'){vt=m.top||0;de.style.setProperty('--ts-vt',vt+'px');applySticky();de.style.setProperty('--ts-vh',(m.height||0)+'px')}
});
})();
