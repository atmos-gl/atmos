<script setup lang="ts">
import useKeySequence from './composables/useKeySequence';
import useBypassMode from './composables/useBypassMode';
import Mute from './components/Mute.vue';

const {toggleBypass} = useBypassMode()
useKeySequence(['Shift', 'Shift', 'm', 'Shift', 'Shift'],
    300,
    () => {
      toggleBypass()
    })
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <component :is="Component"/>
    </transition>
  </RouterView>
  <Mute class="fixed right-6 bottom-6" />
</template>
<style scoped lang="scss">
.cursor {
  @apply w-full h-full rounded-full border-2 border-white transition-all duration-200;
  transform: scale(0.6);

  &.click {
    transform: scale(0.3);
    background-color: #fff;
  }

  &.grab {
    transform: scale(1);
  }
}
</style>
