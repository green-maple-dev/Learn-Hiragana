const CACHE_NAME = 'jlc-v21-03-2026-7-06-PM-complete'; // Simple name, no spaces
const ASSETS = [
  '',
  'index.html',
  'images/JP_flag.png',
  'images/aoi.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force the new version to take over
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => caches.match('index.html')) // Fallback to index if network fails
  );
});
