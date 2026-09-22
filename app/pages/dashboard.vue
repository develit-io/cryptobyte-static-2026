<script lang="ts" setup>
import 'primeicons/primeicons.css'
import SuperJSON from 'superjson'
import type { Stage, Talk } from '@/types'

type FavoriteDashboardTalk = {
  talkId: number
  count: number
  firstFavoritedAt: string | null
  lastFavoritedAt: string | null
}

type FavoriteDashboardResponse = {
  generatedAt: string
  totalFavorites: number
  uniqueBrowsers: number
  talks: FavoriteDashboardTalk[]
}

type DashboardData = {
  talks: Talk[]
  stages: Stage[]
  dashboard: FavoriteDashboardResponse
}

const talkFormatString: Record<Talk['format'], string> = {
  intro: 'Úvod + závěr',
  presentation: 'Přednáška',
  workshop: 'Workshop',
  panel: 'Panel',
  side: 'Doprovodný program',
}

definePageMeta({
  colorMode: 'light',
  title: 'Dashboard',
})

useHead({
  title: 'Dashboard | CryptoByte',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const formatDateTime = (value?: Date | string | null) => {
  if (!value) {
    return '-'
  }

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(date)
}

const { data, error, pending } = await useAsyncData<DashboardData>(
  'talk-favorites-dashboard',
  async () => {
    const [talksResponse, stagesResponse, dashboard] = await Promise.all([
      readSnapshot<string>('talks'),
      readSnapshot<{ data: Stage[] }>('stages'),
      readSnapshot<FavoriteDashboardResponse>('talk-favorites/dashboard'),
    ])
    const parsedTalks = SuperJSON.parse<Talk[]>(talksResponse ?? '[]')

    return {
      talks: parsedTalks.map(talk => ({
        ...talk,
        start: new Date(talk.start),
      })),
      stages: stagesResponse.data,
      dashboard,
    }
  },
)

const stagesById = computed(() => {
  return new Map((data.value?.stages ?? []).map(stage => [stage.id, stage.name]))
})

const favoritesByTalkId = computed(() => {
  return new Map((data.value?.dashboard.talks ?? []).map(talk => [talk.talkId, talk]))
})

const rows = computed(() => {
  return (data.value?.talks ?? [])
    .map(talk => {
      const favorite = favoritesByTalkId.value.get(talk.id)

      return {
        talk,
        count: favorite?.count ?? 0,
        firstFavoritedAt: favorite?.firstFavoritedAt ?? null,
        lastFavoritedAt: favorite?.lastFavoritedAt ?? null,
        stageName: stagesById.value.get(talk.stage) ?? `Stage ${talk.stage}`,
      }
    })
    .sort((first, second) => {
      const countDiff = second.count - first.count

      if (countDiff) {
        return countDiff
      }

      return first.talk.start.getTime() - second.talk.start.getTime()
    })
})

const totalFavorites = computed(() => data.value?.dashboard.totalFavorites ?? 0)
const uniqueBrowsers = computed(() => data.value?.dashboard.uniqueBrowsers ?? 0)
const activeTalks = computed(() => rows.value.filter(row => row.count > 0).length)
const topTalk = computed(() => rows.value.find(row => row.count > 0))
const generatedAt = computed(() => formatDateTime(data.value?.dashboard.generatedAt))
const isDashboardLoading = computed(() => pending.value)
</script>

<template>
  <main min-h-screen bg-gray-100 text-gray-950>
    <div max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8>
      <header flex flex-col gap-4 md:flex-row md:items-end md:justify-between>
        <div>
          <div text-xs uppercase tracking-wide text-cb-red font-700>
            Archivní přehled
          </div>
          <h1 mt-2 text-3xl sm:text-4xl font-700 font-exo>
            Dashboard srdíček
          </h1>
        </div>
        <p text-sm text-gray-600>
          Statický archiv 2026 · stav k {{ generatedAt }} UTC
        </p>
      </header>

      <div v-if="error && !isDashboardLoading" mt-8 border border-red-200 bg-red-50 p-4 text-red-800 rounded-1>
        Dashboard se nepodařilo načíst.
      </div>

      <template v-else>
        <section mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4>
          <div rounded-1 border border-gray-200 bg-white p-5 shadow-sm>
            <div text-xs uppercase tracking-wide text-gray-500 font-700>
              Celkem srdíček
            </div>
            <div mt-3 text-3xl font-800>
              {{ totalFavorites }}
            </div>
          </div>
          <div rounded-1 border border-gray-200 bg-white p-5 shadow-sm>
            <div text-xs uppercase tracking-wide text-gray-500 font-700>
              Počet uživatelů
            </div>
            <div mt-3 text-3xl font-800>
              {{ uniqueBrowsers }}
            </div>
          </div>
          <div rounded-1 border border-gray-200 bg-white p-5 shadow-sm>
            <div text-xs uppercase tracking-wide text-gray-500 font-700>
              Přednášky se srdíčkem
            </div>
            <div mt-3 text-3xl font-800>
              {{ activeTalks }}
            </div>
          </div>
          <div rounded-1 border border-gray-200 bg-white p-5 shadow-sm>
            <div text-xs uppercase tracking-wide text-gray-500 font-700>
              Top přednáška
            </div>
            <div mt-3 text-base font-800 leading-snug line-clamp-2>
              {{ topTalk?.talk.name ?? '-' }}
            </div>
            <div mt-2 text-sm text-gray-600>
              {{ topTalk ? `${topTalk.count} srdíček` : '-' }}
            </div>
          </div>
        </section>

        <section mt-8 rounded-1 border border-gray-200 bg-white shadow-sm>
          <div flex flex-col gap-2 border-b border-gray-200 px-5 py-4 md:flex-row md:items-center md:justify-between>
            <div>
              <h2 text-xl font-800 font-exo>
                Přednášky
              </h2>
              <p text-sm text-gray-600>
                Seřazeno podle počtu srdíček.
              </p>
            </div>
            <div text-sm text-gray-500>
              Archivováno (UTC): {{ generatedAt }}
            </div>
          </div>

          <div overflow-x-auto>
            <table min-w-full text-left text-sm>
              <thead bg-gray-50 text-xs uppercase tracking-wide text-gray-500>
                <tr>
                  <th px-5 py-3 font-700>
                    #
                  </th>
                  <th px-5 py-3 font-700>
                    Přednáška
                  </th>
                  <th px-5 py-3 font-700>
                    Format
                  </th>
                  <th px-5 py-3 font-700>
                    Stage
                  </th>
                  <th px-5 py-3 font-700>
                    Čas
                  </th>
                  <th px-5 py-3 font-700 text-right>
                    Srdíčka
                  </th>
                  <th px-5 py-3 font-700>
                    Posledni
                  </th>
                </tr>
              </thead>
              <tbody divide-y divide-gray-100>
                <tr v-if="isDashboardLoading && !data">
                  <td colspan="7" px-5 py-8 text-center text-gray-500>
                    Načítám dashboard...
                  </td>
                </tr>
                <tr v-else-if="!rows.length">
                  <td colspan="7" px-5 py-8 text-center text-gray-500>
                    Zatím nejsou k dispozici žádné přednášky.
                  </td>
                </tr>
                <tr v-for="row, index in rows" v-else :key="row.talk.id" hover:bg-gray-50>
                  <td px-5 py-4 text-gray-500>
                    {{ index + 1 }}
                  </td>
                  <td px-5 py-4>
                    <div font-700 text-gray-950>
                      {{ row.talk.name }}
                    </div>
                    <div v-if="row.firstFavoritedAt" mt-1 text-xs text-gray-500>
                      První: {{ formatDateTime(row.firstFavoritedAt) }}
                    </div>
                  </td>
                  <td px-5 py-4 text-gray-700>
                    {{ talkFormatString[row.talk.format] }}
                  </td>
                  <td px-5 py-4 text-gray-700>
                    {{ row.stageName }}
                  </td>
                  <td px-5 py-4 text-gray-700 whitespace-nowrap>
                    {{ formatDateTime(row.talk.start) }}
                  </td>
                  <td px-5 py-4 text-right>
                    <span inline-flex min-w-10 justify-center rounded-1 bg-gray-100 px-2 py-1 font-800 text-gray-950>
                      {{ row.count }}
                    </span>
                  </td>
                  <td px-5 py-4 text-gray-700 whitespace-nowrap>
                    {{ formatDateTime(row.lastFavoritedAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>
