<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {TryGreenhouse} from '../three/TryGreenhouse';
import sequenceManager from '../managers/sequenceManager';
import {useActor} from '@xstate/vue';
import StepTitle from './StepTitle.vue';

const canvas = ref(null);
const app = new TryGreenhouse()

const {state} = useActor(sequenceManager)

const appReady = ref(false)
onMounted(() => {
  app.init(canvas.value)
  app.gui.hide()
  app.run()
  appReady.value = true
})
</script>
<template>
  <main class="bg-gradient-to-b from-imperial to-anthracite">
    <canvas id="scene" ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="absolute right-0 top-0 pointer-events-none text-jade p-12 w-2/5">
      <Transition name="fade">
        <StepTitle v-show="showUi" :step="state.value.setupPowerBlock"/>
      </Transition>
    </div>
      <div v-if="appReady">
        {{ app.co2BottleUi }}
        <div class="w-2 h-2 bg-red-600 absolute top-0 left-0"
             :class="{ hidden: !app.co2BottleUi.showUi }"
             :style="{
          transform: `translate(${app.co2BottleUi.uiPosition.x}px, ${app.co2BottleUi.uiPosition.y}px)`
        }"></div>
      </div>
  </main>
</template>

<style>
#scene {
  height: 100%;
  width: 100%;
}
</style>
