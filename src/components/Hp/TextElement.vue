<script setup lang="ts">
const props = defineProps(['text'])
</script>

<template>
  <ul v-if="Array.isArray(text)" class="mb-4">
    <li v-for="item in text" class="custom-dot">{{item}}</li>
  </ul>
  <p v-else class="font-light text-lg leading-7 mb-4">{{ text }}</p>
</template>

<style scoped lang="scss">
.custom-dot {
  @apply relative pl-4;

  &::before {
    content: '';
    @apply absolute top-1/2 transform -translate-y-1/2 border border-white rounded-full h-1.5 w-1.5 left-0;
  }
}
</style>