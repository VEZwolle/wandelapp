<template>
  <div class="flex-full text-center">
    <h1 class="text-3xl font-bold mb-8">
      Finish!
    </h1>

    <p class="mb-10">
      De wandeling is afgelopen.<br>
      Leuk dat je hebt meegedaan!
    </p>

    <p class="mb-2">
      <transition name="fade" mode="out-in">
        <span v-if="rated">Bedankt voor je beoordeling!</span>
        <span v-else>Geef een beoordeling:</span>
      </transition>
    </p>

    <StarRating :show-rating="false" :read-only="rated" @update:rating="rate" />
  </div>
</template>

<script>
import StarRating from 'vue-star-rating/src/star-rating'
import state from '../../state'

export default {
  components: {
    StarRating
  },
  setup () {
    return { state }
  },
  data () {
    return {
      rated: false
    }
  },
  methods: {
    rate (rating) {
      window.gtag('event', 'rating_given', {
        event_label: `${rating} stars`
      })

      this.rated = true
    },
    goBack () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
