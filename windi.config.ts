import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    theme: {
        extend: {
            colors: {
                'imperial': '#074D2F',
                'jade': '#CDE4D5',
                'pearl': '#F5F7F6',
            },
            fontFamily: {
                'core': ['Poppins'],
            }
        }
    }
})