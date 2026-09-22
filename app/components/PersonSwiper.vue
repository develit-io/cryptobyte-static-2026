<script lang="ts" setup>
const { data: persons } = await useAsyncData(
  'persons',
  () => readSnapshot('persons'))

const containerRef = ref(null)
const _swiper = useSwiper(containerRef, {
  effect: 'coverflow',
  loop: true,
  mousewheel: {
    invert: false,
    forceToAxis: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.7,
      spaceBetween: 0,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    960: {
      slidesPerView: 5,
      spaceBetween: 0,
    },
  },
  centeredSlides: true,
  autoplay: {
    delay: 3000,
  },
  coverflowEffect: {
    rotate: 20,
    scale: 0.95,
  },
})
</script>

<template>
  <div>
    <ClientOnly>
      <swiper-container ref="containerRef" :init="false" h-full w-full>
        <swiper-slide
          v-for="(person, idx) in persons"
          :key="idx"
        >
          <PersonCard :person="person" :grab-cursor="true" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>
