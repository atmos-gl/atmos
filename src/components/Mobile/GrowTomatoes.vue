<script setup lang="ts">
import GrowSteps from './GrowSteps.vue';
import {ref} from 'vue';
import {animate} from 'popmotion';

const ready = ref(false)
const goButton = ref<HTMLElement>(null)
const isReady = async () => {
  ready.value = true
  animate({
    from: window.scrollY,
    to: document.body.scrollHeight - window.innerHeight,
    onUpdate: v => {
      document.body.scrollTo({top: v})
    }
  })
}
</script>
<template>
  <div class="min-h-full w-full relative flex flex-col p-10 gap-4">
    <h1 class="font-title text-2xl text-center">C'est parti !</h1>
    <GrowSteps class="mt-4" @animation-finished="isReady"/>
    <div ref="goButton" class="flex flex-col mt-4 items-center gap-4 readyBtn" :class="{ready}">
      <span class="text-jade font-light w-full">Lancer la pousse:</span>
      <div class="rounded-full p-6 border border-jade">
        <button
            class="bg-imperial w-28 h-28  rounded-full flex items-center justify-center font-bold text-2xl"
          @click="$emit('grow')"
        >
          GO
        </button>
      </div>
    </div>
<!--    <div class="fixed inset-0 w-full h-full bg-imperial/80 backdrop-filter">-->
<!--      Hezy-->
<!--    </div>-->
  </div>
</template>
<style scoped>
.readyBtn {
  @apply transition duration-300 opacity-1;

  &.ready {
    @apply opacity-100;
  }
}
</style>
