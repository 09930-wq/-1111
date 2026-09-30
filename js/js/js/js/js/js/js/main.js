// จุดเริ่มต้น: ประกอบทุกโมดูล + game loop (fixed timestep 1/120 วินาที)
window.addEventListener('DOMContentLoaded',()=>{
 const cv=document.getElementById('game'),ctx=cv.getContext('2d'),g=new AB.Game(cv);
 AB.UI.init(g);AB.bindInput(g);g.load(0);
 AB.UI.show('Angry Birds','ลากนกถอยหลังแล้วปล่อย เพื่อทำลายหมูทุกตัว',0,[['▶ เริ่มเล่น',()=>AB.UI.hide()],['เลือกด่าน',()=>g.menu()]]);
 let last=performance.now(),acc=0;
 (function f(t){acc+=Math.min(.05,(t-last)/1000)*g.ts;last=t;
  while(acc>=1/120){g.update(1/120);acc-=1/120;}
  AB.Renderer.draw(ctx,g);AB.UI.hud(g);requestAnimationFrame(f);})(last);
});

// PWA: ลงทะเบียน Service Worker (ทำงานเฉพาะเมื่อเปิดผ่าน http(s) / localhost)
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))
 window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
