const CACHE_NAME = 'jlc-v23-03-2026-complete'; 
const ASSETS = [
  './',
  'index.html',
  'JP_flag.png',
  // Basic Rows
  'videos/あ.gif', 'videos/い.gif', 'videos/う.gif', 'videos/え.gif', 'videos/お.gif',
  'videos/か.gif', 'videos/き.gif', 'videos/く.gif', 'videos/け.gif', 'videos/こ.gif',
  'videos/さ.gif', 'videos/し.gif', 'videos/す.gif', 'videos/せ.gif', 'videos/そ.gif',
  'videos/た.gif', 'videos/ち.gif', 'videos/つ.gif', 'videos/て.gif', 'videos/と.gif',
  'videos/な.gif', 'videos/に.gif', 'videos/ぬ.gif', 'videos/ね.gif', 'videos/の.gif',
  'videos/は.gif', 'videos/ひ.gif', 'videos/ふ.gif', 'videos/へ.gif', 'videos/ほ.gif',
  'videos/ま.gif', 'videos/み.gif', 'videos/む.gif', 'videos/め.gif', 'videos/も.gif',
  'videos/や.gif', 'videos/ゆ.gif', 'videos/よ.gif',
  'videos/ら.gif', 'videos/り.gif', 'videos/る.gif', 'videos/れ.gif', 'videos/ろ.gif',
  'videos/わ.gif', 'videos/を.gif', 'videos/ん.gif'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use cache.addAll but catch individual errors so one missing file doesn't break the whole cache
      return cache.addAll(ASSETS).catch(err => console.warn("SW: Some assets failed to cache", err));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("SW: Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file, or try network
      return response || fetch(event.request);
    }).catch(() => {
      // If both fail and it's a page navigation, return index.html
      if (event.request.mode === 'navigate') {
        return caches.match('index.html');
      }
    })
  );
});
