<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {DragDropApp} from '../../three/pocs/DragDropApp';

const canvas = ref(null);
const app = new DragDropApp()
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
