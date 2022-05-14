<script setup lang="ts">
const colors = {
  red: '#9A0000',
  yellow: '#D9B100',
  green: '#7EB533',
  black: '#262626',
}
</script>
<template>
  <div class="flex justify-between">
    <button v-for="(color, name) in colors" class="border border-white rounded-full p-1">
      <span class="w-8 h-8 block rounded-full" :style="{ backgroundColor: color }"></span>
    </button>
  </div>
</template>
