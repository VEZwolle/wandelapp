<template>
  <Modal class="px-5 overflow-auto flex justify-center" @back="goBack">
    <div class="max-w-xl m-auto">
      <h1 class="text-3xl font-bold mb-8">
        Offline beschikbaar maken
      </h1>

      <p class="mb-8">
        Download alle filmpjes alvast vanuit huis, zodat je de wandeling ook zonder internetverbinding kunt lopen.
      </p>

      <DownloadToggle class="mb-8" />

      <p class="text-xs">
        De download is 450 mb. Offline modus werkt mogelijk niet op oudere telefoons.
      </p>
    </div>
  </Modal>
</template>

<script>
import Modal from '../common/Modal'
import DownloadToggle from './DownloadToggle'
import state from '../../state'

export default {
  components: {
    Modal,
    DownloadToggle
  },
  setup () {
    return { state }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
