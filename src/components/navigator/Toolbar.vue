<template>
  <div class="toolbar p-5 rounded-2xl bg-black bg-opacity-40 text-white flex justify-center items-center text-center">
    <div v-if="state.isFinished">
      <strong>Bedankt voor het meedoen!</strong><br>
      <p class="text-sm">
        Filmpje terugzien? Tik op het nummer.
      </p>
    </div>

    <div v-else-if="state.currentSection">
      Wandel naar <strong>{{ state.currentSection.name }}</strong><br>
      <p v-if="state.remainingDistance !== null" class="text-sm">
        Nog {{ state.remainingDistance }} meter
      </p>
      <p v-else class="text-sm">
        Scan de QR code met je camera
      </p>
    </div>
  </div>
</template>

<script>
import state from '../../state'

export default {
  setup () {
    return { state }
  }
}
</script>

<style scoped>
.toolbar {
  backdrop-filter: blur(1rem);
}
</style>
