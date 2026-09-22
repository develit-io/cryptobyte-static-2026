<script lang="ts" setup>
import { useToggle } from '@vueuse/core'

const [isOpen, toggleOpen] = useToggle(false)
</script>

<template>
  <div
    flex flex-row gap-2
    cursor-pointer
    @click="toggleOpen()"
  >
    <div w-300px bg-gray-400 text-gray-900 flex flex-col justify-center p-2>
      <div>
        <span text-sm font-semibold>18:30</span>
        <span text-xs> – 02:00</span>
      </div>
      <div text-xs font-semibold>
        BG klub
      </div>
    </div>
    <div
      bg-gray-200 w-full
      hover:bg-gray-300
      flex items-center
      p-2
      text-sm
    >
      <div font-semibold text-gray-900>
        Afterparty
      </div>
    </div>
    <BasePopupWrapper v-model="isOpen">
      <AfterpartyDetail />
    </BasePopupWrapper>
  </div>
</template>
