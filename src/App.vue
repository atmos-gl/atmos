<script setup lang="ts">
import {ref} from 'vue';
import {useUrlSearchParams} from '@vueuse/core';

const params = useUrlSearchParams()

const currentPoc = ref(params.id ? 'mobile' : '')
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <component :is="Component"/>
    </transition>
  </RouterView>

</template>
