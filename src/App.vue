<script setup lang="ts">
import {ref} from 'vue';
import {useUrlSearchParams} from '@vueuse/core';
import useCursor from './composables/useCursor';

const params = useUrlSearchParams()

const currentPoc = ref(params.id ? 'mobile' : '')

const {lerpCursor, cursorProps} = useCursor()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <component :is="Component"/>
    </transition>
  </RouterView>
  <div class="fixed inset-0 w-full h-full z-100 pointer-events-none">
    <div class="w-12 h-12 absolute -top-6 -left-6"
         :style="{ transform: `translate3d(${lerpCursor.x}px, ${lerpCursor.y}px,0)` }"
    >
      <div class="cursor" :class="cursorProps.class"></div>
    </div>
  </div>

</template>
<style scoped lang="scss">
.cursor {
  @apply w-full h-full rounded-full border-2 border-white transition duration-200;
  &.click {
    transform: scale(0.5);
    background-color: #fff;
  }
}
</style>
