<script setup lang="ts">
import usePair from '../../composables/usePair';
import CustomizeTomato from '../../components/Mobile/CustomizeTomato.vue';
import {ref} from 'vue';
import TomatoExplanation from '../../components/Mobile/TomatoExplanation.vue';
import {tomatoLoader} from '../../composables/useLoader';
import GrowTomatoes from '../../components/Mobile/GrowTomatoes.vue';

const props = defineProps(['id'])

// const step = ref('tomatoExplanation')
const step = ref('growReady')

const {link} = usePair()

link.on('update:state', newVal => {
  step.value = newVal
})
const sendSequence = event => {
  link.emit('sequence:send', event)
}

// Start loading resources for tomato in background
tomatoLoader.load()

link.pair(props.id)
</script>
<template>
  <main class="theme-gradient min-h-full text-white">
    <Transition name="fade" mode="out-in">
      <TomatoExplanation v-if="step === 'tomatoExplanation'" @next="sendSequence('startTomato')" />
      <CustomizeTomato v-else-if="step === 'customizeTomato'" @confirm-tomato="sendSequence('tomatoOk')" />
      <GrowTomatoes v-else-if="['grow', 'growReady'].includes(step)" @grow="sendSequence('startGrow')" />
    </Transition>
  </main>
</template>
