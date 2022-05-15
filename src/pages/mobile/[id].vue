<script setup lang="ts">
import usePair from '../../composables/usePair';
import CustomizeTomato from '../../components/Mobile/CustomizeTomato.vue';
import {ref} from 'vue';
import TomatoExplanation from '../../components/Mobile/TomatoExplanation.vue';
import ResourcesLoader from '../../three/ResourcesLoader';
import tomatoResources from '../../three/resources/tomatoResources';
import {tomatoLoader} from '../../composables/useLoader';

const props = defineProps(['id'])

const state = ref('tomatoExplanation')

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
  <main class="theme-gradient h-full text-white">
    <Transition name="fade" mode="out-in">
      <TomatoExplanation v-if="state === 'tomatoExplanation'" @next="sendSequence('startTomato')" />
      <CustomizeTomato v-else-if="state === 'customizeTomato'"/>
    </Transition>
  </main>
</template>
