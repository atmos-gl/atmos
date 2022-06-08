<script setup lang="ts">
import HeroHeader from './../components/HeroHeader.vue';
import Footer from './../components/Footer.vue';
import Section from './../components/Hp/Section.vue';
import Explore from './../components/Explore.vue';
import data from "../data/hpSectionsData";
import Loader from '../components/Loader.vue';
import {ref} from 'vue';
import {combineLoaders, commonLoader, exploreLoader} from '../composables/useLoader';
import {useEventBus} from '@vueuse/core';

const {loading, progress, load} = combineLoaders(commonLoader, exploreLoader)
const displayLoading = ref(loading.value)
load()

const bus = useEventBus('init-scene')
bus.on(scene => {
  if (scene === 'explore') {
    displayLoading.value = false
  }
})

</script>

<template>
  <div>
    <main v-if="!loading">
      <HeroHeader />
      <Section v-for="(section) in data" :data="section"/>
      <Explore/>
      <Footer/>
    </main>
    <Transition name="fade-delay">
      <div v-show="displayLoading" class=" absolute inset-0 h-full w-full theme-gradient">
        <Loader :progress="progress"/>
      </div>
    </Transition>
  </div>
</template>
