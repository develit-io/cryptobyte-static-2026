<script lang="ts" setup>
const { data: persons } = await useAsyncData(
  'persons',
  () => readSnapshot('persons'))
</script>

<template>
  <div bg-white p-40px my-20px>
    <div grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-20px>
      <div
        v-for="(person, idx) in persons"
        :key="idx"
      >
        <PersonCard :person="person" />
      </div>
    </div>
  </div>
</template>
