<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {TryGreenhouse} from '../three/TryGreenhouse';

const canvas = ref(null);
const app = new TryGreenhouse()
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
  background-color: #050505;
  height: 100%;
  width: 100%;
}
</style>
