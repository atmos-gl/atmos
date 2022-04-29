<script setup lang="ts">
import {onMounted, ref, toRefs, watch} from 'vue';
import {TomatoApp} from '../../three/pocs/TomatoApp';

const props = defineProps(['tomato'])
const emit = defineEmits(['update:tomato'])

const {tomato} = toRefs(props)

const canvas = ref(null);
const app = new TomatoApp()
onMounted(() => {
  app.init(canvas.value)
  app.run()
})
const updateFromProps = (params) => {
  if (!params) return
  app.tomatoParams = params
}
watch(tomato, updateFromProps)
updateFromProps(tomato.value)

app.onTomatoChange(() => {
  emit('update:tomato', app.tomatoParams)
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
