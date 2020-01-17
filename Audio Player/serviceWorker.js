self.addEventListener('install', function (x) { // When service worker will be installed
  console.log('[Service Worker] Instelling Service Worker ...', x);
  x.waitUntil(
    caches.open('frame').then(cache => {
      console.log('[Service Worker] Precaching ');
      cache.addAll([
        '/',
        '/index.html',
        '/css/main.css',
        '/css/materialize.min.css',
        '/js/main.js',
        '/js/materialize.min.js',
        'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'img/music_icon.png',
        'img/background.jpeg',

        'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
        'https://use.fontawesome.com/releases/v5.0.10/webfonts/fa-solid-900.woff2'

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