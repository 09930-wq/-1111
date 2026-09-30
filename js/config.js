// ค่าคงที่ของเกม + วัสดุ + ด่านทั้งหมด (แก้ด่านได้ที่นี่ที่เดียว)
window.AB=window.AB||{};
AB.C={W:960,H:540,G:1100,GROUND:470,SLING:{x:170,y:370},MAXPULL:95,POWER:12,R:14};
AB.MAT={
  wood:{hp:50,c:'#dba468',d:'#a8672f',s:'#6b3f17'},
  stone:{hp:130,c:'#bcc2c8',d:'#7d848b',s:'#4b5157'},
  ice:{hp:20,c:'#d8f5ff',d:'#8fd0ea',s:'#4f9bb8'},
  pig:{hp:25,c:'#9be86a',d:'#4fa32c',s:'#2f6b17'}};
AB.BIRDS={red:{c:'#ef4b3f',d:'#9e1b17',b:'#f7e6cf'},yellow:{c:'#ffd23f',d:'#d19a00',b:'#fff6c2'},black:{c:'#4a4d55',d:'#131417',b:'#8a8d96'}};
// ธีมโลก 5 โลก x 10 ด่าน  (fx = เอฟเฟกต์บรรยากาศ)
AB.THEMES=[
 {n:'ทุ่งหญ้า',top:'#4aa8e8',bot:'#e2f6ff',h1:'#a4dc94',h2:'#72c063',g:'#5aa83c',d:'#7a4e22',fx:'leaf',fc:'#8fcf4f'},
 {n:'อาทิตย์อัสดง',top:'#ff7a59',bot:'#ffe0a3',h1:'#e59a6b',h2:'#b96a4a',g:'#8aa04a',d:'#6a3d24',fx:'leaf',fc:'#ffb74d'},
 {n:'ราตรี',top:'#0d1b3d',bot:'#3b4d8f',h1:'#2b3f6b',h2:'#1c2b52',g:'#2f6b4a',d:'#2a2038',fx:'fly',fc:'#fff59d',night:1},
 {n:'หิมะ',top:'#8fc6ea',bot:'#f4fbff',h1:'#dcecf7',h2:'#b7d3e8',g:'#f2f8fc',d:'#8a9bb0',fx:'snow',fc:'#ffffff'},
 {n:'ภูเขาไฟ',top:'#2a0f1f',bot:'#a8341e',h1:'#5a1f1c',h2:'#3a1218',g:'#4a3a35',d:'#2a1515',fx:'ember',fc:'#ffa040',night:1}];
