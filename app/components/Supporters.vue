<script lang="ts" setup>
import type { Supporter } from '@/types'

const { data: supporters } = await useAsyncData(
  'supporters',
  () => readSnapshot('supporters'),
)
const importantSupporters = supporters.value?.filter((s: Supporter) => s.important)
const normalSupporters = supporters.value?.filter((s: Supporter) => !s.important)
</script>

<template>
  <div v-if="supporters?.length" container bg-white py-40px my-20px>
    <div flex flex-col items-center mb-40px px-20px>
      <h2 h1>
        Podporovatelé
      </h2>
      <h3 h3>
        Děkujeme vám za podporu
      </h3>
    </div>
    <div px-20px>
      <div flex justify-center flex-wrap mb-20px gap-20px>
        <span v-for="supporter, idx in importantSupporters" :key="idx" text-2xl>
          {{ supporter.name }}
        </span>
      </div>
      <div flex justify-center flex-wrap gap-16px>
        <span v-for="supporter, idx in normalSupporters" :key="idx" font-300>
          {{ supporter.name }}
        </span>
      </div>
    </div>
  </div>
</template>
