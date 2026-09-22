<script lang="ts" setup>
import type { Stage, Talk } from '@/types'

const props = defineProps<{
  talk: Talk
  stage: Stage
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
</script>

<template>
  <div>
    <div flex flex-row gap-2 justify-between mt-20px>
      <div font-semibold text-gray-900>
        {{ talk.name }}
      </div>
      <div flex items-center gap-3 shrink-0>
        <FavoriteHeart :talk-id="talk.id" />
      </div>
    </div>
    <table text-sm>
      <tbody>
        <tr>
          <td pr-2>
            Formát:
          </td>
          <td>{{ talkFormatString[talk.format] }}</td>
        </tr>
        <tr v-if="talk.difficulty">
          <td pr-2>
            Obtížnost:
          </td>
          <td><TalkDifficulty :difficulty="talk.difficulty" size="md" /></td>
        </tr>
        <tr>
          <td>Kdy:</td>
          <td>{{ talk.start.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) }} - {{ talkEnd.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) }} ({{ talk.length }} minut)</td>
        </tr>
        <tr>
          <td>Kde:</td>
          <td>{{ stage.name }}</td>
        </tr>
        <tr v-if="talk.persons.length">
          <td>Kdo:</td>
          <td>
            <div v-for="person in talk.persons" :key="person.id" flex flex-row gap-2 items-center>
              <PersonAvatar :person="person" />
            </div>
          </td>
        </tr>
        <tr v-if="talk.moderator">
          <td>Moderuje:</td>
          <td>
            <PersonAvatar :person="talk.moderator" />
          </td>
        </tr>
        <tr v-if="talk.description">
          <td>Téma:</td>
          <MDC :value="talk.description" class="mdc" tag="td" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td {
  padding: 4px;
  vertical-align: top;
}
</style>
