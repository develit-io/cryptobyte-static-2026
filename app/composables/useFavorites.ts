import { useStorage } from '@vueuse/core'
import snapshot from '../../data/snapshot.json'

const favorites = useStorage<number[]>('cryptobyte-2026-favorites', [])
const favoritesMode = useStorage('cryptobyte-2026-favorites-mode', 'all' as 'all' | 'favorites')
const archivedCounts = Object.fromEntries(snapshot['talk-favorites/dashboard'].talks.map(talk => [talk.talkId, talk.count]))

export const useFavorites = () => ({
  favorites,
  favoritesMode,
  addToFavorites: (id: number) => {
    if (Number.isSafeInteger(id) && id > 0 && !favorites.value.includes(id)) favorites.value.push(id)
  },
  removeFromFavorites: (id: number) => { favorites.value = favorites.value.filter(value => value !== id) },
  isFavorite: (id: number) => favorites.value.includes(id),
  getFavoriteCount: (id: number) => archivedCounts[id] ?? 0,
  // Existing program components can initialize without creating a server session.
  syncFavoriteState: async (_ids: number[]) => undefined,
})
