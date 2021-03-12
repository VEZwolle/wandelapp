<template>
  <Modal :back="false">
    <div class="flex-full">
      <a href="#" class="menu-item" @click.prevent="navigate('info')">
        Informatie
      </a>

      <a href="#" class="menu-item" @click.prevent="navigate('download')">
        Offline beschikbaar maken
      </a>

      <a href="#" class="menu-item" @click.prevent="state.reset">
        Opnieuw beginnen
      </a>
    </div>
  </Modal>
</template>

<script>
import Modal from '../common/Modal'
import state from '../../state'

export default {
  components: {
    Modal
  },
  emits: ['close'],
  setup () {
    return { state }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    navigate (to) {
      this.$router.push({ name: to })
      this.close()
    }
  }
}
</script>

<style scoped>
.menu-item {
  @apply mb-6 text-xl;
}
</style>
