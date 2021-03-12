<template>
  <div class="splash flex-full bg-cover bg-center">
    <img src="../assets/logo.svg" class="w-4/5 max-w-md mb-8">
    <Spinner class="text-2xl" />
  </div>
</template>

<script>
import Spinner from './common/Spinner'

export default {
  components: { Spinner }
}
</script>

<style>
.splash {
  background-image: url("../assets/bg.jpg");
}
</style>
