<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {TryGreenhouse} from '../three/TryGreenhouse';
import sequenceManager from '../managers/sequenceManager';
import {useActor} from '@xstate/vue';
import StepTitle from './StepTitle.vue';
import StepTip from './StepTip.vue';

import co2Icon from '../assets/img/co2Icon.svg'
import naturalIcon from '../assets/img/naturalIcon.svg'
import localIcon from '../assets/img/localIcon.svg'

const canvas = ref(null);
const app = new TryGreenhouse()

const {state} = useActor(sequenceManager)

const showUi = computed(() => !app.isCameraMoving.value)

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
    <div class="absolute right-0 top-0 pointer-events-none text-jade px-12 pt-20 xl:pt-24 w-2/5">
      <Transition name="fade">
        <StepTitle v-show="showUi" :step="state.value.setupPowerBlock"/>
      </Transition>
    </div>
    <div v-if="appReady">
      <StepTip :tip="app.co2BottleUi" :icon="co2Icon">
        <p><strong>Le C02</strong> est un ingrédient essentiel au bon dévelopement des plantes. Nous avons développé
          notamment
          <strong>une gamme de CO2 recyclé</strong> que l'on récupère des centrales à gaz pour réduire leur impact. </p>
      </StepTip>
      <StepTip :tip="app.waterBottleUi" :icon="naturalIcon">
        <p>
          Les fruits et légumes sont <strong>composés d'environ 90% d'eau</strong>. Il est donc important de nourrir votre plantation avec la meilleure eau possible. C'est un ingrédient
          <strong>100% naturel</strong> indispensable à votre santé.
        </p>
      </StepTip>
    </div>
  </main>
</template>

<style>
#scene {
  height: 100%;
  width: 100%;
}
</style>
