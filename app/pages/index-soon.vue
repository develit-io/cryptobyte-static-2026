<script lang="ts" setup>
definePageMeta({
  colorMode: 'light',
})
useHead({
  meta: [
    { name: 'description', content: 'Kryptoměnová konference v Liberci 16. 5. 2026' },
  ],
})
</script>

<template>
  <div id="domu" ref="domu">
    <div sticky top-0 z-100 w-full mb-16px bg-white>
      <div container bg-white flex flex-col justify-center items-center px-2 py-40px gap-40px>
        <NuxtImg
          src="logo.svg"
          w="300px"
          h="100px"
        />
        <p text-center>
          Nový web bude již brzy. <br> Prozatím se podívejte na aftervideo 2025!
        </p>
        <div w-full max-w-560px aspect-video p-2>
          <a href="https://www.youtube.com/watch?v=u0xoJr3ZEE0" target="_blank" rel="noopener noreferrer" underline>Přehrát aftervideo 2025 na YouTube ↗</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
