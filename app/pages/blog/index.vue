<script lang="ts" setup>
const { data: posts } = await useAsyncData(
  'posts',
  () => readSnapshot('blog/posts'),
)

definePageMeta({
  colorMode: 'light',
})

useHead({ title: 'Blog' })
</script>

<template>
  <div bg-gray-1>
    <Navbar />
    <div container bg-white py-40px>
      <div flex flex-col items-center mb-40px px-20px>
        <h1 h1>
          Blog
        </h1>
      </div>
      <div v-if="posts" px-20px font-300 grid grid-cols-1 md:grid-cols-2 gap-20px>
        <div v-for="post in posts.data" :key="post.slug" flex gap-12px bg-white rounded-lg p-24px border-1 border-gray-200 drop-shadow-md>
          <div w-150px flex-none>
            <NuxtImg :src="post.featured_image" :alt="post.title" />
          </div>
          <div>
            <h3 text-lg font-400 text-black>
              {{ post.title }}
            </h3>
            <div font-300 mb-12px text-xs>
              {{ formatDate(post.date_published) }}
            </div>
            <MDC :value="post.perex" tag="div" class="post-content" />
            <NuxtLink :to="`/blog/${post.slug}`" underline>
              Číst více
              <i class="pi pi-angle-double-right" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Post not found</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

.post-content p{
  margin-bottom: 1em;
}
.post-content a, .post-content a:hover, .post-content a:visited {
  color: #000;
  text-decoration: underline;
}
</style>
