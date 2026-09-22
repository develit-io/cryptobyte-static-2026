<script lang="ts" setup>
defineProps<{
  fullWidth?: boolean
  hideMobileMenu?: boolean
}>()

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const menuItems = [
  { name: 'Domů', link: '/#domu' },
  { name: 'O konferenci', link: '/#o-konferenci' },
  { name: 'Hosté', link: '/#hoste' },
  { name: 'Partneři', link: '/#partneri' },
  { name: 'FAQ', link: '/#faq' },
  { name: 'Program', link: '/program' },
  { name: 'Blog', link: '/blog' },
]

const route = useRoute()
const activeLink = ref(route.fullPath)

watchEffect(() => {
  activeLink.value = route.hash ? `${route.path}${route.hash}` : route.fullPath
})
</script>

<template>
  <div sticky top-0 z-100 w-full mb-16px>
    <!-- desktop menu -->
    <div
      h-full border-b-4px border-gray-1 hidden lg:block
      :class="{ 'bg-white': fullWidth }"
    >
      <div container>
        <nav bg-white px-24px flex flex-row justify-between items-center>
          <NuxtLink to="/#domu">
            <NuxtImg src="/logo.svg" alt="CryptoByte" w-130px h-40px />
          </NuxtLink>
          <div flex gap-0px items-center>
            <NuxtLink
              v-for="i in menuItems" :key="i.link" :to="i.link"
              block h-full w-auto p-20px
              font-notch text-16px font-700
              border-t-4px border-white
              hover="border-cb-red"
              duration-300
              :class="{ 'border-cb-red!': activeLink === i.link }"
            >
              {{ i.name }}
            </NuxtLink>
          </div>
          <NuxtLink to="https://vstupenky.cryptobyte.cz/" flex items-center font-notch>
            <Button label="Vstupenky" h-fit>
              <i class="pi pi-ticket" />
              Vstupenky
            </Button>
          </NuxtLink>
        </nav>
      </div>
    </div>
    <!-- mobile menu -->
    <div v-if="!hideMobileMenu" fixed top-0 right-0 w-80px h-80px block lg:hidden z-100>
      <div w-full>
        <div container flex flex-col items-end p-20px>
          <div bg-white w-60px h-60px flex flex-col justify-between p-18px cursor-pointer z-10 @click="toggleMenu">
            <span v-for="i in 3" :key="i" w-full h-5px bg-black block />
          </div>
          <div v-show="showMenu" absolute w-100dvw h-100dvh top-0 right-0 bg-black opacity-50 z-2 @click="toggleMenu" />
          <div v-show="showMenu" bg-white w-300px sm:max-w-300px z-10 right-0>
            <div p-24px>
              <NuxtLink to="/" @click="toggleMenu">
                <NuxtImg src="/logo.svg" alt="CryptoByte" w-130px h-40px />
              </NuxtLink>
            </div>
            <nav flex flex-col gap-0px>
              <NuxtLink
                v-for="i in menuItems" :key="i.link" :to="i.link"
                block h-full w-auto
                font-notch
                text-16px font-700 px-16px py-12px
                border-l-4px border-white
                hover="border-cb-red"
                duration-300
                :class="{ 'border-cb-red!': activeLink === i.link }"
                @click="toggleMenu"
              >
                {{ i.name }}
              </NuxtLink>
              <div p-24px mx-auto font-notch>
                <NuxtLink to="https://vstupenky.cryptobyte.cz/" flex items-center>
                  <Button label="Vstupenky" size="large">
                    <i class="pi pi-ticket" />
                    Vstupenky
                  </Button>
                </NuxtLink>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
