<script setup lang="ts">
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import Section from './../components/Hp/Section.vue';
import Explore from './../components/Explore.vue';
import data from "../data/hpSectionsData";
import Loader from '../components/Loader.vue';
import {onBeforeUnmount, ref, watch} from 'vue';
import {exploreLoader, headerLoader} from '../composables/useLoader';
import {delay} from '../utils';

const {loading, progress} = headerLoader
headerLoader.load()
const displayLoading = ref(loading.value)
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
      <Header ref="headerEl" />
      <Section v-for="(section) in data" :data="section" />
      <Explore />
      <Footer />
    </main>
  </Transition>
</template>
