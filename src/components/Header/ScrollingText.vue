<script setup lang="ts"></script>

<template>
  <div class="scrolling-text">
    <span>Atmos</span>
    <span>Atmos</span>
    <span>Atmos</span>
    <span>Atmos</span>
    <span>Atmos</span>
    <span>Atmos</span>
    <span>Atmos</span>
    <span>Atmos</span>
  </div>
</template>

<style scoped lang="scss">
.scrolling-text {
  &:nth-child(1) {
    animation: title__first 24s infinite linear;
    transform: translateX(-25%);
  }

  &:nth-child(2) {
    animation: title__second 14s infinite linear;
    transform: translateX(-43%);
  }

  &:nth-child(3) {
    animation: title__third 14s infinite linear;
    transform: translateX(-20%);
  }

  &:nth-child(4) {
    animation: title__fourth 22s infinite linear;
    transform: translateX(-48%);
  }

  span {
    @apply mr-28;
  }
}

@keyframes title__first {
  from {
    transform: translateX(-25%);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes title__second {
  from {
    transform: translateX(-43%);
  }
  to {
    transform: translateX(-18%);
  }
}

@keyframes title__third {
  from {
    transform: translateX(-20%);
  }
  to {
    transform: translateX(-45%);
  }
}

@keyframes title__fourth {
  from {
    transform: translateX(-48%);
  }
  to {
    transform: translateX(-23%);
  }
}
</style>
