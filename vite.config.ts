import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import voie from 'vite-plugin-voie'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        voie(),
        WindiCSS(),
    ],
    server: {
        host: '0.0.0.0'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "./src"),
        }
    }
})
