<script setup lang="ts">
import Header from './../components/Header.vue';
import Section from './../components/Hp/Section.vue';
import data from "../data/hpSectionsData";
</script>

<template>
  <Header />
  <main>
    <Section v-for="(section) in data" :data="section" />
  </main>
</template>
