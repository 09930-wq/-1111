// ตัวควบคุมเกม: state machine  aim -> fly -> settle -> (aim | end)
AB.Game=function(cv){const C=AB.C,g=this;g.cv=cv;g.level=0;g.best=0;g.tc=0;g.ts=1;g.t=0;g.maxLevel=0;
 try{g.best=+localStorage.getItem('ab-best')||0;}catch(e){}
 try{g.maxLevel=+localStorage.getItem('ab-max')||0;}catch(e){}
 g.load=function(n){g.level=n;const L=AB.LEVELS[n];
  g.bodies=L.items.map(i=>AB.Body(i[0],i[1],i[2],i[3]||34,i[4]||34,i[5]));
  g.L=L;g.rings=[];g.ts=1;AB.Audio.theme(Math.floor(n/10));g.queue=L.birds;g.score=0;g.parts=[];g.pops=[];g.trail=[];g.shake=0;g.boom=null;g.punch=0;g.cam={x:640,y:300,z:1.5};g.wait=0;g.win=0;g.bird=null;g.spawn();AB.UI.hide();};
 g.spawn=function(){if(g.queue>0){g.queue--;g.bird=AB.Bird(g.L.types[g.L.birds-1-g.queue]);g.state='aim';}else g.bird=null;};
 g.onKill=function(b){g.score+=b.pig?5000:500;AB.Audio.play(b.pig?'pig':b.t);g.rings.push({x:b.x,y:b.y,l:1});if(b.pig&&!g.bodies.some(o=>o.pig&&!o.dead))g.ts=.25;g.pops.push({x:b.x,y:b.y-20,t:b.pig?'+5000':'+500',l:1});g.shake=Math.max(g.shake,b.pig?8:3);g.punch=Math.min(.3,g.punch+(b.pig?.14:.05));
  for(let i=0;i<(b.pig?26:16);i++)g.parts.push({x:b.x,y:b.y,vx:(Math.random()-.5)*500,vy:-Math.random()*380,l:1,r:2+Math.random()*4,c:AB.MAT[b.t].c});};
 g.launch=function(){const b=g.bird,S=C.SLING;
  if(Math.hypot(S.x-b.x,S.y-b.y)<12){b.x=S.x;b.y=S.y;return;}
  b.vx=(S.x-b.x)*C.POWER;b.vy=(S.y-b.y)*C.POWER;b.fly=true;g.state='fly';AB.Audio.play('launch');};
 g.ability=function(){const b=g.bird;if(!b||!b.fly||b.used||g.state!=='fly')return;b.used=true;
  if(b.type==='yellow'){b.vx*=1.9;b.vy*=1.9;AB.Audio.play('dash');g.shake=Math.max(g.shake,4);}
  else if(b.type==='black'){for(const o of g.bodies){if(o.dead)continue;const dx=o.x-b.x,dy=o.y-b.y,d=Math.hypot(dx,dy);
   if(d<130){const f=1-d/130;AB.Physics.hurt(o,f*200,g);o.vx+=dx/(d||1)*500*f;o.vy+=dy/(d||1)*500*f-150;}}
   g.boom={x:b.x,y:b.y,l:1};g.shake=14;AB.Audio.play('boom');b.done=true;}};
 g.menu=function(){AB.UI.show('เลือกด่าน','ผ่านด่านเพื่อปลดล็อกด่านถัดไป',0,AB.LEVELS.map((_,i)=>[i>g.maxLevel?'🔒':''+(i+1),()=>{if(i<=g.maxLevel)g.load(i);}]));};
 g.finish=function(win){g.state='end';AB.Audio.play(win?'win':'lose');
  if(win){const left=g.queue+(g.bird?1:0);g.score+=left*10000;
   if(g.score>g.best){g.best=g.score;try{localStorage.setItem('ab-best',g.best);}catch(e){}}
   const next=g.level+1<AB.LEVELS.length;g.maxLevel=Math.max(g.maxLevel,Math.min(49,g.level+1));try{localStorage.setItem('ab-max',g.maxLevel);}catch(e){}
   AB.UI.show('ชนะแล้ว! 🎉','คะแนน '+g.score,left>=2?3:left>=1?2:1,
    [next?['ด่านถัดไป ▶',()=>g.load(g.level+1)]:['เล่นใหม่ตั้งแต่ด่าน 1',()=>g.load(0)],['เล่นด่านนี้อีกครั้ง',()=>g.load(g.level)],['เลือกด่าน',()=>g.menu()]]);
  }else AB.UI.show('แพ้แล้ว 😢','หมูยังรอดอยู่ ลองใหม่อีกครั้ง',0,[['ลองใหม่',()=>g.load(g.level)],['เลือกด่าน',()=>g.menu()]]);};
 g.camUpdate=function(dt){let tx=480,ty=270,tz=1,c=g.cam;
  if(g.state==='fly'&&g.bird){tz=1.5;tx=g.bird.x+120;ty=g.bird.y;}
  else if(g.state==='settle'){tz=1.3;tx=Math.max(400,g.lastX||480);ty=320;}
  tz+=g.punch;g.punch*=Math.pow(.02,dt);
  const k=1-Math.pow(.001,dt);c.z+=(tz-c.z)*k;c.x+=(tx-c.x)*k;c.y+=(ty-c.y)*k;
  const hw=C.W/2/c.z,hh=C.H/2/c.z;c.x=Math.max(hw,Math.min(C.W-hw,c.x));c.y=Math.max(hh,Math.min(C.H-hh,c.y));};
 g.update=function(dt){
  g.ts=Math.min(1,g.ts+dt*.7);for(const q of g.rings)q.l-=dt*1.8;g.rings=g.rings.filter(q=>q.l>0);
  g.camUpdate(dt);g.t+=dt;g.shake*=Math.pow(.002,dt);
  for(const p of g.pops){p.y-=40*dt;p.l-=dt;}g.pops=g.pops.filter(p=>p.l>0);
  if(g.boom){g.boom.l-=dt*2;if(g.boom.l<=0)g.boom=null;}
  if(g.bird&&g.bird.fly&&++g.tc%6===0)g.trail.push({x:g.bird.x,y:g.bird.y,l:1});
  for(const q of g.trail)q.l-=dt*1.5;g.trail=g.trail.filter(q=>q.l>0);
  if(g.state==='fly'&&g.bird&&AB.Physics.bird(g,g.bird,dt)){g.lastX=g.bird.x;g.bird=null;g.state='settle';g.wait=1.5;}
  AB.Physics.step(g,dt);
  for(const p of g.parts){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=900*dt;p.l-=dt;}
  g.parts=g.parts.filter(p=>p.l>0);
  if(g.state==='end')return;
  if(!g.bodies.some(b=>b.pig&&!b.dead)){g.win+=dt;if(g.win>1.2)g.finish(true);}
  else if(g.state==='settle'){g.wait-=dt;if(g.wait<=0){if(g.queue>0)g.spawn();else g.finish(false);}}
 };
};
