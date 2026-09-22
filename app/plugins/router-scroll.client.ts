// plugins/router-scroll.client.ts
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:mounted', () => {
    const router = useRouter()

    router.options.scrollBehavior = async (to, from, savedPosition) => {
      if (savedPosition) return savedPosition

      if (to.hash) {
        await new Promise(resolve => setTimeout(resolve, 100))
        const el = document.querySelector(to.hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return { top: el.getBoundingClientRect().top + window.scrollY - 90 }
        }
      }

      return { top: 0 }
    }
  })
})
