<script setup lang="ts">
import SetupPowerBlock from '../components/SetupPowerBlock.vue';
import useLoader from '../composables/useLoader';
import resources from '../three/resources/powerBlockResources';
import setupSequenceManager from '../managers/setupSequenceManager';
import {useActor} from '@xstate/vue';

const {loading, percentageProgress} = useLoader(resources)
const {state, send} = useActor(setupSequenceManager)
// send('next')
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <div v-else class="experience-wrapper bg-gradient-to-b from-imperial to-anthracite h-full">
    <Transition name="fade" mode="out-in">
      <div v-if="state.value === 'introduction'" class="text-white">
        <p>
          Intro à mettre en forme ici
        </p>
        <button @click="send('next')">Next</button>
      </div>
      <SetupPowerBlock v-else class="w-full h-full"/>
    </Transition>
  </div>
</template>
<style scoped>
.experience-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
