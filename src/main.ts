import '@iconscout/unicons/css/line.css'
import 'virtual:windi.css'
import './assets/css/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import {createCursorDirective} from './composables/useCursor';

// @ts-ignore
createApp(App)
    .use(router)
    .directive('cursor', createCursorDirective())
    .mount('#app')
