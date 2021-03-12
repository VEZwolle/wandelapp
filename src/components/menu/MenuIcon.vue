<template>
  <div class="menu-icon" :class="{ 'menu-icon--open': open,'menu-icon--white': white }">
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, default: false },
    white: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.menu-icon {
  display: block;
  position: relative;
  width: 1.8rem;
  height: 20px;
}

.menu-icon span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: #000;
  border-radius: 4px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}
.menu-icon.menu-icon--white span {
  background: #fff;
}

/* Closed state */
.menu-icon span:nth-child(1) {
  top: 0px;
}
.menu-icon span:nth-child(2),
.menu-icon span:nth-child(3) {
  top: 8px;
}
.menu-icon span:nth-child(4) {
  top: 16px;
}

/* Opened state */
.menu-icon.menu-icon--open span:nth-child(1),
.menu-icon.menu-icon--open span:nth-child(4) {
  top: 8px;
  width: 0%;
  left: 50%;
}
.menu-icon.menu-icon--open span:nth-child(2) {
  transform: rotate(45deg);
}
.menu-icon.menu-icon--open span:nth-child(3) {
  transform: rotate(-45deg);
}
</style>
