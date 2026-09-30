// วาดภาพทั้งหมด: พื้นหลังหลายชั้น (parallax), ธีมโลก, บล็อกมีมิติ, ตัวละครมีแอนิเมชัน, เอฟเฟกต์
AB.Renderer={
 cl:Array.from({length:7},(_,i)=>({x:i*170,y:40+(i*53)%140,s:.6+(i%3)*.3})),
 st:Array.from({length:80},(_,i)=>({x:(i*97)%960,y:(i*61)%320,r:.6+(i%3)*.5})),
 hills(x,col,base,amp,fr,off){x.fillStyle=col;x.beginPath();x.moveTo(-40,600);
  for(let X=-40;X<=1000;X+=20)x.lineTo(X,base+Math.sin((X+off)*fr)*amp+Math.sin((X+off)*fr*2.3)*amp*.4);x.lineTo(1000,600);x.fill();},
 draw(x,g){const C=AB.C,S=C.SLING,c=g.cam,T=AB.THEMES[Math.floor(g.level/10)],t=g.t,px=c.x-480,sh=g.shake||0;
  x.save();x.setTransform(c.z,0,0,c.z,C.W/2-c.x*c.z+(Math.random()-.5)*sh,C.H/2-c.y*c.z+(Math.random()-.5)*sh);
  const sk=x.createLinearGradient(0,0,0,C.GROUND);sk.addColorStop(0,T.top);sk.addColorStop(1,T.bot);
  x.fillStyle=sk;x.fillRect(-40,-40,C.W+80,C.H+80);
  if(T.night)for(const s of this.st){x.globalAlpha=.5+.5*Math.sin(t*2+s.x);x.fillStyle='#fff';x.beginPath();x.arc(s.x-px*.05,s.y,s.r,0,7);x.fill();}
  x.globalAlpha=1;const sx=780-px*.08,rg=x.createRadialGradient(sx,90,5,sx,90,90);
  rg.addColorStop(0,T.night?'#fffbe0':'#fff7c2');rg.addColorStop(1,'#fff0');x.fillStyle=rg;x.fillRect(sx-100,0,200,200);
  x.fillStyle=T.night?'#f4f1de':'#fff3a0';x.beginPath();x.arc(sx,90,T.night?26:32,0,7);x.fill();
  for(const q of this.cl){const cx=((q.x+t*8*q.s-px*.2)%1160+1160)%1160-100;x.globalAlpha=T.night?.18:.85;x.fillStyle='#fff';
   x.beginPath();x.arc(cx,q.y,22*q.s,0,7);x.arc(cx+24*q.s,q.y-8*q.s,28*q.s,0,7);x.arc(cx+52*q.s,q.y,20*q.s,0,7);x.fill();}
  x.globalAlpha=1;
  this.hills(x,T.h1,360,50,.006,px*.3);this.hills(x,T.h2,410,36,.011,px*.6);
  const gr=x.createLinearGradient(0,C.GROUND,0,C.H);gr.addColorStop(0,T.d);gr.addColorStop(1,'#000a');
  x.fillStyle=T.d;x.fillRect(-40,C.GROUND,C.W+80,C.H);x.fillStyle=gr;x.fillRect(-40,C.GROUND,C.W+80,C.H);
  x.fillStyle=T.g;x.fillRect(-40,C.GROUND-2,C.W+80,14);x.fillStyle='#0003';x.fillRect(-40,C.GROUND-2,C.W+80,3);
  for(let X=-30;X<C.W+40;X+=13){x.beginPath();x.moveTo(X,C.GROUND-2);x.lineTo(X+4,C.GROUND-9-(X*7%5));x.lineTo(X+8,C.GROUND-2);x.fill();}
  for(let i=0;i<34;i++){let X,Y;const sp=15+(i%4)*10;
   if(T.fx==='ember'){X=(i*173+Math.sin(t+i)*30)%1000;Y=560-(i*67+t*sp*2)%560;}
   else if(T.fx==='fly'){X=(i*173+t*sp*.6)%1000;Y=200+(i*37)%250+Math.sin(t*1.5+i)*14;}
   else{X=((i*173+t*sp*(T.fx==='snow'?.4:1.4))+Math.sin(t+i)*20)%1000;Y=(i*67+t*sp*1.5)%520;}
   x.globalAlpha=T.fx==='fly'?.4+.6*Math.sin(t*3+i):.8;x.fillStyle=T.fc;x.beginPath();x.arc(X-px*.4,Y,T.fx==='snow'?2.5:2,0,7);x.fill();}
  x.globalAlpha=1;
  // หนังสติ๊ก
  const b=g.bird,bandTo=b&&!b.fly?b:{x:S.x,y:S.y-2};this.sling(x,S,bandTo);
  if(b&&!b.fly&&Math.hypot(S.x-b.x,S.y-b.y)>12){x.fillStyle='#fffc';let qx=b.x,qy=b.y,vx=(S.x-b.x)*C.POWER,vy=(S.y-b.y)*C.POWER;
   for(let i=0;i<30;i++){for(let k=0;k<5;k++){vy+=C.G*.014;qx+=vx*.014;qy+=vy*.014;}x.globalAlpha=1-i/34;x.beginPath();x.arc(qx,qy,3.4-i/14,0,7);x.fill();}x.globalAlpha=1;}
  for(let i=0;i<g.queue;i++)this.bird(x,{type:g.L.types[g.L.birds-g.queue+i],x:64+i*34,y:C.GROUND-C.R,r:C.R},t,0);
  for(const q of g.trail){x.globalAlpha=q.l*.6;x.fillStyle='#fff';x.beginPath();x.arc(q.x,q.y,6*q.l,0,7);x.fill();}x.globalAlpha=1;
  for(const o of g.bodies)if(!o.dead)this.body(x,o,t);
  if(b){this.bird(x,b,t,b.fly?Math.atan2(b.vy,b.vx)*.35:0);
   if(b.fly&&b.used&&b.type==='yellow'){const a=Math.atan2(b.vy,b.vx),cs=Math.cos(a),sn=Math.sin(a);x.strokeStyle='#fffb';x.lineWidth=2;for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(b.x-cs*22-sn*i*7,b.y-sn*22+cs*i*7);x.lineTo(b.x-cs*(60+i*i*6)-sn*i*7,b.y-sn*(60+i*i*6)+cs*i*7);x.stroke();}}
   if(b.fly&&!b.used&&b.type!=='red'){x.fillStyle='#fff';x.font='bold 14px sans-serif';x.fillText('แตะ!',b.x-14,b.y-24);}}
  if(g.boom){x.globalAlpha=g.boom.l;x.fillStyle='#ffb300';x.beginPath();x.arc(g.boom.x,g.boom.y,130*(1-g.boom.l)+10,0,7);x.fill();x.globalAlpha=1;}
  for(const q of g.rings){x.globalAlpha=q.l;x.strokeStyle='#fff';x.lineWidth=4*q.l;x.beginPath();x.arc(q.x,q.y,60*(1-q.l)+8,0,7);x.stroke();}
  for(const p of g.parts){x.globalAlpha=Math.max(0,p.l);x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,(p.r||3)*p.l+1,0,7);x.fill();}
  x.globalAlpha=1;x.font='bold 24px sans-serif';x.textAlign='center';x.lineWidth=4;
  for(const p of g.pops){x.globalAlpha=Math.min(1,p.l*2);x.strokeStyle='#000a';x.strokeText(p.t,p.x,p.y);x.fillStyle='#ffe14d';x.fillText(p.t,p.x,p.y);}
  x.textAlign='start';x.globalAlpha=1;x.restore();
 }
};
