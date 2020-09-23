<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <h1>{{ tag.fields.title }}</h1>
    <div
      v-for="(post, i) in relatedPosts"
      :key="i"
    >
      {{ post.fields.title }}
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  computed: {
    addBreads() {
      return [{ icon: 'mdi-tag-outline', text: 'タグ一覧', to: '/tags' }]
    }
  },
  asyncData({ payload, params, error, store, env }) {
    const tag = payload || store.state.tags.find(tag => tag.fields.slug === params.slug)
    if (tag) {
      const relatedPosts = store.getters.associatePosts(tag)
     return { tag, relatedPosts }
    } else {
      error({ statusCode: 400 })
    }
  }
}
</script>
