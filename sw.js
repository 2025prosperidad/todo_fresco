var CACHE="todofresco-v2";

self.addEventListener("install",function(e){
    self.skipWaiting();
});

self.addEventListener("activate",function(e){
    e.waitUntil(caches.keys().then(function(ks){
        return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
    }));
    self.clients.claim();
});

self.addEventListener("fetch",function(e){
    e.respondWith(
        fetch(e.request).then(function(r){
            var copy=r.clone();
            caches.open(CACHE).then(function(c){c.put(e.request,copy)});
            return r;
        }).catch(function(){
            return caches.match(e.request);
        })
    );
});
