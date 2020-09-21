<template>
  <div>
    <breadcrumbs />
    <h1>{{ category.fields.title }}</h1>
    <div
      v-for="(post, i) in relatedPosts"
      :key="i"
    >
      {{ post.fields.category.fields.title }},
      {{ post.fields.title }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
    },
    breadcrumbs() {
      const category = this.currentPost.fields.category
      return [
        { text: 'ホーム', to: '/' },
        { text: category.fields.title, to: '#' }
      ]
    }
  },
  async asyncData({ payload, store, params, error }) {
    const category = payload || await store.state.categories.find(cat => cat.fields.slug === params.slug)

    if (category) {
      return { category }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>
