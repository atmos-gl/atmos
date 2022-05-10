<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {TryGreenhouse} from '../three/TryGreenhouse';
import sequenceManager from '../managers/sequenceManager';
import {useActor} from '@xstate/vue';
import StepTitle from './StepTitle.vue';

const canvas = ref(null);
const app = new TryGreenhouse()

const {state} = useActor(sequenceManager)
const showUi = computed(() => !app.isCameraMoving.value)

onMounted(() => {
  app.init(canvas.value)
  app.gui.hide()
  app.run()
})
</script>
<template>
  <main>
    <canvas id="scene" ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="absolute right-0 top-0 pointer-events-none text-jade p-12 w-2/5">

      <Transition name="fade">
        <StepTitle v-show="showUi" :step="state.value.setupPowerBlock"/>
      </Transition>
    </div>
  </main>
</template>

<style>
#scene {
  background-color: #050505;
  height: 100%;
  width: 100%;
}
</style>
