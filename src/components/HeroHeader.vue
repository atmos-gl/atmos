<script setup lang="ts">
import HeaderScene from './Header/HeaderScene.vue';
import ScrollingText from './Header/ScrollingText.vue';
import Header from "./Header/Header.vue";

const scrollingLines = 4
</script>

<template>
  <header class="h-screen text-white font-core snake mb-32 flex flex-col relative">
    <div class="o-container flex items-center text-jade flex-1 pt-0 pb-0 gap-4">
      <div
          class="absolute-y-center text-customBig font-title font-bold uppercase leading-none flex flex-col opacity-15 -z-1">
        <ScrollingText v-for="line in scrollingLines"/>
      </div>

      <div class="w-2/5 mb-12">
        <h2 class="font-title font-bold text-8xl">Atmos</h2>
        <h3 class="my-6 text-4xl">La serre qui réduit l'effet de serre</h3>
        <p>Atmos, votre serre connectée vous facilite le quotidien en adoptant une démarche écologgique et durable.
          Manger sain et varié devient une priorité.</p>
      </div>
      <div class="w-3/5 relative h-full">
        <HeaderScene/>
      </div>
    </div>
    <Header class="absolute top-0 left-0 w-full"/>
  </header>
</template>
