// public/sw.js
const CACHE_NAME = 'math-prep-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.webmanifest',
  '/icon-192.svg',
  '/icon-512.svg'
];
 
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
}); 