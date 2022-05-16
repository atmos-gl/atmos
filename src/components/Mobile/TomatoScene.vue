<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {TomatoScene} from '../../three/custom/TomatoScene';
import {TomatoParams} from '../../three/objects/Tomato';

const props = defineProps<{
  tomato: TomatoParams
}>()

const { tomato } = props

const canvas = ref(null);
const app = new TomatoScene(tomato)
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
