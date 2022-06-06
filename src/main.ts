import '@iconscout/unicons/css/line.css'
import 'virtual:windi.css'
import './assets/css/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import useSoundEffect, {initSoundEffects} from './composables/useSoundEffect';

createApp(App)
    .use(router)
    .mount('#app')

initSoundEffects()
