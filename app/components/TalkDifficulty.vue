<script lang="ts" setup>
import type { TalkDifficulty } from '@/types'

const props = withDefaults(defineProps<{
  difficulty?: TalkDifficulty
  size?: 'sm' | 'md'
}>(), {
  difficulty: null,
  size: 'sm',
})

const pepperIndexes = [1, 2, 3] as const

const activeLevel = computed(() => {
  return typeof props.difficulty === 'number'
    ? Math.min(Math.max(Math.trunc(props.difficulty), 0), 3)
    : 0
})

const iconSizeClass = computed(() => props.size === 'md' ? 'h-5 w-5' : 'h-4 w-4')
const label = computed(() => `Obtížnost ${activeLevel.value} ze 3`)
</script>

<template>
  <div
    v-if="activeLevel"
    inline-flex items-center gap-0.5 shrink-0
    :aria-label="label"
    role="img"
    :title="label"
  >
    <svg
      v-for="pepper in pepperIndexes"
      :key="pepper"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      :class="[iconSizeClass, pepper <= activeLevel ? 'text-cb-red' : 'text-gray-400']"
      aria-hidden="true"
    >
      <path
        v-if="pepper <= activeLevel"
        fill="currentColor"
        d="M167.27 40.42A40.06 40.06 0 0 0 128 8a8 8 0 0 0 0 16a24 24 0 0 1 22.85 16.66A64.08 64.08 0 0 0 96 104c0 46.75-25.75 78-76.53 93a16 16 0 0 0 1.77 31.13A265 265 0 0 0 66.75 232c40.78 0 86.16-9.15 117.53-35.46C210.64 174.44 224 143.3 224 104a64.07 64.07 0 0 0-56.73-63.58M192 95l-28.42-14.17a8 8 0 0 0-7.16 0L128 95l-13.37-6.68a48 48 0 0 1 90.74 0Z"
      />
      <path
        v-else
        fill="currentColor"
        d="M165.57 42.26A38.07 38.07 0 0 0 128 10a6 6 0 0 0 0 12a26 26 0 0 1 25.38 20.35A62.08 62.08 0 0 0 98 104c0 47.75-26.23 79.68-78 94.93a14 14 0 0 0 1.56 27.24A262.5 262.5 0 0 0 66.81 230c40.36 0 85.23-9 116.19-35c25.88-21.71 39-52.33 39-91a62.06 62.06 0 0 0-56.43-61.74M160 54a50.09 50.09 0 0 1 47.82 35.38L192 97.28l-29.32-14.66a6 6 0 0 0-5.36 0L128 97.28l-15.81-7.91A50.07 50.07 0 0 1 160 54m15.28 131.82C150.15 206.89 95.36 227 23.67 214.33a1.88 1.88 0 0 1-1.67-1.89a1.81 1.81 0 0 1 1.43-2C80.06 193.73 110 156.92 110 104c0-.76 0-1.51.06-2.26l15.26 7.63a6 6 0 0 0 5.36 0L160 94.69l29.32 14.66a6 6 0 0 0 5.36 0l15.26-7.63c0 .75.06 1.5.06 2.26c0 35.02-11.68 62.51-34.72 81.83Z"
      />
    </svg>
  </div>
</template>
