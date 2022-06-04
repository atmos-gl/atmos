<script setup lang="ts">
import {GrowScene} from '../../three/GrowScene';
import useScene from '../../composables/useScene';
import {TomatoColor, TomatoParams} from '../../three/objects/Tomato';
import {defineEmits, onMounted, reactive, toRefs} from 'vue';
import {CollectScene} from '../../three/CollectScene';
import sequenceManager from '../../managers/sequenceManager';

const props = defineProps<{
  tomatoParams: TomatoParams,
  progress: number
}>()
const emit = defineEmits(['load-scene'])

const { progress } = toRefs(props)

const { scene, canvas } = useScene<CollectScene>(new CollectScene(props.tomatoParams, progress))
onMounted(() => {
  emit('load-scene', scene)
})
// sequenceManager.send('tomatoOk')
sequenceManager.onTransition(state => {
  if (state.value === 'collected') {
    scene.dropTomatoes()
  }
})

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
