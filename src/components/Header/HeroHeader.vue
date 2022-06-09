<script setup lang="ts">
import HeaderScene from './HeaderScene.vue';
import ScrollingText from './ScrollingText.vue';
import Header from "./Header.vue";
import bottlesImage from '../../assets/img/bottles-header.png'

import recyclingIcon from '../../assets/img/labels/label_recyclable.svg'
import naturalIcon from '../../assets/img/labels/label_natural.svg'
import localIcon from '../../assets/img/labels/label_local.svg';
import fairIcon from '../../assets/img/labels/label_equitable.svg';
import veganIcon from '../../assets/img/labels/label_vegan.svg';

const labels = {
  naturalIcon,
  recyclingIcon,
  localIcon,
  veganIcon,
  fairIcon,
}
const scrollingLines = 4
</script>

<template>
  <header class="h-screen text-white font-core snake mb-32 flex flex-col relative overflow-hidden">
    <div class="absolute left-1/5 top-0 w-full h-full">
      <HeaderScene/>
      <img :src="bottlesImage" class="absolute left-1/2 transform -translate-x-1/2 bottom-1/6 h-1/4 pointer-events-none">
    </div>
    <div class="o-container flex items-center text-jade flex-1 pt-0 pb-0 gap-4 relative pointer-events-none">
      <div
          class="absolute-y-center text-customBig font-title font-bold uppercase leading-none flex flex-col opacity-15 -z-1">
        <ScrollingText v-for="line in scrollingLines" :key="line"/>
      </div>

      <div class="w-2/5 mb-12 pointer-events-auto">
        <h2 class="font-title font-bold text-8xl">Atmos</h2>
        <h3 class="my-6 text-4xl">La serre qui réduit l'effet de serre</h3>
        <p>Atmos, votre serre connectée vous facilite le quotidien en adoptant une démarche écologgique et durable.
          Manger sain et varié devient une priorité.</p>
        <div class="flex items-center w-full gap-4 mt-8">
          <img v-for="label in labels"
               :src="label"
               :key="label"
               alt="label"
               class="w-1/6 opacity-80"
          >
        </div>
      </div>
    </div>
    <Header class="absolute top-0 left-0 w-full"/>
  </header>
</template>
