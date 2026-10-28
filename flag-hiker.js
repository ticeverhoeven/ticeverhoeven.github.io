(() => {
const widget=document.getElementById('fhWidget');
if(!widget)return;
const A='animations/';
const scene=document.getElementById('fhScene'),hiker=document.getElementById('fhHiker'),hk=document.getElementById('fhHk');
const flagEl={NL:document.getElementById('fh-NL'),GB:document.getElementById('fh-GB')};
const poseEl={};hk.querySelectorAll('img').forEach(e=>poseEl[e.dataset.pose]=e);

const OX=11,SX=7,WALK_D=.42,WALK_MS=450,TOP=1.7,DEAD=1.5;
let peak='GB',backup='NL';

const BODY={rest:'fh-idle',grab:'fh-idle',walk:'fh-bob',reach:'','reach-f':'',hold:'fh-hop',plant:'fh-strain',release:'fh-cheer',pass:'fh-cheer'};
let walkTimer=null,walkFlip=0,hopTimer=null,current;
function setPose(p){
  clearInterval(walkTimer);clearTimeout(hopTimer);
  const show=n=>{for(const k in poseEl)poseEl[k].style.visibility=k===n?'visible':'hidden'};
  if(p==='walk'){const t=()=>show(walkFlip++%2?'walk-b':'walk-a');t();walkTimer=setInterval(t,100);}
  else show(p);
  hk.className=BODY[p];
  if(p==='hold')hopTimer=setTimeout(()=>{if(current&&current.pose==='hold')hk.className='fh-cheer'},700);
}
function frame(pose,oy,R,F,o={}){
  const ox=o.ox??OX,fl={};
  fl[R]={x:o.rx??24,top:o.rt??4,flip:0,s:1};
  fl[F]={x:o.fx??ox+2,top:o.ft??oy-6,flip:1,s:o.fs??1};
  return{pose,ox,oy,R,F,fl,d:o.d??.3*TOP,ms:o.ms??300*TOP};
}
function apply(f){
  current=f;
  scene.style.setProperty('--d',f.d+'s');
  hiker.style.left=f.ox/48*100+'%';hiker.style.top=f.oy/48*100+'%';
  setPose(f.pose);
  for(const k of['NL','GB']){const s=f.fl[k],el=flagEl[k];
    el.style.left=s.x/48*100+'%';el.style.top=s.top/48*100+'%';
    el.style.transform=`scaleX(${s.flip?-1:1}) scaleY(${s.s})`;
    el.classList.toggle('fh-jig',f.pose==='hold');}
}
const rest =(p,b)=>frame('rest',17,p,b,{ox:SX,fs:0,ft:14});
const grab =(p,b)=>frame('grab',10,p,b,{fs:.4,ft:7});
const walk =(p,b,up)=>{const oy=up?10:17;return frame('walk',oy,p,b,{ox:up?OX:SX,d:WALK_D,ms:WALK_MS,fs:0,ft:oy-3});};
const reach=(p,b)=>frame('reach',10,p,b,{fs:0,ft:7});
const reachF=(p,b)=>frame('reach-f',10,p,b);
const hold =(p,b)=>frame('hold',10,p,b,{rt:3});
const plant=(p,b)=>frame('plant',10,p,b,{ms:420*TOP});
const relez=(p,b)=>frame('release',10,p,b);
const pass =(p,b)=>frame('pass',10,p,b,{rx:23,rt:6,fx:21,ft:8,ms:330*TOP});
const HOLD=3;
const at=(i,up)=>[rest,(p,b)=>walk(p,b,up),reach,hold][i](peak,backup);

let idx=0,target=0,busy=false,locked=false,hovering=false,timer=null;
let seqTimer=null,seqCancelable=false,seqStage=0,seqHoldLen=0;
let mouseX=null,sel=null,pending=null;

function setBig(kind){for(const k in flagEl)flagEl[k].classList.toggle('fh-big',k===kind)}

function sideAt(){
  if(busy||idx!==HOLD||mouseX===null||!current||current.pose!=='hold'){sel=null;return null}
  if(mouseX<24-DEAD)sel=current.F;
  else if(mouseX>24+DEAD)sel=current.R;
  else if(sel!==current.F&&sel!==current.R)sel=mouseX<24?current.F:current.R;
  return sel;
}
function refreshHover(){const z=sideAt();setBig(z);scene.style.cursor=z?'pointer':''}

function tick(){
  if(busy)return;
  if(idx===target){
    clearTimeout(timer);timer=null;
    if(pending&&idx===HOLD){const z=pending;pending=null;choose(z);}
    return;
  }
  const up=target>idx;idx+=up?1:-1;
  const f=at(idx,up);apply(f);timer=setTimeout(tick,f.ms);
  refreshHover();
}
function go(t){
  if(pending&&t===0)return;
  if(t===0&&idx===HOLD&&!busy)return choose(peak,true);
  target=t;if(!timer&&!busy)tick();
}
function resume(){
  clearTimeout(seqTimer);seqTimer=null;seqCancelable=false;busy=false;locked=false;
  if(seqStage<=seqHoldLen+1){idx=HOLD;target=HOLD;apply(at(HOLD));refreshHover();}
  else{idx=0;target=HOLD;tick();}
}
function choose(z,cancelable){
  const o=z===peak?backup:peak;
  const seq=z===peak
    ?[reachF(z,o),plant(z,o),relez(z,o)]
    :[pass(peak,backup),hold(z,o),reachF(z,o),plant(z,o),relez(z,o)];
  const all=seq.concat([grab(z,o),walk(z,o,false),rest(z,o)]);
  busy=true;clearTimeout(timer);timer=null;sel=null;setBig(null);scene.style.cursor='';
  seqCancelable=!!cancelable;seqStage=0;seqHoldLen=seq.length;
  let i=0;
  
const next = () => {
    const f = all[i++];
    seqStage = i;
    apply(f);

    // Change language when the new flag is planted.
    if (f.pose === 'plant' && z !== peak) {
        peak = z;
        window.dispatchEvent(
            new CustomEvent('flagchange', { detail: peak })
        );
    }

    if (i < all.length) {
        seqTimer = setTimeout(next, f.ms);
        return;
    }

    seqTimer = setTimeout(() => {
        seqTimer = null;
        seqCancelable = false;
        peak = z;
        backup = o;
        idx = 0;
        target = 0;
        busy = false;
        locked = hovering;
    }, f.ms);
};

next();

}
// choose from a button: walk up to the flags first if the hiker isn't there yet
function pick(z){
  if(busy||z===peak)return;
  if(idx===HOLD&&!timer){choose(z);return}
  pending=z;go(HOLD);
}
const ptX=e=>{const r=scene.getBoundingClientRect();return(e.clientX-r.left)/r.width*48};
scene.addEventListener('mouseenter',e=>{
  hovering=true;mouseX=ptX(e);
  if(busy&&seqCancelable)return resume();
  if(!busy&&!locked)go(HOLD);
});
scene.addEventListener('mouseleave',()=>{hovering=false;locked=false;mouseX=null;sel=null;scene.style.cursor='';setBig(null);if(!busy)go(0)});
scene.addEventListener('mousemove',e=>{mouseX=ptX(e);refreshHover()});
scene.addEventListener('click',e=>{
  mouseX=ptX(e);
  const z=sideAt();
  if(z)choose(z);
  else if(!busy)go(idx>=HOLD?0:HOLD);
});
apply(rest(peak, backup));
// ---- Hiker visibility ----
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

let visible = false;
let lastY = window.scrollY;
let direction = 'up';

gsap.set(widget, {
  autoAlpha: 0,
  scale: 0.3,
  y: 100,
  rotation: -12
});

widget.classList.add('fh-hidden');

function showHiker() {
  if (visible) return;

  visible = true;
  widget.classList.remove('fh-hidden');
  gsap.killTweensOf(widget);

  gsap.to(widget, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    rotation: 0,
    duration: reduceMotion ? 0 : 0.5,
    ease: 'back.out(1.7)',
    overwrite: true
  });
}

function hideHiker() {
  if (!visible) return;

  visible = false;
  widget.classList.add('fh-hidden');
  gsap.killTweensOf(widget);

  gsap.to(widget, {
    autoAlpha: 0,
    scale: 0.3,
    y: 100,
    rotation: 12,
    duration: reduceMotion ? 0 : 0.3,
    ease: 'power2.in',
    overwrite: true
  });
}

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const delta = y - lastY;

  if (delta > 1) {
    direction = 'down';
    hideHiker();
  } else if (delta < -1) {
    direction = 'up';
    showHiker();
  }

  lastY = y;
}, { passive: true });

// Pop up on initial page load, after the loader animation.
function initialPopUp() {
  if (window.scrollY < 5) {
    showHiker();
  }
}

if (document.readyState === 'complete') {
  setTimeout(initialPopUp, 3500);
} else {
  window.addEventListener('load', () => {
    setTimeout(initialPopUp, 3500);
  }, { once: true });
}
})();
