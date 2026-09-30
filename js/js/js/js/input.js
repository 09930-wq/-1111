// รับ input เมาส์/สัมผัส (Pointer Events) : ลากนก -> ปล่อยเพื่อยิง
AB.bindInput=function(g){const C=AB.C,cv=g.cv;let drag=false;
 const pos=e=>{const r=cv.getBoundingClientRect();const c=g.cam;return{x:((e.clientX-r.left)*C.W/r.width-C.W/2)/c.z+c.x,y:((e.clientY-r.top)*C.H/r.height-C.H/2)/c.z+c.y};};
 cv.addEventListener('pointerdown',e=>{AB.Audio.unlock();const b=g.bird;if(b&&g.state==='fly'){g.ability();return;}if(!b||g.state!=='aim')return;const p=pos(e);
  if(Math.hypot(p.x-b.x,p.y-b.y)<55){drag=true;AB.Audio.play('stretch');cv.setPointerCapture(e.pointerId);}});
 cv.addEventListener('pointermove',e=>{if(!drag)return;const p=pos(e),S=C.SLING;
  let dx=p.x-S.x,dy=p.y-S.y;const d=Math.hypot(dx,dy);
  if(d>C.MAXPULL){dx*=C.MAXPULL/d;dy*=C.MAXPULL/d;}g.bird.x=S.x+dx;g.bird.y=S.y+dy;});
 const up=()=>{if(drag){drag=false;g.launch();}};
 cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
};
