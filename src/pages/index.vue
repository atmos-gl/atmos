<script setup lang="ts">
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import Section from './../components/Hp/Section.vue';
import Explore from './../components/Explore.vue';
import data from "../data/hpSectionsData";
import Loader from '../components/Loader.vue';
import {ref} from 'vue';
import {headerLoader} from '../composables/useLoader';

const {loading, progress} = headerLoader
setTimeout(() => {
  headerLoader.load()
}, 1000)
const tmp = ref(0)
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Loader v-if="true" :progress="tmp" />
    <main v-else>
      <Header />
      <Section v-for="(section) in data" :data="section" />
      <Explore />
      <Footer />
    </main>
  </Transition>
</template>
