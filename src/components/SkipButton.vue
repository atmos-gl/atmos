<script setup lang="ts">
import sequenceManager from '../managers/sequenceManager'
import useBypassMode from '../composables/useBypassMode';
import {useActor} from '@xstate/vue';
import {computed, watch} from 'vue';

const {isBypass} = useBypassMode()

const {state, send} = useActor(sequenceManager)

const nextEvents = computed(() => state.value.nextEvents)

const skipStates = [
  {
    event: 'skip-to-collect',
    content: 'Passer vers la collecte'
  },
  {
    event: 'skip-to-share',
    content: 'Passer vers le partage'
  },
]
const additionnalButtons = computed(() => skipStates.filter(state => nextEvents.value.includes(state.event)))
</script>
<template>
  <div class="fixed bottom-4 left-8 z-100 flex gap-2 items-center" v-if="isBypass">
    <button v-if="nextEvents.includes('skip')" class="text-jade/80 flex items-center" @click="send('skip')">Passer <i class="uil text-xl uil-angle-right mt-1"></i></button>

    <button v-for="button in additionnalButtons" :key="button.event" class="text-jade/80 flex items-center" @click="send(button.event)">
      {{ button.content }} <i class="uil text-xl uil-angle-double-right mt-1"></i>
    </button>
  </div>
</template>
