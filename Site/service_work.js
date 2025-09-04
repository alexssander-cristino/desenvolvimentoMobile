const cacheName = 'hamburgueria-cache-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './image/banner2.jpg',
  './image/hamburguer-1.jpg',
  './image/hamb2.jpg',
  './image/hamb3.jpg',
  './image/hamb4.jpg',
  './image/icon-192.png',
  './image/icon-512.png'
];

// Instalando e salvando arquivos em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
  console.log('📦 Service Worker instalado');
});

// Ativando service worker e limpando caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))
    )
  );
  console.log('⚡ Service Worker ativado e caches antigos limpos');
});

// Respondendo às requisições com cache-first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then(networkResponse => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
