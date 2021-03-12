<template>
  <div class="flex items-center">
    <transition name="fade" mode="out-in">
      <span v-if="error">Er is iets fout gegaan.</span>
      <span v-else-if="downloadFinished">Downloaden voltooid!</span>
      <span v-else-if="removeFinished">Verwijderen voltooid!</span>
      <span v-else-if="currentDownloading !== null">
        <Spinner class="mr-1" />
        Downloaden... ({{ progress }}%)
      </span>
      <span v-else>Offline beschikbaar{{ !state.route.offlineAvailable ? ' maken' : '' }}:</span>
    </transition>

    <Toggle :on="state.route.offlineAvailable" :disabled="currentDownloading !== null" class="ml-2" @toggle="toggle" />
  </div>
</template>

<script>
import Toggle from '../common/Toggle'
import Spinner from '../common/Spinner'
import state from '../../state'
import videoStore from '../../util/video-store'

export default {
  components: {
    Toggle,
    Spinner
  },
  setup () {
    return { state }
  },
  data () {
    return {
      currentDownloading: null,
      downloadFinished: false,
      removeFinished: false,
      error: false
    }
  },
  computed: {
    total () {
      return this.state.videos.length
    },
    progress () {
      if (this.currentDownloading === null) {
        return 0
      }

      const base = 100 / this.total
      const progress = base * (this.currentDownloading - 1)

      return Math.round(progress)
    }
  },
  methods: {
    toggle (on) {
      if (on) {
        this.download()
      } else {
        this.remove()
      }
    },
    download () {
      videoStore.init()
        .then(() => this.downloadAllVideos())
        .then(() => {
          this.currentDownloading = null
          this.state.setOfflineAvailable(true)

          this.downloadFinished = true
          setTimeout(() => (this.downloadFinished = false), 3000)

          window.gtag('event', 'downloaded')
        })
        .catch(() => (this.error = true))
    },
    downloadAllVideos () {
      return this.state.videos.reduce((chain, video, i) => {
        return chain.then(() => {
          this.currentDownloading = i + 1
          return this.downloadVideo(video.key, video.src)
        })
      }, Promise.resolve())
    },
    downloadVideo (key, url) {
      return fetch(url)
        .then(response => response.blob())
        .then(blob => videoStore.store(key, blob))
        .catch(() => (this.error = true))
    },
    remove () {
      videoStore.init()
        .then(() => videoStore.clear())
        .then(() => {
          this.state.setOfflineAvailable(false)

          this.removeFinished = true
          setTimeout(() => (this.removeFinished = false), 3000)
        })
        .catch(() => (this.error = true))
    }
  }
}
</script>
