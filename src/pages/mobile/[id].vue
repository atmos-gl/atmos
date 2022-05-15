<script setup lang="ts">
import usePair from '../../composables/usePair';
import CustomizeTomato from '../../components/Mobile/CustomizeTomato.vue';
import {ref} from 'vue';
import TomatoExplanation from '../../components/Mobile/TomatoExplanation.vue';
import {tomatoLoader} from '../../composables/useLoader';
import GrowTomatoes from '../../components/Mobile/GrowTomatoes.vue';

const props = defineProps(['id'])

// const state = ref('tomatoExplanation')
const state = ref('grow')

const {link} = usePair()

link.on('update:state', newVal => {
  state.value = newVal
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
      <TomatoExplanation v-if="state === 'tomatoExplanation'" @next="sendSequence('startTomato')" />
      <CustomizeTomato v-else-if="state === 'customizeTomato'" @confirm-tomato="sendSequence('tomatoOk')" />
      <GrowTomatoes v-else-if="state === 'grow'" />
    </Transition>
  </main>
</template>
