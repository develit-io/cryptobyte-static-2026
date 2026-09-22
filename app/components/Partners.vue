<script lang="ts" setup>
import type { Partner, PartnerCategory } from '@/types'

const partnerCategories: Record<PartnerCategory, string> = {
  the_best_partner: 'The Best partner',
  super_partner: 'Super partner',
  youtube_partner: 'YouTube partner',
  skvely_partner: 'Skvělý partner',
  afterparty_partner: 'Afterparty partner',
  prima_partner: 'Prima partner',
  fan_partner: 'Fan partner',
  institucionalni_partner: 'Institucionální partner',
  pravni_poradentstvi: 'Právní poradenství',
  medialni_partner: 'Mediální partner',
}

// all fetched partners
const { data: partners } = await useAsyncData(
  'partners',
  () => readSnapshot('partners'),
)

// sorted partners by category
const sortedPartners: { category: PartnerCategory, title: string, partners: Partner[] }[] = []

for (const key in partnerCategories) {
  const categoryKey = key as PartnerCategory
  const foundInCurrentCategory = partners.value?.filter((p: Partner) => p.category === categoryKey)
  if (foundInCurrentCategory?.length) {
    sortedPartners.push({
      category: categoryKey,
      title: partnerCategories[categoryKey],
      partners: foundInCurrentCategory,
    })
  }
}
</script>

<template>
  <div v-if="sortedPartners?.length" container bg-white py-40px my-20px>
    <div flex flex-col items-center mb-40px px-20px>
      <h2 h1>
        Partneři
      </h2>
    </div>
    <div v-for="category in sortedPartners" :key="category.category" px-20px mb-40px>
      <div flex flex-col items-center mb-20px>
        <h3 h3>
          {{ category.title }}
        </h3>
      </div>
      <div flex justify-center flex-wrap gap-20px>
        <div v-for="partner, idx in category.partners" :key="idx" flex flex-col items-center>
          <NuxtLink :to="partner.url" target="_blank" rel="noopener noreferrer">
            <div
              bg-white rounded-lg flex items-center justify-center border-1 border-gray-200 drop-shadow-md
              :class="['the_best_partner', 'super_partner'].includes(category.category) ? 'w-300px h-120px px-30px py-18px' : 'w-200px h-80px px-20px py-12px'"
            >
              <NuxtImg :src="partner.logo" :alt="partner.name" w-full h-full object-contain />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
