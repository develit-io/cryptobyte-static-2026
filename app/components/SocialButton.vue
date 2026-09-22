<script lang="ts" setup>
const props = defineProps<{
  href: string
  icon: string
  title: string
}>()
</script>

<template>
  <div>
    <NuxtLink :to="props.href" :title="props.title" target="_blank" rel="noopener noreferrer" bg-black hover:bg-gray-600 h-32px w-32px rounded-sm flex items-center justify-center text-white>
      <i :class="`pi pi-${props.icon} text-18px`" />
    </NuxtLink>
  </div>
</template>
