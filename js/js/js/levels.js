// ตัวสร้างด่านอัตโนมัติ 50 ด่าน (seeded random => ด่านเดิมเหมือนเดิมทุกครั้ง)
// แม่แบบโครงสร้าง: บ้านไม้หลังคาสามเหลี่ยม / หอหลายชั้น / กำแพงกันหมู  ยิ่งด่านสูงยิ่งมีที่กำบังและหมูมาก
AB.gen=function(n){let s=n*7919+13;const r=()=>(s=s*16807%2147483647)/2147483647;
 const d=n/49,items=[],cap=n<30?7:8;let pigs=0;
 const pick=()=>{const p=r();if(n<6)return p<.6?'wood':'ice';return p<.5-d*.35?'wood':p<.78-d*.2?'ice':'stone';};
 const pig=(x,b)=>{if(pigs<cap){items.push(['pig',x,b]);pigs++;}};
 const cnt=Math.min(4,2+Math.floor(n/16)+(r()<.5?1:0)),gap=n<20?115:108;
 for(let i=0;i<cnt;i++){const cx=445+i*gap;
  if(n>3&&i>0&&r()<.22){const h=90+Math.floor(r()*50);items.push([pick(),cx-8,0,20,h]);
   if(r()<.5)items.push([pick(),cx-8,h,20,50]);pig(cx+26,0);continue;}
  const fl=1+Math.floor(r()*(1+d*2)),house=r()<.6;let b=0;
  for(let f=0;f<fl;f++){const h=48+Math.floor(r()*26),m=pick();
   items.push([m,cx-32,b,14,h],[m,cx+32,b,14,h],[pick(),cx,b+h,80,12]);
   if(f===0||r()<.5)pig(cx,b);b+=h+12;}
  if(house&&i>0)items.push(['wood',cx,b,90,30,'tri']);else if(i===0||r()<.6)pig(cx,b);}
 if(!pigs)pig(500,0);
 const types=['red','yellow','red','black','yellow','black'],ok=n>=7;
 const birds=3+(n>9)+(n>24)+(n>39)+(pigs>3)+(pigs>5);
 return{birds,items,types:Array.from({length:birds},(_,i)=>n<3?'red':ok?types[i%6]:(i%2?'yellow':'red'))};};
AB.LEVELS=Array.from({length:50},(_,n)=>AB.gen(n));
