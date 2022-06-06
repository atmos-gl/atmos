<script setup lang="ts">
import useShareResult from '../../composables/useShareResult';

const {shareId, shareOnFacebookUrl, shareOnTwitterUrl, imageDownloadUrl} = useShareResult()
</script>
<template>
  <div
      class="absolute w-1/2 h-full top-0 right-0">
    <div class="p-16 text-jade flex flex-col h-full justify-center max-w-156 gap-6">
      <h1 class="font-title text-10xl font-bold">Bravo</h1>
      <p>Votre panier de tomates est prêt ! Vous pourrez recevoir vos invités avec des produits de qualité et on ne peut
        plus fais !</p>
      <Transition name="fade-quick" mode="out-in">
        <div v-if="shareId" class="flex text-lg items-center gap-2">
          <span class="font-bold">Partager sur :</span>
          <a :href="shareOnTwitterUrl"
             target="_blank"
             title="Tweeter"><i class="uil uil-twitter text-2xl"></i></a>
          <a :href="shareOnFacebookUrl"
             target="_blank"
             title="Partager sur Facebook"
          ><i class="uil uil-facebook-f text-2xl"></i></a>
          <a :href="imageDownloadUrl"
             target="_blank"
             title="Télécharger l'image"><i class="uil uil-image-download text-2xl"></i></a>
        </div>
      </Transition>
    </div>
  </div>
</template>
