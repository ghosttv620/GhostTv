// Ghost Tv - Service Worker
const CACHE_NAME = 'ghost-tv-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://vjs.zencdn.net/8.10.0/video-js.css',
  'https://vjs.zencdn.net/8.10.0/video.min.js',
  'https://cdn.plyr.io/3.7.8/plyr.css',
  'https://cdn.plyr.io/3.7.8/plyr.polyfilled.js',
  'https://cdn.jsdelivr.net/npm/hls.js@latest',
  'https://cdn.jsdelivr.net/npm/@clappr/player@latest/dist/clappr.min.js',
  'https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.css',
  'https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.js',
  'https://github.com/ghosttv620/GhostTv/releases/download/Ghost_Tv/Ghost.Tv.Logo.jpg'
];

// Install Event - Cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching assets...');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          return cached;
        }
        return fetch(event.request)
          .then(response => {
            // Cache new assets dynamically
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, clone);
              });
            }
            return response;
          })
          .catch(() => {
            // Offline fallback
            return new Response('🔴 অফলাইন মোড - Ghost Tv', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Handle push notifications (optional)
self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'https://github.com/ghosttv620/GhostTv/releases/download/Ghost_Tv/Ghost.Tv.Logo.jpg',
    badge: 'https://github.com/ghosttv620/GhostTv/releases/download/Ghost_Tv/Ghost.Tv.Logo.jpg',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
