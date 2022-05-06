<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {ExplorePoi} from '../three/ExplorePoi';

const canvas = ref(null);
const app = new ExplorePoi()

const positions = ref({
  table: {x: 0, y: 0}
})

onMounted(() => {
  app.init(canvas.value)
  app.run()
})
</script>
<template>
  <div id="container">
    <canvas id="scene" ref="canvas"></canvas>
    <div id="labels"></div>
  </div>
</template>

<style>
#container {
  position: relative;  /* makes this the origin of its children */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#labels {
  position: absolute;  /* let us position ourself inside the container */
  left: 0;             /* make our position the top left of the container */
  top: 0;
  color: white;
}
#scene {
  height: 100%;
  width: 100%;
}
</style>
