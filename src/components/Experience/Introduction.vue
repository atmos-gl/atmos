<script setup lang="ts">
import {ref} from "vue";
import {powerBlockLoader} from '../../composables/useLoader';
import SmallLoader from './SmallLoader.vue';

const isFirstSlide = ref(true)
</script>

<template>
  <div class="relative w-full h-full">
    <Transition name="fade-quick" mode="out-in">
      <div v-if="isFirstSlide"
           class="text-pearl flex flex-col justify-center items-center w-full h-full">
        <p class="absolute-center font-title text-white -z-1 text-customWide text-pearl font-bold opacity-15 -mt-10 js-poiDesc">
          Repas
        </p>
        <p class="text-center text-xl max-w-1/2 leading-10 mt-20">
          Ce soir vous attendez des convives pour votre crémaillière. Avant de
          partir au travail vous devez démarrer votre serre afin de lancer
          les plantations pour ce soir.
        </p>
        <button @click="isFirstSlide = false" class="mt-8 btn">Suivant</button>
      </div>
      <div v-else
           class="text-pearl container mx-auto flex flex-col justify-center items-center w-full h-full">
        <p class="absolute-center font-title text-white -z-1 text-customWide text-pearl font-bold opacity-15 -mt-10 js-poiDesc">
          Modules</p>
        <p class="text-center text-xl max-w-1/2 leading-10 mt-20">
          Pour que votre serre produise les meilleurs ingrédients pour votre
          repas, vous allez devoir placer les différents modules dans la
          centrale. C02, eau, fertilisants ou encore pilule énergétique.
        </p>
        <button @click="$emit('next')" class="mt-8 btn">C'est parti !</button>
      </div>
    </Transition>
    <SmallLoader :loader="powerBlockLoader" />
  </div>
</template>
