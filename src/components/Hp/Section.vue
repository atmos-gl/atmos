<script setup lang="ts">

const props = defineProps(['data'])

</script>

<template>
  <section class="o-container flex justify-between items-center flex-col py-35" :class="data.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'">
    <div class="w-full md:w-3/4 lg:w-1/2">
      <div class="relative max-w-introModels mx-auto snake" style="height: 550px">
        <img v-for="img in data.models" :src="img.src" :alt="img.alt" :class="img.classes">
      </div>
    </div>

    <div class="w-full md:w-3/4 lg:w-1/2" :class="data.isReversed ? 'lg:text-left' : 'lg:text-right'">
      <h2 class="font-title text-5xl mb-12 font-bold text-jade"
          :class="data.isReversed ? 'lg:mr-28' : 'lg:ml-28'">{{ data.title }}</h2>
      <p class="font-light text-lg leading-7">{{ data.text }}</p>
    </div>
  </section>
</template>

<style scoped>

</style>