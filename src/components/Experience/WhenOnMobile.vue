<script setup lang="ts">
import {toRefs} from 'vue';
import {StateValue} from 'xstate';
import Grow from './Grow.vue'
import {growLoader} from '../../composables/useLoader';
import sequenceManager from '../../managers/sequenceManager';

const props = defineProps<{
  step: StateValue
}>()
const {step} = toRefs(props)
const { loading, percentageProgress } = growLoader
</script>
<template>
  <div class="flex-col flex h-full w-full">
    Ca se passe sur votre application ! Consultez votre téléphone.
    <button v-if="step === 'customizeTomato'"
            @click=" sequenceManager.send('tomatoOk')"
            class="relative z-1000">Bonjour la tomate
    </button>
    <div v-if="['grow', 'customizeTomato'].includes(step)">
      <div v-if="loading">Loading: {{ percentageProgress }}</div>
      <Grow v-else />
    </div>
  </div>
</template>
