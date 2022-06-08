<script setup lang="ts">
import {shareUrl} from '../../config';
import useShareResult from '../../composables/useShareResult';
import {onMounted, ref} from 'vue';
import {useShare} from '@vueuse/core';
const {shareId, shareOnTwitterUrl, shareOnFacebookUrl, imageDownloadUrl} = useShareResult()
const imageSrc = shareUrl + shareId.value + '/top-shot.png'
const { share, isSupported } = useShare()
const image = ref(null)
onMounted(async () => {
  if (!isSupported) return
  image.value = await fetch(shareUrl + shareId.value + '/mobile-image.png').then(r => r.blob())
})

const shareResult = () => {
  const filesArray: File[] = [new File([image.value], 'tomates.png', { type: image.value.type, lastModified: new Date().getTime() })];
  if (isSupported) {
    share({
      files: filesArray
    })
  }
}
</script>
<template>
  <div class="flex flex-col h-full p-10 items-center gap-3 text-jade">
    <h1 class="text-6xl font-title font-bold">Bravo !</h1>
    <img :src="imageSrc" class="w-full my-4">
    <span class="font-bold">Partager sur :</span>
    <section class="flex text-lg items-center gap-3">
      <a :href="shareOnTwitterUrl"
         target="_blank"
         title="Tweeter"><i class="uil uil-twitter text-4xl"></i></a>
      <button
          v-if="image"
         title="Partager sur Instagram"
          @click="shareResult"
      ><i class="uil uil-instagram text-4xl"></i></button>
      <button
          v-if="image"
          @click="shareResult"
         title="Partager ailleurs"><i class="uil uil-share-alt text-4xl"></i></button>
    </section>
  </div>
</template>
