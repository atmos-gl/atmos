<script setup lang="ts">
import {GrowScene} from '../../three/GrowScene';
import useScene from '../../composables/useScene';
import {TomatoColor, TomatoParams} from '../../three/objects/Tomato';
import {reactive} from 'vue';
import {CollectScene} from '../../three/CollectScene';

const tomato: TomatoParams = reactive({
  long: 1,
  size: 1,
  color: TomatoColor.red
})
const { scene, canvas } = useScene(new CollectScene(tomato))

// sequenceManager.send('tomatoOk')

</script>
<template>
  <main>
    <canvas ref="canvas" class="scene absolute top-0 left-0 w-full h-full"></canvas>
  </main>
</template>

<style scoped>
.scene {
  height: 100%;
  width: 100%;
}
</style>
