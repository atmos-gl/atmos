<script setup lang="ts">
import {onMounted, ref, toRefs, watch} from 'vue';
import {TomatoApp} from '../../three/pocs/TomatoApp';
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
const updateFromProps = (params) => {
  if (!params) return
}
watch(tomato, updateFromProps)
updateFromProps(tomato.value)

// app.onTomatoChange(() => {
//   emit('update:tomato', app.tomatoParams)
// })
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
