<script setup lang="ts">
import {toRefs} from 'vue';

const props = defineProps(['step'])
const {step} = toRefs(props)
</script>
<template>
  <Transition name="fade" mode="out-in">
    <div v-if="step === 'openDoor'">
      <h2 class="stepTitle">Commençons par ouvrir la porte !</h2>
    </div>
    <div v-else-if="step === 'plugCO2'">
      <h2 class="stepTitle">Étape 1:<br> Connecter le CO2</h2>
    </div>
    <div v-else-if="step === 'plugWater'">
      <h2 class="stepTitle">Étape 2:<br> Connecter la bombonne d'eau</h2>
    </div>
    <div v-else-if="step === 'pourFertilizer'">
      <h2 class="stepTitle">Étape 3:<br> Ajouter les granules de fertilisant</h2>
    </div>
  </Transition>
</template>
<style>
.stepTitle {
  @apply font-core text-4xl font-bold;
}
</style>
