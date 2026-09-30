// เสียงทั้งหมดสังเคราะห์ด้วย Web Audio API (ไม่ใช้ไฟล์เสียง): เอฟเฟกต์ + เพลงพื้นหลังวนลูปตามธีมโลก
AB.Audio=(function(){let ctx,master,nbuf,on=true,last={},root=262,step=0;
 try{on=localStorage.getItem('ab-mute')!=='1';}catch(e){}
 const tone=(f,d,type,v,f2,dl)=>{const t=ctx.currentTime+(dl||0),o=ctx.createOscillator(),g=ctx.createGain();o.type=type||'sine';
  o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
  g.gain.setValueAtTime(v||.2,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05);};
 const noise=(d,v,fr)=>{if(!nbuf){nbuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);const a=nbuf.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;}
  const t=ctx.currentTime,s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=nbuf;f.type='lowpass';f.frequency.value=fr;
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(master);s.start(t);s.stop(t+d);};
 const S={
  click:()=>tone(660,.08,'square',.08,880),
  stretch:()=>tone(300,.15,'triangle',.1,520),
  launch:()=>{tone(200,.35,'sawtooth',.12,900);noise(.3,.15,3000);},
  dash:()=>tone(400,.3,'square',.1,1600),
  boom:()=>{noise(.7,.6,600);tone(120,.6,'sine',.5,30);},
  wood:()=>{noise(.18,.4,1200);tone(180,.12,'square',.12,90);},
  stone:()=>{noise(.25,.45,700);tone(90,.2,'sawtooth',.15,50);},
  ice:()=>{tone(1800,.2,'triangle',.12,900);tone(2400,.15,'sine',.1,1200,.03);noise(.15,.15,6000);},
  pig:()=>{tone(500,.1,'sawtooth',.15,250);tone(300,.25,'square',.12,120,.08);noise(.1,.15,2000);},
  win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.35,'triangle',.18,0,i*.12)),
  lose:()=>[392,330,262,196].forEach((f,i)=>tone(f,.4,'sawtooth',.1,0,i*.18))};
 const sc=[0,3,5,7,10,12,15],pat=[0,2,4,2,3,5,4,1];
 setInterval(()=>{if(!on||!ctx||ctx.state!=='running')return;
  tone(root*Math.pow(2,sc[pat[step%8]]/12),.5,'triangle',.05);if(step%4===0)tone(root/2,.9,'sine',.07);step++;},300);
 document.addEventListener('visibilitychange',()=>{if(ctx)document.hidden?ctx.suspend():ctx.resume();});
 return{
  on:()=>on,
  unlock(){if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return;ctx=new A();master=ctx.createGain();master.gain.value=on?.6:0;master.connect(ctx.destination);}
   if(ctx.state==='suspended')ctx.resume();},
  toggle(){on=!on;if(master)master.gain.value=on?.6:0;try{localStorage.setItem('ab-mute',on?'0':'1');}catch(e){}return on;},
  theme(i){root=[262,233,196,294,131][i]||262;},
  play(k){if(!ctx||!on||!S[k])return;const n=performance.now();if(last[k]&&n-last[k]<45)return;last[k]=n;S[k]();},
  hit(v){if(!ctx||!on)return;const n=performance.now();if(last.h&&n-last.h<60)return;last.h=n;noise(.08+.1*v,.1+.4*v,700+900*v);tone(150+80*v,.1,'square',.06+.1*v,70);}
 };})();
