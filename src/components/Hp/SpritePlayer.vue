<script setup lang="ts">

import {onMounted, ref} from 'vue';
import AnimateSprite from '@its2easy/animate-sprite';

const props = defineProps<{ sprite: string }>()
const {sprite} = props
console.log(sprite)

const element = ref(null)
onMounted(() => {
  const player = new AnimateSprite(element.value, {
    width: 700,
    height: 1024,
    frames: 91,
    fps: 60,
    loop: false,
    onAnimationEnd: () => {
      console.log('hey')
      player.setReverse(true)
      player.play()
    }
  });
  player.play()

})

</script>

<template>
  <div ref="element" :style="{ backgroundImage: `url(${sprite})` }" class="w-64"></div>
</template>

<style scoped>

</style>
