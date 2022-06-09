<script setup lang="ts">
import TextElement from '../../components/Hp/TextElement.vue';

const props = defineProps(['data'])

const videoUrl = {
  safari: `/assets/video/${props.data.video}-hevc-safari.mp4`,
  chrome: `/assets/video/${props.data.video}-vp9-chrome.webm`,
}

</script>

<template>
  <section class="o-container flex justify-between relative flex-col mt-30 gap-16" :class="data.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'">
    <div class="h-full snake w-1/2">
      <video width="700" height="100%" autoplay loop muted playsinline disablePictureInPicture>
        <source
            :src="videoUrl.safari"
            type='video/mp4; codecs="hvc1"'>
        <source
            :src="videoUrl.chrome"
            type="video/webm">
      </video>
    </div>

    <div class="my-35 flex-grow w-1/2" >
      <h2 class="font-title text-5xl mb-12 font-bold text-jade" >{{ data.title }}</h2>
      <TextElement v-for="text in data.texts" :text="text"/>
    </div>
  </section>
</template>

<style scoped>

</style>
