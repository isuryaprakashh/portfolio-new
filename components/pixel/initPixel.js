// Behaviour for the pixel home. Ported from the published single-file design; content lives in markup.js.
// initPixel(root) wires up the .px element rendered from MARKUP and returns a cleanup that removes every
// listener, observer, animation loop, timer and pending fetch write, so it can run again on the same DOM
// (StrictMode runs effects twice in dev) or on a fresh mount (client-side navigation back home).
// Call it from useLayoutEffect: both canvases are sized and drawn synchronously, so the art is in the very
// first frame the browser paints. Everything else waits for an idle callback.
import { PROJECTS as P, stackIcon, SNAP_KEY, EXT, QUOTE_TEXT } from './markup';

// Built scenes live at module scope, so they survive client-side navigation (not a reload).
var CACHE={scn:null,md:null,posts:null};
var LEGACY_KEYS=['px_art_night','px_art_sky_day','px_art_sky_dawn','px_art_sky_dusk','px_art_sky_night'];

export default function initPixel(root){
if(!root)return function(){};
var dead=false,ac=new AbortController(),SIG=ac.signal,TS=new Set(),RS=new Set(),IVS=[],OBS=[];
function on(el,ev,fn,o){if(el)el.addEventListener(ev,fn,o?Object.assign({signal:SIG},o):{signal:SIG})}
function T(fn,ms){var id=setTimeout(function(){TS.delete(id);if(!dead)fn()},ms);TS.add(id);return id}
function CT(id){clearTimeout(id);TS.delete(id)}
function RAF(cb){if(dead)return 0;var id=requestAnimationFrame(function(n){RS.delete(id);if(!dead)cb(n)});RS.add(id);return id}
function CRAF(id){cancelAnimationFrame(id);RS.delete(id)}
function IV(fn,ms){var id=setInterval(function(){if(!dead)fn()},ms);IVS.push(id);return id}
function IO(el,cb,o){if(!el)return;var ob=new IntersectionObserver(cb,o);ob.observe(el);OBS.push(ob)}
function RO(els,cb){if(!window.ResizeObserver){on(window,'resize',cb);return}var ob=new ResizeObserver(cb);els.forEach(function(el){ob.observe(el)});OBS.push(ob)}
function idle(fn){var w=function(){if(!dead)fn()};if(window.requestIdleCallback)window.requestIdleCallback(w,{timeout:1500});else RAF(function(){T(w,0)})}
// runs fn every ms while the tab is visible, and catches up when it becomes visible again
function poll(fn,ms,now){var last=Date.now();function run(force){if(document.hidden||(!force&&Date.now()-last<ms-1000))return;last=Date.now();fn()}
  if(now)run(true);IV(function(){run(false)},ms);on(document,'visibilitychange',function(){if(!document.hidden&&Date.now()-last>=ms)run(true)})}
function $(id){return root.querySelector('#'+id)}
function byId(id){return P.filter(function(x){return x.id===id})[0]}

var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,dark=matchMedia('(prefers-color-scheme: dark)');
var hrNow=new Date().getHours()+new Date().getMinutes()/60;
// time of day + snapshot keys: keep in sync with snapshot() in markup.js
var TOD=hrNow>=5&&hrNow<8.5?'dawn':hrNow>=8.5&&hrNow<17?'day':hrNow>=17&&hrNow<19.3?'dusk':'night';
function snapKey(kind){return SNAP_KEY+kind+':'+TOD+(kind==='meadow'?(dark.matches?':dark':':light'):'')}
var dlg=$('dlg');

/* ---------- dot-matrix engine ---------- */
var BAY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function hash(x,y){var h=(x*374761393+y*668265263)|0;h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967295}
function vnoise(x,y){var xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;var u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  var a=hash(xi,yi),b=hash(xi+1,yi),c=hash(xi,yi+1),d=hash(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
function fbm(x,y){return vnoise(x,y)*.6+vnoise(x*2.1,y*2.1)*.28+vnoise(x*4.3,y*4.3)*.12}
function bay(x,y){return (BAY[(y&3)*4+(x&3)]+.5)/16}
function hx(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function unsnap(el){if(el&&el.hasAttribute('data-snap')){el.removeAttribute('data-snap');el.style.removeProperty('--snap')}}

/* ---------- header: a pixel garden, painted in code ---------- */
var sky=$('sky'),sc=$('skyC'),frame=sc.parentNode,S={},SCN=null;
var PALS={
 day:{top:'#3F97D6',bot:'#A8D7EF',cl:'#FFFFFF',cs:'#C9DFEC',mul:[1,1,1]},
 dawn:{top:'#E89A7A',bot:'#FBDDBF',cl:'#FFF3E4',cs:'#EBB9A2',mul:[1.06,.93,.88]},
 dusk:{top:'#C8684F',bot:'#F4BB84',cl:'#FFE0BE',cs:'#D2917C',mul:[1.08,.82,.7]},
 night:{top:'#0C1633',bot:'#283A68',cl:'#46557E',cs:'#2E3B60',mul:[.34,.42,.62]}};
var PAL=PALS[TOD];

var G4=['#1E4A2A','#2C6B33','#4A9A3E','#8DC955'].map(hx),G4B=['#1B3B30','#26553A','#3C7A45','#6AA35A'].map(hx);
var STONE=['#E6DEC7','#C6BA9C','#958A70','#3D3527'].map(hx),GOLD=hx('#E2B85A'),BROWN=hx('#5A3E2A'),PATH=hx('#EAD39A'),DIRT=hx('#B98F3E');
var FLOW=['#F08A3C','#EE6B8F','#F7F0DC','#F6C945','#E04A3A'].map(hx);
function buildScene(W,H){
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;var cx=cv.getContext('2d'),img=cx.createImageData(W,H),d=img.data,m0=PAL.mul[0],m1=PAL.mul[1],m2=PAL.mul[2];
  function put(x,y,c,a){x|=0;y|=0;if(x<0||y<0||x>=W||y>=H)return;var i=(y*W+x)*4;d[i]=Math.min(255,c[0]*m0);d[i+1]=Math.min(255,c[1]*m1);d[i+2]=Math.min(255,c[2]*m2);d[i+3]=a==null?255:a}
  var gy=Math.round(H*.84),u=H/100;
  // ground and path
  for(var y=gy;y<H;y++)for(var x=0;x<W;x++){var pw=(6+(y-gy)*1.6)*u,onPath=Math.abs(x-W/2)<pw;var n=vnoise(x*.3,y*.3);
    put(x,y,onPath?(n+bay(x,y)*.4>.75?STONE[1]:PATH):(n+bay(x,y)*.5>.8?DIRT:GOLD))}
  function crown(cx0,cy0,r,pal,seed,squash){
    for(var y=Math.floor(cy0-r*1.3);y<=cy0+r*1.1;y++)for(var x=Math.floor(cx0-r*1.3);x<=cx0+r*1.3;x++){
      var dx=(x-cx0)/r,dy=(y-cy0)/(r*(squash||1)),dd=Math.sqrt(dx*dx+dy*dy),e=fbm(x*.22+seed,y*.22+seed*.7)*.5;
      if(dd>.72+e)continue;
      var l=(-dx*.55-dy*.75)*.5+.5,c=vnoise(x*.4+seed*3,y*.4)*.55,v=l*.62+c*.5-dd*.22+(bay(x,y)-.5)*.18;
      put(x,y,pal[v<.28?0:v<.5?1:v<.72?2:3])}}
  function cypress(cx0,base,h,w,seed){for(var y=base-h;y<=base;y++){var f=(y-(base-h))/h,hw=w*Math.sqrt(Math.min(1,f*1.6))*(1-f*.15);
    for(var x=Math.floor(cx0-hw-1);x<=cx0+hw+1;x++){var dx=(x-cx0)/(hw||1),e=vnoise(x*.5+seed,y*.5)*.5;if(Math.abs(dx)>.85+e*.4)continue;
      var v=(-dx*.5+.5)*.6+vnoise(x*.6+seed,y*.35)*.5+(bay(x,y)-.5)*.2;put(x,y,G4[v<.35?0:v<.55?1:v<.75?2:3])}}}
  var rnd=function(i){return hash(i,977)};
  // distant tree line
  for(var i=0;i<Math.ceil(W/(14*u))+2;i++){var x0=i*14*u+rnd(i)*8*u-6*u;crown(x0,gy-(26+rnd(i+50)*14)*u,(13+rnd(i+90)*8)*u,G4B,i*3.1,1.05)}
  // understory, so no sky shows near the ground
  for(var x=0;x<W;x++){var tp=gy-(22+vnoise(x*.07,9.1)*14)*u;for(var y=Math.floor(tp);y<gy;y++){var v=vnoise(x*.35,y*.35)*.7+(y-tp)/(gy-tp)*-.3+(bay(x,y)-.5)*.2;put(x,y,G4B[v<.25?0:v<.45?1:2])}}
  // cypresses
  [[.13,52,7],[.79,60,8],[.88,46,6],[.27,40,5]].forEach(function(c,k){cypress(W*c[0],gy+2,c[1]*u,c[2]*u,k*7.3)});
  // big side trees
  [[.04,30,24],[.2,24,18],[.64,28,20],[.95,34,26],[.36,20,13],[.72,18,12]].forEach(function(c,k){var x0=W*c[0],cy=gy-c[1]*u;
    for(var y=cy;y<gy;y++){put(x0,y,BROWN);if(c[2]>20)put(x0+1,y,BROWN)}crown(x0,cy-c[2]*u*.2,c[2]*u,G4,k*5.7+2,.95)});
  // pavilion (mandapam)
  var px=Math.round(W/2),s=u*1.25,base=gy+2;
  function blk(x,y,w,h,shadeRight){x=Math.round(x);y=Math.round(y);w=Math.round(w);h=Math.max(1,Math.round(h));for(var j=0;j<h;j++)for(var k=0;k<w;k++){var c=j===0?STONE[0]:(k>=w-Math.max(1,Math.round(w*.18)))&&shadeRight?STONE[2]:STONE[1];put(x+k,y+j,c)}return {x:x,y:y,w:w,h:h}}
  var sw=[38,32,26];for(var k=0;k<3;k++)blk(px-sw[k]*s/2,base-(k+1)*2*s,sw[k]*s,2*s,1);
  var top=base-6*s,ph=16*s,pil=[-10,-4,3,9];
  for(var y=top-ph;y<top;y++)for(var x=px-11*s;x<px+11*s;x++)put(x,y,STONE[3]);
  pil.forEach(function(o){var x0=Math.round(px+o*s),pw=Math.max(2,Math.round(2*s));for(var y=top-ph;y<top;y++){put(x0,y,STONE[0]);for(var q=1;q<pw;q++)put(x0+q,y,q===pw-1?STONE[2]:STONE[1])}
    blk(x0-s,top-ph,4*s,s,1)});
  blk(px-14*s,top-ph-2*s,28*s,2*s,1);var tiers=[22,17,12,7];
  tiers.forEach(function(w,k){blk(px-w*s/2,top-ph-(4+k*2)*s,w*s,2*s,1)});
  var tt=top-ph-12*s;for(var j=0;j<3*s;j++)for(var k=-s;k<=s;k++)put(px+k,tt-j-1,j>=2*s?GOLD:STONE[1]);put(px,tt-3*s-1,GOLD);
  // shrubs + flowers along the ground
  for(var i=0;i<Math.ceil(W/(7*u));i++){var x0=i*7*u+rnd(i+300)*5*u,r=(3+rnd(i+400)*4)*u;if(Math.abs(x0-W/2)<22*u)r*=.6;
    crown(x0,gy+r*.3,r,G4,i*1.7+40,.8);
    for(var q=0;q<r*1.6;q++){var fx=x0+(rnd(i*31+q)-.5)*r*1.8,fy=gy+r*.3-rnd(i*17+q+5)*r*.9;put(fx,fy,FLOW[Math.floor(rnd(i*7+q)*FLOW.length)])}}
  cx.putImageData(img,0,0);return {cv:cv,gy:gy,u:u}}

// The sky behind the scene is cached in an offscreen canvas and recomposited only when the clouds have
// drifted a whole pixel (~1.6x a second) or the sun/moon moves (once a minute). Cloud noise is kept per
// column in a ring buffer, so a drift step computes one new column instead of the whole sky.
var birds=[],flies=[],flutter=[],stars=[];
function cloudCol(buf,c,slot){var W=S.W,gy=SCN.gy,sx=W*.085+6,sy=gy*.16+3;
  for(var y=0;y<gy;y++){var m=Math.max(0,1-Math.max(0,y/gy-.15)/.5);buf[y*W+slot]=m>0?fbm(c/sx,y/sy)*m:0}}
// backing-store size: ~3 CSS px per art pixel (2.4 on small screens)
function dims(cv,minH){var r=cv.getBoundingClientRect(),PX=r.width<600?2.4:3;return {r:r,W:Math.max(80,Math.round(r.width/PX)),H:Math.max(minH,Math.round(r.height/PX))}}
function skyKey(d){return d.W+'x'+d.H+':'+TOD}
function initScene(){
  var d=dims(sc,40),r=d.r;if(!r.width||!r.height)return false;
  var W=d.W,H=d.H,key=skyKey(d);
  S.cw=r.width;S.ch=r.height;S.W=W;S.H=H;sc.width=W;sc.height=H;S.c=sc.getContext('2d');S.c.imageSmoothingEnabled=false;
  if(!CACHE.scn||CACHE.scn.key!==key)CACHE.scn={key:key,val:buildScene(W,H)};SCN=CACHE.scn.val;
  var gy=SCN.gy;S.sky=document.createElement('canvas');S.sky.width=W;S.sky.height=gy;S.sx=S.sky.getContext('2d');S.img=S.sx.createImageData(W,gy);
  S.base=new Uint8ClampedArray(W*gy*3);S.CL=hx(PAL.cl);S.CS=hx(PAL.cs);S.mn=-1;S.k=-1;
  if(!SCN.cl0){SCN.cl0=new Float64Array(W*gy);for(var x=0;x<W;x++)cloudCol(SCN.cl0,x,x)}
  S.cl=SCN.cl0.slice();S.cc=new Int32Array(W);for(var x=0;x<W;x++)S.cc[x]=x;
  birds=[];for(var i=0;i<(TOD==='night'?0:3);i++)birds.push({x:Math.random()*W,y:H*(.08+Math.random()*.25),v:.12+Math.random()*.12,ph:Math.random()*6});
  flies=[];if(TOD==='night')for(var i=0;i<18;i++)flies.push({x:Math.random()*W,y:gy-Math.random()*H*.35,ph:Math.random()*6});
  flutter=[];if(TOD==='day'||TOD==='dawn')for(var i=0;i<3;i++)flutter.push({x:Math.random()*W,y:gy-2,ph:Math.random()*6,c:'rgb('+FLOW[i].join(',')+')'});
  stars=[];if(TOD==='night')for(var i=0;i<W*.35;i++)stars.push({x:Math.random()*W,y:Math.random()*gy*.8,ph:Math.random()*6});
  S.ok=true;return true}
function skyBase(){var W=S.W,H=S.H,gy=SCN.gy,b=S.base,A=hx(PAL.top),B=hx(PAL.bot),night=TOD==='night';
  var hf=new Date().getHours()+new Date().getMinutes()/60;
  var uu=night?((hf+5)%24)/11:(hf-6)/13;uu=Math.min(1,Math.max(0,uu));var ox=W*(.1+uu*.8),oy=gy*(.62-Math.sin(uu*Math.PI)*.48),orr=Math.max(3,H*.055);
  for(var y=0;y<gy;y++){var f=y/gy;for(var x=0;x<W;x++){var j=(y*W+x)*3,bb=bay(x,y);
    var q=Math.floor(f*5+bb)/5,c0=A[0]+(B[0]-A[0])*q,c1=A[1]+(B[1]-A[1])*q,c2=A[2]+(B[2]-A[2])*q;
    var dd=Math.hypot(x-ox,y-oy);
    if(night){if(dd<orr&&Math.hypot(x-ox-orr*.45,y-oy+orr*.3)>orr*.85){c0=246;c1=239;c2=210}}
    else if(dd<orr){if(dd<orr*.6){c0=255;c1=250;c2=228}else{c0=255;c1=226;c2=140}}
    else if(dd<orr*2.2&&(1-(dd-orr)/(orr*1.2))*.6>bb){c0=c0+(255-c0)*.35;c1=c1+(240-c1)*.35;c2=c2+(200-c2)*.3}
    b[j]=c0;b[j+1]=c1;b[j+2]=c2}}}
function skyCompose(k){var W=S.W,gy=SCN.gy,d=S.img.data,b=S.base,cl=S.cl,cc=S.cc,CL=S.CL,CS=S.CS;
  for(var x=0;x<W;x++){var c=x+k,sl=c%W;if(cc[sl]!==c){cc[sl]=c;cloudCol(cl,c,sl)}}
  for(var y=0;y<gy;y++){var row=y*W;for(var x=0;x<W;x++){var p=row+x,i=p*4,n=cl[row+(x+k)%W],bb=bay(x,y),col=null;
    if(n>.5)col=n>.56||bb>.45?CL:CS;else if(n>.47&&bb>.6)col=CS;
    if(col){d[i]=col[0];d[i+1]=col[1];d[i+2]=col[2]}else{var j=p*3;d[i]=b[j];d[i+1]=b[j+1];d[i+2]=b[j+2]}d[i+3]=255}}
  S.sx.putImageData(S.img,0,0)}
// fs = elapsed time in 60fps frames, so sprites move at the same speed whatever the frame rate
function drawSky(t,fs){
  if(!S.ok)return;fs=fs||1;var W=S.W,H=S.H,c=S.c,night=TOD==='night',mn=Math.floor(Date.now()/60000),k=Math.floor(t*1.6);
  if(mn!==S.mn){S.mn=mn;skyBase();S.k=-1}
  if(k!==S.k){S.k=k;skyCompose(k)}
  c.drawImage(S.sky,0,0);
  if(stars.length){c.fillStyle='#F6EFD2';stars.forEach(function(s){c.globalAlpha=.3+.7*(Math.sin(t*1.7+s.ph)*.5+.5);c.fillRect(s.x|0,s.y|0,1,1)});c.globalAlpha=1}
  c.drawImage(SCN.cv,0,0);
  c.fillStyle=night?'#cfd6e8':'#2B2620';
  var dv=Math.pow(.985,fs);
  birds.forEach(function(b){b.x+=b.v*fs;if(b.vy){b.y+=b.vy*fs;b.vy*=dv}if(b.x>W+4){b.x=-4;b.y=H*(.08+Math.random()*.25);b.vy=0}
    var up=Math.sin(t*8+b.ph)>0,x=b.x|0,y=b.y|0;c.fillRect(x,y,1,1);c.fillRect(x-1,y+(up?-1:0),1,1);c.fillRect(x+1,y+(up?-1:0),1,1);c.fillRect(x-2,y+(up?-1:1),1,1);c.fillRect(x+2,y+(up?-1:1),1,1)});
  flies.forEach(function(f){f.x+=Math.sin(t*.7+f.ph)*.08*fs;f.y+=Math.cos(t*.9+f.ph*1.3)*.05*fs;var a=.5+.5*Math.sin(t*2.4+f.ph);
    c.globalAlpha=a*.35;c.fillStyle='#F7E27A';c.fillRect((f.x|0)-1,(f.y|0)-1,3,3);c.globalAlpha=a;c.fillStyle='#FFF6B0';c.fillRect(f.x|0,f.y|0,1,1)});c.globalAlpha=1;
  flutter.forEach(function(f){f.x+=(Math.sin(t*.6+f.ph)*.18+.02)*fs;f.y=SCN.gy-6-Math.abs(Math.sin(t*1.3+f.ph))*8;if(f.x>W)f.x=0;
    var o=Math.sin(t*14+f.ph)>0;c.fillStyle=f.c;c.fillRect(f.x|0,f.y|0,1,1);if(o){c.fillRect((f.x|0)-1,(f.y|0)-1,1,1);c.fillRect((f.x|0)+1,(f.y|0)-1,1,1)}});}

/* ---------- footer: a meadow, someone at a desk, working ---------- */
var nv=$('night'),nc=$('nightC'),N={},MD=null,gust=0,mPaused=false,mDirty=false;
var MPAL={day:{top:'#6FB2DE',bot:'#CFE7F2',hill:'#8FB5A4',g:['#3F8A2E','#52A33A','#6DBA45','#93D15C']},
 dawn:{top:'#7FA3C9',bot:'#F6C9A2',hill:'#9AA59A',g:['#3C7F35','#4F9640','#69AD4B','#8CC461']},
 dusk:{top:'#3A6E8C',bot:'#F5B256',hill:'#4E6656',g:['#3A7A34','#4B9240','#62A84A','#86C05C']},
 night:{top:'#14254D',bot:'#33508A',hill:'#2A3F55',g:['#22502F','#2D643A','#3B7A47','#509459']}}[TOD];
function buildMeadow(W,H,bg){
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;var x2=cv.getContext('2d'),img=x2.createImageData(W,H),d=img.data;
  function put(x,y,c){x|=0;y|=0;if(x<0||y<0||x>=W||y>=H)return;var i=(y*W+x)*4;d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=255}
  var hz=Math.round(H*.3),A=hx(MPAL.top),B=hx(MPAL.bot),HL=hx(MPAL.hill),G=MPAL.g.map(hx),PG=hx(bg);
  // sky
  for(var y=0;y<hz;y++)for(var x=0;x<W;x++){var q=Math.floor(Math.pow(y/hz,1.3)*6+bay(x,y))/6;put(x,y,[A[0]+(B[0]-A[0])*q,A[1]+(B[1]-A[1])*q,A[2]+(B[2]-A[2])*q])}
  // far hills
  for(var x=0;x<W;x++){var hh=hz-(2+fbm(x*.03,4.2)*7);for(var y=Math.floor(hh);y<hz+1;y++)put(x,y,HL)}
  // meadow base: bands get brighter toward the viewer, with dithered blades
  for(var y=hz;y<H;y++){var f=(y-hz)/(H-hz);for(var x=0;x<W;x++){var n=vnoise(x*.25,y*.5)*.5+vnoise(x*.06,y*.12)*.5,v=f*.75+n*.45+(bay(x,y)-.5)*.3;put(x,y,G[v<.35?0:v<.6?1:v<.85?2:3])}}
  // torn paper edge at the top, in the page colour
  var paper=Math.round(H*.1);
  for(var x=0;x<W;x++){var e=paper+fbm(x*.045,1.7)*H*.12+vnoise(x*.6,3)*2;for(var y=0;y<e;y++){var g=vnoise(x*.9,y*.9)*6-3;put(x,y,[PG[0]+g,PG[1]+g,PG[2]+g])}put(x,Math.floor(e),[PG[0]-28,PG[1]-28,PG[2]-24]);if(vnoise(x*.7,8)>.55)put(x,Math.floor(e)+1,[PG[0]-14,PG[1]-14,PG[2]-12])}
  x2.putImageData(img,0,0);
  return {cv:cv,hz:hz,paper:paper,GS:G.map(function(g){return 'rgb('+g.join(',')+')'})}}
// the torn edge is painted in the page colour, so light and dark get separate scenes
function pageBg(){return getComputedStyle(root).getPropertyValue('--bg').trim()||'#FAFAF9'}
function meadowKey(d,bg){return d.W+'x'+d.H+':'+TOD+':'+bg}
function initMeadow(){
  var d=dims(nc,60),r=d.r;if(!r.width||!r.height)return false;
  var W=d.W,H=d.H,bg=pageBg(),key=meadowKey(d,bg);
  N.cw=r.width;N.ch=r.height;N.W=W;N.H=H;nc.width=W;nc.height=H;N.c=nc.getContext('2d');N.c.imageSmoothingEnabled=false;
  if(!CACHE.md||CACHE.md.key!==key)CACHE.md={key:key,val:buildMeadow(W,H,bg)};MD=CACHE.md.val;
  var hz=MD.hz,paper=MD.paper;
  // the figure + desk, placed low-centre; blades in front of it (y > fy) are drawn after it
  N.fx=Math.round(W*.5);N.fy=Math.round(H*.86);
  var bl=[];for(var i=0;i<W*1.4;i++){var y=hz+Math.pow(Math.random(),.6)*(H-hz);bl.push({x:Math.random()*W,y:y,h:1+Math.round((y-hz)/(H-hz)*3),c:Math.random()<.5?3:2,ph:Math.random()*6})}
  bl.sort(function(a,b){return a.y-b.y});N.bb=bl.filter(function(b){return b.y<=N.fy});N.bf=bl.filter(function(b){return b.y>N.fy});
  N.flies=[];if(TOD==='night'||TOD==='dusk')for(var i=0;i<14;i++)N.flies.push({x:Math.random()*W,y:hz+Math.random()*(H-hz)*.8,ph:Math.random()*6});
  N.st=[];if(TOD==='night')for(var i=0;i<W*.25;i++)N.st.push({x:Math.random()*W,y:paper+H*.12+Math.random()*(hz-paper-H*.15),ph:Math.random()*6});
  N.ok=true;return true}
function drawNight(t,fs){
  if(!N.ok)return;fs=fs||1;var c=N.c,fx=N.fx,fy=N.fy,GS=MD.GS;c.drawImage(MD.cv,0,0);
  if(N.st.length){c.fillStyle='#F6EFD2';N.st.forEach(function(s){c.globalAlpha=.3+.7*(Math.sin(t*1.6+s.ph)*.5+.5);c.fillRect(s.x|0,s.y|0,1,1)});c.globalAlpha=1}
  gust*=Math.pow(.97,fs);var wind=Math.sin(t*.8)*.6+gust;
  // swaying blades
  function blades(list){var last=-1;for(var i=0;i<list.length;i++){var b=list[i],sw=Math.round(Math.sin(t*1.6+b.x*.08+b.ph*.3)*wind+wind*.6);
    if(b.c!==last){c.fillStyle=GS[b.c];last=b.c}for(var k=0;k<b.h;k++)c.fillRect((b.x+(k===b.h-1?sw:0))|0,(b.y-k)|0,1,1)}}
  blades(N.bb);
  // desk + CRT + chair + person (back view)
  function R(x,y,w,h,col){c.fillStyle=col;c.fillRect(fx+x,fy+y,w,h)}
  var night=TOD==='night',sh=night?'#0E1A12':'#2C4A22';
  c.globalAlpha=.35;R(-12,0,26,2,sh);c.globalAlpha=1;
  R(1,-10,12,2,'#6B4A33');R(1,-8,1,8,'#4A3222');R(12,-8,1,8,'#4A3222');R(2,-8,10,1,'#5A3E2A');
  R(4,-18,8,8,'#E3DCC6');R(4,-18,8,1,'#F1EBD8');R(11,-18,1,8,'#BDB49A');R(6,-11,4,1,'#BDB49A');
  var glow=night?.9:.6,fl=.85+Math.sin(t*9)*.05+Math.sin(t*2.3)*.05;
  c.fillStyle='rgba(120,255,150,'+(.18*glow*fl)+')';c.fillRect(fx+2,fy-21,12,13);
  R(5,-17,6,5,'#1E3A24');c.fillStyle='rgba(110,240,140,'+fl+')';c.fillRect(fx+6,fy-16,4,1);if(Math.sin(t*4)>0)c.fillRect(fx+6,fy-14,2,1);
  R(-7,-9,7,1,'#5A3E2A');R(-7,-8,1,8,'#3E2A1C');R(-1,-8,1,8,'#3E2A1C');R(-8,-16,1,8,'#4A3222');
  R(-6,-17,6,8,night?'#B8B39F':'#EDE6D1');R(-6,-17,1,8,night?'#9E9986':'#D6CEB6');R(-1,-16,2,1,night?'#B8B39F':'#EDE6D1');
  R(-5,-21,4,4,'#2A211B');R(-5,-21,4,1,'#3A2E25');
  R(-6,-9,6,3,'#2E3445');R(-1,-6,2,6,'#2E3445');R(-1,-1,3,1,'#1B1B1B');
  blades(N.bf);
  N.flies.forEach(function(f){f.x+=(Math.sin(t*.6+f.ph)*.07+wind*.02)*fs;f.y+=Math.cos(t*.8+f.ph)*.04*fs;var a=.5+.5*Math.sin(t*2.2+f.ph);
    c.globalAlpha=a*.35;c.fillStyle='#F7E27A';c.fillRect((f.x|0)-1,(f.y|0)-1,3,3);c.globalAlpha=a;c.fillStyle='#FFF6B0';c.fillRect(f.x|0,f.y|0,1,1)});
  c.globalAlpha=1;
}

/* ---------- canvas loops: ~30fps, and only while the canvas is on screen ---------- */
function Loop(draw){var L={on:false,id:0,last:0,t:0,start:performance.now()};
  function f(now){L.id=0;if(!L.on)return;if(now-L.last>=29){var fs=Math.min(4,(now-L.last)/16.667);L.last=now;L.t=(now-L.start)/1000;draw(L.t,fs)}L.id=RAF(f)}
  L.go=function(v){if(v===L.on)return;L.on=v;if(v){L.last=performance.now();if(!L.id)L.id=RAF(f)}else if(L.id){CRAF(L.id);L.id=0}};return L}
var skyOn=true,nightOn=false,skyL=Loop(drawSky),nightL=Loop(drawNight);
function sync(){if(reduce)return;skyL.go(skyOn);nightL.go(nightOn&&!mPaused)}
var dirty={sky:false,meadow:false};
function paintSky(t){if(!initScene())return false;drawSky(t||0,1);unsnap(frame);dirty.sky=true;return true}
function paintMeadow(t){if(!initMeadow())return false;drawNight(t||0,1);unsnap(nv);dirty.meadow=true;return true}

// last-visit snapshots (read before hydration by snapshot() in markup.js). Written from an idle callback,
// only by a live mount with real, on-screen-sized canvases, once per (re)paint. The sky snapshot is the
// scene without sprites.
function saveSnap(){idle(function(){
  function put(kind,cv){dirty[kind]=false;try{var u=cv.toDataURL('image/webp',.85);if(u.length>32&&u.length<500000){var k=snapKey(kind);if(localStorage.getItem(k)!==u)localStorage.setItem(k,u)}}catch(e){}}
  if(dirty.sky&&S.ok&&sc.isConnected&&sc.getBoundingClientRect().width){var cv=document.createElement('canvas');cv.width=S.W;cv.height=S.H;var x=cv.getContext('2d');
    x.drawImage(S.sky,0,0);x.fillStyle='#F6EFD2';x.globalAlpha=.65;stars.forEach(function(s){x.fillRect(s.x|0,s.y|0,1,1)});x.globalAlpha=1;x.drawImage(SCN.cv,0,0);put('sky',cv)}
  if(dirty.meadow&&N.ok&&!mPaused&&nc.isConnected&&nc.getBoundingClientRect().width)put('meadow',nc);
  try{LEGACY_KEYS.forEach(function(k){localStorage.removeItem(k)})}catch(e){}
})}

// 1) canvases first. A canvas is built and drawn right here (so it is in the first frame the browser
// paints) when its scene is already in memory (client-side navigation back home), or when it is on
// screen with nothing to show yet. If last visit's snapshot is already showing, or the canvas is off
// screen, the build (tens of ms on a cold load) waits until just after the first paint instead of
// blocking hydration.
function near(el){var r=el.getBoundingClientRect();return r.bottom>-100&&r.top<(window.innerHeight||800)+100}
function afterPaint(fn){RAF(function(){T(fn,0)})}
var skyWarm=!!CACHE.scn&&CACHE.scn.key===skyKey(dims(sc,40)),mWarm=!!CACHE.md&&CACHE.md.key===meadowKey(dims(nc,60),pageBg());
if(skyWarm||(!frame.hasAttribute('data-snap')&&near(sky)))paintSky(0);else afterPaint(function(){if(!S.ok&&paintSky(skyL.t))saveSnap()});
if(mWarm||(!nv.hasAttribute('data-snap')&&near(nv)))paintMeadow(0);else afterPaint(function(){if(!N.ok&&!mPaused&&paintMeadow(nightL.t))saveSnap()});
IO(sky,function(e){skyOn=e[e.length-1].isIntersecting;sync()});
IO(nv,function(e){nightOn=e[e.length-1].isIntersecting;sync()});
sync();
// resize: debounced, and a scene is rebuilt only when its canvas's CSS size really changed
// (the canvases size off the viewport width, so mobile URL-bar show/hide doesn't rebuild anything)
var rzT=0;
RO([sc,nc],function(){CT(rzT);rzT=T(function(){var a=sc.getBoundingClientRect(),b=nc.getBoundingClientRect(),ch=false;
  if(a.width&&a.height&&(a.width!==S.cw||a.height!==S.ch)){paintSky(skyL.t);ch=true}
  if(b.width&&b.height&&(b.width!==N.cw||b.height!==N.ch)){if(mPaused)mDirty=true;else paintMeadow(nightL.t);ch=true}
  if(ch)saveSnap()},150)});
// the meadow's torn edge follows the page colour
on(dark,'change',function(){if(mPaused){mDirty=true;return}CACHE.md=null;if(paintMeadow(nightL.t))saveSnap()});

on(sc,'click',function(e){if(!S.ok)return;var r=sc.getBoundingClientRect(),lx=(e.clientX-r.left)/r.width*S.W,ly=(e.clientY-r.top)/r.height*S.H;
  for(var i=0;i<6;i++)birds.push({x:lx+(Math.random()-.5)*10,y:ly+(Math.random()-.5)*6,v:.35+Math.random()*.4,vy:-.35-Math.random()*.4,ph:Math.random()*6});if(birds.length>24)birds.splice(0,birds.length-24);if(reduce)drawSky(0,1)});

// Easter egg: the computer in the meadow. egg.js is its own chunk, loaded on the first click on the computer.
// lr() maps a low-res box relative to the desk origin (fx,fy) to CSS px relative to the .meadow element.
function lr(x,y,w,h){var r=nc.getBoundingClientRect(),m=nv.getBoundingClientRect(),sx=r.width/(N.W||1),sy=r.height/(N.H||1);return {x:r.left-m.left+(N.fx+x)*sx,y:r.top-m.top+(N.fy+y)*sy,w:w*sx,h:h*sy}}
function hitPC(e){if(!N.ok)return false;var b=lr(1,-21,13,21),m=nv.getBoundingClientRect(),x=e.clientX-m.left,y=e.clientY-m.top,px=Math.max(8,(44-b.w)/2),py=Math.max(8,(44-b.h)/2);
  return x>=b.x-px&&x<=b.x+b.w+px&&y>=b.y-py&&y<=b.y+b.h+py}
var EGG=null,eggQ=0,eggLoading=false;
var API={root:root,meadow:nv,meadowCanvas:nc,skyCanvas:sc,
  computerRect:function(){return lr(4,-18,8,8)},screenRect:function(){return lr(5,-17,6,5)},
  setMeadowPaused:function(p){p=!!p;if(p===mPaused||dead)return;mPaused=p;if(!p){if(mDirty){mDirty=false;paintMeadow(nightL.t)}else if(reduce)drawNight(0,1)}sync()},
  reduceMotion:reduce,tod:TOD,projects:P,signal:SIG};
function egg(){if(EGG){EGG.click();return}eggQ++;if(eggLoading)return;eggLoading=true;
  import('./egg').then(function(m){if(dead)return;EGG=m.default(API);var n=Math.min(eggQ,2);eggQ=0;while(n-->0&&EGG&&!dead)EGG.click()})
    .catch(function(){if(!EGG){eggLoading=false;eggQ=0}})}
on(nc,'click',function(e){if(hitPC(e)){egg();return}gust=3.2;if(reduce&&!mPaused)drawNight(1,1)});

// posts already fetched this session render straight away (client-side navigation back home)
var postsEl=root.querySelector('[data-posts]'),postsHTML='';
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function renderPosts(list,note){if(!postsEl)return;var h=note?'<p style="color:var(--faint);font-size:15px;padding:10px 0">'+note+'</p>':
  list.slice(0,3).map(function(p){return '<a class="post" href="/blogs/'+encodeURIComponent(p.slug)+'"><span class="line"><b>'+esc(p.title)+'</b><i class="dl"></i><span class="meta">'+esc(p.readTime||p.date)+'</span></span><p>'+esc(p.excerpt)+'</p></a>'}).join('');
  if(h!==postsHTML){postsEl.innerHTML=h;postsHTML=h}}
if(CACHE.posts)renderPosts(CACHE.posts,CACHE.posts.length?'':'New posts coming soon.');

// 2) everything else once the browser is idle
idle(saveSnap);
idle(function(){

// writing: latest posts from MongoDB via /api/blogs
if(postsEl)fetch('/api/blogs?limit=3',{signal:SIG}).then(function(r){return r.json()}).then(function(j){if(dead)return;
  var list=(j&&j.data)||[];CACHE.posts=list;renderPosts(list,list.length?'':'New posts coming soon.')
}).catch(function(){if(!dead&&!CACHE.posts)renderPosts([],'Couldn’t load posts right now.')});


// draggable marquee (stack; the track holds three copies of the list)
(function(){var m=$('marq'),tr=$('mtrack');if(!m||!tr)return;
  var x=0,v=-.35,drag=null,half=0,vis=false,id=0,last=0;
  function wrap(){if(!half)return;if(x<-half)x+=half;if(x>0)x-=half}
  function paint(){tr.style.transform='translateX('+x+'px)'}
  function step(now){id=0;var fs=last?Math.min(4,(now-last)/16.667):1;last=now;if(!drag){x+=v*fs;v+=(-.35-v)*(1-Math.pow(.97,fs))}wrap();paint();if(vis||drag)id=RAF(step)}
  function go(){if(!id&&!reduce){last=0;id=RAF(step)}}
  RO([tr],function(){half=tr.scrollWidth/3;wrap()});
  IO(m,function(e){vis=e[e.length-1].isIntersecting;if(vis)go()},{rootMargin:'100px'});
  if(reduce)paint();
  on(m,'pointerdown',function(e){drag={sx:e.clientX,x:x,lx:e.clientX,t:performance.now()};try{m.setPointerCapture(e.pointerId)}catch(_){}go()});
  on(m,'pointermove',function(e){if(!drag)return;x=drag.x+(e.clientX-drag.sx);var now=performance.now();v=(e.clientX-drag.lx)/Math.max(1,(now-drag.t)/16);drag.lx=e.clientX;drag.t=now;wrap();if(reduce)paint()});
  ['pointerup','pointercancel'].forEach(function(ev){on(m,ev,function(){drag=null;v=Math.max(-25,Math.min(25,v))})});
})();

// hover image (projects, pointer devices)
(function(){if(!matchMedia('(hover: hover)').matches)return;
  var pk=$('peek'),im=$('peekImg'),mx=0,my=0,px=0,py=0,shown=false,rot=0,animating=false;
  root.querySelectorAll('.proj .name').forEach(function(n){var p=byId(n.dataset.open);if(!p)return;
    on(n,'mouseenter',function(e){im.src=p.img;shown=true;pk.classList.add('on');px=mx=e.clientX;py=my=e.clientY;if(!animating){animating=true;RAF(step)}});
    on(n,'mouseleave',function(){shown=false;pk.classList.remove('on')})});
  function step(){var dx=mx+170-px;px+=dx*.15;py+=(my-py)*.15;rot+=((dx*.04)-rot)*.2;
    pk.style.transform='translate('+(px-110)+'px,'+(py-185)+'px) rotate('+Math.max(-8,Math.min(8,rot))+'deg) scale('+(shown?1:.85)+')';
    if(shown||Math.abs(dx)>0.5||Math.abs(my-py)>0.5){RAF(step)}else{animating=false}
  }
  on(window,'mousemove',function(e){mx=e.clientX;my=e.clientY;if(shown&&!animating){animating=true;RAF(step)}},{passive:true});
})();

// type the quote when it scrolls into view
(function(){var q=QUOTE_TEXT,el=$('qt'),who=$('qw'),done=false;if(!el)return;
  function finish(){el.textContent=q;who.classList.add('on')}
  if(reduce){finish();return}
  IO($('mon'),function(e,o){if(!e[e.length-1].isIntersecting||done)return;done=true;o.disconnect();var i=0;
    (function tick(){el.textContent=q.slice(0,++i);if(i<q.length)T(tick,q[i-1]===';'||q[i-1]==='.'?320:28+Math.random()*45);else T(function(){who.classList.add('on')},400)})()},{threshold:.5});
})();

// expanders
root.querySelectorAll('[data-more]').forEach(function(btn){
  on(btn,'click',function(){var m=$(btn.dataset.more);var o=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',o);m.classList.toggle('open',o)});
});

// modal
function openP(id){var p=byId(id);if(!p||!dlg||!dlg.isConnected)return;
  $('dImg').src=p.img;$('dImg').alt=p.n;
  $('dTitle').textContent=p.n;$('dText').textContent=p.d;
  $('dTags').innerHTML=p.t.map(function(t){return '<span>'+t+'</span>'}).join('')+p.st.map(function(k){return '<span class="stk"><img src="'+stackIcon(k)+'" alt="" width="14" height="14">'+k+'</span>'}).join('');
  $('dLinks').innerHTML=p.l.map(function(l){return '<a class="chip" href="'+l[1]+'" target="_blank" rel="noopener">'+l[0]+' '+EXT+'</a>'}).join('');
  if(dlg.open)return;if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','')}
on(root,'click',function(e){var o=e.target.closest&&e.target.closest('[data-open]');if(o)openP(o.dataset.open)});
on($('dClose'),'click',function(){dlg.close()});
on(dlg,'click',function(e){if(e.target===dlg)dlg.close()});

// text rise
var roles=['Curiosity','Exploration','Modern engineering','Systems thinking','Continuous learning through building'],ri=0,roleEl=$('role');
function riseIn(txt){roleEl.innerHTML=txt.split('').map(function(c){return '<span class="ch">'+(c===' '?'&nbsp;':c.replace('&','&amp;'))+'</span>'}).join('');
  roleEl.querySelectorAll('.ch').forEach(function(s,k){T(function(){s.classList.add('in')},reduce?0:k*22)})}
if(roleEl){riseIn(roles[0]);
  if(!reduce)IV(function(){if(document.hidden)return;var ch=roleEl.querySelectorAll('.ch');ch.forEach(function(s,k){T(function(){s.classList.add('out')},k*14)});
    T(function(){ri=(ri+1)%roles.length;riseIn(roles[ri])},ch.length*14+380)},3800)}

// contact form: sends through Web3Forms
(function(){var f=$('cform'),er=$('cerr');if(!f)return;
  on(f.msg,'input',function(){this.style.height='auto';this.style.height=Math.min(180,this.scrollHeight)+'px'});
  on(f,'submit',function(e){e.preventDefault();var n=f.name.value.trim(),m=f.email.value.trim(),t=f.msg.value.trim();
    if(!n||!m||!t){er.textContent='Please fill in your name, email and message.';return}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)){er.textContent='That email address doesn’t look right.';return}
    er.textContent='Sending…';er.classList.remove('ok');var btn=f.querySelector('button');btn.disabled=true;
    var fd=new FormData();fd.append('access_key','54964161-b264-49f5-a841-40d1d72f878e');fd.append('name',n);fd.append('email',m);fd.append('message',t);fd.append('subject','Portfolio message from '+n);
    // not aborted on unmount: once sent, the message should still go through
    fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(res){if(dead)return;
      if(res&&res.success){er.textContent='Message sent! I’ll get back to you soon.';er.classList.add('ok');f.reset();f.msg.style.height=''}
      else er.textContent=(res&&res.message)||'Couldn’t send that. Please try again.';
    }).catch(function(){if(!dead)er.textContent='Couldn’t send that. Please try again.'}).finally(function(){btn.disabled=false});
  });
})();

// copy field
var copy=$('copy'),toast=$('toast');
on(copy,'click',function(){
  var done=function(){copy.classList.add('done');toast.classList.add('show');T(function(){toast.classList.remove('show')},1700);T(function(){copy.classList.remove('done')},2000)};
  try{navigator.clipboard.writeText('isurya2005@gmail.com').then(done,function(){location.href='mailto:isurya2005@gmail.com'})}catch(e){location.href='mailto:isurya2005@gmail.com'}});

// music island: live from Last.fm via /api/spotify (polled while the tab is visible)
var isl=$('island');
on(isl,'click',function(e){if(e.target.closest('#iLink'))return;var o=!isl.classList.contains('open');isl.classList.toggle('open',o);isl.setAttribute('aria-expanded',o)});
function music(){fetch('/api/spotify',{cache:'no-store',signal:SIG}).then(function(r){return r.json()}).then(function(d){if(dead)return;
  if(!d||!d.title){isl.style.display='none';return}isl.style.display='';
  $('iTitle').textContent=d.title;
  $('iSub').textContent=(d.isPlaying?'Now playing':'Last played')+' · '+d.artist;
  var art=$('iArt');if(d.albumImageUrl){art.style.backgroundImage='url("'+d.albumImageUrl+'")';art.classList.add('cover')}
  $('iLink').href=d.songUrl||'#';isl.classList.toggle('paused',!d.isPlaying);
  isl.setAttribute('aria-label',(d.isPlaying?'Now playing: ':'Last played: ')+d.title+' by '+d.artist);
}).catch(function(){})}
if(isl)poll(music,15000,true);

// visitor count from MongoDB via /api/visitors (counted once per browser session)
(function(){var el=$('vcount');if(!el)return;var mode='hit';
  try{if(sessionStorage.getItem('has_visited_portfolio_session'))mode='get';else sessionStorage.setItem('has_visited_portfolio_session','true')}catch(e){}
  function ord(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])}
  // the one-off "hit" is never aborted, so a quick navigation away can't lose the count
  function get(md){fetch('/api/visitors?mode='+md+'&t='+Date.now(),md==='hit'?{cache:'no-store'}:{cache:'no-store',signal:SIG}).then(function(r){return r.json()}).then(function(d){if(dead)return;
    if(d&&typeof d.value==='number'){el.textContent=ord(d.value);var w=$('vwrap');if(w)w.style.visibility='visible'}}).catch(function(){})}
  get(mode);poll(function(){get('get')},30000,false);
})();

// world clock (IST)
(function(){var clk=$('clk'),clkd=$('clkd'),wasDay=null,F1,F2;if(!clk)return;
  try{F1=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true});F2=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',hour12:false})}catch(e){return}
  function tick(){if(document.hidden&&wasDay!==null)return;var d=new Date(),s=F1.format(d).toUpperCase(),h=+F2.format(d)%24,day=h>=6&&h<19;
    if(clk.textContent!==s)clk.textContent=s;
    if(day!==wasDay){wasDay=day;clkd.innerHTML=(day?'<span style="color:#F2A23A">☀︎</span> ':'☾ ')+'Local time in India'}}
  tick();IV(tick,1000);
})();

// dot globe (30fps while idle-spinning, full rate while dragged, paused off screen)
(function(){
  var cv=$('globe');if(!cv)return;var dpr=Math.min(devicePixelRatio||1,2),SZ=120;cv.width=SZ*dpr;cv.height=SZ*dpr;var c=cv.getContext('2d');c.scale(dpr,dpr);
  // land mask from Natural Earth coastlines (world-atlas 50m), one hex row per latitude band
  var LM=["3d3ff0","1f0fffc","06e0ffff0","00080feffc","0000000f7f80","0000000000000","00001000000000","0000000000000000","00000000000000000","000002000000000000","00000100000000000000","000000400000000000000","0000003000000000000008","0000001c000000000000002","000000078000000000000602","00000003c0000000000041e00","00000001f800007000000f7e00","00000000fe00003c000003ffc00","000000007f00001f0000007ff00","000000003fc0000fc400003ffc00","000000001ff00007f1000001ff000","000000001ff80003fcc000003d800","000000003ffc0003ff2000001e800","000000003ffe0000ff800000000000","000000003fff0000ff800000c03800","000000007fff00007fc00001083800","000000003ffc0000ffc00002682400","000000003ff00000ffe00006700000","000000001fe00000fff00002300000","000000003f8000fffff00200000000","000000011e0001fffff00800000000","00000001000003ffffc0181e000000","0000001c000007fffee070f880000","000000ec20000ffffbe0f1d000000","000001c100001fffefc7ffe00000","0000078000001ffffe1fffe00000","0000078400003ffff7ffff80000","00000ff800007fbffffffe0000","00007ff80000f80fffffe0000","0000fff000012afdffffa400","0001fff0000f0feffffa200","0003ffe00039617ffff900","0007ffe0003f9bffffc00","000fffd000fffffffe00","001fffc01fffffffe00","007fef0061fffff840","08ff180007ffff80","1ffc42037ffffe8","1ffe988f7ffff8","7fffffc44000","32f9c107fe8","03e7003e0","04380300","04e020"];
  var PT=[];LM.forEach(function(h,r){var la=(-80+r*3)*Math.PI/180,n=Math.max(6,Math.round(120*Math.cos(la)));for(var k=0;k<n;k++){var lo=-180+k*360/n,b=(parseInt(h[k>>2],16)>>(3-(k&3)))&1;PT.push([Math.cos(la),Math.sin(la),lo,!!b])}});
  var rot=-79,vel=0,drag=null,R=54,cx=60,cy=60,tilt=.36,ct=Math.cos(tilt),st=Math.sin(tilt),col={},vis=false,id=0,last=0;
  // theme colours are read once and refreshed when the colour scheme changes (not every frame)
  function colors(){var cs=getComputedStyle(root);col.ink=cs.getPropertyValue('--ink').trim()||'#1F2328';col.chip=cs.getPropertyValue('--chip').trim()||'#F0F0EE'}
  function draw(t){c.clearRect(0,0,SZ,SZ);c.globalAlpha=1;c.fillStyle=col.chip;c.beginPath();c.arc(cx,cy,R+3,0,6.29);c.fill();c.fillStyle=col.ink;
    for(var i=0;i<PT.length;i++){var p=PT[i],lo=(p[2]+rot)*Math.PI/180,x=p[0]*Math.sin(lo),y=p[1],z=p[0]*Math.cos(lo);
      var y2=y*ct-z*st,z2=y*st+z*ct;if(z2<0)continue;
      c.globalAlpha=p[3]?.35+.6*z2:.12*z2;var s=p[3]?1.8:1;c.fillRect(cx+x*R-s/2,cy-y2*R-s/2,s,s)}
    // India marker
    var la=20.6*Math.PI/180,lo=(79+rot)*Math.PI/180,x=Math.cos(la)*Math.sin(lo),y=Math.sin(la),z=Math.cos(la)*Math.cos(lo),y2=y*ct-z*st,z2=y*st+z*ct;
    if(z2>0){var mx=cx+x*R,my=cy-y2*R,pl=(t%1.6)/1.6;c.globalAlpha=(1-pl)*.6;c.strokeStyle='#E8505B';c.lineWidth=1.5;c.beginPath();c.arc(mx,my,2+pl*8,0,6.29);c.stroke();c.globalAlpha=1;c.fillStyle='#E8505B';c.beginPath();c.arc(mx,my,2.2,0,6.29);c.fill()}
    c.globalAlpha=1}
  function frame(now){id=0;if(!vis&&!drag)return;if(drag||now-last>=29){var fs=last?Math.min(4,(now-last)/16.667):1;last=now;
    if(!drag){if(Math.abs(vel)>.01){rot+=vel*fs;vel*=Math.pow(.95,fs)}else{rot+=0.3*fs}}draw(now/1000)}id=RAF(frame)}
  function go(){if(!id&&!reduce){last=0;id=RAF(frame)}}
  colors();draw(0);
  on(dark,'change',function(){colors();draw(performance.now()/1000)});
  IO(cv,function(e){vis=e[e.length-1].isIntersecting;if(vis)go()},{rootMargin:'100px'});
  on(cv,'pointerdown',function(e){drag={x:e.clientX,r:rot,lx:e.clientX};try{cv.setPointerCapture(e.pointerId)}catch(_){}cv.style.cursor='grabbing';go()});
  on(cv,'pointermove',function(e){if(!drag)return;rot=drag.r+(e.clientX-drag.x)*.9;vel=(e.clientX-drag.lx)*.9;drag.lx=e.clientX;if(reduce)draw(0)});
  on(cv,'pointerup',function(){drag=null;cv.style.cursor='grab'});
  on(cv,'pointercancel',function(){drag=null;cv.style.cursor='grab'});
})();

});


return function(){if(dead)return;dead=true;ac.abort();skyL.go(false);nightL.go(false);
  RS.forEach(function(id){cancelAnimationFrame(id)});RS.clear();TS.forEach(function(id){clearTimeout(id)});TS.clear();IVS.forEach(function(id){clearInterval(id)});
  OBS.forEach(function(o){o.disconnect()});try{if(dlg&&dlg.open)dlg.close()}catch(e){}EGG=null};
}
