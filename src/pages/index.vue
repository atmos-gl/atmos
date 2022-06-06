<script setup lang="ts">
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import Section from './../components/Hp/Section.vue';
import Explore from './../components/Explore.vue';
import data from "../data/hpSectionsData";
import Loader from '../components/Loader.vue';
import {ref, watch} from 'vue';
import {combineLoaders, exploreLoader, commonLoader} from '../composables/useLoader';
import {delay} from '../utils';
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
      <Header/>
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
