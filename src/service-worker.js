/* global workbox */

workbox.core.setCacheNameDetails({ prefix: 'wandelapp' })
workbox.core.skipWaiting()
workbox.core.clientsClaim()

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('index.html'))

workbox.googleAnalytics.initialize({})

// Cache mapbox api calls
self.addEventListener('fetch', function (event) {
  var url = event.request.url

  if (url.startsWith('https://') && (url.includes('tiles.mapbox.com') || url.includes('api.mapbox.com'))) {
    event.respondWith(
      caches.match(event.request).then(function (resp) {
        return resp || fetch(event.request).then(function (response) {
          var cacheResponse = response.clone()
          caches.open('wandelapp-mapbox').then(function (cache) {
            cache.put(event.request, cacheResponse)
          })
          return response
        })
      })
    )
  }
})
