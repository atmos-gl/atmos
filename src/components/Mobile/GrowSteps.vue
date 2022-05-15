<script setup lang="ts">
import {delay} from '../../utils';
import {onMounted, reactive} from 'vue';

const emit = defineEmits(['animation-finished'])

const steps = reactive([
  {
    text: `Installation des graines de <b>tomate</b>`,
    active: false
  },
  {
    text: `Sélection d'un CO2 de climat chaud`,
    active: false
  },
  {
    text: `Sélection d'une eau d'un climat tempéré`,
    active: false
  },
  {
    text: `Sélection d'un fertilisant d'Amérique du Sud`,
    active: false
  },
  {
    text: `Activation de l'énergie nucléaire`,
    active: false
  },
  {
    text: `Musique prête à être activée`,
    active: false
  },
])
const animate = async () => {
  await delay(200)
  for (const step of steps) {
    step.active = true
    await delay(500)
  }
  emit('animation-finished')
}
onMounted(animate)
</script>
<template>
  <div class="flex flex-col w-full gap-3">
    <div
        v-for="(step, i) in steps"
        :key="i"
        class="border border-jade bg-black/10 rounded-full px-5 h-16 flex gap-4 items-center justify-between step"
        :class="{active: step.active}"
    >
      <div v-html="step.text" class="text-sm"></div>
      <div class="icon border border-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
        <i class="uil uil-check text-sm"></i>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.step {
  transform: translateX(32px);
  opacity: 0;
  transition: all .2s ease-out;

  .icon {
    transform: scale(2);
    opacity: 0;
    transition: all .2s ease-out .3s;
  }

  &.active {
    &, .icon {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
