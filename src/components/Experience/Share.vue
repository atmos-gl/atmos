<script setup lang="ts">
import {defineProps, ref, toRefs} from 'vue';
import {shareUrl} from '../../config'
import {CollectScene} from '../../three/CollectScene';

const props = defineProps<{
  scene?: CollectScene
}>()
const { scene } = toRefs(props)

const shareId = ref(null)
const username = ref('')
const submitted = ref(false)

const newShareUrl = shareUrl + 'new'

const confirmName = async () => {
  submitted.value = true
  const sceneData = scene.value.getSceneData()
  const result = await fetch(newShareUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username.value, sceneData})
  }).then(r => r.text())
  console.log(result)
}
</script>
<template>
  <div
      class="absolute w-1/2 h-full top-0 right-0">
    <div class="p-16 text-jade flex flex-col h-full justify-center max-w-156 gap-6">
      <h1 class="font-title text-10xl font-bold">Bravo</h1>
      <p>Votre panier de tomates est prêt ! Vous pourrez recevoir vos invités avec des produits de qualité et on ne peut
        plus fais !</p>
      <Transition name="fade-quick">
        <div v-if="shareId" class="flex text-lg items-center gap-2">
          <span class="font-bold">Partager sur :</span>
          <i class="uil uil-facebook-f text-2xl"></i>
          <i class="uil uil-instagram text-2xl"></i>
          <i class="uil uil-twitter text-2xl"></i>
        </div>
        <form @submit.prevent="confirmName" v-else class="text-lg flex flex-col gap-3">
          <span class="font-semibold">Partager votre panier</span>
          <div class="flex items-center">
            <input
                class="appearance-none border-y border-l border-jade bg-white/20 rounded-l-lg flex-grow py-2 px-4 text-jade leading-tight focus:(outline-none ring ring-jade/70 ring-offset-transparent) transiton duration-200 disabled:text-jade/50"
                id="username"
                type="text"
                placeholder="Votre nom..."
                v-model="username"
                :disabled="submitted"
            >
            <button type="submit"
                    class="btn btn-square focus:(outline-none ring ring-jade/70 ring-offset-transparent)"
                    :disabled="submitted || username === ''"
            >
              Envoyer
            </button>
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>
