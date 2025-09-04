const cacheName = 'hamburgueria-cache-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './banner.jpg'
];

// Instalando e salvando arquivos em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Ativando service worker
self.addEventListener('activate', event => {
  console.log('Service Worker ativado');
});

// Respondendo às requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
