<script setup lang="ts">
  import {toRefs} from "vue";

  const props = defineProps(['data', 'visible'])
  const {data, visible} = toRefs(props)

  const emit = defineEmits(['close'])
</script>

<template>
  <div v-show="visible"  @click="emit('close')"
       class="border border-px border-white absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 bg-imperial text-jade px-16 py-12 w-md rounded-xl z-5">
    <h2 class="font-title text-4xl mb-8 font-bold">{{ data.title }}</h2>

    <div class="font-light">
      <p v-for="content in data.content" class="mb-4">{{ content.text }}</p>
    </div>

    <div class="flex mt-8">
      <p v-for="content in data.features" class="mr-6 text-lg font-bold">{{ content.text }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>