<script setup lang="ts">
const containerRef = ref(null)
const _swiper = useSwiper(containerRef, {
  effect: 'fade',
  loop: true,
  speed: 3000,
  allowTouchMove: false,
  autoplay: {
    delay: 5000,
  },
  fadeEffect: {
    crossFade: true,
  },
})

const images = [
  '/images/bg_1.webp',
  '/images/bg_2.webp',
  '/images/bg_3.webp',
  '/images/bg_4.webp',
  '/images/bg_5.webp',
  '/images/bg_6.webp',
  '/images/bg_7.webp',
]
</script>

<template>
  <div w-full h-full absolute top-0 left-0 saturate-20>
    <ClientOnly>
      <swiper-container ref="containerRef" :init="false" h-full w-full>
        <swiper-slide
          v-for="(image, idx) in images"
          :key="idx"
        >
          <NuxtImg :src="image" w-full h-full object-cover object-right alt="CryptoByte illustration image" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>
