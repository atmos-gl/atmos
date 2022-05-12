<script setup lang="ts">
import usePair from '../../composables/usePair';
const props = defineProps(['id'])

const {link, paired} = usePair()
link.pair(props.id)
</script>
<template>
  <main>
    {{ paired }}
  </main>
</template>
