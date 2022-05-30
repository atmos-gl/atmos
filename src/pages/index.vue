<script setup lang="ts">
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import Section from './../components/Hp/Section.vue';
import Explore from './../components/Explore.vue';
import data from "../data/hpSectionsData";
import Loader from '../components/Loader.vue';
import {computed, onBeforeUnmount, ref, watch} from 'vue';
import {exploreLoader, growLoader, headerLoader, powerBlockLoader} from '../composables/useLoader';
import {delay} from '../utils';

const loading = computed(() => {
  return (
      headerLoader.loading.value
      || exploreLoader.loading.value
      || powerBlockLoader.loading.value
      || growLoader.loading.value
  )
})
const progress = computed(() => {
  return (
      headerLoader.progress.value
      + exploreLoader.progress.value
      + powerBlockLoader.progress.value
      + growLoader.progress.value
  ) / 4
})
headerLoader.load()
exploreLoader.load()
powerBlockLoader.load()
growLoader.load()
const displayLoading = ref(loading.value)
watch(loading, async newVal => {
  if (newVal === false) {
    await delay(800)
    displayLoading.value = false
  }
})

</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="displayLoading" class="h-full w-full theme-gradient">
      <Loader :progress="progress"/>
    </div>
    <main v-else>
      <Header ref="headerEl"/>
      <Section v-for="(section) in data" :data="section"/>
      <Explore/>
      <Footer/>
    </main>
  </Transition>
</template>
