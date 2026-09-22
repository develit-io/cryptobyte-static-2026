<script lang="ts" setup>
import type { Testimonial } from '@/types'

const { data: testimonials } = await useAsyncData<Testimonial[]>(
  'testimonials',
  () => readSnapshot<Testimonial[]>('testimonials'),
)

const containerRef = ref(null)
const _swiper = useSwiper(containerRef, {
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: true,
  },
  pagination: {
    clickable: true,
  },
  navigation: true,
  speed: 600,
  slidesPerView: 1,
})
</script>

<template>
  <div v-if="testimonials?.length" container bg-white py-40px>
    <div flex flex-col items-center mb-40px px-20px>
      <h2 h1>
        Reference
      </h2>
      <h3 h3>
        Co o nás říkají účastníci
      </h3>
    </div>
    <div px-20px>
      <ClientOnly>
        <swiper-container ref="containerRef" :init="false" cursor-grab>
          <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id">
            <div flex flex-col items-center text-center px-60px py-30px gap-20px>
              <div text-sm md:text-xl leading-relaxed>
                {{ testimonial.text }}
              </div>
              <div flex flex-col items-center gap-10px>
                <NuxtImg
                  v-if="testimonial.img"
                  :src="`${testimonial.img}`"
                  :alt="testimonial.name"
                  w-80px
                  h-80px
                  rounded-full
                  object-cover
                />
                <div>
                  <div font-600 text-lg font-notch>
                    {{ testimonial.name }}
                  </div>
                  <div>
                    {{ testimonial.position }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </div>
</template>

<style>
swiper-container {
    --swiper-theme-color: black;
}
</style>
