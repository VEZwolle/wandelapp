<template>
  <div class="modal fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-40 text-white">
    <slot />

    <button v-if="back" class="absolute w-16 h-16 top-0 left-0 flex items-center justify-center" @click="$emit('back')">
      <img src="../../assets/arrow.svg" class="h-6 w-6">
    </button>
  </div>
</template>

<script>
export default {
  props: {
    back: { type: Boolean, default: true }
  },
  emits: ['back']
}
</script>

<style scoped>
.modal {
  backdrop-filter: blur(1rem);
}
</style>
