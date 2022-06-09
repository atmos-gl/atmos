<script setup lang="ts">
import Header from '../components/Header/Header.vue';
import Slider from '../components/Shop/Slider.vue';
import Popup from '../components/Shop/Popup.vue';
</script>

<template>
  <main class="h-screen flex flex-col overflow-hidden theme-gradient--reversed">
    <Header />

    <Slider />
    <Popup />
  </main>
</template>

<style scoped lang="scss">

</style>
