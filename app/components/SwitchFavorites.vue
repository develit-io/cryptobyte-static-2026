<script lang="ts" setup>
const { favoritesMode } = useFavorites()

const options = [
  { label: 'Všechny', value: 'all', icon: 'pi pi-heart' },
  { label: 'Oblíbené', value: 'favorites', icon: 'pi pi-heart-fill' },
]

const selectedMode = ref('all')

onMounted(() => {
  selectedMode.value = favoritesMode.value
})

watch(selectedMode, newValue => {
  favoritesMode.value = newValue
})
</script>

<template>
  <SelectButton
    v-model="selectedMode"
    :options="options"
    option-label="label"
    option-value="value"
    size="small"
    :allow-empty="false"
  >
    <template #option="slotProps">
      <i :class="slotProps.option.icon" style="font-size: 12px" />
      {{ slotProps.option.label }}
    </template>
  </SelectButton>
</template>
