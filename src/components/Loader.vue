<script setup lang="ts">
import {computed, onBeforeUnmount, ref, toRefs} from 'vue';
import {clamp, useRafFn} from '@vueuse/core';

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
  animatedPct.value += (pct.value - animatedPct.value) * 0.05
})
onBeforeUnmount(() => pause)
</script>
<template>
  <div class="h-full w-full flex flex-col items-center justify-center relative">
    <div class="absolute inset-0 w-full h-full bg-gradient-to-b from-bg to-imperial breathe"></div>
    <div class="progress relative">
      <div>
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
                  stroke-width="3"
                  stroke-dasharray="565.48"
                  :stroke-dashoffset="animatedPct"
                  stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="absolute inset-0 w-full h-full center-content font-title text-xl">

        <video class="w-full" autoplay loop muted playsinline disablePictureInPicture>
          <source
              src="/assets/video/loader-hevc-safari.mp4"
              type='video/mp4; codecs="hvc1"'>
          <source
              src="/assets/video/loader-vp9-chrome.webm"
              type="video/webm">
        </video>
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

  .spin {
    animation: loader-spin 3s linear infinite;
  }

  .loadcircle {
    transform-origin: center center;
    transform: rotate(-90deg);
  }
}

.breathe {
    animation: breathe 2s alternate infinite;
}

@keyframes breathe {
  to {
    opacity: 0.5;
  }
}
@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
