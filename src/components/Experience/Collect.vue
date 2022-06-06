<script setup lang="ts">
import useScene from '../../composables/useScene';
import {TomatoParams} from '../../three/objects/Tomato';
import {defineEmits, toRefs} from 'vue';
import {CollectScene} from '../../three/CollectScene';
import sequenceManager from '../../managers/sequenceManager';
import useShareResult from '../../composables/useShareResult';

const props = defineProps<{
  tomatoParams: TomatoParams,
  progress: number
}>()
const emit = defineEmits(['load-scene'])

const { progress } = toRefs(props)

const { scene, canvas } = useScene<CollectScene>(new CollectScene(props.tomatoParams, progress))

const {uploadSceneData} = useShareResult()
// sequenceManager.send('tomatoOk')
sequenceManager.onTransition(state => {
  if (state.value === 'collected') {
    scene.dropTomatoes()
  }

  if (state.value === 'share') {
    uploadSceneData(scene.getSceneData())
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
