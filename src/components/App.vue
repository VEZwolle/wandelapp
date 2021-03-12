<template>
  <transition name="fade" mode="out-in" appear>
    <Splash v-if="showSplash" key="splash" />

    <div v-else key="navigator" class="w-full h-full">
      <Map :has-focus="!hasOverlay" class="w-full h-full" />

      <transition name="slide-up">
        <Toolbar v-if="!hasOverlay && showToolbar" class="fixed bottom-5 left-5 right-5" />
      </transition>

      <transition name="fade">
        <Info v-if="page === 'info'" key="info" />
        <Download v-else-if="page === 'download'" key="download" />
        <Info v-else-if="!state.route.started" key="welcome" welcome />
        <Checkpoint v-else-if="code" key="checkpoint" :code="code" :video="video" />
      </transition>

      <transition name="fade">
        <Menu v-if="showMenu" @close="showMenu = false" />
      </transition>

      <transition name="fade">
        <button v-if="!video" class="absolute w-16 h-16 top-0 right-0 flex items-center justify-center" @click="showMenu = !showMenu">
          <MenuIcon :open="showMenu" :white="hasOverlay" />
        </button>
      </transition>
    </div>
  </transition>
</template>

<script>
import Splash from './Splash'
import Map from './navigator/Map'
import Toolbar from './navigator/Toolbar'
import Checkpoint from './checkpoint/Checkpoint'
import Info from './Info'
import Download from './download/Download'
import Menu from './menu/Menu'
import MenuIcon from './menu/MenuIcon'
import state from '../state'

export default {
  components: {
    Splash,
    Map,
    Toolbar,
    Checkpoint,
    Info,
    Download,
    Menu,
    MenuIcon
  },
  props: {
    code: String,
    video: String,
    page: String
  },
  setup () {
    return { state }
  },
  data () {
    return {
      showSplash: true,
      showToolbar: false,
      showMenu: false
    }
  },
  computed: {
    hasOverlay () {
      return !state.route.started ||
        this.showSplash ||
        this.showMenu ||
        !!this.page ||
        !!this.code
    }
  },
  watch: {
    'state.closeToCheckpoint': {
      immediate: true,
      handler (yes) {
        if (!yes) return // Not close enough

        const code = this.state.route.currentSectionCode
        this.$router.push({ name: 'checkpoint', params: { code } })
      }
    }
  },
  created () {
    this.state.init()

    setTimeout(() => (this.showSplash = false), 2000)
    setTimeout(() => (this.showToolbar = true), 3000)
  }
}
</script>
