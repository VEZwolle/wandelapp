<template>
  <div class="on-off-toggle">
    <input id="toggle" :checked="on" :disabled="disabled" class="on-off-toggle__input" type="checkbox" @change="toggle">
    <label for="toggle" class="on-off-toggle__slider" />
  </div>
</template>

<script>
export default {
  props: {
    on: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ['toggle'],
  methods: {
    toggle (e) {
      this.$emit('toggle', e.target.checked)
    }
  }
}
</script>

<style scoped>
.on-off-toggle {
  width: 56px;
  height: 24px;
  position: relative;
  display: inline-block;
  text-align: left;
}

.on-off-toggle__slider {
  width: 56px;
  height: 24px;
  display: block;
  border-radius: 34px;
  background-color: #e2001a;
  transition: background-color 0.4s;
  border: 2px solid #fff;
  cursor: pointer;
}
.on-off-toggle__slider::before {
  content: "";
  display: block;
  background-color: #fff;
  bottom: 3px;
  height: 18px;
  left: 3px;
  position: absolute;
  transition: 0.4s;
  width: 18px;
  z-index: 5;
  border-radius: 100%;
}
.on-off-toggle__slider::after {
  content: "Nee";
  display: block;
  line-height: 20px;
  font-size: 12px;
  color: #fff;
  padding-left: 23px;
  transition: all 0.4s;
  font-weight: bold;
}

.on-off-toggle__input {
  position: absolute;
  opacity: 0;
}
.on-off-toggle__input:checked + .on-off-toggle__slider {
  background-color: #29c600;
}
.on-off-toggle__input:checked + .on-off-toggle__slider::before {
  transform: translateX(32px);
}
.on-off-toggle__input:checked + .on-off-toggle__slider::after {
  content: "Ja";
  color: #ffffff;
  padding-left: 12px;
}
</style>
