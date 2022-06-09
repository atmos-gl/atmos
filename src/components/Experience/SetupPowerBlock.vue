<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {Vector3} from 'three';
import {SetupPowerBlockScene} from '../../three/SetupPowerBlockScene';
import sequenceManager from '../../managers/sequenceManager';
import {useActor} from '@xstate/vue';
import StepTitle from './StepTitle.vue';
import StepTip from './StepTip.vue';

import recyclingIcon from '../../assets/img/labels/label_recyclable.svg'
import naturalIcon from '../../assets/img/labels/label_natural.svg'
import localIcon from '../../assets/img/labels/label_local.svg';
import fairIcon from '../../assets/img/labels/label_equitable.svg';
import useScene from '../../composables/useScene';
import Helper from './Helper.vue';

const {scene, canvas, appReady} = useScene(new SetupPowerBlockScene())

const {state} = useActor(sequenceManager)

const showUi = computed(() => !scene.isCameraMoving.value)
const step = computed(() => {
  return (state.value.value as any).setupPowerBlock
})
const doorUi = ref(null)
onMounted(() => {
  doorUi.value = scene.doorUi
})

// Fix vue compiler glitch
const getVec3 = (x, y, z) => new Vector3(x, y, z)
</script>
<template>
  <main>
    <canvas id="scene" ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="absolute right-0 top-0 pointer-events-none text-jade px-12 pt-12 xl:pt-16 w-4/10">
      <Transition name="fade">
        <StepTitle v-show="showUi" :step="step"/>
      </Transition>
    </div>
    <div v-if="appReady">
      <Transition name="fade">
        <div v-if="doorUi.show" class="absolute top-0 left-0"
             :style="`transform: translate(${doorUi.position.x}px, ${doorUi.position.y}px)`">
          <Helper class="absolute -left-10" :angle="160"/>
        </div>
      </Transition>
      <StepTip :tip="scene.co2BottleUi"
               :icon="recyclingIcon"
               :helper-position="getVec3(-35, 30, 190)"
      >
        <p><strong>Le C02</strong> est un ingrédient essentiel au bon dévelopement des plantes. Nous avons développé
          notamment
          <strong>une gamme de CO2 recyclé</strong> que l'on récupère des centrales à gaz pour réduire leur impact. </p>
      </StepTip>
      <StepTip :tip="scene.waterBottleUi"
               :icon="naturalIcon"
               :helper-position="getVec3(-35, 20, 160)"
      >
        <p>
          Les fruits et légumes sont <strong>composés d'environ 90% d'eau</strong>. Il est donc important de nourrir
          votre plantation avec la meilleure eau possible. C'est un ingrédient
          <strong>100% naturel</strong> indispensable à votre santé.
        </p>
      </StepTip>
      <StepTip :tip="scene.trayUi"
               :icon="localIcon"
               :helper-position="getVec3(-60, 40, 10)"
      >
        <p>
          Le tiroir de fertilisant peut contenir jusqu'à 4 types de fertilisant différents. Cela permet à la serre de
          choisir le meilleur produit en fonction de ce que vous y cultivez.
        </p>
      </StepTip>
      <StepTip :tip="scene.fertilizerUi"
               :icon="localIcon"
               :helper-position="getVec3(-70, -60, 155)"
      >
        <p>
          Nos granules de fertilisant contiennent des produits utilisés pour la pousse des végétaux du monde entier. Vos
          produits sont créés
          <strong>dans le respect des traditions locales</strong>.
        </p>
      </StepTip>
      <StepTip :tip="scene.uraniumFlaskUi"
               :icon="fairIcon"
               :helper-position="getVec3(-30, -70, 130)"
      >
        <p>
          Cette pilule d'uranium recyclé est le secret de notre produit. Non seulement cela permet d'économiser sur votre facture d'électricité, mais cela permet également à votre plantation d'augmenter sa vitesse de production jusqu'à 100x plus rapide.
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
