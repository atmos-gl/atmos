<script setup lang="ts">
import SetupPowerBlock from '../components/SetupPowerBlock.vue';
import useLoader from '../composables/useLoader';
import resources from '../three/resources/powerBlockResources';
import setupSequenceManager from '../managers/setupSequenceManager';
import {useActor} from '@xstate/vue';
import {ref} from 'vue';
import PairPhone from '../components/Experience/PairPhone.vue';
import Link from '@paapi/client/dist/Link';

const {loading, percentageProgress} = useLoader(resources)
const {state, send} = useActor(setupSequenceManager)

const paired = ref(false)
const link = ref<Link>(null)
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <div v-else class="experience-wrapper theme-gradient h-full">
    <div v-if="paired" class="h-full">
      Paired !
    </div>
    <Transition v-else name="fade" mode="out-in">
      <div v-if="state.value === 'introduction'" class="text-white">
        <p>
          Intro à mettre en forme ici
        </p>
        <button @click="send('next')">Next</button>
      </div>
      <PairPhone v-else-if="state.value === 'leaveWork'" @pair="paired = true" />
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
