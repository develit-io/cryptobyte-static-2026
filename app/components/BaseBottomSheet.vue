<script setup lang="ts">
import { Sheet } from 'bottom-sheet-vue3'

interface Props {
  modelValue?: boolean
  isClosable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  isClosable: false,
})

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:modelValue', value: boolean): void
}>()

const isOpen = useVModel(props, 'modelValue', emit, { passive: true })

onUpdated(() => {
  document.documentElement.style.setProperty('--body-overflow', (isOpen.value ? 'hidden' : 'initial'))
})
</script>

<template>
  <Sheet v-model:visible="isOpen">
    <div p-16px pb-24px>
      <slot />
    </div>
  </Sheet>
</template>

<style>
:root {
  --bottom-sheet-max-height: 90%;
  --bottom-sheet-max-width: 500px;
}
.bottom-sheet-backdrop{
  z-index: 20;
}
</style>
