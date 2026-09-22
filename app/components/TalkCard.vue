<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import { MINUTE_HEIGHT_PX } from '@/composables/useProgram'
import type { Stage, Talk } from '@/types'

const props = defineProps<{
  talk: Talk
  stage: Stage
  dayStart: Date
}>()

const { isFavorite } = useFavorites()
const { favoritesMode } = useFavorites()

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

const [isOpen, toggleOpen] = useToggle(false)
</script>

<template>
  <div
    absolute left-0 bg-gray-200 w-full
    hover:bg-gray-300
    flex flex-col gap-2
    overflow-hidden
    p-2
    text-sm
    cursor-pointer
    border-b-2 border-white
    :style="{
      top: `${minutesFromDayStart * MINUTE_HEIGHT_PX}px`,
      height: `${talk.length * MINUTE_HEIGHT_PX}px`,
    }"
    :opacity="isFavorite(talk.id) || favoritesMode === 'all' ? 100 : 30"
    @click="toggleOpen()"
  >
    <div v-if="talk.format !== 'intro' && talk.length > 10" flex flex-row gap-2 justify-between items-start>
      <div flex items-center gap-2 text-xs>
        <span>{{ talkFormatString[talk.format] }}</span>
      </div>
      <FavoriteHeart :talk-id="talk.id" />
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
    <BasePopupWrapper v-model="isOpen">
      <TalkDetail :talk="talk" :stage="stage" />
    </BasePopupWrapper>
  </div>
</template>
