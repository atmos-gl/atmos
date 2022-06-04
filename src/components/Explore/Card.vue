<script setup lang="ts">
  import {toRefs} from "vue";

  const props = defineProps(['data', 'visible'])
  const {data, visible} = toRefs(props)

  const emit = defineEmits(['close'])
</script>

<template>
  <transition name="fade">
    <div v-show="visible" class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 h-full bg-bg flex items-center pl-64 gradient z-5">
<!--    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 h-full bg-bg flex items-center pl-64 gradient z-5">-->
      <div class="border border-px border-white bg-imperial text-jade px-16 py-12 w-md rounded-xl relative">
        <h2 class="font-title text-4xl mb-8 font-bold">{{ data.title }}</h2>

        <div class="font-light">
          <p v-for="content in data.content" class="mb-4">{{ content.text }}</p>
        </div>

        <div class="flex mt-8">
          <p v-for="content in data.features" class="mr-6 text-lg font-bold">{{ content.text }}</p>
        </div>

        <div class="poi--close" @click="emit('close')"><i class="uil uil-times"></i></div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.gradient {
  background: linear-gradient(90deg, rgba(0,0,0,0) 0%, theme('colors.bg') 80%);
}
</style>
