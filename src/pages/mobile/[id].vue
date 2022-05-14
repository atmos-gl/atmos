<script setup lang="ts">
import usePair from '../../composables/usePair';
import CustomizeTomato from '../../components/Mobile/CustomizeTomato.vue';
const props = defineProps(['id'])

// const {link, paired} = usePair()
// link.pair(props.id)
const paired = true
</script>
<template>
  <main v-if="paired" class="theme-gradient h-full text-white">
    <CustomizeTomato />
  </main>
</template>
