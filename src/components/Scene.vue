<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {App} from '../three/App';

const canvas = ref(null);
const app = new App()
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
