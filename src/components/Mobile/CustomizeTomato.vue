<script setup lang="ts">
import TomatoScene from './TomatoScene.vue';
import {reactive} from 'vue';
import useLoader from '../../composables/useLoader';
import tomatoResources from '../../three/resources/tomatoResources';
import ColorChooser from './ColorChooser.vue';
import {animate} from 'popmotion';

const tomato = reactive({
  long: 1,
  size: 1,
  color: 'red'
})
const { loading } = useLoader(tomatoResources)

const resetTomato = () => {
  tomato.color = 'red'
  animate({
    from: tomato,
    to: {
      long: 1,
      size: 1,
      color: 'red'
    },
    onUpdate: v => {
      tomato.long = v.long
      tomato.size = v.size
    }
  })
}
</script>
<template>
  <div class="min-h-full w-full relative flex flex-col">
    <h1 class="fixed top-0 left-0 w-full font-title text-2xl pt-10 text-center px-10 z-10">Personnaliser votre tomate</h1>
    <div class="fixed top-16 left-0 w-full h-[60vh] -mt-2/10 -mb-4/10 text-white">
      <TomatoScene v-if="!loading" :tomato="tomato" />
    </div>
    <div class="h-[50vh] pointer-events-none"></div>
    <div class="flex flex-col w-full gap-3 px-10 pb-10 relative z-15">
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
      <div class="font-light w-full text-jade mt-4">Taille</div>
      <input type="range"
             class="input-range w-full  my-1"
             v-model.number="tomato.size"
             min="0.6"
             max="1.4"
             step="0.01"
      />
      <div class="w-full flex justify-between text-xs font-light text-jade/50">
        <span>Cerise</span>
        <span>Normale</span>
        <span>Grosse</span>
      </div>
      <div class="font-light w-full text-jade mt-4">Couleur</div>
      <ColorChooser v-model="tomato.color" />
      <div class="flex justify-between mt-6">
        <button @click="resetTomato">Réinitialiser</button>
        <button>Valider</button>
      </div>
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
