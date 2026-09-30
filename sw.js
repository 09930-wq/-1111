// Service Worker: แคชไฟล์ทั้งหมดตอนติดตั้ง แล้วเล่นออฟไลน์ได้ (cache-first)
// แก้โค้ดเกมแล้ว ให้เปลี่ยนเลขเวอร์ชัน VER เพื่อให้เครื่องผู้เล่นโหลดของใหม่
const VER='angry-birds-v1';
const CORE=['./','index.html','css/style.css','manifest.webmanifest',
 'js/config.js','js/audio.js','js/levels.js','js/entities.js','js/physics.js',
 'js/renderer.js','js/sprites.js','js/input.js','js/ui.js','js/game.js','js/main.js'];
const OPT=['icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VER)
 .then(c=>c.addAll(CORE).then(()=>Promise.all(OPT.map(u=>c.add(u).catch(()=>{})))))
 .then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys()
 .then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k))))
 .then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
  const cp=res.clone();caches.open(VER).then(c=>c.put(e.request,cp));return res;})
  .catch(()=>caches.match('index.html'))));});
