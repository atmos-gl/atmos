<script setup lang="ts">
import {computed, onBeforeUnmount, ref, toRefs} from 'vue';
import {clamp, useRafFn, useWebWorkerFn} from '@vueuse/core';

const props = defineProps<{ progress: number }>()
const {progress} = toRefs(props)

const displayProgress = computed(() => Math.round(progress.value * 100) + ' %')

const size = 190;
const radius = (size / 2) - 5

const c = Math.PI * (radius * 2)
const pct = computed<number>(() => {
  const p = clamp(progress.value, 0.001, 1)
  return ((1 - p)) * c;
})

const animatedPct = ref(pct.value)
const {pause} = useRafFn(() => {
  animatedPct.value += (pct.value - animatedPct.value) * 0.03
})
onBeforeUnmount(() => pause)
</script>
<template>
  <div class="h-full w-full bg-imperial flex flex-col items-center justify-center">
    <div>
      <div class="progress relative">
        <svg :height="size" :width="size">
          <circle
                  :cx="size / 2"
                  :cy="size / 2"
                  :r="radius"
                  stroke-width="1"
                  stroke-linecap="round"
          />
          <circle class="loadcircle"
                  :cx="size / 2"
                  :cy="size / 2"
                  :r="radius"
                  stroke-width="8"
                  stroke-dasharray="565.48"
                  :stroke-dashoffset="animatedPct"
                  stroke-linecap="round"
          />
        </svg>
        <div class="absolute inset-0 w-full h-full center-content font-title font-bold text-4xl">{{ displayProgress }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.progress {
  circle {
    stroke: #fff;
    fill: transparent;
  }
  .loadcircle {
    animation: loader-spin 3s linear infinite;
    transform-origin: center center;
  }
}
@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
