const CACHE_NAME = 'lilitan-trafo-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './data-info-1.html',
  './data-info-2.html',
  './formula-1.html',
  './formula-2.html',
  './archive.html',
  './css/style.css',
  './js/app.js',
  './js/formula-1.js',
  './js/formula-2.js',
  './img/Transformator.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './favicon.ico',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
