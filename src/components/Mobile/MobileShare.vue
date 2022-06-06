<script setup lang="ts">
import {toRefs} from 'vue';
import {shareUrl} from '../../config';
const props = defineProps<{
  shareId: string
}>()
const {shareId} = props
const imageSrc = shareUrl + shareId + '/top-shot.png'

</script>
<template>
  <div class="flex flex-col h-full p-10 items-center gap-4">
    <h1 class="text-4xl font-title font-bold">Bravo !</h1>
    <img :src="imageSrc" class="w-full">
  </div>
</template>
