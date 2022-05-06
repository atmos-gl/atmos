<script setup lang="ts">
  import {toRefs} from "vue";

  const props = defineProps(['data', 'visible'])
  const {data, visible} = toRefs(props)

  const emit = defineEmits(['close'])
</script>

<template>
  <div v-show="visible"  @click="emit('close')" class="border border-px border-white absolute left-0 top-0 bg-imperial text-jade p-6">
    <p>{{ data.title }}</p>
  </div>
</template>

<style scoped>

</style>