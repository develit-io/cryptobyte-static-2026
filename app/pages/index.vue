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
  <div id="domu" ref="domu" bg-gray-1>
    <Header />
    <Navbar />
    <div />
    <About id="o-konferenci" ref="o-konferenci" />
    <div id="hoste" ref="hoste" container bg-white py-40px>
      <div flex flex-col items-center mb-40px px-20px>
        <h2 h1>
          Hosté
        </h2>
        <h3 h3>
          Nabitá sestava jako vždy
        </h3>
      </div>
      <PersonGrid hidden sm:block />
      <PersonSwiper sm:hidden />
    </div>
    <div id="partneri" ref="partneri">
      <Partners />
    </div>
    <div id="podporovatele" ref="podporovatele">
      <Supporters />
    </div>
    <div id="testimonials" ref="testimonials">
      <Testimonials />
    </div>
    <div id="faq" ref="faq">
      <Faq />
    </div>
    <Footer />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
