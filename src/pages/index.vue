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

const {loading, progress, load} = combineLoaders(commonLoader, exploreLoader)
const displayLoading = ref(loading.value)
watch(loading, async newVal => {
  if (newVal === false) {
    await delay(800)
    displayLoading.value = false
  }
})
load()

</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="displayLoading" class="h-full w-full theme-gradient">
      <Loader :progress="progress"/>
    </div>
    <main v-else>
      <Header />
      <Section v-for="(section) in data" :data="section"/>
      <Explore/>
      <Footer/>
    </main>
  </Transition>
</template>
