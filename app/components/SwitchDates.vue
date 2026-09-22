<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const dateMode = useStorage('dateMode', '2026-05-16' as '2026-05-15' | '2026-05-16')

const options = [
  { label: 'Pátek 15.5.', value: '2026-05-15', icon: 'pi pi-th-large' },
  { label: 'Sobota 16.5.', value: '2026-05-16', icon: 'pi pi-list' },
]

const selectedDate = ref('2026-05-16')

onMounted(() => {
  selectedDate.value = dateMode.value
})

watch(selectedDate, newValue => {
  dateMode.value = newValue
})
</script>

<template>
  <SelectButton
    v-model="selectedDate"
    :options="options"
    option-label="label"
    option-value="value"
    size="large"
    :allow-empty="false"
  />
</template>
