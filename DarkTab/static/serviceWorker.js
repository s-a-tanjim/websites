self.addEventListener('install', function (x) { // When service worker will be installed
  console.log('[Service Worker] Instelling Service Worker ...', x);
  x.waitUntil(
    caches.open('frame').then(cache => {
      console.log('[Service Worker] Precaching ');
      cache.addAll([
        '/',
        '/index.html',
        '/files/*',
      ]);
    })
  ); //To create caches
});

self.addEventListener('activate', function (x) { //When service worker will be activate
  console.log('[Service Worker] Activating Service Worker ...', x);
  x.waitUntil(
    caches.keys().then( //To delete extra(old version) caches
      keyList => {
        return Promise.all(keyList.map(key => {
          if (key !== 'frame') {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      }
    ));
  return self.clients.claim(); //Return to make it stable
});

self.addEventListener('fetch', function (x) { // When a fetch request will occure
  // console.log('[Service Worker] Fetching data ...',x);
  x.respondWith(
    caches.match(x.request).then(response => { //Check if data is already available in cache.
      if (response) //if this is not null
      {
        return response; //Response from cache
      } else {
        return fetch(x.request); //Request to server to get data
      }
    })
  );
});
