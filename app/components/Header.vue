<script lang="ts" setup>
import { VueWriter } from 'vue-writer'
</script>

<template>
  <div block relative mb--40px overflow-hidden>
    <div absolute bottom="40%" w-full z-40 text-white px-20px>
      <div container border-l-4px border-cb-red pl="16px sm:32px" pr-55px>
        <h1 text-white text-32px sm:text-64px lg:text-80px font-600 font-exo drop-shadow-md>
          CryptoByte 2026
        </h1>
        <vue-writer
          :array="['5. ročník']"
          :start="10"
          :iterations="1"
          :type-speed="40"
          mt-20px text="20px sm:32px"
        />
        <vue-writer
          :array="['Největší kryptoměnová konference v ČR']"
          :start="600"
          :iterations="1"
          :type-speed="40"
          text="20px sm:32px"
        />

        <vue-writer
          :array="['16. května 2026 - Technická univerzita v Liberci']"
          :start="2200"
          :iterations="1"
          :type-speed="40"
          text="20px sm:32px"
        />
        <vue-writer
          :array="['600+ účastníků', '30+ přednášek a workshopů', 'Technologie, ekonomie, soukromí i regulace']"
          :start="4500"
          :iterations="0"
          :type-speed="40"
          :erase-speed="2"
          drop-shadow-md
          mt-20px
          font-300
          text="18px sm:22px"
        />
      </div>
    </div>
    <div relative h-100svh sm:h-700px overflow-hidden z-10>
      <div bg="black/75" relative w-full h-full z-50 />
      <BackgroundImageSwitcher />
    </div>
  </div>
</template>
