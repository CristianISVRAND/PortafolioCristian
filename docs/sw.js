const CACHE_NAME = 'portafolio-cache-v1';
const urlsToCache = [
  '/PortafolioCristian/',
  '/PortafolioCristian/index.html',
  '/PortafolioCristian/styles.css',
  '/PortafolioCristian/main.js',
  '/PortafolioCristian/manifest.json',
  '/PortafolioCristian/icons/icon-192.png',
  '/PortafolioCristian/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
