<script setup lang="ts">
import {useRafFn} from '@vueuse/core';
import {computed, ref} from 'vue';
import {useMusicPlay} from '../composables/useSoundEffect';

const {playing} = useMusicPlay()

let lastTime = Date.now()
let t = 0
const d = ref('M10,10 L50,100 L90,50')
let xs = []

const targetAmplitude = computed(() => playing.value ? 5 : 0)

for (let i = 0; i <= 40; i++) {
  xs.push(i)
}
let amplitude = 0
const animate = () => {
  amplitude += (targetAmplitude.value - amplitude) * 0.08
  let points = xs.map(x => {
    let y =  16 + amplitude * Math.sin((x + t / 6) / 3)
    return [x, y]
  })

  let path = "M" + points.map(p => {
    return p[0] + "," + p[1]
  }).join(" L")

  d.value = path

  const now = Date.now()
  t += (now - lastTime) * 0.1
  lastTime = now
}
useRafFn(animate)
</script>
<template>
  <button
      class="border border-jade rounded-full p-3"
      :title="playing ? 'Couper la musique' : 'Activer la musique'"
      @click="playing = !playing">
    <svg>
      <path :d="d"></path>
    </svg>
  </button>
</template>
<style scoped>
button {
  animation: show 0.5s both 3s;
  opacity: 0.5;
  transition: all 0.5s;
}
button:hover {
  opacity: 1;
}
@keyframes show {
  from {
    opacity: 0;
  }
}
svg {
  @apply w-8 h-8;
}

path {
  stroke: theme('colors.jade');
  stroke-width: 2px;
  stroke-linecap: round;
  fill: none;
}
</style>
