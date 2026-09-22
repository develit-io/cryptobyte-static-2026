<script lang="ts" setup>
import { MINUTE_HEIGHT_PX } from '@/composables/useProgram'

const props = defineProps<{
  dayStart: Date
  dayEnd: Date
}>()

// array of times from dayStart to dayEnd by 10 minutes
const times = computed(() => {
  const start = new Date(props.dayStart)
  const end = new Date(props.dayEnd)
  const timesArray: string[] = []
  for (let i = start.getTime(); i <= end.getTime(); i += 10 * 60 * 1000) {
    const date = new Date(i)
    timesArray.push(date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }))
  }
  return timesArray
})
</script>

<template>
  <div
    w-60px relative
    :style="{ height: `${(props.dayEnd.getTime() - props.dayStart.getTime()) / (1000 * 60) * MINUTE_HEIGHT_PX + 20}px` }"
    text-gray-400
    bg-white
  >
    <div
      v-for="time, index in times"
      :key="time"
      text-xs absolute
      w-full
      :style="{ top: `${index * 10 * MINUTE_HEIGHT_PX}px` }"
      flex justify-center items-center
      :class="{ 'font-bold border-t-1 border-gray-900 text-gray-900': time.endsWith(':00') }"
    >
      {{ time }}
    </div>
  </div>
</template>
