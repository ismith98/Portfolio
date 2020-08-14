const cacheName = 'v3';

self.addEventListener('install', event => {
    console.log('SW installed');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => { 
            cache.addAll([
                '/projects/MeditationTimer',
                '/ProjectsPage/MedTimer/bundle.js',
                '/ProjectsPage/MedTimer/index.html',
                '/ProjectsPage/MedTimer/main.js',
                '/ProjectsPage/MedTimer/style.css',
                '/ProjectsPage/MedTimer/zenStones2.jpg',
                '/ProjectsPage/MedTimer/audio/bell2.mp3',
                '/ProjectsPage/MedTimer/audio/kangse2.mp3',
                '/ProjectsPage/MedTimer/audio/ombu2.mp3',
                "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
                '/images/favicon.ico',
                "/ProjectsPage/MedTimer/manifest.json"
            ])
        })
    );
    
});

self.addEventListener('activate', event => {
    console.log('SW Activated');
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                if(res) 
                    return res;
                else 
                    return fetch(event.request);
            })
    )
})
