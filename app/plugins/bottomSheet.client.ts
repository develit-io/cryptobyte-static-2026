import { createBottomSheet } from 'bottom-sheet-vue3'
import 'bottom-sheet-vue3/style.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(createBottomSheet())
})
