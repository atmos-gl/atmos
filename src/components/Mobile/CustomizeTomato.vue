<script setup lang="ts">
import TomatoScene from './TomatoScene.vue';
import {tomatoLoader} from '../../composables/useLoader';
import ColorChooser from './ColorChooser.vue';
import {animate} from 'popmotion';
import {TomatoColor, TomatoParams} from '../../three/objects/Tomato';
import {computed, ref, Ref} from 'vue';
//Images
import standardTomato from '../../assets/img/tomatoPresets/standard.png'
import cherryTomato from '../../assets/img/tomatoPresets/cherry.png'
import longTomato from '../../assets/img/tomatoPresets/long.png'
import shortTomato from '../../assets/img/tomatoPresets/short.png'

const props = defineProps<{ tomato: TomatoParams }>()
const {tomato} = props
const emit = defineEmits(['confirm-tomato'])

const {loading} = tomatoLoader

const step: Ref<'preset' | 'customize'> = ref('preset')

const resetTomato = () => {
  tomato.color = TomatoColor.red

}
const tomatoPresets = [
  {
    name: 'Standard',
    image: standardTomato,
    color: TomatoColor.red,
    long: 1,
    size: 1,
  },
  {
    name: 'Plate noire',
    image: shortTomato,
    color: TomatoColor.black,
    long: 0.75,
    size: 1.1,
  },
  {
    name: 'Allongée verte',
    image: longTomato,
    color: TomatoColor.green,
    long: 1.4,
    size: 0.95,
  },
  {
    name: 'Cerise jaune',
    image: cherryTomato,
    color: TomatoColor.yellow,
    long: 1,
    size: 0.6,
  },
]
const selectedPresetIndex = ref(0)
const selectedPreset = computed(() => tomatoPresets[selectedPresetIndex.value])
const selectPreset = index => {
  selectedPresetIndex.value = index
  tomato.color = tomatoPresets[index].color
  animate({
    from: tomato,
    to: tomatoPresets[index],
    onUpdate: v => {
      tomato.long = v.long
      tomato.size = v.size
    }
  })
}
</script>
<template>
  <div class="min-h-full w-full relative flex flex-col">
    <h1 class="fixed top-0 left-0 w-full font-title text-2xl pt-10 text-center px-10 z-10">Personnaliser vos
      tomates</h1>
    <div class="fixed top-16 left-0 w-full h-[60vh] -mt-2/10 -mb-4/10 text-white">
      <TomatoScene v-if="!loading" :tomato="tomato"/>
    </div>
    <div class="h-[50vh] pointer-events-none"></div>
    <div class="w-full px-10 pb-10 relative z-15">
      <Transition name="fade-quick" mode="out-in">
        <div v-if="step === 'preset'" class="flex flex-col gap-6">
          <div class="text-jade w-full font-semibold text-lg">Choisir une base</div>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="(preset, i) in tomatoPresets"
                    :key="preset.name"
                    class="flex flex-col items-center rounded-lg border transition duration-200"
                    :class="i === selectedPresetIndex? 'bg-jade/20 border-jade' : 'bg-black/10 border-jade/70'"
                    @click="selectPreset(i)"
            >
              <img :src="preset.image" class="w-2/3">
              <span class="text-xs font-light text-jade/80 mb-3">
                {{ preset.name }}
              </span>
            </button>
          </div>

          <button class="btn" @click="step = 'customize'">Continuer</button>
        </div>
        <div v-else class="flex flex-col gap-3">
          <div class="text-jade w-full font-semibold text-lg">Personnaliser la base</div>

          <div
              class="flex items-center font-light text-sm text-jade/80 border border-jade/80 bg-black/10 rounded-lg disabled:(opacity-50)
          h-12 pl-2 pr-4 gap-3">
            <img :src="selectedPreset.image"
                 class="h-9/10">
            <span class="">Tomate {{ selectedPreset.name.toLowerCase() }} </span>
            <button class="ml-auto text-xl text-jade" @click="step = 'preset'"><i class="uil uil-pen"></i></button>
          </div>
          <div class="title">Forme</div>
          <input type="range"
                 class="input-range w-full  my-1"
                 v-model.number="tomato.long"
                 min="0.7"
                 max="1.5"
                 step="0.01"
          />
          <div class="w-full flex justify-between text-xs font-light text-jade/50">
            <span>Plate</span>
            <span>Allongée</span>
          </div>
          <div class="title mt-4">Taille</div>
          <input type="range"
                 class="input-range w-full  my-1"
                 v-model.number="tomato.size"
                 min="0.6"
                 max="1.4"
                 step="0.01"
          />
          <div class="w-full flex justify-between text-xs font-light text-jade/50">
            <span>Cerise</span>
            <span>Normale</span>
            <span>Grosse</span>
          </div>
          <div class="title mt-4">Couleur</div>
          <ColorChooser v-model="tomato.color"/>
          <div class="flex flex-col justify-between mt-8 gap-2">
            <button class="btn" @click="emit('confirm-tomato')">Valider</button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style scoped>
.title {
  @apply font-light w-full text-jade;
}

input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  cursor: pointer;
  @apply rounded-sm h-6 w-3 bg-jade transform -translate-y-1/2 shadow-xl;
//box-shadow: 0px 0px 20px rgba(205, 228, 213, 0.15);
}

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  @apply h-px bg-white/30 rounded-full;
  cursor: pointer;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #fff;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

</style>
