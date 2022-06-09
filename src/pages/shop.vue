<script setup lang="ts">
import Header from '../components/Header/Header.vue';
import Slider from '../components/Shop/Slider.vue';
import Popup from '../components/Shop/Popup.vue';
import Mute from '../components/Mute.vue';
</script>

<template>
  <main class="h-screen flex flex-col overflow-hidden theme-gradient--reversed">
    <Header />

    <Slider />
    <Popup />

    <Mute class="fixed left-6 bottom-6 z-500" />
  </main>
</template>
