<script lang="ts" setup>
const props = defineProps<{
  talkId: number
}>()

const { isFavorite, removeFromFavorites, addToFavorites } = useFavorites()

const favorited = computed(() => isFavorite(props.talkId))

const toggleFavorite = () => {
  if (favorited.value) {
    removeFromFavorites(props.talkId)
  }
  else {
    addToFavorites(props.talkId)
  }
}
</script>

<template>
  <button
    type="button"
    flex items-center gap-1
    cursor-pointer leading-none
    border-none bg-transparent p-0
    :class="favorited ? 'text-cb-red' : 'text-gray-900'"
    :aria-pressed="favorited"
    :aria-label="favorited ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'"
    @click.stop="toggleFavorite"
  >
    <i :class="favorited ? 'pi pi-heart-fill' : 'pi pi-heart'" />
  </button>
</template>
