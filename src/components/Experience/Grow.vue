<script setup lang="ts">
import {GrowScene} from '../../three/GrowScene';
import useScene from '../../composables/useScene';
import {TomatoParams} from '../../three/objects/Tomato';

const props = defineProps<{ tomatoParams: TomatoParams }>()
const { tomatoParams } = props

const { scene, canvas } = useScene(new GrowScene(tomatoParams))

</script>
<template>
  <main class="h-full w-full">
    <canvas ref="canvas" class="scene absolute top-0 left-0 w-full h-full"></canvas>
  </main>
</template>

<style scoped>
.scene {
  height: 100%;
  width: 100%;
}
</style>
