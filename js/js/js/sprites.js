// สไปรต์แบบวาดด้วยโค้ด สไตล์การ์ตูนมีเส้นขอบ: หนังสติ๊ก, นก, หมู, บล็อกไม้/หิน/น้ำแข็ง, หลังคาบ้าน
(function(){const R=AB.Renderer,P=Math.PI*2,OL='#2b1608';
 const rr=(x,a,b,w,h,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath();};
 const line=(x,a,b,c,d,w,col)=>{x.lineCap='round';for(const [lw,cl] of [[w+4,OL],[w,col]]){x.strokeStyle=cl;x.lineWidth=lw;x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke();}};
 const seg=(x,a,b,c,d,w,col)=>{x.strokeStyle=col;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke();};
 // หนังสติ๊กทรง Y: ง่ามหลัง/หน้า ลำต้นมีเชือกพัน หนังยางและถุงหนัง
 R.sling=function(x,S,p){const gy=AB.C.GROUND,fy=S.y+34,bx=S.x-14,fx=S.x+16,py=S.y-8;
  line(x,S.x,fy,bx,py,9,'#7a4620');seg(x,bx,py,p.x,p.y,5,'#3a1f0e');
  line(x,S.x,gy,S.x,fy,16,'#a9672e');seg(x,S.x-3,gy-4,S.x-3,fy+4,3,'#c98a4e');
  line(x,S.x,fy+2,fx,py,10,'#b87333');seg(x,S.x+1,fy-2,fx-2,py+3,3,'#deaa70');
  for(const yy of [gy-14,gy-30])seg(x,S.x-8,yy,S.x+8,yy,2.5,OL);
  seg(x,fx,py,p.x,p.y,6,'#3a1f0e');
  if(Math.hypot(p.x-S.x,p.y-(S.y-2))>4){x.fillStyle='#5a3418';x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.ellipse(p.x,p.y,9,6,Math.atan2(p.y-py,p.x-S.x),0,P);x.fill();x.stroke();}};
 R.body=function(x,o,t){const hx=o.x-o.w/2,hy=o.y-o.h/2,w=o.w,h=o.h;x.lineJoin='round';x.strokeStyle=OL;x.lineWidth=2.5;
  if(o.pig){const r=w/2,sq=1+Math.sin(t*3+o.x)*.02,ol='#1b3a0a',hurt=o.hp<o.max;x.save();x.translate(o.x,o.y);x.scale(1/sq,sq);x.strokeStyle=ol;
   for(const s of [-1,1]){x.fillStyle='#7dc84a';x.beginPath();x.arc(s*11,-r+4,6.5,0,P);x.fill();x.stroke();x.fillStyle='#4f9a2b';x.beginPath();x.arc(s*11,-r+5,3,0,P);x.fill();}
   const gd=x.createRadialGradient(-5,-7,3,0,0,r);gd.addColorStop(0,'#c5f08a');gd.addColorStop(1,'#78c343');
   x.fillStyle=gd;x.beginPath();x.arc(0,0,r,0,P);x.fill();x.stroke();
   const bl=((t*.7+o.x*.01)%3)<.12;
   for(const s of [-1,1]){x.fillStyle='#fff';x.beginPath();x.ellipse(s*6.5,-4,5,bl?1:5.5,0,0,P);x.fill();x.lineWidth=1.5;if(!bl){x.stroke();x.fillStyle='#111';x.beginPath();x.arc(s*6.5+1,-3,2.2,0,P);x.fill();}}
   x.lineWidth=2;x.fillStyle='#a6e46c';x.beginPath();x.ellipse(0,6,8.5,6.5,0,0,P);x.fill();x.stroke();
   x.fillStyle=ol;for(const s of [-1,1]){x.beginPath();x.ellipse(s*3.2,6,1.5,2.4,0,0,P);x.fill();}
   if(hurt){seg(x,-11,-13,-5,-10,2,ol);seg(x,10,-12,6,-9,2,ol);}
   x.restore();return;}
  if(o.shape==='tri'){const g=x.createLinearGradient(0,hy,0,hy+h);g.addColorStop(0,'#e8785a');g.addColorStop(1,'#a5432a');x.fillStyle=g;
   x.beginPath();x.moveTo(hx-2,hy+h);x.lineTo(o.x,hy);x.lineTo(hx+w+2,hy+h);x.closePath();x.fill();x.stroke();
   for(let i=1;i<3;i++)seg(x,o.x-w/2*i/3,hy+h*i/3,o.x+w/2*i/3,hy+h*i/3,1.5,'#0005');
  }else{const g=x.createLinearGradient(0,hy,0,hy+h),m=AB.MAT[o.t];g.addColorStop(0,m.c);g.addColorStop(1,m.d);
   if(o.t==='ice')x.globalAlpha=.92;x.fillStyle=g;rr(x,hx,hy,w,h,o.t==='stone'?5:3);x.fill();x.stroke();x.globalAlpha=1;
   seg(x,hx+3,hy+3,hx+w-3,hy+3,1.6,'#fff9');
   if(o.t==='wood'){const L=w>h;for(let i=1;i<3;i++)L?seg(x,hx+8,hy+h*i/3,hx+w-8,hy+h*i/3,1,'#6b3f1766'):seg(x,hx+w*i/3,hy+8,hx+w*i/3,hy+h-8,1,'#6b3f1766');
    x.fillStyle='#4a2c10';for(const [a,b] of L?[[hx+5,o.y],[hx+w-5,o.y]]:[[o.x,hy+5],[o.x,hy+h-5]]){x.beginPath();x.arc(a,b,1.8,0,P);x.fill();}}
   else if(o.t==='stone'){x.fillStyle='#0003';for(let i=0;i<6;i++){x.beginPath();x.arc(hx+4+(i*37%(w-6)),hy+4+(i*53%(h-6)),1.7,0,P);x.fill();}}
   else{x.fillStyle='#ffffffaa';x.beginPath();x.moveTo(hx+w*.15,hy+h*.85);x.lineTo(hx+w*.4,hy+h*.15);x.lineTo(hx+w*.55,hy+h*.15);x.lineTo(hx+w*.3,hy+h*.85);x.fill();}}
  const m=AB.MAT[o.t];
  if(o.hp<o.max*.6){seg(x,o.x-w/3,hy,o.x,o.y,1.8,OL);seg(x,o.x,o.y,o.x+w/4,hy+h,1.8,OL);}
  if(o.hp<o.max*.3){seg(x,hx,o.y,o.x,o.y+2,1.8,OL);seg(x,o.x,o.y+2,hx+w,o.y-4,1.8,OL);}};
 R.bird=function(x,b,t,ang){const m=AB.BIRDS[b.type],r=b.r,ol='#1a1a1a';x.save();x.translate(b.x,b.y);x.rotate(ang+Math.sin(t*6+b.x)*.06);
  x.lineJoin='round';x.lineWidth=2.4;x.strokeStyle=ol;
  x.fillStyle=m.d;for(let i=-1;i<=1;i++){x.beginPath();x.ellipse(-r-1,i*5,8,3.2,i*.35,0,P);x.fill();x.stroke();}
  const gd=x.createRadialGradient(-4,-6,2,0,0,r+3);gd.addColorStop(0,m.c);gd.addColorStop(1,m.d);x.fillStyle=gd;x.beginPath();
  if(b.type==='yellow'){const a=r*1.05;x.moveTo(-a,-a*.95);x.lineTo(a*1.15,0);x.lineTo(-a,a*.95);x.closePath();x.lineWidth=4;}else x.arc(0,0,r,0,P);
  x.fill();x.stroke();x.lineWidth=2.4;
  x.fillStyle=m.b;x.beginPath();x.ellipse(2,r*.45,r*.6,r*.4,0,0,P);x.fill();
  if(b.type==='black'){seg(x,0,-r,3,-r-8,2.5,'#8a5a2b');x.fillStyle='#ffd54f';x.beginPath();x.arc(3,-r-9,2.5+Math.sin(t*20),0,P);x.fill();}
  else{x.fillStyle=m.d;for(let i=0;i<3;i++){x.beginPath();x.ellipse(-3+i*4,-r-1,2.4,6,(i-1)*.4,0,P);x.fill();x.stroke();}}
  for(const ex of [-1.5,6.5]){x.fillStyle='#fff';x.lineWidth=1.4;x.beginPath();x.ellipse(ex,-3,4.6,5.4,0,0,P);x.fill();x.stroke();x.fillStyle='#111';x.beginPath();x.arc(ex+1.2,-2.6,2,0,P);x.fill();}
  seg(x,-8,-10,1,-5.5,3.6,ol);seg(x,11,-10,1,-5.5,3.6,ol);
  x.lineWidth=2;x.fillStyle='#ffa000';x.beginPath();x.moveTo(r-6,-1);x.lineTo(r+8,3);x.lineTo(r-6,5);x.closePath();x.fill();x.stroke();
  x.fillStyle='#e07b00';x.beginPath();x.moveTo(r-6,5);x.lineTo(r+7,3.5);x.lineTo(r-5,9);x.closePath();x.fill();x.stroke();
  x.restore();};
})();
