// ฟิสิกส์เขียนเอง: แรงโน้มถ่วง, ชนพื้น, กล่องชนกล่อง, นกชนกล่อง, ความเสียหายตามแรงกระแทก
AB.Physics={
 hurt(b,d,g){if(b.dead||d<=0)return;b.hp-=d;if(b.hp<=0){b.dead=true;g.onKill(b);}},
 step(g,dt){const C=AB.C,bs=g.bodies.filter(b=>!b.dead);
  for(const b of bs){b.vy+=C.G*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;
   if(b.y+b.h/2>C.GROUND){b.y=C.GROUND-b.h/2;if(b.vy>250)this.hurt(b,(b.vy-250)*.1,g);b.vy=0;b.vx*=Math.max(0,1-8*dt);}}
  for(let k=0;k<3;k++)for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){
   const a=bs[i],b=bs[j];if(a.dead||b.dead)continue;
   const dx=b.x-a.x,dy=b.y-a.y,ox=(a.w+b.w)/2-Math.abs(dx),oy=(a.h+b.h)/2-Math.abs(dy);
   if(ox<=0||oy<=0)continue;
   if(oy<ox){const up=dy>0?a:b,lo=dy>0?b:a;up.y-=oy;const rel=up.vy-lo.vy;
    if(rel>250)AB.Audio.hit(Math.min(.6,rel/1500));if(rel>250){this.hurt(up,(rel-250)*.08,g);this.hurt(lo,(rel-250)*.08,g);}
    if(up.vy>lo.vy)up.vy=lo.vy;up.vx+=(lo.vx-up.vx)*.2;
   }else{const s=dx>0?1:-1;a.x-=s*ox/2;b.x+=s*ox/2;const rel=Math.abs(a.vx-b.vx);
    if(rel>250){this.hurt(a,(rel-250)*.06,g);this.hurt(b,(rel-250)*.06,g);}
    a.vx=b.vx=(a.vx+b.vx)/2;}}
 },
 bird(g,br,dt){const C=AB.C;br.age+=dt;br.vy+=C.G*dt;br.x+=br.vx*dt;br.y+=br.vy*dt;
  let ground=false;
  if(br.y+br.r>C.GROUND){br.y=C.GROUND-br.r;br.vy*=-.3;br.vx*=Math.max(0,1-3*dt);ground=true;}
  for(const b of g.bodies){if(b.dead)continue;
   const cx=Math.max(b.x-b.w/2,Math.min(br.x,b.x+b.w/2)),cy=Math.max(b.y-b.h/2,Math.min(br.y,b.y+b.h/2));
   let dx=br.x-cx,dy=br.y-cy,d=Math.hypot(dx,dy);if(d>=br.r)continue;
   if(d===0){dx=0;dy=-1;d=1;}const nx=dx/d,ny=dy/d;
   br.x+=nx*(br.r-d);br.y+=ny*(br.r-d);
   const vn=(br.vx-b.vx)*nx+(br.vy-b.vy)*ny;
   if(vn<0){g.shake=Math.max(g.shake||0,Math.min(8,-vn*.008));AB.Audio.hit(Math.min(1,-vn/700));this.hurt(b,-vn*.12,g);b.vx+=nx*vn*.6;b.vy+=ny*vn*.6;br.vx-=vn*nx;br.vy-=vn*ny;}}
  const sp=Math.hypot(br.vx,br.vy);br.still=(ground&&sp<30)?br.still+dt:0;
  return br.done||br.still>1||br.age>8||br.x>C.W+100||br.x<-100;}
};
