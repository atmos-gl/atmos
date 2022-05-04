<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {Room} from '../three/Room';

const canvas = ref(null);
const app = new Room()
onMounted(() => {
  app.init(canvas.value)
  app.run()
})
</script>
<template>
  <canvas id="scene" ref="canvas"></canvas>
</template>

<style>
#scene {
  height: 100%;
  width: 100%;
}
</style>
