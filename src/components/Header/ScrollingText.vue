<script setup lang="ts">
import {onUnmounted, ref} from "vue";
import {animate, linear} from "popmotion";

const props = defineProps<{
  duration: number,
  startOffset: number,
  direction: number
}>()
const { startOffset, duration, direction } = props
const translate = ref(startOffset)
const animation = animate({
  from: startOffset,
  to: startOffset - 25 * direction,
  duration: duration * 1000,
  onUpdate: v => {
    translate.value = v
  },
  ease: linear,
  repeat: Infinity
})
onUnmounted(() => {
  animation.stop()
})
</script>

<template>
  <div class="scrolling-text pointer-events-none flex" :style="{ transform: `translateX(${translate}%)` }">
    <span v-for="i in 8" :key="i" class="mr-8">Atmos</span>
  </div>
</template>
