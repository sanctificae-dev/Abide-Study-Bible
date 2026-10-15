self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin ||
      !u.pathname.startsWith('/Abide-Study-Bible/')) return;
  e.respondWith(
    fetch(e.request)
      .then(r => { if (!r.ok) return r; const c = r.clone(); caches.open('abide-v1').then(x => x.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request))
  );
});
