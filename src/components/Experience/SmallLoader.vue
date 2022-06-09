<script setup lang="ts">
import ResourcesLoader from '../../three/ResourcesLoader';
import {LoaderComposable} from '../../composables/useLoader';

const props = defineProps<{
  loader: LoaderComposable
}>()
const {loading} = props.loader
</script>
<template>
  <Transition name="fade" mode="out-in">
    <div v-if="loading"
         class="absolute bottom-0 left-0  px-12 py-8 pointer-events-none">
      <span class="animate-breathe opacity-70">
        <slot />
      </span>
    </div>
  </Transition>
</template>
