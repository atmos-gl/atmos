<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {GrowScene} from '../../three/GrowScene';

const canvas = ref(null);
const app = new GrowScene()

onMounted(() => {
  app.init(canvas.value)
  app.gui.hide()
  app.run()
})
</script>
<template>
  <main>
    <canvas ref="canvas" class="scene absolute top-0 left-0 w-full h-full"></canvas>
  </main>
</template>

<style>
.scene {
  height: 100%;
  width: 100%;
}
</style>
