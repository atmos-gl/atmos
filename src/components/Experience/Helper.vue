<script setup lang="ts">
const props = defineProps({
  angle: {
    type: Number,
    default: 0
  }
})
</script>
<template>
  <div class="transform-origin-left-center pointer-events-none" :style="{ transform: `rotate(${angle}deg)` }">
    <div class="dot"></div>
  </div>
</template>
<style scoped lang="scss">
$movingScale : 0.5;
$initialDelay: 2s;
$amplitude: 100px;
.dot {
  @apply h-12 w-12 rounded-full opacity-50;
  border: solid #fff 2px;
  opacity: 0.5;
  animation: appear .5s both $initialDelay, indicator 1.5s infinite ($initialDelay + .6s);
}
@keyframes appear {
  from {
    transform: scale(1.2);
    opacity: 0;
    background-color: transparent;
  }
  to {
    transform: scale($movingScale);
    background-color: #fff;
  }
}
@keyframes indicator {
  from {
    transform: translateX(0) scale($movingScale);
    opacity: 0.5
  }
  70% {
    transform: translateX($amplitude) scale($movingScale);
    opacity: 0.5
  }
  80% {
    transform: translateX($amplitude) scale($movingScale);
    opacity: 0
  }
  90% {
    transform: translateX(0) scale($movingScale);
    opacity: 0
  }
  to {
    transform: translateX(0) scale($movingScale);
    opacity: 0.5
  }
}
</style>
