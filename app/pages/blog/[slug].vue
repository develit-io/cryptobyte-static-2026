<script lang="ts" setup>
const { slug } = useRoute().params as { slug: string }
const { data: post } = await useAsyncData(
  `post-${slug}`,
  () => readSnapshot(`blog/post/${slug}`),
)

definePageMeta({
  colorMode: 'light',
})

useHead({ title: post.value?.title ?? '' })
</script>

<template>
  <div bg-gray-1>
    <Navbar />
    <div container bg-white py-40px>
      <div v-if="post" grid grid-cols-1 md:grid-cols-2 gap-20px px-20px font-300>
        <div>
          <NuxtImg :src="post.featured_image" :alt="post.title" />
        </div>
        <div>
          <h1 h2>
            {{ post.title }}
          </h1>
          <div font-300 mb-12px text-xs>
            {{ formatDate(post.date_published) }}
          </div>
          <MDC :value="post.text" tag="div" class="post-content" />
          <div mt-40px>
            <NuxtLink to="/blog" underline>
              <i class="pi pi-angle-double-left" />
              Zpět na blog
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
