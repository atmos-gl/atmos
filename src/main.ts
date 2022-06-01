import '@iconscout/unicons/css/line.css'
import 'virtual:windi.css'
import './assets/css/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

createApp(App)
    .use(router)
    .mount('#app')
