<script lang="ts" setup>
const { data: faq } = await useAsyncData(
  'faq',
  () => readSnapshot('faq'),
)
</script>

<template>
  <div v-if="faq?.length" container bg-white py-40px my-20px>
    <div flex flex-col items-center mb-40px px-20px>
      <h2 h1>
        FAQ
      </h2>
      <h3 h3>
        Často kladené otázky
      </h3>
    </div>
    <div px-20px>
      <Accordion value="0">
        <AccordionPanel v-for="(item, index) in faq" :key="index" :value="index">
          <AccordionHeader>
            <div text-16px font-500 text-black font-notch>
              {{ item.question }}
            </div>
          </AccordionHeader>
          <AccordionContent>
            <MDC :value="item.answer" class="mdc" tag="div" />
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<style>
.mdc p, .mdc ul, .mdc ol{
  margin-bottom: 1em;
  color: black;
}
.mdc strong{
  font-weight: 700;
}
.mdc a{
  text-decoration: underline;
}
.mdc ul{
  list-style-type: disc;
  padding-left: 1em;
}
.mdc ol{
  list-style-type: decimal;
  padding-left: 1em;
}
</style>
