<template>
  <button class="flex flex-col items-center" @click="openVideo">
    <div class="h-32 w-32 m-2 rounded-3xl bg-black bg-opacity-30 hover:bg-opacity-50 p-5">
      <img :src="require(`../../assets/${video.icon}.svg`)">
    </div>
    <div v-if="video.name" class="text-sm">
      {{ video.name }}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    video: Object
  },
  methods: {
    openVideo () {
      this.$router.push({ params: { video: this.video.slug } })
    }
  }
}
</script>
