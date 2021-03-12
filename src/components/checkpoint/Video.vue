<template>
  <video ref="video" controls autoplay playsinline disablePictureInPicture controlsList="nodownload noremoteplayback" x-webkit-airplay="deny">
    <source v-if="src" :src="src" type="video/mp4">
  </video>
</template>

<script>
import videoStore from '../../util/video-store'

export default {
  props: {
    video: Object
  },
  emits: ['end'],
  data () {
    return {
      src: null
    }
  },
  mounted () {
    this.$refs.video.addEventListener('ended', this.ended)
  },
  beforeUnmount () {
    this.$refs.video.removeEventListener('ended', this.ended)
  },
  created () {
    this.loadVideo()
  },
  methods: {
    loadVideo () {
      return videoStore.init()
        .then(() => videoStore.find(this.video.key))
        .then((url) => {
          this.src = url || this.video.src
        })
        .catch(() => {
          this.src = this.video.src
        })
    },
    ended () {
      this.$emit('end')
    }
  }
}
</script>

<style scoped>
video::-webkit-media-controls-mute-button {
  display: none;
}
</style>
