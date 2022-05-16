<script setup lang="ts">
import SetupPowerBlock from '../components/Experience/SetupPowerBlock.vue';
import {powerBlockLoader} from '../composables/useLoader';
import sequenceManager from '../managers/sequenceManager';
import {useActor} from '@xstate/vue';
import {ref} from 'vue';
import PairPhone from '../components/Experience/PairPhone.vue';
import Link from '@paapi/client/dist/Link';
import WhenOnMobile from '../components/Experience/WhenOnMobile.vue';
import Grow from '../components/Experience/Grow.vue';

const {loading, percentageProgress, load} = powerBlockLoader
load()
const {state, send} = useActor(sequenceManager)

const link = ref<Link>(null)
const onPair = (l: Link) => {
  sequenceManager.send('phonePaired')

  link.value = l
  const updateStateToLink = () => {
    link.value.emit('update:state', sequenceManager.state.value)
  }
  sequenceManager.onTransition(() => {
    updateStateToLink()
  })
  link.value.on('sequence:send', event => {
    sequenceManager.send(event)
  })
  updateStateToLink()
}
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <div v-else class="experience-wrapper theme-gradient h-full">
    <Transition name="fade" mode="out-in">
      <div v-if="state.value === 'introduction'" class="text-white">
        <p>
          Intro à mettre en forme ici
        </p>
        <button @click="send('next')">Next</button>
      </div>
      <PairPhone v-else-if="state.value === 'leaveWork'" @pair="onPair" />
      <WhenOnMobile v-else-if=" ['tomatoExplanation', 'customizeTomato'].includes(state.value)" :step="state.value" />
      <Grow v-else-if="state.value === 'grow'" />
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
