<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import type { Stage, Talk } from '@/types'

const props = defineProps<{
  talk: Talk
  stage: Stage
  dayStart: Date
}>()

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

const [isOpen, toggleOpen] = useToggle(false)
</script>

<template>
  <div
    flex flex-row gap-2
    cursor-pointer
    @click="toggleOpen()"
  >
    <div w-300px bg-gray-400 text-gray-900 flex flex-col justify-center p-2>
      <div>
        <span text-sm font-semibold>
          {{ talk.start.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) }}
        </span>
        <span text-xs> - {{ talkEnd.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) }}</span>
      </div>
      <div text-xs font-semibold>
        {{ stage.name }}
      </div>
      <div text-xs>
        {{ talk.length }} min.
      </div>
    </div>
    <div
      bg-gray-200 w-full
      hover:bg-gray-300
      flex flex-col gap-2
      overflow-hidden
      p-2
      text-sm
    >
      <div flex flex-row gap-2 justify-between items-start>
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
  </div>
</template>
