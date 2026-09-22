<script lang="ts" setup>
import 'primeicons/primeicons.css'
import { MINUTE_HEIGHT_PX } from '@/composables/useProgram'

definePageMeta({
  colorMode: 'light',
  title: 'Program',
})

const { stages, programDays } = storeToRefs(useProgramStore())

const saturdayProgramDays = computed(() => {
  return programDays.value.filter(day => day.date === '2026-05-16')
})
</script>

<template>
  <div bg-white w-full>
    <div>
      <!-- table view start -->

      <div v-for="day in saturdayProgramDays" :key="day.date" :value="day.date" :style="{ height: `${day.dayLength * MINUTE_HEIGHT_PX + 60}px` }">
        <div>
          <div class="grid grid-cols-[60px_repeat(7,1fr)] gap-2">
            <!-- table header start -->
            <div bg-white z-11 border-r-2 border-white />
            <div v-for="stage in stages" :key="stage.id" h-60px>
              <StageHeader :name="stage.name" />
            </div>
            <!-- table header end -->
            <!-- timebar start -->
            <div h-1300px bg-white>
              <Timebar :day-start="day.dayStart" :day-end="day.dayEnd" />
            </div>
            <!-- timebar end -->
            <div v-for="stage in stages" :key="stage.id">
              <div relative>
                <ClientOnly>
                  <TalkCardPrint v-for="talk in day.talksByStage[stage.id] ?? []" :key="talk.id" :talk="talk" :stage="stage" :day-start="day.dayStart" />
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- table view end -->
    </div>
  </div>
</template>
