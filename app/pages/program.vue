<script lang="ts" setup>
import 'primeicons/primeicons.css'
import { useStorage } from '@vueuse/core'
import { MINUTE_HEIGHT_PX } from '@/composables/useProgram'

definePageMeta({
  colorMode: 'light',
  title: 'Program',
})

const programStore = useProgramStore()

const {
  stages,
  talks: programTalks,
  programDays,
} = storeToRefs(programStore)

const { isFavorite, favoritesMode, syncFavoriteState } = useFavorites()
const viewMode = useStorage('viewMode', 'table' as 'table' | 'list', undefined, { initOnMounted: true })

const stagesById = computed(() => {
  return new Map(stages.value.map(stage => [stage.id, stage]))
})

const programDaysWithStages = computed(() => {
  return programDays.value.map(day => ({
    ...day,
    talksWithStage: day.talks.flatMap(talk => {
      const stage = stagesById.value.get(talk.stage)

      if (!stage) {
        return []
      }

      return [{ talk, stage }]
    }),
  }))
})

watch(
  () => programTalks.value.map((talk: { id: number }) => talk.id),
  talkIds => {
    if (talkIds.length) {
      void syncFavoriteState(talkIds)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div bg-white w-full>
    <div :class="viewMode === 'table' ? 'min-w-[1300px]' : 'min-w-full'" sticky top-0 z-100 bg-white>
      <div w-96vw sticky left-0 z-10>
        <Navbar full-width hide-mobile-menu />
      </div>
    </div>
    <div :class="viewMode === 'table' ? 'min-w-[1300px]' : 'min-w-full'">
      <div w-96vw sticky left-0 z-10>
        <div mb-40px px-20px>
          <NuxtLink to="/#domu" text-xs flex gap-2 items-center lg:hidden>
            <i class="pi pi-arrow-left" style="font-size:12px" />
            <span footer-link>Úvodní stránka</span>
          </NuxtLink>
          <NuxtLink to="/#domu" lg:hidden>
            <NuxtImg src="/logo.svg" alt="CryptoByte" h-50px w-150px text-center mx-auto />
          </NuxtLink>
          <h1 h1 text-center>
            Program 2026
          </h1>
        </div>

        <div flex flex-col md:flex-row justify-center items-center gap-4>
          <SwitchView />
          <SwitchFavorites />
        </div>
      </div>
    </div>
    <div>
      <Tabs value="2026-05-16">
        <TabList :class="viewMode === 'table' ? 'min-w-[1300px]' : 'min-w-full'">
          <div sticky left-0>
            <Tab value="2026-05-15">
              Pátek 15.5.
            </Tab>
            <Tab value="2026-05-16">
              Sobota 16.5.
            </Tab>
          </div>
        </TabList>
        <ClientOnly>
          <!-- table view start -->
          <TabPanels v-if="viewMode==='table'">
            <TabPanel v-for="day in programDaysWithStages" :key="day.date" :value="day.date" :style="{ height: `${day.dayLength * MINUTE_HEIGHT_PX + 60 + (day.date === '2026-05-16' ? 120 : 0)}px` }">
              <div class="min-w-[1300px]">
                <div class="grid grid-cols-[60px_repeat(7,1fr)] gap-2">
                  <!-- table header start -->
                  <div sticky left-0 top-0 lg:top-72px bg-slate-200 z-11 border-r-2 border-white />
                  <div v-for="stage in stages" :key="stage.id" sticky top-0 lg:top-72px z-10 h-60px>
                    <StageHeader :name="stage.name" />
                  </div>
                  <!-- table header end -->
                  <!-- timebar start -->
                  <div bg-white sticky left-0 z-10 :style="{ height: `${day.dayLength * MINUTE_HEIGHT_PX}px` }">
                    <Timebar :day-start="day.dayStart" :day-end="day.dayEnd" />
                  </div>
                  <!-- timebar end -->
                  <div v-for="stage in stages" :key="stage.id" :style="{ height: `${day.dayLength * MINUTE_HEIGHT_PX}px` }">
                    <div relative h-full>
                      <ClientOnly>
                        <TalkCard v-for="talk in day.talksByStage[stage.id] ?? []" :key="talk.id" :talk="talk" :stage="stage" :day-start="day.dayStart" />
                      </ClientOnly>
                    </div>
                  </div>
                </div>
                <ClientOnly>
                  <AfterpartyRow v-if="day.date === '2026-05-16'" />
                </ClientOnly>
              </div>
            </TabPanel>
          </TabPanels>
          <!-- table view end -->

          <!-- list view start -->
          <TabPanels v-if="viewMode==='list'">
            <TabPanel v-for="day in programDaysWithStages" :key="day.date" :value="day.date">
              <div flex flex-col gap-2 mb-10 w-full>
                <template v-if="favoritesMode==='all' || day.talksWithStage.some(({ talk }) => isFavorite(talk.id))">
                  <template v-for="row in day.talksWithStage" :key="row.talk.id">
                    <ClientOnly>
                      <TalkCardInline v-if="favoritesMode==='all' || isFavorite(row.talk.id)" :talk="row.talk" :stage="row.stage" :day-start="day.dayStart" />
                    </ClientOnly>
                  </template>
                </template>
                <template v-else>
                  <div text-center text-gray-500 mt-20px>
                    Žádné oblíbené přednášky
                  </div>
                </template>
                <ClientOnly>
                  <AfterpartyCardInline v-if="day.date === '2026-05-16'" />
                </ClientOnly>
              </div>
            </TabPanel>
          </TabPanels>
          <!-- list view end -->
        </ClientOnly>
      </Tabs>
    </div>
    <div :class="viewMode === 'table' ? 'min-w-[1300px]' : 'min-w-full'">
      <div w-96vw sticky left-0 z-10>
        <Footer />
      </div>
    </div>
  </div>
</template>
