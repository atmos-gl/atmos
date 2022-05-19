<script setup lang="ts">
  import {ref} from "vue";

  const isFirstSlide = ref(true)
</script>

<template>
  <div v-if="isFirstSlide"
       class="text-pearl container mx-auto flex flex-col justify-center items-center w-full h-full">
    <p class="text-center text-xl">
      Intro à mettre en forme ici
    </p>
    <button @click="isFirstSlide = false" class="mt-16">Suivant</button>
  </div>
  <div v-else
       class="text-pearl container mx-auto flex flex-col justify-center items-center w-full h-full">
    <p class="text-center text-xl">
      Seconde Intro à mettre en forme ici
    </p>
    <button @click="$emit('next')" class="mt-16">Suivant</button>
  </div>
</template>
