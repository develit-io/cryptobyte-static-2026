<script lang="ts" setup>
import type { Person } from '@/types'
import 'primeicons/primeicons.css'

const props = defineProps<{
  person: Person
  grabCursor?: boolean
}>()
</script>

<template>
  <div :class="{ 'cursor-grab': props.grabCursor }" bg-neutral-900 overflow-clip rounded-10px>
    <div h-300px w-full relative p-1>
      <NuxtImg
        h-full w-full object-cover object-center rounded-t-8px rounded-b-50px :src="`${props.person.img}`" :alt="props.person.name"
      >
        <div
          v-if="person.role === 'moderator'"
          alt="Moderátor" title="Moderátor"
          w-30px h-30px absolute bottom-8px right-8px flex justify-center items-center rounded-full
        >
          <i class="pi pi-microphone" />
        </div>
      </nuxtimg>
    </div>
    <div
      class="w-full p-4  inline-flex flex-col justify-center relative"
      h-200px
    >
      <h3 text-md mb-2 mt-0 font-notch text-white>
        {{ props.person.name }}
      </h3>
      <div h-150px>
        <p class="font-normal text-12px font-300 mb-0 mt-0 text-neutral-300">
          {{ props.person.position }}
        </p>
        <div flex flex-wrap gap-20px w-full mt-1rem text-lg text-neutral-400 relative z-10>
          <a v-if="props.person.web_url" :href="props.person.web_url"><i class="pi pi-link cursor-pointer hover:opacity-75 transition-all" /></a>
          <a v-if="props.person.youtube_url" :href="props.person.youtube_url"><i class="pi pi-youtube cursor-pointer hover:opacity-75 transition-all" /></a>
          <a v-if="props.person.facebook_url" :href="props.person.facebook_url"><i class="pi pi-facebook cursor-pointer hover:opacity-75 transition-all" /></a>
          <a v-if="props.person.x_url" :href="props.person.x_url"><i class="pi pi-twitter cursor-pointer hover:opacity-75 transition-all" /></a>
          <a v-if="props.person.linkedin_url" :href="props.person.linkedin_url"><i class="pi pi-linkedin cursor-pointer hover:opacity-75 transition-all" /></a>
          <a v-if="props.person.instagram_url" :href="props.person.instagram_url"><i class="pi pi-instagram cursor-pointer hover:opacity-75 transition-all" /></a>
          <a v-if="props.person.email" :href="`mailto:${props.person.email}`"><i class="pi pi-at cursor-pointer hover:opacity-75 transition-all" /></a>
        </div>
      </div>
      <div absolute bottom-0 right--30px text-white opacity-10 font-sans text-250px font-800 leading-150px>
        5
      </div>
    </div>
  </div>
</template>
