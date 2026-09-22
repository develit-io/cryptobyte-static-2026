<script lang="ts" setup>
import { MINUTE_HEIGHT_PX } from '@/composables/useProgram'
import type { Stage, Talk } from '@/types'

const props = defineProps<{
  talk: Talk
  stage: Stage
  dayStart: Date
}>()

const minutesFromDayStart = computed(() => {
  const start = new Date(props.dayStart)
  const talkDate = new Date(props.talk.start)
  return Math.floor((talkDate.getTime() - start.getTime()) / (1000 * 60))
})

const talkFormatString = {
  intro: 'Úvod + závěr',
  presentation: 'Přednáška',
  workshop: 'Workshop',
  panel: 'Panel',
  side: 'Doprovodný program',
}

const talkEnd = computed(() => {
  const start = new Date(props.talk.start)
  const end = new Date(start.getTime() + props.talk.length * 60 * 1000)
  return end
})
</script>

<template>
  <div
    absolute left-0 bg-gray-100 w-full
    flex flex-col gap-2
    overflow-hidden
    p-2
    text-sm
    border-1 border-black
    :style="{
      top: `${minutesFromDayStart * MINUTE_HEIGHT_PX}px`,
      height: `${talk.length * MINUTE_HEIGHT_PX}px`,
    }"
  >
    <div v-if="talk.format !== 'intro' && talk.format !== 'side'" flex flex-row gap-2 justify-between items-start>
      <div flex items-center gap-2 text-xs>
        <span>{{ talkFormatString[talk.format] }}</span>
        <TalkDifficulty :difficulty="talk.difficulty" />
      </div>
    </div>
    <div>
      {{ talk.start.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) }} - {{ talkEnd.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) }} ({{ talk.length }} minut)
    </div>
    <div font-semibold text-gray-900>
      {{ talk.name }}
    </div>
    <div>
      <div v-for="person in talk.persons" :key="person.id" flex flex-row gap-1 items-center text-gray-900 text-xs>
        <i class="pi pi-user" style="font-size:12px" /> {{ person.name }}
      </div>
    </div>
    <div v-if="talk.moderator" text-gray-900 text-xs>
      <i class="pi pi-microphone" style="font-size:14px" /> {{ talk.moderator.name }} (moderátor)
    </div>
  </div>
</template>
