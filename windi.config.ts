import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    attributify: true,
    theme: {
        extend: {
            colors: {
                'imperial': '#074D2F',
                'vervain': '#829f6eff',
                'jade': '#CDE4D5',
                'pearl': '#F5F7F6',
                'bg': '#001606',
                'anthracite': '#272727',
            },
            fontFamily: {
                'title': ['dahlia'],
                'core': ['cera-pro'],
                'sans': ['cera-pro'],
            },
            fontSize: {
                customBig: '150px',
                customWide: '257px'
            },
            height: {
                'introModels': '320px'
            },
            maxWidth: {
                'introModels': '456px',
            },
            opacity: {
                '15': '0.15'
            }
        }
    },
})
