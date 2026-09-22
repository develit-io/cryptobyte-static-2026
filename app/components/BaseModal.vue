<script setup lang="ts">
export type ModalSize = '400px' | '720px' | '800px' | '920px'
// unocss safelist
// md:w-720px md:w-920px md:w-400px
// NFT Miss Figma requires md:w-800px :)

interface Props {
  modelValue?: boolean
  isClosable?: boolean
  size?: ModalSize
  bgColor?: string
  initialFocus?: HTMLElement
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  isClosable: true,
  size: '800px',
  bgColor: '',
})

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:modelValue', value: boolean): void
}>()

const isOpen = useVModel(props, 'modelValue', emit, { passive: true })

function close (): void {
  if (!props.isClosable)
    return

  isOpen.value = false
  emit('close')
}
</script>

<template>
  <div>
    <HeadlessTransitionRoot as="template" :show="isOpen">
      <HeadlessDialog as="div" class="relative z-100" :initial-focus="initialFocus" @close="close">
        <HeadlessTransitionChild
          as="template" enter="ease-out duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </HeadlessTransitionChild>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end sm:items-center justify-center min-h-full p-0 text-center md:p-4">
            <HeadlessTransitionChild
              as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialogPanel
                bg-white
                p-24px pb-24px text-left shadow-xl transform transition-all sm:my-8
                w-full my-0 rounded-b-0 rounded-t-16px
                sm:rounded-b-16px
                :class="[`md:w-${props.size}`]" :style="{ 'background-color': bgColor }"
              >
                <div>
                  <slot />
                </div>
                <div v-if="isClosable" class="absolute top-0 right-0 pt-4 pr-4">
                  <button type="button" app-icon-btn outline-none @click="close">
                    <span class="sr-only">Close</span>
                    <i class="pi pi-times" style="font-size:14px" text-gray-600 hover:rotate-90 duration-200 aria-hidden="false" />
                  </button>
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>
