// ส่วนติดต่อผู้ใช้แบบ DOM: HUD (คะแนน/นก/ด่าน) และหน้าต่างเริ่ม/ชนะ/แพ้
AB.UI={
 $:id=>document.getElementById(id),
 init(g){this.$('rs').onclick=()=>g.load(g.level);
  const m=this.$('mt');m.textContent=AB.Audio.on()?'🔊':'🔇';m.onclick=()=>{AB.Audio.unlock();m.textContent=AB.Audio.toggle()?'🔊':'🔇';};},
 hud(g){this.$('lv').textContent='ด่าน '+(g.level+1)+'/'+AB.LEVELS.length+' · '+AB.THEMES[Math.floor(g.level/10)].n;
  this.$('sc').textContent='คะแนน '+g.score+' (สูงสุด '+g.best+')';
  this.$('bd').textContent='นกที่เหลือ '+(g.queue+(g.bird?1:0));},
 show(t,m,stars,btns){this.$('ot').textContent=t;this.$('om').textContent=m;
  this.$('os').textContent=stars?'★'.repeat(stars)+'☆'.repeat(3-stars):'';
  const o=this.$('ob');o.innerHTML='';o.className=btns.length>6?'grid':'';
  btns.forEach(([l,f])=>{const b=document.createElement('button');b.textContent=l;b.onclick=()=>{AB.Audio.unlock();AB.Audio.play('click');f();};o.appendChild(b);});
  this.$('overlay').classList.remove('hidden');},
 hide(){this.$('overlay').classList.add('hidden');}
};
