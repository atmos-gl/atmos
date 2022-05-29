<script setup lang="ts">
import {headerLoader} from "../composables/useLoader";
import HeaderScene from './Header/HeaderScene.vue';
import ScrollingText from './Header/ScrollingText.vue';
import {ref} from 'vue';
import {useElementVisibility} from '@vueuse/core';

const scrollingLines = 4

// Loading flow
const headerEl = ref(null)
const headerIsVisible = useElementVisibility(headerEl)
</script>

<template>
  <header ref="headerEl" class="h-screen text-white font-core snake mb-32 flex flex-col">
    <nav class="o-container flex items-end w-full py-8">
      <h1>
        <img src="./../assets/img/logo.png" class="h-16">
      </h1>
      <ul class="flex ml-auto">
        <li class="mr-4"><a href="">Serre</a></li>
        <li class="mr-4"><a href="">Valeurs</a></li>
        <li><a href="">Panier</a></li>
      </ul>
    </nav>

  <div class="o-container flex text-jade flex-1 pt-20 pb-32">
    <div class="absolute-y-center text-customBig font-title font-bold uppercase leading-none flex flex-col opacity-15 -z-1">
      <ScrollingText v-for="line in scrollingLines"/>
    </div>

    <div class="w-2/5 pt-20">
      <h2 class="font-title font-bold text-8xl">Atmos</h2>
      <h3 class="my-6 text-4xl">La serre qui réduit l'effet de serre</h3>
      <p>Atmos, votre serre connectée vous facilite le quotidien en adoptant une démarche écologgique et durable. Manger sain et varié devient une priorité.</p>
    </div>
    <div class="w-3/5">
      <HeaderScene/>
    </div>
  </div>
  </header>
</template>
