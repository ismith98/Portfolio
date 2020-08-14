

self.addEventListener('install', event => {
    console.log('SW installed');
    event.waitUntil(
        caches.open('static')
        .then(cache => { 
            cache.addAll([
                '/projects/MeditationTimer',
                '/ProjectsPage/MedTimer/bundle.js',
                '/ProjectsPage/MedTimer/index.html',
                '/ProjectsPage/MedTimer/main.js',
                '/ProjectsPage/MedTimer/style.css',
                '/ProjectsPage/MedTimer/zenStones2.jpg',
                '/ProjectsPage/MedTimer/audio/bell.mp3',
                '/ProjectsPage/MedTimer/audio/kangse.mp3',
                '/ProjectsPage/MedTimer/audio/ombu.mp3',
                "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
                '/images/favicon.ico',
                "/ProjectsPage/MedTimer/manifest.json"
            ])
        })
    );
    
});

self.addEventListener('activate', () => {
    console.log('SW Activated');
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
