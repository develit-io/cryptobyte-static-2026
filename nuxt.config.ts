import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      primary: {
        50: '{red.50}',
        100: '{red.100}',
        200: '{red.200}',
        300: '{red.300}',
        400: '{red.400}',
        500: '#cd1719',
        600: '{red.600}',
        700: '{red.700}',
        800: '{red.800}',
        900: '{red.900}',
        950: '{red.950}',
      },
    },
  },
})

export default defineNuxtConfig({
  telemetry: false,
  ssr: true,
  modules: ['@unocss/nuxt', '@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/image',
    'nuxt-swiper', '@primevue/nuxt-module', '@nuxtjs/mdc', '@vueuse/nuxt', 'nuxt-headlessui'],
  components: { global: true, dirs: ['~/components', '~/components/prose'] },
  app: { head: { htmlAttrs: { lang: 'cs' }, title: 'CryptoByte 2026',
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }] },
    pageTransition: false, layoutTransition: false },
  css: ['@unocss/reset/tailwind-compat.css', '~/assets/css/fonts.css'],
  colorMode: { classSuffix: '' },
  mdc: { components: { prose: false, map: { a: 'prose-a' } } },
  devtools: { enabled: false },
  compatibilityDate: '2025-09-01',
  nitro: { preset: 'static', prerender: { crawlLinks: true, failOnError: true,
    routes: ['/', '/program', '/print', '/dashboard', '/blog', '/media', '/gdpr', '/vop', '/index-soon', '/mapa'] } },
  image: { provider: 'none' },
  pinia: { storesDirs: ['~/composables'] },
  primevue: { options: { ripple: true, theme: { preset: MyPreset,
    options: { darkModeSelector: '.dark' } } } },
})
