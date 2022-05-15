<script setup>
import tomatoIcon from '../../assets/img/tomatoIcon.png'

const plants = [
  {
    name: 'Tomate',
    icon: tomatoIcon,
    disabled: false
  },
  {
    name: 'Avocat',
    icon: tomatoIcon,
    disabled: true
  },
  {
    name: 'Carotte',
    icon: tomatoIcon,
    disabled: true
  },
]
</script>
<template>
  <div class="flex flex-col h-full p-10 items-center gap-4">
    <h1 class="font-title text-2xl text-center">Goûtez le futur</h1>
    <p class="italic text-jade font-light text-sm">
      Grâce aux nombreuses informations dont dispose la centrale de votre serre, ainsi que des rayonnements produits par
      son réacteur nucléaire, vous pouvez personnaliser finement vos productions.
    </p>
    <h2 class="self-start text-sm font-bold text-jade mt-4">Choisissez un aliment à faire pousser</h2>
    <div class="flex flex-col w-full gap-3">
      <button
          v-for="plant in plants"
          :key="plant.name"
          class="block
          flex items-center font-light text-jade border border-white bg-black/10 rounded-lg disabled:(opacity-50)
          h-16 px-4 gap-3"
          :disabled="plant.disabled"
          @click="$emit('next')">
        <img :src="plant.icon"
             :alt="'Icone ' + plant.name"
             class="w-8">
        <div class="flex flex-col items-start">
          <span class="">
          {{ plant.name }}
          </span>
          <span v-if="plant.disabled" class="text-xs italic">Bientôt disponible !</span>
        </div>
      </button>
    </div>
  </div>
</template>
