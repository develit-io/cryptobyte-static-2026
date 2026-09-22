<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const viewMode = useStorage('viewMode', 'table' as 'table' | 'list', undefined, { initOnMounted: true })

const options = [
  { label: 'Tabulka', value: 'table', icon: 'pi pi-th-large' },
  { label: 'Seznam', value: 'list', icon: 'pi pi-list' },
]

const selectedMode = ref('table')

onMounted(() => {
  selectedMode.value = viewMode.value
})

watch(selectedMode, newValue => {
  viewMode.value = newValue
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
