<script setup lang="ts">
import usePair from '../../composables/usePair'
import {computed, ref} from 'vue'
import {useQRCode} from '@vueuse/integrations/useQRCode'
import sequenceManager from '../../managers/sequenceManager';
import {growLoader} from '../../composables/useLoader';
import useBypassMode from '../../composables/useBypassMode';

const emit = defineEmits(['pair'])

const {link, id} = usePair()
link.pair(null)
link.onPair(() => {
  emit('pair', link)
})

const pairUrl = computed(() => {
  return `${window.location.protocol}//${window.location.host}/mobile/${id.value}`
})
const qrCode = useQRCode(pairUrl, {
  color: {
    dark: "#fff",
    light: "#00000000",
  }
})

const hasPhone = ref(false)


const {load} = growLoader
load()

const {isBypass} = useBypassMode()
</script>
<template>
  <div class="text-white h-full flex flex-col items-center justify-center p-12 relative">
    <Transition name="fade-quick" mode="out-in">
      <section class="flex flex-col items-center justify-center max-w-96 text-center" v-if="hasPhone">
        <p class="text-lg">Pour connecter votre téléphone, scannez ce QRcode avec votre appareil photo.</p>
        <div class="my-8 border-2 border-white rounded-lg">
          <img :src="qrCode" alt="Pair with id">
        </div>
        <p class="italic">Alternativement, vous pouvez ouvrir <br>
          <a :href="pairUrl" class="underline" target="_blank">www.atmos-serre.com</a> <br>
          sur votre téléphone.</p>
      </section>
      <div class="flex flex-col items-center justify-center" v-else>
        <h2 class="text-5xl font-title font-bold mb-6">Vous êtes en retard...</h2>
        <section class="max-w-172">
          <p class="text-center font-light leading-8">En retard pour le travail, vous quittez précipitemment votre
            domicile.
            Vous n'avez pas eu le temps de lancer l'étape de pousse, mais ce n'est pas grave car cela peut se faire à
            distance, grâce à l'application de gestion Atmos.</p>
          <div class="flex justify-center gap-4 mt-8">
            <button class="btn" @click="hasPhone = true">J'ai mon téléphone !</button>
            <RouterLink to="/" class="btn">Je reviendrai plus tard, promis !</RouterLink>
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>
