<script setup lang="ts">
const props = defineProps(['text'])
</script>

<template>
  <p class="font-light text-jade text-xl leading-7 mb-2"
  v-html="text"
  ></p>
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
