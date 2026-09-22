<script lang="ts" setup>
import { useToggle } from '@vueuse/core'

const [isOpen, toggleOpen] = useToggle(false)
</script>

<template>
  <div class="grid grid-cols-[60px_repeat(7,1fr)] gap-2 mt-20px">
    <div bg-white sticky left-0 z-10 text-xs text-gray-900 flex flex-col items-center justify-center font-bold leading-tight>
      <span>18:30</span>
      <span>–</span>
      <span>02:00</span>
    </div>
    <div
      col-span-7 bg-gray-200 hover:bg-gray-300
      cursor-pointer
      flex items-center lg:justify-center
      p-4
      text-lg font-semibold text-gray-900
      border-b-2 border-white
      h-100px
      @click="toggleOpen()"
    >
      <span sticky left-68px>Afterparty</span>
    </div>
    <BasePopupWrapper v-model="isOpen">
      <AfterpartyDetail />
    </BasePopupWrapper>
  </div>
</template>
