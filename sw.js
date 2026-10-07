// Service worker: siempre pide al servidor la versión más reciente de la app (sin copias viejas en caché).
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  const req = e.request;
  const url = new URL(req.url);
  // Solo la página principal (index.html) se pide siempre fresca; el resto (librería de voz, iconos, Google, imágenes) va normal
  if (req.method !== 'GET' || url.origin !== self.location.origin || req.mode !== 'navigate') return;
  e.respondWith(fetch(req, { cache: 'no-store' }).catch(function () { return fetch(req); }));
});
