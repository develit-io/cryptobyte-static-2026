<script lang="ts" setup>
import type { Person } from '@/types'

const props = defineProps<{
  person: Person
}>()
</script>

<template>
  <div flex flex-row gap-2 items-center py-1>
    <NuxtImg
      h-40px w-40px object-cover object-center rounded-full :src="`${props.person.img}`" :alt="props.person.name"
    />
    <div>
      <div font-bold>
        {{ person.name }}
      </div>
      <div text-xs>
        {{ person.position }}
      </div>
    </div>
  </div>
</template>
