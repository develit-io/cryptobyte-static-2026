import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    { 'app-btn': 'bg-blue' },
    { container: ' w-full sm:max-w-1200px mx-auto ' },
    { 'container-full': 'mx-auto' },
    { h1: 'font-notch text-28px md:text-44px text-black' },
    { h2: 'font-notch text-28px  text-black' },
    { h3: 'text-18px' },
    { 'footer-link': 'underline decoration-offset-2px decoration-dashed hover:decoration-solid' },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
    }),

  ],
  theme: {
    fontFamily: {
      sans: 'Montserrat, sans-serif',
      notch: '"Stack Sans Notch", sans-serif',
      exo: '"Exo Soft", sans-serif',
    },
    colors: {
      cb: {
        red: '#cd1719',
        blue: '#282b57',
      },
    },
  },
})
