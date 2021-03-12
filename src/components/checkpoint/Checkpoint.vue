<template>
  <Modal @back="goBack">
    <transition name="fade" mode="out-in">
      <NotFound v-if="!section" key="not-found" />
      <Finish v-else-if="isFinished" key="finish" />

      <div v-else-if="!video" key="video-choice" class="flex-full text-center">
        <p>Je bent aangekomen bij</p>
        <h2 class="text-2xl font-bold mt-1">
          {{ section.name }}
        </h2>

        <p class="mt-6">
          Bekijk {{ hasSingleVideo ? 'het' : 'een' }} filmpje:
        </p>
        <div class="flex mt-2">
          <VideoButton v-for="(vid, i) in section.videos" :key="i" :video="vid" />
        </div>
      </div>

      <div v-else-if="currentVideo" key="video" class="w-full h-full bg-black">
        <Video :video="currentVideo" class="w-full h-full" @end="closeVideo" />
      </div>
    </transition>
  </Modal>
</template>

<script>
import Modal from '../common/Modal'
import Video from './Video'
import VideoButton from './VideoButton'
import Finish from './Finish'
import NotFound from './NotFound'
import state from '../../state'

export default {
  components: {
    Modal,
    Video,
    VideoButton,
    Finish,
    NotFound
  },
  props: {
    code: String,
    video: String
  },
  setup () {
    return { state }
  },
  data () {
    return {
      hasViewed: false
    }
  },
  computed: {
    section () {
      return this.state.findSection(this.code)
    },
    hasSingleVideo () {
      return this.section.videos.length === 1
    },
    currentVideo () {
      return this.section.videos.find(v => v.slug === this.video)
    },
    isLastSection () {
      return this.state.isLastSection(this.code)
    },
    isFinished () {
      return this.isLastSection && this.hasViewed
    }
  },
  created () {
    if (this.code === this.state.route.currentSectionCode) {
      this.state.goToNextSection()
    }
  },
  mounted () {
    window.gtag('event', 'checkpoint_reached', {
      event_label: this.section.name
    })
  },
  methods: {
    closeVideo () {
      this.hasViewed = true

      if (this.hasSingleVideo) {
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'checkpoint', params: { code: this.code } })
      }
    },
    goBack () {
      if (this.isFinished) {
        this.hasViewed = false
        return
      }

      if (this.video) {
        return this.closeVideo()
      }

      this.$router.push({ name: 'home' })
    }
  }
}
</script>
