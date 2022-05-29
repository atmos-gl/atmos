<script setup lang="ts">
import ExplorePoi from './Explore/ExplorePoi.vue';
import {exploreLoader} from '../composables/useLoader';
import {delay} from '../utils';

const {loading, percentageProgress} = exploreLoader
setTimeout(() => exploreLoader.load(), 3000)
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <ExplorePoi v-else/>
</template>
