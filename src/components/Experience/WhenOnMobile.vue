<script setup lang="ts">
import {toRefs} from 'vue';
import {StateValue} from 'xstate';
import Grow from './Grow.vue'
import {growLoader} from '../../composables/useLoader';
import sequenceManager from '../../managers/sequenceManager';
import Collect from './Collect.vue';

const props = defineProps<{
  step: StateValue
}>()
const {step} = toRefs(props)
const {loading, percentageProgress} = growLoader
</script>
<template>
  <div class="flex-col flex h-full w-full relative">
    <Transition name="fade">

    <div v-if="['grow', 'growReady', 'customizeTomato', 'collect'].includes(step)" class="">
      <Transition name="fade" mode="out-in">
        <div v-if="loading">Loading: {{ percentageProgress }}</div>
        <Grow v-else-if="['customizeTomato', 'growReady', 'grow'].includes(step)"/>
        <Collect v-else-if="['collect'].includes(step)"/>
      </Transition>
    </div>
    </Transition>

    <Transition name="fade">
    <div v-if="['customizeTomato', 'tomatoExplanation'].includes(step)" class="absolute w-full h-full inset-0 center-content bg-imperial/60">
      <div class="max-w-172 text-jade italic text-center">
        Ça se passe sur votre application ! <br>
        Consultez votre téléphone.
      </div>
    </div>
    </Transition>
  </div>
</template>
