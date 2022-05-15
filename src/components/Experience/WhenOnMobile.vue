<script setup lang="ts">
import {toRefs} from 'vue';
import {StateValue} from 'xstate';

const props = defineProps<{
  step: StateValue
}>()
const { step } = toRefs(props)
</script>
<template>
  <div class="flex-col flex h-full w-full">
    Ca se passe sur votre application ! Consultez votre téléphone.
    <div v-if="step === 'customizeTomato'">Bonjour la tomate</div>
  </div>
</template>
