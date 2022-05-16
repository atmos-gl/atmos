<script setup lang="ts">
import {ref} from 'vue';
import {useUrlSearchParams} from '@vueuse/core';

const params = useUrlSearchParams()

const currentPoc = ref(params.id ? 'mobile' : '')
</script>

<template>
  <RouterView></RouterView>
</template>
