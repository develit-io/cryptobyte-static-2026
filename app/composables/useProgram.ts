import { defineStore } from 'pinia'
import SuperJSON from 'superjson'
import type { Stage, Talk } from '@/types'
import snapshot from '../../data/snapshot.json'

// Vertical scale for the program table view: how many pixels one minute occupies.
// Drives talk card heights/positions, the timebar, and the day panel total height.
export const MINUTE_HEIGHT_PX = 7

type TalksByStage = Record<number, Talk[]>
type TalksByDateAndStage = Record<string, TalksByStage>
type TalksByDate = Record<string, Talk[]>
type DatesByDate = Record<string, Date>

const toDateKey = (date: Date) => {
  const dateKey = date.toISOString().split('T')[0]

  if (!dateKey) {
    throw new Error('Unable to format program date key.')
  }

  return dateKey
}

export const useProgramStore = defineStore('program', () => {
  // Initialize synchronously so SSR and direct navigation use exactly the same archive.
  const stages = ref<Stage[]>(structuredClone(snapshot.stages.data))
  const talks = ref<Talk[]>(SuperJSON.parse<Talk[]>(JSON.stringify(snapshot.talks)))

  const talksByDateAndStage = computed(() => {
    const groupedTalks: TalksByDateAndStage = {}
    talks.value.forEach(talk => {
      const date = toDateKey(talk.start)
      const stage = talk.stage
      const talksByStage = groupedTalks[date] ??= {}
      const stageTalks = talksByStage[stage] ??= []

      stageTalks.push(talk)
    })
    return groupedTalks
  })

  // function go get talks by date
  const talksByDate = computed(() => {
    const groupedTalks: TalksByDate = {}
    talks.value.forEach(talk => {
      const date = toDateKey(talk.start)
      const dateTalks = groupedTalks[date] ??= []

      dateTalks.push(talk)
    })
    return groupedTalks
  })

  // when does a first talk start on a given date?
  const dayStartByDate = computed(() => {
    const groupedTalks: DatesByDate = {}
    talks.value.forEach(talk => {
      const date = toDateKey(talk.start)
      const start = talk.start
      const currentStart = groupedTalks[date]

      if (!currentStart || start < currentStart) {
        groupedTalks[date] = start
      }
    })
    return groupedTalks
  })

  // when does a last talk end on a given date?
  const dayEndByDate = computed(() => {
    const groupedTalks: DatesByDate = {}
    talks.value.forEach(talk => {
      const date = toDateKey(talk.start)
      const end = new Date(talk.start)
      end.setMinutes(end.getMinutes() + talk.length)
      const currentEnd = groupedTalks[date]

      if (!currentEnd || end > currentEnd) {
        groupedTalks[date] = end
      }
    })
    return groupedTalks
  })

  // how many minuts are between the start and the end of a given date?
  const dayLengthByDate = computed(() => {
    const groupedDays: { [key: string]: number } = {}
    Object.keys(dayStartByDate.value).forEach(date => {
      const start = dayStartByDate.value[date]
      const end = dayEndByDate.value[date]
      if (start && end) {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const diff = endDate.getTime() - startDate.getTime()
        const diffInMinutes = Math.floor(diff / (1000 * 60))
        groupedDays[date] = diffInMinutes
      }
    })
    return groupedDays
  })

  const programDays = computed(() => {
    return Object.entries(talksByDateAndStage.value).flatMap(([date, talksByStage]) => {
      const dayStart = dayStartByDate.value[date]
      const dayEnd = dayEndByDate.value[date]
      const dayLength = dayLengthByDate.value[date]
      const dateTalks = talksByDate.value[date]

      if (!dayStart || !dayEnd || dayLength === undefined || !dateTalks) {
        return []
      }

      return [{
        date,
        talksByStage,
        talks: dateTalks,
        dayStart,
        dayEnd,
        dayLength,
      }]
    })
  })

  // find stage by id (returns undefined for unknown / draft stages)
  const getStageById = (id: number): Stage | undefined => {
    return stages.value.find((stage: Stage) => stage.id === id)
  }

  return {
    stages,
    talks,
    talksByDateAndStage,
    talksByDate,
    dayStartByDate,
    dayEndByDate,
    dayLengthByDate,
    programDays,
    getStageById,
  }
})
