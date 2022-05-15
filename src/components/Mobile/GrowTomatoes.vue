<script setup lang="ts">
import GrowSteps from './GrowSteps.vue';
import {nextTick, ref} from 'vue';
import {animate} from 'popmotion';

const ready = ref(false)
const goButton = ref<HTMLElement>(null)
const isReady = async () => {
  ready.value = true
  animate({
    from: window.scrollY,
    to: document.body.scrollHeight - window.innerHeight,
    onUpdate: v => {
      window.scrollTo({top: v})
    }
  })
}
</script>
<template>
  <div class="min-h-full w-full relative flex flex-col p-10 gap-4">
    <h1 class="font-title text-2xl text-center">C'est parti !</h1>
    <GrowSteps class="mt-4" @animation-finished="isReady" />
    <Transition name="fade">
<!--      Todo: switch v show to class opacity only -->
      <div v-show="ready" class="flex flex-col mt-4 items-center gap-4">
        <span class="text-jade font-light w-full">Lancer la pousse:</span>
        <div ref="goButton"
             class="bg-imperial w-32 h-32 rounded-full flex items-center justify-center font-bold text-2xl">
          GO
        </div>
      </div>
    </Transition>
  </div>
</template>
