<script setup lang="ts">
import ExplorePoi from './Explore/ExplorePoi.vue';
import {exploreLoader} from '../composables/useLoader';
import Loader from './Loader.vue';

const {loading, progress} = exploreLoader
</script>
<template>
  <Transition name="fade" mode="out-in">
    <div v-if="loading" class="h-screen w-full">
      <Loader :progress="progress"/>
    </div>
    <ExplorePoi v-else/>
  </Transition>
</template>
