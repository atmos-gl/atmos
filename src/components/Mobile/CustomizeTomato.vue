<script setup lang="ts">
import TomatoScene from './TomatoScene.vue';
import {reactive} from 'vue';
import useLoader from '../../composables/useLoader';
import tomatoResources from '../../three/resources/tomatoResources';
import ColorChooser from './ColorChooser.vue';

const tomato = reactive({
  long: 1,
  size: 1,
  color: 'red'
})
const { loading } = useLoader(tomatoResources)
</script>
<template>
  <div class="h-full w-full flex flex-col items-center gap-4">
    <div class="flex flex-col flex-grow items-center gap-4 pt-10 w-full relative">
      <h1 class="font-title text-2xl px-10 relative z-10">Personnaliser votre tomate</h1>
      <div class="w-full h-14/10 -my-2/10 text-white relative">
        <TomatoScene v-if="!loading" :tomato="tomato" />
      </div>
    </div>
    <div class="flex flex-col w-full gap-4 overflow-y-scroll px-10 pb-10 relative z-15">
      <div class="font-light w-full text-jade">Forme</div>
      <input type="range"
             class="input-range w-full  my-1"
             v-model.number="tomato.long"
             min="0.7"
             max="1.5"
             step="0.01"
      />
      <div class="w-full flex justify-between text-xs font-light text-jade/50">
        <span>Plate</span>
        <span>Allongée</span>
      </div>
      <div class="font-light w-full text-jade mt-2">Taille</div>
      <input type="range"
             class="input-range w-full  my-1"
             v-model.number="tomato.size"
             min="0.7"
             max="1.5"
             step="0.01"
      />
      <div class="w-full flex justify-between text-xs font-light text-jade/50">
        <span>Cerise</span>
        <span>Normale</span>
        <span>Grosse</span>
      </div>
      <div class="font-light w-full text-jade mt-2">Couleur</div>
      <ColorChooser v-model="tomato.color" />
    </div>
  </div>
</template>
<style scoped>
input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}
input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  cursor: pointer;
  @apply rounded-sm h-6 w-3 bg-jade transform -translate-y-1/2 shadow-xl;
  //box-shadow: 0px 0px 20px rgba(205, 228, 213, 0.15);
}

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  @apply h-px bg-white/30 rounded-full;
  cursor: pointer;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #fff;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

</style>
