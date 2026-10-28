'use strict';
// Cache apenas do aplicativo; nenhum dado de paciente. v12 = aplicativo 3.2.
const CACHE='bpa-oscar-offline-v12';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('bpa-oscar-offline-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;if(e.request.mode==='navigate'){e.respondWith(caches.match('./index.html').then(c=>c||fetch(e.request)));return;}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));});
