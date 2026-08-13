/* ── Pritam Sharma Portfolio — Service Worker ────────────────────────────── */
const CACHE_NAME = 'ps-portfolio-v1';
const BASE = '/portfolio-3js';
const OFFLINE_URL = BASE + '/offline.html';

const PRECACHE_URLS = [
  BASE + '/',
  BASE + '/index.html',
  OFFLINE_URL,
];

/* ── Install: precache critical shell ─────────────────────────────────────── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

/* ── Activate: remove stale caches ───────────────────────────────────────── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ── Fetch: network-first with offline fallback ───────────────────────────── */
self.addEventListener('fetch', (event) => {
  // Only handle same-origin GET requests.
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation requests: network → offline page.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful navigations so the shell is available later.
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.open(CACHE_NAME).then((cache) =>
            cache.match(OFFLINE_URL).then(
              (offline) => offline || new Response('Offline', { status: 503 })
            )
          )
        )
    );
    return;
  }

  // Static assets: cache-first, fall back to network, then silent fail.
  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
    )
  );
});
