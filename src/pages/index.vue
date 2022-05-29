<script setup lang="ts">
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import Section from './../components/Hp/Section.vue';
import Explore from './../components/Explore.vue';
import data from "../data/hpSectionsData";
import Loader from '../components/Loader.vue';
import {ref, watch} from 'vue';
import {headerLoader} from '../composables/useLoader';
import {delay} from '../utils';
import {useElementVisibility} from '@vueuse/core';

const {loading, progress} = headerLoader
headerLoader.load()
const displayLoading = ref(true)
watch(loading, async newVal => {
  if(newVal === false) {
    await delay(800)
    displayLoading.value = false
  }
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Loader v-if="displayLoading" :progress="progress" />
    <main v-else>
      <Header />
      <Section v-for="(section) in data" :data="section" />
      <Explore />
      <Footer />
    </main>
  </Transition>
</template>
