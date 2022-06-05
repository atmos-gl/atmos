<script setup lang="ts">
import useKeySequence from './composables/useKeySequence';
import useBypassMode from './composables/useBypassMode';
import sequenceManager from './managers/sequenceManager';

// useKeySequence(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
//     1000,
//     () => {
//       console.log('konami')
//     })
const {setBypass} = useBypassMode()
useKeySequence(['Shift', 'Shift', 'm', 'Shift', 'Shift'],
    300,
    () => {
  setBypass(true)
    })

//tmp
window.tmp = () => {
  sequenceManager.send('skip-powerblock')
}
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <component :is="Component"/>
    </transition>
  </RouterView>

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
