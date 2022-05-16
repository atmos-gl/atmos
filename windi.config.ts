import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    theme: {
        extend: {
            colors: {
                'imperial': '#074D2F',
                'jade': '#CDE4D5',
                'pearl': '#F5F7F6',
                'bg': '#001606',
            },
            fontFamily: {
                'title': ['dahlia'],
                'core': ['cera-pro'],
                'sans': ['cera-pro'],
            },
            fontSize: {
                customWide: '257px'
            },
            opacity: {
                '15': '0.15'
            }
        }
    },
})
