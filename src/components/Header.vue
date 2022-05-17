<script setup lang="ts">
import {headerLoader} from "../composables/useLoader";
import HeaderScene from '../components/HeaderScene.vue';

const {loading, percentageProgress} = headerLoader
// headerLoader.load()
</script>

<template>
  <header class="h-screen text-white font-core snake mb-32 flex flex-col">
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

  <div class="o-container flex text-jade flex-1 py-32">
    <div class="w-2/5">
      <h2 class="font-title font-bold text-8xl">Atmos</h2>
      <h3 class="my-6 text-4xl">La serre qui réduit l'effet de serre</h3>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</p>
    </div>
    <div class="w-3/5">
<!--      <div v-if="loading">Loading: {{ percentageProgress }}</div>-->

<!--      <HeaderScene v-else/>-->
    </div>
  </div>
  </header>
</template>
