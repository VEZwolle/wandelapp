const store = {
  db: null,

  get isReady () {
    return store.db !== null
  },

  init () {
    return new Promise((resolve, reject) => {
      if (store.isReady) {
        resolve()
      }

      if (!window.indexedDB) {
        reject(new Error('indexeddb_not_supported'))
      }

      const request = window.indexedDB.open('videos', 1)

      request.onupgradeneeded = (e) => {
        const db = e.target.result
        const objectStore = db.createObjectStore('videos', { keyPath: 'key' })
        objectStore.createIndex('mp4', 'mp4', { unique: false })
      }

      request.onsuccess = (e) => {
        store.db = e.target.result
        resolve()
      }
      request.onerror = (err) => {
        reject(err)
      }
    })
  },

  store (key, mp4Blob) {
    return new Promise((resolve, reject) => {
      if (!store.isReady) {
        reject(new Error('store_not_initialized'))
      }

      const objectStore = store.db.transaction(['videos'], 'readwrite').objectStore('videos')

      const request = objectStore.put({
        key: key,
        mp4: mp4Blob
      })

      request.onsuccess = () => {
        resolve()
      }
      request.onerror = (err) => {
        reject(err)
      }
    })
  },

  find (key) {
    return new Promise((resolve, reject) => {
      if (!store.isReady) {
        reject(new Error('store_not_initialized'))
      }

      const objectStore = store.db.transaction('videos').objectStore('videos')
      const request = objectStore.get(key)

      request.onsuccess = () => {
        if (request.result) {
          const url = URL.createObjectURL(request.result.mp4)
          resolve(url)
        } else {
          resolve(null)
        }
      }
      request.onerror = (err) => {
        reject(err)
      }
    })
  },

  clear () {
    return new Promise((resolve, reject) => {
      if (!store.isReady) {
        reject(new Error('store_not_initialized'))
      }

      const objectStore = store.db.transaction(['videos'], 'readwrite').objectStore('videos')
      const request = objectStore.clear()

      request.onsuccess = () => {
        resolve()
      }
      request.onerror = (err) => {
        reject(err)
      }
    })
  }
}

export default store
