<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<template>
  <div
    bg-gray-900
    px-2 text-sm font-bold text-white mb-8px h-60px flex flex-row items-center
  >
    <div>{{ name }}</div>
  </div>
</template>
